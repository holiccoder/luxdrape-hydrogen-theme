import {useLoaderData} from 'react-router';
import {getSelectedProductOptions} from '@shopify/hydrogen';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import DefaultProductTemplate from '~/components/product-detail-page-templates/default';
import ShadesTemplate from '~/components/product-detail-page-templates/shades-template';
import HardwareTemplate from '~/components/product-detail-page-templates/hardware-template';
import BookletTemplate from '~/components/product-detail-page-templates/booklet-template';
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
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
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
    (collection) => collection?.handle === 'woven-wood-shades',
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
 * Load data for rendering content below the fold.
 */
function loadDeferredData() {
  return {};
}

export default function Product() {
  /** @type {LoaderReturnData} */
  const {product, productOptions} = useLoaderData();
  const productHandle = product?.handle?.toLowerCase() || '';
  const isBookletProduct = product?.collections?.nodes?.some(
    (collection) => collection?.handle?.toLowerCase() === 'fabric-booklets',
  );
  const isHardwareProduct = product?.collections?.nodes?.some(
    (collection) => collection?.handle?.toLowerCase() === 'hardware',
  );
  const ProductTemplate = isBookletProduct
    ? BookletTemplate
    : isHardwareProduct
      ? HardwareTemplate
      : productHandle.includes('shade')
        ? ShadesTemplate
        : DefaultProductTemplate;

  return (
    <ProductTemplate
      product={product}
      productOptionsData={productOptions}
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
