import {useState, useMemo} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Button} from '~/components/ui/button';
import {Card, CardContent} from '~/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import {Input} from '~/components/ui/input';
import {Label} from '~/components/ui/label';
import {RadioGroup, RadioGroupItem} from '~/components/ui/radio-group';
import {Badge} from '~/components/ui/badge';
import {Separator} from '~/components/ui/separator';
import {ScrollArea} from '~/components/ui/scroll-area';
import {Image} from '~/components/ui/image';
import {toast} from 'sonner';
import {useCart} from '~/contexts/cart-context';
import {
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
  ThumbsUpIcon,
  UserIcon,
  ClockIcon,
  PackageIcon,
  WrenchIcon,
  CalculatorIcon,
} from 'lucide-react';

export function meta() {
  return [{title: 'Classic Roman Shades | LuxDrape'}];
}

const productData = {
  id: '1',
  name: 'Classic Roman Shades',
  description:
    'Our Classic Roman Shades combine timeless elegance with modern functionality. Handcrafted from premium fabrics, these shades offer beautiful light control and privacy while adding a sophisticated touch to any room. Each shade is custom-made to your exact specifications for a perfect fit.',
  basePrice: 151.99,
  originalPrice: 189.99,
  category: 'Roman Shades',
  style: ['Classic', 'Traditional', 'Modern'],
  materials: ['Cotton', 'Linen', 'Polyester'],
  rating: 4.5,
  reviewCount: 415,
  features: [
    'Custom sizes available',
    'Free fabric swatches',
    'Easy installation',
    'Child-safe options',
    'Motorization available',
  ],
  colors: [
    {
      id: 'white',
      name: 'Pure White',
      hex: '#FFFFFF',
      image:
        'https://miaoda.feishu.cn/aily/api/v1/files/static/6d9f0df723de4f648a28c44f08db77d1_ve_miaoda',
    },
    {
      id: 'cream',
      name: 'Cream',
      hex: '#F5F0E6',
      image:
        'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda',
    },
    {
      id: 'sage',
      name: 'Sage Green',
      hex: '#9CAF88',
      image:
        'https://miaoda.feishu.cn/aily/api/v1/files/static/6310ecde128b4463aff2428e6a1327a2_ve_miaoda',
    },
    {
      id: 'navy',
      name: 'Navy Blue',
      hex: '#2C3E50',
      image:
        'https://miaoda.feishu.cn/aily/api/v1/files/static/190087f6844e4a6d9e9eecd6e38fdad3_ve_miaoda',
    },
    {
      id: 'taupe',
      name: 'Warm Taupe',
      hex: '#8B7355',
      image:
        'https://miaoda.feishu.cn/aily/api/v1/files/static/4404b45f35da473c8fc6f026d2c13f56_ve_miaoda',
    },
  ],
  images: [
    {
      id: '1',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/58c5b1e0bea9442eb4d1ea59746e3978_ve_miaoda',
      alt: 'Classic Roman Shades in living room',
    },
    {
      id: '2',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/4404b45f35da473c8fc6f026d2c13f56_ve_miaoda',
      alt: 'Close-up fabric texture',
    },
    {
      id: '3',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/cd2fb6ff06674ea6bc31045cd9354193_ve_miaoda',
      alt: 'Roman shades in home office',
    },
    {
      id: '4',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/45a1634fb4224db88c7dd3607cc2bbeb_ve_miaoda',
      alt: 'Bedroom with roman shades',
    },
  ],
  liningOptions: [
    {
      id: 'standard',
      name: 'Light Filtering',
      price: 0,
      description: 'Softens light while maintaining privacy and view',
    },
    {
      id: 'privacy',
      name: 'Privacy Lining',
      price: 15,
      description: 'Blocks visibility while allowing diffused light',
    },
    {
      id: 'blackout',
      name: 'Blackout',
      price: 35,
      description: 'Blocks 99% of light for complete darkness',
    },
  ],
  liftOptions: [
    {
      id: 'cordless',
      name: 'Cordless Lift',
      price: 0,
      description: 'Smooth operation by simply lifting/lowering the shade',
    },
    {
      id: 'continuous',
      name: 'Continuous Cord Loop',
      price: 20,
      description: 'Cord stays at same length, ideal for large shades',
    },
    {
      id: 'motorized',
      name: 'Motorized',
      price: 149,
      description: 'Remote control operation with smart home compatibility',
    },
  ],
};

