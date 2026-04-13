import {useEffect, useMemo, useState} from 'react';
import {
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useOptimisticVariant,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {useNavigate} from 'react-router-dom';
import {ProductForm} from '~/components/ProductForm';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TruckIcon,
  ShieldCheckIcon,
} from 'lucide-react';

function normalizeImage(image, fallbackAlt = '') {
  const url = image?.url || image?.previewImage?.url || '';

  if (!url) return null;

  return {
    id: image?.id || url,
    url,
    altText: image?.altText || image?.alt || fallbackAlt,
    width: image?.width,
    height: image?.height,
  };
}

/**
 * Collect every image we can find on the product object.
 * Priority: product.images.nodes → featuredImage → variant.image.
 */
function collectImages(product, selectedVariant) {
  const fallbackAlt = product?.title || '';
  const rawImages = [
    ...(Array.isArray(product?.images?.nodes) ? product.images.nodes : []),
    product?.featuredImage,
    selectedVariant?.image,
    product?.selectedOrFirstAvailableVariant?.image,
  ];

  const seen = new Set();

  return rawImages
    .map((image) => normalizeImage(image, fallbackAlt))
    .filter((image) => {
      if (!image?.url || seen.has(image.url)) return false;
      seen.add(image.url);
      return true;
    });
}

/**
 * Standard product detail page for products without custom configurator options.
 * Uses the default Hydrogen add-to-cart flow (CartForm) so checkout goes through
 * the normal Shopify checkout — no draft-order workaround needed.
 */
const StandardProductTemplate = ({product}) => {
  const navigate = useNavigate();

  // ---------- variant handling ----------
  const selectedVariant = useOptimisticVariant(
    product?.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  }) || [];

  // ---------- derived data ----------
  const productTitle = product?.title ?? '';
  const productDescription = product?.descriptionHtml ?? '';
  const price = selectedVariant?.price;
  const compareAtPrice = selectedVariant?.compareAtPrice;

  // ---------- images ----------
  const images = useMemo(
    () => collectImages(product, selectedVariant),
    [product, selectedVariant],
  );
  const imageSignature = useMemo(
    () => images.map((image) => image.url).join('|'),
    [images],
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const safeIndex = images.length > 0 ? currentImageIndex % images.length : 0;
  const currentImage = images[safeIndex];

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [imageSignature]);

  const prevImage = () =>
    setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () =>
    setCurrentImageIndex((i) => (i + 1) % images.length);

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b border-gray-200">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-gray-900">
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate('/collections/all')}
            className="hover:text-gray-900"
          >
            Shop
          </button>
          <span>/</span>
          <span className="text-gray-900">{productTitle}</span>
        </nav>
      </div>

      {/* Main product section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT — Images */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            {/* Main image */}
            {currentImage?.url ? (
              <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden rounded-lg">
                <img
                  key={currentImage.id || currentImage.url}
                  src={currentImage.url}
                  alt={currentImage.altText || productTitle}
                  width={currentImage.width || undefined}
                  height={currentImage.height || undefined}
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors rounded-full"
                    >
                      <ChevronLeftIcon className="w-5 h-5 text-slate-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors rounded-full"
                    >
                      <ChevronRightIcon className="w-5 h-5 text-slate-800" />
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="aspect-[4/5] bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                No image available
              </div>
            )}

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={img.id || img.url || idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-16 h-16 shrink-0 overflow-hidden rounded border-2 transition-all ${
                      safeIndex === idx
                        ? 'border-slate-800'
                        : 'border-gray-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.altText || productTitle}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quick info */}
            <div className="hidden lg:flex items-center gap-4 pt-4 text-sm text-gray-600 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <TruckIcon className="w-4 h-4 text-emerald-600" />
                <span>Free shipping over $200</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                <span>Quality guaranteed</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Product info & Add to Cart */}
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-3 pb-6 border-b border-gray-200">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                {productTitle}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2">
                {price && (
                  <span className="text-3xl font-semibold text-gray-900">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: price.currencyCode,
                    }).format(Number(price.amount))}
                  </span>
                )}
                {compareAtPrice &&
                  Number(compareAtPrice.amount) > Number(price?.amount) && (
                    <span className="text-lg text-gray-400 line-through">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: compareAtPrice.currencyCode,
                      }).format(Number(compareAtPrice.amount))}
                    </span>
                  )}
              </div>
            </div>

            {/* Variant options (shown via ProductForm) + Add to Cart */}
            <div className="pt-2">
              <ProductForm
                productOptions={productOptions}
                selectedVariant={selectedVariant}
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-emerald-700">
              <TruckIcon className="w-4 h-4" />
              <span>FREE Shipping on orders over $200</span>
            </div>

            {/* Description */}
            {productDescription && (
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <div
                  className="prose prose-sm max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{__html: productDescription}}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StandardProductTemplate;

