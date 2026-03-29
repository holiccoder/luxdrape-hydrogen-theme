import {useState, useMemo, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '~/components/ui/button';
import {Input} from '~/components/ui/input';
import {Label} from '~/components/ui/label';
import {RadioGroup, RadioGroupItem} from '~/components/ui/radio-group';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '~/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '~/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '~/components/ui/sheet';
import {Image} from '~/components/ui/image';
import {toast} from 'sonner';
import {useCart} from '~/contexts/cart-context';
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
  ShieldCheckIcon,
  ShieldIcon,
  ZapIcon,
  AwardIcon,
  FileTextIcon,
  PlayIcon,
  ThumbsUpIcon,
  ArrowRightIcon,
  XIcon,
  PackageIcon,
  ClockIcon,
  HeartIcon,
  Share2Icon,
  HelpCircleIcon,
  BadgeCheckIcon,
  LayersIcon,
  EyeIcon,
  Maximize2Icon,
  RotateCcwIcon,
} from 'lucide-react';

export function meta() {
  return [{title: 'Custom Roller Shades V2 | LuxDrape'}];
}

const productData = {
  id: 'shades-roller-v2',
  name: 'Custom Roller Shades',
  tagline: 'Precision-crafted for your exact window dimensions',
  basePrice: 149.99,
  rating: 4.8,
  reviewCount: 356,
  features: [
    'Custom-made to your window dimensions',
    'Precision roll-up mechanism',
    'Multiple fabric opacities available',
    'Free fabric samples',
    '5-year mechanism warranty',
  ],
  images: [
    {
      id: '1',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda',
      alt: 'Custom roller shades in modern living room',
    },
    {
      id: '2',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
      alt: 'Roller shades bedroom installation',
    },
    {
      id: '3',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda',
      alt: 'Fabric detail roller shades',
    },
    {
      id: '4',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda',
      alt: 'Motorized roller shades',
    },
  ],
  technicalSpecs: {
    material: 'High-Density 350 GSM Fabric',
    composition: '100% Polyester with acrylic coating',
    thickness: '0.8mm - 1.2mm depending on opacity',
    uvProtection: 'UPF 50+ blocks 98% of UV rays',
    mechanism: 'Steel-reinforced aluminum roller tube',
    brackets: 'Die-cast zinc alloy, powder-coated',
    warranty: '5 years on mechanism, 3 years on fabric',
  },
  fabricTexture: {
    url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/190087f6844e4a6d9e9eecd6e38fdad3_ve_miaoda',
    description: 'Microscopic view of fabric weave structure',
  },
  explodedView: {
    url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/6310ecde128b4463aff2428e6a1327a2_ve_miaoda',
    parts: [
      {id: 1, name: 'Fabric Roll', position: 'top'},
      {id: 2, name: 'Aluminum Tube', position: 'center'},
      {id: 3, name: 'Mechanism Housing', position: 'right'},
      {id: 4, name: 'Mounting Brackets', position: 'left'},
      {id: 5, name: 'Bottom Rail', position: 'bottom'},
    ],
  },
};

const productColors = [
  {id: 'white', name: 'Pure White', hex: '#FFFFFF'},
  {id: 'ivory', name: 'Ivory', hex: '#F5F5DC'},
  {id: 'beige', name: 'Warm Beige', hex: '#D4C4A8'},
  {id: 'gray', name: 'Light Gray', hex: '#D3D3D3'},
  {id: 'charcoal', name: 'Charcoal', hex: '#4A4A4A'},
  {id: 'navy', name: 'Navy Blue', hex: '#1E3A5F'},
  {id: 'black', name: 'Blackout Black', hex: '#1A1A1A'},
  {id: 'sage', name: 'Sage Green', hex: '#8FBC8F'},
];

