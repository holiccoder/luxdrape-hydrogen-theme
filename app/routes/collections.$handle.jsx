import {redirect, useLoaderData} from 'react-router';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import DefaultCollectionPageTemplate from '~/components/collection-page-templates/default';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.collection.title ?? ''} Collection`}];
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
async function loadCriticalData({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection, metaobjects}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
    }),
  ]);

  // Extract metafields from the Storefront API response
  const collectionMetafields = collection?.metafields?.filter(Boolean) || [];

  console.log('=== COLLECTION METAFIELDS (Storefront API) ===');
  console.log('Collection handle:', handle);
  console.log('Metafields:', JSON.stringify(collectionMetafields, null, 2));
  console.log('===============================================');

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {
    collection,
    metaobjects: metaobjects?.nodes || [],
    collectionMetafields,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData() {
  return {};
}

export default function Collection() {
  /** @type {LoaderReturnData} */
  const {collection, metaobjects, collectionMetafields} = useLoaderData();

  return (
    <>
      <DefaultCollectionPageTemplate 
        collection={collection} 
        metaobjects={metaobjects}
        collectionMetafields={collectionMetafields}
      />
      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
  }
`;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      mobileBannerUrl: metafield(namespace: "custom", key: "mobile_banner_url") {
        value
      }
      image {
        id
        url
        altText
        width
        height
      }
      # Query specific metafields by namespace and key
      customTitle: metafield(namespace: "custom", key: "collection_title") {
        value
        type
      }
      customDescription: metafield(namespace: "custom", key: "collection_description") {
        value
        type
      }
      customImage: metafield(namespace: "custom", key: "collection_image") {
        value
        type
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
      # Fetch multiple metafields at once
      metafields(identifiers: [
        { namespace: "custom", key: "collection_title" }
        { namespace: "custom", key: "collection_description" }
        { namespace: "custom", key: "collection_image" }
        { namespace: "custom", key: "mobile_banner_url" }
        { namespace: "custom", key: "image_and_content_section" }
        { namespace: "custom", key: "hydrogen_collections_faq" }
        { namespace: "custom", key: "hydrogen_collections_samples_display" }
        { namespace: "custom", key: "features" }
      ]) {
        namespace
        key
        value
        type
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
          ... on Metaobject {
            handle
            type
            fields {
              key
              value
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
        references(first: 10) {
          nodes {
            ... on Metaobject {
              handle
              type
              fields {
                key
                value
                reference {
                  ... on MediaImage {
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
    metaobjects(type: "collection_info", first: 1) {
      nodes {
        handle
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

/** @typedef {import('./+types/collections.$handle').Route} Route */
/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
