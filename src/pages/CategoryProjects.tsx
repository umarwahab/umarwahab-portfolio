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
        title: "Enterprise ERP Dashboard",
        description: "Complete ERP system with advanced analytics and reporting",
        fullDescription: "Built a comprehensive Enterprise Resource Planning dashboard using React and Tailwind CSS. Features include real-time analytics, inventory management, financial reporting, and user role management.",
        technologies: ["React", "Tailwind CSS", "TypeScript", "Chart.js"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
      },
      {
        id: 3,
        title: "E-Commerce Platform",
        description: "Full-featured online shopping platform with payment integration",
        fullDescription: "Created a modern e-commerce platform with Shopify and custom theme development. Includes product catalog, shopping cart, checkout process, and payment gateway integration.",
        technologies: ["Shopify", "Liquid", "JavaScript", "SCSS"],
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop"
      },
      {
        id: 4,
        title: "Financial Dashboard",
        description: "Real-time financial analytics and portfolio management system",
        fullDescription: "Developed a sophisticated financial dashboard using Angular and Material UI. Features include portfolio tracking, real-time market data, and advanced charting.",
        technologies: ["Angular", "Material UI", "TypeScript", "D3.js"],
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop"
      },
      {
        id: 5,
        title: "Transportation Management System",
        description: "Fleet management and route optimization platform",
        fullDescription: "Built a comprehensive transportation management system using Vue.js and Bootstrap. Features include vehicle tracking, route optimization, and driver management.",
        technologies: ["Vue.js", "Bootstrap", "Google Maps API", "Node.js"],
        image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&h=600&fit=crop"
      },
      {
        id: 6,
        title: "POS System",
        description: "Point of sale system with inventory and sales management",
        fullDescription: "Created a modern point-of-sale system using React and Ionic for both web and tablet interfaces. Features include product scanning and inventory management.",
        technologies: ["React", "Ionic", "Tailwind CSS", "SQLite"],
        image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&h=600&fit=crop"
      },
      {
        id: 7,
        title: "Healthcare Management Portal",
        description: "Patient and appointment management system for clinics",
        fullDescription: "Developed a comprehensive healthcare portal with patient records, appointment scheduling, and medical history tracking.",
        technologies: ["React", "Tailwind CSS", "Firebase", "Node.js"],
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop"
      },
      {
        id: 8,
        title: "Real Estate Listing Platform",
        description: "Property listing and virtual tour system",
        fullDescription: "Built a modern real estate platform with property listings, search filters, virtual tours, and agent management.",
        technologies: ["Vue.js", "Tailwind CSS", "Mapbox", "Laravel"],
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
      },
      {
        id: 9,
        title: "Learning Management System",
        description: "Online education platform with course management",
        fullDescription: "Created an LMS with course creation, student enrollment, progress tracking, and assessment tools.",
        technologies: ["React", "Material UI", "TypeScript", "PostgreSQL"],
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop"
      },
      {
        id: 10,
        title: "Hotel Booking System",
        description: "Reservation management and booking platform",
        fullDescription: "Developed a hotel booking system with room availability, reservation management, and payment processing.",
        technologies: ["Angular", "Bootstrap", "TypeScript", "Stripe"],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
      }
    ],
    "mobile-app": [
      {
        id: 2,
        title: "Fitness Tracking Mobile App",
        description: "Cross-platform fitness app with workout tracking and nutrition plans",
        fullDescription: "Developed a comprehensive fitness tracking application using React Native. Features include workout logging, progress tracking, and nutrition planning.",
        technologies: ["React Native", "Native Base", "Redux", "Firebase"],
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop"
      },
      {
        id: 11,
        title: "Food Delivery App",
        description: "Restaurant ordering and delivery tracking application",
        fullDescription: "Built a food delivery app with restaurant browsing, order placement, real-time tracking, and payment integration.",
        technologies: ["Flutter", "Firebase", "Google Maps", "Stripe"],
        image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&h=600&fit=crop"
      },
      {
        id: 12,
        title: "Social Media App",
        description: "Photo sharing and social networking mobile application",
        fullDescription: "Created a social media app with photo sharing, stories, messaging, and social feed features.",
        technologies: ["React Native", "Firebase", "Redux", "AWS S3"],
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop"
      },
      {
        id: 13,
        title: "Banking Mobile App",
        description: "Secure banking application with transaction management",
        fullDescription: "Developed a secure banking app with account management, fund transfers, bill payments, and transaction history.",
        technologies: ["Ionic", "Angular", "TypeScript", "Biometric Auth"],
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"
      },
      {
        id: 14,
        title: "Ride Sharing App",
        description: "Taxi booking and ride management application",
        fullDescription: "Built a ride-sharing app with real-time driver tracking, fare calculation, and payment integration.",
        technologies: ["React Native", "Google Maps", "Socket.io", "Stripe"],
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop"
      },
      {
        id: 15,
        title: "AR Shopping App",
        description: "Augmented reality product visualization app",
        fullDescription: "Created an AR shopping app allowing users to visualize furniture and products in their space before purchasing.",
        technologies: ["Unity 3D", "C#", "ARCore", "ARKit"],
        image: "https://images.unsplash.com/photo-1617802690658-1173a812650d?w=800&h=600&fit=crop"
      }
    ],
    "cms-theme": [
      {
        id: 16,
        title: "Business WordPress Theme",
        description: "Professional corporate theme with Elementor integration",
        fullDescription: "Developed a custom WordPress theme for business websites with Elementor support, custom post types, and advanced customization options.",
        technologies: ["WordPress", "Elementor", "PHP", "SCSS"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      },
      {
        id: 17,
        title: "Shopify Fashion Store",
        description: "Modern e-commerce theme for fashion retailers",
        fullDescription: "Created a Shopify theme with product quick view, wishlist, mega menu, and Instagram integration.",
        technologies: ["Shopify", "Liquid", "JavaScript", "CSS"],
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
      },
      {
        id: 18,
        title: "WooCommerce Store Theme",
        description: "Complete e-commerce WordPress theme with WooCommerce",
        fullDescription: "Built a fully functional WooCommerce theme with custom product layouts, filters, and checkout optimization.",
        technologies: ["WordPress", "WooCommerce", "PHP", "JavaScript"],
        image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop"
      },
      {
        id: 19,
        title: "Shopware B2B Theme",
        description: "Enterprise e-commerce theme for B2B businesses",
        fullDescription: "Developed a Shopware theme with bulk ordering, quote management, and customer-specific pricing.",
        technologies: ["Shopware", "Twig", "JavaScript", "SCSS"],
        image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=600&fit=crop"
      },
      {
        id: 20,
        title: "Restaurant WordPress Theme",
        description: "Hospitality theme with online ordering and reservations",
        fullDescription: "Created a restaurant theme with menu management, table reservations, and online ordering integration.",
        technologies: ["WordPress", "PHP", "WPBakery", "JavaScript"],
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
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
