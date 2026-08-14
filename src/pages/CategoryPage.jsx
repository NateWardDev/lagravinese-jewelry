import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";
import { collections } from "../data";

const CategoryPage = () => {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeIndexRef = useRef(activeImageIndex);

  // Rail & Track Refs
  const desktopRailRef = useRef(null);
  const desktopTrackRef = useRef(null);
  const mobileRailRef = useRef(null);
  const mobileTrackRef = useRef(null);

  const desktopThumbRefs = useRef([]);
  const mobileThumbRefs = useRef([]);

  // Physics & Position Trackers
  const scrollPos = useRef({ current: 0, target: 0 });
  const startXPos = useRef(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);

  const category = collections.items.find(
    (item) => String(item.id) === String(id),
  );

  useEffect(() => {
    activeIndexRef.current = activeImageIndex;
  }, [activeImageIndex]);

  // Next image handler
  const advanceImage = () => {
    if (!category) return;
    const nextIndex = (activeIndexRef.current + 1) % category.gallery.length;
    setActiveImageIndex(nextIndex);
    scrollPos.current.target = nextIndex;
  };

  // Thumbnail click handler
  const handleThumbClick = (index, e) => {
    e?.stopPropagation();
    if (hasDragged.current) return;
    setActiveImageIndex(index);
    scrollPos.current.target = index;
  };

  // Main Image Click Handler
  const handleMainImageClick = (e) => {
    e?.stopPropagation();
    if (hasDragged.current) return;
    advanceImage();
  };

  // -------------------------------------------------------------
  // CONTINUOUS LERP ANIMATION ENGINE
  // -------------------------------------------------------------
  useEffect(() => {
    if (!category) return;

    let frameId;
    const lerpFactor = 0.25;

    const renderLoop = () => {
      scrollPos.current.current +=
        (scrollPos.current.target - scrollPos.current.current) * lerpFactor;

      const totalItems = category.gallery.length;
      const progress = scrollPos.current.current;

      const nearestIdx = Math.max(
        0,
        Math.min(totalItems - 1, Math.round(progress)),
      );
      if (nearestIdx !== activeIndexRef.current) {
        setActiveImageIndex(nearestIdx);
      }

      // 1. DESKTOP CONTINUOUS TRACK TRANSFORM
      if (
        window.innerWidth > 1024 &&
        desktopRailRef.current &&
        desktopThumbRefs.current[0]
      ) {
        const thumbHeight = desktopThumbRefs.current[0].offsetHeight + 12;
        const railHeight = desktopRailRef.current.offsetHeight;
        const targetY =
          -(progress * thumbHeight) + railHeight / 2 - thumbHeight / 2;

        if (desktopTrackRef.current) {
          gsap.set(desktopTrackRef.current, { y: targetY, force3D: true });
        }
      }

      // 2. MOBILE CONTINUOUS TRACK TRANSFORM
      if (
        window.innerWidth <= 1024 &&
        mobileRailRef.current &&
        mobileThumbRefs.current[0]
      ) {
        const thumbWidth = mobileThumbRefs.current[0].offsetWidth + 8;
        const railWidth = mobileRailRef.current.offsetWidth;
        const targetX =
          -(progress * thumbWidth) + railWidth / 2 - thumbWidth / 2;

        if (mobileTrackRef.current) {
          gsap.set(mobileTrackRef.current, { x: targetX, force3D: true });
        }
      }

      frameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();
    return () => cancelAnimationFrame(frameId);
  }, [category]);

  // -------------------------------------------------------------
  // DESKTOP WHEEL SCROLL LISTENER
  // -------------------------------------------------------------
  useEffect(() => {
    if (!category) return;

    const handleWheel = (e) => {
      if (window.innerWidth <= 1024) return;

      const maxIndex = category.gallery.length - 1;
      const delta = e.deltaY * 0.01;

      scrollPos.current.target = Math.max(
        0,
        Math.min(maxIndex, scrollPos.current.target + delta),
      );
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [category]);

  // -------------------------------------------------------------
  // POINTER DRAG HANDLERS (MOBILE & NARROW SCREEN)
  // -------------------------------------------------------------
  const handlePointerDown = (e) => {
    isDragging.current = true;
    hasDragged.current = false;
    startXPos.current = e.clientX;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current || !category) return;
    const currentX = e.clientX;
    const diff = startXPos.current - currentX;

    // Set drag flag if threshold passed
    if (Math.abs(diff) > 5) {
      hasDragged.current = true;
    }

    const sensitivity = 0.015;
    const maxIndex = category.gallery.length - 1;

    scrollPos.current.target = Math.max(
      0,
      Math.min(maxIndex, scrollPos.current.target + diff * sensitivity),
    );
    startXPos.current = currentX;
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // Snap to nearest slide
    scrollPos.current.target = Math.round(scrollPos.current.target);

    // Mobile Tap Fallback: If user clicked main display directly without dragging
    if (!hasDragged.current && e.target.closest(".main-display")) {
      advanceImage();
    }
  };

  // -------------------------------------------------------------
  // MAIN IMAGE CROSSFADE ANIMATION
  // -------------------------------------------------------------
  useEffect(() => {
    if (!category) return;

    gsap.to(".main-image-wrapper", {
      opacity: 0,
      duration: 0.35,
      ease: "power2.out",
    });

    gsap.to(`.main-image-wrapper-${activeImageIndex}`, {
      opacity: 1,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [activeImageIndex, category]);

  if (!category) return null;

  return (
    <section className="category-page-overlay">
      <div className="lightbox-wrapper">
        {/* ================= DESKTOP VIEW ================= */}
        <div className="lightbox-content desktop-only">
          <div className="category-meta">
            <p className="meta-label">CATEGORY</p>
            <h2 className="meta-title">{category.title}</h2>
          </div>

          <div className="main-display">
            {category.gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                className={`main-image-wrapper main-image-wrapper-${idx}`}
                style={{ opacity: idx === 0 ? 1 : 0 }}
                onClick={handleMainImageClick}
              >
                <img src={imgUrl} alt={`${category.title} piece ${idx + 1}`} />
              </div>
            ))}
          </div>

          <div className="thumbnail-rail" ref={desktopRailRef}>
            <div className="thumbnail-track" ref={desktopTrackRef}>
              {category.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  ref={(el) => (desktopThumbRefs.current[idx] = el)}
                  type="button"
                  className={`thumb-btn ${
                    activeImageIndex === idx ? "active" : ""
                  }`}
                  onClick={(e) => handleThumbClick(idx, e)}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================= MOBILE / NARROW VIEW ================= */}
        <div
          className="lightbox-content mobile-only"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="main-display">
            {category.gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                className={`main-image-wrapper main-image-wrapper-${idx}`}
                style={{ opacity: idx === 0 ? 1 : 0 }}
                onClick={handleMainImageClick}
              >
                <img src={imgUrl} alt={`${category.title} piece ${idx + 1}`} />
              </div>
            ))}
          </div>

          <div className="thumbnail-rail" ref={mobileRailRef}>
            <div className="thumbnail-track" ref={mobileTrackRef}>
              {category.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  ref={(el) => (mobileThumbRefs.current[idx] = el)}
                  type="button"
                  className={`thumb-btn ${
                    activeImageIndex === idx ? "active" : ""
                  }`}
                  onClick={(e) => handleThumbClick(idx, e)}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="category-meta">
            <h1 className="meta-title">{category.title}</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
