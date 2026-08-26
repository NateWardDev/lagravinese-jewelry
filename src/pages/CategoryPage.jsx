import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";
import { collections } from "../data";
import { Link } from "react-router";

const CategoryPage = () => {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeIndexRef = useRef(activeImageIndex);
  const isInitialRender = useRef(true);

  // Rail & Track Refs
  const desktopRailRef = useRef(null);
  const desktopTrackRef = useRef(null);
  const mobileRailRef = useRef(null);
  const mobileTrackRef = useRef(null);

  const desktopThumbRefs = useRef([]);
  const mobileThumbRefs = useRef([]);

  // Physics & Position Trackers
  const scrollPos = useRef({ current: 0, target: 0 });
  const startYPos = useRef(0);
  const startXPos = useRef(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);

  const Icon = collections.arrowleftIcon;

  const category = collections.items.find(
    (item) => String(item.id) === String(id),
  );

  // Keep Ref updated with state synchronously
  useEffect(() => {
    activeIndexRef.current = activeImageIndex;
  }, [activeImageIndex]);

  // Click handler to advance to next image
  const advanceImage = () => {
    if (!category) return;
    const nextIndex = (activeIndexRef.current + 1) % category.gallery.length;
    scrollPos.current.target = nextIndex;
  };

  // Thumbnail click handler
  const handleThumbClick = (index, e) => {
    e?.stopPropagation();
    if (hasDragged.current) return;
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
      // Lerp smooth target interpolation
      scrollPos.current.current +=
        (scrollPos.current.target - scrollPos.current.current) * lerpFactor;

      const totalItems = category.gallery.length;
      const progress = scrollPos.current.current;

      const nearestIdx = Math.max(
        0,
        Math.min(totalItems - 1, Math.round(progress)),
      );

      // Update active state when nearest slide changes
      if (nearestIdx !== activeIndexRef.current) {
        activeIndexRef.current = nearestIdx;
        setActiveImageIndex(nearestIdx);
      }

      // 1. DESKTOP CONTINUOUS TRACK TRANSFORM (VERTICAL)
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

      // 2. MOBILE CONTINUOUS TRACK TRANSFORM (HORIZONTAL)
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
  // MAIN IMAGE CROSSFADE ANIMATION (GSAP)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!category) return;

    category.gallery.forEach((_, idx) => {
      const isCurrent = idx === activeImageIndex;

      if (isInitialRender.current) {
        // Instant positioning on first load (no flash)
        gsap.set(`.main-image-wrapper-${idx}`, {
          opacity: isCurrent ? 1 : 0,
          pointerEvents: isCurrent ? "auto" : "none",
        });
      } else {
        // Smooth fade transition when scrolling/clicking
        gsap.to(`.main-image-wrapper-${idx}`, {
          opacity: isCurrent ? 1 : 0,
          pointerEvents: isCurrent ? "auto" : "none",
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    });

    if (isInitialRender.current) {
      isInitialRender.current = false;
    }
  }, [activeImageIndex, category]);

  // -------------------------------------------------------------
  // DESKTOP WHEEL SCROLL LISTENER
  // -------------------------------------------------------------
  useEffect(() => {
    if (!category) return;

    const handleWheel = (e) => {
      if (window.innerWidth <= 1024) return;

      const maxIndex = category.gallery.length - 1;
      const delta = e.deltaY * 0.008;

      scrollPos.current.target = Math.max(
        0,
        Math.min(maxIndex, scrollPos.current.target + delta),
      );
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [category]);

  // -------------------------------------------------------------
  // DESKTOP & IPAD DRAG / SWIPE HANDLERS
  // -------------------------------------------------------------
  const handlePointerDown = (e) => {
    // Only handle primary touches or left mouse clicks
    if (e.button !== undefined && e.button !== 0) return;

    isDragging.current = true;
    hasDragged.current = false;
    startYPos.current = e.clientY;
    startXPos.current = e.clientX;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current || !category) return;

    const currentY = e.clientY;
    const currentX = e.clientX;
    const diffY = startYPos.current - currentY;
    const diffX = startXPos.current - currentX;

    const isDesktop = window.innerWidth > 1024;
    // On desktop / iPad desktop view, use vertical movement
    const movement = isDesktop ? diffY : diffX;

    // Movement threshold to prevent canceling quick taps
    if (Math.hypot(diffX, diffY) > 8) {
      hasDragged.current = true;
    }

    if (hasDragged.current) {
      const sensitivity = 0.015;
      const maxIndex = category.gallery.length - 1;

      scrollPos.current.target = Math.max(
        0,
        Math.min(maxIndex, scrollPos.current.target + movement * sensitivity),
      );
    }

    startYPos.current = currentY;
    startXPos.current = currentX;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // Snap target scroll position to nearest slide index
    scrollPos.current.target = Math.round(scrollPos.current.target);
  };

  if (!category) return null;

  return (
    <section className="category-page-overlay">
      <div className="lightbox-wrapper">
        {/* ================= DESKTOP / IPAD DESKTOP VIEW ================= */}
        <div
          className="lightbox-content desktop-only"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="category-meta fade-in">
            <p className="meta-label delay-1">CATEGORY</p>
            <h2 className="meta-title delay-2">{category.title}</h2>
          </div>

          <div className="main-display">
            {category.gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                className={`main-image-wrapper main-image-wrapper-${idx}`}
                onClick={handleMainImageClick}
              >
                <img src={imgUrl} alt={`${category.title} piece ${idx + 1}`} />
              </div>
            ))}
          </div>

          <div className="thumbnail-rail fade-in" ref={desktopRailRef}>
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

          <Link to="/work" className="page-link absolute-link">
            <Icon />
            Back to Colletions
          </Link>
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
            <Link to="/work" className="page-link">
              <Icon /> Back to Colletions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
