import { useState, useEffect } from "react";
import { navLinks, socialLinks } from "../data";
import { Link, useLocation } from "react-router";

const Topnav = () => {
  // hammenu clicked open
  const [navOpen, setNavOpen] = useState(false);
  // user scroll change background color of navbar
  const [navScroll, setNavScroll] = useState(false);
  // hide navbar when scroll down | show navbar when scroll up
  const [navHide, SetNavHide] = useState(false);

  // pathname
  const pathname = useLocation().pathname;

  // List all main root pages here
  const mainPages = navLinks.map((item) => item.linkPath);

  // Is dark text needed? True if current pathname is NOT in mainPages
  const isDarkText = !mainPages.includes(pathname);

  // for scroll events to hide/ change color of the navbar
  useEffect(() => {
    let previousScrollY = window.scrollY || window.pageYOffset;
    const handleScroll = () => {
      // navbar
      const currentScrollY = window.scrollY || window.pageYOffset;

      if (previousScrollY < currentScrollY && currentScrollY > 100) {
        SetNavHide(true);
      } else if (previousScrollY > currentScrollY) {
        SetNavHide(false);
      }

      if (currentScrollY !== 0) {
        setNavScroll(true);
      } else {
        setNavScroll(false);
      }

      previousScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* topnav */}
      <nav
        className={`topnav ${navScroll ? "nav-scroll-color" : ""} ${navHide ? "hide-menu" : ""} ${isDarkText ? "dark-text" : ""}`}
      >
        {/* mobile ham menu & logo */}
        <div className="mobile-container">
          <Link link to="/" className="logo">
            LG
          </Link>

          <button
            className={`mobile-menu-bars ${navOpen ? "menu-open" : ""}`}
            onClick={() => setNavOpen(!navOpen)}
          >
            <div className="bar bar1"></div>
            <div className="bar bar2"></div>
            <div className="bar bar3"></div>
          </button>
        </div>

        {/* destop menu  */}
        <div className="desktop-container">
          <Link to="/" className="logo">
            LaGravinese
          </Link>

          <ul className="main-links">
            {navLinks.map((link) => (
              <li key={link.linkName}>
                <Link
                  to={link.linkPath}
                  className={link.linkPath === pathname ? "active" : ""}
                >
                  {link.linkName}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="social-links">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a href={social.link} target="_blank" rel="noopener noreferrer">
                  <social.icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`overlay-nav ${navOpen ? "menu-open" : ""}`}>
        <nav className="main-nav">
          <ul className="main-links">
            {navLinks.map((link) => (
              <li key={link.linkName}>
                <Link
                  to={link.linkPath}
                  className={link.linkPath === pathname ? "active" : ""}
                  onClick={() => setNavOpen(!navOpen)}
                >
                  {link.linkName}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="social-links">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a href={social.link} target="_blank" rel="noopener noreferrer">
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
