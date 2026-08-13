import { collections } from "../data";
import { Link } from "react-router";

const CollectionsHome = () => {
  const Icon = collections.icon;

  return (
    <section className="collections-bento-section">
      <div className="section-header">
        <div className="header-left">
          <h2>{collections.header}</h2>
        </div>
        <div className="header-right">
          <p>
            Explore our handcrafted fine jewelry collections, designed to
            celebrate life's most cherished milestones and moments.
          </p>
          <Link to={collections.linkTo} className="page-link right">
            View All <Icon />
          </Link>
        </div>
      </div>

      <div className="collections-grid">
        {collections.items.map((item, index) => (
          <Link
            to={item.link}
            key={item.id}
            className={`bento-card bento-card-${index + 1}`}
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
