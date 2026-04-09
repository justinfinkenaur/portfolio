export interface Project {
  id: string;
  title: string;
  year: string;
  tagline: string;
  program: string[];
  industry: string;
  stage: string;
  overview: string[];
  challenge: string[];
  approach: string[];
  outcome: string[];
  // placeholder colors for image modules
  colors: { a: string; b: string; c: string; };
  // optional real images: strip array (any length), full image, and per-card aspect ratios
  images?: { strip: string[]; full: string; video?: string; stripRatios?: string[]; contain?: boolean; perCardContain?: boolean[]; };
}

export const PROJECTS: Project[] = [
  {
    id: "project-one",
    title: "Google Marketing Advisor",
    year: "2024–2026",
    tagline: "Creating an agentic AI service layer that bridges the gap between complex problems and simple solutions.",
    program: ["End-to-End", "0→1 Design"],
    industry: "AdTech",
    stage: "End-to-End",
    overview: [
      "As part of a larger UX team, I designed Google Marketing Advisor, an agentic AI tool that autonomously diagnoses and resolves customer issues, replacing the traditional call center model and reducing time-to-resolution.",
    ],
    challenge: [
      "Google Ads is a complex platform with a steep learning curve. Small and medium business (SMB) owners, who lack dedicated marketing teams or ad operations expertise, struggle to navigate its features, set up campaigns effectively, and troubleshoot issues on their own.",
      "Without access to concierge-level guidance, their only option is to contact customer support agents, a reactive and time-consuming process that leaves them waiting in queues rather than getting the timely help they need to keep their campaigns running and their ad spend working efficiently."
    ],
    approach: [
      "I started by interviewing small and medium business owners alongside customer support agents to understand the most common challenges faced when creating and managing ad campaigns. The research revealed a clear need for a service layer to bridge the gap between the platform's complexity and the support these business owners actually needed.",
      "The solution had to adhere to a core set of principles: it needed to mediate and reduce complexity in real time, interpreting context and surfacing relevant information faster than a human agent. It had to keep pace with evolving advertising rules and policies, be available around the clock, and guide users toward appropriate actions without requiring them to understand the entire system — all while reducing cognitive load and preserving trust, control, and decision quality for the end user."
    ],
    outcome: [
      "The result was the Google Marketing Advisor — an agentic AI designed as a service layer that integrates directly within Google Ads. It provides all customers with the caliber of support previously only available through a customer support agent, offering real-time, personalized guidance at scale."
    ],
    colors: { a: "#1a1a2e", b: "#16213e", c: "#0f3460" },
    images: {
      strip: ["/p1-frame1.png", "/p1-frame2.png", "/p1-frame3.png"],
      full: "",
      video: "/p1-video.mp4",
      stripRatios: ["2000/1122", "1249/2000", "2000/1122"],
    },
  },
  {
    id: "project-two",
    title: "Amazon Echo Show 15 Out-of-Box Experience",
    year: "2020–2021",
    tagline: "Designing a set up experience that incorporates an AI assistant from start to finish",
    program: ["Redesign", "End-to-End"],
    industry: "Smart Home",
    stage: "Redesign, End-to-End",
    overview: [
      "As Design Lead for the Echo Show 15 out-of-box experience, I owned the full onboarding journey from unboxing to first-use activation. Getting a variety of stakeholders to converge on one seamless experience was the core challenge, requiring constant facilitation and design iteration across every screen and asset in the setup experience. The result was a streamlined out-of-box experience that successfully onboarded over 3 million Echo Show 15 customers.",
    ],
    challenge: [
      "I designed the setup experience for the Echo Show 15, Amazon's flagship smart home device built around shared, communal use. The challenge was to create a seamless onboarding flow that extended the existing Echo Show out-of-box framework while addressing the unique needs of a device intended for multiple users in a household.",
      "The design was guided by principles tailored to communal devices: success mattered more than brevity, meaning a fully functional device took priority over minimizing steps. Education was woven throughout setup to help users understand capabilities as they configured them, and the flow prioritized actions that would reduce friction for day-to-day shared use down the road."
    ],
    approach: [
      "I started with the baseline setup experience across Echo Show devices and identified where communal-specific features needed to be introduced to the Echo Show 15. This meant incorporating Visual ID and Voice ID enrollment so the device could recognize individual household members, a widget selection step for personalized content display, and a wall mounting screen to help users place the device in a location accessible to everyone.",
      "Research revealed that users needed to understand the benefits of features like Visual ID and Voice ID before they'd commit to enrolling — they wanted to know not just why these features mattered, but that the process would be quick and easy. This insight shaped how I framed each step, leading with clear value and emphasizing simplicity to keep users motivated to complete the full setup rather than skipping features they'd need later."
    ],
    outcome: [
      "The result was a new end-to-end out-of-box experience that shipped with the launch of the Echo Show 15, meaning these communal features were part of the product from day one rather than arriving through a later software update. The setup enabled customers to better personalize their devices while supporting multiple users in the household. This streamlined experience successfully onboarded over 3 million Echo Show 15 customers."
    ],
    colors: { a: "#0d2137", b: "#1a3a5c", c: "#0a1929" },
    images: {
      strip: ["/p2-frame1.png", "/p2-frame2.png", "/p2-frame3.png", "/p2-frame4.png", "/p2-frame5.png"],
      full: "",
      video: "/p2-video.mp4",
      stripRatios: ["16/9", "16/9", "16/9", "16/9", "16/9"],
    },
  },
  {
    id: "project-five",
    title: "Google Endpoint Management",
    year: "2022–2024",
    tagline: "Bringing the organizational power of device management to the classroom.",
    program: ["0→1 Product", "MVP"],
    industry: "EdTech",
    stage: "0→1 Product, MVP",
    overview: [
      "Google Endpoint Management helps schools and districts manage mobile devices, from organization-owned Chromebooks and tablets to students' personal phones, through a single console. As Design Lead, I owned UX, research, and visual design while also providing product direction on a team without a dedicated product manager.",
    ],
    challenge: ["School IT administrators need enterprise-grade device control but work with smaller teams, tighter budgets, and a user base spanning students, teachers, and families. Existing device management tools assume corporate IT fluency and dedicated staffing that most schools don't have. The rise of shared classroom tablets added further complexity, with multiple students cycling through the same hardware throughout the day, each needing a secure, personalized session."],
    approach: ["I led user experience research with school IT administrators, teachers, and parents to understand real workflows and set priorities directly with engineering. I designed guided task flows for common admin actions, BYOD enrollment experiences that balanced security with family expectations, and net-new interaction patterns for shared device scenarios."],
    outcome: ["I established a cohesive product direction and design system for Endpoint Management in education. I helped pilot a shared device experience for classroom tablets, enabling schools to deploy single device sets that multiple students could use with managed, individualized sessions, opening a practical path for districts that couldn't afford one-to-one device programs."],
    colors: { a: "#1a1a00", b: "#2e2e00", c: "#1e1e0a" },
    images: {
      strip: ["/p5-frame1.png", "/p5-frame2.png", "/p5-frame3.png"],
      full: "",
      stripRatios: ["2000/1409", "2000/1891", "2000/1357"],
      perCardContain: [false, true, false],
    },
  },
  {
    id: "project-four",
    title: "Amazon Echo Show Picture-In-Picture",
    year: "2020–2021",
    tagline: "Always in view, never in the way.",
    program: ["0→1 Design"],
    industry: "Smart Home",
    stage: "0→1 Product",
    overview: [
      "Picture-in-Picture is a feature for viewing camera and video content while multi-tasking on a device. It allows for a video feed to minimize to a smaller portion of the screen, and out of the way of other content, while still being able to interact with the audio and microphone controls of the video feed.",
    ],
    challenge: [
      "The challenge was to design a new feature for Echo Show devices that allows users to minimize a live video feed while multitasking, without losing access to essential controls. The experience needed to accommodate a range of smart home camera use cases, from doorbell cameras and security feeds to baby monitors, each with unique viewing priorities and levels of urgency."
    ],
    approach: [
      "I designed the feature around five core design principles: avoid distracting from what's on screen, make the window movable and out of the way, inherit the controls of the source device, appear as an alert or only when prompted, and remain scalable to other video content types. I validated these principles by prototyping and testing with Echo Show users to evaluate the feature's usefulness and usability.",
      "The design ultimately addressed three distinct scenarios — video streaming, video calling, and video monitoring — each requiring its own set of interactions and behaviors."
    ],
    outcome: [
      "The final design delivers a Picture-in-Picture experience that lets users maximize or close the window, mute and unmute audio and microphone controls, and freely drag the window around the screen. The feature launched across all Echo Show devices, reaching over 20 million active devices."
    ],
    colors: { a: "#0a1a0a", b: "#1a2e1a", c: "#103010" },
    images: {
      strip: ["/p4-frame1.png", "/p4-frame2.png", "/p4-frame3.png", "/p4-frame4.png"],
      full: "",
      video: "/p4-video.mp4",
      stripRatios: ["16/9", "16/9", "16/9", "16/9"],
    },
  },
  {
    id: "project-three",
    title: "Amazon Buy with Prime",
    year: "2021–2022",
    tagline: "The power of an e-commerce giant, designed for the independent business owner.",
    program: ["End-to-End", "0→1 Product"],
    industry: "E-Commerce",
    stage: "MVP, End-to-End",
    overview: [
      "As part of a larger UX team, I designed the end-to-end merchant setup experience for Buy with Prime, helping over 50,000 third-party sellers connect Amazon's fulfillment and checkout infrastructure to their own storefronts faster and with less friction.",
    ],
    challenge: [
      "Amazon sellers, many of them small and medium business owners, have long struggled with the complexity of selling on the platform. They choose Amazon for what it offers their buyers: fast shipping, free returns, and seamless checkout, all backed by Amazon's fulfillment network. But to deliver on that promise, merchants are forced to juggle multiple disconnected tools such as Seller Central for inventory and fulfillment, Amazon.com for product listings, and third-party apps for taxes, billing, and payments.",
      "What they need is a single, unified solution to manage their inventory, fulfillment, and finances in one place."
    ],
    approach: [
      "As part of a larger UX team, I owned key portions of the merchant journey from awareness through ongoing management. Before designing the setup experience, I grounded my approach in the merchant insights gathered from research, particularly the core frustration of juggling multiple disconnected tools just to sell on Amazon.",
      "From those insights, I defined a set of experience outcomes to guide the design. The setup needed to consolidate enrollment and management into a single site, clearly outline every step to add the Buy with Prime widget, and offer contextual help with plain-language definitions throughout. These outcomes served as a framework for design decisions, keeping the work anchored to real merchant needs."
    ],
    outcome: [
      "The result was a streamlined experience that empowers independent business owners to offer their customers the same benefits they'd expect from Amazon — fast shipping, free returns, and seamless checkout — without the complexity of navigating multiple disconnected tools.",
      "Today, Buy with Prime helps over 50,000 third-party sellers connect Amazon's fulfillment and checkout infrastructure to their own storefronts, faster and with far less friction."
    ],
    colors: { a: "#1a0a00", b: "#2e1a00", c: "#3d2a10" },
    images: {
      strip: ["/p3-frame-a.png", "/p3-frame-b.png", "/p3-frame-c.png", "/p3-frame-d.png", "/p3-frame-e.png", "/p3-frame-f.png", "/p3-frame-g.png"],
      full: "",
      stripRatios: ["2000/1205", "2000/1205", "2000/1205", "2000/1205", "2000/1205", "2000/1205", "2000/1205"],
    },
  },
];
