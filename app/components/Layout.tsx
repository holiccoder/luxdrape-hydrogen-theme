import { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import {
  ShoppingBagIcon,
  MenuIcon,
  XIcon,
  SearchIcon,
  ChevronDownIcon,
  RulerIcon,
  BookOpenIcon,
  BriefcaseIcon,
  UsersIcon,
  FileTextIcon,
  GraduationCapIcon,
  HelpCircleIcon,
  LayersIcon,
  SunIcon,
  LeafIcon,
  SwatchBookIcon,
  WrenchIcon,
  AwardIcon,
  PhoneIcon,
  ZapIcon,
  DrillIcon,
  HomeIcon,
  ArrowRightIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { ActiveLink } from '@lark-apaas/client-toolkit/components/ActiveLink';
import { CartProvider, useCart } from '@/contexts/cart-context';
import { UniversalLink } from '@lark-apaas/client-toolkit/components/UniversalLink';

// ============================================
// Navigation Data with Fabric Categories
// ============================================

// Curtains dropdown with fabric categories
const curtainsMenu = {
  title: 'Curtains',
  href: '/shop?category=curtains',
  categories: [
    {
      title: 'Linen',
      href: '/shop?category=curtains&fabric=linen',
      image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda',
      description: 'Natural & breathable',
    },
    {
      title: 'Herringbone Linen',
      href: '/shop?category=curtains&fabric=herringbone-linen',
      image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
      description: 'Textured elegance',
    },
    {
      title: 'Cotton',
      href: '/shop?category=curtains&fabric=cotton',
      image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda',
      description: 'Soft & versatile',
    },
    {
      title: 'Velvet',
      href: '/shop?category=curtains&fabric=velvet',
      image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda',
      description: 'Luxurious & rich',
    },
    {
      title: 'Plaid & Checks',
      href: '/shop?category=curtains&pattern=plaid',
      image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda',
      description: 'Classic patterns',
    },
  ],
};

// Shades dropdown with fabric categories
const shadesMenu = {
  title: 'Shades',
  href: '/products/prod-2/shades',
  categories: [
    {
      title: 'Linen Shades',
      href: '/shop?category=shades&fabric=linen',
      image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda',
      description: 'Soft natural light',
    },
    {
      title: 'Cotton Shades',
      href: '/shop?category=shades&fabric=cotton',
      image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
      description: 'Crisp & clean',
    },
    {
      title: 'Silk Shades',
      href: '/shop?category=shades&fabric=silk',
      image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda',
      description: 'Elegant sheen',
    },
    {
      title: 'Bamboo & Woven Wood',
      href: '/shop?category=bamboo',
      image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda',
      description: 'Natural textures',
      badge: 'No-Drill Available',
    },
    {
      title: 'Blackout Shades',
      href: '/shop?category=shades&feature=blackout',
      image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda',
      description: 'Total light control',
    },
  ],
};

// Main navigation items
const mainNavItems = [
  { label: 'Motorization', href: '/shop?category=motorized', isHighlighted: true },
  { label: 'Hardware', href: '/products/prod-2/hardware' },
  { label: 'Swatches', href: '/products/prod-2/swatches' },
  { label: 'Inspiration', href: '/inspiration' },
  { label: 'For Business', href: '/trade-program' },
  { label: 'How To', href: '/guides' },
];

// ============================================
// Components
// ============================================

// Deep teal/green promo bar - not brown
const PromoBar = () => (
  <div className="bg-[hsl(220_15%_22%)] text-white text-center py-2.5 px-4 text-sm">
    <div className="max-w-7xl mx-auto flex items-center justify-center gap-6">
      <span className="hidden sm:inline">Free shipping on orders over $200</span>
      <span className="hidden sm:inline text-white/50">|</span>
      <span>Free & Fast 14-Day Delivery</span>
      <span className="hidden md:inline text-white/50">|</span>
      <Link to="/products/prod-2/swatches" className="hidden md:inline underline hover:no-underline font-medium">
        Order Free Swatches
      </Link>
    </div>
  </div>
);

const CartIcon = () => {
  const { cartCount } = useCart();
  return (
    <ActiveLink to="/cart" className="relative p-2 hover:bg-accent transition-colors">
      <ShoppingBagIcon className="h-5 w-5 text-foreground" />
      {cartCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center bg-[hsl(220_15%_35%)] text-white text-[10px] font-bold">
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      )}
    </ActiveLink>
  );
};

// Fabric Card Component for Dropdown
const FabricCard = ({
  title,
  href,
  image,
  description,
  badge,
}: {
  title: string;
  href: string;
  image: string;
  description: string;
  badge?: string;
}) => (
  <ActiveLink to={href} className="group block">
    <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-2">
      <Image
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {badge && (
        <div className="absolute top-2 left-2 bg-[hsl(220_15%_35%)] text-white text-[10px] font-semibold px-2 py-1">
          {badge}
        </div>
      )}
    </div>
      <h4 className="font-medium text-sm text-foreground group-hover:text-[hsl(220_15%_40%)] transition-colors">
      {title}
    </h4>
    <p className="text-xs text-muted-foreground">{description}</p>
  </ActiveLink>
);

// Desktop Navigation
const DesktopNavigation = () => {
  return (
    <header className="hidden lg:block sticky top-0 z-50 bg-background border-b border-border">
      {/* Promo Bar - Teal color */}
      <PromoBar />

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <ActiveLink to="/" className="flex items-center shrink-0 mr-8">
            <span className="font-serif text-2xl font-semibold text-foreground tracking-tight">
              LuxDrape
            </span>
          </ActiveLink>

          {/* Navigation with Dropdowns */}
          <nav className="flex items-center gap-1">
            {/* Curtains Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-[hsl(220_15%_40%)] transition-colors">
                Curtains
                <ChevronDownIcon className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
              </button>
              {/* Dropdown - No rounded corners */}
              <div className="absolute top-full left-0 pt-1 hidden group-hover:block z-50">
                <div className="w-[640px] bg-background border border-border shadow-lg">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Shop by Fabric</h3>
                      <ActiveLink
                        to="/shop?category=curtains"
                        className="text-xs text-[hsl(220_15%_40%)] hover:underline flex items-center gap-1"
                      >
                        View All <ArrowRightIcon className="h-3 w-3" />
                      </ActiveLink>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                      {curtainsMenu.categories.map((cat) => (
                        <FabricCard key={cat.title} {...cat} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shades Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-[hsl(220_15%_40%)] transition-colors">
                Shades
                <ChevronDownIcon className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
              </button>
              {/* Dropdown - No rounded corners */}
              <div className="absolute top-full left-0 pt-1 hidden group-hover:block z-50">
                <div className="w-[640px] bg-background border border-border shadow-lg">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Shop by Material</h3>
                      <ActiveLink
                        to="/products/prod-2/shades"
                        className="text-xs text-[hsl(220_15%_40%)] hover:underline flex items-center gap-1"
                      >
                        View All <ArrowRightIcon className="h-3 w-3" />
                      </ActiveLink>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                      {shadesMenu.categories.map((cat) => (
                        <FabricCard key={cat.title} {...cat} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Items */}
            {mainNavItems.map((item) => (
              <ActiveLink
                key={item.label}
                to={item.href}
                className={({ isActive }: { isActive: boolean }) =>
                  `px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                    item.isHighlighted
                      ? 'text-[hsl(220_15%_35%)] hover:text-[hsl(220_15%_25%)]'
                      : isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                {item.label}
              </ActiveLink>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-44 pl-9 h-9 text-sm border-border/50 bg-background"
              />
            </div>
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

// Mobile Navigation
const MobileNavigation = () => {
  const { cartCount } = useCart();
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-background border-b border-border">
        {/* Promo Bar - Teal */}
        <div className="bg-[hsl(180_25%_25%)] text-white text-center py-2 px-4 text-xs">
          <span>Free shipping on orders over $200</span>
        </div>

        {/* Main Bar */}
        <div className="flex items-center justify-between h-14 px-4">
          <ActiveLink to="/" className="flex items-center">
            <span className="font-serif text-xl font-semibold text-foreground">
              LuxDrape
            </span>
          </ActiveLink>
          <div className="flex items-center gap-2">
            <CartIcon />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-accent h-9 w-9">
                  <MenuIcon className="h-5 w-5 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[380px] bg-background p-0 overflow-y-auto">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <span className="font-serif text-xl font-semibold text-foreground">Menu</span>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="hover:bg-accent h-9 w-9">
                        <XIcon className="h-5 w-5 text-foreground" />
                      </Button>
                    </SheetClose>
                  </div>

                  {/* Search */}
                  <div className="p-4 border-b border-border">
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="w-full pl-9 h-10"
                      />
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex-1 py-2 overflow-y-auto">
                    {/* Curtains Section */}
                    <div className="border-b border-border">
                      <button
                        onClick={() => setOpenSection(openSection === 'curtains' ? null : 'curtains')}
                        className="w-full flex items-center justify-between px-4 py-3 text-left"
                      >
                        <span className="font-semibold text-foreground">Curtains</span>
                        <ChevronDownIcon
                          className={`h-5 w-5 text-muted-foreground transition-transform ${
                            openSection === 'curtains' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openSection === 'curtains' && (
                        <div className="pb-4 px-4">
                          <p className="text-xs text-muted-foreground mb-3">Shop by Fabric</p>
                          <div className="grid grid-cols-2 gap-3">
                            {curtainsMenu.categories.map((cat) => (
                              <SheetClose key={cat.title} asChild>
                                <ActiveLink
                                  to={cat.href}
                                  className="group"
                                >
                                  <div className="aspect-[4/3] overflow-hidden bg-muted mb-2">
                                    <Image
                                      src={cat.image}
                                      alt={cat.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <p className="font-medium text-sm">{cat.title}</p>
                                  <p className="text-xs text-muted-foreground">{cat.description}</p>
                                </ActiveLink>
                              </SheetClose>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Shades Section */}
                    <div className="border-b border-border">
                      <button
                        onClick={() => setOpenSection(openSection === 'shades' ? null : 'shades')}
                        className="w-full flex items-center justify-between px-4 py-3 text-left"
                      >
                        <span className="font-semibold text-foreground">Shades</span>
                        <ChevronDownIcon
                          className={`h-5 w-5 text-muted-foreground transition-transform ${
                            openSection === 'shades' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openSection === 'shades' && (
                        <div className="pb-4 px-4">
                          <p className="text-xs text-muted-foreground mb-3">Shop by Material</p>
                          <div className="grid grid-cols-2 gap-3">
                            {shadesMenu.categories.map((cat) => (
                              <SheetClose key={cat.title} asChild>
                                <ActiveLink
                                  to={cat.href}
                                  className="group relative"
                                >
                                  <div className="aspect-[4/3] overflow-hidden bg-muted mb-2">
                                    <Image
                                      src={cat.image}
                                      alt={cat.title}
                                      className="w-full h-full object-cover"
                                    />
                                    {cat.badge && (
                                      <div className="absolute top-2 left-2 bg-[hsl(180_25%_35%)] text-white text-[10px] font-semibold px-1.5 py-0.5">
                                        {cat.badge}
                                      </div>
                                    )}
                                  </div>
                                  <p className="font-medium text-sm">{cat.title}</p>
                                  <p className="text-xs text-muted-foreground">{cat.description}</p>
                                </ActiveLink>
                              </SheetClose>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Other Links */}
                    <SheetClose asChild>
                      <ActiveLink
                        to="/shop?category=motorized"
                        className="flex items-center gap-3 py-3 px-4 border-b border-border text-[hsl(180_25%_35%)]"
                      >
                        <ZapIcon className="h-5 w-5" />
                        <span className="font-medium">Motorization</span>
                      </ActiveLink>
                    </SheetClose>
                    <SheetClose asChild>
                      <ActiveLink
                        to="/products/prod-2/hardware"
                        className="flex items-center gap-3 py-3 px-4 border-b border-border"
                      >
                        <WrenchIcon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Hardware</span>
                      </ActiveLink>
                    </SheetClose>
                    <SheetClose asChild>
                      <ActiveLink
                        to="/products/prod-2/swatches"
                        className="flex items-center gap-3 py-3 px-4 border-b border-border"
                      >
                        <SwatchBookIcon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Swatches</span>
                      </ActiveLink>
                    </SheetClose>
                    <SheetClose asChild>
                      <ActiveLink
                        to="/inspiration"
                        className="flex items-center gap-3 py-3 px-4 border-b border-border"
                      >
                        <AwardIcon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Inspiration</span>
                      </ActiveLink>
                    </SheetClose>
                    <SheetClose asChild>
                      <ActiveLink
                        to="/trade-program"
                        className="flex items-center gap-3 py-3 px-4 border-b border-border"
                      >
                        <BriefcaseIcon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">For Business</span>
                      </ActiveLink>
                    </SheetClose>
                    <SheetClose asChild>
                      <ActiveLink
                        to="/guides"
                        className="flex items-center gap-3 py-3 px-4 border-b border-border"
                      >
                        <GraduationCapIcon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">How To</span>
                      </ActiveLink>
                    </SheetClose>
                  </div>

                  {/* Footer */}
                  <div className="p-4 border-t border-border">
                    <SheetClose asChild>
                      <ActiveLink
                        to="/cart"
                        className="flex items-center justify-between w-full px-4 py-3 bg-[hsl(220_15%_35%)] text-white"
                      >
                        <span className="flex items-center gap-2">
                          <ShoppingBagIcon className="h-5 w-5" />
                          Shopping Cart
                        </span>
                        {cartCount > 0 && (
                          <span className="bg-white text-[hsl(220_15%_35%)] px-2.5 py-0.5 text-xs font-bold">
                            {cartCount}
                          </span>
                        )}
                      </ActiveLink>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <DesktopNavigation />
    </>
  );
};

// ============================================
// Main Layout
// ============================================

// ============================================
// Footer Component
// ============================================

const Footer = () => {
  const footerLinks = {
    shop: [
      { label: 'Curtains', href: '/shop?category=curtains' },
      { label: 'Shades', href: '/products/prod-2/shades' },
      { label: 'Motorization', href: '/shop?category=motorized' },
      { label: 'Hardware', href: '/products/prod-2/hardware' },
      { label: 'Swatches', href: '/products/prod-2/swatches' },
    ],
    support: [
      { label: 'How to Measure', href: '/guides/measure-curtains' },
      { label: 'Installation Guide', href: '/guides/installation' },
      { label: 'Fabric Care', href: '/guides/care' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Contact Us', href: '/contact' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'For Business', href: '/trade-program' },
      { label: 'Influencer Program', href: '/influencer' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
  };

  return (
    <footer className="bg-[hsl(220_15%_18%)] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="font-serif text-2xl font-semibold text-white tracking-tight">
                LuxDrape
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-sm">
              Custom window treatments crafted to perfection. We believe every window 
              deserves beautiful, handcrafted curtains made to your exact specifications.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-white/70">
                <MailIcon className="h-4 w-4 text-[hsl(220_20%_60%)]" />
                <span>support@luxdrape.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <PhoneIcon className="h-4 w-4 text-[hsl(220_20%_60%)]" />
                <span>1-800-LUX-DRAPE</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <ClockIcon className="h-4 w-4 text-[hsl(220_20%_60%)]" />
                <span>Mon-Fri: 9AM - 6PM EST</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-[hsl(220_20%_65%)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-[hsl(220_20%_65%)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-[hsl(220_20%_65%)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-white/50">
              © 2026 LuxDrape. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <UniversalLink
                to="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </UniversalLink>
              <UniversalLink
                to="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-5 w-5" />
              </UniversalLink>
              <UniversalLink
                to="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-5 w-5" />
              </UniversalLink>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm text-white/50">
              <Link to="/privacy" className="hover:text-white/70 transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white/70 transition-colors">Terms</Link>
              <Link to="/accessibility" className="hover:text-white/70 transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LayoutContent = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MobileNavigation />
      <main className="pt-0 lg:pt-0 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const Layout = () => {
  return (
    <CartProvider>
      <LayoutContent />
    </CartProvider>
  );
};

export default Layout;
