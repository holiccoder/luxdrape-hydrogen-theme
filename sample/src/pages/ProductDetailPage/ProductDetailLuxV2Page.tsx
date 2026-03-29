import React, { useState, useMemo } from 'react';
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
  Star,
  UserIcon,
  ClockIcon,
  PackageIcon,
  WrenchIcon,
  ShieldIcon,
  BabyIcon,
  LeafIcon,
  HandHelpingIcon,
  PlayIcon,
  ZapIcon,
  AwardIcon,
  SparklesIcon,
  CalculatorIcon,
  InfoIcon,
  MinusIcon,
  PlusIcon,
  DownloadIcon,
  FileTextIcon,
  ThermometerIcon,
  DropletsIcon,
  RotateCcwIcon,
  ThumbsUpIcon,
  SmartphoneIcon,
  WifiIcon,
  BatteryIcon,
  VolumeXIcon,
  CogIcon,
  RefreshCwIcon,
  ImageIcon,
  ArrowUpRightIcon
} from 'lucide-react';

// ============================================
// Product Data for LuxDrape Drapery
// ============================================
const productData = {
  id: 'lux-drapery-1',
  name: 'Custom Pinch Pleat Drapery',
  description: 'Elevate your space with our premium custom drapery. Handcrafted from luxurious fabrics with precision pleating for a tailored look. Each panel is made to your exact specifications, featuring professional-quality construction and finish.',
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
    'High-temperature steaming available',
    'Easy installation hardware included'
  ],
  colors: [
    { id: 'ivory', name: 'Ivory Linen', hex: '#FFFFF0', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/908556c7998b43c388eedade2bd694e3_ve_miaoda' },
    { id: 'oatmeal', name: 'Oatmeal', hex: '#D4C5B5', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/4404b45f35da473c8fc6f026d2c13f56_ve_miaoda' },
    { id: 'charcoal', name: 'Charcoal Gray', hex: '#36454F', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/34013fff634f414ea6ff57ba2c97cf2b_ve_miaoda' },
    { id: 'navy', name: 'Navy Blue', hex: '#1B2838', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/71c5a08726ba4857a88b02903542fc08_ve_miaoda' },
    { id: 'sage', name: 'Sage Green', hex: '#9CAF88', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda' },
    { id: 'blush', name: 'Blush Pink', hex: '#DE9D9D', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/e91d92a772ee4f6bb46cd960193349f7_ve_miaoda' },
  ],
  images: [
    { id: '1', url: 'https://luxdrape.com/cdn/shop/files/florence_pleated_ivory_white.jpg?v=1771059728&width=768', alt: 'Elegant drapery in living room' },
    { id: '2', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda', alt: 'Pleat header styles comparison' },
    { id: '3', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/374fd1c04ee445b2a6f8e62b5b3933ea_ve_miaoda', alt: 'Fabric detail close-up' },
    { id: '4', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/e91d92a772ee4f6bb46cd960193349f7_ve_miaoda', alt: 'Tie back styles' },
  ],
};

// Header Styles Data
const headerStyles = [
  { id: 'pinch-pleat', name: 'Pinch Pleat', fullness: '200%', price: 0, description: 'Classic single-pinch design, elegant and timeless', preview: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda', features: ['Single fold pinch', '200% fabric fullness', 'Works with traverse rod or rings'] },
  { id: 'triple-pleat', name: 'Triple Pleat', fullness: '250%', price: 35, description: 'Three-finger pinch for maximum fullness and luxury', preview: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda', features: ['Three-finger pleats', '250% fabric fullness', 'Most luxurious appearance'] },
  { id: 'tailor-pleat', name: 'Tailor Pleat', fullness: '180%', price: 25, description: 'Modern streamlined look with tailored precision', preview: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda', features: ['Flat tailored top', '180% fabric fullness', 'Contemporary clean aesthetic'] },
];

// Lining Options
const liningOptions = [
  { id: 'unlined', name: 'Unlined', price: 0, description: 'Light and airy, shows fabric texture' },
  { id: 'standard', name: 'Standard Lining', price: 45, description: 'Medium weight, provides privacy and light filtering' },
  { id: 'blackout', name: 'Blackout Lining', price: 75, description: 'Blocks 99% of light, thermal insulation' },
  { id: 'interlined', name: 'Interlined', price: 95, description: 'Adds body and luxury, superior insulation' },
];

// Tie Back Options
const tieBackOptions = [
  { id: 'none', name: 'No Tie Backs', price: 0, description: 'Clean, straight hanging panels' },
  { id: 'matching', name: 'Matching Fabric Tie Backs', price: 29, description: 'Made from the same fabric as your drapery', preview: 'https://miaoda.feishu.cn/aily/api/v1/files/static/e91d92a772ee4f6bb46cd960193349f7_ve_miaoda' },
  { id: 'rope', name: 'Decorative Rope Tie Backs', price: 39, description: 'Elegant braided rope with tassels' },
];

// Steaming Options
const steamingOptions = [
  { id: 'none', name: 'Standard Finish', price: 0, description: 'Professional pressing only', note: 'Recommended for most fabrics' },
  { id: 'premium', name: 'Premium Steaming', price: 49, description: 'High-temperature steam treatment for crisp, wrinkle-free finish', note: 'Maximum size: 120" width × 108" height', sizeLimit: { maxWidth: 120, maxHeight: 108 } },
];

// Fabric Swatches
const fabricSwatches = [
  { id: 'swatch-1', name: 'Ivory Linen', color: '#FFFFF0', material: 'Linen Blend' },
  { id: 'swatch-2', name: 'Oatmeal', color: '#D4C5B5', material: 'Linen/Cotton' },
  { id: 'swatch-3', name: 'Charcoal', color: '#36454F', material: 'Cotton Sateen' },
  { id: 'swatch-4', name: 'Navy', color: '#1B2838', material: 'Velvet' },
  { id: 'swatch-5', name: 'Sage', color: '#9CAF88', material: 'Linen Blend' },
  { id: 'swatch-6', name: 'Blush', color: '#DE9D9D', material: 'Cotton Sateen' },
];

// Reviews
const reviewsData = [
  { id: '1', author: 'Sarah M.', rating: 5, date: '2024-02-20', title: 'Absolutely stunning!', content: 'The triple pleat drapes transformed my living room. The quality is exceptional and the steaming service made them hang perfectly.', verified: true, helpful: 32 },
  { id: '2', author: 'Michael R.', rating: 5, date: '2024-02-15', title: 'Worth every penny', content: 'Custom drapes that look like they came from a high-end design showroom. The ordering process was easy and the tie backs are a perfect addition.', verified: true, helpful: 28 },
  { id: '3', author: 'Jennifer L.', rating: 5, date: '2024-02-10', title: 'Perfect fit', content: 'Ordered swatches first which helped me choose the right color. The pinch pleat style is classic and elegant.', verified: true, helpful: 24 },
];

// Real Life Gallery Images
const galleryImages = [
  { id: '1', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda', alt: 'Customer living room with cream drapery', customer: 'Emma T.', location: 'Los Angeles, CA' },
  { id: '2', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda', alt: 'Customer bedroom with charcoal drapes', customer: 'David K.', location: 'New York, NY' },
  { id: '3', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda', alt: 'Customer dining room with sage curtains', customer: 'Michelle L.', location: 'Chicago, IL' },
  { id: '4', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda', alt: 'Customer nursery with blush drapery', customer: 'Rachel M.', location: 'Seattle, WA' },
  { id: '5', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/175e3a9252f44ba7890cc2631f892e5d_ve_miaoda', alt: 'Customer home office with navy velvet', customer: 'James P.', location: 'Austin, TX' },
  { id: '6', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/be670cd2b29a4879b9cdd5817a0a2448_ve_miaoda', alt: 'Customer minimalist living room', customer: 'Lisa W.', location: 'Denver, CO' },
];

// ============================================
// Step Indicator Component
// ============================================
const StepIndicator: React.FC<{ steps: string[]; currentStep: number; onStepClick?: (step: number) => void }> = ({ steps, currentStep, onStepClick }) => (
  <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
    {steps.map((step, idx) => (
      <React.Fragment key={idx}>
        <button onClick={() => onStepClick?.(idx)} className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${idx === currentStep ? 'bg-primary text-primary-foreground' : idx < currentStep ? 'bg-primary/20 text-primary' : 'bg-accent text-muted-foreground hover:bg-accent/80'}`}>
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${idx === currentStep ? 'bg-primary-foreground text-primary' : idx < currentStep ? 'bg-primary text-primary-foreground' : 'bg-border text-muted-foreground'}`}>
            {idx < currentStep ? <CheckIcon className="w-3 h-3" /> : idx + 1}
          </span>
          {step}
        </button>
        {idx < steps.length - 1 && <ChevronRightIcon className="w-4 h-4 text-muted-foreground shrink-0" />}
      </React.Fragment>
    ))}
  </div>
);

// ============================================
// Measurement Calculator Component
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
    <div className="bg-accent/30 rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-2">
        <CalculatorIcon className="w-4 h-4 text-primary" />
        <span className="font-medium text-sm">Panel Size Calculator</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Window Width (in)</Label>
          <Input type="number" value={windowWidth} onChange={(e) => { setWindowWidth(e.target.value); setShowResult(false); }} placeholder="72" className="h-9" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Window Height (in)</Label>
          <Input type="number" value={windowHeight} onChange={(e) => { setWindowHeight(e.target.value); setShowResult(false); }} placeholder="84" className="h-9" />
        </div>
      </div>
      <Button onClick={calculateDimensions} size="sm" className="w-full rounded-full" disabled={!windowWidth || !windowHeight}>Calculate Panel Size</Button>
      {showResult && (
        <div className="bg-primary/10 rounded-lg p-3 space-y-2 text-xs">
          <div className="flex justify-between"><span className="text-muted-foreground">Per Panel:</span><span className="font-medium">{width}&quot; W × {height}&quot; H</span></div>
          <p className="text-muted-foreground">We added 8&quot; per side for coverage and 4&quot; to height for header/hem.</p>
        </div>
      )}
    </div>
  );
};

// ============================================
// Difficulty Meter Component
// ============================================
const DifficultyMeter: React.FC = () => (
  <div className="bg-accent/30 rounded-xl p-4">
    <div className="flex items-start gap-3">
      <div className="relative w-12 h-12 shrink-0">
        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" className="text-border/30" />
          <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="33 100" strokeLinecap="round" className="text-primary" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center"><span className="text-base font-bold text-primary">1</span></div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-primary text-sm">Level 1: Easy</span>
          <span className="text-muted-foreground text-xs">• 15-20 min</span>
        </div>
        <p className="text-sm font-medium text-foreground mb-2">You got this!</p>
        <div className="flex flex-wrap gap-1">
          {['Screwdriver', 'Drill', 'Level', 'Pencil'].map((tool, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-background rounded-full text-xs text-muted-foreground border border-border">{tool}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ============================================
// Tutorial Hub Component
// ============================================
const TutorialHub: React.FC = () => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <WrenchIcon className="w-4 h-4 text-primary" />
      <span className="font-medium text-sm">Installation Resources</span>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Card className="rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <div className="relative aspect-video bg-accent">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center"><PlayIcon className="w-4 h-4 text-primary-foreground ml-0.5" /></div>
          </div>
        </div>
        <CardContent className="p-2"><p className="text-xs font-medium">Installation Video</p><p className="text-[10px] text-muted-foreground">2 min guide</p></CardContent>
      </Card>
      <div className="space-y-2">
        <Card className="rounded-lg hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-2 flex items-center gap-2">
            <FileTextIcon className="w-4 h-4 text-primary" />
            <div className="flex-1"><p className="text-xs font-medium">Measuring Guide</p><p className="text-[10px] text-muted-foreground">PDF</p></div>
            <DownloadIcon className="w-3 h-3 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card className="rounded-lg hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-2 flex items-center gap-2">
            <FileTextIcon className="w-4 h-4 text-primary" />
            <div className="flex-1"><p className="text-xs font-medium">Install Manual</p><p className="text-[10px] text-muted-foreground">PDF</p></div>
            <DownloadIcon className="w-3 h-3 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

// ============================================
// Real Life Gallery (Masonry Layout)
// ============================================
const RealLifeGallery: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-primary" />
        <h3 className="font-serif text-xl font-semibold">Real-Life Gallery</h3>
      </div>
      <Badge variant="secondary" className="rounded-full">Customer Photos</Badge>
    </div>
    <p className="text-muted-foreground text-sm">See how LuxDrape transforms real homes. All photos submitted by our amazing customers.</p>
    
    {/* Masonry Grid */}
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {galleryImages.map((img, idx) => (
        <div key={img.id} className="break-inside-avoid">
          <div className={`relative rounded-2xl overflow-hidden group cursor-pointer ${idx === 0 || idx === 3 ? 'aspect-[3/4]' : idx === 1 || idx === 4 ? 'aspect-[4/3]' : 'aspect-square'}`}>
            <Image src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{img.customer}</p>
                    <p className="text-xs opacity-80">{img.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    <div className="text-center pt-4">
      <Button variant="outline" className="rounded-full">
        <ThumbsUpIcon className="w-4 h-4 mr-2" />
        Share Your Photos
      </Button>
      <p className="text-xs text-muted-foreground mt-2">Tag @LuxDrape and get 10% off your next order</p>
    </div>
  </div>
);

// ============================================
// Main Product Page Component
// ============================================
const ProductDetailLuxV2Page: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedHeaderStyle, setSelectedHeaderStyle] = useState(headerStyles[0]);
  const [selectedLining, setSelectedLining] = useState(liningOptions[1]);
  const [selectedTieBack, setSelectedTieBack] = useState(tieBackOptions[0]);
  const [selectedSteaming, setSelectedSteaming] = useState(steamingOptions[0]);
  const [width, setWidth] = useState('50');
  const [height, setHeight] = useState('84');
  const [quantity, setQuantity] = useState(2);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isSwatchDialogOpen, setIsSwatchDialogOpen] = useState(false);

  const steps = ['Color', 'Header Style', 'Dimensions', 'Lining', 'Tie Backs', 'Finishing'];

  // Check if steaming is available for current dimensions
  const isSteamingAvailable = useMemo(() => {
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    return w <= 120 && h <= 108;
  }, [width, height]);

  // Calculate total price
  const totalPrice = useMemo(() => {
    const basePrice = productData.basePrice;
    const headerPrice = selectedHeaderStyle.price;
    const liningPrice = selectedLining.price;
    const tieBackPrice = selectedTieBack.price * quantity;
    const steamingPrice = selectedSteaming.id === 'premium' && isSteamingAvailable ? selectedSteaming.price : 0;
    
    const widthValue = parseFloat(width) || 50;
    const heightValue = parseFloat(height) || 84;
    const sizeMultiplier = (widthValue * heightValue) / (50 * 84);
    
    const unitPrice = (basePrice + headerPrice + liningPrice) * Math.max(sizeMultiplier, 0.7);
    return Math.round((unitPrice * quantity) + tieBackPrice + steamingPrice);
  }, [selectedHeaderStyle, selectedLining, selectedTieBack, selectedSteaming, width, height, quantity, isSteamingAvailable]);

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
    toast.success('Added to cart!', { description: `${quantity} × ${productData.name} - ${selectedColor.name}` });
  };

  return (
    <div className="w-full space-y-0 pb-16 bg-[#ffffff]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={() => navigate('/')} className="hover:text-foreground transition-colors">Home</button>
          <ChevronRightIcon className="w-4 h-4" />
          <button onClick={() => navigate('/shop')} className="hover:text-foreground transition-colors">Drapery</button>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-foreground">Custom Pinch Pleat</span>
        </nav>
      </div>

      {/* Product Main Section - Customization Options */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] bg-accent rounded-2xl overflow-hidden">
              <Image src={productData.images[currentImageIndex].url} alt={productData.images[currentImageIndex].alt} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <Badge className="rounded-full text-xs font-medium bg-primary text-primary-foreground border-0">
                  <AwardIcon className="w-3 h-3 mr-1" />
                  Custom Made
                </Badge>
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

          {/* Product Info & Customization */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="rounded-full text-xs font-medium text-primary border-primary/30">
                  <SparklesIcon className="w-3 h-3 mr-1" />
                  Made to Order
                </Badge>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight">{productData.name}</h1>
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
                <span className="text-lg text-muted-foreground">for {quantity} panels</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary">
                <TruckIcon className="w-4 h-4" />
                <span>FREE Shipping on orders over $200</span>
              </div>
            </div>

            <Separator />

            {/* Step Indicator */}
            <StepIndicator steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />

            {/* Step 1: Color Selection */}
            {currentStep === 0 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">Select Fabric Color</Label>
                    <p className="text-sm text-muted-foreground">Current: {selectedColor.name}</p>
                  </div>
                  <button onClick={() => setIsSwatchDialogOpen(true)} className="text-xs text-primary hover:underline flex items-center gap-1">
                    <PackageIcon className="w-3 h-3" />
                    Free Swatches
                  </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {productData.colors.map((color) => (
                    <button key={color.id} onClick={() => setSelectedColor(color)} className={`relative aspect-square rounded-xl border-2 transition-all ${selectedColor.id === color.id ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-border hover:border-muted-foreground'}`} style={{ backgroundColor: color.hex }} title={color.name}>
                      {selectedColor.id === color.id && (
                        <CheckIcon className={`absolute inset-0 m-auto w-5 h-5 ${['#FFFFF0', '#F5F0E6', '#DE9D9D'].includes(color.hex) ? 'text-foreground' : 'text-white'} drop-shadow-md`} />
                      )}
                    </button>
                  ))}
                </div>
                <div className="p-3 bg-accent/30 rounded-xl flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-border">
                    <Image src="https://miaoda.feishu.cn/aily/api/v1/files/static/323d2b04633e42088ff6fb19e300a7fe_ve_miaoda" alt="Swatches" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Not sure about the color?</p>
                    <p className="text-xs text-muted-foreground">Order free fabric swatches to see in your space</p>
                  </div>
                  <Button size="sm" variant="outline" className="rounded-full" onClick={() => setIsSwatchDialogOpen(true)}>Order</Button>
                </div>
              </div>
            )}

            {/* Step 2: Header Style */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <Label className="text-base font-semibold">Select Header Style</Label>
                  <p className="text-sm text-muted-foreground">Determines how drapes attach to rod & overall fullness</p>
                </div>
                <RadioGroup value={selectedHeaderStyle.id} onValueChange={(val) => { const style = headerStyles.find(s => s.id === val); if (style) setSelectedHeaderStyle(style); }}>
                  <div className="grid gap-3">
                    {headerStyles.map((style) => (
                      <div key={style.id}>
                        <RadioGroupItem value={style.id} id={style.id} className="peer sr-only" />
                        <Label htmlFor={style.id} className="flex items-start gap-4 p-4 rounded-xl border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-muted-foreground">
                          <div className="w-20 h-12 rounded-lg overflow-hidden bg-accent shrink-0">
                            <Image src={style.preview} alt={style.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{style.name}</span>
                              <span className="text-sm">{style.price > 0 ? `+$${style.price}` : 'Included'}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{style.description}</p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary" className="rounded-full text-[10px] py-0">Fullness: {style.fullness}</Badge>
                              {style.features.slice(0, 2).map((f, i) => (
                                <Badge key={i} variant="outline" className="rounded-full text-[10px] py-0 border-border">{f}</Badge>
                              ))}
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 3: Dimensions */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <Label className="text-base font-semibold">Enter Dimensions</Label>
                  <p className="text-sm text-muted-foreground">Enter dimensions for a <strong>single panel</strong> (not pair)</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Width (per panel)</Label>
                    <div className="relative">
                      <Input type="number" step="0.5" value={width} onChange={(e) => setWidth(e.target.value)} className="h-12 pr-10" placeholder="50" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">in</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Height</Label>
                    <div className="relative">
                      <Input type="number" step="0.5" value={height} onChange={(e) => setHeight(e.target.value)} className="h-12 pr-10" placeholder="84" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">in</span>
                    </div>
                  </div>
                </div>
                <MeasurementCalculator width={width} height={height} onWidthChange={setWidth} onHeightChange={setHeight} />
                <div className="flex items-center gap-2 p-3 bg-accent/30 rounded-lg text-xs text-muted-foreground">
                  <InfoIcon className="w-4 h-4 text-primary shrink-0" />
                  <span>For a pair of panels, order 2 panels. Each panel will be made to the dimensions above.</span>
                </div>
              </div>
            )}

            {/* Step 4: Lining */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <Label className="text-base font-semibold">Select Lining</Label>
                  <p className="text-sm text-muted-foreground">Affects light control, privacy, and draping quality</p>
                </div>
                <RadioGroup value={selectedLining.id} onValueChange={(val) => { const lining = liningOptions.find(l => l.id === val); if (lining) setSelectedLining(lining); }}>
                  <div className="grid gap-3">
                    {liningOptions.map((lining) => (
                      <div key={lining.id}>
                        <RadioGroupItem value={lining.id} id={`lining-${lining.id}`} className="peer sr-only" />
                        <Label htmlFor={`lining-${lining.id}`} className="flex items-center justify-between p-4 rounded-xl border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-muted-foreground">
                          <div>
                            <span className="font-medium">{lining.name}</span>
                            <p className="text-xs text-muted-foreground mt-0.5">{lining.description}</p>
                          </div>
                          <span className="text-sm font-medium">{lining.price > 0 ? `+$${lining.price}` : 'Included'}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 5: Tie Backs */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <Label className="text-base font-semibold">Add Tie Backs</Label>
                  <p className="text-sm text-muted-foreground">Optional decorative holdbacks for your drapery</p>
                </div>
                <RadioGroup value={selectedTieBack.id} onValueChange={(val) => { const tieBack = tieBackOptions.find(t => t.id === val); if (tieBack) setSelectedTieBack(tieBack); }}>
                  <div className="grid gap-3">
                    {tieBackOptions.map((tieBack) => (
                      <div key={tieBack.id}>
                        <RadioGroupItem value={tieBack.id} id={`tieback-${tieBack.id}`} className="peer sr-only" />
                        <Label htmlFor={`tieback-${tieBack.id}`} className="flex items-center gap-4 p-4 rounded-xl border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-muted-foreground">
                          {tieBack.preview && (
                            <div className="w-16 h-12 rounded-lg overflow-hidden bg-accent shrink-0">
                              <Image src={tieBack.preview} alt={tieBack.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{tieBack.name}</span>
                              <span className="text-sm">{tieBack.price > 0 ? `+$${tieBack.price}/set` : 'No extra'}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">{tieBack.description}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 6: Steaming/Finishing */}
            {currentStep === 5 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <Label className="text-base font-semibold">Finishing Options</Label>
                  <p className="text-sm text-muted-foreground">Professional finishing touches for your drapery</p>
                </div>
                <RadioGroup value={selectedSteaming.id} onValueChange={(val) => { const steaming = steamingOptions.find(s => s.id === val); if (steaming) setSelectedSteaming(steaming); }}>
                  <div className="grid gap-3">
                    {steamingOptions.map((steaming) => {
                      const isDisabled = steaming.id === 'premium' && !isSteamingAvailable;
                      return (
                        <div key={steaming.id}>
                          <RadioGroupItem value={steaming.id} id={`steaming-${steaming.id}`} className="peer sr-only" disabled={isDisabled} />
                          <Label htmlFor={`steaming-${steaming.id}`} className={`flex items-start gap-4 p-4 rounded-xl border-2 border-border transition-all ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-muted-foreground'}`}>
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${steaming.id === 'premium' ? 'bg-primary/10' : 'bg-accent'}`}>
                              {steaming.id === 'premium' ? <ThermometerIcon className="w-5 h-5 text-primary" /> : <CheckIcon className="w-5 h-5 text-muted-foreground" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">{steaming.name}</span>
                                <span className="text-sm">{steaming.price > 0 ? `+$${steaming.price}` : 'Included'}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{steaming.description}</p>
                              {steaming.note && (
                                <div className={`mt-2 flex items-center gap-1.5 text-xs ${isDisabled ? 'text-destructive' : 'text-primary'}`}>
                                  <InfoIcon className="w-3 h-3" />
                                  <span>{steaming.note}</span>
                                </div>
                              )}
                            </div>
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
                {!isSteamingAvailable && (
                  <div className="p-3 bg-accent/30 rounded-lg text-xs text-muted-foreground">
                    <strong>Note:</strong> Premium steaming is not available for panels over 120&quot; wide or 108&quot; high. Your current dimensions: {width}&quot; × {height}&quot;
                  </div>
                )}
              </div>
            )}

            <Separator />

            {/* Quantity & Navigation */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Number of Panels</Label>
                  <p className="text-xs text-muted-foreground">Order 2 for a standard pair</p>
                </div>
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

              {/* Step Navigation */}
              <div className="flex gap-3">
                {currentStep > 0 && (
                  <Button variant="outline" className="flex-1 rounded-full" onClick={() => setCurrentStep(currentStep - 1)}>
                    <ChevronLeftIcon className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                )}
                {currentStep < steps.length - 1 ? (
                  <Button className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setCurrentStep(currentStep + 1)}>
                    Next Step
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button size="lg" className="flex-1 h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium" onClick={handleAddToCart}>
                    Add to Cart - ${totalPrice}
                  </Button>
                )}
              </div>

              {/* Quick Add */}
              {currentStep < steps.length - 1 && (
                <button onClick={handleAddToCart} className="w-full text-center text-sm text-primary hover:underline py-2">
                  Skip to Add to Cart - ${totalPrice}
                </button>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 py-2">
              <div className="flex flex-col items-center text-center gap-1 p-3 rounded-xl bg-accent/30">
                <LeafIcon className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">Premium<br/>Fabrics</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1 p-3 rounded-xl bg-accent/30">
                <ShieldCheckIcon className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">Quality<br/>Guaranteed</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1 p-3 rounded-xl bg-accent/30">
                <TruckIcon className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">Free<br/>Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* Product Information Sections - Accordion */}
      {/* ============================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="space-y-12">
          
          {/* Measurement & Installation */}
          <div className="border-b border-border pb-12">
            <div className="flex items-center gap-2 mb-6">
              <RulerIcon className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-xl font-semibold">Measurement & Installation</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DifficultyMeter />
              <TutorialHub />
            </div>
          </div>

          {/* Detailed Information Accordion */}
          <div className="border-b border-border pb-12">
            <Accordion type="multiple" defaultValue={['care', 'returns', 'safety', 'motorized']} className="w-full space-y-4">
              
              {/* Care Instructions */}
              <AccordionItem value="care" className="border border-border rounded-2xl px-6 data-[state=open]:bg-accent/20">
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <DropletsIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium text-base">Care Instructions</span>
                      <p className="text-xs text-muted-foreground font-normal">How to maintain your custom drapery</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-[52px]">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          <CheckIcon className="w-4 h-4 text-primary" />
                          Regular Maintenance
                        </h4>
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          <li>• Vacuum gently using brush attachment monthly</li>
                          <li>• Dust with feather duster or microfiber cloth</li>
                          <li>• Shake panels gently to remove dust particles</li>
                          <li>• Rotate panels periodically for even sun exposure</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          <DropletsIcon className="w-4 h-4 text-primary" />
                          Spot Cleaning
                        </h4>
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          <li>• Blot spills immediately with clean white cloth</li>
                          <li>• Use mild soap and lukewarm water for stains</li>
                          <li>• Test cleaning solution on hidden area first</li>
                          <li>• Air dry completely before closing</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          <ThermometerIcon className="w-4 h-4 text-primary" />
                          Professional Cleaning
                        </h4>
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          <li>• Dry clean recommended for best results</li>
                          <li>• Frequency: Every 2-3 years or as needed</li>
                          <li>• Use reputable cleaner experienced with drapes</li>
                          <li>• Re-hang immediately after cleaning</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-accent/30 rounded-xl">
                        <p className="text-sm font-medium mb-1">Important Note</p>
                        <p className="text-xs text-muted-foreground">Do not machine wash or tumble dry. High heat can damage fabric and lining. Blackout lining requires special care.</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Returns & Policy */}
              <AccordionItem value="returns" className="border border-border rounded-2xl px-6 data-[state=open]:bg-accent/20">
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <RotateCcwIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium text-base">Returns & Warranty Policy</span>
                      <p className="text-xs text-muted-foreground font-normal">Custom product protection & shipping coverage</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-[52px]">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          <ShieldCheckIcon className="w-4 h-4 text-primary" />
                          3-Year Limited Warranty
                        </h4>
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          <li>• Covers manufacturing defects in materials and workmanship</li>
                          <li>• Includes header construction, stitching, and lining attachment</li>
                          <li>• Hardware components covered for 1 year</li>
                          <li>• Normal wear and tear not covered</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          <TruckIcon className="w-4 h-4 text-primary" />
                          Shipping Damage Protection
                        </h4>
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          <li>• Inspect package immediately upon receipt</li>
                          <li>• Report damage within 48 hours with photos</li>
                          <li>• We will expedite replacement at no cost</li>
                          <li>• Keep original packaging for inspection</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          <InfoIcon className="w-4 h-4 text-primary" />
                          Custom Product Policy
                        </h4>
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          <li>• Custom orders cannot be returned for size/color preferences</li>
                          <li>• Measurement errors by customer not covered</li>
                          <li>• Fabric swatches recommended before ordering</li>
                          <li>• Production begins within 24 hours of order</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                        <p className="text-sm font-medium text-primary mb-1">Quality Guarantee</p>
                        <p className="text-xs text-muted-foreground">If your drapes arrive with defects or incorrect specifications based on your order, we will remake them free of charge. Contact our customer care team within 14 days.</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Cordless Safety */}
              <AccordionItem value="safety" className="border border-border rounded-2xl px-6 data-[state=open]:bg-accent/20">
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <BabyIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium text-base">Cordless Safety Features</span>
                      <p className="text-xs text-muted-foreground font-normal">Child-safe design certification & features</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="pl-[52px] space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="rounded-xl bg-accent/30 border-0">
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                            <ShieldIcon className="w-6 h-6 text-primary" />
                          </div>
                          <h4 className="font-medium text-sm mb-1">WCSC Certified</h4>
                          <p className="text-xs text-muted-foreground">Meets all Window Covering Safety Council standards for child safety</p>
                        </CardContent>
                      </Card>
                      <Card className="rounded-xl bg-accent/30 border-0">
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                            <VolumeXIcon className="w-6 h-6 text-primary" />
                          </div>
                          <h4 className="font-medium text-sm mb-1">Zero Exposed Cords</h4>
                          <p className="text-xs text-muted-foreground">Completely cordless design eliminates strangulation hazard</p>
                        </CardContent>
                      </Card>
                      <Card className="rounded-xl bg-accent/30 border-0">
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                            <HandHelpingIcon className="w-6 h-6 text-primary" />
                          </div>
                          <h4 className="font-medium text-sm mb-1">Smooth Operation</h4>
                          <p className="text-xs text-muted-foreground">Effortless wand or push-pull operation safe for little hands</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                      <div className="flex items-start gap-3">
                        <AwardIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Best for Kids™ Certified</p>
                          <p className="text-xs text-muted-foreground mt-1">Our cordless drapery systems have been independently tested and certified by the Window Covering Safety Council as safe for use in homes with children and pets. The cordless design completely eliminates the risk of cord strangulation.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Motorized Options */}
              <AccordionItem value="motorized" className="border border-border rounded-2xl px-6 data-[state=open]:bg-accent/20">
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <ZapIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium text-base">Motorized Upgrade Options</span>
                      <p className="text-xs text-muted-foreground font-normal">Smart home integration & automation</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="pl-[52px] space-y-6">
                    {/* Motorized Features Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-accent/30 rounded-xl">
                        <VolumeXIcon className="w-8 h-8 text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium">Whisper Quiet</p>
                        <p className="text-xs text-muted-foreground">&lt;35dB operation</p>
                      </div>
                      <div className="text-center p-4 bg-accent/30 rounded-xl">
                        <BatteryIcon className="w-8 h-8 text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium">Long Battery</p>
                        <p className="text-xs text-muted-foreground">Up to 6 months</p>
                      </div>
                      <div className="text-center p-4 bg-accent/30 rounded-xl">
                        <WifiIcon className="w-8 h-8 text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium">Smart Home</p>
                        <p className="text-xs text-muted-foreground">Alexa/Google ready</p>
                      </div>
                      <div className="text-center p-4 bg-accent/30 rounded-xl">
                        <SmartphoneIcon className="w-8 h-8 text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium">App Control</p>
                        <p className="text-xs text-muted-foreground">iOS & Android</p>
                      </div>
                    </div>

                    {/* Motor Options */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Available Motor Systems</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Card className="rounded-xl border-border hover:border-primary/50 transition-colors cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <BatteryIcon className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium">Rechargeable Motor</span>
                                  <span className="text-sm text-primary">+$149/panel</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Built-in lithium battery, USB-C charging, 6-month battery life. No electrician needed.</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="rounded-xl border-border hover:border-primary/50 transition-colors cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <ZapIcon className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium">Wired Motor</span>
                                  <span className="text-sm text-primary">+$199/panel</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Hardwired power connection, continuous operation, professional installation recommended.</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Smart Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-start gap-3">
                        <CogIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Schedule & Automation</p>
                          <p className="text-xs text-muted-foreground">Set daily schedules, sunrise/sunset automation, and vacation mode</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <RefreshCwIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Scene Integration</p>
                          <p className="text-xs text-muted-foreground">Works with Apple HomeKit, Google Home, Amazon Alexa, and SmartThings</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <ShieldCheckIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Child Safety Lock</p>
                          <p className="text-xs text-muted-foreground">App-controlled lock prevents accidental operation by children</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-accent/30 rounded-xl">
                      <p className="text-sm font-medium mb-2">Remote & Wall Switch Included</p>
                      <p className="text-xs text-muted-foreground">Every motorized system includes a handheld remote (controls up to 5 channels) and a wireless wall switch that can be mounted anywhere. Additional remotes and switches available.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </div>

          {/* Specifications */}
          <div className="border-b border-border pb-12">
            <div className="flex items-center gap-2 mb-6">
              <InfoIcon className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-xl font-semibold">Specifications</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
              {[
                { label: 'Materials', value: 'Premium Linen Blend, Cotton Sateen, Velvet' },
                { label: 'Min/Max Width', value: '24" - 144" per panel' },
                { label: 'Min/Max Height', value: '24" - 120"' },
                { label: 'Header Options', value: 'Pinch Pleat, Triple Pleat, Tailor Pleat' },
                { label: 'Lining Options', value: 'Unlined, Standard, Blackout, Interlined' },
                { label: 'Hardware Included', value: 'Rings, hooks, and installation hardware' },
                { label: 'Warranty', value: '3 Year Limited' },
                { label: 'Production Time', value: '10-14 business days' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground text-sm">{item.label}</span>
                  <span className="font-medium text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Real-Life Gallery (Masonry) */}
          <div className="border-b border-border pb-12">
            <RealLifeGallery />
          </div>

          {/* Reviews */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <StarIcon className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-xl font-semibold">Reviews ({productData.reviewCount})</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-accent/30 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-foreground">{productData.rating}</div>
                <div className="flex justify-center gap-1 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(productData.rating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">Based on {productData.reviewCount} reviews</div>
              </div>
              <div className="md:col-span-2 space-y-3">
                {reviewsData.map((review) => (
                  <Card key={review.id} className="rounded-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                          <UserIcon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{review.author}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-2.5 h-2.5 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted'}`} />)}</div>
                            <span>{review.date}</span>
                          </div>
                        </div>
                        {review.verified && <Badge variant="secondary" className="rounded-full text-[10px] ml-auto"><CheckIcon className="w-2 h-2 mr-0.5" />Verified</Badge>}
                      </div>
                      <h4 className="font-medium text-sm mb-1">{review.title}</h4>
                      <p className="text-muted-foreground text-xs">{review.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Swatch Dialog */}
      <Dialog open={isSwatchDialogOpen} onOpenChange={setIsSwatchDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif">Order Free Fabric Samples</DialogTitle>
            <DialogDescription>See and feel our fabrics in your home. Up to 10 free samples.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-3 gap-2">
              {fabricSwatches.map((swatch) => (
                <div key={swatch.id} className="p-2 rounded-lg border border-border text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="w-full h-10 rounded mb-1" style={{ backgroundColor: swatch.color }} />
                  <p className="text-[10px] font-medium truncate">{swatch.name}</p>
                </div>
              ))}
            </div>
            <div className="bg-accent/30 rounded-lg p-3 flex items-center gap-3">
              <TruckIcon className="w-4 h-4 text-primary" />
              <div className="text-xs"><span className="font-medium">FREE Shipping</span> • Arrives in 3-5 days</div>
            </div>
            <Button className="w-full rounded-full" onClick={() => { toast.success('Samples added to cart!'); setIsSwatchDialogOpen(false); }}>Add 6 Samples to Cart</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailLuxV2Page;
