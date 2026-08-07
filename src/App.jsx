import { useEffect } from "react";
import { useLocation } from "react-router";
import "./styles/reset.scss";
import "./styles/main.scss";
import "./styles/font-sizes.scss";
import { Routes, Route } from "react-router";
import OurWorkPage from "./pages/OurWorkPage";
import HomePage from "./pages/HomePage";
import JourneyPage from "./pages/JourneyPage";
import InquiriesPage from "./pages/InquiriesPage";
import CategoryPage from "./pages/CategoryPage";
import Topnav from "./components/Topnav";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <ScrollToTop />
      <Topnav />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/work" element={<OurWorkPage />} />
        <Route path="/work/:id" element={<CategoryPage />} />
        <Route path="/inquiries" element={<InquiriesPage />} />
      </Routes>
      <Footer />
    </>
  );
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return null;
};

export default App;
