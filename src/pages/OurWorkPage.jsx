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

  // Drag & Velocity state refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragDistance = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocityX = useRef(0);

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

    // Touch & Pointer Handlers with Fast Drag & Velocity Physics
    const handlePointerDown = (e) => {
      isDragging.current = true;
      startX.current = e.clientX;
      lastX.current = e.clientX;
      lastTime.current = performance.now();
      velocityX.current = 0;
      dragDistance.current = 0;
    };

    const handlePointerMove = (e) => {
      if (!isDragging.current) return;

      const now = performance.now();
      const dt = now - lastTime.current;
      const clientX = e.clientX;
      const deltaX = clientX - startX.current;

      startX.current = clientX;
      dragDistance.current += Math.abs(deltaX);

      // High sensitivity multiplier for fast, responsive dragging
      const isMobile = window.innerWidth <= 1024;
      const sensitivity = isMobile ? 2.0 : 1.5;

      targetX.current += deltaX * sensitivity;

      // Calculate velocity for flick momentum
      if (dt > 0) {
        velocityX.current = (clientX - lastX.current) / dt;
      }

      lastX.current = clientX;
      lastTime.current = now;
    };

    const handlePointerUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;

      // Apply flick momentum decay based on release velocity
      const isMobile = window.innerWidth <= 1024;
      const momentumFactor = isMobile ? 200 : 120;
      targetX.current += velocityX.current * momentumFactor;
      velocityX.current = 0;
    };

    const handleWheel = (e) => {
      const delta = e.deltaY || e.deltaX;
      const clampedDelta = Math.max(Math.min(delta, 100), -100);
      targetX.current -= clampedDelta * 1.5;
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

      // Fast, snappy lerp interpolation factor (0.28)
      currentX.current += (targetX.current - currentX.current) * 0.28;

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

      // MATH-BASED Active Calculation
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
            <div className="text-below">
              <p>
                Slide {activeItem.index + 1} / {rawItems.length}
              </p>
              <p
                className="total-photos-sub page-button"
                to={`/work/${activeItem.id}`}
              >
                {activeItem.gallery?.length || 0} Photos
              </p>
            </div>
          </div>

          <p className="subtext">Click Card to View</p>
        </div>
      )}
    </div>
  );
};

export default OurWorkPage;