const mountTypes = [
  {
    id: 'inside',
    name: 'Inside Mount',
    price: 0,
    description:
      'Fits within your window frame. Requires 2" minimum depth. Clean, built-in look.',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda',
  },
  {
    id: 'outside',
    name: 'Outside Mount',
    price: 0,
    description:
      'Mounts on the wall above window. Better light blocking, makes window appear larger.',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
  },
];

const opacityTypes = [
  {
    id: 'sheer',
    name: 'Sheer (5%)',
    price: 0,
    description: 'Soft light diffusion. Daytime privacy only.',
    lightBlock: 'Blocks 5% of light',
  },
  {
    id: 'light-filtering',
    name: 'Light Filtering (50%)',
    price: 15,
    description: 'Softens sunlight while maintaining view. Daytime privacy.',
    lightBlock: 'Blocks 50% of light',
  },
  {
    id: 'room-darkening',
    name: 'Room Darkening (85%)',
    price: 35,
    description: 'Substantial light reduction. Good for media rooms.',
    lightBlock: 'Blocks 85% of light',
  },
  {
    id: 'blackout',
    name: 'Blackout (99%)',
    price: 55,
    description: 'Maximum light blocking. Ideal for bedrooms.',
    lightBlock: 'Blocks 99% of light',
  },
];

const liftTypes = [
  {
    id: 'standard',
    name: 'Standard Cord',
    price: 0,
    description: 'Traditional pull cord operation',
  },
  {
    id: 'cordless',
    name: 'Cordless Lift',
    price: 25,
    description: 'Push up, pull down - no cords',
  },
  {
    id: 'motorized',
    name: 'Motorized',
    price: 149,
    description: 'Remote control & smart home compatible',
  },
];

const valanceTypes = [
  {id: 'none', name: 'No Valance', price: 0},
  {
    id: 'cassette',
    name: 'Cassette Valance',
    price: 35,
    description: 'Fabric-covered headrail for finished look',
  },
  {
    id: 'exposed',
    name: 'Exposed Roll',
    price: 0,
    description: 'Minimal, industrial aesthetic',
  },
];

const FITProtectionCard = () => {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <>
      <div className="bg-[hsl(220_25%_97%)] border border-[hsl(220_25%_90%)] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[hsl(220_25%_25%)] flex items-center justify-center shrink-0">
              <ShieldCheckIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">
                FIT Protection: Measuring Guarantee Included
              </p>
              <p className="text-xs text-muted-foreground">
                Free replacement if measurements are wrong
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowSheet(true)}
            className="text-[hsl(220_25%_35%)] text-xs font-medium hover:underline flex items-center gap-1"
          >
            How it works
            <ArrowRightIcon className="h-3 w-3" />
          </button>
        </div>
      </div>

      <Sheet open={showSheet} onOpenChange={setShowSheet}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader className="pb-6 border-b">
            <SheetTitle className="flex items-center gap-2">
              <ShieldCheckIcon className="h-5 w-5 text-[hsl(220_25%_35%)]" />
              FIT Protection Guarantee
            </SheetTitle>
            <SheetDescription>
              Measure with complete confidence
            </SheetDescription>
          </SheetHeader>

          <div className="py-6 space-y-6">
            <div className="bg-[hsl(220_25%_97%)] p-4 border border-[hsl(220_25%_90%)]">
              <p className="text-sm leading-relaxed">
                "Measure with ease. If you make a mistake, we've got you
                covered.
                <span className="font-semibold">
                  {' '}
                  One-time free replacement per blind.
                </span>
                You only pay the difference if the new size is larger."
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm">What's Covered:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <CheckIcon className="h-4 w-4 text-[hsl(220_25%_35%)] mt-0.5 shrink-0" />
                  <span>Wrong width or height measurements</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckIcon className="h-4 w-4 text-[hsl(220_25%_35%)] mt-0.5 shrink-0" />
                  <span>Mistake in inside vs outside mount selection</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckIcon className="h-4 w-4 text-[hsl(220_25%_35%)] mt-0.5 shrink-0" />
                  <span>One free remake per item within 60 days</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm">How It Works:</h4>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="w-5 h-5 bg-[hsl(220_25%_25%)] text-white text-xs flex items-center justify-center shrink-0">
                    1
                  </span>
                  <span>Contact our support team with your order number</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 bg-[hsl(220_25%_25%)] text-white text-xs flex items-center justify-center shrink-0">
                    2
                  </span>
                  <span>Provide corrected measurements</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 bg-[hsl(220_25%_25%)] text-white text-xs flex items-center justify-center shrink-0">
                    3
                  </span>
                  <span>
                    We remake and ship your replacement within 10 days
                  </span>
                </li>
              </ol>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                * FIT Protection applies to standard products. Specialty items
                excluded. Replacement must be same style, fabric, and opacity.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

