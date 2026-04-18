import {useLoaderData} from 'react-router';
import {getSelectedProductOptions} from '@shopify/hydrogen';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import DefaultProductTemplate from '~/components/product-detail-page-templates/default';
import ShadesTemplate from '~/components/product-detail-page-templates/shades-template';
import HardwareTemplate from '~/components/product-detail-page-templates/hardware-template';
import BookletTemplate from '~/components/product-detail-page-templates/booklet-template';
import SwatchTemplate from '~/components/product-detail-page-templates/swatch-template';
import StandardTemplate from '~/components/product-detail-page-templates/standard-template';
import {productOptionsIndex} from '~/data/product-options/index.js';
import bambooProductOptions from '~/data/product-options/bamboo/bamboo.json';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  return [
    {title: `Hydrogen | ${data?.product.title ?? ''}`},
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const criticalData = await loadCriticalData(args);
  const deferredData = await loadDeferredData(args);
  return {...criticalData, ...deferredData};
}

/**
 * Load data necessary for rendering content above the fold.
 */
async function loadCriticalData({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle, data: product});

  const productHandle = product?.handle?.toLowerCase() || handle.toLowerCase();
  const isWovenWoodShadesProduct = product?.collections?.nodes?.some(
    (collection) => collection?.handle?.toLowerCase() === 'woven-wood-shades',
  );
  const productOptions = isWovenWoodShadesProduct
    ? bambooProductOptions
    : productOptionsIndex[productHandle] || null;

  return {
    product,
    productOptions,
  };
}

/**
 * Fetch the Judge.me review widget HTML for a given product.
 * Uses the widget API: GET /api/v1/widgets/product_review?handle=...
 * Returns { widget, rating, reviewCount } or null on failure.
 */
async function fetchJudgeMeReviews({shopDomain, apiToken, productHandle}) {
  if (!shopDomain || !apiToken || !productHandle) {
    return null;
  }

  try {
    const url = new URL('https://judge.me/api/v1/widgets/product_review');
    url.searchParams.set('api_token', apiToken);
    url.searchParams.set('shop_domain', shopDomain);
    url.searchParams.set('handle', productHandle);

    const response = await fetch(url.toString(), {
      headers: {'Accept': 'application/json'},
    });

    if (!response.ok) return null;

    const data = await response.json();
    const widgetHtml = data?.widget || '';

    // Extract rating and review count from widget data attributes
    const ratingMatch = widgetHtml.match(/data-average-rating='([^']+)'/);
    const countMatch = widgetHtml.match(/data-number-of-reviews='([^']+)'/);

    const rating = ratingMatch ? parseFloat(ratingMatch[1]) : null;
    const reviewCount = countMatch ? parseInt(countMatch[1], 10) : 0;

    // If no reviews for this product, try to fetch shop-wide reviews as fallback
    if (reviewCount === 0) {
      const shopUrl = new URL('https://judge.me/api/v1/widgets/product_review');
      shopUrl.searchParams.set('api_token', apiToken);
      shopUrl.searchParams.set('shop_domain', shopDomain);
      shopUrl.searchParams.set('handle', 'judgeme-shop-reviews');

      const shopRes = await fetch(shopUrl.toString(), {
        headers: {'Accept': 'application/json'},
      });

      if (shopRes.ok) {
        const shopData = await shopRes.json();
        const shopWidget = shopData?.widget || '';
        const shopRatingMatch = shopWidget.match(/data-average-rating='([^']+)'/);
        const shopCountMatch = shopWidget.match(/data-number-of-reviews='([^']+)'/);
        const shopRating = shopRatingMatch ? parseFloat(shopRatingMatch[1]) : null;
        const shopCount = shopCountMatch ? parseInt(shopCountMatch[1], 10) : 0;

        if (shopCount > 0) {
          return {
            widget: shopWidget,
            rating: shopRating,
            reviewCount: shopCount,
          };
        }
      }
    }

    return {
      widget: widgetHtml,
      rating,
      reviewCount,
    };
  } catch (e) {
    console.error('Failed to fetch Judge.me widget:', e);
    return null;
  }
}

