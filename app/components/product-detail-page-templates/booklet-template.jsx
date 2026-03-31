import {useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '~/components/ui/accordion';
import { Image } from '~/components/ui/image';
import {
  CheckIcon,
  RulerIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  TruckIcon,
  InfoIcon,
  Star,
  UserIcon,
  ShieldCheckIcon,
  DropletsIcon,
  RotateCcwIcon,
  BabyIcon,
  ShieldIcon,
  AwardIcon,
  ThumbsUpIcon,
  PaletteIcon,
  PackageIcon
} from 'lucide-react';

// ============================================
// Product Data - Fabric Swatches
// ============================================
const productData = {
  id: 'fabric-swatches',
  name: 'Free Fabric Swatch Samples',
  description: 'Order up to 10 fabric swatches to see and feel our premium materials in your own home before making a decision. Free shipping on all swatch orders.',
  basePrice: 0,
  rating: 4.9,
  reviewCount: 2847,
  features: [
    'Up to 10 free fabric samples',
    'See true colors in your lighting',
    'Feel the texture and weight',
    'Free shipping on all swatch orders',
    'Ships within 1-2 business days'
  ],
  images: [
    { id: '1', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda', alt: 'Fabric swatch samples collection' },
    { id: '2', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda', alt: 'Fabric texture close-up' },
    { id: '3', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda', alt: 'Color swatches comparison' },
    { id: '4', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda', alt: 'Swatch packaging' },
  ],
};

const reviewsData = [
  { id: '1', author: 'Jennifer M.', rating: 5, date: '2024-02-20', title: 'So helpful!', content: 'Being able to see the colors in my own lighting made all the difference. Saved me from ordering the wrong shade.', verified: true },
  { id: '2', author: 'David K.', rating: 5, date: '2024-02-18', title: 'Great quality samples', content: 'The swatches are generous size and really show the fabric texture. Fast shipping too.', verified: true },
  { id: '3', author: 'Sarah L.', rating: 5, date: '2024-02-15', title: 'Free and fast', content: 'Can\'t believe these are free! Ordered on Monday, arrived Wednesday. Excellent service.', verified: true },
  { id: '4', author: 'Michael R.', rating: 5, date: '2024-02-12', title: 'Premium kit worth it', content: 'Got the premium kit for the extra fabrics. The care guide was a nice bonus.', verified: true },
  { id: '5', author: 'Emma T.', rating: 5, date: '2024-02-10', title: 'Perfect for matching', content: 'Used the swatches to match my wall color perfectly. The linen natural was exactly what I needed.', verified: true },
  { id: '6', author: 'James P.', rating: 5, date: '2024-02-08', title: 'Highly recommend', content: 'Order these before you buy curtains. Colors on screen can be deceiving.', verified: true },
];

// ============================================
// Main Product Page Component - Fabric Swatches
// ============================================
const ProductDetailSwatchesPage = () => {
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const featureList = useMemo(() => productData.features, []);

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b border-gray-200">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-gray-900">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/shop')} className="hover:text-gray-900">Shop</button>
          <span>/</span>
          <span className="text-gray-900">Fabric Swatches</span>
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
                src={productData.images[currentImageIndex].url}
                alt={productData.images[currentImageIndex].alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white">FREE</span>
              </div>
              <button onClick={() => setCurrentImageIndex(prev => prev === 0 ? productData.images.length - 1 : prev - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                <ChevronLeftIcon className="w-5 h-5 text-slate-800" />
              </button>
              <button onClick={() => setCurrentImageIndex(prev => (prev + 1) % productData.images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                <ChevronRightIcon className="w-5 h-5 text-slate-800" />
              </button>
            </div>

            <div className="flex gap-2">
              {productData.images.map((img, idx) => (
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
                <span>Free shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                <span>Ships in 1-2 days</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Info + Variant Selection */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="space-y-3 pb-6 border-b border-gray-200">
              <span className="text-xs font-medium text-emerald-700 uppercase tracking-wide">Free Samples</span>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">Fabric Swatch Samples</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(productData.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-900">{productData.rating}</span>
                <span className="text-sm text-gray-500">({productData.reviewCount} reviews)</span>
              </div>
              <div className="flex items-baseline gap-2 pt-2">
                {productData.basePrice === 0 ? (
                  <span className="text-3xl font-semibold text-emerald-600">FREE</span>
                ) : (
                  <span className="text-3xl font-semibold text-gray-900">${productData.basePrice}</span>
                )}
                <span className="text-gray-500">per kit</span>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 space-y-4">
              <p className="text-sm text-gray-600">
                This booklet page is informational only. Swatch kit options and
                selection controls are intentionally hidden.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                {featureList.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 p-3 rounded-md">
                <TruckIcon className="w-4 h-4" />
                <span>FREE Shipping on all swatch orders</span>
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
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to know about our free fabric swatch program.</p>
          </div>

          <Accordion type="multiple" defaultValue={['how-it-works']} className="w-full space-y-4">

            {/* How It Works */}
            <AccordionItem value="how-it-works" className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                    <PaletteIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">How It Works</span>
                    <p className="text-sm text-gray-500 font-normal">Simple steps to get your free fabric samples</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-5 bg-gray-50 rounded-md text-center">
                    <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">Select Fabrics</h4>
                    <p className="text-sm text-gray-600">Choose up to 10 fabric samples from our collection</p>
                  </div>
                  <div className="p-5 bg-gray-50 rounded-md text-center">
                    <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold">2</span>
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">Order Free</h4>
                    <p className="text-sm text-gray-600">Basic kit is free. Premium kit includes extra fabrics.</p>
                  </div>
                  <div className="p-5 bg-gray-50 rounded-md text-center">
                    <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-bold">3</span>
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">Ships Fast</h4>
                    <p className="text-sm text-gray-600">Receive your swatches in 1-2 business days</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* What's Included */}
            <AccordionItem value="included" className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                    <PackageIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">What's Included</span>
                    <p className="text-sm text-gray-500 font-normal">Details about your swatch samples</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Basic Swatch Kit</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Up to 6 fabric samples (4" x 4" each)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Core collection fabrics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Free shipping</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Premium Swatch Kit (+$15)</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Up to 10 fabric samples (4" x 4" each)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Includes premium & exclusive fabrics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Fabric care guide included</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Free shipping</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Shipping & Returns */}
            <AccordionItem value="shipping" className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                    <TruckIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">Shipping & Returns</span>
                    <p className="text-sm text-gray-500 font-normal">Fast delivery and easy returns</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-5 bg-gray-50 rounded-md">
                    <h4 className="font-semibold text-slate-900 mb-3">Shipping</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>鈥?Free standard shipping on all swatch orders</li>
                      <li>鈥?Ships within 1-2 business days</li>
                      <li>鈥?Delivery: 3-5 business days</li>
                      <li>鈥?Tracked shipping included</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-gray-50 rounded-md">
                    <h4 className="font-semibold text-slate-900 mb-3">Returns</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>鈥?Swatches are yours to keep</li>
                      <li>鈥?No returns necessary</li>
                      <li>鈥?Use code from swatch order for discount</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>

          {/* Reviews Section */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-2xl font-semibold text-slate-900">Customer Reviews</h3>
              <span className="text-gray-500">({productData.reviewCount})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-6 text-center rounded-md">
                <div className="text-5xl font-semibold text-slate-900">{productData.rating}</div>
                <div className="flex justify-center gap-1 my-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(productData.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <div className="text-sm text-gray-500">Based on {productData.reviewCount} verified reviews</div>
              </div>
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviewsData.map((review) => (
                  <div key={review.id} className="bg-white p-5 rounded-md border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{review.author}</div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />)}
                        </div>
                      </div>
                      {review.verified && <span className="ml-auto text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Verified</span>}
                    </div>
                    <h4 className="font-medium text-slate-900 mb-1">{review.title}</h4>
                    <p className="text-gray-600 text-sm line-clamp-3">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ProductDetailSwatchesPage;


