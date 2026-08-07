import { FaInstagram, FaTiktok, FaArrowRight } from "react-icons/fa";

export const navLinks = [
  {
    linkName: "Home",
    linkPath: "/",
    navColor: "light-text",
  },
  {
    linkName: "Our Journey",
    linkPath: "/journey",
    navColor: "light-text",
  },
  {
    linkName: "Our Work",
    linkPath: "/work",
    navColor: "light-text",
  },
  {
    linkName: "Inquiries",
    linkPath: "/inquiries",
    navColor: "dark-text",
  },
];

export const socialLinks = [
  {
    name: "Instagram",
    icon: FaInstagram,
    link: "https://www.instagram.com/lagravinesejewelry/?hl=en",
  },
  {
    name: "TikTok",
    icon: FaTiktok,
    link: "",
  },
];

export const footerData = [
  {
    id: "navigation",
    heading: "Site Links",
    links: [
      {
        linkName: "Home",
        linkPath: "/",
      },
      {
        linkName: "Our Journey",
        linkPath: "/journey",
      },
      {
        linkName: "Our Work",
        linkPath: "/work",
      },
      {
        linkName: "Inquiries",
        linkPath: "/inquiries",
      },
    ],
  },
  {
    id: "legal",
    heading: "Other Links",
    links: [
      {
        linkName: "Privacy Policy",
        linkPath: "/privacy-policy",
      },
      {
        linkName: "FAQ",
        linkPath: "/inquiries#faq",
      },
    ],
  },
  {
    id: "social",
    heading: "Social Media",
    links: [
      {
        name: "Instagram",
        icon: FaInstagram,
        link: "https://www.instagram.com/lagravinesejewelry/?hl=en",
      },
      {
        name: "TikTok",
        icon: FaTiktok,
        link: "",
      },
    ],
  },
];

// images for headers
import homeImage from "/images/greenCoat.jpeg";
import journeyImage from "/images/greenCoat.jpeg";
import workImage from "/images/greenCoat.jpeg";
import inquiriesImage from "/images/greenCoat.jpeg";
export const headerData = [
  {
    path: "/",
    name: "home",
    img: homeImage,
    mainText: "LaGravinese",
    secondText: "Custom Jewelry",
  },
  {
    path: "/journey",
    name: "journey",
    img: journeyImage,
    mainText: "Our Journey",
    secondText: "A Family Legacy",
  },
  {
    path: "/work",
    name: "work",
    img: workImage,
    mainText: "Our Work",
    secondText: "Crafted with Precision",
  },
  {
    path: "/inquiries",
    name: "inquiries",
    img: inquiriesImage,
    mainText: "Inquiries",
    secondText: "Let's Create Together",
  },
];

// Home testimonials Section
import test1Head from "/images/eng-placeholder1.jpeg";
import test2Head from "/images/eng-placeholder2.jpeg";
import test3Head from "/images/eng-placeholder3.jpeg";
import test4Head from "/images/eng-placeholder4.jpeg";
import test1Background from "/images/ring-test-placeholder1.webp";
import test2Background from "/images/ring-test-placeholder2.webp";
import test3Background from "/images/ring-test-placeholder3.jpg";
import test4Background from "/images/ring-test-placeholder4.jpeg";
export const testimonialsData = {
  heading: "Kind Words from Our Clients",
  testimonials: [
    {
      id: 1,
      clientImage: test1Head,
      clientImageAlt: "Engagement photo of Ethan & Jackie",

      jewelryImage: test1Background,
      jewelryImageAlt: "Custom engagement ring",

      testimonial:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe dolor animi natus sint deleniti modi?",

      clientNames: "Ethan & Jackie",
    },

    {
      id: 2,
      clientImage: test2Head,
      clientImageAlt: "Engagement photo of Ethan & Jackie",

      jewelryImage: test2Background,
      jewelryImageAlt: "Custom engagement ring",

      testimonial:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe dolor animi natus sint deleniti modi?",

      clientNames: "Ethan & Jackie",
    },

    {
      id: 3,
      clientImage: test3Head,
      clientImageAlt: "Engagement photo of Ethan & Jackie",

      jewelryImage: test3Background,
      jewelryImageAlt: "Custom engagement ring",

      testimonial:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe dolor animi natus sint deleniti modi?",

      clientNames: "Ethan & Jackie",
    },

    {
      id: 4,
      clientImage: test4Head,
      clientImageAlt: "Engagement photo of Ethan & Jackie",

      jewelryImage: test4Background,
      jewelryImageAlt: "Custom engagement ring",

      testimonial:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe dolor animi natus sint deleniti modi?",

      clientNames: "Ethan & Jackie",
    },
  ],
};