/**
 * Load data for rendering content below the fold.
 * Judge.me reviews are loaded server-side using the private API token.
 */
async function loadDeferredData({context, params}) {
  const {env} = context;
  const shopDomain = env?.PUBLIC_STORE_DOMAIN || 'zi3ym0-dh.myshopify.com';
  const apiToken = env?.JUDGEME_PRIVATE_API_TOKEN || env?.JUDGEME_PUBLIC_API_TOKEN || 'wQUmG8upJwxt78yRQmtVGpGC7ik';
  const handle = params?.handle || '';

  console.log('[Judge.me] shopDomain:', shopDomain, 'hasToken:', !!apiToken, 'handle:', handle, 'envKeys:', Object.keys(env || {}).filter(k => k.includes('JUDGE')));

  const judgeMeReviews = apiToken
    ? await fetchJudgeMeReviews({shopDomain, apiToken, productHandle: handle})
    : null;

  console.log('[Judge.me] result:', judgeMeReviews ? `widget=${judgeMeReviews.widget?.length}chars` : 'null');

  return {
    judgeMeReviews,
  };
}

export default function Product() {
  /** @type {LoaderReturnData} */
  const {product, productOptions, judgeMeReviews} = useLoaderData();
  const productHandle = product?.handle?.toLowerCase() || '';
  const isWovenWoodShadesProduct = product?.collections?.nodes?.some(
    (collection) => collection?.handle?.toLowerCase() === 'woven-wood-shades',
  );
  const isBookletProduct = product?.collections?.nodes?.some(
    (collection) => collection?.handle?.toLowerCase() === 'fabric-booklets',
  );
  const isHardwareProduct = product?.collections?.nodes?.some(
    (collection) => collection?.handle?.toLowerCase() === 'hardware',
  );

  // Products without custom configurator options use the standard template
  // so they go through the default Shopify add-to-cart / checkout flow.
  const hasCustomOptions = Boolean(productOptions);
  const shouldUseSwatchTemplate = isBookletProduct;
  const shouldUseBookletTemplate = false; // kept for reference
  const shouldUseShadesTemplate =
    hasCustomOptions &&
    (productHandle.includes('shade') || isWovenWoodShadesProduct);

  const ProductTemplate = shouldUseSwatchTemplate
    ? SwatchTemplate
    : shouldUseBookletTemplate
      ? BookletTemplate
      : shouldUseShadesTemplate
      ? ShadesTemplate
      : isHardwareProduct
        ? HardwareTemplate
        : !hasCustomOptions
          ? StandardTemplate
          : DefaultProductTemplate;

  return (
    <ProductTemplate
      product={product}
      productOptionsData={productOptions}
      judgeMeReviews={judgeMeReviews}
    />
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    images(first: 10) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
    collections(first: 20) {
      nodes {
        handle
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    variants(first: 100) {
      nodes {
        ...ProductVariant
      }
    }
    metafields(identifiers: [
      {namespace: "specifications", key: "materials"},
      {namespace: "specifications", key: "width_range"},
      {namespace: "specifications", key: "height_range"},
      {namespace: "specifications", key: "header_styles"},
      {namespace: "specifications", key: "lining_options"},
      {namespace: "specifications", key: "hardware"},
      {namespace: "specifications", key: "warranty"},
      {namespace: "specifications", key: "production_time"},
      {namespace: "specifications", key: "shipping"},
      {namespace: "specifications", key: "returns"},
      {namespace: "reviews", key: "rating"},
      {namespace: "reviews", key: "rating_count"}
    ]) {
      namespace
      key
      value
    }
    hydrogenGallery: metafield(namespace: "custom", key: "hydrogen_gallery") {
      reference {
        ... on Metaobject {
          fields {
            key
            type
            value
            references(first: 20) {
              nodes {
                ... on MediaImage {
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

/** @typedef {import('./+types/products.$handle').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