const reviewsData = [
  {
    id: '1',
    author: 'Sarah M.',
    rating: 5,
    date: '2024-02-15',
    title: 'Beautiful quality!',
    content:
      'These shades exceeded my expectations. The fabric is thick and luxurious, and the custom fit is perfect. Installation was straightforward with the included hardware.',
    verified: true,
    helpful: 24,
    image: null,
  },
  {
    id: '2',
    author: 'Michael R.',
    rating: 5,
    date: '2024-02-10',
    title: 'Exactly what we wanted',
    content:
      'We ordered the blackout lining for our bedroom and it truly blocks out all light. The measuring guide was very helpful in getting the right size.',
    verified: true,
    helpful: 18,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/7b849f6ee3bf42e885b324dd0907336b_ve_miaoda',
  },
  {
    id: '3',
    author: 'Jennifer K.',
    rating: 4,
    date: '2024-01-28',
    title: 'Great shades, shipping took a while',
    content:
      'The shades are beautiful and well-made. Only complaint is shipping took longer than expected, but customer service was responsive when I reached out.',
    verified: true,
    helpful: 12,
    image: null,
  },
  {
    id: '4',
    author: 'David L.',
    rating: 5,
    date: '2024-01-20',
    title: 'Perfect fit and color',
    content:
      "Ordered the sage color and it's exactly as shown on the website. The cordless lift works smoothly and looks modern in our living room.",
    verified: true,
    helpful: 15,
    image: null,
  },
  {
    id: '5',
    author: 'Emily W.',
    rating: 5,
    date: '2024-01-15',
    title: 'Second purchase!',
    content:
      'This is my second set of roman shades from DrapeStyle. The quality is consistently excellent. Highly recommend ordering the fabric samples first to see colors in person.',
    verified: true,
    helpful: 22,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/45a1634fb4224db88c7dd3607cc2bbeb_ve_miaoda',
  },
];

const relatedProducts = [
  {
    id: '2',
    name: 'Natural Linen Drapery',
    price: 129,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Sheer White Panels',
    price: 89,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/6d9f0df723de4f648a28c44f08db77d1_ve_miaoda',
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Velvet Blackout Curtains',
    price: 189,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/190087f6844e4a6d9e9eecd6e38fdad3_ve_miaoda',
    rating: 4.9,
  },
  {
    id: '5',
    name: 'Botanical Print Shades',
    price: 159,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/5f909e47df72474caafcd3b191e077fd_ve_miaoda',
    rating: 4.6,
  },
];

