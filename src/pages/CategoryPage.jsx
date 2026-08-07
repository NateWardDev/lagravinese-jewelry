import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { collections } from "../data";
import { Link } from "react-router";

const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isAnimating = useRef(false);
  const activeIndexRef = useRef(activeImageIndex);

  // Find category matching the route param
  const category = collections.items.find(
    (item) => String(item.id) === String(id),
  );

  useEffect(() => {
    activeIndexRef.current = activeImageIndex;
  }, [activeImageIndex]);

  // Handle Mouse Wheel Scroll for dynamic image switching
  useEffect(() => {
    if (!category) return;

    const handleWheel = (e) => {
      if (isAnimating.current) return;

      const totalImages = category.gallery.length;
      const current = activeIndexRef.current;

      if (e.deltaY > 0 && current < totalImages - 1) {
        isAnimating.current = true;
        setActiveImageIndex(current + 1);
        setTimeout(() => (isAnimating.current = false), 350);
      } else if (e.deltaY < 0 && current > 0) {
        isAnimating.current = true;
        setActiveImageIndex(current - 1);
        setTimeout(() => (isAnimating.current = false), 350);
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [category]);

  // GSAP Opacity Transition between images
  useEffect(() => {
    if (!category) return;

    gsap.to(".main-image-wrapper", {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(`.main-image-wrapper-${activeImageIndex}`, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [activeImageIndex, category]);

  if (!category) {
    return (
      <div className="category-not-found">
        <p>Category not found</p>
        <button onClick={() => navigate("/work")}>Return to Work</button>
      </div>
    );
  }

  return (
    <div className="category-page-overlay">
      <div className="lightbox-wrapper">
        {/* Top Bar - Close Button */}
        <div className="lightbox-top-bar">
          <Link
            to="/work"
            className="page-link right"
            onClick={() => navigate("/work")}
          >
            Back to Gallery
          </Link>
        </div>

        {/* 3-Column Display Area */}
        <div className="lightbox-content">
          {/* Left Column: Category Metadata */}
          <div className="category-meta">
            <p className="meta-label">CATEGORY</p>
            <h1 className="meta-title">{category.title}</h1>
          </div>

          {/* Center Column: Crossfading Active Photo Display */}
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

          {/* Right Column: Vertical Thumbnail Rail */}
          <div className="thumbnail-rail">
            {category.gallery.map((imgUrl, idx) => (
              <button
                key={idx}
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
    </div>
  );
};

export default CategoryPage;
