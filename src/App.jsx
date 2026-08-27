import { useEffect } from "react";
// Change import from "react-router" to "react-router-dom"
import { useLocation, Routes, Route } from "react-router-dom";
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

  // Hide global Header/Footer on full-screen slider pages if needed
  const isFullScreenPage = pathname.startsWith("/work/");

  // Global Fade-In Scroll Observer
  useEffect(() => {
    let observer;

    const timeoutId = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.075 },
      );

      const animatedElements = document.querySelectorAll(".fade-in");
      animatedElements.forEach((el) => observer.observe(el));
    });

    return () => {
      cancelAnimationFrame(timeoutId);
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  // Lock body scroll and prevent elastic bounce on full-screen slider routes
  useEffect(() => {
    if (isFullScreenPage) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isFullScreenPage]);

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
      {!isFullScreenPage && <Footer />}
    </>
  );
}

// Fixed ScrollToTop Component
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If navigating to an inline anchor tag (e.g. #info-collect), don't override scroll to top
    if (hash) return;

    // Use requestAnimationFrame to reset scroll right after React renders the new route
    const frameId = requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // Bypasses CSS smooth-scroll overrides
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    return () => cancelAnimationFrame(frameId);
  }, [pathname, hash]);

  return null;
};

export default App;
