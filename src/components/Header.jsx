import { useLocation } from "react-router";
import { headerData } from "../data";

const Header = () => {
  const pathname = useLocation().pathname;

  const headerItem = headerData.find((item) => item.path === pathname);
  if (!headerItem) return null;

  return (
    <header className={`header-hero ${headerItem.name}`}>
      {/* Background Image Container */}
      <div className="img-wrapper">
        <img src={headerItem.img} alt={headerItem.mainText} />
      </div>

      {/* Centered Hero Text */}
      <div className="text-wrapper">
        <h1>{headerItem.mainText}</h1>
        <h2>{headerItem.secondText}</h2>
      </div>
    </header>
  );
};

export default Header;
