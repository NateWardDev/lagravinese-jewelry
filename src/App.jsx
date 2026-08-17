import { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router";
import "./styles/reset.scss";
import "./styles/main.scss";
import "./styles/font-sizes.scss";

import OurWorkPage from "./pages/OurWorkPage";
import HomePage from "./pages/HomePage";
import JourneyPage from "./pages/JourneyPage";
import InquiriesPage from "./pages/InquiriesPage";
import CategoryPage from "./pages/CategoryPage";
import PrivatePolicy from "./pages/PrivatePolicy";
import Topnav from "./components/Topnav";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const { pathname } = useLocation();

  // Global Fade-In Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // Trigger once per element
          }
        });
      },
      { threshold: 0.075 }, // Fires when 7.5% of element comes into view
    );

    // Automatically observes all structural sections + manual .fade-in items
    const animatedElements = document.querySelectorAll(".fade-in");
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

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
        <Route path="/privacy-policy" element={<PrivatePolicy />} />
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
