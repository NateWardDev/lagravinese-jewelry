import { useLocation, Link } from "react-router";
import { headerData } from "../data";
import { FaArrowRight } from "react-icons/fa6";

const Header = () => {
  const { pathname } = useLocation();

  const headerItem = headerData.find((item) => item.path === pathname);

  if (!headerItem || !headerItem.img || pathname.startsWith("/work")) {
    return null;
  }

  const { card } = headerItem;

  return (
    <div className="header-container">
      <header className={`header-hero ${headerItem.name}`}>
        {/* Background Image */}
        <div className="img-wrapper">
          <img src={headerItem.img} alt={headerItem.mainText} />
          <div className="hero-overlay" />
        </div>

        {/* Center Typography */}
        <div className="text-wrapper fade-in">
          <h1 className="delay-1">{headerItem.mainText}</h1>
          {headerItem.secondText && (
            <h2 className="delay-2">{headerItem.secondText}</h2>
          )}
        </div>

        {/* Floating Glass Card (Only renders when defined) */}
        {card && (
          <div className="glass-card fade-in">
            <p className="delay-1">{card.description}</p>
            <div className="delay-2">
              <Link to={card.buttonPath} className="page-link left">
                <span>{card.buttonText}</span>
                <FaArrowRight />
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
