import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { collections } from "../data";

const OurWorkPage = () => {
  const navigate = useNavigate();
  const trackRef = useRef(null);

  const rawItems = collections.items;
  // Triplicate array for smooth bidirectional infinite scroll
  const infiniteItems = [...rawItems, ...rawItems, ...rawItems];

  const currentX = useRef(0);
  const targetX = useRef(0);

  useEffect(() => {
    if (
      !trackRef.current ||
      trackRef.current.children.length < rawItems.length * 2
    )
      return;

    const track = trackRef.current;
    const cards = Array.from(track.children);

    let singleSetWidth = 0;
    let centerOffset = 0;

    // Recalculate dimensions dynamically (handles gap: 2rem, 60vw, and window resizes)
    const updateDimensions = () => {
      const firstCard = cards[0];
      const secondSetFirstCard = cards[rawItems.length];

      // Exact pixel distance from Item 1 to Item 1 of next set (Includes gap: 2rem)
      singleSetWidth = secondSetFirstCard.offsetLeft - firstCard.offsetLeft;

      const cardWidth = firstCard.offsetWidth;
      centerOffset = (window.innerWidth - cardWidth) / 2;

      // Reset initial position if starting
      if (currentX.current === 0) {
        const initialX = centerOffset - singleSetWidth;
        currentX.current = initialX;
        targetX.current = initialX;
      }
    };

    updateDimensions();

    // Wheel Scroll Listener
    const handleWheel = (e) => {
      const delta = e.deltaY || e.deltaX;
      // Clamp delta so aggressive scrolling doesn't jump too far in 1 frame
      const clampedDelta = Math.max(Math.min(delta, 100), -100);
      targetX.current -= clampedDelta * 0.85;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("resize", updateDimensions);

    let animationFrameId;

    const render = () => {
      if (!singleSetWidth) return;

      // Smooth lerp movement
      currentX.current += (targetX.current - currentX.current) * 0.085;

      const minBound = centerOffset - singleSetWidth * 2;
      const maxBound = centerOffset;

      // Seamless Wrapping: Shift BOTH target & current simultaneously when boundary is hit
      if (currentX.current <= minBound) {
        currentX.current += singleSetWidth;
        targetX.current += singleSetWidth;
      } else if (currentX.current >= maxBound) {
        currentX.current -= singleSetWidth;
        targetX.current -= singleSetWidth;
      }

      // Apply transform
      gsap.set(track, { x: currentX.current });

      // Highlight active card sitting closest to center
      const screenCenter = window.innerWidth / 2;
      let closestCard = null;
      let minDistance = Infinity;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(screenCenter - cardCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestCard = card;
        }
      });

      cards.forEach((card) => {
        const titleOverlay = card.querySelector(".active-card-info");
        if (card === closestCard) {
          card.classList.add("active");
          card.classList.remove("dimmed");
          if (titleOverlay) titleOverlay.classList.add("visible");
        } else {
          card.classList.remove("active");
          card.classList.add("dimmed");
          if (titleOverlay) titleOverlay.classList.remove("visible");
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", updateDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [rawItems.length]);

  return (
    <div className="work-slider-container">
      <div className="slider-track" ref={trackRef}>
        {infiniteItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="slider-card dimmed"
            onClick={() => navigate(`/work/${item.id}`)}
          >
            <img src={item.image} alt={item.title} className="card-bg-img" />

            <div className="active-card-info">
              <div className="title-row">
                <h1 className="category-title">{item.title}</h1>
                <span className="count-badge">
                  ({item.gallery?.length || 0})
                </span>
              </div>
              <span className="total-photos-sub">
                /{item.gallery?.length || 0} Photos
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-right-controls">
        <button type="button" className="icon-btn" aria-label="Grid View">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1 1h6v6H1V1zm8 0h6v6H9V1zM1 9h6v6H1V9zm8 0h6v6H9V9z" />
          </svg>
        </button>
        <button
          type="button"
          className="icon-btn active"
          aria-label="Strip View"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1 1h6v14H1V1zm8 0h6v14H9V1z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default OurWorkPage;
