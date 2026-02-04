import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GraduationCap, Briefcase, Code2, Smartphone, Palette, Database } from "lucide-react";

const About = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend Development",
      skills: ["React", "Angular", "Vue", "HTML5", "CSS3", "SCSS", "Tailwind CSS", "Bootstrap 5", "JavaScript (ES6+)", "TypeScript", "jQuery"]
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      skills: ["Ionic + Angular", "React Native", "Flutter", "Android", "iOS", "Play Store Deployment"]
    },
    {
      icon: Palette,
      title: "UI/UX & Design",
      skills: ["Figma", "Adobe XD", "PSD to HTML", "Material UI", "Shadcn UI", "Native Base", "Design Systems", "Animations"]
    },
    {
      icon: Database,
      title: "CMS & Backend",
      skills: ["WordPress", "Shopify", "Shopware", "PHP", "MySQL", "Laravel", "WooCommerce", "Elementor"]
    }
  ];

  const experiences = [
    {
      title: "Senior UI/UX Developer",
      company: "UrApp Technology",
      location: "Karachi",
      period: "October 2023 – Present",
      responsibilities: [
        "Convert Figma designs into HTML, CSS, SCSS, Bootstrap, and Tailwind interfaces",
        "Build ERP dashboards and enterprise modules using React, Angular, and Tailwind",
        "Develop Ionic-based mobile apps from Figma prototypes",
        "Ensure UX consistency, accessibility, and pixel-perfect design standards"
      ]
    },
    {
      title: "Senior Frontend Developer",
      company: "Brandcrock GmbH",
      location: "Karachi",
      period: "March 2021 – October 2023",
      responsibilities: [
        "Convert PSD to HTML, WordPress, ReactJS, and Shopware themes",
        "Build complete frontends with animation, jQuery behavior, and JS workflows",
        "Develop fully custom Shopware themes from PSD/Figma",
        "Handle client communication and delivery management"
      ]
    },
    {
      title: "Product Manager (Web & Mobile)",
      company: "ITAG Pvt Ltd",
      location: "Karachi",
      period: "March 2017 – February 2021",
      responsibilities: [
        "Manage UI/UX product development lifecycle from requirements to deployment",
        "Convert client business needs into wireframes and GUI structures",
        "Develop UIs using React, AngularJS, VueJS, WordPress, and mobile frameworks",
        "Build AR apps using Unity 3D & C#"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Highly skilled Senior UI/UX & Frontend Engineer with 8+ years of experience delivering end-to-end digital products including web applications, mobile apps, admin dashboards, and enterprise solutions.
          </p>
        </div>

        {/* Skills Section */}
        <div className="mb-16 animate-slide-up">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Code2 className="mr-3 text-primary" />
            Core Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
              <Card key={index} className="glass-card p-6 hover:shadow-glow transition-all duration-300 hover:scale-105">
                <div className="flex items-center mb-4">
                  <category.icon className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary border-primary/30">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-16 animate-slide-up delay-200">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Briefcase className="mr-3 text-primary" />
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card key={index} className="glass-card p-6 hover:shadow-glow-secondary transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary">{exp.title}</h3>
                    <p className="text-lg text-foreground">{exp.company}</p>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2 md:mt-0">
                    <p>{exp.period}</p>
                    <p>{exp.location}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary mr-2">▹</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="animate-slide-up delay-300">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <GraduationCap className="mr-3 text-primary" />
            Education
          </h2>
          <Card className="glass-card p-6 hover:shadow-glow transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-bold text-primary">BS Computer Science (BSCS)</h3>
                <p className="text-lg text-foreground">PAF-KIET, Karachi</p>
              </div>
              <p className="text-muted-foreground mt-2 md:mt-0">2012 – 2016</p>
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <div className="mt-16 glass-card p-8 rounded-lg animate-slide-up delay-400">
          <h3 className="text-2xl font-bold mb-4 gradient-text">Key Achievements</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-primary mr-2 text-xl">✓</span>
              Delivered 300+ UI interfaces across ERPs, dashboards, SaaS products, mobile apps, and eCommerce platforms
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2 text-xl">✓</span>
              Successfully implemented modern UI systems with high performance and reusable architecture
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2 text-xl">✓</span>
              Recognized for pixel-perfect UI delivery, client satisfaction, and scalable front-end engineering
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
