import { collections } from "../data";
import { Link } from "react-router";

const CollectionsHome = () => {
  const Icon = collections.icon;

  return (
    <section className="collections-bento-section">
      <div className="section-header fade-in">
        <div className="header-left">
          <h2 className="delay-1">{collections.header}</h2>
        </div>
        <div className="header-right">
          <p className="delay-2">{collections.introText}</p>
          <div className="delay-3">
            <Link to={collections.linkTo} className="page-link right">
              {collections.buttonText} <Icon />
            </Link>
          </div>
        </div>
      </div>

      <div className="collections-grid">
        {collections.items.map((item, index) => (
          <Link
            to={`/work/${item.id}`}
            key={item.id}
            className={`bento-card bento-card-${index + 1} fade-in`}
          >
            <div className="img-wrapper">
              <img src={item.image} alt={item.alt} />
            </div>

            <div className="card-overlay">
              <h3 className="card-title">{item.title}</h3>
              <div className="action-circle">
                <Icon />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CollectionsHome;
