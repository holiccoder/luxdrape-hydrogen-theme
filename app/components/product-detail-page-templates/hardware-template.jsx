 import {useCallback, useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '~/components/ui/button';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Label } from '~/components/ui/label';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '~/components/ui/accordion';
import { Image } from '~/components/ui/image';
import { toast } from 'sonner';
import { useCart } from '~/contexts/cart-context';
import {
  CheckIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  TruckIcon,
  InfoIcon,
  MinusIcon,
  PlusIcon,
  Star,
  UserIcon,
  ShieldCheckIcon,
  DropletsIcon,
  WrenchIcon,
  PackageIcon,
  Ruler
} from 'lucide-react';
import {CustomerReviews} from '~/components/shared/CustomerReviews';

// ============================================
// Product Data - Curtain Hardware
// ============================================
const productData = {
  id: 'curtain-hardware',
  name: 'Premium Curtain Rods & Hardware',
  description: 'Complete your window treatment with our premium hardware collection. Heavy-duty rods, elegant finials, and all mounting hardware included.',
  basePrice: 49.99,
  rating: 4.7,
  reviewCount: 892,
  features: [
    'Heavy-duty steel construction',
    'Supports up to 30 lbs per bracket',
    'All mounting hardware included',
    'Adjustable length rods',
    '5-year warranty'
  ],
  images: [
    { id: '1', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda', alt: 'Brass curtain rod with decorative finials' },
    { id: '2', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda', alt: 'Matte black curtain rod set' },
    { id: '3', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda', alt: 'Hardware mounting bracket detail' },
    { id: '4', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda', alt: 'Curtain rings and hardware accessories' },
  ],
};

const reviewsData = [
  { id: '1', author: 'Thomas H.', rating: 5, date: '2024-02-20', title: 'Solid construction', content: 'The 1-inch rod easily supports my heavy velvet curtains. Mounting hardware was high quality too.', verified: true },
  { id: '2', author: 'Maria G.', rating: 5, date: '2024-02-17', title: 'Beautiful finish', content: 'The antique brass looks stunning in my dining room. Exactly as pictured.', verified: true },
  { id: '3', author: 'Chris P.', rating: 4, date: '2024-02-14', title: 'Great value', content: 'Good quality for the price. Installation was straightforward with the included instructions.', verified: true },
  { id: '4', author: 'Lisa R.', rating: 5, date: '2024-02-10', title: 'Perfect length', content: 'Love that these extend. Covered my 9-foot window with one rod.', verified: true },
  { id: '5', author: 'David K.', rating: 5, date: '2024-02-08', title: 'Heavy duty', content: 'Got the 1.25" for my extra wide living room window. No sagging at all.', verified: true },
  { id: '6', author: 'Amanda S.', rating: 5, date: '2024-02-05', title: 'Complete set', content: 'Everything you need is in the box. Rings, brackets, screws, and even wall anchors.', verified: true },
];

// ============================================
// Main Product Page Component - Curtain Hardware
// ============================================
const ProductDetailHardwarePage = ({product, judgeMeReviews}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const parseReviewRating = (value, fallback) => {
    if (!value) return fallback;
    try {
      const parsed = JSON.parse(value);
      const rating = Number(parsed?.value);
      if (Number.isFinite(rating)) return rating;
    } catch {
      // Ignore malformed review metafield values.
    }

    const rating = Number(value);
    return Number.isFinite(rating) ? rating : fallback;
  };

  const parseReviewCount = (value, fallback) => {
    if (value === null || value === undefined || value === '') return fallback;
    const count = Number(value);
    return Number.isFinite(count) ? count : fallback;
  };

  const getProductMetafieldValue = (namespace, key) =>
    product?.metafields?.find(
      (metafield) =>
        metafield?.namespace === namespace && metafield?.key === key,
    )?.value;

  const productTitle = product?.title || productData.name;
  const productRating = parseReviewRating(
    getProductMetafieldValue('reviews', 'rating'),
    productData.rating,
  );
  const productReviewCount = parseReviewCount(
    getProductMetafieldValue('reviews', 'rating_count'),
    productData.reviewCount,
  );
  const productDescription = product?.description || productData.description;
  const variants = useMemo(
    () => product?.variants?.nodes?.filter(Boolean) || [],
    [product?.variants?.nodes],
  );
  const productImages =
    product?.images?.nodes?.length > 0
      ? product.images.nodes.map((img, index) => ({
          id: img?.id || `shopify-image-${index}`,
          url: img?.url,
          alt: img?.altText || productTitle,
        }))
      : productData.images;

  const optionGroups = useMemo(
    () =>
      (product?.options || []).filter(
        (option) => option?.name && option.name.toLowerCase() !== 'title',
      ),
    [product?.options],
  );

  const colorOptionGroup = useMemo(
    () =>
      optionGroups.find((option) =>
        /(color|colour|finish)/i.test(option?.name || ''),
      ) || null,
    [optionGroups],
  );

  const sizeOptionGroups = useMemo(
    () => optionGroups.filter((option) => option?.name !== colorOptionGroup?.name),
    [colorOptionGroup?.name, optionGroups],
  );

  const variantToOptionMap = (variant) =>
    Object.fromEntries(
      (variant?.selectedOptions || []).map((option) => [option.name, option.value]),
    );

  const [selectedOptions, setSelectedOptions] = useState(() =>
    variantToOptionMap(product?.selectedOrFirstAvailableVariant),
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedOptions(variantToOptionMap(product?.selectedOrFirstAvailableVariant));
  }, [product?.id, product?.selectedOrFirstAvailableVariant]);

  useEffect(() => {
    if (currentImageIndex >= productImages.length) {
      setCurrentImageIndex(0);
    }
  }, [currentImageIndex, productImages.length]);

  const findMatchingVariant = useCallback(
    (optionsMap) =>
      variants.find((variant) =>
        optionGroups.every((option) => {
          const targetValue = optionsMap[option.name];
          if (!targetValue) return true;
          return (
            variant?.selectedOptions?.find(
              (selectedOption) => selectedOption.name === option.name,
            )?.value === targetValue
          );
        }),
      ) || null,
    [optionGroups, variants],
  );

  const selectedVariant = useMemo(
    () =>
      findMatchingVariant(selectedOptions) ||
      product?.selectedOrFirstAvailableVariant ||
      variants[0] ||
      null,
    [findMatchingVariant, product?.selectedOrFirstAvailableVariant, selectedOptions, variants],
  );

  const selectedVariantOptionMap = useMemo(
    () => variantToOptionMap(selectedVariant),
    [selectedVariant],
  );

  const resolveVariantForOptionValue = (optionName, optionValue) => {
    const requestedOptions = {
      ...selectedVariantOptionMap,
      [optionName]: optionValue,
    };

    return (
      findMatchingVariant(requestedOptions) ||
      variants.find(
        (variant) =>
          variant?.selectedOptions?.find(
            (selectedOption) => selectedOption.name === optionName,
          )?.value === optionValue,
      ) ||
      null
    );
  };

  const handleOptionChange = (optionName, optionValue) => {
    const nextVariant = resolveVariantForOptionValue(optionName, optionValue);
    if (!nextVariant) return;
    setSelectedOptions(variantToOptionMap(nextVariant));
  };

  const selectedColorValue = colorOptionGroup
    ? selectedVariantOptionMap[colorOptionGroup.name] || ''
    : '';
  const selectedSizeSummary = sizeOptionGroups
    .map((option) => {
      const value = selectedVariantOptionMap[option.name];
      return value ? `${option.name}: ${value}` : null;
    })
    .filter(Boolean)
    .join(' • ');
  const selectedOptionsSummary = optionGroups
    .map((option) => {
      const value = selectedVariantOptionMap[option.name];
      return value ? `${option.name}: ${value}` : null;
    })
    .filter(Boolean)
    .join(' • ');

  const displayImage =
    selectedVariant?.image?.url ||
    productImages[currentImageIndex]?.url ||
    productData.images[0].url;
  const displayImageAlt =
    selectedVariant?.image?.altText ||
    productImages[currentImageIndex]?.alt ||
    productTitle;
  const unitPrice = Number(selectedVariant?.price?.amount || productData.basePrice || 0);

  const totalPrice = useMemo(() => {
    return Number((unitPrice * quantity).toFixed(2));
  }, [quantity, unitPrice]);

  const handleAddToCart = () => {
    if (!selectedVariant?.id) {
      toast.error('Please select an available hardware option.');
      return;
    }

    const cartItem = {
      id: `${selectedVariant.id}-${Date.now()}`,
      productId: selectedVariant.id,
      productName: productTitle,
      fabric: selectedOptionsSummary || selectedVariant?.title || productTitle,
      dimensions: {width: 0, height: 0, unit: 'inches'},
      lining: 'standard',
      mounting: 'rod-pocket',
      quantity,
      unitPrice: totalPrice / quantity,
      image: displayImage,
    };
    addToCart(cartItem);
    toast.success('Added to cart!');
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b border-gray-200">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-gray-900">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/shop')} className="hover:text-gray-900">Shop</button>
          <span>/</span>
          <span className="text-gray-900">{productTitle}</span>
        </nav>
      </div>

      {/* ============================================ */}
      {/* Main Product Section */}
      {/* ============================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* LEFT: Sticky Product Images */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
              <Image
                src={displayImage}
                alt={displayImageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 text-xs font-medium bg-slate-800 text-white">Best Seller</span>
              </div>
              <button onClick={() => setCurrentImageIndex(prev => prev === 0 ? productImages.length - 1 : prev - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                <ChevronLeftIcon className="w-5 h-5 text-slate-800" />
              </button>
              <button onClick={() => setCurrentImageIndex(prev => (prev + 1) % productImages.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                <ChevronRightIcon className="w-5 h-5 text-slate-800" />
              </button>
            </div>

            <div className="flex gap-2">
              {productImages.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative w-16 h-16 overflow-hidden transition-all border-2 ${currentImageIndex === idx ? 'border-slate-800' : 'border-gray-200 opacity-60 hover:opacity-100'}`}
                >
                  <Image src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4 pt-4 text-sm text-gray-600 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <TruckIcon className="w-4 h-4 text-emerald-600" />
                <span>Free shipping over $200</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                <span>5-year warranty</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Info + Variant Selection */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="space-y-3 pb-6 border-b border-gray-200">
              <span className="text-xs font-medium text-slate-700 uppercase tracking-wide">Hardware</span>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">{productTitle}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(productRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-900">{productRating}</span>
                <span className="text-sm text-gray-500">({productReviewCount} reviews)</span>
              </div>
              <p className="text-gray-600">{productDescription}</p>
              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-3xl font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
                <span className="text-gray-500">per set</span>
              </div>
            </div>

            {/* ============================================ */}
            {/* VARIANT SELECTION */}
            {/* ============================================ */}
            <div className="space-y-6">

              {colorOptionGroup ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium text-gray-900">
                      {colorOptionGroup.name}
                    </Label>
                    <span className="text-sm text-gray-500">{selectedColorValue}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {colorOptionGroup.optionValues?.map((optionValue) => {
                      const swatchColor = optionValue?.swatch?.color || 'transparent';
                      const swatchImage =
                        optionValue?.swatch?.image?.previewImage?.url || null;
                      const candidateVariant = resolveVariantForOptionValue(
                        colorOptionGroup.name,
                        optionValue?.name,
                      );
                      const isSelected = selectedColorValue === optionValue?.name;
                      const isAvailable = Boolean(candidateVariant?.availableForSale);

                      return (
                        <button
                          key={optionValue?.name}
                          type="button"
                          onClick={() => handleOptionChange(colorOptionGroup.name, optionValue?.name)}
                          disabled={!candidateVariant || !isAvailable}
                          className={`relative flex items-center justify-center w-14 h-14 border-2 transition-all overflow-hidden ${
                            isSelected
                              ? 'border-slate-800 ring-1 ring-slate-800'
                              : 'border-gray-200 hover:border-gray-400'
                          } ${!isAvailable ? 'opacity-50' : ''}`}
                          style={{
                            backgroundColor: swatchImage ? 'transparent' : swatchColor,
                            backgroundImage: swatchImage ? `url(${swatchImage})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                          title={optionValue?.name}
                        >
                          {isSelected ? (
                            <CheckIcon
                              className={`absolute inset-0 m-auto w-5 h-5 ${
                                ['#FFFFFF', '#E8E8E8', '#C0C0C0', 'transparent'].includes(swatchColor)
                                  ? 'text-slate-800'
                                  : 'text-white'
                              }`}
                            />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {sizeOptionGroups.map((optionGroup, index) => {
                const selectedValue = selectedVariantOptionMap[optionGroup.name] || '';

                return (
                  <div
                    key={optionGroup.name}
                    className={index === 0 && !colorOptionGroup ? 'space-y-3' : 'space-y-3 pt-4 border-t border-gray-200'}
                  >
                    <Label className="text-base font-medium text-gray-900">
                      {optionGroup.name}
                    </Label>
                    <RadioGroup
                      value={selectedValue}
                      onValueChange={(value) => handleOptionChange(optionGroup.name, value)}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {optionGroup.optionValues?.map((optionValue) => {
                          const candidateVariant = resolveVariantForOptionValue(
                            optionGroup.name,
                            optionValue?.name,
                          );
                          const isAvailable = Boolean(candidateVariant?.availableForSale);
                          const candidatePrice = Number(
                            candidateVariant?.price?.amount || unitPrice,
                          );
                          const priceDifference = candidatePrice - unitPrice;

                          return (
                            <div key={`${optionGroup.name}-${optionValue?.name}`}>
                              <RadioGroupItem
                                value={optionValue?.name}
                                id={`${optionGroup.name}-${optionValue?.name}`}
                                className="peer sr-only"
                                disabled={!candidateVariant || !isAvailable}
                              />
                              <Label
                                htmlFor={`${optionGroup.name}-${optionValue?.name}`}
                                className={`flex flex-col p-4 border border-gray-200 rounded-md cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300 ${
                                  !candidateVariant || !isAvailable ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                              >
                                <span className="font-medium text-gray-900">
                                  {optionValue?.name}
                                </span>
                                <span className="text-sm font-medium text-gray-900 mt-2">
                                  {priceDifference > 0
                                    ? `+$${priceDifference.toFixed(2)}`
                                    : priceDifference < 0
                                      ? `-$${Math.abs(priceDifference).toFixed(2)}`
                                      : 'Base Price'}
                                </span>
                              </Label>
                            </div>
                          );
                        })}
                      </div>
                    </RadioGroup>
                  </div>
                );
              })}

              {/* What's Included */}
              <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                  <PackageIcon className="w-4 h-4" />
                  What&apos;s Included
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      Selected hardware configuration
                      {selectedSizeSummary ? ` (${selectedSizeSummary})` : ''}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Decorative finials (2 pieces)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Mounting brackets and installation hardware</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Curtain rings (14 pieces)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>All screws and wall anchors</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Add to Cart */}
            <div className="pt-6 border-t border-gray-200 space-y-4">
              {/* Quantity */}
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Quantity</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-md">
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-gray-900">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-md">
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Price & Button */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-3xl font-semibold text-gray-900">${totalPrice.toFixed(2)}</p>
                </div>
                <Button
                  size="lg"
                  className="h-14 px-8 bg-slate-800 hover:bg-slate-700 text-white text-lg"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 p-3 rounded-md">
                <TruckIcon className="w-4 h-4" />
                <span>FREE Shipping on orders over $200</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* Product Information */}
      {/* ============================================ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">Product Information</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to know about our premium curtain hardware.</p>
          </div>

          <Accordion type="multiple" defaultValue={['specs']} className="w-full space-y-4">

            {/* Specifications */}
            <AccordionItem value="specs" className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                    <Ruler className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">Technical Specifications</span>
                    <p className="text-sm text-gray-500 font-normal">Detailed specs and weight limits</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900">Materials</h4>
                    <div className="space-y-2 text-sm">
                      {[
                        { label: 'Rod Material', value: 'Steel with plated finish' },
                        { label: 'Finial Material', value: 'Resin with metallic coating' },
                        { label: 'Bracket Material', value: 'Steel with matching finish' },
                        { label: 'Rings', value: 'Metal with nylon liner' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-500">{item.label}</span>
                          <span className="font-medium text-slate-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900">Weight Capacity</h4>
                    <div className="space-y-2 text-sm">
                      {[
                        { label: '3/4" Rod', value: 'Up to 15 lbs' },
                        { label: '1" Rod', value: 'Up to 25 lbs' },
                        { label: '1-1/4" Rod', value: 'Up to 35 lbs' },
                        { label: 'Bracket Spacing', value: 'Every 36-48 inches' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-500">{item.label}</span>
                          <span className="font-medium text-slate-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Installation */}
            <AccordionItem value="installation" className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                    <WrenchIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">Installation Guide</span>
                    <p className="text-sm text-gray-500 font-normal">Easy DIY installation in minutes</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 bg-gray-50 rounded-md text-center">
                    <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold">1</span>
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">Mark Position</h4>
                    <p className="text-sm text-gray-600">Mark bracket positions 4-6 inches above window frame</p>
                  </div>
                  <div className="p-5 bg-gray-50 rounded-md text-center">
                    <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold">2</span>
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">Install Brackets</h4>
                    <p className="text-sm text-gray-600">Drill pilot holes and secure brackets with included screws</p>
                  </div>
                  <div className="p-5 bg-gray-50 rounded-md text-center">
                    <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold">3</span>
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">Hang Rod</h4>
                    <p className="text-sm text-gray-600">Slide rod through brackets and attach finials</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-sm text-amber-800">
                    <strong>Tip:</strong> For spans over 72 inches, use a center support bracket (included with 1&quot; and 1-1/4&quot; rods) to prevent sagging.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Care & Maintenance */}
            <AccordionItem value="care" className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                    <DropletsIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">Care & Maintenance</span>
                    <p className="text-sm text-gray-500 font-normal">Keep your hardware looking new</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Cleaning</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Dust regularly with a soft cloth</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Clean with damp cloth and mild soap</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Dry immediately to prevent water spots</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Avoid</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-start gap-2">
                        <InfoIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>Abrasive cleaners or scrubbers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <InfoIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>Harsh chemicals or ammonia</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <InfoIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>Excessive moisture on finish</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Warranty */}
            <AccordionItem value="warranty" className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                    <ShieldCheckIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">Warranty & Returns</span>
                    <p className="text-sm text-gray-500 font-normal">5-year limited warranty coverage</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-5 bg-gray-50 rounded-md">
                    <h4 className="font-semibold text-slate-900 mb-3">5-Year Limited Warranty</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>–Covers manufacturing defects</li>
                      <li>–Finish peeling or flaking</li>
                      <li>–Bracket or hardware failure</li>
                      <li>–Rod bending under rated weight</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-gray-50 rounded-md">
                    <h4 className="font-semibold text-slate-900 mb-3">30-Day Returns</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>–Unused items in original packaging</li>
                      <li>–Free return shipping</li>
                      <li>–Full refund or exchange</li>
                      <li>–Defective items replaced at no cost</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>

          {/* Reviews Section */}
          <CustomerReviews judgeMeReviews={judgeMeReviews} />

        </div>
      </section>
    </div>
  );
};

export default ProductDetailHardwarePage;