// Home Process Section
import contactImage1 from "/images/proc1.jpg";
import contactImage2 from "/images/proc2.jpeg";
import contactImage3 from "/images/proc3.webp";
import contactImage4 from "/images/proc4.webp";
export const homeContactData = {
  heading: "Let's Bring Your Vision to Life",

  process: [
    {
      id: 1,
      title: "Consultation",
      description:
        "Meet with us to discuss your vision, style, and budget. Whether you're searching for the perfect diamond or gemstone or already have a stone you'd like to use, we'll help create a design that's uniquely yours.",
    },
    {
      id: 2,
      title: "Design & Rendering",
      description:
        "We'll transform your ideas into a detailed digital rendering. You'll have the opportunity to review the design and request revisions before giving final approval.",
    },
    {
      id: 3,
      title: "Craftsmanship",
      description:
        "Once approved, your design is developed into a CAD (Computer-Aided Design) model. Your piece is then expertly crafted, set, polished, and carefully inspected to ensure it meets our highest standards.",
    },
    {
      id: 4,
      title: "Final Reveal",
      description:
        "Your finished piece is ready for pickup or secure shipping, complete with any applicable documentation or appraisal.",
    },
  ],

  cta: {
    text: "Start Your Project",
    path: "/inquiries",
  },

  images: [
    {
      id: 1,
      className: "img1",
      src: contactImage1,
      alt: "Jewelry consultation",
    },
    {
      id: 2,
      className: "img2",
      src: contactImage2,
      alt: "Jewelry design rendering",
    },
    {
      id: 3,
      className: "img3",
      src: contactImage3,
      alt: "Jewelry craftsmanship",
    },
    {
      id: 4,
      className: "img4",
      src: contactImage4,
      alt: "Completed custom jewelry",
    },
  ],
};

// home About section
import homeAboutPhoto from "/images/siblings.jpg";
export const homeAboutData = {
  heading: "Our Journey",
  image: {
    src: homeAboutPhoto,
    alt: "The LaGravinese family",
  },
  paragraphs: [
    "For four generations, the LaGravinese name has been rooted in the jewelry industry through craftsmanship, integrity, and a passion for helping people celebrate life's most meaningful moments.",

    "Today, we're honored to continue that legacy by combining traditional values with a personalized approach to jewelry. We believe jewelry should be as meaningful as it is beautiful. Every piece tells a story of love, family, celebration, remembrance, or a new beginning.",

    "Whether you're choosing your first meaningful piece, redesigning a treasured heirloom, or creating something entirely new, we're here to guide you with honesty, education, and genuine care.",
  ],
  button: {
    text: "Learn More",
    path: "/journey",
  },
};

// home collections section
import engagementRings from "/images/ring-test-placeholder1.webp";
import weddingBands from "/images/ring-test-placeholder2.webp";
import anniversaryRings from "/images/ring-test-placeholder3.jpg";
import necklaces from "/images/necklace-placeholder.png";
import earrings from "/images/earing-placeholder.png";
import bracelets from "/images/bracelet-placeholder.jpg";
import pendants from "/images/pendant.jpeg";