const DimensionInput = ({
  label,
  value,
  onChange,
  min,
  max,
  confirmed,
  onConfirm,
}) => {
  const isValid = value && parseFloat(value) >= min && parseFloat(value) <= max;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        {confirmed && (
          <BadgeCheckIcon className="h-4 w-4 text-[hsl(220_25%_35%)]" />
        )}
      </div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="number"
            step="0.125"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`pr-12 ${confirmed ? 'border-[hsl(220_25%_35%)] bg-[hsl(220_25%_97%)]' : ''}`}
            placeholder="0.00"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            in
          </span>
        </div>
        <Button
          variant={confirmed ? 'secondary' : 'outline'}
          size="sm"
          disabled={!isValid}
          onClick={onConfirm}
          className={
            confirmed
              ? 'bg-[hsl(220_25%_25%)] text-white hover:bg-[hsl(220_25%_20%)]'
              : ''
          }
        >
          {confirmed ? (
            <>
              <CheckIcon className="h-4 w-4 mr-1" />
              Confirmed
            </>
          ) : (
            'Confirm'
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Min: {min}", Max: {max}"
      </p>
    </div>
  );
};

const CartTrustBadges = () => (
  <div className="grid grid-cols-3 gap-3 py-4 border-t border-b">
    <div className="flex flex-col items-center text-center gap-2">
      <div className="w-10 h-10 bg-[hsl(220_25%_97%)] flex items-center justify-center">
        <RulerIcon className="h-5 w-5 text-[hsl(220_25%_35%)]" />
      </div>
      <div>
        <p className="text-xs font-semibold">FIT Protection</p>
        <p className="text-[10px] text-muted-foreground">Measuring Guarantee</p>
      </div>
    </div>
    <div className="flex flex-col items-center text-center gap-2">
      <div className="w-10 h-10 bg-[hsl(220_25%_97%)] flex items-center justify-center">
        <AwardIcon className="h-5 w-5 text-[hsl(220_25%_35%)]" />
      </div>
      <div>
        <p className="text-xs font-semibold">5-Year Warranty</p>
        <p className="text-[10px] text-muted-foreground">Quality Commitment</p>
      </div>
    </div>
    <div className="flex flex-col items-center text-center gap-2">
      <div className="w-10 h-10 bg-[hsl(220_25%_97%)] flex items-center justify-center">
        <TruckIcon className="h-5 w-5 text-[hsl(220_25%_35%)]" />
      </div>
      <div>
        <p className="text-xs font-semibold">Free Shipping</p>
        <p className="text-[10px] text-muted-foreground">Orders $200+</p>
      </div>
    </div>
  </div>
);

