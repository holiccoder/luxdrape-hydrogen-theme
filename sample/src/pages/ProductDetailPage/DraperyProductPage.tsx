import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Image } from '@/components/ui/image';
import { toast } from 'sonner';
import { useCart } from '@/contexts/cart-context';
import {
  Star,
  CheckIcon,
  RulerIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  HeartIcon,
  Share2Icon,
  TruckIcon,
  ShieldCheckIcon,
  RotateCcwIcon,
  ClockIcon,
  PackageIcon,
  WrenchIcon,
  AwardIcon,
  PlayIcon,
  FileTextIcon,
  DownloadIcon,
  MinusIcon,
  PlusIcon,
  ZapIcon,
  EyeIcon
} from 'lucide-react';

// Drapery Product Data
const productData = {
  id: 'drapery-1',
  name: 'Belgian Linen Drapery Panels',
  description: 'Luxurious Belgian linen drapery panels that bring timeless elegance to any room. Handcrafted from premium European flax, these panels feature beautiful texture, natural drape, and exceptional durability. Perfect for creating a warm, inviting atmosphere.',
  basePrice: 129.99,
  category: 'Drapery Panels',
  style: ['Classic', 'Modern', 'Traditional'],
  materials: ['100% Belgian Linen'],
  rating: 4.8,
  reviewCount: 1247,
  features: ['Custom sizes available', 'Free fabric swatches', 'Easy installation', 'Machine washable', 'Hardware included'],
  colors: [
    { id: 'natural', name: 'Natural', hex: '#D4C5B5', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/4404b45f35da473c8fc6f026d2c13f56_ve_miaoda' },
    { id: 'cream', name: 'Cream', hex: '#F5F0E6', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda' },
    { id: 'white', name: 'Pure White', hex: '#FFFFFF', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/6d9f0df723de4f648a28c44f08db77d1_ve_miaoda' },
    { id: 'sage', name: 'Sage', hex: '#9CAF88', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/6310ecde128b4463aff2428e6a1327a2_ve_miaoda' },
    { id: 'navy', name: 'Navy', hex: '#2C3E50', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/190087f6844e4a6d9e9eecd6e38fdad3_ve_miaoda' },
    { id: 'charcoal', name: 'Charcoal', hex: '#4A4A4A', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/71c5a08726ba4857a88b02903542fc08_ve_miaoda' },
  ],
  images: [
    { id: '1', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/22d3a6f5aebe4577b7cc55fad2a7a38a_ve_miaoda', alt: 'Belgian linen drapery in living room' },
    { id: '2', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/58c5b1e0bea9442eb4d1ea59746e3978_ve_miaoda', alt: 'Close-up fabric texture' },
    { id: '3', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d6e513cd18d543ba880d3432113b8457_ve_miaoda', alt: 'Drapery in bedroom setting' },
    { id: '4', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/ef5c765748204a14b6ad03baebd04785_ve_miaoda', alt: 'Dining room with drapery' },
  ],
  hardwareOptions: [
    { id: 'brass', name: 'Antique Brass', price: 0, image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/3e523a047c43412d8910320abeb3c7a1_ve_miaoda' },
    { id: 'nickel', name: 'Brushed Nickel', price: 15, image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/323d2b04633e42088ff6fb19e300a7fe_ve_miaoda' },
    { id: 'black', name: 'Matte Black', price: 15, image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/7b849f6ee3bf42e885b324dd0907336b_ve_miaoda' },
  ],
  liningOptions: [
    { id: 'unlined', name: 'Unlined', price: 0, description: 'Beautiful natural light diffusion' },
    { id: 'privacy', name: 'Privacy Lined', price: 35, description: 'Blocks visibility, soft light glow' },
    { id: 'blackout', name: 'Blackout Lined', price: 55, description: 'Complete light blockage' },
    { id: 'thermal', name: 'Thermal Lined', price: 45, description: 'Energy efficient insulation' },
  ],
  headerStyles: [
    { id: 'rod-pocket', name: 'Rod Pocket', description: 'Classic gathered look' },
    { id: 'grommet', name: 'Grommet', description: 'Modern clean lines' },
    { id: 'back-tab', name: 'Back Tab', description: 'Tailored appearance' },
    { id: 'pinch-pleat', name: 'Pinch Pleat', description: 'Formal elegant folds' },
  ],
};

// Scene images
const sceneImages = [
  { id: 'scene-1', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/22d3a6f5aebe4577b7cc55fad2a7a38a_ve_miaoda', title: 'Living Room', description: 'Floor-to-ceiling elegance' },
  { id: 'scene-2', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d6e513cd18d543ba880d3432113b8457_ve_miaoda', title: 'Bedroom', description: 'Cozy retreat' },
  { id: 'scene-3', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/ef5c765748204a14b6ad03baebd04785_ve_miaoda', title: 'Dining Room', description: 'Sophisticated dining' },
  { id: 'scene-4', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/58c5b1e0bea9442eb4d1ea59746e3978_ve_miaoda', title: 'Home Office', description: 'Professional touch' },
];

// Difficulty Meter Component
const DifficultyMeter = () => {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white">
          <ZapIcon className="w-8 h-8" />
        </div>
        <div>
          <h4 className="font-serif text-xl font-semibold text-emerald-900">Level 1: Easy Install</h4>
          <p className="text-emerald-700">15-minute setup • You got this!</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Difficulty</span>
          <span className="font-medium text-emerald-700">Beginner Friendly</span>
        </div>
        <div className="h-3 bg-emerald-100 rounded-full overflow-hidden">
          <div className="h-full w-1/4 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Easy</span>
          <span>Moderate</span>
          <span>Complex</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-emerald-200 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-emerald-700">15</p>
          <p className="text-xs text-emerald-600">Minutes</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-emerald-700">1</p>
          <p className="text-xs text-emerald-600">Person</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-emerald-700">Basic</p>
          <p className="text-xs text-emerald-600">Tools</p>
        </div>
      </div>
    </div>
  );
};

// Tutorial Hub Component
const TutorialHub = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Video Tutorial */}
      <Card className="rounded-2xl overflow-hidden">
        <div className="relative aspect-video bg-accent">
          <Image 
            src="https://miaoda.feishu.cn/aily/api/v1/files/static/22d3a6f5aebe4577b7cc55fad2a7a38a_ve_miaoda" 
            alt="Installation video thumbnail" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
              <PlayIcon className="w-6 h-6 ml-1" />
            </button>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">1:24</span>
            <span className="text-xs text-white/90">Quick Install Guide</span>
          </div>
        </div>
        <CardContent className="p-4">
          <h4 className="font-medium mb-1">Watch: 1-Minute Install</h4>
          <p className="text-sm text-muted-foreground">See how easy it is to hang your new drapery panels</p>
        </CardContent>
      </Card>

      {/* PDF Downloads */}
      <div className="space-y-3">
        <h4 className="font-medium">Download Resources</h4>
        
        <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary hover:bg-accent/50 transition-all group">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20">
            <FileTextIcon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium">Measurement Checklist</p>
            <p className="text-xs text-muted-foreground">PDF • 2 pages</p>
          </div>
          <DownloadIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
        </button>

        <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary hover:bg-accent/50 transition-all group">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20">
            <FileTextIcon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium">Installation Manual</p>
            <p className="text-xs text-muted-foreground">PDF • 8 pages</p>
          </div>
          <DownloadIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
        </button>

        <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary hover:bg-accent/50 transition-all group">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20">
            <RulerIcon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium">Printable Measuring Tape</p>
            <p className="text-xs text-muted-foreground">PDF • 1 page</p>
          </div>
          <DownloadIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
        </button>
      </div>
    </div>
  );
};

// Visual Measure Guide Component
const VisualMeasureGuide = ({ mountType, isVisible }: { mountType: 'inside' | 'outside'; isVisible: boolean }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute z-50 left-full top-0 ml-4 w-80 bg-white rounded-2xl shadow-xl border border-border p-4 hidden lg:block">
      <div className="space-y-4">
        <h4 className="font-medium flex items-center gap-2">
          <EyeIcon className="w-4 h-4 text-primary" />
          {mountType === 'inside' ? 'Inside Mount' : 'Outside Mount'} Guide
        </h4>
        
        {/* Window Diagram */}
        <div className="relative bg-accent/50 rounded-xl p-6">
          <svg viewBox="0 0 200 150" className="w-full">
            {/* Window Frame */}
            <rect x="20" y="20" width="160" height="110" fill="none" stroke="#8B7355" strokeWidth="4" />
            
            {mountType === 'inside' ? (
              <>
                {/* Inside Mount Arrows */}
                <line x1="20" y1="80" x2="180" y2="80" stroke="#D4A574" strokeWidth="2" strokeDasharray="4" />
                <polygon points="30,75 20,80 30,85" fill="#D4A574" />
                <polygon points="170,75 180,80 170,85" fill="#D4A574" />
                <text x="100" y="95" textAnchor="middle" fontSize="10" fill="#4A3728">Width</text>
                
                <line x1="100" y1="20" x2="100" y2="130" stroke="#D4A574" strokeWidth="2" strokeDasharray="4" />
                <polygon points="95,30 100,20 105,30" fill="#D4A574" />
                <polygon points="95,120 100,130 105,120" fill="#D4A574" />
                <text x="115" y="80" fontSize="10" fill="#4A3728">Height</text>
              </>
            ) : (
              <>
                {/* Outside Mount Arrows - extended */}
                <line x1="5" y1="80" x2="195" y2="80" stroke="#D4A574" strokeWidth="2" strokeDasharray="4" />
                <polygon points="15,75 5,80 15,85" fill="#D4A574" />
                <polygon points="185,75 195,80 185,85" fill="#D4A574" />
                <text x="100" y="95" textAnchor="middle" fontSize="10" fill="#4A3728">Width + 4"</text>
                
                <line x1="100" y1="5" x2="100" y2="145" stroke="#D4A574" strokeWidth="2" strokeDasharray="4" />
                <polygon points="95,15 100,5 105,15" fill="#D4A574" />
                <polygon points="95,135 100,145 105,135" fill="#D4A574" />
                <text x="115" y="80" fontSize="10" fill="#4A3728">Height + 3"</text>
                
                {/* Dotted line for window */}
                <rect x="30" y="30" width="140" height="90" fill="none" stroke="#8B7355" strokeWidth="1" strokeDasharray="2" opacity="0.5" />
              </>
            )}
          </svg>
        </div>

        <div className="text-sm space-y-2">
          {mountType === 'inside' ? (
            <>
              <p className="text-muted-foreground">• Measure inside window frame</p>
              <p className="text-muted-foreground">• We deduct 0.25" for clearance</p>
              <p className="text-muted-foreground">• Measure width at top, middle, bottom</p>
            </>
          ) : (
            <>
              <p className="text-muted-foreground">• Measure area you want to cover</p>
              <p className="text-muted-foreground">• Add 3-4" overlap on each side</p>
              <p className="text-muted-foreground">• Mount 4-6" above window frame</p>
            </>
          )}
        </div>
      </div>
      
      {/* Arrow pointing left */}
      <div className="absolute -left-2 top-8 w-4 h-4 bg-white border-l border-b border-border transform rotate-45" />
    </div>
  );
};

// Measurement Calculator Component
const MeasurementCalculator = () => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [mountType, setMountType] = useState<'inside' | 'outside'>('inside');
  const [result, setResult] = useState<{width: string; height: string} | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  const calculateDimensions = () => {
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
    <div className="bg-accent/30 rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <RulerIcon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="font-medium">Drapery Size Calculator</h4>
          <p className="text-sm text-muted-foreground">Get the perfect fit for your windows</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => { setMountType('inside'); setResult(null); }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${
              mountType === 'inside' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-background border border-border hover:border-primary'
            }`}
          >
            Inside Mount
          </button>
          <button
            onClick={() => { setMountType('outside'); setResult(null); }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${
              mountType === 'outside' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-background border border-border hover:border-primary'
            }`}
          >
            Outside Mount
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 relative">
          <div className="space-y-1.5">
            <Label className="text-xs">Window Width (inches)</Label>
            <div className="relative">
              <Input
                type="number"
                step="0.125"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                onFocus={() => setShowGuide(true)}
                onBlur={() => setShowGuide(false)}
                placeholder="36.0"
                className="h-11"
              />
              <VisualMeasureGuide mountType={mountType} isVisible={showGuide} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Window Height (inches)</Label>
            <Input
              type="number"
              step="0.125"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              onFocus={() => setShowGuide(true)}
              onBlur={() => setShowGuide(false)}
              placeholder="84.0"
              className="h-11"
            />
          </div>
        </div>

        <Button 
          onClick={calculateDimensions}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
        >
          Calculate Drapery Size
        </Button>

        {result && (
          <div className="bg-primary/10 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-primary" />
              <p className="font-medium text-primary">Recommended Drapery Size:</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Width</p>
                <p className="text-xl font-bold">{result.width}&quot;</p>
              </div>
              <div className="bg-background rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Height</p>
                <p className="text-xl font-bold">{result.height}&quot;</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {mountType === 'inside' 
                ? 'We subtracted 1/4" for proper clearance inside the frame.' 
                : 'We added 4" width and 3" height for optimal coverage and light blockage.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const DraperyProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedLining, setSelectedLining] = useState(productData.liningOptions[0]);
  const [selectedHardware, setSelectedHardware] = useState(productData.hardwareOptions[0]);
  const [selectedHeader, setSelectedHeader] = useState(productData.headerStyles[0]);
  const [width, setWidth] = useState('48');
  const [height, setHeight] = useState('84');
  const [quantity, setQuantity] = useState(2);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string>('measure');

  const totalPrice = useMemo(() => {
    const basePrice = productData.basePrice;
    const liningPrice = selectedLining.price;
    const hardwarePrice = selectedHardware.price;
    const widthValue = parseFloat(width) || 48;
    const heightValue = parseFloat(height) || 84;
    const sizeMultiplier = (widthValue * heightValue) / (48 * 84);
    const unitPrice = (basePrice + liningPrice + hardwarePrice) * Math.max(sizeMultiplier, 0.8);
    return Math.round(unitPrice * quantity);
  }, [selectedLining, selectedHardware, width, height, quantity]);

  const handleAddToCart = () => {
    const cartItem = {
      id: `${productData.id}-${Date.now()}`,
      productId: productData.id,
      productName: productData.name,
      fabric: selectedColor.name,
      dimensions: {
        width: parseFloat(width) || 48,
        height: parseFloat(height) || 84,
        unit: 'inches' as const,
      },
      lining: selectedLining.id as 'standard' | 'blackout' | 'thermal',
      mounting: selectedHeader.id as 'rod-pocket' | 'grommet' | 'back-tab',
      quantity,
      unitPrice: totalPrice / quantity,
      image: selectedColor.image,
    };
    addToCart(cartItem);
    toast.success('Added to cart!', {
      description: `${productData.name} - ${selectedColor.name}`,
    });
  };

  return (
    <div className="w-full space-y-16 md:space-y-24 pb-16">
      {/* Product Main Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] bg-accent rounded-2xl overflow-hidden">
              <Image
                src={productData.images[currentImageIndex].url}
                alt={productData.images[currentImageIndex].alt}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setCurrentImageIndex(prev => prev === 0 ? productData.images.length - 1 : prev - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={() => setCurrentImageIndex(prev => (prev + 1) % productData.images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5 text-foreground" />
              </button>
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium">
                {currentImageIndex + 1} / {productData.images.length}
              </div>
            </div>
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
            <div className="space-y-2">
              <Badge variant="outline" className="rounded-full text-xs font-medium text-primary border-primary/30">
                <AwardIcon className="w-3 h-3 mr-1" />
                Best Seller
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

            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-foreground">${totalPrice}</span>
                <span className="text-lg text-muted-foreground">for {quantity} panels</span>
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
                    className={`relative w-12 h-12 rounded-xl border-2 transition-all ${
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

            {/* Dimensions with Calculator */}
            <MeasurementCalculator />

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
                      <Label htmlFor={lining.id} className="flex items-start gap-3 p-4 rounded-xl border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-muted-foreground">
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

            {/* Hardware Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Hardware Finish</Label>
              <div className="grid grid-cols-3 gap-3">
                {productData.hardwareOptions.map((hardware) => (
                  <button
                    key={hardware.id}
                    onClick={() => setSelectedHardware(hardware)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      selectedHardware.id === hardware.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <div className="w-full aspect-square rounded-lg overflow-hidden mb-2 bg-accent">
                      <Image src={hardware.image} alt={hardware.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs font-medium">{hardware.name}</p>
                    <p className="text-xs text-muted-foreground">{hardware.price > 0 ? `+$${hardware.price}` : 'Included'}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Header Style */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Header Style</Label>
              <div className="grid grid-cols-2 gap-3">
                {productData.headerStyles.map((header) => (
                  <button
                    key={header.id}
                    onClick={() => setSelectedHeader(header)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      selectedHeader.id === header.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <p className="font-medium text-sm">{header.name}</p>
                    <p className="text-xs text-muted-foreground">{header.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Quantity (Panels)</Label>
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
                <span className="text-sm text-muted-foreground">Recommended: 2 panels per window</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 py-2">
              <div className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-accent/30">
                <PackageIcon className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">Hardware<br/>Included</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-accent/30">
                <RotateCcwIcon className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">30-Day<br/>Returns</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-accent/30">
                <ShieldCheckIcon className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">Lifetime<br/>Warranty</span>
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

      {/* SelectBlinds Professional Modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Difficulty Meter */}
          <div className="lg:col-span-1">
            <DifficultyMeter />
          </div>
          
          {/* Tutorial Hub */}
          <div className="lg:col-span-2">
            <TutorialHub />
          </div>
        </div>
      </section>

      {/* Room Scene Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-2">See It In Your Space</h2>
            <p className="text-muted-foreground">Explore how our drapery transforms different rooms</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sceneImages.map((scene) => (
              <Card key={scene.id} className="rounded-2xl overflow-hidden group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden">
                  <Image 
                    src={scene.url} 
                    alt={scene.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">{scene.title}</h3>
                  <p className="text-sm text-muted-foreground">{scene.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Details Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Accordion type="single" collapsible className="w-full" value={activeAccordion} onValueChange={setActiveAccordion}>
          <AccordionItem value="measure" className="border-b border-border">
            <AccordionTrigger className="py-4 text-lg font-serif font-semibold hover:no-underline">
              Measurement Guide
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-6">
                <MeasurementCalculator />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="hardware" className="border-b border-border">
            <AccordionTrigger className="py-4 text-lg font-serif font-semibold hover:no-underline">
              Hardware Details
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-4">
                <p className="text-muted-foreground">All hardware is included with your drapery panels. Each set includes:</p>
                <ul className="space-y-2">
                  {['Decorative curtain rod with finials', 'Mounting brackets (2-3 depending on width)', 'Wall anchors and screws', 'Rings or hooks as needed'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckIcon className="w-4 h-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {productData.hardwareOptions.map((hw) => (
                    <div key={hw.id} className="text-center">
                      <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-accent">
                        <Image src={hw.image} alt={hw.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-sm font-medium">{hw.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="specs" className="border-b border-border">
            <AccordionTrigger className="py-4 text-lg font-serif font-semibold hover:no-underline">
              Specifications
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <table className="w-full">
                <tbody className="divide-y divide-border">
                  <tr><td className="py-3 text-sm text-muted-foreground w-1/3">Material</td><td className="py-3 text-sm font-medium">{productData.materials[0]}</td></tr>
                  <tr><td className="py-3 text-sm text-muted-foreground">Fabric Weight</td><td className="py-3 text-sm font-medium">280 GSM</td></tr>
                  <tr><td className="py-3 text-sm text-muted-foreground">Width Range</td><td className="py-3 text-sm font-medium">24&quot; - 120&quot;</td></tr>
                  <tr><td className="py-3 text-sm text-muted-foreground">Length Range</td><td className="py-3 text-sm font-medium">36&quot; - 144&quot;</td></tr>
                  <tr><td className="py-3 text-sm text-muted-foreground">Care</td><td className="py-3 text-sm font-medium">Dry clean recommended</td></tr>
                </tbody>
              </table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
};

export default DraperyProductPage;
