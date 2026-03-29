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
  UserIcon,
  ClockIcon,
  PackageIcon,
  LeafIcon,
  SunIcon,
  MoonIcon,
  WrenchIcon,
  PlayIcon,
  FileTextIcon,
  HelpCircleIcon,
  MinusIcon,
  PlusIcon,
  ArrowRightIcon,
  SparklesIcon,
  EyeIcon
} from 'lucide-react';

// Bamboo Shades Product Data
const productData = {
  id: 'bamboo-1',
  name: 'Natural Bamboo Woven Shades',
  description: 'Handcrafted from sustainably harvested bamboo and natural grasses, our woven shades bring organic texture and warmth to any space. Each shade features unique variations in grain and color, making every piece truly one-of-a-kind.',
  basePrice: 159.99,
  category: 'Woven Wood Shades',
  style: ['Natural', 'Bohemian', 'Coastal'],
  materials: ['Sustainable Bamboo', 'Natural Grasses', 'Organic Jute'],
  rating: 4.8,
  reviewCount: 256,
  features: [
    'Sustainably sourced materials',
    'Unique handcrafted patterns',
    'Multiple opacity options',
    'Free fabric swatches',
    'UV protective coating'
  ],
  colors: [
    { id: 'natural', name: 'Natural Bamboo', hex: '#C4A77D', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/908556c7998b43c388eedade2bd694e3_ve_miaoda' },
    { id: 'honey', name: 'Honey Oak', hex: '#D4A574', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/4404b45f35da473c8fc6f026d2c13f56_ve_miaoda' },
    { id: 'espresso', name: 'Dark Espresso', hex: '#4A3728', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/34013fff634f414ea6ff57ba2c97cf2b_ve_miaoda' },
    { id: 'driftwood', name: 'Driftwood Gray', hex: '#9B8B7A', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/71c5a08726ba4857a88b02903542fc08_ve_miaoda' },
  ],
  images: [
    { id: '1', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/908556c7998b43c388eedade2bd694e3_ve_miaoda', alt: 'Natural bamboo shades in living room' },
    { id: '2', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/ec5e95197cbd459f9ddc49da58421506_ve_miaoda', alt: 'Light filtering comparison' },
    { id: '3', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/374fd1c04ee445b2a6f8e62b5b3933ea_ve_miaoda', alt: 'Bamboo texture detail' },
    { id: '4', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d6e513cd18d543ba880d3432113b8457_ve_miaoda', alt: 'Shades in different lighting' },
  ],
  opacityLevels: [
    { 
      id: 'sheer', 
      name: 'Sheer / Light Filtering', 
      opacity: 25, 
      description: 'Soft, diffused light creates a warm glow while maintaining privacy',
      bestFor: 'Living rooms, dining areas',
      lightTransmission: '75%'
    },
    { 
      id: 'semi', 
      name: 'Semi-Private', 
      opacity: 50, 
      description: 'Balances natural light with increased privacy',
      bestFor: 'Home offices, kitchens',
      lightTransmission: '50%'
    },
    { 
      id: 'private', 
      name: 'Privacy Lining', 
      opacity: 75, 
      description: 'Blocks visibility while allowing soft ambient light',
      bestFor: 'Bedrooms, bathrooms',
      lightTransmission: '25%'
    },
    { 
      id: 'blackout', 
      name: 'Room Darkening', 
      opacity: 95, 
      description: 'Maximum light blockage for complete privacy and darkness',
      bestFor: 'Nurseries, media rooms',
      lightTransmission: '5%'
    },
  ],
  lightComparison: {
    morning: 'https://miaoda.feishu.cn/aily/api/v1/files/static/ec5e95197cbd459f9ddc49da58421506_ve_miaoda',
    afternoon: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d6e513cd18d543ba880d3432113b8457_ve_miaoda',
    evening: 'https://miaoda.feishu.cn/aily/api/v1/files/static/374fd1c04ee445b2a6f8e62b5b3933ea_ve_miaoda',
  }
};

// Mock reviews
const reviewsData = [
  { id: '1', author: 'Emma L.', rating: 5, date: '2024-02-20', title: 'Beautiful natural light!', content: 'Love how the light filters through these shades. The sheer option gives such a warm, natural glow in my living room.', verified: true, helpful: 28 },
  { id: '2', author: 'James K.', rating: 5, date: '2024-02-15', title: 'Perfect opacity options', content: 'Got the privacy lining for our bedroom and it\'s exactly what we needed. Still gets that beautiful texture but blocks enough light for sleeping.', verified: true, helpful: 22 },
];

// Opacity Level Indicator Component
const OpacityIndicator = ({ level }: { level: number }) => {
  const getColor = (opacity: number) => {
    if (opacity <= 25) return 'bg-amber-300';
    if (opacity <= 50) return 'bg-amber-400';
    if (opacity <= 75) return 'bg-amber-500';
    return 'bg-amber-600';
  };

  return (
    <div className="w-full h-3 bg-accent rounded-full overflow-hidden">
      <div 
        className={`h-full ${getColor(level)} transition-all duration-500`}
        style={{ width: `${level}%` }}
      />
    </div>
  );
};

// Difficulty Meter Component
const DifficultyMeter = ({ level, time, message }: { level: number; time: string; message: string }) => {
  const getLevelColor = (l: number) => {
    if (l === 1) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (l === 2) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-orange-600 bg-orange-50 border-orange-200';
  };

  return (
    <div className={`p-4 md:p-6 rounded-2xl border-2 ${getLevelColor(level)}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
            <WrenchIcon className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <div>
            <p className="text-xs md:text-sm font-medium uppercase tracking-wide opacity-80">Installation Difficulty</p>
            <p className="text-xl md:text-2xl font-bold">Level {level}</p>
            <p className="text-sm md:text-base font-medium">{time}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full">
          <SparklesIcon className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base font-semibold">{message}</span>
        </div>
      </div>
    </div>
  );
};

// Tutorial Hub Component
const TutorialHub = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {/* Video Tutorial */}
      <div className="bg-accent/30 rounded-2xl p-4 md:p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <PlayIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-sm md:text-base">Quick Install Video</h4>
            <p className="text-xs text-muted-foreground">1 minute guide</p>
          </div>
        </div>
        <div className="relative aspect-video bg-background rounded-xl overflow-hidden group cursor-pointer">
          <Image 
            src="https://miaoda.feishu.cn/aily/api/v1/files/static/374fd1c04ee445b2a6f8e62b5b3933ea_ve_miaoda" 
            alt="Installation video thumbnail" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white transition-colors">
              <PlayIcon className="w-6 h-6 md:w-8 md:h-8 text-primary ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* PDF Downloads */}
      <div className="bg-accent/30 rounded-2xl p-4 md:p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <FileTextIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-sm md:text-base">Download Guides</h4>
            <p className="text-xs text-muted-foreground">Printable resources</p>
          </div>
        </div>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 md:p-4 bg-background rounded-xl hover:bg-accent/50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <RulerIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">Measurement Checklist</p>
                <p className="text-xs text-muted-foreground">PDF • 2 pages</p>
              </div>
            </div>
            <ArrowRightIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
          <button className="w-full flex items-center justify-between p-3 md:p-4 bg-background rounded-xl hover:bg-accent/50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <WrenchIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">Installation Manual</p>
                <p className="text-xs text-muted-foreground">PDF • 8 pages</p>
              </div>
            </div>
            <ArrowRightIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Visual Measurement Guide Component
const VisualMeasureGuide = ({ mountType, onMountTypeChange }: { mountType: 'inside' | 'outside'; onMountTypeChange: (type: 'inside' | 'outside') => void }) => {
  return (
    <div className="bg-accent/30 rounded-2xl p-4 md:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h4 className="font-medium flex items-center gap-2 text-sm md:text-base">
          <EyeIcon className="w-4 h-4 text-primary" />
          Visual Measurement Guide
        </h4>
        <div className="flex gap-2">
          <button
            onClick={() => onMountTypeChange('inside')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              mountType === 'inside' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-background border border-border hover:border-primary'
            }`}
          >
            Inside Mount
          </button>
          <button
            onClick={() => onMountTypeChange('outside')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              mountType === 'outside' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-background border border-border hover:border-primary'
            }`}
          >
            Outside Mount
          </button>
        </div>
      </div>

      {/* Window Diagram */}
      <div className="relative bg-background rounded-xl p-4 md:p-8 overflow-hidden">
        <svg viewBox="0 0 400 300" className="w-full h-auto max-h-[200px] md:max-h-[250px]">
          {/* Window Frame */}
          <rect x="50" y="50" width="300" height="200" fill="none" stroke="#C4A77D" strokeWidth="4" rx="4" />
          
          {/* Inside Mount Visual */}
          {mountType === 'inside' && (
            <>
              {/* Shade inside frame */}
              <rect x="60" y="55" width="280" height="190" fill="#E8DCC4" opacity="0.6" rx="2" />
              {/* Width arrows - inside */}
              <line x1="60" y1="40" x2="340" y2="40" stroke="#9B8B7A" strokeWidth="2" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead)" />
              <text x="200" y="35" textAnchor="middle" className="text-xs fill-muted-foreground">Width (inside frame)</text>
              {/* Height arrows - inside */}
              <line x1="360" y1="55" x2="360" y2="245" stroke="#9B8B7A" strokeWidth="2" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead)" />
              <text x="375" y="150" textAnchor="middle" className="text-xs fill-muted-foreground" transform="rotate(90, 375, 150)">Height</text>
            </>
          )}
          
          {/* Outside Mount Visual */}
          {mountType === 'outside' && (
            <>
              {/* Shade outside frame */}
              <rect x="30" y="40" width="340" height="220" fill="#E8DCC4" opacity="0.6" rx="2" />
              {/* Window frame line */}
              <rect x="50" y="50" width="300" height="200" fill="none" stroke="#C4A77D" strokeWidth="3" strokeDasharray="5,5" rx="4" />
              {/* Width arrows - outside */}
              <line x1="30" y1="25" x2="370" y2="25" stroke="#9B8B7A" strokeWidth="2" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead)" />
              <text x="200" y="20" textAnchor="middle" className="text-xs fill-muted-foreground">Width (+2-3" overlap)</text>
              {/* Height arrows - outside */}
              <line x1="390" y1="40" x2="390" y2="260" stroke="#9B8B7A" strokeWidth="2" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead)" />
              <text x="405" y="150" textAnchor="middle" className="text-xs fill-muted-foreground" transform="rotate(90, 405, 150)">Height (+3-4" overlap)</text>
            </>
          )}
          
          {/* Arrow marker definition */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#9B8B7A" />
            </marker>
          </defs>
        </svg>

        <div className="mt-4 p-3 bg-primary/5 rounded-lg">
          <p className="text-xs md:text-sm text-muted-foreground">
            {mountType === 'inside' 
              ? 'Measure the exact inside width and height of your window frame. We\'ll deduct 1/4" for clearance.'
              : 'Measure the area you want to cover. We recommend adding 2-3" to width and 3-4" to height for optimal coverage.'}
          </p>
        </div>
      </div>
    </div>
  );
};

// Light Comparison Component
const LightComparison = () => {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  
  const timeOptions = [
    { id: 'morning', label: 'Morning Light', icon: SunIcon, description: 'Soft, warm morning glow' },
    { id: 'afternoon', label: 'Afternoon Sun', icon: SunIcon, description: 'Bright, direct sunlight' },
    { id: 'evening', label: 'Evening Ambiance', icon: MoonIcon, description: 'Soft, diffused evening light' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h4 className="font-medium text-sm md:text-base">See How Light Transforms Your Space</h4>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {timeOptions.map((time) => {
            const Icon = time.icon;
            return (
              <button
                key={time.id}
                onClick={() => setTimeOfDay(time.id as typeof timeOfDay)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  timeOfDay === time.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background border border-border hover:border-primary'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {time.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
        <Image 
          src={productData.lightComparison[timeOfDay]} 
          alt={`${timeOfDay} light effect`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
          <p className="text-white text-sm md:text-base font-medium">
            {timeOptions.find(t => t.id === timeOfDay)?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

// Measurement Calculator
const MeasurementCalculator = ({ mountType }: { mountType: 'inside' | 'outside' }) => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
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
        width: (w + 3).toFixed(2),
        height: (h + 4).toFixed(2)
      });
    }
  };

  return (
    <div className="bg-accent/30 rounded-xl p-4 space-y-4">
      <h4 className="font-medium flex items-center gap-2 text-sm">
        <RulerIcon className="w-4 h-4 text-primary" />
        Size Calculator
      </h4>
      <div className="grid grid-cols-2 gap-3">
        <Input 
          type="number" 
          step="0.125" 
          placeholder="Width" 
          value={width} 
          onChange={(e) => setWidth(e.target.value)}
          className="h-10 text-sm"
        />
        <Input 
          type="number" 
          step="0.125" 
          placeholder="Height" 
          value={height} 
          onChange={(e) => setHeight(e.target.value)}
          className="h-10 text-sm"
        />
      </div>
      <Button onClick={calculate} variant="outline" className="w-full h-10 text-sm">
        Calculate
      </Button>
      {result && (
        <div className="bg-primary/10 rounded-lg p-3 text-sm">
          <p className="font-medium text-primary mb-1">Recommended Size:</p>
          <p className="text-muted-foreground">{result.width}&quot; W × {result.height}&quot; H</p>
        </div>
      )}
    </div>
  );
};

const BambooShadesPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedOpacity, setSelectedOpacity] = useState(productData.opacityLevels[1]);
  const [width, setWidth] = useState('36');
  const [height, setHeight] = useState('48');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mountType, setMountType] = useState<'inside' | 'outside'>('inside');
  const [openAccordion, setOpenAccordion] = useState<string>('opacity');

  const totalPrice = useMemo(() => {
    const basePrice = productData.basePrice;
    const widthValue = parseFloat(width) || 36;
    const heightValue = parseFloat(height) || 48;
    const sizeMultiplier = (widthValue * heightValue) / (36 * 48);
    const unitPrice = basePrice * Math.max(sizeMultiplier, 0.7);
    return Math.round(unitPrice * quantity);
  }, [width, height, quantity]);

  const handleAddToCart = () => {
    addToCart({
      id: `${productData.id}-${Date.now()}`,
      productId: productData.id,
      productName: productData.name,
      fabric: selectedColor.name,
      dimensions: { width: parseFloat(width) || 36, height: parseFloat(height) || 48, unit: 'inches' },
      lining: selectedOpacity.id as 'standard' | 'blackout' | 'thermal',
      mounting: 'cordless',
      quantity,
      unitPrice: totalPrice / quantity,
      image: selectedColor.image,
    });
    toast.success('Added to cart!', { description: `${productData.name} - ${selectedColor.name}` });
  };

  return (
    <div className="w-full space-y-12 md:space-y-20 pb-16">
      {/* Eco Banner */}
      <div className="w-full bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center gap-2 text-sm">
            <LeafIcon className="w-4 h-4 text-emerald-600" />
            <span className="font-medium text-emerald-800">Sustainably Sourced Materials</span>
            <span className="text-emerald-600 hidden sm:inline">— Handcrafted from natural bamboo</span>
          </div>
        </div>
      </div>

      {/* Product Main Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] bg-accent rounded-2xl overflow-hidden">
              <Image src={productData.images[currentImageIndex].url} alt={productData.images[currentImageIndex].alt} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-emerald-500 text-white rounded-full text-xs font-medium flex items-center gap-1.5">
                <LeafIcon className="w-3.5 h-3.5" />
                Eco-Friendly
              </div>
              <button onClick={() => setCurrentImageIndex(prev => prev === 0 ? productData.images.length - 1 : prev - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                <ChevronLeftIcon className="w-5 h-5 text-foreground" />
              </button>
              <button onClick={() => setCurrentImageIndex(prev => (prev + 1) % productData.images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                <ChevronRightIcon className="w-5 h-5 text-foreground" />
              </button>
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium">
                {currentImageIndex + 1} / {productData.images.length}
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {productData.images.map((img, idx) => (
                <button key={img.id} onClick={() => setCurrentImageIndex(idx)} className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all ${currentImageIndex === idx ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100'}`}>
                  <Image src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            <div className="space-y-2">
              <Badge variant="outline" className="rounded-full text-xs font-medium text-emerald-600 border-emerald-200 bg-emerald-50">
                <LeafIcon className="w-3 h-3 mr-1" />
                Sustainable
              </Badge>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight">{productData.name}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(productData.rating) ? 'fill-primary text-primary' : 'text-muted'}`} />)}
                </div>
                <span className="text-sm font-medium">{productData.rating}</span>
                <span className="text-sm text-muted-foreground">({productData.reviewCount} reviews)</span>
              </div>
            </div>

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

            {/* Opacity Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Light Control Level: {selectedOpacity.name}</Label>
              <div className="space-y-3">
                {productData.opacityLevels.map((level) => (
                  <div key={level.id} className={`p-3 md:p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedOpacity.id === level.id ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'}`} onClick={() => setSelectedOpacity(level)}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{level.name}</span>
                          <Badge variant="secondary" className="text-[10px] rounded-full">{level.lightTransmission} light</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{level.description}</p>
                        <p className="text-[10px] text-muted-foreground">Best for: {level.bestFor}</p>
                      </div>
                      <div className="w-16 shrink-0">
                        <OpacityIndicator level={level.opacity} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Natural Material: {selectedColor.name}</Label>
              <div className="flex gap-3 flex-wrap">
                {productData.colors.map((color) => (
                  <button key={color.id} onClick={() => setSelectedColor(color)} className={`relative w-12 h-12 md:w-14 md:h-14 rounded-xl border-2 transition-all ${selectedColor.id === color.id ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-border hover:border-muted-foreground'}`} style={{ backgroundColor: color.hex }} title={color.name}>
                    {selectedColor.id === color.id && <CheckIcon className={`absolute inset-0 m-auto w-5 h-5 ${color.hex === '#FFFFFF' || color.hex === '#F5F0E6' ? 'text-foreground drop-shadow-md' : 'text-white drop-shadow-md'}`} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions with Calculator */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Dimensions (inches)</Label>
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
              <MeasurementCalculator mountType={mountType} />
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Quantity</Label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"><MinusIcon className="w-4 h-4" /></button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"><PlusIcon className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 py-2">
              <div className="flex flex-col items-center text-center gap-1 p-2 md:p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <LeafIcon className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                <span className="text-[10px] md:text-xs text-emerald-700">Eco-Friendly<br/>Materials</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1 p-2 md:p-3 rounded-xl bg-amber-50 border border-amber-100">
                <SunIcon className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
                <span className="text-[10px] md:text-xs text-amber-700">Light<br/>Control</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1 p-2 md:p-3 rounded-xl bg-blue-50 border border-blue-100">
                <ShieldCheckIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <span className="text-[10px] md:text-xs text-blue-700">Lifetime<br/>Warranty</span>
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
              <Button size="lg" variant="outline" className="h-14 w-14 rounded-full"><Share2Icon className="w-5 h-5" /></Button>
            </div>
          </div>
        </div>
      </section>

      {/* SelectBlinds Style Hardcore Modules */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 md:space-y-8">
        {/* Module 1: Difficulty Meter */}
        <DifficultyMeter level={1} time="15-min Install" message="You got this!" />

        {/* Module 2: Tutorial Hub */}
        <TutorialHub />

        {/* Module 3: Visual Measurement Guide */}
        <VisualMeasureGuide mountType={mountType} onMountTypeChange={setMountType} />
      </section>

      {/* Product Information Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Accordion type="single" collapsible className="w-full" value={openAccordion} onValueChange={setOpenAccordion}>
          
          {/* Opacity & Light Control */}
          <AccordionItem value="opacity" className="border-b border-border">
            <AccordionTrigger className="py-4 text-base md:text-lg font-serif font-semibold hover:no-underline">
              <div className="flex items-center gap-2">
                <SunIcon className="w-5 h-5 text-amber-500" />
                Light Control & Opacity Guide
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Our bamboo shades offer four distinct opacity levels to perfectly match your lighting needs. 
                  The natural weave creates beautiful light patterns while providing the privacy you want.
                </p>

                {/* Light Comparison */}
                <LightComparison />

                {/* Opacity Comparison Table */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {productData.opacityLevels.map((level) => (
                    <div key={level.id} className="p-3 md:p-4 rounded-xl bg-accent/30 space-y-2">
                      <div className="w-full h-2 rounded-full overflow-hidden bg-accent">
                        <div className={`h-full ${level.opacity <= 25 ? 'bg-amber-300' : level.opacity <= 50 ? 'bg-amber-400' : level.opacity <= 75 ? 'bg-amber-500' : 'bg-amber-600'}`} style={{ width: `${level.opacity}%` }} />
                      </div>
                      <p className="font-medium text-xs md:text-sm">{level.name}</p>
                      <p className="text-[10px] md:text-xs text-muted-foreground">{level.lightTransmission} light passes through</p>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                  <div className="flex items-start gap-3">
                    <HelpCircleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-amber-900">Not sure which opacity?</p>
                      <p className="text-xs md:text-sm text-amber-700 mt-1">
                        Order our FREE fabric swatch kit to see all opacity options in your own space. 
                        Natural lighting varies throughout the day, and our samples help you make the perfect choice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Natural Materials */}
          <AccordionItem value="materials" className="border-b border-border">
            <AccordionTrigger className="py-4 text-base md:text-lg font-serif font-semibold hover:no-underline">
              <div className="flex items-center gap-2">
                <LeafIcon className="w-5 h-5 text-emerald-500" />
                Sustainable Materials
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div className="p-3 md:p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                    <p className="text-xl md:text-2xl font-bold text-emerald-600">100%</p>
                    <p className="text-xs md:text-sm text-emerald-700">Sustainable</p>
                  </div>
                  <div className="p-3 md:p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                    <p className="text-xl md:text-2xl font-bold text-emerald-600">3-4 hrs</p>
                    <p className="text-xs md:text-sm text-emerald-700">Handcraft Time</p>
                  </div>
                  <div className="p-3 md:p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                    <p className="text-xl md:text-2xl font-bold text-emerald-600">Zero</p>
                    <p className="text-xs md:text-sm text-emerald-700">Waste</p>
                  </div>
                  <div className="p-3 md:p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                    <p className="text-xl md:text-2xl font-bold text-emerald-600">10yr+</p>
                    <p className="text-xs md:text-sm text-emerald-700">Lifespan</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Each shade is handcrafted using traditional techniques passed down through generations. 
                  We source our bamboo from responsibly managed forests and ensure fair wages for our artisan partners.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Specifications */}
          <AccordionItem value="specs" className="border-b border-border">
            <AccordionTrigger className="py-4 text-base md:text-lg font-serif font-semibold hover:no-underline">Specifications</AccordionTrigger>
            <AccordionContent className="pb-6">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-border">
                  <tr><td className="py-3 text-muted-foreground w-1/3">Materials</td><td className="py-3 font-medium">{productData.materials.join(', ')}</td></tr>
                  <tr><td className="py-3 text-muted-foreground">Min/Max Width</td><td className="py-3 font-medium">12&quot; - 96&quot;</td></tr>
                  <tr><td className="py-3 text-muted-foreground">Min/Max Height</td><td className="py-3 font-medium">12&quot; - 96&quot;</td></tr>
                  <tr><td className="py-3 text-muted-foreground">Opacity Options</td><td className="py-3 font-medium">4 levels (Sheer to Blackout)</td></tr>
                  <tr><td className="py-3 text-muted-foreground">Warranty</td><td className="py-3 font-medium">Lifetime Limited</td></tr>
                </tbody>
              </table>
            </AccordionContent>
          </AccordionItem>

          {/* Reviews */}
          <AccordionItem value="reviews" className="border-b border-border">
            <AccordionTrigger className="py-4 text-base md:text-lg font-serif font-semibold hover:no-underline">Reviews ({productData.reviewCount})</AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-4">
                {reviewsData.map((review) => (
                  <Card key={review.id} className="rounded-xl">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                            <UserIcon className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{review.author}</div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted'}`} />)}
                              </div>
                              <span>•</span>
                              <span>{new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>
                        {review.verified && <Badge variant="secondary" className="rounded-full text-[10px]"><CheckIcon className="w-3 h-3 mr-1" />Verified</Badge>}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{review.title}</h4>
                        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{review.content}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
};

export default BambooShadesPage;
