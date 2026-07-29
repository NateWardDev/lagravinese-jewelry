import { useState, useEffect, useRef } from "react";
import { collections } from "../data";

const DURATION_PER_SLIDE = 10000;

const CollectionsHome = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const trackRef = useRef(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const prevIndexRef = useRef(0);

  // 1. Center Scroll Engine with Dynamic Distance Lock
  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const cards = track.querySelectorAll(".card");
    const targetCard = cards[activeIndex];

    if (targetCard) {
      isProgrammaticScroll.current = true;

      // Calculate exact scroll coordinate to center the target card
      const cardOffset = targetCard.offsetLeft;
      const cardWidth = targetCard.offsetWidth;
      const trackWidth = track.offsetWidth;
      const targetScrollLeft = cardOffset - trackWidth / 2 + cardWidth / 2;

      // Always smooth scroll (even when wrapping around from last to first)
      track.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      // Calculate distance jumped
      const distance = Math.abs(activeIndex - prevIndexRef.current);
      prevIndexRef.current = activeIndex;

      // Dynamic lock duration: base 500ms + 120ms per card jumped (capped at 1400ms)
      // Gives full-width smooth transitions enough time to settle without onScroll intercepting
      const lockDuration = Math.min(500 + distance * 120, 1400);

      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, lockDuration);
    }

    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [activeIndex]);

  // 2. Handle manual swipe / drag scrolling and sync activeIndex
  const handleScroll = () => {
    if (isProgrammaticScroll.current || !trackRef.current) return;

    const track = trackRef.current;
    const trackCenter = track.scrollLeft + track.offsetWidth / 2;
    const cards = track.querySelectorAll(".card");

    let closestIndex = 0;
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
      prevIndexRef.current = closestIndex;
    }
  };

  // 3. Auto-advance callback when timer finishes
  const handleAnimationEnd = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % collections.items.length);
  };

  const Icon = collections.icon;

  return (
    <section className="highlights-carousel">
      <div className="section-header">
        <h2>{collections.header}</h2>
      </div>

      {/* Main Track */}
      <div className="cards-track" ref={trackRef} onScroll={handleScroll}>
        {collections.items.map((item) => (
          <div className="card" key={item.title}>
            <div className="img-wrapper">
              <img src={item.image} alt={item.alt} />
            </div>

            <div className="card-content">
              <div className="card-header">
                <h3>{item.title}</h3>
              </div>

              <a className="button-wrapper" href={item.link}>
                <span>View Collection</span>
                <Icon />
              </a>
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
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === activeIndex && (
                <span
                  className="progress-fill"
                  onAnimationEnd={handleAnimationEnd}
                  style={{
                    animationDuration: `${DURATION_PER_SLIDE}ms`,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsHome;
