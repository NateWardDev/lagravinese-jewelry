import { footerData } from "../data";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  // Hide on /work and all nested sub-routes
  if (pathname.startsWith("/work")) {
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="footer-content">
        {footerData.map((section) => (
          <div
            key={section.id}
            className={`footer-section ${section.className || ""}`}
          >
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
                        rel="noopener noreferrer"
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
                      <Link to={link.linkPath}>{link.linkName}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} LaGravinese Jewelry. All rights
          reserved.
        </p>
        <p>
          Website by{" "}
          <a
            href="https://narleywebstudios.com"
            target="_blank"
            rel="noreferrer"
          >
            Narley Web Studios
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
