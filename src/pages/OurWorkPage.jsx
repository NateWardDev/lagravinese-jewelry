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
  const lastActiveIndex = useRef(null);

  // Drag state refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragDistance = useRef(0);

  // Active category state for fixed text display
  const [activeItem, setActiveItem] = useState(rawItems[0]);

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

    const updateDimensions = () => {
      const firstCard = cards[0];
      const secondSetFirstCard = cards[rawItems.length];

      singleSetWidth = secondSetFirstCard.offsetLeft - firstCard.offsetLeft;
      const cardWidth = firstCard.offsetWidth;
      centerOffset = (window.innerWidth - cardWidth) / 2;

      if (currentX.current === 0) {
        const initialX = centerOffset - singleSetWidth;
        currentX.current = initialX;
        targetX.current = initialX;
      }
    };

    updateDimensions();

    // Wheel Event Handler
    const handleWheel = (e) => {
      const delta = e.deltaY || e.deltaX;
      const clampedDelta = Math.max(Math.min(delta, 100), -100);
      targetX.current -= clampedDelta * 0.85;
    };

    // Pointer (Touch & Drag) Event Handlers
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

      // Adjust multiplier if touch drag sensitivity needs tweaking
      targetX.current += deltaX * 1.2;
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("resize", updateDimensions);

    // Attach Pointer Events to Window for fluid dragging off-screen
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    let animationFrameId;

    const render = () => {
      if (!singleSetWidth) return;

      // Smooth lerp movement
      currentX.current += (targetX.current - currentX.current) * 0.085;

      const minBound = centerOffset - singleSetWidth * 2;
      const maxBound = centerOffset;

      // Seamless Wrapping
      if (currentX.current <= minBound) {
        currentX.current += singleSetWidth;
        targetX.current += singleSetWidth;
      } else if (currentX.current >= maxBound) {
        currentX.current -= singleSetWidth;
        targetX.current -= singleSetWidth;
      }

      // Apply transform via GSAP
      gsap.set(track, { x: currentX.current });

      // Highlight active card closest to screen center
      const screenCenter = window.innerWidth / 2;
      let closestCard = null;
      let closestIdx = -1;
      let minDistance = Infinity;

      cards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(screenCenter - cardCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestCard = card;
          closestIdx = idx;
        }
      });

      // Update active state when index changes
      if (closestIdx !== -1 && closestIdx !== lastActiveIndex.current) {
        cards.forEach((card) => {
          if (card === closestCard) {
            card.classList.add("active");
            card.classList.remove("dimmed");
          } else {
            card.classList.remove("active");
            card.classList.add("dimmed");
          }
        });

        // Set state for active item
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

  // Prevent navigation click if user was dragging
  const handleCardClick = (id) => {
    if (dragDistance.current > 10) return;
    navigate(`/work/${id}`);
  };

  return (
    <div className="work-slider-container">
      {/* Moving Cards Track */}
      <div className="slider-track" ref={trackRef}>
        {infiniteItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="slider-card dimmed"
            onClick={() => handleCardClick(item.id)}
          >
            <img src={item.image} alt={item.title} className="card-bg-img" />
          </div>
        ))}
      </div>

      {/* Fixed Bottom Center Info Overlay */}
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
