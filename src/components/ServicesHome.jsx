import { services } from "../data";
import { Link } from "react-router";

const ServicesHome = () => {
  const FooterIcon = services.icon;

  return (
    <section className="services-feature-section">
      {/* Top Banner Box */}
      <div className="services-hero-banner">
        <div className="img-wrapper">
          <img src={services.image} alt={services.imgAlt} />
        </div>
        <h2 className="fade-in">{services.header.toUpperCase()}</h2>
      </div>

      {/* 3-Column Grid */}
      <div className="services-content-wrapper">
        <div className="services-grid">
          {services.items.map((item) => {
            const ItemIcon = item.icon;

            return (
              <div key={item.title} className="service-column fade-in">
                {/* React Icon Tag */}
                {ItemIcon && <ItemIcon className="service-icon delay-1" />}

                {/* Title & Description */}
                <h3 className="column-title delay-2">{item.title}</h3>
                <p className="column-description delay-3">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Centered Footer CTA */}
        <div className="fade-in">
          {services.pageLink && (
            <Link to={services.linkTo} className="page-link services-footer">
              <span>{services.pageLink}</span>
              <FooterIcon />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesHome;
