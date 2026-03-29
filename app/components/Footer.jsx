import {Link} from 'react-router';

export function Footer({footer, header, publicStoreDomain}) {
  return (
    <footer className="border-t bg-muted/40">
      <div className="w-[95%] max-w-[1600px] mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">
              {header?.shop?.name || 'LuxDrape'}
            </h3>
            <p className="text-sm text-muted-foreground">
              Custom window treatments crafted with care for your home.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/shop" className="hover:text-foreground">
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=curtains"
                  className="hover:text-foreground"
                >
                  Curtains
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=shades"
                  className="hover:text-foreground"
                >
                  Shades
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Help</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/guides/measure" className="hover:text-foreground">
                  How to Measure
                </Link>
              </li>
              <li>
                <Link
                  to="/guides/installation"
                  className="hover:text-foreground"
                >
                  Installation
                </Link>
              </li>
              <li>
                <Link to="/pages/contact" className="hover:text-foreground">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/pages/brand-story" className="hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          © 2024 {header?.shop?.name || 'LuxDrape'}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
