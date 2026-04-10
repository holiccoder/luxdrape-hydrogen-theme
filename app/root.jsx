import {Analytics, getShopAnalytics, useNonce} from '@shopify/hydrogen';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  Link,
} from 'react-router';
import favicon from '~/assets/favicon.svg';
import {FOOTER_QUERY, HEADER_QUERY} from '~/lib/fragments';
import appStyles from '~/styles/app.css?url';
import {PageLayout} from './components/PageLayout';
import {Button} from './components/ui/button';
import {Badge} from './components/ui/badge';

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 * @type {ShouldRevalidateFunction}
 */
export const shouldRevalidate = ({formMethod, currentUrl, nextUrl}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') return true;

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) return true;

  // Defaulting to no revalidation for root loader data to improve performance.
  // When using this feature, you risk your UI getting out of sync with your server.
  // Use with caution. If you are uncomfortable with this optimization, update the
  // line below to `return defaultShouldRevalidate` instead.
  // For more details see: https://remix.run/docs/en/main/route/should-revalidate
  return false;
};

/**
 * The main stylesheet is added in the Layout component
 * to prevent a bug in development HMR updates.
 *
 * This avoids the "failed to execute 'insertBefore' on 'Node'" error
 * that occurs after editing and navigating to another page.
 *
 * It's a temporary fix until the issue is resolved.
 * https://github.com/remix-run/remix/issues/9242
 */
export function links() {
  return [
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
}

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  const {storefront, env} = args.context;

  return {
    ...deferredData,
    ...criticalData,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      // localize the privacy banner
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language,
    },
  };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context}) {
  const {storefront, cart} = context;

  const [header, cartData] = await Promise.all([
    storefront.query(HEADER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        headerMenuHandle: 'main-menu', // Adjust to your header menu handle
      },
    }),
    cart.get(),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {header, cart: cartData};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({context}) {
  const {storefront, customerAccount} = context;

  // defer the footer query (below the fold)
  const footer = storefront
    .query(FOOTER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        footerMenuHandle: 'footer', // Adjust to your footer menu handle
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });
  return {
    isLoggedIn: customerAccount.isLoggedIn(),
    footer,
  };
}

/**
 * @param {{children?: React.ReactNode}}
 */
export function Layout({children}) {
  const nonce = useNonce();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href={appStyles}></link>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  /** @type {RootLoader} */
  const data = useRouteLoaderData('root');

  if (!data) {
    return <Outlet />;
  }

  return (
    <Analytics.Provider
      cart={data.cart}
      shop={data.shop}
      consent={data.consent}
    >
      <PageLayout {...data}>
        <Outlet />
      </PageLayout>
    </Analytics.Provider>
  );
}

export function ErrorBoundary() {
  /** @type {RootLoader | undefined} */
  const data = useRouteLoaderData('root');
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  const content =
    errorStatus === 404 ? (
      <NotFoundPage />
    ) : (
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl rounded-2xl bg-background border border-border p-8 md:p-10 shadow-sm">
            <Badge className="mb-4 bg-[hsl(220_25%_25%)] text-white border-0 hover:bg-[hsl(220_25%_25%)]">
              Error
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Something went wrong
            </h1>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We hit an unexpected error while loading this page.
            </p>
            {errorMessage ? (
              <pre className="overflow-x-auto rounded-xl bg-muted p-4 text-sm text-muted-foreground mb-6">
                {errorMessage}
              </pre>
            ) : null}
            <Button asChild size="lg" className="bg-[hsl(220_25%_25%)] text-white hover:bg-[hsl(220_25%_20%)]">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </section>
    );

  if (!data) {
    return content;
  }

  return (
    <PageLayout {...data}>
      {content}
    </PageLayout>
  );
}

function NotFoundPage() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_420px] items-center">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-[hsl(220_25%_25%)] text-white border-0 hover:bg-[hsl(220_25%_25%)]">
              404
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4">
              This page was not found
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              The link may be outdated, the page may have moved, or the URL may be
              incorrect. Start from one of the main collection paths below.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button asChild size="lg" className="bg-[hsl(220_25%_25%)] text-white hover:bg-[hsl(220_25%_20%)]">
                <Link to="/">Back to Home</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-[hsl(220_25%_25%)] bg-transparent text-[hsl(220_25%_25%)] hover:bg-[hsl(220_25%_25%)] hover:text-white">
                <Link to="/collections">Browse Collections</Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                to="/collections"
                className="rounded-2xl border border-border bg-background p-5 transition-colors hover:border-[hsl(220_25%_25%)]"
              >
                <div className="text-sm text-muted-foreground mb-2">Explore</div>
                <div className="font-medium text-foreground">Collections</div>
              </Link>
              <Link
                to="/collections/all"
                className="rounded-2xl border border-border bg-background p-5 transition-colors hover:border-[hsl(220_25%_25%)]"
              >
                <div className="text-sm text-muted-foreground mb-2">View all</div>
                <div className="font-medium text-foreground">Products</div>
              </Link>
              <Link
                to="/buying-guide"
                className="rounded-2xl border border-border bg-background p-5 transition-colors hover:border-[hsl(220_25%_25%)]"
              >
                <div className="text-sm text-muted-foreground mb-2">Need help</div>
                <div className="font-medium text-foreground">Buying Guide</div>
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] overflow-hidden bg-[hsl(220_25%_25%)] text-white p-8 md:p-10 shadow-sm">
            <div className="text-[5rem] md:text-[7rem] font-serif leading-none mb-4">
              404
            </div>
            <p className="text-white/80 leading-relaxed mb-8">
              Keep browsing custom drapery, shades, and fabric booklets from the
              main storefront sections.
            </p>
            <div className="space-y-3">
              <div className="rounded-xl bg-white/10 px-4 py-3">Custom curtains and drapes</div>
              <div className="rounded-xl bg-white/10 px-4 py-3">Room and fabric collections</div>
              <div className="rounded-xl bg-white/10 px-4 py-3">Swatches and fabric booklets</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** @typedef {LoaderReturnData} RootLoader */

/** @typedef {import('react-router').ShouldRevalidateFunction} ShouldRevalidateFunction */
/** @typedef {import('./+types/root').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
