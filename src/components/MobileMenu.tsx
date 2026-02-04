import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Home, User, Briefcase, Mail } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "About", url: "/about", icon: User },
  { title: "Portfolio", url: "/portfolio", icon: Briefcase },
  { title: "Contact", url: "/contact", icon: Mail },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="h-full w-[300px] ml-auto rounded-l-2xl">
          <DrawerHeader className="flex items-center justify-between border-b border-border/50 pb-4">
            <DrawerTitle className="gradient-text text-xl font-bold">Menu</DrawerTitle>
            <button
              onClick={() => setOpen(false)}
              className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </DrawerHeader>

          <nav className="flex flex-col p-6 space-y-2">
            {navItems.map((item, index) => (
              <NavLink
                key={item.title}
                to={item.url}
                end
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-primary/10 hover:translate-x-2"
                activeClassName="bg-primary/20 text-primary font-medium shadow-glow"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: open ? "slide-in-right 0.4s ease-out forwards" : "none",
                  opacity: 0,
                }}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-lg">{item.title}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto p-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground text-center">
              Available for opportunities
            </p>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
