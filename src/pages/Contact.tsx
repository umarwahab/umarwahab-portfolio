import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Calendar, MessageSquare, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const contactLinks = [
    
    {
      icon: Mail,
      label: "Gmail",
      value: "umar.wahab2010@gmail.com",
      href: "mailto:umar.wahab2010@gmail.com",
      color: "text-red-400"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect with me",
      href: "https://linkedin.com/in/syed-umar-wahab",
      color: "text-blue-500"
    },
    {
      icon: MessageSquare,
      label: "Skype",
      value: "Chat on Skype",
      href: "skype:live:umarwahab45?chat",
      color: "text-cyan-400"
    },
    {
      icon: Calendar,
      label: "Calendly",
      value: "Schedule a meeting",
      href: "https://calendly.com/umarwahab45",
      color: "text-primary"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </div>

        {/* Contact Info Card */}
        <Card className="glass-card p-8 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4 text-primary">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-muted-foreground">Karachi, Pakistan</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <p className="font-semibold">Availability</p>
                    <p className="text-muted-foreground">0332-0829085</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <span>8+ years of professional experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <span>300+ projects delivered successfully</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <span>Full-time & contract opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">▹</span>
                  <span>Remote work preferred</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Contact Links Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {contactLinks.map((link, index) => (
            <Card
              key={index}
              className="glass-card p-6 hover:shadow-glow transition-all duration-300 hover:scale-105 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="block">
                <div className="flex items-center mb-4">
                  <div className={`${link.color} mr-4`}>
                    <link.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{link.label}</h3>
                    <p className="text-sm text-muted-foreground">{link.value}</p>
                  </div>
                </div>
                <Button className="w-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30">
                  Connect via {link.label}
                </Button>
              </a>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center glass-card p-8 rounded-lg animate-slide-up delay-500">
          <h2 className="text-2xl font-bold mb-4">Let's Build Something Amazing Together</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you have a project in mind, need a consultation, or just want to say hi, I'm here to help bring your ideas to life with cutting-edge frontend development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105">
              <a href="mailto:umar.wahab2010@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Send Email
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105">
              <a href="https://calendly.com/umarwahab45" target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                Book a Call
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
