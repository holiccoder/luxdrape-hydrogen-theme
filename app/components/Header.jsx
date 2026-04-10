import {NavLink, Link} from 'react-router';
import {ShoppingBagIcon, MenuIcon, SearchIcon} from 'lucide-react';
import {Button} from '~/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '~/components/ui/sheet';
import {useAside} from '~/components/Aside';
import {useState} from 'react';

function ActiveLink({to, children, className}) {
  return (
    <NavLink
      to={to}
      className={({isActive}) =>
        `${className || ''} ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`
      }
    >
      {children}
    </NavLink>
  );
}

export function Header({header, cart}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const aside = useAside();
  const isCartOpen = aside.type === 'cart';

  const navLinks = [
    {href: '/', label: 'Home'},
    {href: '/collections/all', label: 'Shop'},
    {href: '/pages/buying-guide', label: 'Buying Guide'},
    {href: '/pages/brand-story', label: 'About'},
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-[95%] max-w-[1600px] mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-semibold">
            {header?.shop?.name || 'LuxDrape'}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <ActiveLink
              key={link.href}
              to={link.href}
              className="text-sm transition-colors"
            >
              {link.label}
            </ActiveLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => aside.open('search')}
            aria-label="Open search"
          >
            <SearchIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => {
              if (isCartOpen) {
                aside.close();
                return;
              }
              aside.open('cart');
            }}
            aria-label={isCartOpen ? 'Close cart' : 'Open cart'}
            aria-expanded={isCartOpen}
          >
            <ShoppingBagIcon className="h-5 w-5" />
            {cart?.totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {cart.totalQuantity}
              </span>
            )}
          </Button>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