export const collections = {
  header: "What We Create",
  galleryheader: "Gallery",
  icon: FaArrowRight,
  pageLink: "Gallery",
  linkTo: "/work",
  items: [
    {
      id: "engagement-rings",
      title: "Engagement Rings",
      image: engagementRings,
      alt: "Custom engagement ring",
      link: "/collections/custom-engagement-rings",
      index: 0,
      gallery: [
        engagementRings,
        weddingBands,
        anniversaryRings,
        necklaces,
        earrings,
        engagementRings,
        weddingBands,
        anniversaryRings,
        necklaces,
        earrings,
        engagementRings,
        weddingBands,
        anniversaryRings,
        necklaces,
        earrings,
        engagementRings,
        weddingBands,
        anniversaryRings,
        necklaces,
        earrings,
        engagementRings,
        weddingBands,
        anniversaryRings,
        necklaces,
        earrings,
        engagementRings,
        weddingBands,
        anniversaryRings,
        necklaces,
        earrings,
      ],
    },
    {
      id: "wedding-bands",
      title: "Wedding Bands",
      image: weddingBands,
      alt: "Wedding bands",
      link: "/collections/wedding-bands",
      index: 1,
      gallery: [
        weddingBands,
        weddingBands,
        weddingBands,
        weddingBands,
        weddingBands,
      ],
    },
    {
      id: "anniversary-rings",
      title: "Anniversary Rings",
      image: anniversaryRings,
      alt: "Anniversary ring",
      link: "/collections/anniversary-rings",
      index: 2,
      gallery: [
        engagementRings,
        weddingBands,
        anniversaryRings,
        necklaces,
        earrings,
      ],
    },
    {
      id: "necklaces",
      title: "Necklaces",
      image: necklaces,
      alt: "Custom necklace",
      link: "/collections/necklaces",
      index: 3,
      gallery: [
        engagementRings,
        weddingBands,
        anniversaryRings,
        necklaces,
        earrings,
      ],
    },
    {
      id: "earrings",
      title: "Earrings",
      image: earrings,
      alt: "Custom earrings",
      link: "/collections/earrings",
      index: 4,
      gallery: [
        engagementRings,
        weddingBands,
        anniversaryRings,
        necklaces,
        earrings,
      ],
    },
    {
      id: "bracelets",
      title: "Bracelets",
      image: bracelets,
      alt: "Custom bracelet",
      link: "/collections/bracelets",
      index: 5,
      gallery: [
        engagementRings,
        weddingBands,
        anniversaryRings,
        necklaces,
        earrings,
      ],
    },
    {
      id: "pendants",
      title: "Pendants",
      image: pendants,
      alt: "Custom pendant",
      link: "/collections/pendants",
      index: 6,
      gallery: [
        engagementRings,
        weddingBands,
        anniversaryRings,
        necklaces,
        earrings,
      ],
    },
  ],
};

export const services = {
  header: "Jewelry Services",
  icon: FaArrowRight,
  pageLink: "Services",
  linkTo: "/work",
  items: [
    {
      title: "Professional Jewelry Appraisals",
      image: engagementRings,
      alt: "Custom engagement ring",
      description:
        "Receive a detailed, professional evaluation of your jewelry for insurance, estate planning, resale, or personal records.",
    },
    {
      title: "Stone Replacement & Resetting",
      image: bracelets,
      alt: "Custom engagement ring",
      description:
        "Restore your favorite pieces with expert stone replacement, secure resetting, and precision craftsmanship.",
    },
    {
      title: "Custom Jewelry Design",
      image: pendants,
      alt: "Custom engagement ring",
      description:
        "Work one-on-one with our designers to create a unique, handcrafted piece tailored to your vision and style.",
    },
  ],
};

