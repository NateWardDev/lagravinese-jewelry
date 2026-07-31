import { useState, useEffect, useRef } from "react";
import { collections } from "../data";
import { Link } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const DURATION_PER_SLIDE = 4; // 4 seconds

const CollectionsHome = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const trackRef = useRef(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const isUserInteracting = useRef(false);
  const rafRef = useRef(null);

  const activeProgressRef = useRef(null);
  const timerRef = useRef(null);

  // 1. GSAP Timer & Progress Bar Engine
  useGSAP(() => {
    if (timerRef.current) timerRef.current.kill();

    if (activeProgressRef.current) {
      gsap.fromTo(
        activeProgressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: DURATION_PER_SLIDE,
          ease: "none",
          transformOrigin: "left center",
        },
      );
    }

    // Schedule auto-advance only if user isn't holding or dragging
    if (!isUserInteracting.current) {
      timerRef.current = gsap.delayedCall(DURATION_PER_SLIDE, () => {
        // Flag programmatic scroll BEFORE updating index so scroll engine triggers
        isProgrammaticScroll.current = true;
        setActiveIndex((prev) => (prev + 1) % collections.items.length);
      });
    }

    return () => {
      if (timerRef.current) timerRef.current.kill();
    };
  }, [activeIndex]);

  // 2. Center Scroll Engine (Handles Timer & Dot Clicks)
  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const cards = track.querySelectorAll(".card");
    const targetCard = cards[activeIndex];

    // Only scroll programmatically when flagged (from timer or dot click)
    if (targetCard && isProgrammaticScroll.current) {
      const cardOffset = targetCard.offsetLeft;
      const cardWidth = targetCard.offsetWidth;
      const trackWidth = track.offsetWidth;
      const targetScrollLeft = cardOffset - trackWidth / 2 + cardWidth / 2;

      track.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 600);
    }

    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [activeIndex]);

  // 3. Fluid Proximity Scroll Detection using requestAnimationFrame
  const handleScroll = () => {
    if (isProgrammaticScroll.current || !trackRef.current) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (!trackRef.current) return;

      const track = trackRef.current;
      const trackCenter = track.scrollLeft + track.offsetWidth / 2;
      const cards = track.querySelectorAll(".card");

      let closestIndex = activeIndex;
      let minDistance = Infinity;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - trackCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    });
  };

  // 4. Touch & Drag Handlers to temporarily unlock snap for fluid physics
  const handleTouchStart = () => {
    isUserInteracting.current = true;
    if (timerRef.current) timerRef.current.pause();

    if (trackRef.current) {
      trackRef.current.style.scrollSnapType = "none";
    }
  };

  const handleTouchEnd = () => {
    isUserInteracting.current = false;

    if (trackRef.current) {
      trackRef.current.style.scrollSnapType = "x mandatory";
    }
  };

  const handleManualSelect = (index) => {
    if (index === activeIndex) return;
    isProgrammaticScroll.current = true;
    setActiveIndex(index);
  };

  const Icon = collections.icon;

  return (
    <section className="highlights-carousel">
      <div className="section-header">
        <h2>{collections.header}</h2>
      </div>

      {/* Main Track */}
      <div
        className="cards-track"
        ref={trackRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
      >
        {collections.items.map((item) => (
          <div className="card" key={item.title}>
            <div className="img-wrapper">
              <img src={item.image} alt={item.alt} />
            </div>

            <div className="card-content">
              <div className="card-header">
                <h3>{item.title}</h3>
              </div>

              <Link className="page-link" to={collections.linkTo}>
                <span>{collections.pageLink}</span>
                <Icon />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Controls Bar */}
      <div className="controls-wrapper">
        <div className="pagination-pill">
          {collections.items.map((_, index) => (
            <button
              key={index}
              className={`dot-btn ${index === activeIndex ? "active" : ""}`}
              onClick={() => handleManualSelect(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === activeIndex && (
                <span className="progress-fill" ref={activeProgressRef} />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsHome;
