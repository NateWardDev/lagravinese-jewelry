import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { collections } from "../data";

const OurWorkPage = () => {
  const navigate = useNavigate();
  const trackRef = useRef(null);

  const rawItems = collections.items;
  const infiniteItems = [...rawItems, ...rawItems, ...rawItems];

  const currentX = useRef(0);
  const targetX = useRef(0);
  const lastActiveIndex = useRef(-1);

  // Drag state refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragDistance = useRef(0);

  const [activeItem, setActiveItem] = useState(rawItems[0]);

  useEffect(() => {
    if (!trackRef.current || trackRef.current.children.length === 0) return;

    const track = trackRef.current;
    const cards = Array.from(track.children);
    const totalCards = cards.length;

    let cardWidth = 0;
    let cardGap = 0;
    let stepWidth = 0;
    let singleSetWidth = 0;
    let centerOffset = 0;

    const updateDimensions = () => {
      if (!cards[0]) return;
      const firstCard = cards[0];
      const style = window.getComputedStyle(track);

      cardWidth = firstCard.offsetWidth;
      cardGap = parseFloat(style.gap) || 0;
      stepWidth = cardWidth + cardGap;
      singleSetWidth = stepWidth * rawItems.length;
      centerOffset = (window.innerWidth - cardWidth) / 2;

      if (currentX.current === 0) {
        const initialX = centerOffset - singleSetWidth;
        currentX.current = initialX;
        targetX.current = initialX;
      }
    };

    updateDimensions();

    // Touch & Pointer Handlers
    const handlePointerDown = (e) => {
      isDragging.current = true;
      startX.current = e.clientX;
      dragDistance.current = 0;
    };

    const handlePointerMove = (e) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - startX.current;
      startX.current = e.clientX;
      dragDistance.current += Math.abs(deltaX);

      // Higher multiplier on touch for responsive direct-tracking
      targetX.current += deltaX * 1.35;
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    const handleWheel = (e) => {
      const delta = e.deltaY || e.deltaX;
      const clampedDelta = Math.max(Math.min(delta, 100), -100);
      targetX.current -= clampedDelta * 1.2;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    let animationFrameId;

    const render = () => {
      if (!singleSetWidth) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Snappier lerp response (0.2 instead of 0.085)
      currentX.current += (targetX.current - currentX.current) * 0.2;

      const minBound = centerOffset - singleSetWidth * 2;
      const maxBound = centerOffset;

      // Infinite wrapping bounds
      if (currentX.current <= minBound) {
        currentX.current += singleSetWidth;
        targetX.current += singleSetWidth;
      } else if (currentX.current >= maxBound) {
        currentX.current -= singleSetWidth;
        targetX.current -= singleSetWidth;
      }

      // Fast Direct GSAP Transform
      gsap.set(track, { x: currentX.current, force3D: true });

      // MATH-BASED Active Calculation (Zero Layout Reads)
      // Calculates closest index without getBoundingClientRect()
      const relativeX = centerOffset - currentX.current;
      let closestIdx = Math.round(relativeX / stepWidth);
      closestIdx = ((closestIdx % totalCards) + totalCards) % totalCards;

      if (closestIdx !== lastActiveIndex.current) {
        cards.forEach((card, idx) => {
          if (idx === closestIdx) {
            card.classList.add("active");
            card.classList.remove("dimmed");
          } else {
            card.classList.remove("active");
            card.classList.add("dimmed");
          }
        });

        setActiveItem(infiniteItems[closestIdx]);
        lastActiveIndex.current = closestIdx;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [rawItems.length]);

  const handleCardClick = (id) => {
    if (dragDistance.current > 10) return;
    navigate(`/work/${id}`);
  };

  return (
    <div className="work-slider-container">
      <div className="slider-track" ref={trackRef}>
        {infiniteItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="slider-card dimmed"
            onClick={() => handleCardClick(item.id)}
          >
            <img src={item.image} alt={item.title} className="card-bg-img" />
            <div className="card-overlay" />
          </div>
        ))}
      </div>

      {activeItem && (
        <div
          className="active-card-text-container"
          onClick={() => handleCardClick(activeItem.id)}
        >
          <div className="title">
            <h1 className="category-title">{activeItem.title}</h1>
            <p className="total-photos-sub">
              {activeItem.gallery?.length || 0} Photos
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurWorkPage;
