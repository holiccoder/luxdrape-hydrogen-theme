import { Outlet, useLocation, Link, NavLink } from 'react-router-dom';
import {
  ShoppingBagIcon,
  MenuIcon,
  XIcon,
  SearchIcon,
  ChevronDownIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState } from 'react';
import { useCart } from '@/contexts/cart-context';

// Simple active link component
const ActiveLink = ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `${className || ''} ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`
    }
  >
    {children}
  </NavLink>
);

// Header Component
const Header = () => {
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/buying-guide', label: 'Buying Guide' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-semibold">Curtains & Co</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <ActiveLink key={link.href} to={link.href} className="text-sm transition-colors">
              {link.label}
            </ActiveLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <SearchIcon className="h-5 w-5" />
          </Button>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBagIcon className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      to={link.href}
                      className={`text-lg ${location.pathname === link.href ? 'font-medium' : 'text-muted-foreground'}`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

// Footer Component
const Footer = () => (
  <footer className="border-t bg-muted/40">
    <div className="container py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-serif text-lg font-semibold mb-4">Curtains & Co</h3>
          <p className="text-sm text-muted-foreground">
            Custom window treatments crafted with care for your home.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-foreground">All Products</Link></li>
            <li><Link to="/shop?category=curtains" className="hover:text-foreground">Curtains</Link></li>
            <li><Link to="/shop?category=shades" className="hover:text-foreground">Shades</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-4">Help</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/guides/measure" className="hover:text-foreground">How to Measure</Link></li>
            <li><Link to="/guides/installation" className="hover:text-foreground">Installation</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
        © 2024 Curtains & Co. All rights reserved.
      </div>
    </div>
  </footer>
);

// Layout Component
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
