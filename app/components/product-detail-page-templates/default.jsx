import React, {useState, useMemo, useRef, useEffect} from 'react';
import {
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useOptimisticVariant,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {useNavigate} from 'react-router-dom';
import {Button} from '~/components/ui/button';
import {Label} from '~/components/ui/label';
import {Popover, PopoverContent, PopoverTrigger} from '~/components/ui/popover';
import {Input} from '~/components/ui/input';
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
import {ProductForm} from '~/components/ProductForm';
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

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// ============================================
// Product Data
// ============================================
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

// Extended colors to demonstrate horizontal scroll (20 colors)
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

// ============================================
// Real Life Gallery Component
// ============================================
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
            <img
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

// ============================================
// Collapsible Section Component
// ============================================
const CollapsibleSection = ({title, subtitle, isOpen, onToggle, children}) => {
  return (
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
};

// ============================================
// Horizontal Scroll Container
// ============================================
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
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
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

// ============================================
// Main Product Page Component - V7
// ============================================
const ProductDetailPage = ({product, productOptionsData}) => {
  const navigate = useNavigate();

  // Use Shopify product data
  const productTitle = product?.title || productData.name;
  const productDescription = product?.description || productData.description;

  const getProductMetafieldValue = (namespace, key) =>
    product?.metafields?.find(
      (metafield) =>
        metafield?.namespace === namespace && metafield?.key === key,
    )?.value;

  const parseReviewRating = (value, fallback) => {
    if (!value) return fallback;

    try {
      const parsed = JSON.parse(value);
      const rating = Number(parsed?.value);

      if (Number.isFinite(rating)) {
        return rating;
      }
    } catch {}

    const rating = Number(value);
    return Number.isFinite(rating) ? rating : fallback;
  };

  const parseReviewCount = (value, fallback) => {
    if (value === null || value === undefined || value === '') return fallback;

    const count = Number(value);
    return Number.isFinite(count) ? count : fallback;
  };

  // Hydrogen variant handling for ProductForm
  const selectedVariant = useOptimisticVariant(
    product?.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const productPrice = Number(
    selectedVariant?.price?.amount ?? productData.basePrice,
  );
  const productImages = product?.images?.nodes || productData.images;
  const productRating = parseReviewRating(
    getProductMetafieldValue('reviews', 'rating'),
    productData.rating,
  );
  const productReviewCount = parseReviewCount(
    getProductMetafieldValue('reviews', 'rating_count'),
    productData.reviewCount,
  );

  // Parse metafields for specifications
  const specifications = {};
  if (product?.metafields) {
    product.metafields.forEach((metafield) => {
      if (metafield && metafield.key) {
        specifications[metafield.key] = metafield.value;
      }
    });
  }

  // Default specifications fallback
  const defaultSpecs = [
    {
      label: 'Materials Available',
      value: 'Premium Linen Blend, Cotton Sateen, Velvet',
      key: 'materials',
    },
    {label: 'Width Range', value: '24" - 144" per panel', key: 'width_range'},
    {label: 'Height Range', value: '24" - 120"', key: 'height_range'},
    {
      label: 'Header Styles',
      value: 'Pinch Pleat, Triple Pleat, Tailor Pleat',
      key: 'header_styles',
    },
    {
      label: 'Lining Options',
      value: 'Unlined, Standard, Blackout, Interlined',
      key: 'lining_options',
    },
    {
      label: 'Hardware Included',
      value: 'Rings, hooks, and installation hardware',
      key: 'hardware',
    },
    {label: 'Warranty', value: '3 Year Limited', key: 'warranty'},
    {
      label: 'Production Time',
      value: '10-14 business days',
      key: 'production_time',
    },
    {label: 'Shipping', value: 'Free on orders over $200', key: 'shipping'},
    {label: 'Returns', value: 'Custom orders - see policy', key: 'returns'},
  ];

  // Build specs array with metafield data
  const productSpecs = defaultSpecs.map((spec) => ({
    label: spec.label,
    value: specifications[spec.key] || spec.value,
  }));

  const colorOptions = productOptionsData?.color || productColors;
  const headerOptions = Array.isArray(productOptionsData?.header)
    ? productOptionsData.header
    : [];
  const liningOptionsData = productOptionsData?.lining_options || liningOptions;
  const tiebacksData = productOptionsData?.tiebacks || tieBackOptions;
  const shapingOptionsData = productOptionsData?.shaping_options || [];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedColorSampleImage, setSelectedColorSampleImage] =
    useState(null);
  const [selectedHeaderStyle, setSelectedHeaderStyle] = useState(null);
  const [selectedLining, setSelectedLining] = useState(
    () => liningOptionsData[0] || null,
  );
  const [selectedTieBack, setSelectedTieBack] = useState(
    () => tiebacksData[0] || null,
  );
  const [selectedShapingOption, setSelectedShapingOption] = useState(
    () => shapingOptionsData[0] || null,
  );
  const widthOptions = useMemo(
    () => productOptionsData?.width || [],
    [productOptionsData],
  );
  const heightOptions = useMemo(
    () => productOptionsData?.length || [],
    [productOptionsData],
  );
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [widthSearch, setWidthSearch] = useState('');
  const [heightSearch, setHeightSearch] = useState('');
  const [widthOpen, setWidthOpen] = useState(false);
  const [heightOpen, setHeightOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isSwatchDialogOpen, setIsSwatchDialogOpen] = useState(false);
  const [roomLabel, setRoomLabel] = useState('');
  const selectedDisplayWidthOption = widthOptions.find(
    (option) => option.key.toString() === width,
  );
  const selectedDisplayHeightOption = heightOptions.find(
    (option) => option.key.toString() === height,
  );
  const selectedHeaderStylePrice = Number(selectedHeaderStyle?.price) || 0;
  const selectedLiningPrice = Number(selectedLining?.price) || 0;
  const selectedTieBackPrice = Number(selectedTieBack?.price) || 0;
  const selectedShapingPrice = Number(selectedShapingOption?.price) || 0;
  const selectedWidthPrice = Number(selectedDisplayWidthOption?.price) || 0;
  const selectedHeightPrice = Number(selectedDisplayHeightOption?.price) || 0;
  const displayedUnitPrice =
    productPrice +
    selectedHeaderStylePrice +
    selectedLiningPrice +
    selectedTieBackPrice +
    selectedShapingPrice +
    selectedWidthPrice +
    selectedHeightPrice;
  const displayedPrice = Number(
    (displayedUnitPrice * quantity).toFixed(2),
  );
  const formattedDisplayedPrice = currencyFormatter.format(displayedPrice);

  const filteredWidthOptions = widthOptions.filter((option) =>
    option.key.toString().startsWith(widthSearch),
  );
  const filteredHeightOptions = heightOptions.filter((option) =>
    option.key.toString().startsWith(heightSearch),
  );

  // Accordion states
  const [openSections, setOpenSections] = useState([
    'color',
    'header',
    'dimensions',
    'room-label',
  ]);

  const toggleSection = (section) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const totalPrice = useMemo(() => {
    const basePrice = productPrice;
    const headerPrice = selectedHeaderStyle?.price || 0;
    const liningPrice = Number(selectedLining?.price) || 0;
    const tieBackPrice = (Number(selectedTieBack?.price) || 0) * quantity;
    const shapingPrice = (Number(selectedShapingOption?.price) || 0) * quantity;

    const selectedWidthOption = widthOptions.find(
      (w) => w.key.toString() === width,
    );
    const selectedHeightOption = heightOptions.find(
      (h) => h.key.toString() === height,
    );
    const widthPrice = Number(selectedWidthOption?.price) || 0;
    const heightPrice = Number(selectedHeightOption?.price) || 0;

    const unitPrice =
      basePrice + headerPrice + liningPrice + widthPrice + heightPrice;
    return parseFloat(
      (unitPrice * quantity + tieBackPrice + shapingPrice).toFixed(2),
    );
  }, [
    selectedHeaderStyle,
    selectedLining,
    selectedTieBack,
    selectedShapingOption,
    width,
    height,
    widthOptions,
    heightOptions,
    quantity,
    productPrice,
  ]);

  const lineAttributes = useMemo(() => {
    const headerValue = selectedHeaderStyle?.name
      ? Number(selectedHeaderStyle?.price) > 0
        ? `${selectedHeaderStyle.name} | $${selectedHeaderStyle.price}`
        : selectedHeaderStyle.name
      : null;
    const widthValue = selectedDisplayWidthOption?.key
      ? Number(selectedDisplayWidthOption?.price) > 0
        ? `${selectedDisplayWidthOption.key} | $${selectedDisplayWidthOption.price}`
        : String(selectedDisplayWidthOption.key)
      : null;
    const heightValue = selectedDisplayHeightOption?.key
      ? Number(selectedDisplayHeightOption?.price) > 0
        ? `${selectedDisplayHeightOption.key} | $${selectedDisplayHeightOption.price}`
        : String(selectedDisplayHeightOption.key)
      : null;
    const tieBackValue = selectedTieBack?.name
      ? Number(selectedTieBack?.price) > 0
        ? `${selectedTieBack.name} | $${selectedTieBack.price}`
        : selectedTieBack.name
      : null;
    const memoryShapingValue = selectedShapingOption?.name
      ? Number(selectedShapingOption?.price) > 0
        ? `${selectedShapingOption.name} | $${selectedShapingOption.price}`
        : selectedShapingOption.name
      : null;
    const trimmedRoomLabel = roomLabel.trim();

    return [
      headerValue ? {key: 'header', value: headerValue} : null,
      widthValue ? {key: 'width', value: widthValue} : null,
      heightValue ? {key: 'height', value: heightValue} : null,
      tieBackValue ? {key: 'tie_backs', value: tieBackValue} : null,
      memoryShapingValue
        ? {key: 'memory_shaping', value: memoryShapingValue}
        : null,
      trimmedRoomLabel ? {key: 'room_label', value: trimmedRoomLabel} : null,
      {key: '_custom_price', value: displayedUnitPrice.toFixed(2)},
    ].filter(Boolean);
  }, [
    displayedUnitPrice,
    roomLabel,
    selectedDisplayHeightOption,
    selectedDisplayWidthOption,
    selectedHeaderStyle,
    selectedShapingOption,
    selectedTieBack,
  ]);

  useEffect(() => {
    if (colorOptions.length > 0 && !selectedColor) {
      setSelectedColor(colorOptions[0]);
      setSelectedColorSampleImage(colorOptions[0]?.product_image || null);
    }
  }, [colorOptions, selectedColor]);

  useEffect(() => {
    const currentStyle = selectedHeaderStyle;
    const isFromOldOptions =
      currentStyle && !headerOptions.some((h) => h.name === currentStyle?.name);
    if (isFromOldOptions) {
      setSelectedHeaderStyle(null);
    }
  }, [headerOptions, selectedHeaderStyle]);

  useEffect(() => {
    if (liningOptionsData.length > 0) {
      const currentLining = selectedLining;
      const isFromOldOptions =
        currentLining &&
        !liningOptionsData.some((l) => l.name === currentLining?.name);
      if (!currentLining || isFromOldOptions) {
        setSelectedLining(liningOptionsData[0]);
      }
    }
  }, [liningOptionsData, selectedLining]);

  useEffect(() => {
    if (tiebacksData.length > 0) {
      const currentTieBack = selectedTieBack;
      const isFromOldOptions =
        currentTieBack &&
        !tiebacksData.some((t) => t.name === currentTieBack?.name);
      if (!currentTieBack || isFromOldOptions) {
        setSelectedTieBack(tiebacksData[0]);
      }
    }
  }, [tiebacksData, selectedTieBack]);

  useEffect(() => {
    if (shapingOptionsData.length > 0) {
      const currentShapingOption = selectedShapingOption;
      const isFromOldOptions =
        currentShapingOption &&
        !shapingOptionsData.some((option) => option.name === currentShapingOption?.name);
      if (!currentShapingOption || isFromOldOptions) {
        setSelectedShapingOption(shapingOptionsData[0]);
      }
      return;
    }
    if (selectedShapingOption) {
      setSelectedShapingOption(null);
    }
  }, [shapingOptionsData, selectedShapingOption]);

  const displayImage =
    selectedColorSampleImage ||
    productImages[currentImageIndex]?.url ||
    productData.images[0].url;

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Breadcrumb */}
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
          <span className="text-gray-900">{productTitle}</span>
        </nav>
      </div>

      {/* ============================================ */}
      {/* Main Product Section */}
      {/* Left: Sticky Product Images, Right: Accordion Customization */}
      {/* ============================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT: Sticky Product Images */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
              <img
                src={displayImage}
                alt={
                  productImages[currentImageIndex]?.altText ||
                  productData.images[0].alt
                }
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 text-xs font-medium bg-slate-800 text-white">
                  Custom Made
                </span>
              </div>
              <button
                onClick={() => {
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? productImages.length - 1 : prev - 1,
                  );
                  setSelectedColorSampleImage(null);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5 text-slate-800" />
              </button>
              <button
                onClick={() => {
                  setCurrentImageIndex(
                    (prev) => (prev + 1) % productImages.length,
                  );
                  setSelectedColorSampleImage(null);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5 text-slate-800" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {productImages.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => {
                    setCurrentImageIndex(idx);
                    setSelectedColorSampleImage(null);
                  }}
                  className={`relative w-16 h-16 overflow-hidden transition-all border-2 ${currentImageIndex === idx ? 'border-slate-800' : 'border-gray-200 opacity-60 hover:opacity-100'}`}
                >
                  <img
                    src={img.url || img.previewImage?.url}
                    alt={img.altText || img.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Quick Info */}
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

          {/* RIGHT: Product Info + Accordion Customization */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="space-y-3 pb-6 border-b border-gray-200">
              <span className="text-xs font-medium text-emerald-700 uppercase tracking-wide">
                Made to Order
              </span>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                {productTitle}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(productRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {productRating}
                </span>
                <span className="text-sm text-gray-500">
                  ({productReviewCount} reviews)
                </span>
              </div>
              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-3xl font-semibold text-gray-900">
                  {formattedDisplayedPrice}
                </span>
                <span className="text-gray-500">for {quantity} panels</span>
              </div>
            </div>

            {/* ============================================ */}
            {/* CUSTOMIZATION OPTIONS - ACCORDION STYLE */}
            {/* ============================================ */}
            <div className="space-y-3">
              {/* 1. Color Selection - with Horizontal Scroll */}
              <CollapsibleSection
                title="Fabric Color"
                subtitle={selectedColor?.name || 'Select a color'}
                isOpen={openSections.includes('color')}
                onToggle={() => toggleSection('color')}
              >
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {colorOptions.length} colors available
                    </span>
                    <button
                      onClick={() => setIsSwatchDialogOpen(true)}
                      className="text-sm text-slate-700 underline"
                    >
                      Order Free Swatches
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-80 overflow-y-auto">
                    {colorOptions.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedColor(color);
                          setSelectedColorSampleImage(
                            color.product_image || null,
                          );
                        }}
                        className={`relative w-14 h-14 shrink-0 border transition-all ${selectedColor?.name === color.name ? 'border-gray-500' : 'border-gray-200 hover:border-gray-400'}`}
                        style={{
                          backgroundColor: color.hex || 'transparent',
                          backgroundImage: color.sample_image
                            ? `url(${color.sample_image})`
                            : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                        title={color.name}
                      >
                        {selectedColor?.name === color.name && (
                          <CheckIcon className="absolute inset-0 m-auto w-4 h-4 text-white drop-shadow-md" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </CollapsibleSection>

              {headerOptions.length > 0 ? (
                <CollapsibleSection
                  title="Header Style"
                  subtitle={selectedHeaderStyle?.name || 'Select header style'}
                  isOpen={openSections.includes('header')}
                  onToggle={() => toggleSection('header')}
                >
                  <div className="pt-4 space-y-3">
                    <RadioGroup
                      value={selectedHeaderStyle?.name || selectedHeaderStyle?.id}
                      onValueChange={(val) => {
                        const style = headerOptions.find((s) => s.name === val);
                        if (style) setSelectedHeaderStyle(style);
                      }}
                    >
                      <div className="space-y-3">
                        {headerOptions.map((style, idx) => {
                          const styleId = style.name || style.id;
                          return (
                            <div key={styleId || idx}>
                              <RadioGroupItem
                                value={styleId}
                                id={styleId}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={styleId}
                                className="flex gap-4 p-3 border border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300"
                              >
                                {/* Header Style Image */}
                                <div className="w-24 h-24 shrink-0 bg-gray-100 overflow-hidden">
                                  <img
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
                                      {Number(style.price) > 0
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
                          );
                        })}
                      </div>
                    </RadioGroup>
                  </div>
                </CollapsibleSection>
              ) : null}

              {/* 3. Dimensions - with Visual Guide */}
              <CollapsibleSection
                title="Panel Dimensions"
                subtitle={
                  width && height
                    ? `${width}" W x ${height}" H per panel`
                    : 'Please select dimensions'
                }
                isOpen={openSections.includes('dimensions')}
                onToggle={() => toggleSection('dimensions')}
              >
                <div className="pt-4 space-y-4">
                  {/* Visual Guide Placeholder */}
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

                  {/* Dimension Inputs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500">
                        Width (inches)
                      </Label>
                      <Popover open={widthOpen} onOpenChange={setWidthOpen}>
                        <PopoverTrigger asChild>
                          <button className="mt-1 h-11 w-full bg-white border border-gray-300 rounded-md px-3 text-left flex items-center justify-between text-sm">
                            {width || 'Please select'}
                            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border border-gray-300"
                          align="start"
                        >
                          <div className="border-b border-gray-200">
                            <Input
                              placeholder="Search width..."
                              value={widthSearch}
                              onChange={(e) => setWidthSearch(e.target.value)}
                              className="h-10 border-0 rounded-none focus-visible:ring-0"
                            />
                          </div>
                          <div className="overflow-y-auto max-h-60">
                            {filteredWidthOptions.length === 0 ? (
                              <div className="py-6 text-center text-sm text-gray-500">
                                No results found
                              </div>
                            ) : (
                              filteredWidthOptions.map((option) => (
                                <button
                                  key={option.key}
                                  onClick={() => {
                                    setWidth(option.key.toString());
                                    setWidthSearch('');
                                    setWidthOpen(false);
                                  }}
                                  className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 flex items-center justify-between"
                                >
                                  {option.key}
                                  {option.price !== '0' && (
                                    <span className="text-gray-500 text-xs">
                                      +${option.price}
                                    </span>
                                  )}
                                </button>
                              ))
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">
                        Height (inches)
                      </Label>
                      <Popover open={heightOpen} onOpenChange={setHeightOpen}>
                        <PopoverTrigger asChild>
                          <button className="mt-1 h-11 w-full bg-white border border-gray-300 rounded-md px-3 text-left flex items-center justify-between text-sm">
                            {height || 'Please select'}
                            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border border-gray-300"
                          align="start"
                        >
                          <div className="border-b border-gray-200">
                            <Input
                              placeholder="Search height..."
                              value={heightSearch}
                              onChange={(e) => setHeightSearch(e.target.value)}
                              className="h-10 border-0 rounded-none focus-visible:ring-0"
                            />
                          </div>
                          <div className="overflow-y-auto max-h-60">
                            {filteredHeightOptions.length === 0 ? (
                              <div className="py-6 text-center text-sm text-gray-500">
                                No results found
                              </div>
                            ) : (
                              filteredHeightOptions.map((option) => (
                                <button
                                  key={option.key}
                                  onClick={() => {
                                    setHeight(option.key.toString());
                                    setHeightSearch('');
                                    setHeightOpen(false);
                                  }}
                                  className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 flex items-center justify-between"
                                >
                                  {option.key}
                                  {option.price !== '0' && (
                                    <span className="text-gray-500 text-xs">
                                      +${option.price}
                                    </span>
                                  )}
                                </button>
                              ))
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-blue-50 text-sm text-blue-800">
                    <InfoIcon className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>For a pair of panels, order 2 panels.</span>
                  </div>
                </div>
              </CollapsibleSection>

              {/* 4. Lining */}
              <CollapsibleSection
                title="Lining Option"
                subtitle={selectedLining?.name || 'Select lining'}
                isOpen={openSections.includes('lining')}
                onToggle={() => toggleSection('lining')}
              >
                <div className="pt-4 space-y-3">
                  <RadioGroup
                    value={selectedLining?.name}
                    onValueChange={(val) => {
                      const lining = liningOptionsData.find(
                        (l) => l.name === val,
                      );
                      if (lining) setSelectedLining(lining);
                    }}
                  >
                    <div className="space-y-2">
                      {liningOptionsData.map((lining, idx) => (
                        <div key={lining.name || idx}>
                          <RadioGroupItem
                            value={lining.name}
                            id={`lining-${lining.name}`}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={`lining-${lining.name}`}
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
                              {Number(lining.price) > 0
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

              {/* 5. Tie Backs */}
              <CollapsibleSection
                title="Tie Backs"
                subtitle={selectedTieBack?.name || 'Select tieback'}
                isOpen={openSections.includes('tiebacks')}
                onToggle={() => toggleSection('tiebacks')}
              >
                <div className="pt-4 space-y-3">
                  <RadioGroup
                    value={selectedTieBack?.name}
                    onValueChange={(val) => {
                      const tieBack = tiebacksData.find((t) => t.name === val);
                      if (tieBack) setSelectedTieBack(tieBack);
                    }}
                  >
                    <div className="space-y-2">
                      {tiebacksData.map((tieBack, idx) => (
                        <div key={tieBack.name || idx}>
                          <RadioGroupItem
                            value={tieBack.name}
                            id={`tieback-${tieBack.name}`}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={`tieback-${tieBack.name}`}
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
                              {Number(tieBack.price) > 0
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

              {shapingOptionsData.length > 0 ? (
                <CollapsibleSection
                  title="Memory Shaping"
                  subtitle={selectedShapingOption?.name || 'Select shaping option'}
                  isOpen={openSections.includes('shaping')}
                  onToggle={() => toggleSection('shaping')}
                >
                  <div className="pt-4 space-y-3">
                    <RadioGroup
                      value={selectedShapingOption?.name}
                      onValueChange={(val) => {
                        const shapingOption = shapingOptionsData.find(
                          (option) => option.name === val,
                        );
                        if (shapingOption) setSelectedShapingOption(shapingOption);
                      }}
                    >
                      <div className="space-y-2">
                        {shapingOptionsData.map((shapingOption, idx) => (
                          <div key={shapingOption.name || idx}>
                            <RadioGroupItem
                              value={shapingOption.name}
                              id={`shaping-option-${shapingOption.name}`}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={`shaping-option-${shapingOption.name}`}
                              className="flex items-center justify-between p-3 border border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300"
                            >
                              <div>
                                <span className="font-medium text-gray-900">
                                  {shapingOption.name}
                                </span>
                                <p className="text-sm text-gray-500">
                                  {shapingOption.description}
                                </p>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {Number(shapingOption.price) > 0
                                  ? `+$${shapingOption.price}`
                                  : 'Included'}
                              </span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </CollapsibleSection>
              ) : null}

              <CollapsibleSection
                title="Room Label"
                subtitle={roomLabel.trim() || 'Add room label'}
                isOpen={openSections.includes('room-label')}
                onToggle={() => toggleSection('room-label')}
              >
                <div className="pt-4 space-y-3">
                  <Label
                    htmlFor="room-label"
                    className="text-sm font-medium text-gray-900"
                  >
                    Room Label
                  </Label>
                  <Input
                    id="room-label"
                    value={roomLabel}
                    onChange={(event) => setRoomLabel(event.target.value)}
                    placeholder="Enter room label"
                    className="h-11 border-gray-300"
                  />
                </div>
              </CollapsibleSection>
            </div>

            {/* Add to Cart */}
            <div className="pt-6 border-t border-gray-200 space-y-4">
              {/* Quantity */}
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

              {/* Price & Button */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-3xl font-semibold text-gray-900">
                    {formattedDisplayedPrice}
                  </p>
                </div>
                <ProductForm
                  lineAttributes={lineAttributes}
                  productOptions={productOptions}
                  quantity={quantity}
                  selectedVariant={selectedVariant}
                />
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
      {/* Product Information - Wide Layout */}
      {/* ============================================ */}
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
            {/* Measurement & Installation */}
            <AccordionItem
              value="measurement"
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <RulerIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
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
                  {/* Left: Content */}
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
                            Measure width at top, middle, and bottom 鈥?use the
                            narrowest measurement for inside mount
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>
                            Measure height at left, center, and right 鈥?use the
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

                  {/* Right: Image & Resources */}
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

            {/* Specifications */}
            <AccordionItem
              value="specs"
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <InfoIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
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
                      {productSpecs.map((item, idx) => (
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
                  <div className="space-y-4">
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
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Care Instructions */}
            <AccordionItem
              value="care"
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <DropletsIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
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

            {/* Returns & Warranty */}
            <AccordionItem
              value="returns"
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <RotateCcwIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
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
                          鈥?Covers manufacturing defects in materials and
                          workmanship
                        </li>
                        <li>
                          鈥?Includes header construction, stitching, and lining
                        </li>
                        <li>鈥?Hardware components covered for 1 year</li>
                      </ul>
                    </div>
                    <div className="p-5 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <TruckIcon className="w-4 h-4 text-emerald-600" />
                        Shipping Protection
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>鈥?Inspect package immediately upon receipt</li>
                        <li>鈥?Report damage within 48 hours with photos</li>
                        <li>鈥?We expedite replacement at no cost</li>
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

            {/* Safety */}
            <AccordionItem
              value="safety"
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <BabyIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
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

            {/* Motorized */}
            <AccordionItem
              value="motorized"
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <ZapIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">
                      Motorized Upgrade Options
                    </span>
                    <p className="text-sm text-gray-500 font-normal">
                      Smart home integration & automation features
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      {[
                        {
                          icon: VolumeXIcon,
                          title: 'Whisper Quiet',
                          desc: '<35dB operation',
                        },
                        {
                          icon: BatteryIcon,
                          title: 'Long Battery',
                          desc: 'Up to 6 months',
                        },
                        {
                          icon: WifiIcon,
                          title: 'Smart Home',
                          desc: 'Alexa/Google ready',
                        },
                        {
                          icon: SmartphoneIcon,
                          title: 'App Control',
                          desc: 'iOS & Android',
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="text-center p-4 bg-gray-50 rounded-xl"
                        >
                          <item.icon className="w-6 h-6 text-slate-700 mx-auto mb-2" />
                          <p className="font-medium text-sm text-slate-900">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 border border-gray-200 rounded-xl hover:border-slate-400 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-slate-900">
                            Rechargeable Motor
                          </span>
                          <span className="text-slate-700">+$149/panel</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Built-in lithium battery, USB-C charging. No
                          electrician needed for your automated window
                          treatments.
                        </p>
                      </div>
                      <div className="p-5 border border-gray-200 rounded-xl hover:border-slate-400 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-slate-900">
                            Wired Motor
                          </span>
                          <span className="text-slate-700">+$199/panel</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Hardwired power connection for continuous operation.
                          Professional installation recommended.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="aspect-[3/4] bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                    <ZapIcon className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium">Motor System</p>
                    <p className="text-sm text-gray-500">
                      Product demonstration
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Real-Life Gallery */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <RealLifeGallery />
          </div>

          {/* FAQ Section */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                Frequently Asked Questions
              </h3>
              <p className="text-gray-500">
                Everything you need to know about custom drapery
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border border-gray-200 bg-white">
                  <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-slate-900">
                      How do I measure for custom drapes?
                    </span>
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  <div className="px-6 pb-4 text-gray-600 text-sm">
                    For width, measure the curtain rod length (not the window).
                    For height, measure from the rod to where you want the
                    curtains to end - floor-length should hover 1/2 inch above
                    the floor, while puddle-length adds 2-4 inches for a
                    luxurious pooling effect. Use our measurement guide for
                    detailed instructions.
                  </div>
                </div>
                <div className="border border-gray-200 bg-white">
                  <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-slate-900">
                      What's the difference between pleat styles?
                    </span>
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  <div className="px-6 pb-4 text-gray-600 text-sm">
                    Pinch pleat offers a classic, formal look with sewn-in
                    pleats that create structured folds. Grommet has metal rings
                    for a modern, casual aesthetic with wide, even waves. Rod
                    pocket slides directly onto the rod for a simple, gathered
                    look. Each style affects how the fabric hangs and moves.
                  </div>
                </div>
                <div className="border border-gray-200 bg-white">
                  <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-slate-900">
                      Which lining should I choose?
                    </span>
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  <div className="px-6 pb-4 text-gray-600 text-sm">
                    Unlined is perfect for sheer, decorative panels. Standard
                    lining adds weight and protects fabric from sun damage.
                    Blackout lining blocks 99% of light for bedrooms and media
                    rooms. Thermal lining provides insulation for energy
                    efficiency and temperature control.
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border border-gray-200 bg-white">
                  <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-slate-900">
                      How long until I receive my order?
                    </span>
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  <div className="px-6 pb-4 text-gray-600 text-sm">
                    Each drapery panel is handcrafted to your specifications.
                    Production takes 7-10 business days, and shipping takes 3-5
                    business days. You'll receive tracking information as soon
                    as your order ships. We offer free shipping on all orders
                    over $200.
                  </div>
                </div>
                <div className="border border-gray-200 bg-white">
                  <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-slate-900">
                      Can I return custom drapery?
                    </span>
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  <div className="px-6 pb-4 text-gray-600 text-sm">
                    Because our drapery is custom-made to your exact
                    measurements and specifications, we cannot accept returns or
                    exchanges unless there's a manufacturing defect. We
                    encourage ordering free fabric swatches first to ensure
                    you're satisfied with the color and texture.
                  </div>
                </div>
                <div className="border border-gray-200 bg-white">
                  <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-slate-900">
                      Do you offer installation services?
                    </span>
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  <div className="px-6 pb-4 text-gray-600 text-sm">
                    While we don't provide direct installation services, our
                    curtains are designed for easy DIY installation with
                    included hardware and detailed instructions. We also partner
                    with local installers in major metropolitan areas - contact
                    us for recommendations in your area.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-2xl font-semibold text-slate-900">
                Customer Reviews
              </h3>
              <span className="text-gray-500">({productData.reviewCount})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-6 text-center rounded-xl">
                <div className="text-5xl font-semibold text-slate-900">
                  {productData.rating}
                </div>
                <div className="flex justify-center gap-1 my-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(productData.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  Based on {productData.reviewCount} verified reviews
                </div>
              </div>
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviewsData.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          {review.author}
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      {review.verified && (
                        <span className="ml-auto text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <h4 className="font-medium text-slate-900 mb-1">
                      {review.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {review.content}
                    </p>
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
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Order Free Fabric Samples
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              See colors in your home before ordering. Up to 10 free samples.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-4 gap-2 max-h-60 overflow-y-auto">
              {colorOptions.map((color, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-gray-50 text-center cursor-pointer hover:ring-1 hover:ring-slate-800 transition-all"
                >
                  <div
                    className="w-full h-10 mb-1 border border-gray-200 bg-cover bg-center"
                    style={{
                      backgroundColor: color.hex || 'transparent',
                      backgroundImage: color.sample_image
                        ? `url(${color.sample_image})`
                        : 'none',
                    }}
                  />
                  <p className="text-xs text-gray-900 truncate">{color.name}</p>
                </div>
              ))}
            </div>
            <div className="bg-emerald-50 p-3 flex items-center gap-2 text-sm text-emerald-800">
              <TruckIcon className="w-4 h-4" />
              <span>Free shipping 鈥?Arrives in 3-5 days</span>
            </div>
            <Button
              className="w-full bg-slate-800 hover:bg-slate-700 text-white"
              onClick={() => {
                alert('Samples added to cart!');
                setIsSwatchDialogOpen(false);
              }}
            >
              Add Samples to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailPage;
