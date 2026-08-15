import { useState, useLayoutEffect, useRef } from "react";
import { contactForm } from "../data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Inquiries = () => {
  const [activeSelect, setActiveSelect] = useState(0);
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  const ButtonIcon = contactForm.icon;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: imageRef.current,
        pinSpacing: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="inquiries-section" ref={sectionRef} id="contact">
      {/* Structural Isolated Content Split Outer Shell */}
      <div className="inquiries-grid-wrapper">
        {/* Left Rigid Structural Box (Prevents flex calculation collapses during pin shifts) */}
        <div className="inquiries-visual-column">
          {/* Inner target element pinned by GSAP */}
          <div className="images-container" ref={imageRef}>
            {contactForm.images.map((image) => (
              <div
                className={`img-wrapper ${activeSelect === image.id ? "active" : ""}`}
                key={image.id}
              >
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Isolated Form Context Panel */}
        <form className="contact-form fade-in">
          <h2 className="delay-1">{contactForm.title}</h2>
          <p className="delay-2">{contactForm.description}</p>

          <div className="field-group">
            <label htmlFor="firstName">
              {contactForm.fields.firstName.label}
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder={contactForm.fields.firstName.placeholder}
              autoComplete="given-name"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="lastName">
              {contactForm.fields.lastName.label}
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder={contactForm.fields.lastName.placeholder}
              autoComplete="family-name"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="email">{contactForm.fields.email.label}</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={contactForm.fields.email.placeholder}
              autoComplete="email"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="phone">{contactForm.fields.phone.label}</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder={contactForm.fields.phone.placeholder}
              autoComplete="tel"
            />
          </div>

          <div className="field-group">
            <label htmlFor="interest">
              {contactForm.fields.interest.label}
            </label>
            <select
              id="interest"
              name="interest"
              value={activeSelect}
              onChange={(e) => setActiveSelect(Number(e.target.value))}
              required
            >
              <option value="" disabled>
                {contactForm.fields.interest.placeholder}
              </option>
              <optgroup label="Fine Jewelry">
                {contactForm.productOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Jewelry Services">
                {contactForm.serviceOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="attachments">
              {contactForm.fields.attachments.label}
            </label>
            <input
              id="attachments"
              name="attachments"
              type="file"
              accept="image/*,.pdf"
              multiple
            />
            <p className="field-details">
              {contactForm.fields.attachments.helper}
            </p>
          </div>

          <div className="field-group">
            <label htmlFor="message">{contactForm.fields.message.label}</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder={contactForm.fields.message.placeholder}
              required
            />
          </div>

          <button className="page-link left" type="submit">
            {contactForm.submitText}
            {ButtonIcon && <ButtonIcon />}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Inquiries;
