import {useLoaderData} from 'react-router';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import AboutTemplate from '~/components/page-templates/About';
import InstallationGuideTemplate from '~/components/page-templates/installation-guide';
import ContactTemplate from '~/components/page-templates/contact';
import TradeProgramTemplate from '~/components/page-templates/TradeProgram.jsx';
import MeasurementSupportTemplate from '~/components/page-templates/MeasurementSupport.jsx';

const CUSTOM_PAGE_CONFIG = {
  'brand-story': {
    title: 'Brand Story',
    template: AboutTemplate,
  },
  'installation-guide': {
    title: 'Installation Guide',
    template: InstallationGuideTemplate,
  },
  contact: {
    title: 'Contact',
    template: ContactTemplate,
  },
  'trade-program': {
    title: 'Trade Program',
    template: TradeProgramTemplate,
  },
  'measurement-support': {
    title: 'Measurement Support',
    template: MeasurementSupportTemplate,
  },
  'measurment-support': {
    title: 'Measurement Support',
    template: MeasurementSupportTemplate,
  },
};

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.page.title ?? ''}`}];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context, request, params}) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const customPage = CUSTOM_PAGE_CONFIG[params.handle];

  if (customPage) {
    return {
      page: {
        id: `custom-page-${params.handle}`,
        handle: params.handle,
        title: customPage.title,
        body: '',
        seo: {
          title: customPage.title,
          description: '',
        },
      },
    };
  }

  const [{page}] = await Promise.all([
    context.storefront.query(PAGE_QUERY, {
      variables: {
        handle: params.handle,
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle: params.handle, data: page});

  return {
    page,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData() {
  return {};
}

export default function Page() {
  /** @type {LoaderReturnData} */
  const {page} = useLoaderData();
  const Template = CUSTOM_PAGE_CONFIG[page.handle]?.template;

  if (Template) {
    return <Template />;
  }

  return (
    <div className="page">
      <header>
        <h1>{page.title}</h1>
      </header>
      <main dangerouslySetInnerHTML={{__html: page.body}} />
    </div>
  );
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      handle
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;

/** @typedef {import('./+types/pages.$handle').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
