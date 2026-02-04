import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Laptop, Smartphone, Layout } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: any;
  projectCount: number;
  image: string;
}

const Portfolio = () => {
  const navigate = useNavigate();

  const categories: Category[] = [
    {
      id: "web-application",
      name: "Web Applications",
      description: "Enterprise systems, dashboards, ERP solutions, and complex web platforms",
      icon: Laptop,
      projectCount: 150,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    },
    {
      id: "mobile-app",
      name: "Mobile Apps",
      description: "Cross-platform mobile applications for iOS and Android",
      icon: Smartphone,
      projectCount: 80,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
    },
    {
      id: "cms-theme",
      name: "CMS & Themes",
      description: "WordPress, Shopify, Shopware themes and custom CMS solutions",
      icon: Layout,
      projectCount: 70,
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of 300+ projects delivered across various domains. Select a category to explore projects.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="glass-card overflow-hidden cursor-pointer hover:shadow-glow transition-all duration-300 hover:scale-105 animate-scale-in group"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(`/portfolio/${category.id}`)}
              >
                <div className="relative h-48 bg-muted overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/20 backdrop-blur-sm">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="bg-secondary/30 text-secondary border-secondary/50 backdrop-blur-sm">
                        {category.projectCount}+ Projects
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 gradient-text group-hover:scale-105 transition-transform">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