const MeasurementCalculator = () => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [mountType, setMountType] = useState('inside');
  const [result, setResult] = useState(null);

  const calculateDimensions = () => {
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (!w || !h) return;
    if (mountType === 'inside') {
      setResult({width: (w - 0.25).toFixed(2), height: h.toFixed(2)});
    } else {
      setResult({width: (w + 4).toFixed(2), height: (h + 3).toFixed(2)});
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-accent/30 rounded-xl p-4">
        <h4 className="font-medium flex items-center gap-2 mb-4">
          <CalculatorIcon className="w-4 h-4 text-primary" />
          Measurement Calculator
        </h4>
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setMountType('inside');
                setResult(null);
              }}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${mountType === 'inside' ? 'bg-primary text-primary-foreground' : 'bg-background border border-border hover:border-primary'}`}
            >
              Inside Mount
            </button>
            <button
              onClick={() => {
                setMountType('outside');
                setResult(null);
              }}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${mountType === 'outside' ? 'bg-primary text-primary-foreground' : 'bg-background border border-border hover:border-primary'}`}
            >
              Outside Mount
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Window Width (inches)</Label>
              <Input
                type="number"
                step="0.125"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="36.0"
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Window Height (inches)</Label>
              <Input
                type="number"
                step="0.125"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="48.0"
                className="h-10"
              />
            </div>
          </div>
          <Button
            onClick={calculateDimensions}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Calculate Shade Size
          </Button>
          {result && (
            <div className="bg-primary/10 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-primary">
                Recommended Shade Size:
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Width:</span>
                <span className="font-semibold">{result.width}&quot;</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Height:</span>
                <span className="font-semibold">{result.height}&quot;</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {mountType === 'inside'
                  ? 'We subtracted 1/4" for proper clearance.'
                  : 'We added 4" width and 3" height for optimal coverage.'}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-3">
        <h5 className="font-medium text-sm">Measuring Tips</h5>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            Measure width at the top, middle, and bottom - use the narrowest
            measurement
          </li>
          <li className="flex items-start gap-2">
            <CheckIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            Measure height at the left, center, and right - use the longest
            measurement
          </li>
          <li className="flex items-start gap-2">
            <CheckIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            Measure to the nearest 1/8 inch for best fit
          </li>
          <li className="flex items-start gap-2">
            <CheckIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            For outside mount, measure the area you want to cover
          </li>
        </ul>
      </div>
    </div>
  );
};

