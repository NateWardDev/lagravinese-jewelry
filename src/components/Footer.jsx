import { footerData } from "../data";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  // Shared Link Click Handler for Home & Hash scrolling
  const handleLinkClick = (e, targetPath) => {
    const [targetBase, targetHash] = targetPath.split("#");
    const isSamePage =
      pathname === targetBase || (targetBase === "/" && pathname === "/");

    if (isSamePage) {
      if (targetHash) {
        e.preventDefault();
        const element = document.getElementById(targetHash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", targetPath);
        }
      } else if (targetPath === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
      }
    }
  };

  // Hide on /work and all nested sub-routes
  if (pathname.startsWith("/work")) {
    return null;
  }

  const locationSection = footerData.sections.find(
    (sec) => sec.id === "location",
  );

  return (
    <footer className="site-footer">
      <div className="footer-content">
        {/* Top Links Grid */}
        <div className="footer-links-grid">
          {footerData.sections
            .filter((sec) => sec.id !== "location")
            .map((section) => (
              <div key={section.id} className="footer-section">
                <h3>{section.heading}</h3>
                {section.id === "social" ? (
                  <ul className="social-list">
                    {section.links.map((social) => {
                      const Icon = social.icon;
                      return (
                        <li key={social.name}>
                          <a
                            href={social.link}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={social.name}
                          >
                            {Icon && <Icon />}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <nav>
                    <ul>
                      {section.links.map((link) => (
                        <li key={link.linkName}>
                          <Link
                            to={link.linkPath}
                            onClick={(e) => handleLinkClick(e, link.linkPath)}
                          >
                            {link.linkName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>
            ))}
        </div>

        {/* Location Standalone Block Above Divider */}
        {locationSection && (
          <div className="footer-location-block">
            <h3>{locationSection.heading}</h3>
            <div className="location-info">
              <address className="footer-address">
                {locationSection.address}
              </address>
              <span className="appointment-note">{locationSection.note}</span>
            </div>
          </div>
        )}
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} {footerData.bottom.companyName}. All
          rights reserved.
        </p>
        <p>
          {footerData.bottom.creditText}{" "}
          <a
            href={footerData.bottom.creditUrl}
            target="_blank"
            rel="noreferrer"
          >
            {footerData.bottom.creditName}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
