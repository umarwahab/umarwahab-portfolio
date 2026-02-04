import { MobileMenu } from "@/components/MobileMenu";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4">
          <h1 className="font-bold text-xl gradient-text">Syed Umar</h1>
          <MobileMenu />
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
