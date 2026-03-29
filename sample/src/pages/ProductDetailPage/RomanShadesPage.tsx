import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Image } from '@/components/ui/image';
import { toast } from 'sonner';
import { useCart } from '@/contexts/cart-context';
import {
  StarIcon,
  CheckIcon,
  RulerIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  HeartIcon,
  Share2Icon,
  TruckIcon,
  ShieldCheckIcon,
  RotateCcwIcon,
  Star,
  BabyIcon,
  ShieldIcon,
  PlayIcon,
  FileTextIcon,
  CalculatorIcon,
  ClockIcon,
  WrenchIcon,
  InfoIcon,
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  ChevronDownIcon
} from 'lucide-react';

// Product Data
const productData = {
  id: 'roman-1',
  name: 'Classic Roman Shades',
  description: 'Elegant tailored folds create a timeless look. Features our child-safe cordless lift system with optional motorization. Handcrafted with premium fabrics and precision stitching.',
  basePrice: 159.99,
  category: 'Roman Shades',
  style: ['Classic', 'Traditional'],
  materials: ['Cotton', 'Polyester Blend'],
  rating: 4.7,
  reviewCount: 892,
  features: ['Cordless lift standard', 'Optional motorization', 'Multiple fold styles', 'Lining options'],
  colors: [
    { id: 'white', name: 'Pure White', hex: '#FFFFFF', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/6d9f0df723de4f648a28c44f08db77d1_ve_miaoda' },
    { id: 'cream', name: 'Cream', hex: '#F5F0E6', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda' },
    { id: 'sage', name: 'Sage', hex: '#9CAF88', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/6310ecde128b4463aff2428e6a1327a2_ve_miaoda' },
    { id: 'navy', name: 'Navy', hex: '#2C3E50', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/190087f6844e4a6d9e9eecd6e38fdad3_ve_miaoda' },
  ],
  images: [
    { id: '1', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/58c5b1e0bea9442eb4d1ea59746e3978_ve_miaoda', alt: 'Classic Roman Shades' },
    { id: '2', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/ee3d56e3a692439596342c11c005eec0_ve_miaoda', alt: 'Roman shade front and back view' },
    { id: '3', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/259183df0eea42219e8baf8c92b139c2_ve_miaoda', alt: 'Back view with liner' },
  ],
  liningOptions: [
    { id: 'standard', name: 'Standard', price: 0, description: 'Light filtering privacy lining' },
    { id: 'blackout', name: 'Blackout', price: 35, description: 'Complete light blockage' },
  ],
  foldStyles: [
    { id: 'flat', name: 'Flat Fold', description: 'Clean, modern look' },
    { id: 'hobbled', name: 'Hobbled Fold', description: 'Classic soft loops' },
  ]
};

// Measurement Calculator
const MeasurementCalculator = () => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [mountType, setMountType] = useState<'inside' | 'outside'>('inside');
  const [result, setResult] = useState<{width: string; height: string} | null>(null);

  const calculate = () => {
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (!w || !h) return;
    
    if (mountType === 'inside') {
      setResult({
        width: (w - 0.25).toFixed(2),
        height: h.toFixed(2)
      });
    } else {
      setResult({
        width: (w + 4).toFixed(2),
        height: (h + 3).toFixed(2)
      });
    }
  };

  return (
    <div className="bg-accent/30 rounded-xl p-4 space-y-4">
      <h4 className="font-medium flex items-center gap-2">
        <CalculatorIcon className="w-4 h-4 text-primary" />
        Shade Size Calculator
      </h4>
      <div className="flex gap-2">
        <button
          onClick={() => { setMountType('inside'); setResult(null); }}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            mountType === 'inside' ? 'bg-primary text-primary-foreground' : 'bg-background border border-border'
          }`}
        >
          Inside Mount
        </button>
        <button
          onClick={() => { setMountType('outside'); setResult(null); }}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            mountType === 'outside' ? 'bg-primary text-primary-foreground' : 'bg-background border border-border'
          }`}
        >
          Outside Mount
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Window Width</Label>
          <Input type="number" step="0.125" value={width} onChange={(e) => setWidth(e.target.value)} className="h-10" placeholder="36" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Window Height</Label>
          <Input type="number" step="0.125" value={height} onChange={(e) => setHeight(e.target.value)} className="h-10" placeholder="48" />
        </div>
      </div>
      <Button onClick={calculate} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
        Calculate
      </Button>
      {result && (
        <div className="bg-primary/10 rounded-lg p-3 space-y-1">
          <p className="text-sm font-medium text-primary">Recommended: {result.width}&quot; x {result.height}&quot;</p>
          <p className="text-xs text-muted-foreground">
            {mountType === 'inside' ? '1/4" deducted for clearance' : 'Added for optimal coverage'}
          </p>
        </div>
      )}
    </div>
  );
};

// Difficulty Meter
const DifficultyMeter = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <WrenchIcon className="w-5 h-5 text-emerald-600" />
          <span className="font-semibold text-emerald-900">Installation Difficulty</span>
        </div>
        <Badge className="bg-emerald-500 text-white border-0">Level 1</Badge>
      </div>
      
      <div className="space-y-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`h-2 flex-1 rounded-full ${level <= 1 ? 'bg-emerald-500' : 'bg-emerald-100'}`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-emerald-700 font-medium">15-min Install</span>
          <span className="text-emerald-600">You got this!</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-emerald-100 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-lg font-bold text-emerald-700">1</p>
          <p className="text-xs text-emerald-600">Person</p>
        </div>
        <div>
          <p className="text-lg font-bold text-emerald-700">15</p>
          <p className="text-xs text-emerald-600">Minutes</p>
        </div>
        <div>
          <p className="text-lg font-bold text-emerald-700">Basic</p>
          <p className="text-xs text-emerald-600">Tools</p>
        </div>
      </div>
    </div>
  );
};

// Tutorial Hub
const TutorialHub = () => {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
      <h4 className="font-semibold flex items-center gap-2">
        <PlayIcon className="w-4 h-4 text-primary" />
        Installation Resources
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-accent">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                <PlayIcon className="w-5 h-5 text-primary-foreground ml-1" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded text-xs text-white">
              1:24
            </div>
          </div>
          <p className="text-sm font-medium">Quick Install Video</p>
          <p className="text-xs text-muted-foreground">Watch step-by-step in under 2 minutes</p>
        </div>
        <div className="space-y-2">
          <div className="aspect-video rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center p-4 hover:border-primary/50 transition-colors cursor-pointer">
            <FileTextIcon className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Download Guides</p>
          </div>
          <div className="space-y-1">
            <button className="w-full text-left text-sm text-primary hover:underline flex items-center gap-2">
              <ArrowRightIcon className="w-3 h-3" />
              Measurement Checklist (PDF)
            </button>
            <button className="w-full text-left text-sm text-primary hover:underline flex items-center gap-2">
              <ArrowRightIcon className="w-3 h-3" />
              Installation Manual (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Visual Measure Guide
const VisualMeasureGuide = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card rounded-2xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Visual Measurement Guide</h4>
          <button onClick={onClose} className="p-1 hover:bg-accent rounded">
            <MinusIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="relative bg-accent/50 rounded-xl p-4">
            <div className="border-2 border-dashed border-primary/30 rounded-lg h-40 relative">
              <div className="absolute top-0 left-4 right-4 h-4 bg-primary/20 flex items-center justify-center text-xs">
                <ArrowRightIcon className="w-3 h-3 rotate-90 mr-1" />
                WIDTH
                <ArrowRightIcon className="w-3 h-3 -rotate-90 ml-1" />
              </div>
              <div className="absolute left-0 top-4 bottom-4 w-4 bg-primary/20 flex items-center justify-center text-xs writing-mode-vertical">
                <span className="rotate-180" style={{ writingMode: 'vertical-rl' }}>HEIGHT</span>
              </div>
              <div className="absolute inset-4 border border-primary/50 rounded m-4" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-accent/30 rounded-lg">
              <p className="font-medium text-sm mb-1">Inside Mount</p>
              <p className="text-xs text-muted-foreground">Measure inside the window frame. We deduct 1/4" for clearance.</p>
            </div>
            <div className="p-3 bg-accent/30 rounded-lg">
              <p className="font-medium text-sm mb-1">Outside Mount</p>
              <p className="text-xs text-muted-foreground">Measure the area to cover. We add 4" width and 3" height.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Back View Preview
const BackViewPreview = () => {
  const [activeTab, setActiveTab] = useState<'front' | 'back' | 'safety'>('front');
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[
          { id: 'front', label: 'Front View' },
          { id: 'back', label: 'Back View' },
          { id: 'safety', label: 'Safety Cord' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'bg-accent text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-accent">
        {activeTab === 'front' && (
          <Image 
            src="https://miaoda.feishu.cn/aily/api/v1/files/static/58c5b1e0bea9442eb4d1ea59746e3978_ve_miaoda" 
            alt="Front view" 
            className="w-full h-full object-cover"
          />
        )}
        {activeTab === 'back' && (
          <Image 
            src="https://miaoda.feishu.cn/aily/api/v1/files/static/259183df0eea42219e8baf8c92b139c2_ve_miaoda" 
            alt="Back view with liner" 
            className="w-full h-full object-cover"
          />
        )}
        {activeTab === 'safety' && (
          <div className="w-full h-full bg-accent flex items-center justify-center">
            <div className="text-center p-6">
              <ShieldIcon className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Child-Safe Cord Lock</h4>
              <p className="text-sm text-muted-foreground">Our patented cord lock system prevents accidental release. Compliant with WCSC safety standards.</p>
            </div>
          </div>
        )}
      </div>
      
      {activeTab === 'back' && (
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-accent/50 rounded-lg">
            <p className="font-medium text-sm">White Privacy Liner</p>
            <p className="text-xs text-muted-foreground">Blocks visibility while maintaining light</p>
          </div>
          <div className="p-3 bg-accent/50 rounded-lg">
            <p className="font-medium text-sm">Aluminum Headrail</p>
            <p className="text-xs text-muted-foreground">Durable, rust-resistant support</p>
          </div>
        </div>
      )}
    </div>
  );
};

const RomanShadesPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedLining, setSelectedLining] = useState(productData.liningOptions[0]);
  const [selectedFold, setSelectedFold] = useState(productData.foldStyles[0]);
  const [width, setWidth] = useState('36');
  const [height, setHeight] = useState('48');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showMeasureGuide, setShowMeasureGuide] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>('');

  const totalPrice = useMemo(() => {
    const basePrice = productData.basePrice;
    const liningPrice = selectedLining.price;
    const widthValue = parseFloat(width) || 36;
    const heightValue = parseFloat(height) || 48;
    const sizeMultiplier = (widthValue * heightValue) / (36 * 48);
    const unitPrice = (basePrice + liningPrice) * Math.max(sizeMultiplier, 0.7);
    return Math.round(unitPrice * quantity);
  }, [selectedLining, width, height, quantity]);

  const handleAddToCart = () => {
    const cartItem = {
      id: `${productData.id}-${Date.now()}`,
      productId: productData.id,
      productName: productData.name,
      fabric: selectedColor.name,
      dimensions: { width: parseFloat(width) || 36, height: parseFloat(height) || 48, unit: 'inches' as const },
      lining: selectedLining.id as 'standard' | 'blackout' | 'thermal',
      mounting: 'cordless' as const,
      quantity,
      unitPrice: totalPrice / quantity,
      image: selectedColor.image,
    };
    addToCart(cartItem);
    toast.success('Added to cart!', { description: `${productData.name} - ${selectedColor.name}` });
  };

  return (
    <div className="w-full space-y-16 md:space-y-24 pb-16">
      {/* Safety Banner */}
      <div className="w-full bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center gap-2 text-sm">
            <ShieldIcon className="w-4 h-4 text-emerald-600" />
            <span className="font-medium text-emerald-800">WCSC Certified Child-Safe Design</span>
          </div>
        </div>
      </div>

      {/* Product Main Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery with Back View */}
          <div className="space-y-4">
            <BackViewPreview />
            <div className="flex gap-3 overflow-x-auto pb-2">
              {productData.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all ${
                    currentImageIndex === idx ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            {/* Header */}
            <div className="space-y-2">
              <Badge variant="outline" className="rounded-full text-xs font-medium text-emerald-600 border-emerald-200 bg-emerald-50">
                <BabyIcon className="w-3 h-3 mr-1" />
                Child-Safe
              </Badge>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                {productData.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(productData.rating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium">{productData.rating}</span>
                <span className="text-sm text-muted-foreground">({productData.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-foreground">${totalPrice}</span>
                <span className="text-lg text-muted-foreground">for {width}&quot; x {height}&quot;</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <CheckIcon className="w-4 h-4" />
                <span>FREE Shipping on orders over $200</span>
              </div>
            </div>

            <Separator />

            {/* Color Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Color: {selectedColor.name}</Label>
              <div className="flex gap-3 flex-wrap">
                {productData.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-14 h-14 rounded-xl border-2 transition-all ${
                      selectedColor.id === color.id 
                        ? 'border-primary ring-2 ring-primary ring-offset-2' 
                        : 'border-border hover:border-muted-foreground'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor.id === color.id && (
                      <CheckIcon className={`absolute inset-0 m-auto w-5 h-5 ${color.hex === '#FFFFFF' || color.hex === '#F5F0E6' ? 'text-foreground drop-shadow-md' : 'text-white drop-shadow-md'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions with Visual Guide */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Dimensions (inches)</Label>
                <button 
                  onClick={() => setShowMeasureGuide(true)}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <InfoIcon className="w-3 h-3" />
                  Visual Guide
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Width</Label>
                  <Input type="number" step="0.125" value={width} onChange={(e) => setWidth(e.target.value)} className="h-11" placeholder="36" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Height</Label>
                  <Input type="number" step="0.125" value={height} onChange={(e) => setHeight(e.target.value)} className="h-11" placeholder="48" />
                </div>
              </div>
            </div>

            {/* Fold Style */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Fold Style</Label>
              <RadioGroup value={selectedFold.id} onValueChange={(val) => {
                const fold = productData.foldStyles.find(f => f.id === val);
                if (fold) setSelectedFold(fold);
              }}>
                <div className="grid grid-cols-2 gap-3">
                  {productData.foldStyles.map((fold) => (
                    <div key={fold.id}>
                      <RadioGroupItem value={fold.id} id={fold.id} className="peer sr-only" />
                      <Label htmlFor={fold.id} className="flex flex-col p-4 rounded-xl border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 text-center">
                        <span className="font-medium text-sm">{fold.name}</span>
                        <span className="text-xs text-muted-foreground">{fold.description}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Lining Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Lining Option</Label>
              <RadioGroup value={selectedLining.id} onValueChange={(val) => {
                const lining = productData.liningOptions.find(l => l.id === val);
                if (lining) setSelectedLining(lining);
              }}>
                <div className="grid gap-3">
                  {productData.liningOptions.map((lining) => (
                    <div key={lining.id}>
                      <RadioGroupItem value={lining.id} id={lining.id} className="peer sr-only" />
                      <Label htmlFor={lining.id} className="flex items-start gap-3 p-4 rounded-xl border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{lining.name}</span>
                            <span className="text-sm">{lining.price > 0 ? `+$${lining.price}` : 'Included'}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{lining.description}</p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Quantity</Label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground">
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground">
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button size="lg" className="flex-1 h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium" onClick={handleAddToCart}>
                Add to Cart - ${totalPrice}
              </Button>
              <Button size="lg" variant="outline" className="h-14 w-14 rounded-full" onClick={() => setIsWishlisted(!isWishlisted)}>
                <HeartIcon className={`w-5 h-5 ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
              </Button>
              <Button size="lg" variant="outline" className="h-14 w-14 rounded-full">
                <Share2Icon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SelectBlinds Style Modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DifficultyMeter />
          <div className="md:col-span-2">
            <TutorialHub />
          </div>
        </div>
      </section>

      {/* Product Info Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Accordion type="single" collapsible className="w-full" value={openAccordion} onValueChange={setOpenAccordion}>
          <AccordionItem value="calculator" className="border-b border-border">
            <AccordionTrigger className="py-4 text-lg font-serif font-semibold hover:no-underline">
              <div className="flex items-center gap-2">
                <CalculatorIcon className="w-5 h-5 text-primary" />
                Measurement Calculator
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <MeasurementCalculator />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="specs" className="border-b border-border">
            <AccordionTrigger className="py-4 text-lg font-serif font-semibold hover:no-underline">
              Specifications
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <table className="w-full">
                <tbody className="divide-y divide-border">
                  <tr><td className="py-3 text-sm text-muted-foreground w-1/3">Min Width</td><td className="py-3 text-sm font-medium">12&quot;</td></tr>
                  <tr><td className="py-3 text-sm text-muted-foreground">Max Width</td><td className="py-3 text-sm font-medium">96&quot;</td></tr>
                  <tr><td className="py-3 text-sm text-muted-foreground">Safety</td><td className="py-3 text-sm font-medium">WCSC Certified Cordless</td></tr>
                </tbody>
              </table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Visual Measure Guide Modal */}
      <VisualMeasureGuide show={showMeasureGuide} onClose={() => setShowMeasureGuide(false)} />
    </div>
  );
};

export default RomanShadesPage;
