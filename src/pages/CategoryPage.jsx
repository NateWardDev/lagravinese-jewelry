import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { gsap } from "gsap";
import { collections } from "../data";

const CategoryPage = () => {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isAnimating = useRef(false);
  const activeIndexRef = useRef(activeImageIndex);

  // Rail & Track Refs
  const desktopRailRef = useRef(null);
  const desktopTrackRef = useRef(null);
  const mobileRailRef = useRef(null);
  const mobileTrackRef = useRef(null);

  const desktopThumbRefs = useRef([]);
  const mobileThumbRefs = useRef([]);

  // Lerp Position Trackers
  const desktopPos = useRef({ current: 0, target: 0 });
  const mobilePos = useRef({ current: 0, target: 0 });

  // Mobile Drag Tracking
  const touchStart = useRef(0);
  const touchDelta = useRef(0);

  const category = collections.items.find(
    (item) => String(item.id) === String(id),
  );

  useEffect(() => {
    activeIndexRef.current = activeImageIndex;
  }, [activeImageIndex]);

  // 1. DESKTOP VERTICAL AUTO-CENTERING ENGINE
  useEffect(() => {
    if (
      !category ||
      !desktopThumbRefs.current[activeImageIndex] ||
      !desktopRailRef.current ||
      window.innerWidth <= 1024
    )
      return;

    const activeThumb = desktopThumbRefs.current[activeImageIndex];
    const rail = desktopRailRef.current;

    const railHeight = rail.offsetHeight;
    const thumbOffsetTop = activeThumb.offsetTop;
    const thumbHeight = activeThumb.offsetHeight;

    desktopPos.current.target = -(
      thumbOffsetTop -
      railHeight / 2 +
      thumbHeight / 2
    );

    let frameId;
    const renderDesktopScroll = () => {
      // Snappier lerp speed (0.25)
      desktopPos.current.current +=
        (desktopPos.current.target - desktopPos.current.current) * 0.1;

      if (desktopTrackRef.current) {
        gsap.set(desktopTrackRef.current, {
          y: desktopPos.current.current,
          force3D: true,
        });
      }
      frameId = requestAnimationFrame(renderDesktopScroll);
    };

    renderDesktopScroll();
    return () => cancelAnimationFrame(frameId);
  }, [activeImageIndex, category]);

  // 2. MOBILE HORIZONTAL AUTO-CENTERING ENGINE
  useEffect(() => {
    if (
      !category ||
      !mobileThumbRefs.current[activeImageIndex] ||
      !mobileRailRef.current ||
      window.innerWidth > 1024
    )
      return;

    const activeThumb = mobileThumbRefs.current[activeImageIndex];
    const rail = mobileRailRef.current;

    const railWidth = rail.offsetWidth;
    const thumbOffsetLeft = activeThumb.offsetLeft;
    const thumbWidth = activeThumb.offsetWidth;

    mobilePos.current.target = -(
      thumbOffsetLeft -
      railWidth / 2 +
      thumbWidth / 2
    );

    let frameId;
    const renderMobileScroll = () => {
      // Snappier lerp speed (0.25)
      mobilePos.current.current +=
        (mobilePos.current.target - mobilePos.current.current) * 0.1;

      if (mobileTrackRef.current) {
        gsap.set(mobileTrackRef.current, {
          x: mobilePos.current.current,
          force3D: true,
        });
      }
      frameId = requestAnimationFrame(renderMobileScroll);
    };

    renderMobileScroll();
    return () => cancelAnimationFrame(frameId);
  }, [activeImageIndex, category]);

  // DESKTOP WHEEL NAVIGATION
  useEffect(() => {
    if (!category) return;

    const handleWheel = (e) => {
      if (isAnimating.current || window.innerWidth <= 1024) return;

      const totalImages = category.gallery.length;
      const current = activeIndexRef.current;

      if (e.deltaY > 0 && current < totalImages - 1) {
        isAnimating.current = true;
        setActiveImageIndex(current + 1);
        setTimeout(() => (isAnimating.current = false), 180);
      } else if (e.deltaY < 0 && current > 0) {
        isAnimating.current = true;
        setActiveImageIndex(current - 1);
        setTimeout(() => (isAnimating.current = false), 180);
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [category]);

  // MOBILE TOUCH SWIPE HANDLERS (Main Display Only)
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
    touchDelta.current = 0;
  };

  const handleTouchMove = (e) => {
    touchDelta.current = e.touches[0].clientX - touchStart.current;
  };

  const handleTouchEnd = () => {
    const totalImages = category.gallery.length;
    const current = activeIndexRef.current;

    if (touchDelta.current < -30 && current < totalImages - 1) {
      setActiveImageIndex(current + 1);
    } else if (touchDelta.current > 30 && current > 0) {
      setActiveImageIndex(current - 1);
    }
  };

  // MAIN IMAGE GSAP OPACITY CROSSFADE
  useEffect(() => {
    if (!category) return;

    gsap.to(".main-image-wrapper", {
      opacity: 0,
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(`.main-image-wrapper-${activeImageIndex}`, {
      opacity: 1,
      duration: 0.25,
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
            <h1 className="meta-title">{category.title}</h1>
          </div>

          <div className="main-display">
            {category.gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                className={`main-image-wrapper main-image-wrapper-${idx}`}
                style={{ opacity: idx === 0 ? 1 : 0 }}
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
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================= MOBILE VIEW ================= */}
        <div className="lightbox-content mobile-only">
          <div
            className="main-display"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {category.gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                className={`main-image-wrapper main-image-wrapper-${idx}`}
                style={{ opacity: idx === 0 ? 1 : 0 }}
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
                  onClick={() => setActiveImageIndex(idx)}
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
