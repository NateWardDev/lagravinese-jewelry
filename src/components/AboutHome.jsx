import { homeAboutData } from "../data";

const AboutHome = () => {
  return (
    <section className="about bg-color-two">
      <div className="content-wrapper">
        <div className="img-wrapper">
          <img src={homeAboutData.image.src} alt={homeAboutData.image.alt} />
        </div>

        <div className="text-wrapper">
          <h2>{homeAboutData.heading}</h2>

          {homeAboutData.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <a className="page-link white left" href={homeAboutData.button.path}>
            {homeAboutData.button.text}
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutHome;
