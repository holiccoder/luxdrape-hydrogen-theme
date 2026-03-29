import {useState, useMemo, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '~/components/ui/button';
import {Input} from '~/components/ui/input';
import {Label} from '~/components/ui/label';
import {RadioGroup, RadioGroupItem} from '~/components/ui/radio-group';
import {Separator} from '~/components/ui/separator';
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
import {Image} from '~/components/ui/image';
import {toast} from 'sonner';
import {useCart} from '~/contexts/cart-context';
import {
  CheckIcon,
  RulerIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
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
  ZapIcon,
  BatteryIcon,
  WifiIcon,
  SmartphoneIcon,
  VolumeXIcon,
  FileTextIcon,
  PlayIcon,
  AwardIcon,
  ThumbsUpIcon,
} from 'lucide-react';

export function meta() {
  return [{title: 'Custom Pinch Pleat Drapery | LuxDrape'}];
}

const productData = {
  id: 'lux-drapery-1',
  name: 'Custom Pinch Pleat Drapery',
  description:
    'Handcrafted custom drapery made to your exact specifications. Premium fabrics with professional pleating for a tailored, luxury look.',
  basePrice: 199.99,
  rating: 4.9,
  reviewCount: 428,
  features: [
    'Custom-made to your specifications',
    'Professional pleating options',
    'Multiple fabric choices',
    'Free fabric swatches',
    '3-year warranty included',
  ],
  images: [
    {
      id: '1',
      url: 'https://luxdrape.com/cdn/shop/files/florence_pleated_ivory_white.jpg?v=1771059728&width=768',
      alt: 'Custom pinch pleat drapes in living room',
    },
    {
      id: '2',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda',
      alt: 'Pleat header styles comparison',
    },
    {
      id: '3',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/374fd1c04ee445b2a6f8e62b5b3933ea_ve_miaoda',
      alt: 'Premium fabric detail',
    },
    {
      id: '4',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/e91d92a772ee4f6bb46cd960193349f7_ve_miaoda',
      alt: 'Tie back styles',
    },
  ],
};

const productColors = [
  {id: 'ivory', name: 'Ivory Linen', hex: '#F8F6F1'},
  {id: 'oatmeal', name: 'Oatmeal', hex: '#E8E4DC'},
  {id: 'charcoal', name: 'Charcoal Gray', hex: '#4A4A4A'},
  {id: 'navy', name: 'Navy Blue', hex: '#2C3E50'},
  {id: 'sage', name: 'Sage Green', hex: '#9CAF88'},
  {id: 'blush', name: 'Blush Pink', hex: '#E8D5D0'},
  {id: 'cream', name: 'Cream White', hex: '#FFFDD0'},
  {id: 'taupe', name: 'Warm Taupe', hex: '#B8A99A'},
  {id: 'slate', name: 'Slate Gray', hex: '#6B7B8C'},
  {id: 'forest', name: 'Forest Green', hex: '#4A7C59'},
  {id: 'terracotta', name: 'Terracotta', hex: '#C67B5C'},
  {id: 'dusty-rose', name: 'Dusty Rose', hex: '#C9A9A6'},
  {id: 'mustard', name: 'Mustard Yellow', hex: '#D4A84B'},
  {id: 'burgundy', name: 'Burgundy', hex: '#800020'},
  {id: 'teal', name: 'Deep Teal', hex: '#006D77'},
  {id: 'sand', name: 'Desert Sand', hex: '#C2B280'},
  {id: 'mocha', name: 'Mocha Brown', hex: '#967969'},
  {id: 'lavender', name: 'Soft Lavender', hex: '#C8B8DB'},
  {id: 'sky', name: 'Sky Blue', hex: '#87CEEB'},
  {id: 'coral', name: 'Light Coral', hex: '#F08080'},
];

const headerStyles = [
  {
    id: 'pinch-pleat',
    name: 'Pinch Pleat',
    fullness: '200%',
    price: 0,
    description:
      'Classic single-pinch design with elegant, evenly spaced pleats. Timeless look that works with any decor.',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda',
  },
  {
    id: 'triple-pleat',
    name: 'Triple Pleat',
    fullness: '250%',
    price: 35,
    description:
      'Three-finger pinch for maximum fullness. Creates a luxurious, formal appearance perfect for traditional spaces.',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda',
  },
  {
    id: 'tailor-pleat',
    name: 'Tailor Pleat',
    fullness: '180%',
    price: 25,
    description:
      'Modern streamlined look with tailored precision. Clean lines for contemporary and minimalist interiors.',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda',
  },
];

const liningOptions = [
  {
    id: 'unlined',
    name: 'Unlined',
    price: 0,
    description: 'Light and airy, shows fabric texture',
  },
  {
    id: 'standard',
    name: 'Standard Lining',
    price: 45,
    description: 'Privacy and light filtering',
  },
  {
    id: 'blackout',
    name: 'Blackout Lining',
    price: 75,
    description: 'Blocks 99% of light, thermal insulation',
  },
  {
    id: 'interlined',
    name: 'Interlined',
    price: 95,
    description: 'Adds body and luxury',
  },
];

const tieBackOptions = [
  {
    id: 'none',
    name: 'None',
    price: 0,
    description: 'Clean, straight hanging panels',
  },
  {
    id: 'matching',
    name: 'Matching Fabric',
    price: 29,
    description: 'Made from the same fabric',
  },
  {
    id: 'rope',
    name: 'Decorative Rope',
    price: 39,
    description: 'Braided rope with tassels',
  },
];

const reviewsData = [
  {
    id: '1',
    author: 'Sarah M.',
    rating: 5,
    date: '2024-02-20',
    title: 'Absolutely stunning!',
    content:
      'The triple pleat drapes transformed my living room. The quality is exceptional.',
    verified: true,
  },
  {
    id: '2',
    author: 'Michael R.',
    rating: 5,
    date: '2024-02-15',
    title: 'Worth every penny',
    content:
      'Custom drapes that look like they came from a high-end design showroom.',
    verified: true,
  },
  {
    id: '3',
    author: 'Jennifer L.',
    rating: 5,
    date: '2024-02-10',
    title: 'Perfect fit',
    content: 'Ordered swatches first which helped me choose the right color.',
    verified: true,
  },
];

const galleryImages = [
  {
    id: '1',
    url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda',
    alt: 'Customer living room with cream drapery',
    customer: 'Emma T.',
    location: 'Los Angeles, CA',
  },
  {
    id: '2',
    url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
    alt: 'Customer bedroom with charcoal drapes',
    customer: 'David K.',
    location: 'New York, NY',
  },
  {
    id: '3',
    url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda',
    alt: 'Customer dining room with sage curtains',
    customer: 'Michelle L.',
    location: 'Chicago, IL',
  },
  {
    id: '4',
    url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda',
    alt: 'Customer nursery with blush drapery',
    customer: 'Rachel M.',
    location: 'Seattle, WA',
  },
  {
    id: '5',
    url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/175e3a9252f44ba7890cc2631f892e5d_ve_miaoda',
    alt: 'Customer home office with navy velvet',
    customer: 'James P.',
    location: 'Austin, TX',
  },
  {
    id: '6',
    url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/be670cd2b29a4879b9cdd5817a0a2448_ve_miaoda',
    alt: 'Customer minimalist living room',
    customer: 'Lisa W.',
    location: 'Denver, CO',
  },
];

const RealLifeGallery = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-2xl font-semibold text-slate-900">
          Real-Life Gallery
        </h3>
        <p className="text-gray-500 mt-1">
          See how LuxDrape transforms real homes
        </p>
      </div>
      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
        Customer Photos
      </span>
    </div>
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {galleryImages.map((img, idx) => (
        <div key={img.id} className="break-inside-avoid">
          <div
            className={`relative overflow-hidden group cursor-pointer rounded-xl ${idx === 0 || idx === 3 ? 'aspect-[3/4]' : idx === 1 || idx === 4 ? 'aspect-[4/3]' : 'aspect-square'}`}
          >
            <Image
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-medium">{img.customer}</p>
                <p className="text-sm opacity-80">{img.location}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="text-center pt-4">
      <Button
        variant="outline"
        className="rounded-lg border-slate-300 text-slate-700 hover:bg-slate-50"
      >
        <ThumbsUpIcon className="w-4 h-4 mr-2" />
        Share Your Photos
      </Button>
      <p className="text-sm text-gray-500 mt-2">
        Tag @LuxDrape and get 10% off your next order
      </p>
    </div>
  </div>
);

const CollapsibleSection = ({title, subtitle, isOpen, onToggle, children}) => (
  <div className="border border-gray-200 bg-white">
    <button
      onClick={onToggle}
      className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
    >
      <div>
        <span className="font-medium text-gray-900">{title}</span>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <ChevronDownIcon
        className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    {isOpen && (
      <div className="px-4 pb-4 border-t border-gray-100">{children}</div>
    )}
  </div>
);

const HorizontalScroll = ({children, className = ''}) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const {scrollLeft, scrollWidth, clientWidth} = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={`relative ${className}`}>
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 flex items-center justify-center shadow-sm"
        >
          <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-1 py-1"
        style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
      >
        {children}
      </div>
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 flex items-center justify-center shadow-sm"
        >
          <ChevronRightIcon className="w-4 h-4 text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default function ProductDetailLuxV7Page() {
  const navigate = useNavigate();
  const {addToCart} = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(productColors[0]);
  const [selectedHeaderStyle, setSelectedHeaderStyle] = useState(
    headerStyles[0],
  );
  const [selectedLining, setSelectedLining] = useState(liningOptions[1]);
  const [selectedTieBack, setSelectedTieBack] = useState(tieBackOptions[0]);
  const [width, setWidth] = useState('50');
  const [height, setHeight] = useState('84');
  const [quantity, setQuantity] = useState(2);
  const [isSwatchDialogOpen, setIsSwatchDialogOpen] = useState(false);
  const [openSections, setOpenSections] = useState([
    'color',
    'header',
    'dimensions',
  ]);

  const toggleSection = (section) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const totalPrice = useMemo(() => {
    const basePrice = productData.basePrice;
    const headerPrice = selectedHeaderStyle.price;
    const liningPrice = selectedLining.price;
    const tieBackPrice = selectedTieBack.price * quantity;
    const widthValue = parseFloat(width) || 50;
    const heightValue = parseFloat(height) || 84;
    const sizeMultiplier = (widthValue * heightValue) / (50 * 84);
    const unitPrice =
      (basePrice + headerPrice + liningPrice) * Math.max(sizeMultiplier, 0.7);
    return Math.round(unitPrice * quantity + tieBackPrice);
  }, [
    selectedHeaderStyle,
    selectedLining,
    selectedTieBack,
    width,
    height,
    quantity,
  ]);

  const handleAddToCart = () => {
    const cartItem = {
      id: `${productData.id}-${Date.now()}`,
      productId: productData.id,
      productName: productData.name,
      fabric: selectedColor.name,
      dimensions: {
        width: parseFloat(width) || 50,
        height: parseFloat(height) || 84,
        unit: 'inches',
      },
      lining: selectedLining.id,
      mounting: 'cordless',
      quantity,
      unitPrice: totalPrice / quantity,
      image: productData.images[0].url,
    };
    addToCart(cartItem);
    toast.success('Added to cart!');
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b border-gray-200">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-gray-900">
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate('/shop')}
            className="hover:text-gray-900"
          >
            Shop
          </button>
          <span>/</span>
          <span className="text-gray-900">Custom Pinch Pleat Drapery</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
              <Image
                src={productData.images[currentImageIndex].url}
                alt={productData.images[currentImageIndex].alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 text-xs font-medium bg-slate-800 text-white">
                  Custom Made
                </span>
              </div>
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? productData.images.length - 1 : prev - 1,
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5 text-slate-800" />
              </button>
              <button
                onClick={() =>
                  setCurrentImageIndex(
                    (prev) => (prev + 1) % productData.images.length,
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
              >
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
                  <Image
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="hidden lg:flex items-center gap-4 pt-4 text-sm text-gray-600 border-t border-gray-200">
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

          <div className="space-y-6">
            <div className="space-y-3 pb-6 border-b border-gray-200">
              <span className="text-xs font-medium text-emerald-700 uppercase tracking-wide">
                Made to Order
              </span>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                Custom Pinch Pleat Drapery
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(productData.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {productData.rating}
                </span>
                <span className="text-sm text-gray-500">
                  ({productData.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-3xl font-semibold text-gray-900">
                  ${totalPrice}
                </span>
                <span className="text-gray-500">for {quantity} panels</span>
              </div>
            </div>

            <div className="space-y-3">
              <CollapsibleSection
                title="Fabric Color"
                subtitle={selectedColor.name}
                isOpen={openSections.includes('color')}
                onToggle={() => toggleSection('color')}
              >
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {productColors.length} colors available
                    </span>
                    <button
                      onClick={() => setIsSwatchDialogOpen(true)}
                      className="text-sm text-slate-700 underline"
                    >
                      Order Free Swatches
                    </button>
                  </div>
                  <HorizontalScroll>
                    {productColors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-14 h-14 shrink-0 border-2 transition-all ${selectedColor.id === color.id ? 'border-slate-800 ring-1 ring-slate-800' : 'border-gray-200 hover:border-gray-400'}`}
                        style={{backgroundColor: color.hex}}
                        title={color.name}
                      >
                        {selectedColor.id === color.id && (
                          <CheckIcon
                            className={`absolute inset-0 m-auto w-4 h-4 ${['#F8F6F1', '#E8E4DC', '#E8D5D0', '#FFFDD0'].includes(color.hex) ? 'text-slate-800' : 'text-white'}`}
                          />
                        )}
                      </button>
                    ))}
                  </HorizontalScroll>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Header Style"
                subtitle={selectedHeaderStyle.name}
                isOpen={openSections.includes('header')}
                onToggle={() => toggleSection('header')}
              >
                <div className="pt-4 space-y-3">
                  <RadioGroup
                    value={selectedHeaderStyle.id}
                    onValueChange={(val) => {
                      const style = headerStyles.find((s) => s.id === val);
                      if (style) setSelectedHeaderStyle(style);
                    }}
                  >
                    <div className="space-y-3">
                      {headerStyles.map((style) => (
                        <div key={style.id}>
                          <RadioGroupItem
                            value={style.id}
                            id={style.id}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={style.id}
                            className="flex gap-4 p-3 border border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300"
                          >
                            <div className="w-24 h-24 shrink-0 bg-gray-100 overflow-hidden">
                              <Image
                                src={style.image}
                                alt={style.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-gray-900">
                                  {style.name}
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                  {style.price > 0
                                    ? `+$${style.price}`
                                    : 'Included'}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 mb-2">
                                {style.description}
                              </p>
                              <span className="text-xs text-gray-400">
                                Fullness: {style.fullness}
                              </span>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Panel Dimensions"
                subtitle={`${width}" W × ${height}" H per panel`}
                isOpen={openSections.includes('dimensions')}
                onToggle={() => toggleSection('dimensions')}
              >
                <div className="pt-4 space-y-4">
                  <div className="bg-gray-50 border border-gray-200 p-4">
                    <p className="font-medium text-gray-900 mb-3">
                      How to Measure
                    </p>
                    <div className="aspect-[16/9] bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                      <RulerIcon className="w-10 h-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Measuring Guide Illustration
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Shows how to measure window for custom drapes
                      </p>
                    </div>
                    <div className="mt-3 text-sm text-gray-600 space-y-1">
                      <p>
                        1. Measure width at top, middle, bottom - use narrowest
                      </p>
                      <p>
                        2. Measure height at left, center, right - use longest
                      </p>
                      <p>3. Round to nearest 1/8 inch</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500">
                        Width (inches)
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          type="number"
                          step="0.5"
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          className="h-11 pr-10"
                          placeholder="50"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                          in
                        </span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">
                        Height (inches)
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          type="number"
                          step="0.5"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="h-11 pr-10"
                          placeholder="84"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                          in
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-blue-50 text-sm text-blue-800">
                    <InfoIcon className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      For a pair of panels, order 2 panels. Each panel will be
                      made to the dimensions above. Standard pair coverage:
                      72-96 inches window width.
                    </span>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Lining Option"
                subtitle={selectedLining.name}
                isOpen={openSections.includes('lining')}
                onToggle={() => toggleSection('lining')}
              >
                <div className="pt-4 space-y-3">
                  <RadioGroup
                    value={selectedLining.id}
                    onValueChange={(val) => {
                      const lining = liningOptions.find((l) => l.id === val);
                      if (lining) setSelectedLining(lining);
                    }}
                  >
                    <div className="space-y-2">
                      {liningOptions.map((lining) => (
                        <div key={lining.id}>
                          <RadioGroupItem
                            value={lining.id}
                            id={`lining-${lining.id}`}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={`lining-${lining.id}`}
                            className="flex items-center justify-between p-3 border border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300"
                          >
                            <div>
                              <span className="font-medium text-gray-900">
                                {lining.name}
                              </span>
                              <p className="text-sm text-gray-500">
                                {lining.description}
                              </p>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {lining.price > 0
                                ? `+$${lining.price}`
                                : 'Included'}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Tie Backs"
                subtitle={selectedTieBack.name}
                isOpen={openSections.includes('tiebacks')}
                onToggle={() => toggleSection('tiebacks')}
              >
                <div className="pt-4 space-y-3">
                  <RadioGroup
                    value={selectedTieBack.id}
                    onValueChange={(val) => {
                      const tieBack = tieBackOptions.find((t) => t.id === val);
                      if (tieBack) setSelectedTieBack(tieBack);
                    }}
                  >
                    <div className="space-y-2">
                      {tieBackOptions.map((tieBack) => (
                        <div key={tieBack.id}>
                          <RadioGroupItem
                            value={tieBack.id}
                            id={`tieback-${tieBack.id}`}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={`tieback-${tieBack.id}`}
                            className="flex items-center justify-between p-3 border border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300"
                          >
                            <div>
                              <span className="font-medium text-gray-900">
                                {tieBack.name}
                              </span>
                              <p className="text-sm text-gray-500">
                                {tieBack.description}
                              </p>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {tieBack.price > 0
                                ? `+$${tieBack.price}`
                                : 'Included'}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </CollapsibleSection>
            </div>

            <div className="pt-6 border-t border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Quantity</span>
                <div className="flex items-center border border-gray-300">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-3xl font-semibold text-gray-900">
                    ${totalPrice}
                  </p>
                </div>
                <Button
                  size="lg"
                  className="h-14 px-8 bg-slate-800 hover:bg-slate-700 text-white text-lg"
                  onClick={handleAddToCart}
                >
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

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              Product Information
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our premium custom drapery, from
              materials and care to installation and warranty coverage.
            </p>
          </div>
          <Accordion
            type="multiple"
            defaultValue={['measurement', 'specs']}
            className="w-full space-y-4"
          >
            <AccordionItem
              value="measurement"
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <RulerIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <span className="font-semibold text-lg text-slate-900">
                      Measurement & Installation Guide
                    </span>
                    <p className="text-sm text-gray-500 font-normal">
                      Learn how to measure your windows and install your custom
                      curtains
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <span className="text-xl font-bold text-emerald-600">
                              1
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">
                              Easy Level
                            </p>
                            <p className="text-sm text-gray-500">
                              15-20 minutes
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Installation difficulty rated as beginner-friendly.
                          Basic tools required.
                        </p>
                      </div>
                      <div className="p-5 bg-gray-50 rounded-xl">
                        <p className="font-semibold text-slate-900 mb-3">
                          Tools Needed
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'Screwdriver',
                            'Drill',
                            'Level',
                            'Measuring Tape',
                          ].map((tool) => (
                            <span
                              key={tool}
                              className="px-3 py-1 bg-white text-sm text-gray-600 rounded-full border border-gray-200"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <InfoIcon className="w-4 h-4 text-blue-600" />
                        Quick Measuring Tips for Custom Curtains
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>
                            Measure width at top, middle, and bottom — use the
                            narrowest measurement for inside mount
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>
                            Measure height at left, center, and right — use the
                            longest measurement
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>
                            Round to nearest 1/8 inch for best fit on custom
                            window treatments
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>
                            Use a steel measuring tape for accuracy on large
                            window drapery
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                      <PlayIcon className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-gray-600 font-medium">
                        Installation Video
                      </p>
                      <p className="text-sm text-gray-500">2-minute guide</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-slate-400 transition-colors text-center">
                        <FileTextIcon className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-slate-900">
                          PDF Guide
                        </p>
                        <p className="text-xs text-gray-500">Download</p>
                      </button>
                      <button className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-slate-400 transition-colors text-center">
                        <RulerIcon className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-slate-900">
                          Measuring
                        </p>
                        <p className="text-xs text-gray-500">Tutorial</p>
                      </button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="specs"
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <InfoIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <span className="font-semibold text-lg text-slate-900">
                      Technical Specifications
                    </span>
                    <p className="text-sm text-gray-500 font-normal">
                      Detailed specs for our custom-made window treatments
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      {[
                        {
                          label: 'Materials Available',
                          value: 'Premium Linen Blend, Cotton Sateen, Velvet',
                        },
                        {label: 'Width Range', value: '24" - 144" per panel'},
                        {label: 'Height Range', value: '24" - 120"'},
                        {
                          label: 'Header Styles',
                          value: 'Pinch Pleat, Triple Pleat, Tailor Pleat',
                        },
                        {
                          label: 'Lining Options',
                          value: 'Unlined, Standard, Blackout, Interlined',
                        },
                        {
                          label: 'Hardware Included',
                          value: 'Rings, hooks, and installation hardware',
                        },
                        {label: 'Warranty', value: '3 Year Limited'},
                        {
                          label: 'Production Time',
                          value: '10-14 business days',
                        },
                        {label: 'Shipping', value: 'Free on orders over $200'},
                        {label: 'Returns', value: 'Custom orders - see policy'},
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between py-3 border-b border-gray-100"
                        >
                          <span className="text-gray-500">{item.label}</span>
                          <span className="font-medium text-slate-900 text-right">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                    <InfoIcon className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium">
                      Technical Diagram
                    </p>
                    <p className="text-sm text-gray-500">
                      Panel construction details
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="care"
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <DropletsIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <span className="font-semibold text-lg text-slate-900">
                      Care & Maintenance
                    </span>
                    <p className="text-sm text-gray-500 font-normal">
                      Keep your luxury drapes looking beautiful for years
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">
                        Regular Maintenance
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            Vacuum gently using brush attachment monthly
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            Dust with feather duster or microfiber cloth
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Shake panels gently to remove dust</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">
                        Professional Cleaning
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Dry clean recommended for best results</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Frequency: Every 2-3 years</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            Use reputable cleaner experienced with drapes
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="sm:col-span-2 p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <p className="font-semibold text-amber-900 mb-1">
                        Important Care Note
                      </p>
                      <p className="text-sm text-amber-800">
                        Do not machine wash or tumble dry your custom curtains.
                        High heat can damage fabric and lining. Blackout lining
                        requires special care.
                      </p>
                    </div>
                  </div>
                  <div className="aspect-[4/5] bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                    <DropletsIcon className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium">
                      Care Instructions
                    </p>
                    <p className="text-sm text-gray-500">Visual care guide</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="returns"
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <RotateCcwIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <span className="font-semibold text-lg text-slate-900">
                      Returns & Warranty Policy
                    </span>
                    <p className="text-sm text-gray-500 font-normal">
                      Custom product protection & shipping coverage
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-5 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                        3-Year Limited Warranty
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>
                          • Covers manufacturing defects in materials and
                          workmanship
                        </li>
                        <li>
                          • Includes header construction, stitching, and lining
                        </li>
                        <li>• Hardware components covered for 1 year</li>
                      </ul>
                    </div>
                    <div className="p-5 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <TruckIcon className="w-4 h-4 text-emerald-600" />
                        Shipping Protection
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Inspect package immediately upon receipt</li>
                        <li>• Report damage within 48 hours with photos</li>
                        <li>• We expedite replacement at no cost</li>
                      </ul>
                    </div>
                  </div>
                  <div className="aspect-video bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                    <ShieldCheckIcon className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium">Warranty Badge</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="safety"
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <BabyIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <span className="font-semibold text-lg text-slate-900">
                      Child Safety Features
                    </span>
                    <p className="text-sm text-gray-500 font-normal">
                      WCSC certified cordless design for peace of mind
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <ShieldIcon className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-slate-900 mb-1">
                      WCSC Certified
                    </h4>
                    <p className="text-sm text-gray-600">
                      Meets all Window Covering Safety Council standards
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <VolumeXIcon className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-slate-900 mb-1">
                      Zero Exposed Cords
                    </h4>
                    <p className="text-sm text-gray-600">
                      Completely cordless design eliminates hazard
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <AwardIcon className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-slate-900 mb-1">
                      Best for Kids
                    </h4>
                    <p className="text-sm text-gray-600">
                      Independently tested and certified safe
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
