import { footerData } from "../data";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  // Hide on /work and all nested sub-routes (e.g., /work/:id)
  if (pathname.startsWith("/work")) {
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="sticky-container">
        <div className="sticky-area">
          {footerData.map((section) => (
            <div key={section.id} className={section.className}>
              {section.id === "navigation" && (
                <>
                  <h3>{section.heading}</h3>

                  <nav>
                    <ul>
                      {section.links.map((link) => (
                        <li key={link.linkName}>
                          <Link to={link.linkPath}>{link.linkName}</Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </>
              )}

              {section.id === "legal" && (
                <>
                  <h3>{section.heading}</h3>

                  <nav>
                    <ul>
                      {section.links.map((link) => (
                        <li key={link.linkName}>
                          <Link to={link.linkPath}>{link.linkName}</Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </>
              )}

              {section.id === "social" && (
                <div className="social-links">
                  <h3>{section.heading}</h3>

                  <ul>
                    {section.links.map((social) => {
                      const Icon = social.icon;

                      return (
                        <li key={social.name}>
                          <a
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Icon />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          ))}

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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
