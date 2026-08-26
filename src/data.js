import { FaInstagram, FaArrowRight } from "react-icons/fa";

// IMAGE IMPORTS
// Bracelets
import bracelet1 from "/images/bracelet1.jpg";
import bracelet2 from "/images/bracelet2.jpg";
import bracelet3 from "/images/bracelet3.jpg";
import bracelet4 from "/images/bracelet4.jpg";
import bracelet5 from "/images/bracelet5.jpg";
import bracelet6 from "/images/bracelet6.jpg";
import bracelet7 from "/images/bracelet7.jpg";

// Earrings
import earrings1 from "/images/earrings1.jpg";
import earrings2 from "/images/earrings2.jpg";
import earrings3 from "/images/earrings3.jpg";
import earrings4 from "/images/earrings4.jpg";
import earrings5 from "/images/earrings5.jpg";
import earrings6 from "/images/earrings6.jpg";
import earrings7 from "/images/earrings7.jpg";

// Necklaces
import necklace1 from "/images/necklace1.jpg";
import necklace2 from "/images/necklace2.jpg";
import necklace3 from "/images/necklace3.jpg";
import necklace4 from "/images/necklace4.jpg";
import necklace5 from "/images/necklace5.jpg";

// Rings
import ring1 from "/images/ring1.jpg";
import ring2 from "/images/ring2.jpg";
import ring3 from "/images/ring3.jpg";
import ring4 from "/images/ring4.jpg";
import ring5 from "/images/ring5.jpg";

// navigation link throughout the siet
export const navLinks = [
  {
    linkName: "Home",
    linkPath: "/",
  },
  {
    linkName: "Our Journey",
    linkPath: "/journey",
  },
  {
    linkName: "Our Collections",
    linkPath: "/work",
  },
  {
    linkName: "Our Process",
    linkPath: "/#process",
  },
  {
    linkName: "Inquiries",
    linkPath: "/inquiries",
  },
];

export const legalLinks = [
  {
    linkName: "Privacy Policy",
    linkPath: "/privacy-policy",
  },
  {
    linkName: "FAQ",
    linkPath: "/inquiries#faq",
  },
];

export const socialLinks = [
  {
    name: "Instagram",
    icon: FaInstagram,
    link: "https://www.instagram.com/lagravinesejewelry/?hl=en",
  },
];

export const footerData = [
  {
    id: "location",
    heading: "Visit Us",
    address: "9375 E. Shea Blvd. Suite 100, Scottsdale, Arizona 85260",
    note: "All design consults are by appointment only.",
  },
  {
    id: "navigation",
    heading: "Main Links",
    links: navLinks,
  },
  {
    id: "legal",
    heading: "Other Links",
    links: legalLinks,
  },
  {
    id: "social",
    heading: "Social Media",
    links: socialLinks,
  },
];

// images for headers
import homeImage from "/images/Header.jpeg";
import journeyImage from "/images/aboutheader.jpg";
export const headerData = [
  {
    path: "/",
    name: "home",
    img: homeImage,
    mainText: "LaGravinese Jewelry",
    secondText: null,
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
    img: null,
    mainText: "Our Work",
    secondText: "Crafted with Precision",
  },
  {
    path: "/inquiries",
    name: "inquiries",
    img: null,
    mainText: "Inquiries",
    secondText: "Let's Create Together",
  },
];

// Home testimonials Section
import testimonialCouple1 from "/images/testimonial-couple1.jpg";
import testimonialCouple2 from "/images/testimonial-couple2.jpg";
import testimonialCouple3 from "/images/testimonial-couple3.jpg";
import testimonialCouple4 from "/images/testimonial-couple4.jpg";
export const testimonialsData = {
  heading: "Kind Words from Our Clients",
  testimonials: [
    {
      id: 1,
      clientImage: testimonialCouple1,
      clientImageAlt: "Engagement photo of Ethan & Jackie",

      jewelryImage: ring1,
      jewelryImageAlt: "Custom engagement ring",

      testimonial:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe dolor animi natus sint deleniti modi?",

      clientNames: "Ethan & Jackie",
    },

    {
      id: 2,
      clientImage: testimonialCouple2,
      clientImageAlt: "Engagement photo of Ethan & Jackie",

      jewelryImage: ring2,
      jewelryImageAlt: "Custom engagement ring",

      testimonial:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe dolor animi natus sint deleniti modi?",

      clientNames: "Ethan & Jackie",
    },

    {
      id: 3,
      clientImage: testimonialCouple3,
      clientImageAlt: "Engagement photo of Ethan & Jackie",

      jewelryImage: ring3,
      jewelryImageAlt: "Custom engagement ring",

      testimonial:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe dolor animi natus sint deleniti modi?",

      clientNames: "Ethan & Jackie",
    },

    {
      id: 4,
      clientImage: testimonialCouple4,
      clientImageAlt: "Engagement photo of Ethan & Jackie",

      jewelryImage: ring4,
      jewelryImageAlt: "Custom engagement ring",

      testimonial:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe dolor animi natus sint deleniti modi?",

      clientNames: "Ethan & Jackie",
    },
  ],
};

// Home Process Section
export const processHomeData = {
  heading: "Let's Bring Your Vision to Life",
  icon: FaArrowRight,
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
    text: "Book a Consultation",
    path: "/inquiries",
  },
};

