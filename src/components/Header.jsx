import { useLocation, Link } from "react-router";
import { headerData } from "../data";
import { FaPlay, FaArrowRight } from "react-icons/fa6";

const Header = () => {
  const pathname = useLocation().pathname;

  const headerItem = headerData.find((item) => item.path === pathname);
  if (!headerItem) return null;

  if (pathname.startsWith("/work")) {
    return null;
  }

  return (
    <div className="header-container">
      <header className={`header-hero ${headerItem.name}`}>
        {/* Background Image */}
        <div className="img-wrapper">
          <img src={headerItem.img} alt={headerItem.mainText} />
          <div className="hero-overlay" />
        </div>

        {/* Center Giant Typography */}
        <div className="text-wrapper">
          <h1>{headerItem.mainText}</h1>
          {headerItem.secondText && <h2>{headerItem.secondText}</h2>}
        </div>

        {/* Bottom Floating Glass Card */}
        <div className="glass-card">
          <p>
            Crafting fine jewelry that harmonizes modern elegance with timeless
            craftsmanship. Redefining high luxury for everyday moments.
          </p>
          <Link to="/work" className="page-link left">
            <span>Explore Collections</span>
            <FaArrowRight />
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
