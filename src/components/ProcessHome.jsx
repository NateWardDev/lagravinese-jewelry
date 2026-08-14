import { homeContactData } from "../data";
import { Link } from "react-router";

const ProcessHome = () => {
  const ButtonIcon = homeContactData.icon;
  return (
    <section className="process-home" id="process">
      <div className="process-container">
        {/* Section Header */}
        <div className="process-header">
          <h2>Our Process</h2>
          <p className="subtitle">From vision to heirloom</p>
        </div>

        {/* Timeline List */}
        <div className="process-timeline">
          {/* Central Line Vector */}
          <div className="process-line" />

          {homeContactData.process.map((step, index) => {
            const isEven = index % 2 === 1; // 02, 04...

            return (
              <div
                key={step.id}
                className={`timeline-item ${isEven ? "even" : "odd"}`}
              >
                {/* Content Block */}
                <div className="timeline-content">
                  <p className="step-number">0{step.id}</p>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>

                {/* Star Marker Component */}
                <div className="timeline-marker">
                  <svg
                    className="star-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="process-cta">
          <Link className="page-link" to={homeContactData.cta.path}>
            {homeContactData.cta.text}
            {ButtonIcon && <ButtonIcon />}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProcessHome;
