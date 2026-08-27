import { useRef } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { processHomeData } from "../data";

gsap.registerPlugin(ScrollTrigger);

const ProcessHome = () => {
  const ButtonIcon = processHomeData.icon;
  const sectionRef = useRef(null);
  const lineFillRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        lineFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%", // Begins expanding when section top reaches 60% of screen
            end: "bottom 80%", // Reaches 100% full height near section bottom
            scrub: 0.5, // Ties line length directly to scroll speed
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="process-home" id="process">
      <div className="process-container">
        {/* Section Header */}
        <div className="process-header fade-in">
          <h2 className="delay-1">{processHomeData.heading}</h2>
          <p className="subtitle delay-2">{processHomeData.heading2}</p>
        </div>

        {/* Timeline List */}
        <div className="process-timeline">
          {/* Central Line Vector with GSAP Fill Child */}
          <div className="process-line">
            <div ref={lineFillRef} className="process-line-fill" />
          </div>

          {processHomeData.process.map((step, index) => {
            const isEven = index % 2 === 1; // 02, 04...

            return (
              <div
                key={step.id}
                className={`timeline-item ${isEven ? "even" : "odd"}`}
              >
                {/* Content Block */}
                <div className="timeline-content fade-in">
                  <p className="step-number delay-1">0{step.id}</p>
                  <h3 className="step-title delay-2">{step.title}</h3>
                  <p className="step-description delay-3">{step.description}</p>
                </div>

                {/* Star Marker Component */}
                <div className="timeline-marker">
                  <svg
                    className="diamond-icon"
                    viewBox={processHomeData.markerIcon.viewBox}
                    fill="currentColor"
                  >
                    <path d={processHomeData.markerIcon.path} />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="process-cta fade-in">
          <Link className="page-link" to={processHomeData.cta.path}>
            {processHomeData.cta.text}
            {ButtonIcon && <ButtonIcon />}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProcessHome;
