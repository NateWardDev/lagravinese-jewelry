import { Link } from "react-router";

const PrivatePolicy = () => {
  const sections = [
    { id: "info-collect", title: "1. Information We Collect" },
    { id: "info-use", title: "2. How We Use Your Information" },
    { id: "data-sharing", title: "3. Data Sharing and Disclosure" },
    { id: "external-links", title: "4. External Links & Social Media" },
    { id: "contact", title: "5. Contact Us" },
  ];

  return (
    <>
      <header className="private-policy-header">
        {/* Navigation Header */}
        <nav>
          <Link to="/">&larr; Back to Home</Link>
        </nav>

        {/* Title & Metadata */}
        <header>
          <h1>Privacy Policy</h1>
          <p>Last Updated: August 17, 2026</p>
        </header>
      </header>
      <section className="private-policy">
        {/* Quick Navigation / Table of Contents */}
        <div>
          <h2>On This Page</h2>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Overview */}
        <div>
          <p>
            At LaGravinese Jewelry, we value your privacy and are committed to
            protecting the personal information you share with us. This website
            serves as a portfolio of our work and a platform to inquire about
            our custom jewelry services. We do not collect payments, process
            financial transactions, or store credit card details on this
            website.
          </p>
          <p>
            This Privacy Policy outlines how we collect, use, and safeguard your
            information when you visit our website or send us a request through
            our contact form.
          </p>
        </div>

        {/* Main Sections */}
        <div className="main-sections-wrapper">
          {/* Section 1 */}
          <di id="info-collect">
            <h3>1. Information We Collect</h3>
            <p>
              We only collect personal information that you voluntarily submit
              through our inquiry form:
            </p>
            <ul>
              <li>
                <strong>Contact Information:</strong> First name, last name,
                email address, and phone number.
              </li>
              <li>
                <strong>Project Details:</strong> Your selected area of interest
                (e.g., custom engagement rings, appraisals, heirloom redesigns),
                project descriptions, metal/gemstone preferences, and timeline
                details.
              </li>
              <li>
                <strong>Uploaded Files:</strong> Design inspiration photos,
                sketches, or images of existing jewelry attached to your
                inquiry.
              </li>
            </ul>
          </di>

          {/* Section 2 */}
          <div id="info-use">
            <h3>2. How We Use Your Information</h3>
            <p>
              The information you submit is used exclusively to evaluate and
              respond to your inquiry:
            </p>
            <ul>
              <li>
                To contact you regarding your project, consultation, or service
                request.
              </li>
              <li>
                To review your design ideas, inspiration photos, and preferences
                prior to your consultation.
              </li>
              <li>
                To coordinate appointments for local pickup in Scottsdale,
                Arizona, or to discuss custom projects.
              </li>
              <li>
                To maintain internal record-keeping for client consultations.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div id="data-sharing">
            <h3>3. Data Sharing and Disclosure</h3>
            <p>
              We do not sell, trade, or rent your personal information or
              uploaded attachments to third parties. We may share your data only
              in the following limited circumstances:
            </p>
            <ul>
              <li>
                <strong>Website Service Providers:</strong> Trusted vendors who
                help host our website or deliver contact form submissions to our
                inbox.
              </li>
              <li>
                <strong>Legal Requirements:</strong> If required to do so by law
                or to protect the rights and safety of LaGravinese Jewelry and
                our clients.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div id="external-links">
            <h3>4. External Links &amp; Social Media</h3>
            <p>
              Our website includes links to external social media profiles (such
              as{" "}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>{" "}
              and{" "}
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                TikTok
              </a>
              ). We do not control and are not responsible for the privacy
              practices of these third-party platforms. We encourage you to
              review their respective privacy policies when visiting them.
            </p>
          </div>

          {/* Section 5 */}
          <div id="contact">
            <h3>5. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy or how your
              inquiry information is handled, please reach out through our{" "}
              <Link to="/inquiries">Inquiries Page</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivatePolicy;
