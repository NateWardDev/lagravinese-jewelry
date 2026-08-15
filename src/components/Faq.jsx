import { useState } from "react";
import { faqData } from "../data";

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(-1);
  const [activeQuestion, setActiveQuestion] = useState(-1);

  const handleCategoryClick = (categoryIndex) => {
    setActiveCategory(activeCategory === categoryIndex ? -1 : categoryIndex);
    setActiveQuestion(-1);
  };

  return (
    <section className="faq" id="faq">
      <div className="content-wrapper fade-in">
        <div className="faq-header delay-1">
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-layout-vertical delay-2">
          {faqData.map((catItem, catIndex) => {
            const isCatActive = activeCategory === catIndex;

            return (
              <div
                key={catItem.category}
                className={`faq-category-card ${isCatActive ? "category-active" : ""}`}
              >
                <button
                  className="faq-category-toggle"
                  onClick={() => handleCategoryClick(catIndex)}
                >
                  {catItem.category}
                </button>

                {/* Enclosed content is ALWAYS rendered now, state dictates height via class */}
                <div
                  className={`faq-enclosed-content-wrapper ${isCatActive ? "is-open" : ""}`}
                >
                  <div className="faq-enclosed-content">
                    {catItem.questions.map((qItem, qIndex) => {
                      const isQActive = activeQuestion === qIndex;

                      return (
                        <div className="faq-item" key={qItem.question}>
                          <button
                            className={`faq-question ${isQActive ? "active" : ""}`}
                            onClick={() =>
                              setActiveQuestion(isQActive ? -1 : qIndex)
                            }
                          >
                            <span>{qItem.question}</span>
                            <span className="arrow-icon">▼</span>
                          </button>

                          {/* Answer is ALWAYS rendered now, state dictates height via class */}
                          <div
                            className={`faq-answer-wrapper ${isQActive ? "is-open" : ""}`}
                          >
                            <div className="faq-answer">
                              <p>{qItem.answer}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faq-footer">
          <p className="fade-in">
            Have other questions? <a href="#contact">Contact us directly</a>
            —we're here to help!
          </p>
        </div>
      </div>
    </section>
  );
}
