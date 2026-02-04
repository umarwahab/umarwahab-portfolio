import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  image: string;
  url?: string;
}

const CategoryProjects = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const categoryProjects: Record<string, Project[]> = {
    "web-application": [
      {
        id: 1,
        title: "MyWedWise Wedding Platform",
        description: "Comprehensive wedding planning and management application",
        fullDescription: "Built a full-featured wedding planning platform with vendor management, guest lists, budget tracking, seating arrangements, and timeline coordination for couples and wedding planners.",
        technologies: ["React", "Tailwind CSS", "TypeScript", "Node.js"],
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
        url: "https://stg.mywedwise.com/"
      },
      {
        id: 2,
        title: "NewEarth Pakistan E-Commerce",
        description: "Pakistani eco-friendly products marketplace",
        fullDescription: "Developed an e-commerce platform focusing on sustainable and eco-friendly products for the Pakistani market with local payment integrations and delivery tracking.",
        technologies: ["React", "Bootstrap", "PHP", "MySQL"],
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
        url: "https://newearth.pk"
      },
      {
        id: 3,
        title: "LeloBike Rental Platform",
        description: "Bike sharing and rental management system",
        fullDescription: "Created a bike rental platform with real-time availability, GPS tracking, booking management, and payment processing for urban transportation.",
        technologies: ["Vue.js", "Tailwind CSS", "Google Maps API", "Laravel"],
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        url: "http://lelobike.com/"
      },
      {
        id: 4,
        title: "Hassan Ali Ahsan Portfolio",
        description: "Professional portfolio and personal branding website",
        fullDescription: "Designed and developed a creative portfolio website with interactive animations, project showcases, and contact integrations for a professional.",
        technologies: ["React", "SCSS", "Framer Motion", "TypeScript"],
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
        url: "https://hassanaliahsan.com"
      },
      {
        id: 5,
        title: "Liquid Premium Hoodies Store",
        description: "Premium apparel e-commerce with custom designs",
        fullDescription: "Built a premium hoodie brand store with product customization, size guides, lookbook galleries, and seamless checkout experience.",
        technologies: ["Shopify", "Liquid", "JavaScript", "SCSS"],
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=600&fit=crop",
        url: "https://liquidpremiumhoodies.com"
      },
      {
        id: 6,
        title: "MushinFlow Wellness App",
        description: "Meditation and mindfulness web application",
        fullDescription: "Developed a wellness platform with guided meditations, breathing exercises, progress tracking, and personalized wellness programs.",
        technologies: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
        url: "https://mushinflow.com"
      },
      {
        id: 7,
        title: "Eila Solutions Corporate",
        description: "IT solutions and consulting company website",
        fullDescription: "Created a professional corporate website with service offerings, case studies, team profiles, and client testimonials for an IT consultancy.",
        technologies: ["React", "Tailwind CSS", "TypeScript", "Strapi"],
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
        url: "https://eilasolutions.com"
      },
      {
        id: 8,
        title: "Daniel Blaurogge Creative",
        description: "Creative professional portfolio website",
        fullDescription: "Designed an artistic portfolio website with immersive galleries, project case studies, and creative animations for a designer.",
        technologies: ["Vue.js", "GSAP", "SCSS", "Nuxt.js"],
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
        url: "https://danielblaurogge.com"
      },
      {
        id: 9,
        title: "UrAppTech Company Platform",
        description: "Technology company website and services portal",
        fullDescription: "Built a comprehensive tech company website with service showcases, portfolio gallery, client portal, and career opportunities section.",
        technologies: ["React", "Tailwind CSS", "TypeScript", "Node.js"],
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
        url: "https://urapptech.com"
      },
      {
        id: 10,
        title: "Fit and Fight Fitness Platform",
        description: "Fitness training and workout management system",
        fullDescription: "Developed a fitness platform with workout plans, exercise tutorials, progress tracking, and community features for fitness enthusiasts.",
        technologies: ["React", "Tailwind CSS", "Firebase", "Chart.js"],
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
        url: "https://fitandfight.urapptech.com"
      },
      {
        id: 11,
        title: "Klook Travel Experiences",
        description: "Travel activities and experiences booking platform",
        fullDescription: "Contributed to the frontend development of a major travel platform with activity booking, reviews, itinerary planning, and mobile-responsive design.",
        technologies: ["React", "TypeScript", "SCSS", "REST API"],
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
        url: "https://www.klook.com"
      },
      {
        id: 12,
        title: "Tastecard UK Dining",
        description: "Restaurant discount and membership platform",
        fullDescription: "Worked on the dining membership platform with restaurant discovery, deal management, booking integration, and member portal.",
        technologies: ["Angular", "Material UI", "TypeScript", "Node.js"],
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
        url: "https://www.tastecard.co.uk"
      },
      {
        id: 13,
        title: "Travelicious Travel Blog",
        description: "Travel blog and destination guide platform",
        fullDescription: "Built a beautiful travel blog with destination guides, photo galleries, interactive maps, and social sharing features.",
        technologies: ["WordPress", "PHP", "JavaScript", "SCSS"],
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
        url: "https://travelicious.bold-themes.com"
      },
      {
        id: 14,
        title: "Good Question Survey Platform",
        description: "Survey and feedback collection web application",
        fullDescription: "Developed a survey platform with customizable forms, analytics dashboards, response management, and data export features.",
        technologies: ["React", "Tailwind CSS", "PostgreSQL", "Chart.js"],
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
        url: "https://goodquestion.de"
      },
      {
        id: 15,
        title: "Rento Online Rental Platform",
        description: "Online rental marketplace for various items",
        fullDescription: "Created a rental marketplace with listing management, booking system, payment processing, and user verification features.",
        technologies: ["Vue.js", "Bootstrap", "Laravel", "Stripe"],
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
        url: "https://rento.online"
      },
      {
        id: 16,
        title: "PSARB Technology Platform",
        description: "Tech solutions and digital services portal",
        fullDescription: "Built a technology company platform with service showcase, portfolio, client testimonials, and inquiry management.",
        technologies: ["React", "Tailwind CSS", "TypeScript", "Node.js"],
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
        url: "https://psarb.urapptech.com"
      },
      {
        id: 17,
        title: "TwentyOne Pakistan E-Commerce",
        description: "Fashion and lifestyle e-commerce platform",
        fullDescription: "Developed a Pakistani e-commerce platform with local payment integration, delivery tracking, and customer loyalty programs.",
        technologies: ["WordPress", "WooCommerce", "PHP", "JavaScript"],
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        url: "https://twentyone.com.pk"
      },
      {
        id: 18,
        title: "Peng Salon Hair Studio",
        description: "Hair salon website with online booking",
        fullDescription: "Created a salon website with service menu, stylist profiles, online booking, gallery, and customer reviews integration.",
        technologies: ["WordPress", "PHP", "JavaScript", "CSS"],
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
        url: "https://www.pengsalon.com"
      },
      {
        id: 19,
        title: "Enterprise ERP Dashboard",
        description: "Complete ERP system with advanced analytics and reporting",
        fullDescription: "Built a comprehensive Enterprise Resource Planning dashboard using React and Tailwind CSS. Features include real-time analytics, inventory management, financial reporting, and user role management.",
        technologies: ["React", "Tailwind CSS", "TypeScript", "Chart.js"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
      },
      {
        id: 20,
        title: "Financial Dashboard",
        description: "Real-time financial analytics and portfolio management system",
        fullDescription: "Developed a sophisticated financial dashboard using Angular and Material UI. Features include portfolio tracking, real-time market data, and advanced charting.",
        technologies: ["Angular", "Material UI", "TypeScript", "D3.js"],
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop"
      },
      {
        id: 21,
        title: "Transportation Management System",
        description: "Fleet management and route optimization platform",
        fullDescription: "Built a comprehensive transportation management system using Vue.js and Bootstrap. Features include vehicle tracking, route optimization, and driver management.",
        technologies: ["Vue.js", "Bootstrap", "Google Maps API", "Node.js"],
        image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&h=600&fit=crop"
      },
      {
        id: 22,
        title: "POS System",
        description: "Point of sale system with inventory and sales management",
        fullDescription: "Created a modern point-of-sale system using React and Ionic for both web and tablet interfaces. Features include product scanning and inventory management.",
        technologies: ["React", "Ionic", "Tailwind CSS", "SQLite"],
        image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&h=600&fit=crop"
      },
      {
        id: 23,
        title: "Healthcare Management Portal",
        description: "Patient and appointment management system for clinics",
        fullDescription: "Developed a comprehensive healthcare portal with patient records, appointment scheduling, and medical history tracking.",
        technologies: ["React", "Tailwind CSS", "Firebase", "Node.js"],
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop"
      },
      {
        id: 24,
        title: "Real Estate Listing Platform",
        description: "Property listing and virtual tour system",
        fullDescription: "Built a modern real estate platform with property listings, search filters, virtual tours, and agent management.",
        technologies: ["Vue.js", "Tailwind CSS", "Mapbox", "Laravel"],
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
      },
      {
        id: 25,
        title: "Learning Management System",
        description: "Online education platform with course management",
        fullDescription: "Created an LMS with course creation, student enrollment, progress tracking, and assessment tools.",
        technologies: ["React", "Material UI", "TypeScript", "PostgreSQL"],
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop"
      },
      {
        id: 26,
        title: "Hotel Booking System",
        description: "Reservation management and booking platform",
        fullDescription: "Developed a hotel booking system with room availability, reservation management, and payment processing.",
        technologies: ["Angular", "Bootstrap", "TypeScript", "Stripe"],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
      },
      {
        id: 27,
        title: "Event Management Platform",
        description: "Event planning and ticketing system",
        fullDescription: "Built an event management platform with event creation, ticket sales, attendee management, and virtual event support.",
        technologies: ["React", "Tailwind CSS", "Stripe", "WebRTC"],
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
      },
      {
        id: 28,
        title: "CRM Dashboard",
        description: "Customer relationship management system",
        fullDescription: "Developed a CRM system with lead management, sales pipeline, customer interactions, and reporting analytics.",
        technologies: ["Vue.js", "Vuetify", "Node.js", "MongoDB"],
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
      },
      {
        id: 29,
        title: "Project Management Tool",
        description: "Team collaboration and project tracking platform",
        fullDescription: "Created a project management tool with task boards, team collaboration, time tracking, and sprint planning features.",
        technologies: ["React", "Tailwind CSS", "Socket.io", "PostgreSQL"],
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop"
      },
      {
        id: 30,
        title: "HR Management System",
        description: "Employee management and payroll platform",
        fullDescription: "Built an HR platform with employee onboarding, leave management, payroll processing, and performance reviews.",
        technologies: ["Angular", "Material UI", "TypeScript", "Node.js"],
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop"
      }
    ],
    "mobile-app": [
      {
        id: 1,
        title: "Inverex Solar Solutions",
        description: "Solar energy monitoring and management mobile app",
        fullDescription: "Developed a comprehensive mobile app for Inverex solar solutions with real-time energy monitoring, system diagnostics, and performance analytics for residential and commercial users.",
        technologies: ["React Native", "Firebase", "Redux", "Chart.js"],
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
        url: "https://play.google.com/store/search?q=inverex&c=apps"
      },
      {
        id: 2,
        title: "Digital Azadi Learning App",
        description: "Educational platform for digital skills and financial freedom",
        fullDescription: "Built a comprehensive learning platform mobile app with video courses, progress tracking, community features, and certificate generation for digital entrepreneurship.",
        technologies: ["React Native", "Firebase", "Video Streaming", "Redux"],
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
        url: "https://play.google.com/store/apps/details?id=com.tagmango.digitalazadi"
      },
      {
        id: 3,
        title: "BrandPOS Point of Sale",
        description: "Mobile POS system for retail and restaurant businesses",
        fullDescription: "Created a powerful mobile point-of-sale application with inventory management, sales tracking, receipt printing, and multi-location support for small businesses.",
        technologies: ["React Native", "SQLite", "Bluetooth Printing", "Redux"],
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        url: "https://play.google.com/store/apps/details?id=com.brandcrock.brandpos"
      },
      {
        id: 4,
        title: "Zarai Bazar Agricultural App",
        description: "Agricultural marketplace and farming solutions app",
        fullDescription: "Developed an agricultural marketplace app connecting farmers with buyers, featuring crop listings, price tracking, weather updates, and farming tips for the Pakistani market.",
        technologies: ["Flutter", "Firebase", "Google Maps", "Weather API"],
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
        url: "https://play.google.com/store/apps/details?id=com.zarai_bazar.application"
      },
      {
        id: 5,
        title: "Fitness Tracking Mobile App",
        description: "Cross-platform fitness app with workout tracking and nutrition plans",
        fullDescription: "Developed a comprehensive fitness tracking application using React Native. Features include workout logging, progress tracking, and nutrition planning.",
        technologies: ["React Native", "Native Base", "Redux", "Firebase"],
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop"
      },
      {
        id: 6,
        title: "Food Delivery App",
        description: "Restaurant ordering and delivery tracking application",
        fullDescription: "Built a food delivery app with restaurant browsing, order placement, real-time tracking, and payment integration for local restaurants.",
        technologies: ["Flutter", "Firebase", "Google Maps", "Stripe"],
        image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&h=600&fit=crop"
      },
      {
        id: 7,
        title: "E-Commerce Shopping App",
        description: "Full-featured mobile shopping application",
        fullDescription: "Created a comprehensive e-commerce mobile app with product browsing, wishlist, cart management, secure payments, and order tracking features.",
        technologies: ["React Native", "Redux", "Stripe", "Push Notifications"],
        image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop"
      },
      {
        id: 8,
        title: "Healthcare Appointment App",
        description: "Medical appointment booking and health tracking",
        fullDescription: "Developed a healthcare app with doctor discovery, appointment scheduling, medical records, prescription management, and telemedicine features.",
        technologies: ["Flutter", "Firebase", "Video Call", "Health Kit"],
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop"
      },
      {
        id: 9,
        title: "Banking Mobile App",
        description: "Secure banking application with transaction management",
        fullDescription: "Developed a secure banking app with account management, fund transfers, bill payments, transaction history, and biometric authentication.",
        technologies: ["Ionic", "Angular", "TypeScript", "Biometric Auth"],
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"
      },
      {
        id: 10,
        title: "Ride Sharing App",
        description: "Taxi booking and ride management application",
        fullDescription: "Built a ride-sharing app with real-time driver tracking, fare calculation, route optimization, and multiple payment integration.",
        technologies: ["React Native", "Google Maps", "Socket.io", "Stripe"],
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop"
      },
      {
        id: 11,
        title: "Real Estate Property App",
        description: "Property listing and virtual tour mobile application",
        fullDescription: "Created a real estate app with property search, virtual tours, agent contact, mortgage calculator, and saved properties features.",
        technologies: ["Flutter", "Firebase", "360° Viewer", "Maps API"],
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
      },
      {
        id: 12,
        title: "Social Media App",
        description: "Photo sharing and social networking mobile application",
        fullDescription: "Created a social media app with photo sharing, stories, messaging, social feed, and user engagement features.",
        technologies: ["React Native", "Firebase", "Redux", "AWS S3"],
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop"
      },
      {
        id: 13,
        title: "Travel Companion App",
        description: "Travel planning and itinerary management app",
        fullDescription: "Developed a travel app with destination discovery, trip planning, booking integration, offline maps, and travel community features.",
        technologies: ["React Native", "Google Maps", "Firebase", "Booking API"],
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop"
      },
      {
        id: 14,
        title: "Music Streaming App",
        description: "Audio streaming and playlist management application",
        fullDescription: "Built a music streaming app with audio playback, playlist creation, artist discovery, and offline listening capabilities.",
        technologies: ["React Native", "Audio API", "Firebase", "Redux"],
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop"
      },
      {
        id: 15,
        title: "Event Ticketing App",
        description: "Event discovery and ticket booking mobile app",
        fullDescription: "Created an event app with event discovery, ticket purchasing, QR code tickets, and event reminders for concerts and shows.",
        technologies: ["Flutter", "Firebase", "QR Code", "Stripe"],
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
      },
      {
        id: 16,
        title: "Grocery Delivery App",
        description: "Online grocery shopping and delivery application",
        fullDescription: "Developed a grocery delivery app with product browsing, shopping lists, scheduled delivery, and real-time order tracking.",
        technologies: ["React Native", "Firebase", "Stripe", "Maps API"],
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop"
      },
      {
        id: 17,
        title: "Meditation & Wellness App",
        description: "Mindfulness and mental health mobile application",
        fullDescription: "Built a wellness app with guided meditations, breathing exercises, sleep sounds, mood tracking, and personalized wellness plans.",
        technologies: ["Flutter", "Firebase", "Audio Player", "Health Kit"],
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop"
      },
      {
        id: 18,
        title: "Language Learning App",
        description: "Interactive language education mobile application",
        fullDescription: "Created a language learning app with interactive lessons, speech recognition, progress tracking, and gamification features.",
        technologies: ["React Native", "Firebase", "Speech API", "Redux"],
        image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop"
      },
      {
        id: 19,
        title: "Restaurant Management App",
        description: "Restaurant operations and order management app",
        fullDescription: "Developed a restaurant management app with table management, order tracking, kitchen display, and inventory control.",
        technologies: ["Flutter", "Firebase", "Bluetooth", "SQLite"],
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop"
      },
      {
        id: 20,
        title: "Parking Finder App",
        description: "Real-time parking spot discovery and booking",
        fullDescription: "Built a parking app with real-time availability, navigation, digital payments, and parking timer features.",
        technologies: ["React Native", "Google Maps", "Stripe", "Firebase"],
        image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&h=600&fit=crop"
      },
      {
        id: 21,
        title: "Job Search App",
        description: "Career opportunities and job application mobile app",
        fullDescription: "Created a job search app with job listings, resume builder, application tracking, and employer messaging features.",
        technologies: ["Flutter", "Firebase", "PDF Generation", "Push Notifications"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
      },
      {
        id: 22,
        title: "News & Magazine App",
        description: "Digital news and magazine reading application",
        fullDescription: "Developed a news app with personalized feed, offline reading, article bookmarking, and push notifications for breaking news.",
        technologies: ["React Native", "Firebase", "RSS Feed", "Redux"],
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop"
      },
      {
        id: 23,
        title: "Home Automation App",
        description: "Smart home control and IoT management app",
        fullDescription: "Built a smart home app with device control, automation rules, energy monitoring, and voice assistant integration.",
        technologies: ["Flutter", "MQTT", "Firebase", "IoT SDK"],
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
      },
      {
        id: 24,
        title: "Pet Care App",
        description: "Pet health tracking and care management app",
        fullDescription: "Created a pet care app with health records, vet appointments, medication reminders, and pet community features.",
        technologies: ["React Native", "Firebase", "Calendar API", "Push Notifications"],
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop"
      },
      {
        id: 25,
        title: "Budget Tracker App",
        description: "Personal finance and expense management app",
        fullDescription: "Developed a budgeting app with expense tracking, income management, financial goals, and spending analytics.",
        technologies: ["Flutter", "SQLite", "Chart.js", "Firebase"],
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop"
      },
      {
        id: 26,
        title: "Recipe & Cooking App",
        description: "Recipe discovery and meal planning application",
        fullDescription: "Built a cooking app with recipe search, meal planning, shopping lists, cooking timers, and nutritional information.",
        technologies: ["React Native", "Firebase", "Nutrition API", "Redux"],
        image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&h=600&fit=crop"
      },
      {
        id: 27,
        title: "AR Shopping App",
        description: "Augmented reality product visualization app",
        fullDescription: "Created an AR shopping app allowing users to visualize furniture and products in their space before purchasing.",
        technologies: ["Unity 3D", "C#", "ARCore", "ARKit"],
        image: "https://images.unsplash.com/photo-1617802690658-1173a812650d?w=800&h=600&fit=crop"
      },
      {
        id: 28,
        title: "Sports Betting App",
        description: "Live sports betting and odds tracking application",
        fullDescription: "Developed a sports betting app with live odds, match tracking, secure payments, and responsible gaming features.",
        technologies: ["React Native", "Socket.io", "Firebase", "Stripe"],
        image: "https://images.unsplash.com/photo-1461896836934- voices-fb9b6d?w=800&h=600&fit=crop"
      },
      {
        id: 29,
        title: "Courier Delivery App",
        description: "Package delivery and logistics tracking app",
        fullDescription: "Built a courier app with package tracking, driver management, route optimization, and delivery confirmation features.",
        technologies: ["Flutter", "Google Maps", "Firebase", "Push Notifications"],
        image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=600&fit=crop"
      },
      {
        id: 30,
        title: "Dating App",
        description: "Social dating and matchmaking mobile application",
        fullDescription: "Created a dating app with profile matching, messaging, video calls, and location-based discovery features.",
        technologies: ["React Native", "Firebase", "WebRTC", "Geolocation"],
        image: "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=800&h=600&fit=crop"
      }
    ],
    "cms-theme": [
      {
        id: 16,
        title: "VIVA E-Commerce Platform",
        description: "Modern payment and e-commerce solutions",
        fullDescription: "Developed a comprehensive e-commerce platform with seamless payment integration, modern UI design, and optimized checkout experience.",
        technologies: ["Shopify", "JavaScript", "SCSS", "Payment API"],
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        url: "https://www.viva.com"
      },
      {
        id: 17,
        title: "Vinolisa Wine Store",
        description: "Premium wine e-commerce with elegant design",
        fullDescription: "Created a sophisticated wine store with product filtering, age verification, and beautiful product presentations for the German market.",
        technologies: ["Shopware", "Twig", "JavaScript", "SCSS"],
        image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=600&fit=crop",
        url: "https://vinolisa.de"
      },
      {
        id: 18,
        title: "Die Stadtmeister Urban Portal",
        description: "City guide and urban lifestyle platform",
        fullDescription: "Built a comprehensive city portal with event listings, local business directories, and community features for urban explorers.",
        technologies: ["WordPress", "PHP", "JavaScript", "MySQL"],
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
        url: "https://www.die-stadtmeister.de"
      },
      {
        id: 19,
        title: "Zalando Fashion Retail",
        description: "Large-scale fashion e-commerce platform",
        fullDescription: "Contributed to the frontend development of one of Europe's largest fashion platforms with advanced filtering, wishlist, and personalization features.",
        technologies: ["React", "TypeScript", "SCSS", "REST API"],
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        url: "https://en.zalando.de"
      },
      {
        id: 20,
        title: "Küchenmaschinen Shop",
        description: "Kitchen appliances e-commerce store",
        fullDescription: "Developed a specialized kitchen appliances store with detailed product comparisons, video demonstrations, and recipe integrations.",
        technologies: ["Shopware", "PHP", "JavaScript", "SCSS"],
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
        url: "https://www.kuechenmaschinen-shop.de"
      },
      {
        id: 21,
        title: "Vape Customs Store",
        description: "Vaping products and accessories shop",
        fullDescription: "Created a modern vaping products store with age verification, product customization, and subscription options.",
        technologies: ["Shopify", "Liquid", "JavaScript", "CSS"],
        image: "https://images.unsplash.com/photo-1560913210-a5c3d8f2d7b1?w=800&h=600&fit=crop",
        url: "https://www.vape-customs.de"
      },
      {
        id: 22,
        title: "OMS Cookware UK",
        description: "Premium cookware e-commerce platform",
        fullDescription: "Built a luxury cookware store with beautiful product galleries, cooking guides, and integrated customer reviews.",
        technologies: ["Shopify", "Liquid", "JavaScript", "SCSS"],
        image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&h=600&fit=crop",
        url: "https://omscookware.co.uk"
      },
      {
        id: 23,
        title: "Fortdress Group Corporate",
        description: "Corporate website for apparel group",
        fullDescription: "Developed a professional corporate website showcasing brand portfolio, company history, and career opportunities.",
        technologies: ["WordPress", "Elementor", "PHP", "SCSS"],
        image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=600&fit=crop",
        url: "https://fortdress-group.com"
      },
      {
        id: 24,
        title: "Alpha Industries Fashion",
        description: "Iconic military-inspired fashion brand",
        fullDescription: "Contributed to the frontend development of the iconic fashion brand with product customization and lookbook features.",
        technologies: ["Shopify", "JavaScript", "SCSS", "REST API"],
        image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=600&fit=crop",
        url: "https://www.alphaindustries.com"
      },
      {
        id: 25,
        title: "Avoria B2B Portal",
        description: "B2B wholesale platform for businesses",
        fullDescription: "Built a B2B portal with bulk ordering, customer-specific pricing, and order management for wholesale customers.",
        technologies: ["Shopware", "Twig", "PHP", "JavaScript"],
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
        url: "https://avoria-b2b.de"
      },
      {
        id: 26,
        title: "Elegant Trend Fashion",
        description: "Modern fashion boutique store",
        fullDescription: "Created an elegant fashion store with lookbooks, size guides, and social media integration for a boutique brand.",
        technologies: ["Shopware", "Twig", "JavaScript", "SCSS"],
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        url: "https://eleganttrend.brandcrock.com"
      },
      {
        id: 27,
        title: "Petrhein Pet Supplies",
        description: "Pet products and accessories store",
        fullDescription: "Developed a comprehensive pet supplies store with breed-specific recommendations and subscription services.",
        technologies: ["Shopware", "PHP", "JavaScript", "SCSS"],
        image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=600&fit=crop",
        url: "https://www.petrhein.de"
      },
      {
        id: 28,
        title: "Qpool24 Pool Equipment",
        description: "Swimming pool products and accessories",
        fullDescription: "Built a specialized pool equipment store with installation guides, product configurators, and seasonal promotions.",
        technologies: ["Shopware", "Twig", "JavaScript", "CSS"],
        image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop",
        url: "https://www.qpool24.com"
      },
      {
        id: 29,
        title: "E-Zigaretten Handel",
        description: "E-cigarette and vaping products store",
        fullDescription: "Created an e-cigarette store with age verification, product comparisons, and starter kit bundles.",
        technologies: ["Shopify", "Liquid", "JavaScript", "SCSS"],
        image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800&h=600&fit=crop",
        url: "https://e-zigaretten-handel.de"
      },
      {
        id: 30,
        title: "Junge Pflanzen Nursery",
        description: "Plant nursery and gardening store",
        fullDescription: "Developed a plant nursery store with care guides, seasonal availability, and delivery scheduling for live plants.",
        technologies: ["WordPress", "WooCommerce", "PHP", "JavaScript"],
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
        url: "https://www.jungepflanzen.de"
      },
      {
        id: 31,
        title: "Münzdiscount Coin Shop",
        description: "Numismatic coins and collectibles store",
        fullDescription: "Built a specialized coin collector store with grading information, authentication, and investment tracking.",
        technologies: ["Shopware", "PHP", "JavaScript", "SCSS"],
        image: "https://images.unsplash.com/photo-1621761311410-91dd4f678b0b?w=800&h=600&fit=crop",
        url: "https://muenzdiscount.de"
      },
      {
        id: 32,
        title: "Vinyl Magic Records",
        description: "Vinyl records and music store",
        fullDescription: "Created a vinyl records store with audio previews, artist information, and collector edition features.",
        technologies: ["Shopify", "Liquid", "JavaScript", "CSS"],
        image: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=800&h=600&fit=crop",
        url: "https://www.vinylmagic.de"
      },
      {
        id: 33,
        title: "Objektiv Verleih Rental",
        description: "Camera and lens rental platform",
        fullDescription: "Developed a camera equipment rental platform with availability calendar, insurance options, and booking management.",
        technologies: ["WordPress", "PHP", "JavaScript", "MySQL"],
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop",
        url: "https://www.objektiv-verleih.de"
      },
      {
        id: 34,
        title: "Memory PC Computer Store",
        description: "Custom PC and components store",
        fullDescription: "Built a PC components store with custom PC builder, compatibility checker, and technical specifications.",
        technologies: ["Shopware", "Twig", "JavaScript", "SCSS"],
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&h=600&fit=crop",
        url: "https://www.memorypc.de"
      },
      {
        id: 35,
        title: "Shimla Germering Restaurant",
        description: "Indian restaurant website with ordering",
        fullDescription: "Created a restaurant website with online menu, table reservations, and takeaway ordering system.",
        technologies: ["WordPress", "PHP", "JavaScript", "CSS"],
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
        url: "https://shimla-germering.de"
      },
      {
        id: 36,
        title: "Groener Schulze Construction",
        description: "Construction company corporate website",
        fullDescription: "Developed a professional construction company website with project portfolio, services, and contact forms.",
        technologies: ["WordPress", "Elementor", "PHP", "SCSS"],
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
        url: "https://www.groener-schulze.com"
      },
      {
        id: 37,
        title: "Inkrid Tattoo Supplies",
        description: "Tattoo and ink supplies store",
        fullDescription: "Built a tattoo supplies store with product categories, artist resources, and professional equipment.",
        technologies: ["Shopify", "Liquid", "JavaScript", "SCSS"],
        image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&h=600&fit=crop",
        url: "https://www.inkrid.de"
      },
      {
        id: 38,
        title: "BBV Domke Services",
        description: "Professional services corporate website",
        fullDescription: "Created a corporate services website with service listings, team profiles, and inquiry forms.",
        technologies: ["WordPress", "PHP", "JavaScript", "CSS"],
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
        url: "https://bbv-domke.de"
      },
      {
        id: 39,
        title: "Avoria Liquids Store",
        description: "E-liquid and vaping products shop",
        fullDescription: "Developed an e-liquid store with flavor profiles, nicotine calculators, and subscription options.",
        technologies: ["Shopware", "Twig", "PHP", "JavaScript"],
        image: "https://images.unsplash.com/photo-1560913210-a5c3d8f2d7b1?w=800&h=600&fit=crop",
        url: "https://www.avoria-liquids.de"
      },
      {
        id: 40,
        title: "Cambuy E-Commerce",
        description: "General e-commerce marketplace",
        fullDescription: "Built a multi-category e-commerce platform with vendor management and marketplace features.",
        technologies: ["Shopify", "Liquid", "JavaScript", "SCSS"],
        image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
        url: "https://cambuy.de"
      },
      {
        id: 41,
        title: "Studibuch Book Store",
        description: "Academic books and textbooks store",
        fullDescription: "Created an academic bookstore with ISBN search, course material bundles, and student discounts.",
        technologies: ["WordPress", "WooCommerce", "PHP", "JavaScript"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
        url: "https://shop.studibuch.de"
      },
      {
        id: 42,
        title: "Meekilli Fashion Store",
        description: "Contemporary fashion boutique",
        fullDescription: "Developed a modern fashion store with lookbooks, size recommendations, and style guides.",
        technologies: ["Shopify", "Liquid", "JavaScript", "SCSS"],
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        url: "https://meekilli.com"
      },
      {
        id: 43,
        title: "PSARB UrAppTech Platform",
        description: "Tech company web application",
        fullDescription: "Built a technology company platform with service showcase, portfolio, and client portal.",
        technologies: ["React", "Tailwind CSS", "TypeScript", "Node.js"],
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
        url: "https://psarb.urapptech.com"
      },
      {
        id: 44,
        title: "TwentyOne Pakistan",
        description: "Pakistani e-commerce platform",
        fullDescription: "Created an e-commerce platform for the Pakistani market with local payment integration and delivery tracking.",
        technologies: ["WordPress", "WooCommerce", "PHP", "JavaScript"],
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        url: "https://twentyone.com.pk"
      },
      {
        id: 45,
        title: "Peng Salon Hair Studio",
        description: "Hair salon booking website",
        fullDescription: "Developed a salon website with online booking, service menu, stylist profiles, and gallery.",
        technologies: ["WordPress", "PHP", "JavaScript", "CSS"],
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
        url: "https://www.pengsalon.com"
      }
    ]
  };

  const categoryNames: Record<string, string> = {
    "web-application": "Web Applications",
    "mobile-app": "Mobile Apps",
    "cms-theme": "CMS & Themes"
  };

  const projects = categoryProjects[category || ""] || [];
  const categoryName = categoryNames[category || ""] || "Projects";

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = parseInt(entry.target.getAttribute("data-project-id") || "0");
            setVisibleProjects((prev) => new Set([...prev, projectId]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px"
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const projectElements = document.querySelectorAll("[data-project-id]");
    projectElements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      projectElements.forEach((el) => {
        if (observerRef.current) {
          observerRef.current.unobserve(el);
        }
      });
    };
  }, [projects]);

  if (projects.length === 0) {
    return (
      <div className="min-h-screen py-12 px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
          <Button onClick={() => navigate("/portfolio")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12">
          <Button
            variant="ghost"
            onClick={() => navigate("/portfolio")}
            className="mb-6 hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{categoryName}</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Scroll to explore {projects.length} projects in this category
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((project) => (
            <div
              key={project.id}
              data-project-id={project.id}
              className={`transition-all duration-600 ${
                visibleProjects.has(project.id)
                  ? "animate-elastic-scale opacity-100"
                  : "opacity-0 scale-0"
              }`}
            >
              <Card className="glass-card overflow-hidden hover:shadow-glow transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-64 md:h-full bg-muted overflow-hidden group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 gradient-text">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {project.description}
                    </p>
                    <p className="text-foreground/80 mb-6 leading-relaxed">
                      {project.fullDescription}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-3 text-primary">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="bg-primary/10 text-primary border-primary/30"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto"
                        >
                          <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                            Visit Site
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProjects;
