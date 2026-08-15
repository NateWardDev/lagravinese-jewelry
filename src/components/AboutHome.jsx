import { homeAboutData } from "../data";
import { Link } from "react-router";

const AboutHome = () => {
  const ButtonIcon = homeAboutData.button.icon;
  return (
    <section className="about-section">
      <div className="about-container">
        {/* Left Column: Overlapping Images */}
        <div className="images-column">
          {/* Outer Gold Border Frame */}
          <div className="gold-frame fade-in">
            {/* Primary Large Image */}
            <div className="primary-img-wrapper img-wrapper delay-1">
              <img
                src={homeAboutData.images.src1}
                alt={homeAboutData.images.alt1}
              />
            </div>

            {/* Secondary Overlapping Floating Image */}
            <div className="secondary-img-wrapper img-wrapper delay-2">
              <img
                src={homeAboutData.images.src2}
                alt={homeAboutData.images.alt2}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Bordered Text Card */}
        <div className="text-card fade-in">
          <h2 className="about-heading delay-1">{homeAboutData.heading}</h2>

          <div className="paragraphs-wrapper delay-2">
            {homeAboutData.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="delay-3">
            <Link to={homeAboutData.button.path} className="page-link">
              <span>{homeAboutData.button.text}</span>
              {ButtonIcon && <ButtonIcon />}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHome;
