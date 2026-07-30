import { useState } from "react";
import { services } from "../data";
import { Link } from "react-router";

const ServicesHome = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const Icon = services.icon;

  return (
    <section className="services-feature-section">
      {/* Section Header */}
      <div className="section-header">
        <h2>{services.header}</h2>
      </div>

      {/* Main Stage */}
      <div className="services-stage desktop">
        {/* Left Column Controls */}
        <div className="services-list">
          {services.items.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={item.title}
                className={`service-item ${isActive ? "active" : ""}`}
              >
                {/* Pill Button */}
                <button
                  type="button"
                  className="pill-button"
                  onClick={() => setActiveIndex(index)}
                  aria-expanded={isActive}
                >
                  <span className="pill-title">{item.title}</span>
                </button>

                {/* Expandable Description Card */}
                <div className="description-wrapper">
                  <div className="description-card-inner">
                    <div className="description-card">
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column Full Background Image Cross-Fade Stack */}
        <div className="services-preview-frame">
          <div className="img-wrapper">
            {services.items.map((item, index) => (
              <img
                key={item.title}
                src={item.image}
                alt={item.alt}
                className={`preview-image ${index === activeIndex ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="services-stage mobile">
        {services.items.map((item) => (
          <div className="service-wrapper" key={item.title}>
            <h3>{item.title} </h3>
            <p>{item.description}</p>
            <div className="img-wrapper">
              <img src={item.image} alt={item.alt} />
            </div>
          </div>
        ))}
      </div>
      {/* Centered Footer CTA */}
      <div className="services-footer">
        <Link to={services.linkTo} className="page-link">
          <span>{services.pageLink}</span>
          <Icon />
        </Link>
      </div>
    </section>
  );
};

export default ServicesHome;
