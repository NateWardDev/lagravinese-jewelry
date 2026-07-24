import { useState } from "react";
import { faqData } from "../data";

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(-1);

  const current = faqData[activeCategory];

  return (
    <section className="faq" id="faq">
      <div className="content-wrapper">
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-layout">
          {/* Left Navigation */}
          <div className="faq-nav">
            {faqData.map((item, index) => (
              <button
                key={item.category}
                className={activeCategory === index ? "active" : ""}
                onClick={() => {
                  setActiveCategory(index);
                  setActiveQuestion(-1);
                }}
              >
                {item.category}
              </button>
            ))}
          </div>

          {/* Right Questions */}
          <div className="faq-content">
            {current.questions.map((item, index) => (
              <div className="faq-item" key={item.question}>
                <button
                  className={`faq-question ${activeQuestion === index ? "active" : ""}`}
                  onClick={() =>
                    setActiveQuestion(activeQuestion === index ? -1 : index)
                  }
                >
                  {item.question}
                </button>

                {activeQuestion === index && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