// home About section
import homeAboutPhoto1 from "/images/siblings.jpg";
import homeAboutPhoto2 from "/images/earrings6.jpg";
export const homeAboutData = {
  heading: "Our Story",
  images: {
    src1: homeAboutPhoto1,
    alt1: "Hand wearing oval engagement ring",
    src2: homeAboutPhoto2,
    alt2: "Model wearing gold pearl drop earrings",
  },
  paragraphs: [
    "For four generations, jewelry has been more than a profession in our family—it's been a tradition. As two sisters continuing our family's legacy, we're passionate about creating handcrafted pieces that celebrate life's most meaningful moments.",
    "Whether you're celebrating an engagement, an anniversary, or another special milestone, we're honored to create jewelry you'll treasure for generations to come.",
  ],
  button: {
    text: "More About Us",
    path: "/journey",
    icon: FaArrowRight,
  },
};

// Home Collections Section
export const collections = {
  header: "Our Collections",
  galleryheader: "Gallery",
  icon: FaArrowRight,
  pageLink: "Gallery",
  linkTo: "/work",
  items: [
    {
      id: "bridal",
      title: "Bridal",
      image: ring2,
      alt: "Wedding bands",
      index: 0,
      gallery: [
        ring2,
        ring1,
        necklace1,
        necklace2,
        earrings1,
        earrings2,
        bracelet1,
        bracelet2,
      ],
    },
    {
      id: "rings",
      title: "Rings",
      image: ring1,
      alt: "Custom ring",
      index: 1,
      gallery: [ring1, ring2, ring3, ring4, ring5],
    },
    {
      id: "necklaces",
      title: "Necklaces",
      image: necklace1,
      alt: "Custom necklace",
      index: 2,
      gallery: [necklace1, necklace2, necklace3, necklace4, necklace5],
    },
    {
      id: "earrings",
      title: "Earrings",
      image: earrings1,
      alt: "Custom earrings",
      index: 3,
      gallery: [
        earrings1,
        earrings2,
        earrings3,
        earrings4,
        earrings5,
        earrings6,
        earrings7,
      ],
    },
    {
      id: "bracelets",
      title: "Bracelets",
      image: bracelet1,
      alt: "Custom bracelet",
      index: 4,
      gallery: [
        bracelet1,
        bracelet2,
        bracelet3,
        bracelet4,
        bracelet5,
        bracelet6,
        bracelet7,
      ],
    },
  ],
};

import servicePhoto from "/images/proc3.webp";
import { GiDiamondRing, GiGemPendant, GiScales } from "react-icons/gi";
export const services = {
  header: "Jewelry Services",
  icon: FaArrowRight,
  pageLink: "Contact Us",
  linkTo: "/inquiries",
  image: servicePhoto,
  imgAlt: "placeholder",
  items: [
    {
      title: "Professional Jewelry Appraisals",
      icon: GiScales,
      alt: "Jewelry Appraisal Services",
      description:
        "Receive a detailed, professional evaluation of your jewelry for insurance, estate planning, resale, or personal records.",
    },
    {
      title: "Stone Replacement & Resetting",
      icon: GiGemPendant,
      alt: "Stone Replacement Services",
      description:
        "Restore your favorite pieces with expert stone replacement, secure resetting, and precision craftsmanship.",
    },
    {
      title: "Custom Jewelry Design",
      icon: GiDiamondRing,
      alt: "Custom Jewelry Design Services",
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
  icon: FaArrowRight,
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
      src: ring1,
      alt: "Gallery image 1",
    },
    {
      id: 1,
      src: ring2,
      alt: "Gallery image 2",
    },
    {
      id: 2,
      src: ring3,
      alt: "Gallery image 3",
    },
    {
      id: 3,
      src: necklace1,
      alt: "Gallery image 4",
    },
    {
      id: 4,
      src: earrings1,
      alt: "Gallery image 5",
    },
    {
      id: 5,
      src: bracelet1,
      alt: "Gallery image 6",
    },
    {
      id: 6,
      src: necklace2,
      alt: "Gallery image 7",
    },
    {
      id: 7,
      src: testimonialCouple1,
      alt: "Gallery image 8",
    },
    {
      id: 8,
      src: testimonialCouple1,
      alt: "Gallery image 9",
    },
    {
      id: 9,
      src: testimonialCouple1,
      alt: "Gallery image 10",
    },
    {
      id: 10,
      src: testimonialCouple1,
      alt: "Gallery image 11",
    },
    {
      id: 11,
      src: testimonialCouple1,
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
          "While we do not provide jewelry insurance directly, we strongly encourage insuring valuable pieces against loss, theft, or accidental damage. Every piece includes our 6-Month Limited Warranty covering manufacturing and workmanship-related issues from the date of delivery. If questions arise regarding craftsmanship, sizing, or adjustments, please contact us—we stand behind the quality of our work and will evaluate your piece to provide a thoughtful and fair solution.",
      },
      {
        question: "What is covered under the 6-Month Limited Warranty?",
        answer:
          "Our 6-Month Limited Warranty covers manufacturing and workmanship-related issues starting from the date your piece is delivered. This includes loose or bent prongs, accent stones that loosen or fall out due to a manufacturing defect, and other construction-related issues. If you believe your piece has a manufacturing defect, please contact us so we can evaluate it and determine the best course of action.",
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

// Our Journey Page/ About Page
import journeyImage1 from "/images/gen1.jpg";
import journeyImage2 from "/images/gen2.jpg";
import journeyImage3 from "/images/gen3.jpg";
import journeyImage4 from "/images/siblings.jpg";
export const journeyTimelineData = [
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
