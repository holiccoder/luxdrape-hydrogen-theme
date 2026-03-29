import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Image } from '@/components/ui/image';
import { toast } from 'sonner';
import { useCart } from '@/contexts/cart-context';
import {
  CheckIcon,
  RulerIcon,
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
  RotateCcwIcon,
  BabyIcon,
  ShieldIcon,
  AwardIcon,
  ThumbsUpIcon,
  PaletteIcon,
  PackageIcon,
  SparklesIcon
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

// Swatch kit variants
const swatchVariants = [
  {
    id: 'basic',
    name: 'Basic Swatch Kit',
    price: 0,
    description: 'Choose up to 6 fabric samples from our core collection. Perfect for initial color matching.',
    maxSwatches: 6,
    icon: PackageIcon
  },
  {
    id: 'premium',
    name: 'Premium Swatch Kit',
    price: 15,
    description: 'Choose up to 10 samples including premium fabrics and exclusive colors. Includes fabric care guide.',
    maxSwatches: 10,
    icon: SparklesIcon
  },
];

// Available fabric colors for selection
const availableFabrics = [
  { id: 'linen-white', name: 'Linen White', type: 'Linen Blend', color: '#FAF9F6' },
  { id: 'linen-ivory', name: 'Linen Ivory', type: 'Linen Blend', color: '#F5F5DC' },
  { id: 'linen-natural', name: 'Natural Linen', type: 'Linen Blend', color: '#E8DCC4' },
  { id: 'cotton-white', name: 'Cotton White', type: 'Cotton Sateen', color: '#FFFFFF' },
  { id: 'cotton-cream', name: 'Cream', type: 'Cotton Sateen', color: '#FFFDD0' },
  { id: 'cotton-beige', name: 'Warm Beige', type: 'Cotton Sateen', color: '#D4C4A8' },
  { id: 'velvet-charcoal', name: 'Charcoal Velvet', type: 'Velvet', color: '#4A4A4A' },
  { id: 'velvet-navy', name: 'Navy Velvet', type: 'Velvet', color: '#1E3A5F' },
  { id: 'velvet-sage', name: 'Sage Velvet', type: 'Velvet', color: '#8FBC8F' },
  { id: 'velvet-blush', name: 'Blush Velvet', type: 'Velvet', color: '#F4C2C2' },
  { id: 'sheer-white', name: 'White Sheer', type: 'Sheer', color: '#F8F8FF' },
  { id: 'sheer-ivory', name: 'Ivory Sheer', type: 'Sheer', color: '#FFFFF0' },
  { id: 'blackout-white', name: 'Blackout White', type: 'Blackout', color: '#F5F5F5' },
  { id: 'blackout-gray', name: 'Blackout Gray', type: 'Blackout', color: '#808080' },
  { id: 'blackout-taupe', name: 'Blackout Taupe', type: 'Blackout', color: '#B8A99A' },
];

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
const ProductDetailSwatchesPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(swatchVariants[0]);
  const [selectedSwatches, setSelectedSwatches] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const totalPrice = useMemo(() => {
    return selectedVariant.price * quantity;
  }, [selectedVariant, quantity]);

  const handleSwatchToggle = (fabricId: string) => {
    setSelectedSwatches(prev => {
      if (prev.includes(fabricId)) {
        return prev.filter(id => id !== fabricId);
      }
      if (prev.length >= selectedVariant.maxSwatches) {
        toast.error(`You can select up to ${selectedVariant.maxSwatches} swatches for this kit`);
        return prev;
      }
      return [...prev, fabricId];
    });
  };

  const handleAddToCart = () => {
    if (selectedSwatches.length === 0) {
      toast.error('Please select at least one fabric swatch');
      return;
    }

    const cartItem = {
      id: `${productData.id}-${Date.now()}`,
      productId: productData.id,
      productName: `${selectedVariant.name} - ${selectedSwatches.length} Swatches`,
      fabric: selectedSwatches.join(', '),
      dimensions: { width: 0, height: 0, unit: 'inches' as const },
      lining: 'standard' as const,
      mounting: 'cordless' as const,
      quantity,
      unitPrice: totalPrice / quantity,
      image: productData.images[0].url,
    };
    addToCart(cartItem);
    toast.success(`Added ${selectedSwatches.length} swatches to cart!`);
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
                {totalPrice === 0 ? (
                  <span className="text-3xl font-semibold text-emerald-600">FREE</span>
                ) : (
                  <span className="text-3xl font-semibold text-gray-900">${totalPrice}</span>
                )}
                <span className="text-gray-500">per kit</span>
              </div>
            </div>

            {/* ============================================ */}
            {/* VARIANT SELECTION */}
            {/* ============================================ */}
            <div className="space-y-6">

              {/* 1. Swatch Kit Variant */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium text-gray-900">Select Swatch Kit</Label>
                  <span className="text-sm text-gray-500">{selectedVariant.maxSwatches} samples max</span>
                </div>
                <RadioGroup value={selectedVariant.id} onValueChange={(val) => {
                  const variant = swatchVariants.find(v => v.id === val);
                  if (variant) {
                    setSelectedVariant(variant);
                    setSelectedSwatches([]);
                  }
                }}>
                  <div className="space-y-3">
                    {swatchVariants.map((variant) => (
                      <div key={variant.id}>
                        <RadioGroupItem value={variant.id} id={variant.id} className="peer sr-only" />
                        <Label
                          htmlFor={variant.id}
                          className="flex items-start gap-4 p-4 border border-gray-200 rounded-md cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center shrink-0">
                            <variant.icon className="w-6 h-6 text-slate-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">{variant.name}</span>
                              <span className="font-semibold text-gray-900">
                                {variant.price === 0 ? 'FREE' : `$${variant.price}`}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{variant.description}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* 2. Fabric Selection */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium text-gray-900">Choose Your Fabrics</Label>
                  <span className={`text-sm ${selectedSwatches.length >= selectedVariant.maxSwatches ? 'text-emerald-600 font-medium' : 'text-gray-500'}`}>
                    {selectedSwatches.length} / {selectedVariant.maxSwatches} selected
                  </span>
                </div>

                {/* Fabric Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {availableFabrics.map((fabric) => {
                    const isSelected = selectedSwatches.includes(fabric.id);
                    const isDisabled = !isSelected && selectedSwatches.length >= selectedVariant.maxSwatches;

                    return (
                      <button
                        key={fabric.id}
                        onClick={() => !isDisabled && handleSwatchToggle(fabric.id)}
                        disabled={isDisabled}
                        className={`relative p-3 border rounded-md text-left transition-all ${
                          isSelected
                            ? 'border-slate-800 bg-gray-50'
                            : isDisabled
                              ? 'border-gray-200 opacity-50 cursor-not-allowed'
                              : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded border border-gray-200 shrink-0"
                            style={{ backgroundColor: fabric.color }}
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-sm text-gray-900 truncate">{fabric.name}</p>
                            <p className="text-xs text-gray-500">{fabric.type}</p>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <CheckIcon className="w-4 h-4 text-slate-800" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedSwatches.length === 0 && (
                  <p className="text-sm text-amber-600 flex items-center gap-2">
                    <InfoIcon className="w-4 h-4" />
                    Please select at least one fabric swatch
                  </p>
                )}
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
                  <p className="text-3xl font-semibold text-gray-900">
                    {totalPrice === 0 ? 'FREE' : `$${totalPrice}`}
                  </p>
                </div>
                <Button
                  size="lg"
                  className="h-14 px-8 bg-slate-800 hover:bg-slate-700 text-white text-lg"
                  onClick={handleAddToCart}
                  disabled={selectedSwatches.length === 0}
                >
                  Add to Cart
                </Button>
              </div>

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
                      <li>• Free standard shipping on all swatch orders</li>
                      <li>• Ships within 1-2 business days</li>
                      <li>• Delivery: 3-5 business days</li>
                      <li>• Tracked shipping included</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-gray-50 rounded-md">
                    <h4 className="font-semibold text-slate-900 mb-3">Returns</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Swatches are yours to keep</li>
                      <li>• No returns necessary</li>
                      <li>• Use code from swatch order for discount</li>
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
