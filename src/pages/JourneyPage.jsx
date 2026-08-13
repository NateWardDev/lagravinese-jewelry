import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { journeyTimeline, journeyTimelineMobile } from "../data";

gsap.registerPlugin(ScrollTrigger);

const JourneyPage = () => {
  const containerRef = useRef(null);
  const imagesRef = useRef(null);
  const rightItemsRef = useRef([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Only run GSAP ScrollTrigger on Desktop
      mm.add("(min-width: 1024px)", () => {
        const imagesContainer = imagesRef.current;
        const totalItems = journeyTimeline.images.length;
        if (!imagesContainer) return;

        // Calculate scroll height cleanly inside matchMedia context
        const totalScrollDistance =
          imagesContainer.scrollHeight - window.innerHeight;

        // Reset text positions for initial state
        rightItemsRef.current.forEach((el, idx) => {
          if (!el) return;
          gsap.set(el, {
            opacity: idx === 0 ? 1 : 0,
            y: idx === 0 ? 0 : 10,
          });
        });

        const trigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalScrollDistance + window.innerHeight}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true, // Recalculate measurements on window resize
          animation: gsap.to(imagesContainer, {
            y: -totalScrollDistance,
            ease: "none",
          }),
          onUpdate: (self) => {
            const activeIndex = Math.min(
              Math.floor(self.progress * totalItems),
              totalItems - 1,
            );

            rightItemsRef.current.forEach((el, idx) => {
              if (!el) return;
              const isActive = idx === activeIndex;
              gsap.to(el, {
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : 10,
                duration: 0.25,
                overwrite: "auto",
              });
            });
          },
        });

        // Cleanup function inside matchMedia
        return () => trigger.kill();
      });
    },
    { scope: containerRef },
  );

  return (
    <>
      {/* Mobile Feed */}
      <section className="timeline mobile">
        {journeyTimelineMobile.map((item, index) => (
          <div className="timeline-section" key={index}>
            <div className="timeline-text">
              <h4 className="text-year">
                {item.generation} {item.years}
              </h4>
              <h2>{item.head}</h2>
              <p>{item.desc}</p>
            </div>
            <div className="img-wrapper">
              <img src={item.imgSrc} alt={item.imgAlt} />
            </div>
          </div>
        ))}
      </section>

      {/* Desktop Scroll Section */}
      <section className="timeline desktop" ref={containerRef}>
        <div className="timeline-images-viewport">
          <div className="timeline-images" ref={imagesRef}>
            {journeyTimeline.images.map((item, index) => (
              <div className="img-wrapper" key={index}>
                <img src={item.imgSrc} alt={item.imgAlt} />
              </div>
            ))}
          </div>
        </div>

        <div className="timeline-text">
          {journeyTimeline.text.map((item, index) => (
            <div
              className="text-wrapper"
              key={index}
              ref={(el) => (rightItemsRef.current[index] = el)}
            >
              <h4 className="text-year">
                {item.generation} {item.years}
              </h4>
              <h2>{item.head}</h2>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default JourneyPage;