const TechnicalSpecs = () => {
  const [showExploded, setShowExploded] = useState(false);
  const [showTexture, setShowTexture] = useState(false);

  return (
    <div className="space-y-6">
      <div className="border border-border overflow-hidden">
        <div
          className="relative aspect-[16/9] bg-muted cursor-pointer group"
          onClick={() => setShowExploded(true)}
        >
          <Image
            src={productData.explodedView.url}
            alt="Product construction diagram"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white px-4 py-2 flex items-center gap-2">
              <Maximize2Icon className="h-4 w-4" />
              <span className="text-sm font-medium">View Exploded Diagram</span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-[hsl(220_25%_97%)]">
          <p className="text-xs text-muted-foreground">
            Click image to view detailed component breakdown
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-[hsl(220_25%_97%)] border border-[hsl(220_25%_90%)]">
          <p className="text-xs text-muted-foreground mb-1">Material</p>
          <p className="font-semibold text-sm">
            {productData.technicalSpecs.material}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {productData.technicalSpecs.composition}
          </p>
        </div>
        <div
          className="p-4 bg-[hsl(220_25%_97%)] border border-[hsl(220_25%_90%)] cursor-pointer group"
          onClick={() => setShowTexture(true)}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-muted-foreground">Fabric Weight</p>
            <EyeIcon className="h-3 w-3 text-muted-foreground group-hover:text-[hsl(220_25%_35%)]" />
          </div>
          <p className="font-semibold text-sm">
            {productData.technicalSpecs.thickness}
          </p>
          <p className="text-xs text-[hsl(220_25%_35%)] mt-1 group-hover:underline">
            View texture detail →
          </p>
        </div>
        <div className="p-4 bg-[hsl(220_25%_97%)] border border-[hsl(220_25%_90%)]">
          <p className="text-xs text-muted-foreground mb-1">UV Protection</p>
          <p className="font-semibold text-sm">
            {productData.technicalSpecs.uvProtection}
          </p>
        </div>
        <div className="p-4 bg-[hsl(220_25%_97%)] border border-[hsl(220_25%_90%)]">
          <p className="text-xs text-muted-foreground mb-1">Roller Mechanism</p>
          <p className="font-semibold text-sm">
            {productData.technicalSpecs.mechanism}
          </p>
        </div>
      </div>

      <Dialog open={showExploded} onOpenChange={setShowExploded}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Product Construction Detail</DialogTitle>
            <DialogDescription>
              Precision-engineered components for lasting performance
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video bg-muted overflow-hidden">
            <Image
              src={productData.explodedView.url}
              alt="Exploded view of roller shade components"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {productData.explodedView.parts.map((part) => (
              <div key={part.id} className="p-2 bg-[hsl(220_25%_97%)]">
                <span className="font-semibold">{part.id}.</span> {part.name}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showTexture} onOpenChange={setShowTexture}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Fabric Texture: {productData.technicalSpecs.material}
            </DialogTitle>
            <DialogDescription>
              {productData.fabricTexture.description}
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-square bg-muted overflow-hidden">
            <Image
              src={productData.fabricTexture.url}
              alt="Fabric texture close-up"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Weight: {productData.technicalSpecs.thickness}</span>
            <span>Composition: {productData.technicalSpecs.composition}</span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ShadesProductV2Page = () => {
  const navigate = useNavigate();
  const {addToCart} = useCart();
  const [currentImage, setCurrentImage] = useState(0);

  const [selectedColor, setSelectedColor] = useState(productColors[0]);
  const [selectedMount, setSelectedMount] = useState(mountTypes[0]);
  const [selectedOpacity, setSelectedOpacity] = useState(opacityTypes[2]);
  const [selectedLift, setSelectedLift] = useState(liftTypes[1]);
  const [selectedValance, setSelectedValance] = useState(valanceTypes[1]);

  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [widthConfirmed, setWidthConfirmed] = useState(false);
  const [heightConfirmed, setHeightConfirmed] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [showFitInfo, setShowFitInfo] = useState(false);

  const totalPrice = useMemo(() => {
    const base = productData.basePrice;
    const mountPrice = selectedMount.price;
    const opacityPrice = selectedOpacity.price;
    const liftPrice = selectedLift.price;
    const valancePrice = selectedValance.price;
    return (
      (base + mountPrice + opacityPrice + liftPrice + valancePrice) * quantity
    );
  }, [selectedMount, selectedOpacity, selectedLift, selectedValance, quantity]);

  const handleAddToCart = () => {
    if (!width || !height) {
      toast.error('Please enter your window dimensions');
      return;
    }
    if (!widthConfirmed || !heightConfirmed) {
      toast.error('Please confirm your measurements');
      return;
    }

    addToCart({
      id: `${productData.id}-${Date.now()}`,
      productId: productData.id,
      productName: productData.name,
      fabric: selectedColor.name,
      dimensions: {
        width: parseFloat(width),
        height: parseFloat(height),
        unit: 'inches',
      },
      lining:
        selectedOpacity.id === 'blackout'
          ? 'blackout'
          : selectedOpacity.id === 'sheer'
            ? 'privacy'
            : 'light-filtering',
      mounting: selectedMount.id === 'inside' ? 'inside' : 'outside',
      quantity,
      unitPrice: totalPrice / quantity,
      image: productData.images[0].url,
    });

    toast.success('Added to cart with FIT Protection');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <button
              onClick={() => navigate('/')}
              className="hover:text-foreground"
            >
              Home
            </button>
            <ChevronRightIcon className="h-4 w-4" />
            <button
              onClick={() => navigate('/shop')}
              className="hover:text-foreground"
            >
              Shop
            </button>
            <ChevronRightIcon className="h-4 w-4" />
            <span className="text-foreground">Roller Shades</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-muted overflow-hidden relative">
              <Image
                src={productData.images[currentImage].url}
                alt={productData.images[currentImage].alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <button
                  className="w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white"
                  onClick={() => setShowFitInfo(true)}
                >
                  <RulerIcon className="h-5 w-5" />
                </button>
                <button className="w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white">
                  <HeartIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              {productData.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setCurrentImage(i)}
                  className={`w-20 h-20 overflow-hidden border-2 ${
                    i === currentImage
                      ? 'border-[hsl(220_25%_25%)]'
                      : 'border-transparent'
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-3xl font-semibold mb-2">
                {productData.name}
              </h1>
              <p className="text-muted-foreground">{productData.tagline}</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(productData.rating) ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
                    />
                  ))}
                  <span className="text-sm ml-1">{productData.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({productData.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold">
                  ${totalPrice.toFixed(2)}
                </span>
                {quantity > 1 && (
                  <span className="text-muted-foreground">
                    (${(totalPrice / quantity).toFixed(2)} each)
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Fabric Color: {selectedColor.name}
                </Label>
              </div>
              <div className="flex flex-wrap gap-2">
                {productColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 border-2 ${
                      selectedColor.id === color.id
                        ? 'border-[hsl(220_25%_25%)]'
                        : 'border-border'
                    }`}
                    style={{backgroundColor: color.hex}}
                    title={color.name}
                  >
                    {selectedColor.id === color.id && (
                      <CheckIcon
                        className={`h-5 w-5 mx-auto ${color.hex === '#FFFFFF' || color.hex === '#F5F5DC' || color.hex === '#FFFDD0' ? 'text-black' : 'text-white'}`}
                      />
                    )}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full mt-2 border-dashed border-2 border-[hsl(220_25%_35%)] text-[hsl(220_25%_35%)] hover:bg-[hsl(220_25%_97%)]"
                onClick={() => navigate('/products/prod-2/swatches')}
              >
                <PackageIcon className="h-4 w-4 mr-2" />
                Order Free Fabric Swatches First
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <Label className="text-sm font-medium">Mount Type</Label>
              <RadioGroup
                value={selectedMount.id}
                onValueChange={(val) =>
                  setSelectedMount(mountTypes.find((m) => m.id === val))
                }
                className="grid grid-cols-2 gap-3"
              >
                {mountTypes.map((mount) => (
                  <div key={mount.id}>
                    <RadioGroupItem
                      value={mount.id}
                      id={mount.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={mount.id}
                      className="flex flex-col p-4 border border-border cursor-pointer peer-data-[state=checked]:border-[hsl(220_25%_25%)] peer-data-[state=checked]:bg-[hsl(220_25%_97%)] hover:bg-accent/50"
                    >
                      <span className="font-medium">{mount.name}</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        {mount.description}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <RulerIcon className="h-4 w-4 text-[hsl(220_25%_35%)]" />
                <Label className="text-sm font-medium">Shade Dimensions</Label>
                <button
                  className="text-xs text-[hsl(220_25%_35%)] hover:underline ml-auto"
                  onClick={() => navigate('/guides/measure')}
                >
                  How to measure
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <DimensionInput
                  label={`Width (${selectedMount.id === 'inside' ? 'inside frame' : 'desired coverage'})`}
                  value={width}
                  onChange={(val) => {
                    setWidth(val);
                    setWidthConfirmed(false);
                  }}
                  min={12}
                  max={120}
                  confirmed={widthConfirmed}
                  onConfirm={() => setWidthConfirmed(true)}
                />
                <DimensionInput
                  label={`Height (${selectedMount.id === 'inside' ? 'inside frame' : 'desired coverage'})`}
                  value={height}
                  onChange={(val) => {
                    setHeight(val);
                    setHeightConfirmed(false);
                  }}
                  min={12}
                  max={120}
                  confirmed={heightConfirmed}
                  onConfirm={() => setHeightConfirmed(true)}
                />
              </div>

              <FITProtectionCard />
            </div>

            <div className="space-y-3 pt-4 border-t">
              <Label className="text-sm font-medium">Opacity Level</Label>
              <RadioGroup
                value={selectedOpacity.id}
                onValueChange={(val) =>
                  setSelectedOpacity(opacityTypes.find((o) => o.id === val))
                }
                className="grid grid-cols-2 gap-3"
              >
                {opacityTypes.map((opacity) => (
                  <div key={opacity.id}>
                    <RadioGroupItem
                      value={opacity.id}
                      id={opacity.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={opacity.id}
                      className="flex flex-col p-4 border border-border cursor-pointer peer-data-[state=checked]:border-[hsl(220_25%_25%)] peer-data-[state=checked]:bg-[hsl(220_25%_97%)] hover:bg-accent/50"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{opacity.name}</span>
                        {opacity.price > 0 && (
                          <span className="text-sm">+${opacity.price}</span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        {opacity.description}
                      </span>
                      <span className="text-xs text-[hsl(220_25%_35%)] mt-1">
                        {opacity.lightBlock}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <Label className="text-sm font-medium">Lift Style</Label>
              <RadioGroup
                value={selectedLift.id}
                onValueChange={(val) =>
                  setSelectedLift(liftTypes.find((l) => l.id === val))
                }
                className="space-y-2"
              >
                {liftTypes.map((lift) => (
                  <div key={lift.id}>
                    <RadioGroupItem
                      value={lift.id}
                      id={lift.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={lift.id}
                      className="flex items-center justify-between p-4 border border-border cursor-pointer peer-data-[state=checked]:border-[hsl(220_25%_25%)] peer-data-[state=checked]:bg-[hsl(220_25%_97%)] hover:bg-accent/50"
                    >
                      <div>
                        <span className="font-medium">{lift.name}</span>
                        <span className="text-xs text-muted-foreground block mt-0.5">
                          {lift.description}
                        </span>
                      </div>
                      {lift.price > 0 ? (
                        <span className="text-sm font-medium">
                          +${lift.price}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Included
                        </span>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <Label className="text-sm font-medium">
                Valance / Headrail Style
              </Label>
              <RadioGroup
                value={selectedValance.id}
                onValueChange={(val) =>
                  setSelectedValance(valanceTypes.find((v) => v.id === val))
                }
                className="space-y-2"
              >
                {valanceTypes.map((valance) => (
                  <div key={valance.id}>
                    <RadioGroupItem
                      value={valance.id}
                      id={valance.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={valance.id}
                      className="flex items-center justify-between p-4 border border-border cursor-pointer peer-data-[state=checked]:border-[hsl(220_25%_25%)] peer-data-[state=checked]:bg-[hsl(220_25%_97%)] hover:bg-accent/50"
                    >
                      <div>
                        <span className="font-medium">{valance.name}</span>
                        {valance.description && (
                          <span className="text-xs text-muted-foreground block mt-0.5">
                            {valance.description}
                          </span>
                        )}
                      </div>
                      {valance.price > 0 ? (
                        <span className="text-sm font-medium">
                          +${valance.price}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Included
                        </span>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="pt-4 border-t">
              <Label className="text-sm font-medium mb-2 block">Quantity</Label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-border flex items-center justify-center hover:bg-accent"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-border flex items-center justify-center hover:bg-accent"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <CartTrustBadges />

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-[hsl(220_25%_25%)] hover:bg-[hsl(220_25%_20%)] text-white py-6"
                onClick={handleAddToCart}
              >
                Add to Cart - ${totalPrice.toFixed(2)}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Ships in 14 days • Free shipping over $200
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-16 border-t">
          <Accordion type="single" collapsible defaultValue="specs">
            <AccordionItem value="specs">
              <AccordionTrigger className="text-lg font-semibold">
                Technical Specifications
              </AccordionTrigger>
              <AccordionContent>
                <TechnicalSpecs />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="features">
              <AccordionTrigger className="text-lg font-semibold">
                Features & Benefits
              </AccordionTrigger>
              <AccordionContent>
                <ul className="grid md:grid-cols-2 gap-4">
                  {productData.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckIcon className="h-5 w-5 text-[hsl(220_25%_35%)] mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping">
              <AccordionTrigger className="text-lg font-semibold">
                Shipping & Returns
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[hsl(220_25%_97%)]">
                    <TruckIcon className="h-6 w-6 mb-2 text-[hsl(220_25%_35%)]" />
                    <p className="font-medium">Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      14 business days + 3-5 days shipping
                    </p>
                  </div>
                  <div className="p-4 bg-[hsl(220_25%_97%)]">
                    <RotateCcwIcon className="h-6 w-6 mb-2 text-[hsl(220_25%_35%)]" />
                    <p className="font-medium">Returns</p>
                    <p className="text-sm text-muted-foreground">
                      Custom items: FIT Protection applies
                    </p>
                  </div>
                  <div className="p-4 bg-[hsl(220_25%_97%)]">
                    <ShieldCheckIcon className="h-6 w-6 mb-2 text-[hsl(220_25%_35%)]" />
                    <p className="font-medium">Warranty</p>
                    <p className="text-sm text-muted-foreground">
                      5-year mechanism, 3-year fabric
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <Dialog open={showFitInfo} onOpenChange={setShowFitInfo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Getting the Perfect Fit</DialogTitle>
            <DialogDescription>
              Tips for measuring your roller shades
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-video bg-muted">
              <Image
                src="https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda"
                alt="Measuring guide"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckIcon className="h-4 w-4 text-[hsl(220_25%_35%)] mt-0.5 shrink-0" />
                <span>
                  Measure width at top, middle, and bottom. Use the narrowest.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="h-4 w-4 text-[hsl(220_25%_35%)] mt-0.5 shrink-0" />
                <span>
                  Measure height at left, center, and right. Use the shortest.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="h-4 w-4 text-[hsl(220_25%_35%)] mt-0.5 shrink-0" />
                <span>Round down to nearest 1/8 inch for inside mount.</span>
              </li>
            </ul>
            <Button
              className="w-full"
              onClick={() => {
                setShowFitInfo(false);
                navigate('/guides/measure');
              }}
            >
              View Full Measuring Guide
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShadesProductV2Page;
