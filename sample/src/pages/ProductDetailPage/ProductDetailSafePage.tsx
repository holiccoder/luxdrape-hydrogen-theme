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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Image } from '@/components/ui/image';
import { toast } from 'sonner';
import { useCart } from '@/contexts/cart-context';
import {
  StarIcon,
  CheckIcon,
  RulerIcon,
  InfoIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  HeartIcon,
  Share2Icon,
  TruckIcon,
  ShieldCheckIcon,
  RotateCcwIcon,
  Star,
  MessageSquareIcon,
  ThumbsUpIcon,
  UserIcon,
  ClockIcon,
  PackageIcon,
  WrenchIcon,
  ShieldIcon,
  BabyIcon,
  LeafIcon,
  HandHelpingIcon,
  PlayIcon,
  VolumeXIcon,
  ZapIcon,
  AwardIcon,
  SparklesIcon,
  XIcon,
  PlusIcon,
  MinusIcon
} from 'lucide-react';

// Safe & Natural Product Data
const productData = {
  id: 'safe-1',
  name: 'Cordless Natural Woven Wood Shades',
  description: 'Handcrafted from sustainable bamboo and natural grasses, our Cordless Woven Wood Shades bring organic warmth to any room. Featuring our patented cordless lift system with built-in child safety mechanisms, these shades are certified by the Window Covering Safety Council. Each shade is uniquely woven by skilled artisans, showcasing the natural beauty of eco-friendly materials.',
  basePrice: 179.99,
  category: 'Woven Wood Shades',
  style: ['Natural', 'Eco-Friendly', 'Child-Safe'],
  materials: ['Sustainable Bamboo', 'Natural Grasses', 'Organic Jute'],
  rating: 4.9,
  reviewCount: 328,
  features: [
    '100% cordless - no exposed cords',
    'WCSC Certified Child-Safe Design',
    'Sustainably sourced natural materials',
    'Free fabric swatches',
    'Handwoven by artisans',
    'UV protection coating'
  ],
  colors: [
    { id: 'natural', name: 'Natural Bamboo', hex: '#C4A77D', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/908556c7998b43c388eedade2bd694e3_ve_miaoda' },
    { id: 'honey', name: 'Honey Oak', hex: '#D4A574', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/4404b45f35da473c8fc6f026d2c13f56_ve_miaoda' },
    { id: 'espresso', name: 'Dark Espresso', hex: '#4A3728', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/34013fff634f414ea6ff57ba2c97cf2b_ve_miaoda' },
    { id: 'driftwood', name: 'Driftwood Gray', hex: '#9B8B7A', image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/71c5a08726ba4857a88b02903542fc08_ve_miaoda' },
  ],
  images: [
    { id: '1', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/908556c7998b43c388eedade2bd694e3_ve_miaoda', alt: 'Natural woven wood shades in nursery' },
    { id: '2', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/aee074c0d7ac42a9b8d0f728977ee190_ve_miaoda', alt: 'Child-safe cordless mechanism detail' },
    { id: '3', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/374fd1c04ee445b2a6f8e62b5b3933ea_ve_miaoda', alt: 'Artisan handweaving process' },
    { id: '4', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d6e513cd18d543ba880d3432113b8457_ve_miaoda', alt: 'Natural shades in living room' },
  ],
  liningOptions: [
    { id: 'unlined', name: 'Unlined - Natural Light', price: 0, description: 'Beautiful filtered light, showcases natural texture' },
    { id: 'privacy', name: 'Privacy Lining', price: 25, description: 'Blocks visibility while maintaining warm glow' },
    { id: 'blackout', name: 'Blackout Lining', price: 45, description: 'Complete light blockage for nurseries and bedrooms' },
  ],
  safetyFeatures: [
    { icon: BabyIcon, title: 'Cordless Design', description: 'No exposed cords eliminates strangulation hazard' },
    { icon: ShieldIcon, title: 'WCSC Certified', description: 'Meets all Window Covering Safety Council standards' },
    { icon: HandHelpingIcon, title: 'Smooth-Lift System', description: 'Effortless operation safe for little hands' },
  ],
  materialStory: {
    origin: 'Sourced from sustainable bamboo forests in Southeast Asia',
    process: 'Hand-woven by skilled artisans using traditional techniques',
    time: 'Each shade takes 3-4 hours to complete',
    sustainability: 'Zero waste production, biodegradable materials'
  }
};

// Fabric Swatches Data
const fabricSwatches = [
  { id: 'swatch-1', name: 'Natural Bamboo', color: '#C4A77D', material: '100% Bamboo' },
  { id: 'swatch-2', name: 'Honey Oak', color: '#D4A574', material: 'Bamboo/Grass Blend' },
  { id: 'swatch-3', name: 'Driftwood', color: '#9B8B7A', material: 'Jute/Bamboo' },
  { id: 'swatch-4', name: 'Dark Espresso', color: '#4A3728', material: 'Stained Bamboo' },
  { id: 'swatch-5', name: 'Coastal White', color: '#F5F0E6', material: 'Bleached Bamboo' },
  { id: 'swatch-6', name: 'Sage Green', color: '#8FA68E', material: 'Natural Grass' },
];

// Mock reviews
const reviewsData = [
  { id: '1', author: 'Jennifer M.', rating: 5, date: '2024-02-20', title: 'Perfect for nursery!', content: 'Love that these are truly cordless. The natural texture is beautiful and the blackout lining works great for nap time.', verified: true, helpful: 32, image: null },
  { id: '2', author: 'David K.', rating: 5, date: '2024-02-15', title: 'Safe and beautiful', content: 'Ordered these specifically for child safety. The quality is outstanding and installation was straightforward.', verified: true, helpful: 28, image: null },
  { id: '3', author: 'Sarah L.', rating: 5, date: '2024-02-10', title: 'Eco-friendly choice', content: 'So happy to find sustainable window coverings. The swatches helped us pick the perfect color.', verified: true, helpful: 24, image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/323d2b04633e42088ff6fb19e300a7fe_ve_miaoda' },
];

// Motor Demo Animation Component
const MotorDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [shadePosition, setShadePosition] = useState(0); // 0 = fully down, 100 = fully up
  const [showSilentIndicator, setShowSilentIndicator] = useState(false);

  const animateShade = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setShowSilentIndicator(true);
    
    // Animate shade going up
    let pos = 0;
    const interval = setInterval(() => {
      pos += 2;
      setShadePosition(pos);
      if (pos >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Animate shade going down
          const downInterval = setInterval(() => {
            pos -= 2;
            setShadePosition(pos);
            if (pos <= 0) {
              clearInterval(downInterval);
              setIsPlaying(false);
              setTimeout(() => setShowSilentIndicator(false), 1000);
            }
          }, 30);
        }, 500);
      }
    }, 30);
  };

  return (
    <div className="bg-gradient-to-br from-accent/50 to-accent/30 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium flex items-center gap-2">
            <ZapIcon className="w-4 h-4 text-primary" />
            Motorized Operation Demo
          </h4>
          <p className="text-xs text-muted-foreground mt-1">Experience whisper-quiet operation</p>
        </div>
        <button
          onClick={animateShade}
          disabled={isPlaying}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {isPlaying ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Running...
            </>
          ) : (
            <>
              <PlayIcon className="w-4 h-4" />
              Play Demo
            </>
          )}
        </button>
      </div>

      {/* Animated Window */}
      <div className="relative bg-sky-100 rounded-xl overflow-hidden" style={{ height: '200px' }}>
        {/* Window Frame */}
        <div className="absolute inset-4 border-4 border-white rounded-lg overflow-hidden">
          {/* Sky Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-sky-100">
            {/* Clouds */}
            <div className="absolute top-4 left-8 w-16 h-8 bg-white/60 rounded-full" />
            <div className="absolute top-8 right-12 w-12 h-6 bg-white/40 rounded-full" />
          </div>
          
          {/* Animated Shade */}
          <div 
            className="absolute inset-x-0 top-0 bg-gradient-to-b from-amber-100 to-amber-50 transition-all duration-100 ease-linear shadow-inner"
            style={{ 
              height: `${100 - shadePosition}%`,
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 115, 85, 0.1) 2px, rgba(139, 115, 85, 0.1) 4px)'
            }}
          >
            {/* Shade Texture */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(139, 115, 85, 0.2) 8px, rgba(139, 115, 85, 0.2) 10px)`
            }} />
            {/* Bottom Rail */}
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-amber-200/80" />
          </div>

          {/* Silent Indicator */}
          {showSilentIndicator && (
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground animate-pulse">
              <VolumeXIcon className="w-3 h-3" />
              Whisper Quiet
            </div>
          )}
        </div>
      </div>

      {/* Motor Features */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 bg-background/50 rounded-lg">
          <VolumeXIcon className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-xs font-medium">&lt; 35dB</p>
          <p className="text-[10px] text-muted-foreground">Silent Operation</p>
        </div>
        <div className="text-center p-3 bg-background/50 rounded-lg">
          <ZapIcon className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-xs font-medium">Smart Home</p>
          <p className="text-[10px] text-muted-foreground">Alexa/Google Ready</p>
        </div>
        <div className="text-center p-3 bg-background/50 rounded-lg">
          <ClockIcon className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-xs font-medium">Schedules</p>
          <p className="text-[10px] text-muted-foreground">Automated Control</p>
        </div>
      </div>
    </div>
  );
};

// Swatch Order Dialog
const SwatchOrderDialog = ({ isOpen, onClose, selectedColor }: { isOpen: boolean; onClose: () => void; selectedColor: any }) => {
  const [selectedSwatches, setSelectedSwatches] = useState<string[]>([selectedColor?.id || 'swatch-1']);
  const [quantity, setQuantity] = useState(1);

  const toggleSwatch = (id: string) => {
    setSelectedSwatches(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleOrder = () => {
    toast.success('Swatches added to cart!', {
      description: `${selectedSwatches.length} fabric samples - FREE shipping`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif">Order Free Fabric Swatches</DialogTitle>
          <DialogDescription>
            See and feel our fabrics in your home before ordering. Up to 10 samples FREE.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          {/* Swatch Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Select Colors ({selectedSwatches.length}/10)</Label>
            <div className="grid grid-cols-3 gap-3">
              {fabricSwatches.map((swatch) => (
                <button
                  key={swatch.id}
                  onClick={() => toggleSwatch(swatch.id)}
                  className={`relative p-3 rounded-xl border-2 transition-all text-left ${
                    selectedSwatches.includes(swatch.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <div 
                    className="w-full h-12 rounded-lg mb-2 shadow-sm"
                    style={{ backgroundColor: swatch.color }}
                  />
                  <p className="text-xs font-medium truncate">{swatch.name}</p>
                  <p className="text-[10px] text-muted-foreground">{swatch.material}</p>
                  {selectedSwatches.includes(swatch.id) && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <CheckIcon className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-accent/30 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <TruckIcon className="w-4 h-4 text-primary" />
              <span className="font-medium">FREE Shipping</span>
              <span className="text-muted-foreground">- Arrives in 3-5 days</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcwIcon className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">No return needed - samples are yours to keep</span>
            </div>
          </div>

          {/* Action */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 rounded-full" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleOrder}
              disabled={selectedSwatches.length === 0}
            >
              Order {selectedSwatches.length} Swatches
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProductDetailSafePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedLining, setSelectedLining] = useState(productData.liningOptions[0]);
  const [width, setWidth] = useState('36');
  const [height, setHeight] = useState('48');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isSwatchDialogOpen, setIsSwatchDialogOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>('safety');

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
      dimensions: {
        width: parseFloat(width) || 36,
        height: parseFloat(height) || 48,
        unit: 'inches' as const,
      },
      lining: selectedLining.id as 'standard' | 'blackout' | 'thermal',
      mounting: 'cordless' as const,
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
      {/* Safety Banner */}
      <div className="w-full bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center gap-2 text-sm">
            <ShieldIcon className="w-4 h-4 text-emerald-600" />
            <span className="font-medium text-emerald-800">WCSC Certified Child-Safe Design</span>
            <span className="text-emerald-600 hidden sm:inline">— Cordless by default, safe for every room</span>
          </div>
        </div>
      </div>

      {/* Product Main Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] bg-accent rounded-2xl overflow-hidden">
              <Image
                src={productData.images[currentImageIndex].url}
                alt={productData.images[currentImageIndex].alt}
                className="w-full h-full object-cover"
              />
              {/* Safety Badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-emerald-500 text-white rounded-full text-xs font-medium flex items-center gap-1.5">
                <ShieldCheckIcon className="w-3.5 h-3.5" />
                Child-Safe
              </div>
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
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="rounded-full text-xs font-medium text-emerald-600 border-emerald-200 bg-emerald-50">
                  <LeafIcon className="w-3 h-3 mr-1" />
                  Eco-Friendly
                </Badge>
                <Badge variant="outline" className="rounded-full text-xs font-medium text-primary border-primary/30">
                  <AwardIcon className="w-3 h-3 mr-1" />
                  Best Seller
                </Badge>
              </div>
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

            {/* Swatch Order CTA */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                  <Image 
                    src="https://miaoda.feishu.cn/aily/api/v1/files/static/323d2b04633e42088ff6fb19e300a7fe_ve_miaoda" 
                    alt="Fabric swatches" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">Not sure which color?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Order up to 10 FREE fabric swatches to see the natural textures in your space.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full border-amber-300 text-amber-700 hover:bg-amber-100"
                    onClick={() => setIsSwatchDialogOpen(true)}
                  >
                    <PackageIcon className="w-4 h-4 mr-2" />
                    Order Free Swatches
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Color Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Natural Material: {selectedColor.name}</Label>
                <button 
                  onClick={() => setIsSwatchDialogOpen(true)}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <PackageIcon className="w-3 h-3" />
                  Get Free Swatch
                </button>
              </div>
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

            {/* Dimensions */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Dimensions (inches)</Label>
                <button className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                  <RulerIcon className="w-3 h-3" />
                  Measuring Guide
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

            {/* Lining Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Privacy Option</Label>
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

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 py-2">
              <div className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <BabyIcon className="w-5 h-5 text-emerald-600" />
                <span className="text-xs text-emerald-700">Child-Safe<br/>Cordless</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-amber-50 border border-amber-100">
                <LeafIcon className="w-5 h-5 text-amber-600" />
                <span className="text-xs text-amber-700">Sustainable<br/>Materials</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-blue-50 border border-blue-100">
                <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
                <span className="text-xs text-blue-700">Lifetime<br/>Warranty</span>
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

            {/* Sample Reminder */}
            <button 
              onClick={() => setIsSwatchDialogOpen(true)}
              className="w-full py-3 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2 border border-dashed border-border rounded-xl hover:border-primary/50"
            >
              <PackageIcon className="w-4 h-4" />
              Prefer to feel the fabric first? Order free swatches
            </button>
          </div>
        </div>
      </section>

      {/* Product Information Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Accordion type="single" collapsible className="w-full" value={openAccordion} onValueChange={setOpenAccordion}>
          
          {/* Child Safety Section */}
          <AccordionItem value="safety" className="border-b border-border">
            <AccordionTrigger className="py-4 text-lg font-serif font-semibold hover:no-underline">
              <div className="flex items-center gap-2">
                <ShieldIcon className="w-5 h-5 text-emerald-500" />
                Child Safety Certification
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-6">
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <div className="flex items-start gap-3">
                    <AwardIcon className="w-8 h-8 text-emerald-500 shrink-0" />
                    <div>
                      <h4 className="font-medium text-emerald-900">WCSC Certified Best for Kids™</h4>
                      <p className="text-sm text-emerald-700 mt-1">
                        Our cordless woven wood shades have been independently tested and certified by the Window Covering Safety Council 
                        as safe for homes with young children and pets.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {productData.safetyFeatures.map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                      <div key={idx} className="p-4 rounded-xl bg-accent/30 space-y-2">
                        <Icon className="w-6 h-6 text-primary" />
                        <h5 className="font-medium text-sm">{feature.title}</h5>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="relative rounded-xl overflow-hidden">
                  <Image 
                    src="https://miaoda.feishu.cn/aily/api/v1/files/static/aee074c0d7ac42a9b8d0f728977ee190_ve_miaoda" 
                    alt="Child-safe cordless mechanism" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <p className="text-white text-sm">Our patented cordless lift system eliminates dangerous exposed cords</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Natural Materials Section */}
          <AccordionItem value="materials" className="border-b border-border">
            <AccordionTrigger className="py-4 text-lg font-serif font-semibold hover:no-underline">
              <div className="flex items-center gap-2">
                <LeafIcon className="w-5 h-5 text-amber-500" />
                Natural Materials & Craftsmanship
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Origin', value: productData.materialStory.origin },
                    { label: 'Process', value: productData.materialStory.process },
                    { label: 'Craft Time', value: productData.materialStory.time },
                    { label: 'Impact', value: productData.materialStory.sustainability },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                      <p className="text-xs text-amber-600 uppercase tracking-wide mb-1">{item.label}</p>
                      <p className="text-sm text-amber-900">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="relative rounded-xl overflow-hidden">
                  <Image 
                    src="https://miaoda.feishu.cn/aily/api/v1/files/static/374fd1c04ee445b2a6f8e62b5b3933ea_ve_miaoda" 
                    alt="Artisan weaving process" 
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div>
                      <p className="text-white font-medium mb-1">Handwoven by Master Artisans</p>
                      <p className="text-white/80 text-sm">Traditional techniques passed down through generations</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4">
                    <p className="text-3xl font-bold text-primary">100%</p>
                    <p className="text-sm text-muted-foreground">Sustainable Materials</p>
                  </div>
                  <div className="p-4">
                    <p className="text-3xl font-bold text-primary">3-4 hrs</p>
                    <p className="text-sm text-muted-foreground">Handcraft Time Each</p>
                  </div>
                  <div className="p-4">
                    <p className="text-3xl font-bold text-primary">Zero</p>
                    <p className="text-sm text-muted-foreground">Waste Production</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Motor Demo Section */}
          <AccordionItem value="motor" className="border-b border-border">
            <AccordionTrigger className="py-4 text-lg font-serif font-semibold hover:no-underline">
              <div className="flex items-center gap-2">
                <ZapIcon className="w-5 h-5 text-yellow-500" />
                Motorized Operation
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Upgrade to our whisper-quiet motorized lift system for ultimate convenience. 
                  Compatible with Alexa, Google Home, and Apple HomeKit.
                </p>
                <MotorDemo />
                <div className="flex items-center justify-between p-4 bg-accent/30 rounded-xl">
                  <div>
                    <p className="font-medium">Add Motorization</p>
                    <p className="text-sm text-muted-foreground">+$149 per shade</p>
                  </div>
                  <Button variant="outline" className="rounded-full">
                    Select Option
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Fabric Swatches Section */}
          <AccordionItem value="swatches" className="border-b border-border">
            <AccordionTrigger className="py-4 text-lg font-serif font-semibold hover:no-underline">
              <div className="flex items-center gap-2">
                <PackageIcon className="w-5 h-5 text-amber-500" />
                Free Fabric Swatches
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  We highly recommend ordering fabric swatches before purchasing. Natural materials can vary in color and texture, 
                  and lighting in your home may affect how they appear.
                </p>

                <div className="relative rounded-xl overflow-hidden">
                  <Image 
                    src="https://miaoda.feishu.cn/aily/api/v1/files/static/323d2b04633e42088ff6fb19e300a7fe_ve_miaoda" 
                    alt="Fabric swatch samples" 
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/30">
                    <TruckIcon className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="font-medium text-sm">FREE Shipping</p>
                      <p className="text-xs text-muted-foreground">Delivered in 3-5 business days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/30">
                    <CheckIcon className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Yours to Keep</p>
                      <p className="text-xs text-muted-foreground">No need to return samples</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/30">
                    <SparklesIcon className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Up to 10 Samples</p>
                      <p className="text-xs text-muted-foreground">Mix and match colors</p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setIsSwatchDialogOpen(true)}
                >
                  <PackageIcon className="w-4 h-4 mr-2" />
                  Order Free Swatches Now
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Specifications */}
          <AccordionItem value="specs" className="border-b border-border">
            <AccordionTrigger className="py-4 text-lg font-serif font-semibold hover:no-underline">
              Specifications
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <table className="w-full">
                <tbody className="divide-y divide-border">
                  <tr><td className="py-3 text-sm text-muted-foreground w-1/3">Materials</td><td className="py-3 text-sm font-medium">{productData.materials.join(', ')}</td></tr>
                  <tr><td className="py-3 text-sm text-muted-foreground">Min/Max Width</td><td className="py-3 text-sm font-medium">12&quot; - 96&quot;</td></tr>
                  <tr><td className="py-3 text-sm text-muted-foreground">Min/Max Height</td><td className="py-3 text-sm font-medium">12&quot; - 96&quot;</td></tr>
                  <tr><td className="py-3 text-sm text-muted-foreground">Safety Certification</td><td className="py-3 text-sm font-medium">WCSC Certified</td></tr>
                  <tr><td className="py-3 text-sm text-muted-foreground">Warranty</td><td className="py-3 text-sm font-medium">Lifetime Limited</td></tr>
                </tbody>
              </table>
            </AccordionContent>
          </AccordionItem>

          {/* Reviews */}
          <AccordionItem value="reviews" className="border-b border-border">
            <AccordionTrigger className="py-4 text-lg font-serif font-semibold hover:no-underline">
              Reviews ({productData.reviewCount})
            </AccordionTrigger>
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
                            <div className="font-medium">{review.author}</div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted'}`} />
                                ))}
                              </div>
                              <span>•</span>
                              <span>{new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>
                        {review.verified && (
                          <Badge variant="secondary" className="rounded-full text-xs">
                            <CheckIcon className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{review.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{review.content}</p>
                      </div>
                      {review.image && (
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                          <Image src={review.image} alt="Customer photo" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Swatch Order Dialog */}
      <SwatchOrderDialog 
        isOpen={isSwatchDialogOpen} 
        onClose={() => setIsSwatchDialogOpen(false)} 
        selectedColor={selectedColor}
      />
    </div>
  );
};

export default ProductDetailSafePage;
