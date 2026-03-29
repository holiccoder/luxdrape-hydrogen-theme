import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Image } from '@/components/ui/image';
import { toast } from 'sonner';
import { useCart } from '@/contexts/cart-context';
import {
  StarIcon,
  CheckIcon,
  RulerIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  TruckIcon,
  InfoIcon,
  MinusIcon,
  PlusIcon,
  PlayIcon,
  FileTextIcon,
  ThermometerIcon,
  DropletsIcon,
  RotateCcwIcon,
  ThumbsUpIcon,
  ShieldCheckIcon,
  AwardIcon,
  LeafIcon,
  Star,
  UserIcon,
  ZapIcon,
  BatteryIcon,
  WifiIcon,
  SmartphoneIcon,
  VolumeXIcon,
  BabyIcon,
  ShieldIcon,
  CalculatorIcon,
  WrenchIcon,
  ChevronDownIcon,
  HelpCircleIcon,
  ArrowRightIcon
} from 'lucide-react';

// ============================================
// Product Data
// ============================================
const productData = {
  id: 'lux-drapery-1',
  name: 'Custom Pinch Pleat Drapery',
  description: 'Handcrafted custom drapery made to your exact specifications. Premium fabrics with professional pleating for a tailored, luxury look.',
  basePrice: 199.99,
  category: 'Drapery',
  style: ['Classic', 'Elegant', 'Custom'],
  materials: ['Premium Linen Blend', 'Cotton Sateen', 'Velvet'],
  rating: 4.9,
  reviewCount: 428,
  features: [
    'Custom-made to your specifications',
    'Professional pleating options',
    'Multiple fabric choices',
    'Free fabric swatches',
    '3-year warranty included'
  ],
  colors: [
    { id: 'ivory', name: 'Ivory Linen', hex: '#F8F6F1', image: 'https://luxdrape.com/cdn/shop/files/florence_pleated_ivory_white.jpg?v=1771059728&width=768' },
    { id: 'oatmeal', name: 'Oatmeal', hex: '#E8E4DC', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/4404b45f35da473c8fc6f026d2c13f56_ve_miaoda' },
    { id: 'charcoal', name: 'Charcoal Gray', hex: '#4A4A4A', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/34013fff634f414ea6ff57ba2c97cf2b_ve_miaoda' },
    { id: 'navy', name: 'Navy Blue', hex: '#2C3E50', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/71c5a08726ba4857a88b02903542fc08_ve_miaoda' },
    { id: 'sage', name: 'Sage Green', hex: '#9CAF88', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda' },
    { id: 'blush', name: 'Blush Pink', hex: '#E8D5D0', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/e91d92a772ee4f6bb46cd960193349f7_ve_miaoda' },
  ],
  images: [
    { id: '1', url: 'https://luxdrape.com/cdn/shop/files/florence_pleated_ivory_white.jpg?v=1771059728&width=768', alt: 'Custom pinch pleat drapes in living room' },
    { id: '2', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda', alt: 'Pleat header styles comparison' },
    { id: '3', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/374fd1c04ee445b2a6f8e62b5b3933ea_ve_miaoda', alt: 'Premium fabric detail' },
    { id: '4', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/e91d92a772ee4f6bb46cd960193349f7_ve_miaoda', alt: 'Tie back styles' },
  ],
};

const headerStyles = [
  { id: 'pinch-pleat', name: 'Pinch Pleat', fullness: '200%', price: 0, description: 'Classic single-pinch design, elegant and timeless' },
  { id: 'triple-pleat', name: 'Triple Pleat', fullness: '250%', price: 35, description: 'Three-finger pinch for maximum fullness' },
  { id: 'tailor-pleat', name: 'Tailor Pleat', fullness: '180%', price: 25, description: 'Modern streamlined look' },
];

const liningOptions = [
  { id: 'unlined', name: 'Unlined', price: 0, description: 'Light and airy, shows fabric texture' },
  { id: 'standard', name: 'Standard Lining', price: 45, description: 'Privacy and light filtering' },
  { id: 'blackout', name: 'Blackout Lining', price: 75, description: 'Blocks 99% of light, thermal insulation' },
  { id: 'interlined', name: 'Interlined', price: 95, description: 'Adds body and luxury' },
];

const tieBackOptions = [
  { id: 'none', name: 'None', price: 0, description: 'Clean, straight hanging panels' },
  { id: 'matching', name: 'Matching Fabric', price: 29, description: 'Made from the same fabric' },
  { id: 'rope', name: 'Decorative Rope', price: 39, description: 'Braided rope with tassels' },
];

const reviewsData = [
  { id: '1', author: 'Sarah M.', rating: 5, date: '2024-02-20', title: 'Absolutely stunning!', content: 'The triple pleat drapes transformed my living room. The quality is exceptional.', verified: true },
  { id: '2', author: 'Michael R.', rating: 5, date: '2024-02-15', title: 'Worth every penny', content: 'Custom drapes that look like they came from a high-end design showroom.', verified: true },
  { id: '3', author: 'Jennifer L.', rating: 5, date: '2024-02-10', title: 'Perfect fit', content: 'Ordered swatches first which helped me choose the right color.', verified: true },
];

// ============================================
// Measurement Calculator
// ============================================
const MeasurementCalculator: React.FC<{ width: string; height: string; onWidthChange: (value: string) => void; onHeightChange: (value: string) => void }> = ({ width, height, onWidthChange, onHeightChange }) => {
  const [windowWidth, setWindowWidth] = useState('');
  const [windowHeight, setWindowHeight] = useState('');
  const [showResult, setShowResult] = useState(false);

  const calculateDimensions = () => {
    const w = parseFloat(windowWidth);
    const h = parseFloat(windowHeight);
    if (!w || !h) return;
    const totalWidth = w + 16;
    const panelWidth = totalWidth / 2;
    onWidthChange(panelWidth.toFixed(1));
    onHeightChange((h + 4).toFixed(1));
    setShowResult(true);
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 border border-gray-200">
      <p className="font-medium text-gray-900 mb-3">Window Size Calculator</p>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <Label className="text-xs text-gray-500">Window Width (in)</Label>
          <Input type="number" value={windowWidth} onChange={(e) => { setWindowWidth(e.target.value); setShowResult(false); }} placeholder="72" className="h-10 mt-1" />
        </div>
        <div>
          <Label className="text-xs text-gray-500">Window Height (in)</Label>
          <Input type="number" value={windowHeight} onChange={(e) => { setWindowHeight(e.target.value); setShowResult(false); }} placeholder="84" className="h-10 mt-1" />
        </div>
      </div>
      <Button onClick={calculateDimensions} size="sm" className="w-full bg-slate-800 hover:bg-slate-700" disabled={!windowWidth || !windowHeight}>
        Calculate
      </Button>
      {showResult && (
        <div className="mt-3 p-3 bg-white border border-gray-200 text-sm">
          <p className="text-gray-600">Recommended panel size:</p>
          <p className="font-medium text-gray-900">{width}&quot; W × {height}&quot; H</p>
        </div>
      )}
    </div>
  );
};

// ============================================
// Collapsible Section Component
// ============================================
const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 px-2 -mx-2 transition-colors">
        <span className="font-medium text-gray-900">{title}</span>
        <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
};

// ============================================
// Main Product Page Component - V6
// ============================================
const ProductDetailLuxV6Page: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedHeaderStyle, setSelectedHeaderStyle] = useState(headerStyles[0]);
  const [selectedLining, setSelectedLining] = useState(liningOptions[1]);
  const [selectedTieBack, setSelectedTieBack] = useState(tieBackOptions[0]);
  const [width, setWidth] = useState('50');
  const [height, setHeight] = useState('84');
  const [quantity, setQuantity] = useState(2);
  const [isSwatchDialogOpen, setIsSwatchDialogOpen] = useState(false);

  const totalPrice = useMemo(() => {
    const basePrice = productData.basePrice;
    const headerPrice = selectedHeaderStyle.price;
    const liningPrice = selectedLining.price;
    const tieBackPrice = selectedTieBack.price * quantity;
    
    const widthValue = parseFloat(width) || 50;
    const heightValue = parseFloat(height) || 84;
    const sizeMultiplier = (widthValue * heightValue) / (50 * 84);
    
    const unitPrice = (basePrice + headerPrice + liningPrice) * Math.max(sizeMultiplier, 0.7);
    return Math.round((unitPrice * quantity) + tieBackPrice);
  }, [selectedHeaderStyle, selectedLining, selectedTieBack, width, height, quantity]);

  const handleAddToCart = () => {
    const cartItem = {
      id: `${productData.id}-${Date.now()}`,
      productId: productData.id,
      productName: productData.name,
      fabric: selectedColor.name,
      dimensions: { width: parseFloat(width) || 50, height: parseFloat(height) || 84, unit: 'inches' as const },
      lining: selectedLining.id as 'standard' | 'blackout' | 'thermal',
      mounting: 'cordless' as const,
      quantity,
      unitPrice: totalPrice / quantity,
      image: selectedColor.image,
    };
    addToCart(cartItem);
    toast.success('Added to cart!');
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b border-gray-100">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-gray-900">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/shop')} className="hover:text-gray-900">Shop</button>
          <span>/</span>
          <span className="text-gray-900">Custom Pinch Pleat Drapery</span>
        </nav>
      </div>

      {/* ============================================ */}
      {/* Main Product Section - Two Column Layout */}
      {/* Left: Sticky Product Images, Right: All Customization Options */}
      {/* ============================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* LEFT: Sticky Product Images */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
              <Image 
                src={productData.images[currentImageIndex].url} 
                alt={productData.images[currentImageIndex].alt} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 text-xs font-medium bg-slate-800 text-white">Custom Made</span>
              </div>
              <button onClick={() => setCurrentImageIndex(prev => prev === 0 ? productData.images.length - 1 : prev - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                <ChevronLeftIcon className="w-5 h-5 text-slate-800" />
              </button>
              <button onClick={() => setCurrentImageIndex(prev => (prev + 1) % productData.images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                <ChevronRightIcon className="w-5 h-5 text-slate-800" />
              </button>
            </div>
            
            {/* Thumbnails */}
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

            {/* Quick Features */}
            <div className="hidden lg:flex items-center gap-4 pt-4 text-sm text-gray-600 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <TruckIcon className="w-4 h-4 text-emerald-600" />
                <span>Free shipping over $200</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                <span>3-year warranty</span>
              </div>
            </div>
          </div>

          {/* RIGHT: All Customization Options */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="space-y-3 pb-6 border-b border-gray-200">
              <span className="text-xs font-medium text-emerald-700 uppercase tracking-wide">Made to Order</span>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">Custom Pinch Pleat Drapery</h1>
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
                <span className="text-3xl font-semibold text-gray-900">${totalPrice}</span>
                <span className="text-gray-500">for {quantity} panels</span>
              </div>
            </div>

            {/* ============================================ */}
            {/* CUSTOMIZATION OPTIONS - ALL VISIBLE */}
            {/* ============================================ */}

            {/* 1. Color Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium text-gray-900">Fabric Color</Label>
                  <p className="text-sm text-gray-500">{selectedColor.name}</p>
                </div>
                <button onClick={() => setIsSwatchDialogOpen(true)} className="text-sm text-slate-700 underline">Free Swatches</button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {productData.colors.map((color) => (
                  <button 
                    key={color.id} 
                    onClick={() => setSelectedColor(color)} 
                    className={`relative aspect-square border-2 transition-all ${selectedColor.id === color.id ? 'border-slate-800 ring-1 ring-slate-800' : 'border-gray-200 hover:border-gray-400'}`} 
                    style={{ backgroundColor: color.hex }} 
                    title={color.name}
                  >
                    {selectedColor.id === color.id && (
                      <CheckIcon className={`absolute inset-0 m-auto w-4 h-4 ${['#F8F6F1', '#E8E4DC', '#E8D5D0'].includes(color.hex) ? 'text-slate-800' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* 2. Header Style */}
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium text-gray-900">Header Style</Label>
                <p className="text-sm text-gray-500">How your drapes attach to the rod</p>
              </div>
              <RadioGroup value={selectedHeaderStyle.id} onValueChange={(val) => { const style = headerStyles.find(s => s.id === val); if (style) setSelectedHeaderStyle(style); }}>
                <div className="space-y-2">
                  {headerStyles.map((style) => (
                    <div key={style.id}>
                      <RadioGroupItem value={style.id} id={style.id} className="peer sr-only" />
                      <Label htmlFor={style.id} className="flex items-center justify-between p-3 border border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300">
                        <div>
                          <span className="font-medium text-gray-900">{style.name}</span>
                          <p className="text-sm text-gray-500">{style.description}</p>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{style.price > 0 ? `+$${style.price}` : 'Included'}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* 3. Dimensions */}
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium text-gray-900">Panel Dimensions</Label>
                <p className="text-sm text-gray-500">Per panel (order 2 for a pair)</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">Width (inches)</Label>
                  <div className="relative mt-1">
                    <Input type="number" step="0.5" value={width} onChange={(e) => setWidth(e.target.value)} className="h-11 pr-10" placeholder="50" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">in</span>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Height (inches)</Label>
                  <div className="relative mt-1">
                    <Input type="number" step="0.5" value={height} onChange={(e) => setHeight(e.target.value)} className="h-11 pr-10" placeholder="84" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">in</span>
                  </div>
                </div>
              </div>
              <MeasurementCalculator width={width} height={height} onWidthChange={setWidth} onHeightChange={setHeight} />
              <div className="flex items-start gap-2 p-3 bg-blue-50 text-sm text-blue-800">
                <InfoIcon className="w-4 h-4 shrink-0 mt-0.5" />
                <span>For a pair of panels, order 2 panels. Each panel will be made to the dimensions above.</span>
              </div>
            </div>

            <Separator />

            {/* 4. Lining */}
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium text-gray-900">Lining Option</Label>
                <p className="text-sm text-gray-500">Affects light control and privacy</p>
              </div>
              <RadioGroup value={selectedLining.id} onValueChange={(val) => { const lining = liningOptions.find(l => l.id === val); if (lining) setSelectedLining(lining); }}>
                <div className="space-y-2">
                  {liningOptions.map((lining) => (
                    <div key={lining.id}>
                      <RadioGroupItem value={lining.id} id={`lining-${lining.id}`} className="peer sr-only" />
                      <Label htmlFor={`lining-${lining.id}`} className="flex items-center justify-between p-3 border border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300">
                        <div>
                          <span className="font-medium text-gray-900">{lining.name}</span>
                          <p className="text-sm text-gray-500">{lining.description}</p>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{lining.price > 0 ? `+$${lining.price}` : 'Included'}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* 5. Tie Backs */}
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium text-gray-900">Tie Backs (Optional)</Label>
                <p className="text-sm text-gray-500">Hold your drapes open during the day</p>
              </div>
              <RadioGroup value={selectedTieBack.id} onValueChange={(val) => { const tieBack = tieBackOptions.find(t => t.id === val); if (tieBack) setSelectedTieBack(tieBack); }}>
                <div className="space-y-2">
                  {tieBackOptions.map((tieBack) => (
                    <div key={tieBack.id}>
                      <RadioGroupItem value={tieBack.id} id={`tieback-${tieBack.id}`} className="peer sr-only" />
                      <Label htmlFor={`tieback-${tieBack.id}`} className="flex items-center justify-between p-3 border border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300">
                        <div>
                          <span className="font-medium text-gray-900">{tieBack.name}</span>
                          <p className="text-sm text-gray-500">{tieBack.description}</p>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{tieBack.price > 0 ? `+$${tieBack.price}` : 'Included'}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* Add to Cart */}
            <div className="pt-4 space-y-4">
              {/* Quantity */}
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Quantity</span>
                <div className="flex items-center border border-gray-300">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-gray-900">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Price & Button */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-3xl font-semibold text-gray-900">${totalPrice}</p>
                </div>
                <Button size="lg" className="h-14 px-8 bg-slate-800 hover:bg-slate-700 text-white text-lg" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm text-emerald-700">
                <TruckIcon className="w-4 h-4" />
                <span>FREE Shipping on orders over $200</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* Product Information - Simplified, No AI Style */}
      {/* ============================================ */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-8">Product Information</h2>

          <div className="bg-white border border-gray-200">
            {/* Description */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">About This Product</h3>
              <p className="text-gray-600 leading-relaxed">{productData.description}</p>
              <ul className="mt-4 space-y-2">
                {productData.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-600">
                    <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            <CollapsibleSection title="Specifications">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Materials</span>
                  <span className="text-gray-900">Linen, Cotton, Velvet</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Width Range</span>
                  <span className="text-gray-900">24" - 144"</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Height Range</span>
                  <span className="text-gray-900">24" - 120"</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Production Time</span>
                  <span className="text-gray-900">10-14 days</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Warranty</span>
                  <span className="text-gray-900">3 Years</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-gray-900">Free over $200</span>
                </div>
              </div>
            </CollapsibleSection>

            {/* Measuring */}
            <CollapsibleSection title="How to Measure">
              <div className="space-y-4 text-sm text-gray-600">
                <p>Follow these steps for accurate measurements:</p>
                <ol className="space-y-2 list-decimal list-inside">
                  <li>Measure window width at top, middle, and bottom. Use the narrowest.</li>
                  <li>Measure height at left, center, and right. Use the longest.</li>
                  <li>Round to nearest 1/8 inch.</li>
                  <li>For outside mount, add 4-6 inches to width for coverage.</li>
                </ol>
                <div className="flex gap-3 pt-2">
                  <button className="flex items-center gap-2 text-slate-700 hover:underline">
                    <FileTextIcon className="w-4 h-4" />
                    <span>Download Measuring Guide (PDF)</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-700 hover:underline">
                    <PlayIcon className="w-4 h-4" />
                    <span>Watch Video</span>
                  </button>
                </div>
              </div>
            </CollapsibleSection>

            {/* Installation */}
            <CollapsibleSection title="Installation">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50">
                  <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center">
                    <span className="text-xl font-semibold text-emerald-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Easy Installation</p>
                    <p className="text-sm text-gray-500">15-20 minutes • DIY friendly</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-900 mb-2">Tools needed:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Drill', 'Screwdriver', 'Level', 'Measuring tape'].map(tool => (
                      <span key={tool} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            {/* Care */}
            <CollapsibleSection title="Care Instructions">
              <div className="space-y-3 text-sm text-gray-600">
                <p><strong>Regular care:</strong> Vacuum monthly with brush attachment. Dust with microfiber cloth.</p>
                <p><strong>Cleaning:</strong> Dry clean recommended every 2-3 years. Do not machine wash.</p>
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800">
                  <strong>Important:</strong> High heat can damage fabric and lining. Use low temperature if ironing.
                </div>
              </div>
            </CollapsibleSection>

            {/* Returns */}
            <CollapsibleSection title="Returns & Warranty">
              <div className="space-y-3 text-sm">
                <div className="p-4 bg-gray-50">
                  <p className="font-medium text-gray-900 mb-1">3-Year Limited Warranty</p>
                  <p className="text-gray-600">Covers manufacturing defects in materials and workmanship. Contact us within 14 days if your order arrives with defects.</p>
                </div>
                <p className="text-gray-600"><strong>Note:</strong> Custom orders cannot be returned for size or color preferences. Order free swatches first to ensure color accuracy.</p>
              </div>
            </CollapsibleSection>
          </div>

          {/* Reviews */}
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
              <span className="text-gray-500">({productData.reviewCount})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 border border-gray-200 text-center">
                <div className="text-4xl font-semibold text-gray-900">{productData.rating}</div>
                <div className="flex justify-center gap-1 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(productData.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-500">Based on {productData.reviewCount} reviews</p>
              </div>
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {reviewsData.map((review) => (
                  <div key={review.id} className="bg-white p-5 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{review.author}</p>
                        <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />)}</div>
                      </div>
                      {review.verified && <span className="ml-auto text-xs text-emerald-600">Verified</span>}
                    </div>
                    <p className="font-medium text-sm text-gray-900 mb-1">{review.title}</p>
                    <p className="text-gray-600 text-sm">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Swatch Dialog */}
      <Dialog open={isSwatchDialogOpen} onOpenChange={setIsSwatchDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">Order Free Fabric Samples</DialogTitle>
            <DialogDescription className="text-gray-600">See colors in your home before ordering. Up to 10 free samples.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-3 gap-3">
              {productData.colors.map((color) => (
                <div key={color.id} className="p-3 bg-gray-50 text-center cursor-pointer hover:ring-1 hover:ring-slate-800 transition-all">
                  <div className="w-full h-12 mb-2 border border-gray-200" style={{ backgroundColor: color.hex }} />
                  <p className="text-xs text-gray-900">{color.name}</p>
                </div>
              ))}
            </div>
            <div className="bg-emerald-50 p-3 flex items-center gap-2 text-sm text-emerald-800">
              <TruckIcon className="w-4 h-4" />
              <span>Free shipping • Arrives in 3-5 days</span>
            </div>
            <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white" onClick={() => { toast.success('Samples added to cart!'); setIsSwatchDialogOpen(false); }}>
              Add Samples to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailLuxV6Page;
