import { Home, User, Briefcase, Mail } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "About", url: "/about", icon: User },
  { title: "Portfolio", url: "/portfolio", icon: Briefcase },
  { title: "Contact", url: "/contact", icon: Mail },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarContent className="pt-8">
        <div className="px-6 mb-8">
          <h2 className={`font-bold transition-all duration-300 ${open ? 'text-xl' : 'text-lg'}`}>
            {open ? (
              <span className="gradient-text">Syed Umar</span>
            ) : (
              <span className="gradient-text">SU</span>
            )}
          </h2>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                      activeClassName="bg-primary/20 text-primary font-medium shadow-glow"
                    >
                      <item.icon className="h-5 w-5" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
