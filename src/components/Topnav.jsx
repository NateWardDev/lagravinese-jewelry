import { useState, useEffect } from "react";
import { navLinks, socialLinks, logo, navConfig } from "../data";
import { Link, useLocation } from "react-router";

const Topnav = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [navScroll, setNavScroll] = useState(false);
  const [navHide, setNavHide] = useState(false);

  const { pathname, hash } = useLocation();
  const fullPath = pathname + hash;

  // Extract base paths (e.g. "/#process" -> "/") to verify valid routes
  const mainPages = navLinks.map((item) => item.linkPath.split("#")[0]);

  // Dynamic check for dark text styling based on data config
  const isDarkText =
    !mainPages.includes(pathname) ||
    (navConfig?.darkTextRoutes && navConfig.darkTextRoutes.includes(pathname));

  const handleLinkClick = (e, targetPath) => {
    setNavOpen(false);

    if (targetPath === "/" && pathname === "/" && !hash) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (targetPath.includes("#")) {
      const [basePath, targetHash] = targetPath.split("#");

      if (pathname === basePath || (basePath === "/" && pathname === "/")) {
        e.preventDefault();
        window.history.pushState(null, "", targetPath);

        const element = document.getElementById(targetHash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

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

  useEffect(() => {
    let previousScrollY = window.scrollY || window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;

      setNavScroll(currentScrollY !== 0);

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
        className={`topnav ${navScroll ? "nav-scroll-color" : ""} ${
          navHide ? "hide-menu" : ""
        } ${isDarkText ? "dark-text" : ""}`}
      >
        {/* Mobile Header */}
        <div className="mobile-container">
          <Link
            to="/"
            className="logo"
            onClick={(e) => handleLinkClick(e, "/")}
          >
            {logo}
          </Link>

          <button
            aria-label={
              navConfig?.mobileMenuAriaLabel || "Toggle navigation menu"
            }
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
            {logo}
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
            {socialLinks.map((social) => {
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
            {socialLinks.map((social) => {
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
        </nav>
      </div>
    </>
  );
};

export default Topnav;