export default function ProductDetailPage() {
  const {id} = useParams();
  const navigate = useNavigate();
  const {addToCart} = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedLining, setSelectedLining] = useState(
    productData.liningOptions[0],
  );
  const [selectedLift, setSelectedLift] = useState(productData.liftOptions[0]);
  const [width, setWidth] = useState('36');
  const [height, setHeight] = useState('48');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeReviewFilter, setActiveReviewFilter] = useState('all');
  const [openAccordion, setOpenAccordion] = useState('');

  const totalPrice = useMemo(() => {
    const basePrice = productData.basePrice;
    const liningPrice = selectedLining.price;
    const liftPrice = selectedLift.price;
    const widthValue = parseFloat(width) || 36;
    const heightValue = parseFloat(height) || 48;
    const sizeMultiplier = (widthValue * heightValue) / (36 * 48);
    const unitPrice =
      (basePrice + liningPrice + liftPrice) * Math.max(sizeMultiplier, 0.7);
    return Math.round(unitPrice * quantity);
  }, [selectedLining, selectedLift, width, height, quantity]);

  const handleAddToCart = () => {
    const cartItem = {
      id: `${productData.id}-${Date.now()}`,
      productId: productData.id,
      productName: productData.name,
      fabric: selectedColor.name,
      dimensions: {
        width: parseFloat(width) || 36,
        height: parseFloat(height) || 48,
        unit: 'inches',
      },
      lining: selectedLining.id,
      mounting: selectedLift.id,
      quantity,
      unitPrice: totalPrice / quantity,
      image: selectedColor.image,
    };
    addToCart(cartItem);
    toast.success('Added to cart successfully!', {
      description: `${productData.name} - ${selectedColor.name}`,
    });
  };

  const filteredReviews = useMemo(() => {
    if (activeReviewFilter === 'all') return reviewsData;
    if (activeReviewFilter === 'verified')
      return reviewsData.filter((r) => r.verified);
    if (activeReviewFilter === 'photos')
      return reviewsData.filter((r) => r.image);
    if (activeReviewFilter === '5star')
      return reviewsData.filter((r) => r.rating === 5);
    return reviewsData;
  }, [activeReviewFilter]);

  const averageRating = 4.5;
  const ratingDistribution = [
    {stars: 5, count: 268},
    {stars: 4, count: 89},
    {stars: 3, count: 35},
    {stars: 2, count: 15},
    {stars: 1, count: 8},
  ];

  return (
    <div className="w-full space-y-16 md:space-y-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <button
            onClick={() => navigate('/')}
            className="hover:text-foreground transition-colors"
          >
            Home
          </button>
          <ChevronRightIcon className="w-4 h-4" />
          <button
            onClick={() => navigate('/shop')}
            className="hover:text-foreground transition-colors"
          >
            Roman Shades
          </button>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-foreground">Classic Roman Shades</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="relative aspect-[4/5] bg-accent rounded-2xl overflow-hidden">
              <Image
                src={productData.images[currentImageIndex].url}
                alt={productData.images[currentImageIndex].alt}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? productData.images.length - 1 : prev - 1,
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={() =>
                  setCurrentImageIndex(
                    (prev) => (prev + 1) % productData.images.length,
                  )
                }
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
                  className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all ${currentImageIndex === idx ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
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

          <div className="space-y-5">
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="rounded-full text-xs font-medium text-primary border-primary/30"
              >
                SIGNATURE COLLECTION
              </Badge>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                {productData.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(productData.rating) ? 'fill-primary text-primary' : 'text-muted'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">
                  {productData.rating}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({productData.reviewCount} Reviews)
                </span>
                <button className="text-sm text-primary hover:underline ml-2">
                  Write a Review
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-foreground">
                  ${totalPrice}
                </span>
                <span className="text-lg text-muted-foreground">
                  for {width}&quot; x {height}&quot;
                </span>
                <button className="text-sm text-primary hover:underline">
                  Details
                </button>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  Eligible Discounts:
                </p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-warning/10 text-warning border-0 rounded-full">
                    Take 30% Off $200+!
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Applied in cart.
                  </span>
                  <button className="text-sm text-primary hover:underline">
                    Details
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TruckIcon className="w-4 h-4" />
                <span>
                  Your custom-made shades will be ready in{' '}
                  <strong className="text-foreground">
                    8 - 10 business days
                  </strong>{' '}
                  and will ship upon completion.
                </span>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-2">
              <WrenchIcon className="w-4 h-4 text-primary" />
              <span className="font-medium">Start Customizing Below:</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Color: {selectedColor.name}
                </Label>
                <button className="text-xs text-primary hover:underline">
                  Order Free Swatch
                </button>
              </div>
              <div className="flex gap-3 flex-wrap">
                {productData.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-12 h-12 rounded-xl border-2 transition-all ${selectedColor.id === color.id ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-border hover:border-muted-foreground'}`}
                    style={{backgroundColor: color.hex}}
                    title={color.name}
                  >
                    {selectedColor.id === color.id && (
                      <CheckIcon
                        className={`absolute inset-0 m-auto w-5 h-5 ${color.hex === '#FFFFFF' || color.hex === '#F5F0E6' ? 'text-foreground drop-shadow-md' : 'text-white drop-shadow-md'}`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">
                  Dimensions (inches)
                </Label>
                <button className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                  <RulerIcon className="w-3 h-3" />
                  Measuring Guide
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Width</Label>
                  <Input
                    type="number"
                    step="0.125"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="h-11"
                    placeholder="36"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">
                    Height
                  </Label>
                  <Input
                    type="number"
                    step="0.125"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="h-11"
                    placeholder="48"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Lining Option</Label>
              <RadioGroup
                value={selectedLining.id}
                onValueChange={(val) => {
                  const lining = productData.liningOptions.find(
                    (l) => l.id === val,
                  );
                  if (lining) setSelectedLining(lining);
                }}
              >
                <div className="grid gap-3">
                  {productData.liningOptions.map((lining) => (
                    <div key={lining.id}>
                      <RadioGroupItem
                        value={lining.id}
                        id={lining.id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={lining.id}
                        className="flex items-start gap-3 p-4 rounded-xl border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-muted-foreground"
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{lining.name}</span>
                            <span className="text-sm">
                              {lining.price > 0
                                ? `+$${lining.price}`
                                : 'Included'}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {lining.description}
                          </p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Lift System</Label>
              <RadioGroup
                value={selectedLift.id}
                onValueChange={(val) => {
                  const lift = productData.liftOptions.find(
                    (l) => l.id === val,
                  );
                  if (lift) setSelectedLift(lift);
                }}
              >
                <div className="grid gap-3">
                  {productData.liftOptions.map((lift) => (
                    <div key={lift.id}>
                      <RadioGroupItem
                        value={lift.id}
                        id={lift.id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={lift.id}
                        className="flex items-start gap-3 p-4 rounded-xl border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-muted-foreground"
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{lift.name}</span>
                            <span className="text-sm">
                              {lift.price > 0 ? `+$${lift.price}` : 'Included'}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {lift.description}
                          </p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Quantity</Label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 py-2">
              <div className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-accent/30">
                <PackageIcon className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">
                  Free Shipping
                  <br />
                  Orders $200+
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-accent/30">
                <RotateCcwIcon className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">
                  30-Day
                  <br />
                  Satisfaction
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-accent/30">
                <ShieldCheckIcon className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">
                  Lifetime
                  <br />
                  Warranty
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                size="lg"
                className="flex-1 h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium"
                onClick={handleAddToCart}
              >
                Add to Cart - ${totalPrice}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 w-14 rounded-full"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <HeartIcon
                  className={`w-5 h-5 ${isWishlisted ? 'fill-primary text-primary' : ''}`}
                />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 w-14 rounded-full"
              >
                <Share2Icon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          value={openAccordion}
          onValueChange={setOpenAccordion}
        >
          <AccordionItem value="information" className="border-b border-border">
            <AccordionTrigger className="py-4 text-lg font-serif font-semibold hover:no-underline">
              Product Information
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {productData.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {productData.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-accent/30 rounded-xl p-4 space-y-3">
                  <h4 className="font-medium">What&apos;s Included</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Custom-made roman shade to your exact specifications
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      All necessary mounting hardware and brackets
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Step-by-step installation instructions
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Lifetime warranty on craftsmanship
                    </li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="specifications"
            className="border-b border-border"
          >
            <AccordionTrigger className="py-4 text-lg font-serif font-semibold hover:no-underline">
              Specifications
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <table className="w-full">
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-3 text-sm text-muted-foreground w-1/3">
                      Material
                    </td>
                    <td className="py-3 text-sm font-medium">
                      100% Premium Cotton / Linen Blend
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-muted-foreground">
                      Min Width
                    </td>
                    <td className="py-3 text-sm font-medium">12&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-muted-foreground">
                      Max Width
                    </td>
                    <td className="py-3 text-sm font-medium">120&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-muted-foreground">
                      Min Height
                    </td>
                    <td className="py-3 text-sm font-medium">12&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-muted-foreground">
                      Max Height
                    </td>
                    <td className="py-3 text-sm font-medium">120&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-muted-foreground">
                      Fabric Weight
                    </td>
                    <td className="py-3 text-sm font-medium">8 oz/yd²</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-muted-foreground">Care</td>
                    <td className="py-3 text-sm font-medium">
                      Vacuum with brush attachment; spot clean only
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-muted-foreground">
                      Origin
                    </td>
                    <td className="py-3 text-sm font-medium">
                      Made in USA with imported fabrics
                    </td>
                  </tr>
                </tbody>
              </table>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="measure-install"
            className="border-b border-border"
          >
            <AccordionTrigger className="py-4 text-lg font-serif font-semibold hover:no-underline">
              Measure and Install
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-8">
                <MeasurementCalculator />
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <WrenchIcon className="w-4 h-4 text-primary" />
                    Installation Instructions
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h5 className="text-sm font-medium text-muted-foreground">
                        Inside Mount
                      </h5>
                      <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                        <li>Position brackets 2-3 inches from ends</li>
                        <li>Mark screw holes with pencil</li>
                        <li>Drill pilot holes</li>
                        <li>Secure brackets with screws</li>
                        <li>Clip shade into brackets</li>
                      </ol>
                    </div>
                    <div className="space-y-3">
                      <h5 className="text-sm font-medium text-muted-foreground">
                        Outside Mount
                      </h5>
                      <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                        <li>Hold shade at desired height</li>
                        <li>Mark bracket positions on wall</li>
                        <li>Drill pilot holes and insert anchors</li>
                        <li>Secure brackets with screws</li>
                        <li>Mount shade onto brackets</li>
                      </ol>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Installation typically takes 15-30 minutes. All hardware and
                    detailed instructions are included with your order.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="shipping" className="border-b border-border">
            <AccordionTrigger className="py-4 text-lg font-serif font-semibold hover:no-underline">
              Shipping & Production
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 text-primary" />
                      Production Time
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Each shade is handcrafted to your exact specifications.
                      Production typically takes{' '}
                      <strong>8-10 business days</strong> before shipping.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <TruckIcon className="w-4 h-4 text-primary" />
                      Shipping Options
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        • <strong>Standard:</strong> 5-7 business days (FREE
                        over $200)
                      </li>
                      <li>
                        • <strong>Express:</strong> 2-3 business days ($25)
                      </li>
                      <li>
                        • <strong>White Glove:</strong> Delivery & installation
                        ($149)
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Important:</strong> Please inspect your shades upon
                    delivery. For any issues, contact our customer service
                    within 48 hours.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="reviews" className="border-b border-border">
            <AccordionTrigger className="py-4 text-lg font-serif font-semibold hover:no-underline">
              Reviews ({productData.reviewCount})
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="bg-accent/30 rounded-xl p-6 text-center">
                      <div className="text-5xl font-bold text-foreground">
                        {averageRating}
                      </div>
                      <div className="flex justify-center gap-1 my-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'fill-primary text-primary' : 'text-muted'}`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Based on {productData.reviewCount} reviews
                      </div>
                    </div>
                    <div className="space-y-2">
                      {ratingDistribution.map((item) => (
                        <div
                          key={item.stars}
                          className="flex items-center gap-3"
                        >
                          <span className="text-sm w-8">{item.stars} ★</span>
                          <div className="flex-1 h-2 bg-accent rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{
                                width: `${(item.count / productData.reviewCount) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right">
                            {item.count}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Filter Reviews
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          {id: 'all', label: 'All'},
                          {id: 'verified', label: 'Verified'},
                          {id: 'photos', label: 'With Photos'},
                          {id: '5star', label: '5 Stars'},
                        ].map((filter) => (
                          <button
                            key={filter.id}
                            onClick={() => setActiveReviewFilter(filter.id)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeReviewFilter === filter.id ? 'bg-primary text-primary-foreground' : 'bg-accent text-foreground hover:bg-accent/70'}`}
                          >
                            {filter.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-4 pr-4">
                        {filteredReviews.map((review) => (
                          <Card key={review.id} className="rounded-xl">
                            <CardContent className="p-4 space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                                    <UserIcon className="w-5 h-5 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <div className="font-medium">
                                      {review.author}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            className={`w-3 h-3 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted'}`}
                                          />
                                        ))}
                                      </div>
                                      <span>•</span>
                                      <span>
                                        {new Date(
                                          review.date,
                                        ).toLocaleDateString('en-US', {
                                          month: 'short',
                                          day: 'numeric',
                                          year: 'numeric',
                                        })}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                {review.verified && (
                                  <Badge
                                    variant="secondary"
                                    className="rounded-full text-xs"
                                  >
                                    <CheckIcon className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <div>
                                <h4 className="font-semibold text-sm mb-1">
                                  {review.title}
                                </h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                  {review.content}
                                </p>
                              </div>
                              {review.image && (
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                                  <Image
                                    src={review.image}
                                    alt="Customer photo"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex items-center gap-4 pt-1">
                                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                                  <ThumbsUpIcon className="w-3.5 h-3.5" />
                                  Helpful ({review.helpful})
                                </button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((product) => (
              <Card
                key={product.id}
                className="rounded-2xl overflow-hidden cursor-pointer group hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-foreground line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold">
                      From ${product.price}
                    </span>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
