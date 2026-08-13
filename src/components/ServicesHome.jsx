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
        <h2>{services.header.toUpperCase()}</h2>
      </div>

      {/* 3-Column Grid */}
      <div className="services-grid">
        {services.items.map((item) => {
          const ItemIcon = item.icon;

          return (
            <div key={item.title} className="service-column">
              {/* React Icon Tag */}
              {ItemIcon && <ItemIcon className="service-icon" />}

              {/* Title & Description */}
              <h3 className="column-title">{item.title}</h3>
              <p className="column-description">{item.description}</p>
            </div>
          );
        })}
      </div>

      {/* Centered Footer CTA */}
      {services.pageLink && (
        <Link to={services.linkTo} className="page-link services-footer">
          <span>{services.pageLink}</span>
          <FooterIcon />
        </Link>
      )}
    </section>
  );
};

export default ServicesHome;
