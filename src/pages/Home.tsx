import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>
      
      {/* Animated circles */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium mb-4 animate-scale-in">
              Available for new opportunities
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Hi, I'm <span className="gradient-text">Syed Umar Wahab</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-slide-up delay-100">
            Senior UI/UX Engineer | Frontend Architect | Mobile App Developer
          </p>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up delay-200">
            Crafting pixel-perfect, responsive digital experiences with 8+ years of expertise in React, Angular, Vue, and mobile development.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-300">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105">
              <Link to="/portfolio">
                View My Work <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105">
              <Link to="/contact">
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up delay-500">
            {[
              { label: "Years Experience", value: "8+" },
              { label: "Projects Delivered", value: "300+" },
              { label: "Technologies", value: "20+" },
              { label: "Happy Clients", value: "50+" },
            ].map((stat, index) => (
              <div key={index} className="glass-card p-6 rounded-lg hover:shadow-glow transition-all duration-300 hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