//inquiries/ contact
export const contactForm = {
  title: "Request Information",
  description:
    "Tell us about your jewelry needs and we'll contact you to discuss your project or service.",

  fields: {
    firstName: {
      label: "First Name",
      placeholder: "John",
    },
    lastName: {
      label: "Last Name",
      placeholder: "Doe",
    },
    email: {
      label: "Email Address",
      placeholder: "john@example.com",
    },
    phone: {
      label: "Phone Number",
      placeholder: "(555) 123-4567",
    },
    interest: {
      label: "Product or Service",
      placeholder: "Select an option",
    },
    attachments: {
      label: "Inspiration Photos or Attachments",
      helper:
        "Upload inspiration photos, sketches, or images of your existing jewelry. You may select multiple files.",
    },
    message: {
      label: "Tell Us About Your Project",
      placeholder:
        "Describe your project, preferred metals, gemstones, timeline, or any questions you have.",
    },
  },

  productOptions: [
    { id: 0, label: "Custom Engagement Rings" },
    { id: 1, label: "Wedding Bands" },
    { id: 2, label: "Anniversary Rings" },
    { id: 3, label: "Necklaces" },
    { id: 4, label: "Earrings" },
    { id: 5, label: "Bracelets" },
    { id: 6, label: "Pendants" },
    { id: 7, label: "Fine Gold & Platinum Jewelry" },
  ],

  serviceOptions: [
    { id: 8, label: "Professional Jewelry Appraisals" },
    { id: 9, label: "Heirloom Redesigns & Remounts" },
    { id: 10, label: "Stone Replacement & Resetting" },
    { id: 11, label: "Custom Jewelry Design" },
  ],

  submitText: "Send Request",

  images: [
    {
      id: 0,
      src: engagementRings,
      alt: "Gallery image 1",
    },
    {
      id: 1,
      src: weddingBands,
      alt: "Gallery image 2",
    },
    {
      id: 2,
      src: anniversaryRings,
      alt: "Gallery image 3",
    },
    {
      id: 3,
      src: necklaces,
      alt: "Gallery image 4",
    },
    {
      id: 4,
      src: earrings,
      alt: "Gallery image 5",
    },
    {
      id: 5,
      src: bracelets,
      alt: "Gallery image 6",
    },
    {
      id: 6,
      src: pendants,
      alt: "Gallery image 7",
    },
    {
      id: 7,
      src: test1Head,
      alt: "Gallery image 8",
    },
    {
      id: 8,
      src: test1Head,
      alt: "Gallery image 9",
    },
    {
      id: 9,
      src: test1Head,
      alt: "Gallery image 10",
    },
    {
      id: 10,
      src: test1Head,
      alt: "Gallery image 11",
    },
    {
      id: 11,
      src: test1Head,
      alt: "Gallery image 12",
    },
  ],
};

// faq on inquiries page
export const faqData = [
  {
    category: "Orders & Custom Design",
    questions: [
      {
        question: "Do you have jewelry available for immediate purchase?",
        answer:
          "Our collections are thoughtfully made to order. Rather than carrying large inventories, we focus on creating pieces specifically for each client, ensuring exceptional craftsmanship and attention to detail. For custom bridal appointments, you'll also have the opportunity to explore a curated selection of sample rings and bands to help inspire your final design.",
      },
      {
        question:
          "I have an idea or inspiration for a piece. Can you create it?",
        answer:
          "Absolutely. Whether you have a sketch, a photograph, a design you've admired, or simply a vision in mind, we're here to bring it to life. Every custom project begins with a conversation about your style, preferences, and budget. From there, we'll guide you through selecting diamonds, gemstones, and precious metals before refining the design into a piece that's uniquely yours. Whether inspired by a family heirloom, a classic style, or a favorite design, every piece is thoughtfully crafted with the same care, precision, and attention to detail.",
      },
      {
        question: "How long will my order take?",
        answer:
          "Each piece is made specifically for you, so production times vary depending on the project. Custom Bridal pieces typically require 4–6 weeks, while Custom Collection pieces are generally completed in 3–4 weeks. We'll keep you informed throughout the process so you'll always know what to expect.",
      },
    ],
  },
  {
    category: "Shipping & Pickup",
    questions: [
      {
        question: "Do you offer shipping?",
        answer:
          "Yes. We proudly ship nationwide. Every order is carefully packaged, fully insured, and shipped with signature confirmation to ensure your jewelry arrives safely and securely.",
      },
      {
        question: "Do you offer local pickup?",
        answer:
          "Yes. We are based in Scottsdale, Arizona, and are happy to coordinate local pickup by appointment.",
      },
    ],
  },
  {
    category: "Appraisals & Insurance",
    questions: [
      {
        question: "Do you offer appraisals?",
        answer:
          "Yes. Every bridal purchase includes a complimentary professional appraisal completed by Tom LaGravinese, Graduate Gemologist (GG). This appraisal may be used to obtain jewelry insurance through the provider of your choice. Professional appraisals are also available for custom pieces and other jewelry at a preferred client rate.",
      },
      {
        question: "Do you provide warranties or insurance?",
        answer:
          "While we do not provide jewelry insurance directly, we strongly encourage insuring valuable pieces against loss, theft, or accidental damage. If questions arise regarding craftsmanship, sizing, or adjustments, please contact us. We stand behind the quality of our work and will always do our best to provide a thoughtful and fair solution.",
      },
    ],
  },
  {
    category: "Returns & Adjustments",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "Because each piece is custom made or specially ordered, all sales are considered final. However, our relationship with you doesn't end once your jewelry is delivered. If you have concerns about your piece, we encourage you to contact us. We'll carefully review each situation individually and work with you to determine the best available solution. When appropriate, we may also be able to assist with services such as ring resizing or other minor adjustments. Our goal is for you to enjoy your jewelry with confidence for many years to come.",
      },
      {
        question: "Do you work with heirloom jewelry?",
        answer:
          "We love helping clients breathe new life into treasured family pieces. Whether you'd like to redesign an inherited ring, incorporate existing gemstones, or preserve the sentimental value of an heirloom, we'll guide you through the process with care and respect.",
      },
      {
        question: "Can I use my own diamonds or gemstones?",
        answer:
          "Absolutely. We love incorporating meaningful diamonds and gemstones into new designs whenever possible. During your consultation, we'll carefully examine your stones, discuss your vision, and guide you through the best options for creating a beautiful piece that honors both your story and the integrity of the materials.",
      },
    ],
  },
];

