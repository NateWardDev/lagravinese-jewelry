import { testimonialsData } from "../data";

const TestimonialsHome = () => {
  return (
    <section className="testimonials">
      <h2>{testimonialsData.heading}</h2>

      <div className="content-wrapper">
        {testimonialsData.testimonials.map((testimonial) => (
          <div className="card" key={testimonial.id}>
            <div className="img-wrapper couple-photo">
              <img
                src={testimonial.clientImage}
                alt={testimonial.clientImageAlt}
              />
            </div>

            <div className="background-image img-wrapper">
              <img
                src={testimonial.jewelryImage}
                alt={testimonial.jewelryImageAlt}
              />
            </div>

            <div className="text-wrapper">
              <p className="text">{testimonial.testimonial}</p>

              <p className="names">~{testimonial.clientNames}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsHome;
