import {NavLink, Link} from 'react-router';
import {ShoppingBagIcon, MenuIcon, SearchIcon} from 'lucide-react';
import {Button} from '~/components/ui/button';
import {Sheet, SheetContent, SheetTrigger} from '~/components/ui/sheet';
import {useAside} from '~/components/Aside';
import {useState} from 'react';
import {Navigation} from '~/components/Navigation';

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

export function Header({header, cart, navigation}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const aside = useAside();
  const isCartOpen = aside.type === 'cart';

  // Use navigation from props (header.json) or fallback to simple navLinks
  const navItems = navigation || [
    {href: '/', label: 'Home', type: 'link', url: '/'},
    {href: '/collections/all', label: 'Shop', type: 'link', url: '/collections/all'},
    {href: '/pages/buying-guide', label: 'Buying Guide', type: 'link', url: '/pages/buying-guide'},
    {href: '/pages/brand-story', label: 'About', type: 'link', url: '/pages/brand-story'},
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-[95%] max-w-[1600px] mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-semibold">
            {header?.shop?.name || 'LuxDrape'}
          </span>
        </Link>

        <Navigation items={navItems} />

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
            <SheetContent side="right" className="w-full max-w-full bg-white border-l border-gray-200">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item, index) => (
                  <div key={index}>
                    <Link
                      to={item.url || item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg text-foreground font-medium"
                    >
                      {item.label}
                    </Link>
                    {item.items && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.items.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.url}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-sm text-muted-foreground hover:text-foreground"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