// timeline
import journeyImage1 from "/images/journey1.jpg";
import journeyImage2 from "/images/journey2.jpg";
import journeyImage3 from "/images/journey2.jpg";
import journeyImage4 from "/images/siblings.jpg";
export const journeyTimeline = {
  images: [
    {
      imgSrc: journeyImage1,
      imgAlt: "placeholder",
    },
    {
      imgSrc: journeyImage2,
      imgAlt: "placeholder",
    },
    {
      imgSrc: journeyImage3,
      imgAlt: "placeholder",
    },
    {
      imgSrc: journeyImage4,
      imgAlt: "placeholder",
    },
  ],
  text: [
    {
      generation: "1st Gen",
      years: "1920",
      head: "The Craft Begins",
      desc: "Founded in a modest workbench workshop, our story began with raw metals, hand-forged techniques, and an unyielding dedication to true artisan benchwork.",
    },
    {
      generation: "2nd Gen",
      years: "1950",
      head: "Refining the Heritage",
      desc: "Expanding into bespoke gemstone cutting and intricate stone setting, the second generation elevated our signature style into timeless mid-century heirlooms.",
    },
    {
      generation: "3rd Gen",
      years: "1980",
      head: "Mastering the Modern Classic",
      desc: "Bridging traditional goldsmithing with modern design aesthetics, we introduced custom engagement creations tailored to the modern romantic.",
    },
    {
      generation: "4th Gen",
      years: "2010",
      head: "Innovation & Legacy",
      desc: "Combining state-of-the-art 3D modeling with four generations of bench mastery, we turn your unique stories into handcrafted modern masterpieces.",
    },
  ],
};

export const journeyTimelineMobile = [
  {
    generation: "1st Gen",
    years: "1920",
    head: "The Craft Begins",
    desc: "Founded in a modest workbench workshop, our story began with raw metals, hand-forged techniques, and an unyielding dedication to true artisan benchwork.",
    imgSrc: journeyImage1,
    imgAlt: "1st Generation handcrafted jewelry workbench",
  },
  {
    generation: "2nd Gen",
    years: "1950",
    head: "Refining the Heritage",
    desc: "Expanding into bespoke gemstone cutting and intricate stone setting, the second generation elevated our signature style into timeless mid-century heirlooms.",
    imgSrc: journeyImage2,
    imgAlt: "2nd Generation custom gemstone setting",
  },
  {
    generation: "3rd Gen",
    years: "1980",
    head: "Mastering the Modern Classic",
    desc: "Bridging traditional goldsmithing with modern design aesthetics, we introduced custom engagement creations tailored to the modern romantic.",
    imgSrc: journeyImage3,
    imgAlt: "3rd Generation custom engagement ring",
  },
  {
    generation: "4th Gen",
    years: "2010",
    head: "Innovation & Legacy",
    desc: "Combining state-of-the-art 3D modeling with four generations of bench mastery, we turn your unique stories into handcrafted modern masterpieces.",
    imgSrc: journeyImage4,
    imgAlt: "4th Generation modern bespoke jewelry creation",
  },
];
