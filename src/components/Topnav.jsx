import { useState, useEffect } from "react";
import { navLinks, socialLinks } from "../data";
import { Link, useLocation } from "react-router";

const Topnav = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [navScroll, setNavScroll] = useState(false);
  const [navHide, setNavHide] = useState(false);

  // Get both pathname and hash from React Router
  const { pathname, hash } = useLocation();
  const fullPath = pathname + hash;

  // Extract base paths (e.g. "/#process" -> "/") so mainPages checks work
  const mainPages = navLinks.map((item) => item.linkPath.split("#")[0]);

  // Is dark text needed?
  const isDarkText = !mainPages.includes(pathname) || pathname === "/inquiries";

  // Shared Link Click Handler for Home & Hash reset logic
  const handleLinkClick = (e, targetPath) => {
    setNavOpen(false);

    // 1. Home link clicked while on homepage
    if (targetPath === "/" && pathname === "/" && !hash) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // 2. Hash link clicked (e.g. "/#process")
    if (targetPath.includes("#")) {
      const [basePath, targetHash] = targetPath.split("#");

      // If already on the homepage / page with the section
      if (pathname === basePath || (basePath === "/" && pathname === "/")) {
        e.preventDefault(); // Prevent standard React Router navigation duplicate

        // Update URL hash without causing a page jump
        window.history.pushState(null, "", targetPath);

        // Scroll to the target element immediately
        const element = document.getElementById(targetHash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  // 1. Handle Smooth Scrolling for initial page load or route changes with Hash Links
  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [pathname, hash]);

  // 2. Scroll listener for hide/show and background styling
  useEffect(() => {
    let previousScrollY = window.scrollY || window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;

      // Always update the scroll color
      setNavScroll(currentScrollY !== 0);

      // Only hide/show the nav when the mobile menu is closed
      if (!navOpen) {
        if (previousScrollY < currentScrollY && currentScrollY > 100) {
          setNavHide(true);
        } else if (previousScrollY > currentScrollY) {
          setNavHide(false);
        }
      }

      previousScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navOpen]);

  return (
    <>
      <nav
        className={`topnav ${navScroll ? "nav-scroll-color" : ""} ${navHide ? "hide-menu" : ""} ${isDarkText ? "dark-text" : ""}`}
      >
        {/* Mobile Header */}
        <div className="mobile-container">
          <Link
            to="/"
            className="logo"
            onClick={(e) => handleLinkClick(e, "/")}
          >
            LaGravinese
          </Link>

          <button
            aria-label="Toggle navigation menu"
            className={`mobile-menu-bars ${navOpen ? "menu-open" : ""}`}
            onClick={() => setNavOpen(!navOpen)}
          >
            <div className="bar bar1"></div>
            <div className="bar bar2"></div>
            <div className="bar bar3"></div>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="desktop-container">
          <Link
            to="/"
            className="logo"
            onClick={(e) => handleLinkClick(e, "/")}
          >
            LaGravinese
          </Link>

          <ul className="main-links">
            {navLinks.map((link) => {
              const isActive = link.linkPath === (hash ? fullPath : pathname);

              return (
                <li key={link.linkName}>
                  <Link
                    to={link.linkPath}
                    className={isActive ? "active" : ""}
                    onClick={(e) => handleLinkClick(e, link.linkPath)}
                  >
                    {link.linkName}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className="social-links">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      <div className={`overlay-nav ${navOpen ? "menu-open" : ""}`}>
        <nav className="main-nav">
          <ul className="main-links">
            {navLinks.map((link) => {
              const isActive = link.linkPath === (hash ? fullPath : pathname);

              return (
                <li key={link.linkName}>
                  <Link
                    to={link.linkPath}
                    className={isActive ? "active" : ""}
                    onClick={(e) => handleLinkClick(e, link.linkPath)}
                  >
                    {link.linkName}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className="social-links">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Topnav;
