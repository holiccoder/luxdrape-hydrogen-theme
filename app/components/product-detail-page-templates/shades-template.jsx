import {useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '~/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '~/components/ui/dialog';
import { Image } from '~/components/ui/image';
import { toast } from 'sonner';
import { useCart } from '~/contexts/cart-context';
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
  VolumeXIcon,
  FileTextIcon,
  PlayIcon,
  AwardIcon,
  ThumbsUpIcon,
} from 'lucide-react';

// ============================================
// Product Data - Shades
// ============================================
const productData = {
  id: 'shades-roller-1',
  name: 'Custom Roller Shades',
  description: 'Sleek, modern roller shades crafted to your exact specifications. Perfect light control with a clean, minimalist aesthetic that complements any room.',
  basePrice: 149.99,
  rating: 4.8,
  reviewCount: 356,
  features: [
    'Custom-made to your window dimensions',
    'Precision roll-up mechanism',
    'Multiple fabric opacities available',
    'Free fabric samples',
    '5-year mechanism warranty'
  ],
  images: [
    { id: '1', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda', alt: 'Custom roller shades in modern living room' },
    { id: '2', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda', alt: 'Roller shades bedroom installation' },
    { id: '3', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda', alt: 'Fabric detail roller shades' },
    { id: '4', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda', alt: 'Motorized roller shades' },
  ],
};

// Extended colors
const productColors = [
  { id: 'white', name: 'Pure White', hex: '#FFFFFF' },
  { id: 'ivory', name: 'Ivory', hex: '#F5F5DC' },
  { id: 'beige', name: 'Warm Beige', hex: '#D4C4A8' },
  { id: 'gray', name: 'Light Gray', hex: '#D3D3D3' },
  { id: 'charcoal', name: 'Charcoal', hex: '#4A4A4A' },
  { id: 'navy', name: 'Navy Blue', hex: '#1E3A5F' },
  { id: 'black', name: 'Blackout Black', hex: '#1A1A1A' },
  { id: 'sage', name: 'Sage Green', hex: '#8FBC8F' },
  { id: 'taupe', name: 'Taupe', hex: '#B8A99A' },
  { id: 'cream', name: 'Cream', hex: '#FFFDD0' },
  { id: 'blush', name: 'Blush Pink', hex: '#F4C2C2' },
  { id: 'sky', name: 'Sky Blue', hex: '#87CEEB' },
];

const liftStyles = [
  { 
    id: 'cordless', 
    name: 'Cordless Lift', 
    price: 0, 
    description: 'Child-safe, spring-assisted lift system. Simply lift or pull down to adjust shade position.',
  },
  { 
    id: 'motorized', 
    name: 'Motorized Lift', 
    price: 149, 
    description: 'Rechargeable battery motor with remote control. Compatible with smart home systems.',
  },
  { 
    id: 'continuous', 
    name: 'Continuous Cord Loop', 
    price: 25, 
    description: 'Beaded chain loop for smooth operation. Ideal for large or heavy shades.',
  },
];

const liningOptions = [
  { id: 'light-filtering', name: 'Light Filtering', price: 0, description: 'Softens natural light while maintaining privacy. Perfect for living areas.' },
  { id: 'room-darkening', name: 'Room Darkening', price: 35, description: 'Blocks most light for better sleep and glare reduction. Great for bedrooms.' },
  { id: 'blackout', name: 'Blackout', price: 65, description: 'Blocks 99% of light with thermal insulation. Best for complete darkness.' },
];

const reviewsData = [
  { id: '1', author: 'Amanda K.', rating: 5, date: '2024-02-20', title: 'Perfect fit!', content: 'The motorized shades are so convenient. Installation was a breeze with the no-drill option.', verified: true },
  { id: '2', author: 'Robert T.', rating: 5, date: '2024-02-15', title: 'Great blackout', content: 'Finally sleeping through sunrise. The blackout lining works perfectly.', verified: true },
  { id: '3', author: 'Lisa M.', rating: 5, date: '2024-02-10', title: 'Clean look', content: 'Inside mount looks so sleek. Exactly what I wanted for my modern kitchen.', verified: true },
];

const galleryImages = [
  { id: '1', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda', alt: 'Customer living room with roller shades', customer: 'Emma T.', location: 'Los Angeles, CA' },
  { id: '2', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda', alt: 'Customer bedroom with blackout shades', customer: 'David K.', location: 'New York, NY' },
  { id: '3', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda', alt: 'Customer kitchen with light filtering shades', customer: 'Michelle L.', location: 'Chicago, IL' },
  { id: '4', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda', alt: 'Customer nursery with cordless shades', customer: 'Rachel M.', location: 'Seattle, WA' },
  { id: '5', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/175e3a9252f44ba7890cc2631f892e5d_ve_miaoda', alt: 'Customer office with motorized shades', customer: 'James P.', location: 'Austin, TX' },
  { id: '6', url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/be670cd2b29a4879b9cdd5817a0a2448_ve_miaoda', alt: 'Customer bathroom with privacy shades', customer: 'Lisa W.', location: 'Denver, CO' },
];

// ============================================
// Real Life Gallery Component
// ============================================
const RealLifeGallery = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-2xl font-semibold text-slate-900">Real-Life Gallery</h3>
        <p className="text-gray-500 mt-1">See how our shades transform real homes</p>
      </div>
      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Customer Photos</span>
    </div>
    
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {galleryImages.map((img, idx) => (
        <div key={img.id} className="break-inside-avoid">
          <div className={`relative overflow-hidden group cursor-pointer rounded-xl ${idx === 0 || idx === 3 ? 'aspect-[3/4]' : idx === 1 || idx === 4 ? 'aspect-[4/3]' : 'aspect-square'}`}>
            <Image src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
      <Button variant="outline" className="rounded-lg border-slate-300 text-slate-700 hover:bg-slate-50">
        <ThumbsUpIcon className="w-4 h-4 mr-2" />
        Share Your Photos
      </Button>
      <p className="text-sm text-gray-500 mt-2">Tag @LuxDrape and get 10% off your next order</p>
    </div>
  </div>
);

// ============================================
// Collapsible Section Component
// ============================================
const CollapsibleSection = ({title, subtitle, isOpen, onToggle, children}) => {
  return (
    <div className="border border-gray-200 bg-white rounded-md overflow-hidden">
      <button 
        onClick={onToggle} 
        className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <div>
          <span className="font-medium text-gray-900">{title}</span>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="px-4 pb-4 border-t border-gray-100">{children}</div>}
    </div>
  );
};

// ============================================
// Main Product Page Component - Shades
// ============================================
const ProductDetailShadesPage = ({product, productOptionsData}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

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
      if (Number.isFinite(rating)) return rating;
    } catch {
      // Ignore malformed review metafield values.
    }
    const rating = Number(value);
    return Number.isFinite(rating) ? rating : fallback;
  };

  const parseReviewCount = (value, fallback) => {
    if (value === null || value === undefined || value === '') return fallback;
    const count = Number(value);
    return Number.isFinite(count) ? count : fallback;
  };

  const productTitle = product?.title || productData.name;
  const isWovenWoodShadesProduct = product?.collections?.nodes?.some(
    (collection) => collection?.handle?.toLowerCase() === 'woven-wood-shades',
  );
  const productBasePrice = Number(
    product?.selectedOrFirstAvailableVariant?.price?.amount ??
      productData.basePrice,
  );
  const productRating = parseReviewRating(
    getProductMetafieldValue('reviews', 'rating'),
    productData.rating,
  );
  const productReviewCount = parseReviewCount(
    getProductMetafieldValue('reviews', 'rating_count'),
    productData.reviewCount,
  );

  const toOptionId = (value) =>
    String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const parseMeasurementValue = (value, fallback) => {
    const parsed = Number.parseFloat(String(value ?? ''));
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const parseFractionValue = (value) => {
    const normalized = String(value ?? '0').trim();
    if (!normalized || normalized === '0') return 0;
    if (normalized.includes('/')) {
      const [numerator, denominator] = normalized.split('/').map(Number);
      if (Number.isFinite(numerator) && Number.isFinite(denominator) && denominator !== 0) {
        return numerator / denominator;
      }
    }
    const parsed = Number.parseFloat(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const formatMeasurementLabel = (whole, fraction) => {
    const wholeValue = String(whole ?? '').trim();
    const fractionValue = String(fraction ?? '0').trim();

    if (!wholeValue) return '';
    if (!fractionValue || fractionValue === '0') return wholeValue;

    return `${wholeValue} ${fractionValue}`;
  };

  const colorOptions = useMemo(
    () => {
      if (Array.isArray(productOptionsData?.colors)) {
        return productOptionsData.colors.map((color, index) => ({
          id: toOptionId(color?.name) || `color-${index}`,
          name: color?.name || `Color ${index + 1}`,
          hex: color?.hex || null,
          productImage: color?.product_image || null,
          sampleImage: color?.sample_image || null,
        }));
      }

      // Custom JSON products without explicit colors (e.g. bamboo) should not show Fabric Color.
      if (productOptionsData) {
        return [];
      }

      return productColors;
    },
    [productOptionsData],
  );

  const shouldShowFabricColor = !isWovenWoodShadesProduct && colorOptions.length > 0;

  const mountTypeOptions = useMemo(
    () =>
      Array.isArray(productOptionsData?.mount_options)
        ? productOptionsData.mount_options.map((option, index) => ({
            id: toOptionId(option?.type) || `mount-${index}`,
            name: option?.type || `Mount Option ${index + 1}`,
            price: Number(option?.price) || 0,
            description: option?.description || '',
            image: option?.image || '',
          }))
        : [],
    [productOptionsData?.mount_options],
  );

  const liftStyleOptions = useMemo(
    () =>
      Array.isArray(productOptionsData?.lift_options)
        ? productOptionsData.lift_options.map((option, index) => ({
            id: toOptionId(option?.type) || `lift-${index}`,
            name: option?.type || `Lift Option ${index + 1}`,
            price: Number(option?.price) || 0,
            description: option?.description || '',
            image: option?.image || '',
          }))
        : liftStyles,
    [productOptionsData?.lift_options],
  );

  const motorizationOptions = useMemo(() => {
    if (!Array.isArray(productOptionsData?.motorization)) {
      return [];
    }

    return productOptionsData.motorization
      .map((option, index) => {
        const optionName =
          option?.controller_type || option?.name || option?.type;

        if (!optionName) return null;

        return {
          id: toOptionId(optionName) || `motorization-${index}`,
          name: optionName,
          price: Number(option?.price) || 0,
          description: option?.description || '',
        };
      })
      .filter(Boolean);
  }, [productOptionsData?.motorization]);

  const liningOptionsData = useMemo(() => {
    if (!Array.isArray(productOptionsData?.lining_options)) {
      return liningOptions;
    }

    const normalizedLiningOptions = productOptionsData.lining_options
      .map((option, index) => {
        const optionName = option?.name || option?.type;
        if (!optionName) return null;

        return {
          id: toOptionId(optionName) || `lining-${index}`,
          name: optionName,
          price: Number(option?.price) || 0,
          description: option?.description || '',
          image: option?.image || '',
        };
      })
      .filter(Boolean);

    return normalizedLiningOptions.length > 0
      ? normalizedLiningOptions
      : liningOptions;
  }, [productOptionsData?.lining_options]);

  const valanceOptions = useMemo(
    () =>
      Array.isArray(productOptionsData?.valance)
        ? productOptionsData.valance
            .map((option, index) => {
              const optionName = option?.type || option?.name;
              if (!optionName) return null;

              return {
                id: toOptionId(optionName) || `valance-${index}`,
                name: optionName,
                price: Number(option?.price) || 0,
                description: option?.description || '',
                image: option?.image || '',
              };
            })
            .filter(Boolean)
        : [],
    [productOptionsData?.valance],
  );

  const standardWidthOptions = useMemo(
    () => {
      if (Array.isArray(productOptionsData?.standard_width)) {
        return productOptionsData.standard_width;
      }
      return Array.isArray(productOptionsData?.width) ? productOptionsData.width : [];
    },
    [productOptionsData?.standard_width, productOptionsData?.width],
  );
  const noDrillWidthOptions = useMemo(
    () =>
      Array.isArray(productOptionsData?.nodrill_width)
        ? productOptionsData.nodrill_width
        : [],
    [productOptionsData?.nodrill_width],
  );
  const widthFractionOptions = useMemo(
    () =>
      Array.isArray(productOptionsData?.width_fraction)
        ? productOptionsData.width_fraction
        : [],
    [productOptionsData?.width_fraction],
  );
  const heightOptions = useMemo(
    () => (Array.isArray(productOptionsData?.length) ? productOptionsData.length : []),
    [productOptionsData?.length],
  );
  const heightFractionOptions = useMemo(
    () =>
      Array.isArray(productOptionsData?.length_fraction)
        ? productOptionsData.length_fraction
        : [],
    [productOptionsData?.length_fraction],
  );

  const installationOptions = useMemo(
    () =>
      Array.isArray(productOptionsData?.installation_options)
        ? productOptionsData.installation_options.map((option, index) => ({
            id: toOptionId(option?.type) || `installation-${index}`,
            name: option?.type || `Installation Option ${index + 1}`,
            price: Number(option?.price) || 0,
            description: option?.description || '',
          }))
        : [],
    [productOptionsData?.installation_options],
  );

  const bindingEdgeOptions = useMemo(
    () =>
      Array.isArray(productOptionsData?.edge_binding_options)
        ? productOptionsData.edge_binding_options
            .map((option, index) => {
              const optionName = option?.name || option?.type;
              if (!optionName) return null;

              return {
                id: toOptionId(optionName) || `binding-${index}`,
                name: optionName,
                price: Number(option?.price) || 0,
                description: option?.description || '',
                image: option?.image || '',
              };
            })
            .filter(Boolean)
        : [],
    [productOptionsData?.edge_binding_options],
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(() => colorOptions[0] || null);
  const [selectedColorPreviewImage, setSelectedColorPreviewImage] = useState(
    () => colorOptions[0]?.productImage || colorOptions[0]?.sampleImage || null,
  );
  const [selectedMountType, setSelectedMountType] = useState(
    mountTypeOptions[0] || null,
  );
  const [selectedLiftStyle, setSelectedLiftStyle] = useState(
    liftStyleOptions[0] || null,
  );
  const [selectedMotorization, setSelectedMotorization] = useState(null);
  const [selectedLining, setSelectedLining] = useState(
    () => liningOptionsData[0] || null,
  );
  const [selectedValance, setSelectedValance] = useState(
    () => valanceOptions[0] || null,
  );
  const [selectedBinding, setSelectedBinding] = useState(
    bindingEdgeOptions[0] || null,
  );
  const [selectedNoDrill, setSelectedNoDrill] = useState(
    installationOptions[0] || null,
  );
  const isNoDrillInstallationSelected = useMemo(() => {
    const label = `${selectedNoDrill?.id || ''} ${selectedNoDrill?.name || ''}`.toLowerCase();
    return label.includes('no-drill') || label.includes('nodrill');
  }, [selectedNoDrill?.id, selectedNoDrill?.name]);
  const widthOptions = useMemo(() => {
    if (isNoDrillInstallationSelected && noDrillWidthOptions.length > 0) {
      return noDrillWidthOptions;
    }
    return standardWidthOptions;
  }, [isNoDrillInstallationSelected, noDrillWidthOptions, standardWidthOptions]);
  const [width, setWidth] = useState(
    () => widthOptions[0]?.key?.toString() || '36',
  );
  const [widthFraction, setWidthFraction] = useState(
    () => widthFractionOptions[0]?.key?.toString() || '0',
  );
  const [height, setHeight] = useState(
    () => heightOptions[0]?.key?.toString() || '48',
  );
  const [heightFraction, setHeightFraction] = useState(
    () => heightFractionOptions[0]?.key?.toString() || '0',
  );
  const [widthSearch, setWidthSearch] = useState('');
  const [widthFractionSearch, setWidthFractionSearch] = useState('');
  const [heightSearch, setHeightSearch] = useState('');
  const [heightFractionSearch, setHeightFractionSearch] = useState('');
  const [widthOpen, setWidthOpen] = useState(false);
  const [widthFractionOpen, setWidthFractionOpen] = useState(false);
  const [heightOpen, setHeightOpen] = useState(false);
  const [heightFractionOpen, setHeightFractionOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isSwatchDialogOpen, setIsSwatchDialogOpen] = useState(false);

  const productImages =
    product?.images?.nodes?.length > 0
      ? product.images.nodes.map((img, index) => ({
          id: img?.id || `shopify-image-${index}`,
          url: img?.url,
          alt: img?.altText || product?.title || productData.name,
        }))
      : productData.images;

  useEffect(() => {
    if (currentImageIndex >= productImages.length) {
      setCurrentImageIndex(0);
    }
  }, [currentImageIndex, productImages.length]);

  useEffect(() => {
    if (colorOptions.length > 0) {
      const exists = colorOptions.some((option) => option.id === selectedColor?.id);
      if (!exists) {
        setSelectedColor(colorOptions[0]);
        setSelectedColorPreviewImage(
          colorOptions[0]?.productImage || colorOptions[0]?.sampleImage || null,
        );
      }
    } else if (selectedColor) {
      setSelectedColor(null);
      setSelectedColorPreviewImage(null);
    }
  }, [colorOptions, selectedColor]);

  useEffect(() => {
    if (mountTypeOptions.length > 0) {
      const exists = mountTypeOptions.some(
        (option) => option.id === selectedMountType?.id,
      );
      if (!exists) setSelectedMountType(mountTypeOptions[0]);
    } else if (selectedMountType) {
      setSelectedMountType(null);
    }
  }, [mountTypeOptions, selectedMountType]);

  useEffect(() => {
    if (liftStyleOptions.length > 0) {
      const exists = liftStyleOptions.some(
        (option) => option.id === selectedLiftStyle?.id,
      );
      if (!exists) setSelectedLiftStyle(liftStyleOptions[0]);
    } else if (selectedLiftStyle) {
      setSelectedLiftStyle(null);
    }
  }, [liftStyleOptions, selectedLiftStyle]);

  const isMotorizedLift = (option) => {
    const identifier = [option?.id, option?.name, option?.type]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return identifier.includes('motor');
  };

  const showMotorizationOptions =
    isMotorizedLift(selectedLiftStyle) && motorizationOptions.length > 0;

  useEffect(() => {
    if (!showMotorizationOptions) {
      if (selectedMotorization) {
        setSelectedMotorization(null);
      }
      return;
    }

    const exists = motorizationOptions.some(
      (option) => option.id === selectedMotorization?.id,
    );

    if (!exists) {
      setSelectedMotorization(motorizationOptions[0] || null);
    }
  }, [motorizationOptions, selectedMotorization, showMotorizationOptions]);

  useEffect(() => {
    if (liningOptionsData.length > 0) {
      const exists = liningOptionsData.some(
        (option) => option.id === selectedLining?.id,
      );
      if (!exists) setSelectedLining(liningOptionsData[0]);
    } else if (selectedLining) {
      setSelectedLining(null);
    }
  }, [liningOptionsData, selectedLining]);

  useEffect(() => {
    if (valanceOptions.length > 0) {
      const exists = valanceOptions.some(
        (option) => option.id === selectedValance?.id,
      );
      if (!exists) setSelectedValance(valanceOptions[0]);
    } else if (selectedValance) {
      setSelectedValance(null);
    }
  }, [valanceOptions, selectedValance]);

  useEffect(() => {
    if (bindingEdgeOptions.length > 0) {
      const exists = bindingEdgeOptions.some(
        (option) => option.id === selectedBinding?.id,
      );
      if (!exists) setSelectedBinding(bindingEdgeOptions[0]);
    } else if (selectedBinding) {
      setSelectedBinding(null);
    }
  }, [bindingEdgeOptions, selectedBinding]);

  useEffect(() => {
    if (installationOptions.length > 0) {
      const exists = installationOptions.some(
        (option) => option.id === selectedNoDrill?.id,
      );
      if (!exists) setSelectedNoDrill(installationOptions[0]);
    } else if (selectedNoDrill) {
      setSelectedNoDrill(null);
    }
  }, [installationOptions, selectedNoDrill]);

  useEffect(() => {
    if (widthOptions.length > 0) {
      const exists = widthOptions.some(
        (option) => option?.key?.toString() === width,
      );
      if (!exists) setWidth(widthOptions[0]?.key?.toString() || '');
    }
  }, [widthOptions, width]);

  useEffect(() => {
    if (heightOptions.length > 0) {
      const exists = heightOptions.some(
        (option) => option?.key?.toString() === height,
      );
      if (!exists) setHeight(heightOptions[0]?.key?.toString() || '');
    }
  }, [heightOptions, height]);

  useEffect(() => {
    if (widthFractionOptions.length > 0) {
      const exists = widthFractionOptions.some(
        (option) => option?.key?.toString() === widthFraction,
      );
      if (!exists) setWidthFraction(widthFractionOptions[0]?.key?.toString() || '0');
    }
  }, [widthFractionOptions, widthFraction]);

  useEffect(() => {
    if (heightFractionOptions.length > 0) {
      const exists = heightFractionOptions.some(
        (option) => option?.key?.toString() === heightFraction,
      );
      if (!exists) setHeightFraction(heightFractionOptions[0]?.key?.toString() || '0');
    }
  }, [heightFractionOptions, heightFraction]);

  const selectedMountTypeId = selectedMountType?.id || 'inside';
  const selectedWidthFractionOption = widthFractionOptions.find(
    (option) => option?.key?.toString() === widthFraction,
  );
  const selectedHeightFractionOption = heightFractionOptions.find(
    (option) => option?.key?.toString() === heightFraction,
  );
  const filteredWidthOptions = widthOptions.filter((option) =>
    option?.key?.toString().toLowerCase().includes(widthSearch.toLowerCase()),
  );
  const filteredWidthFractionOptions = widthFractionOptions.filter((option) =>
    option?.key?.toString().toLowerCase().includes(widthFractionSearch.toLowerCase()),
  );
  const filteredHeightOptions = heightOptions.filter((option) =>
    option?.key?.toString().toLowerCase().includes(heightSearch.toLowerCase()),
  );
  const filteredHeightFractionOptions = heightFractionOptions.filter((option) =>
    option?.key?.toString().toLowerCase().includes(heightFractionSearch.toLowerCase()),
  );
  const displayWidth = formatMeasurementLabel(width, widthFraction);
  const displayHeight = formatMeasurementLabel(height, heightFraction);
  const dimensionLabels = {
    width: 'Width',
    widthFraction: 'Width Fraction',
    height: 'Height', // Height is sourced from productOptionsData.length.
    heightFraction: 'Height Fraction', // Height Fraction is sourced from productOptionsData.length_fraction.
  };
  const liningSummary = liningOptionsData
    .map((option) => option?.name)
    .filter(Boolean)
    .join(', ');
  const selectedMotorizationSummary = selectedMotorization?.name || '';

  // Accordion states
  const [openSections, setOpenSections] = useState(() =>
    isWovenWoodShadesProduct ? ['mount', 'dimensions'] : ['color', 'mount', 'dimensions'],
  );

  const toggleSection = (section) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const totalPrice = useMemo(() => {
    const basePrice = productBasePrice;
    const mountPrice = Number(selectedMountType?.price) || 0;
    const liftPrice = Number(selectedLiftStyle?.price) || 0;
    const motorizationPrice = Number(selectedMotorization?.price) || 0;
    const liningPrice = Number(selectedLining?.price) || 0;
    const valancePrice = Number(selectedValance?.price) || 0;
    const bindingPrice = Number(selectedBinding?.price) || 0;
    const noDrillPrice = Number(selectedNoDrill?.price) || 0;
    const widthFractionPrice = Number(selectedWidthFractionOption?.price) || 0;
    const heightFractionPrice = Number(selectedHeightFractionOption?.price) || 0;

    const widthValue =
      parseMeasurementValue(width, 36) + parseFractionValue(widthFraction);
    const heightValue =
      parseMeasurementValue(height, 48) + parseFractionValue(heightFraction);
    const sizeMultiplier = (widthValue * heightValue) / (36 * 48);
    
    const unitPrice = (basePrice + mountPrice + liftPrice + motorizationPrice + liningPrice + valancePrice + bindingPrice + noDrillPrice + widthFractionPrice + heightFractionPrice) * Math.max(sizeMultiplier, 0.6);
    return Number((unitPrice * quantity).toFixed(2));
  }, [productBasePrice, selectedMountType, selectedLiftStyle, selectedMotorization, selectedLining, selectedValance, selectedBinding, selectedNoDrill, selectedWidthFractionOption, selectedHeightFractionOption, width, widthFraction, height, heightFraction, quantity]);

  const displayImage =
    selectedColorPreviewImage ||
    productImages[currentImageIndex]?.url ||
    productData.images[0].url;

  const handleAddToCart = () => {
    if (showMotorizationOptions && !selectedMotorization) {
      toast.error('Please select a motorization option.');
      return;
    }

    const cartItem = {
      id: `${productData.id}-${Date.now()}`,
      productId: productData.id,
      productName: productTitle,
      fabric: selectedColor?.name || productTitle,
      dimensions: {
        width:
          parseMeasurementValue(width, 36) + parseFractionValue(widthFraction),
        height:
          parseMeasurementValue(height, 48) + parseFractionValue(heightFraction),
        unit: 'inches',
      },
      lining: selectedLining?.id || '',
      valance: selectedValance?.id || '',
      mounting: selectedMountType?.id || '',
      motorization: selectedMotorizationSummary,
      quantity,
      unitPrice: totalPrice / quantity,
      image: displayImage,
    };
    addToCart(cartItem);
    toast.success('Added to cart!');
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b border-gray-200">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-gray-900">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/shop')} className="hover:text-gray-900">Shop</button>
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
              <Image
                src={displayImage}
                alt={selectedColor?.name || productImages[currentImageIndex]?.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 text-xs font-medium bg-slate-800 text-white">Custom Made</span>
              </div>
              <button onClick={() => {
                setCurrentImageIndex(prev => prev === 0 ? productImages.length - 1 : prev - 1);
                setSelectedColorPreviewImage(null);
              }} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                <ChevronLeftIcon className="w-5 h-5 text-slate-800" />
              </button>
              <button onClick={() => {
                setCurrentImageIndex(prev => (prev + 1) % productImages.length);
                setSelectedColorPreviewImage(null);
              }} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                <ChevronRightIcon className="w-5 h-5 text-slate-800" />
              </button>
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-2">
              {productImages.map((img, idx) => (
                <button 
                  key={img.id} 
                  onClick={() => {
                    setCurrentImageIndex(idx);
                    setSelectedColorPreviewImage(null);
                  }}
                  className={`relative w-16 h-16 overflow-hidden transition-all border-2 ${currentImageIndex === idx ? 'border-slate-800' : 'border-gray-200 opacity-60 hover:opacity-100'}`}
                >
                  <Image src={img.url} alt={img.alt} className="w-full h-full object-cover" />
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
                <span>5-year warranty</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Info + Accordion Customization */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="space-y-3 pb-6 border-b border-gray-200">
              <span className="text-xs font-medium text-emerald-700 uppercase tracking-wide">Made to Order</span>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">{productTitle}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(productRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-900">{productRating}</span>
                <span className="text-sm text-gray-500">({productReviewCount} reviews)</span>
              </div>
              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-3xl font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
                <span className="text-gray-500">per shade</span>
              </div>
            </div>

            {/* ============================================ */}
            {/* CUSTOMIZATION OPTIONS - ACCORDION STYLE */}
            {/* ============================================ */}
            <div className="space-y-3">
              {shouldShowFabricColor ? (
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
                      {colorOptions.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => {
                            setSelectedColor(color);
                            setSelectedColorPreviewImage(
                              color.productImage || color.sampleImage || null,
                            );
                          }}
                          className={`relative w-14 h-14 shrink-0 border transition-all ${selectedColor?.id === color.id ? 'border-gray-500' : 'border-gray-200 hover:border-gray-400'}`}
                          style={{
                            backgroundColor: color.hex || 'transparent',
                            backgroundImage: color.sampleImage
                              ? `url(${color.sampleImage})`
                              : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                          title={color.name}
                        >
                          {selectedColor?.id === color.id ? (
                            <CheckIcon className="absolute inset-0 m-auto w-4 h-4 text-white drop-shadow-md" />
                          ) : null}
                        </button>
                      ))}
                    </div>
                  </div>
                </CollapsibleSection>
              ) : null}

              {/* 1. Mount Type - with Images */}
              {mountTypeOptions.length > 0 ? (
                <CollapsibleSection
                  title="Mount Type"
                  subtitle={selectedMountType?.name || 'Select mount type'}
                  isOpen={openSections.includes('mount')}
                  onToggle={() => toggleSection('mount')}
                >
                  <div className="pt-4 space-y-3">
                    <RadioGroup
                      value={selectedMountType?.id}
                      onValueChange={(val) => {
                        const mount = mountTypeOptions.find((m) => m.id === val);
                        if (mount) setSelectedMountType(mount);
                      }}
                    >
                      <div className="space-y-3">
                        {mountTypeOptions.map((mount) => (
                          <div key={mount.id}>
                            <RadioGroupItem value={mount.id} id={mount.id} className="peer sr-only" />
                            <Label htmlFor={mount.id} className="flex gap-4 p-3 border border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300">
                              <div className="w-24 h-24 shrink-0 bg-gray-100 overflow-hidden">
                                {mount.image ? (
                                  <Image src={mount.image} alt={mount.name} className="w-full h-full object-cover" />
                                ) : null}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium text-gray-900">{mount.name}</span>
                                  <span className="text-sm font-medium text-gray-900">{mount.price > 0 ? `+$${mount.price}` : 'Included'}</span>
                                </div>
                                <p className="text-sm text-gray-500">{mount.description}</p>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>

                    <div className="mt-4 p-4 bg-blue-50 border border-blue-100">
                      <div className="flex items-start gap-3">
                        <InfoIcon className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-900">Mount Type Guide</p>
                          <p className="text-sm text-blue-700 mt-1">
                            {selectedMountTypeId.includes('inside')
                              ? 'Inside mount requires at least 2" of window frame depth. Shade width will be 1/4" narrower than your measurement for smooth operation.'
                              : 'Outside mount is mounted on the wall or trim. We recommend adding 3-4" to your window width for optimal light coverage.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>
              ) : null}

              {/* 3. Install Types */}
              {installationOptions.length > 0 ? (
                <CollapsibleSection
                  title={isWovenWoodShadesProduct ? 'Install Types' : 'Installation Option'}
                  subtitle={selectedNoDrill?.name || 'Select installation option'}
                  isOpen={openSections.includes('nodrill')}
                  onToggle={() => toggleSection('nodrill')}
                >
                  <div className="pt-4 space-y-3">
                    <RadioGroup
                      value={selectedNoDrill?.id}
                      onValueChange={(val) => {
                        const option = installationOptions.find((o) => o.id === val);
                        if (option) setSelectedNoDrill(option);
                      }}
                    >
                      <div className="space-y-2">
                        {installationOptions.map((option) => (
                          <div key={option.id}>
                            <RadioGroupItem value={option.id} id={`nodrill-${option.id}`} className="peer sr-only" />
                            <Label htmlFor={`nodrill-${option.id}`} className="flex items-center justify-between p-3 border border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300">
                              <div>
                                <span className="font-medium text-gray-900">{option.name}</span>
                                <p className="text-sm text-gray-500">{option.description}</p>
                              </div>
                              <span className="text-sm font-medium text-gray-900">{option.price > 0 ? `+$${option.price}` : 'Included'}</span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>

                    {selectedNoDrill?.id?.includes('no-drill') ? (
                      <div className="mt-3 p-3 bg-amber-50 border border-amber-200 text-sm text-amber-800">
                        <div className="flex items-start gap-2">
                          <InfoIcon className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>No-drill installation is only available for inside mount shades up to 15 lbs. Requires clean, smooth window frame surface.</span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </CollapsibleSection>
              ) : null}

              {/* 4. Dimensions - with Visual Guide */}
              <CollapsibleSection
                title="Shade Dimensions"
                subtitle={
                  displayWidth && displayHeight
                    ? `${displayWidth}" W × ${displayHeight}" H`
                    : 'Please select dimensions'
                }
                isOpen={openSections.includes('dimensions')}
                onToggle={() => toggleSection('dimensions')}
              >
                <div className="pt-4 space-y-4">
                  {/* Visual Guide Placeholder */}
                  <div className="bg-gray-50 border border-gray-200 p-4">
                    <p className="font-medium text-gray-900 mb-3">How to Measure</p>
                    <div className="aspect-[16/9] bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                      <RulerIcon className="w-10 h-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Measuring Guide Illustration</p>
                      <p className="text-xs text-gray-400 mt-1">Shows how to measure for {selectedMountTypeId} mount</p>
                    </div>
                    <div className="mt-3 text-sm text-gray-600 space-y-1">
                      {selectedMountTypeId.includes('inside') ? (
                        <>
                          <p>1. Measure width at top, middle, and bottom of window frame</p>
                          <p>2. Use the narrowest width measurement</p>
                          <p>3. Measure height at left, center, and right</p>
                          <p>4. Use the longest height measurement</p>
                        </>
                      ) : (
                        <>
                          <p>1. Measure desired width (add 3-4&quot; beyond window for coverage)</p>
                          <p>2. Measure desired height (add 3-4&quot; above window frame)</p>
                          <p>3. Round to nearest 1/8 inch</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Dimension Inputs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500">{dimensionLabels.width}(inches)</Label>
                      {widthOptions.length > 0 ? (
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
                                    {option.price !== '0' && Number(option.price) > 0 ? (
                                      <span className="text-gray-500 text-xs">
                                        +${option.price}
                                      </span>
                                    ) : null}
                                  </button>
                                ))
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <div className="relative mt-1">
                          <Input type="number" step="0.125" value={width} onChange={(e) => setWidth(e.target.value)} className="h-11 pr-10" placeholder="36" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">in</span>
                        </div>
                      )}
                      {widthFractionOptions.length > 0 ? (
                        <div className="mt-3">
                          <Label className="text-xs text-gray-500">{dimensionLabels.widthFraction}</Label>
                          <Popover open={widthFractionOpen} onOpenChange={setWidthFractionOpen}>
                            <PopoverTrigger asChild>
                              <button className="mt-1 h-11 w-full bg-white border border-gray-300 rounded-md px-3 text-left flex items-center justify-between text-sm">
                                {widthFraction || 'Please select'}
                                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border border-gray-300"
                              align="start"
                            >
                              <div className="border-b border-gray-200">
                                <Input
                                  placeholder="Search width fraction..."
                                  value={widthFractionSearch}
                                  onChange={(e) => setWidthFractionSearch(e.target.value)}
                                  className="h-10 border-0 rounded-none focus-visible:ring-0"
                                />
                              </div>
                              <div className="overflow-y-auto max-h-60">
                                {filteredWidthFractionOptions.length === 0 ? (
                                  <div className="py-6 text-center text-sm text-gray-500">
                                    No results found
                                  </div>
                                ) : (
                                  filteredWidthFractionOptions.map((option) => (
                                    <button
                                      key={option.key}
                                      onClick={() => {
                                        setWidthFraction(option.key.toString());
                                        setWidthFractionSearch('');
                                        setWidthFractionOpen(false);
                                      }}
                                      className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 flex items-center justify-between"
                                    >
                                      {option.key}
                                      {option.price !== '0' && Number(option.price) > 0 ? (
                                        <span className="text-gray-500 text-xs">
                                          +${option.price}
                                        </span>
                                      ) : null}
                                    </button>
                                  ))
                                )}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">{dimensionLabels.height} (inches)</Label>
                      {heightOptions.length > 0 ? (
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
                                    {option.price !== '0' && Number(option.price) > 0 ? (
                                      <span className="text-gray-500 text-xs">
                                        +${option.price}
                                      </span>
                                    ) : null}
                                  </button>
                                ))
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <div className="relative mt-1">
                          <Input type="number" step="0.125" value={height} onChange={(e) => setHeight(e.target.value)} className="h-11 pr-10" placeholder="48" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">in</span>
                        </div>
                      )}
                      {heightFractionOptions.length > 0 ? (
                        <div className="mt-3">
                          <Label className="text-xs text-gray-500">{dimensionLabels.heightFraction}</Label>
                          <Popover open={heightFractionOpen} onOpenChange={setHeightFractionOpen}>
                            <PopoverTrigger asChild>
                              <button className="mt-1 h-11 w-full bg-white border border-gray-300 rounded-md px-3 text-left flex items-center justify-between text-sm">
                                {heightFraction || 'Please select'}
                                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border border-gray-300"
                              align="start"
                            >
                              <div className="border-b border-gray-200">
                                <Input
                                  placeholder="Search height fraction..."
                                  value={heightFractionSearch}
                                  onChange={(e) => setHeightFractionSearch(e.target.value)}
                                  className="h-10 border-0 rounded-none focus-visible:ring-0"
                                />
                              </div>
                              <div className="overflow-y-auto max-h-60">
                                {filteredHeightFractionOptions.length === 0 ? (
                                  <div className="py-6 text-center text-sm text-gray-500">
                                    No results found
                                  </div>
                                ) : (
                                  filteredHeightFractionOptions.map((option) => (
                                    <button
                                      key={option.key}
                                      onClick={() => {
                                        setHeightFraction(option.key.toString());
                                        setHeightFractionSearch('');
                                        setHeightFractionOpen(false);
                                      }}
                                      className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 flex items-center justify-between"
                                    >
                                      {option.key}
                                      {option.price !== '0' && Number(option.price) > 0 ? (
                                        <span className="text-gray-500 text-xs">
                                          +${option.price}
                                        </span>
                                      ) : null}
                                    </button>
                                  ))
                                )}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              {/* 4. Lift Style */}
              {liftStyleOptions.length > 0 ? (
                <CollapsibleSection
                  title="Lift Style"
                  subtitle={selectedLiftStyle?.name || 'Select lift style'}
                  isOpen={openSections.includes('lift')}
                  onToggle={() => toggleSection('lift')}
                >
                  <div className="pt-4 space-y-3">
                    <RadioGroup value={selectedLiftStyle?.id} onValueChange={(val) => { const lift = liftStyleOptions.find(l => l.id === val); if (lift) setSelectedLiftStyle(lift); }}>
                      <div className="space-y-3">
                        {liftStyleOptions.map((lift) => (
                          <div key={lift.id}>
                            <RadioGroupItem value={lift.id} id={`lift-${lift.id}`} className="peer sr-only" />
                            <Label htmlFor={`lift-${lift.id}`} className="flex gap-4 p-3 border border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300">
                              {lift.image ? (
                                <div className="w-24 h-24 shrink-0 bg-gray-100 overflow-hidden">
                                  <Image src={lift.image} alt={lift.name} className="w-full h-full object-cover" />
                                </div>
                              ) : null}
                              <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
                                <div>
                                  <span className="font-medium text-gray-900">{lift.name}</span>
                                  <p className="text-sm text-gray-500">{lift.description}</p>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{lift.price > 0 ? `+$${lift.price}` : 'Included'}</span>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>

                    {showMotorizationOptions ? (
                      <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
                        <div>
                          <p className="font-medium text-gray-900">Motorization Option</p>
                          <p className="text-sm text-gray-500">
                            Choose the controller type for your motorized shade.
                          </p>
                        </div>

                        <RadioGroup
                          value={selectedMotorization?.id}
                          onValueChange={(val) => {
                            const option = motorizationOptions.find((item) => item.id === val);
                            if (option) setSelectedMotorization(option);
                          }}
                        >
                          <div className="space-y-2">
                            {motorizationOptions.map((option) => (
                              <div key={option.id}>
                                <RadioGroupItem
                                  value={option.id}
                                  id={`motorization-${option.id}`}
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor={`motorization-${option.id}`}
                                  className="flex items-center justify-between gap-4 p-3 border border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300"
                                >
                                  <div>
                                    <span className="font-medium text-gray-900">
                                      {option.name}
                                    </span>
                                    {option.description ? (
                                      <p className="text-sm text-gray-500">
                                        {option.description}
                                      </p>
                                    ) : null}
                                  </div>
                                  <span className="text-sm font-medium text-gray-900">
                                    {option.price > 0 ? `+$${option.price}` : 'Included'}
                                  </span>
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    ) : null}

                    {isMotorizedLift(selectedLiftStyle) ? (
                      <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 text-sm text-emerald-800">
                        <div className="flex items-start gap-2">
                          <ZapIcon className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>Motorized shades include rechargeable battery, remote control, and smartphone app compatibility.</span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </CollapsibleSection>
              ) : null}

              {/* 5. Lining */}
              {liningOptionsData.length > 0 ? (
                <CollapsibleSection
                  title="Lining"
                  subtitle={selectedLining?.name || 'Select lining'}
                  isOpen={openSections.includes('lining')}
                  onToggle={() => toggleSection('lining')}
                >
                  <div className="pt-4 space-y-3">
                    <RadioGroup
                      value={selectedLining?.id}
                      onValueChange={(val) => {
                        const lining = liningOptionsData.find((l) => l.id === val);
                        if (lining) setSelectedLining(lining);
                      }}
                    >
                      <div className="space-y-3">
                        {liningOptionsData.map((lining) => (
                          <div key={lining.id}>
                            <RadioGroupItem
                              value={lining.id}
                              id={`lining-${lining.id}`}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={`lining-${lining.id}`}
                              className="flex gap-4 p-3 border border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300"
                            >
                              {lining.image ? (
                                <div className="w-24 h-24 shrink-0 bg-gray-100 overflow-hidden">
                                  <Image
                                    src={lining.image}
                                    alt={lining.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : null}
                              <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
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
                              </div>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </CollapsibleSection>
              ) : null}

              {valanceOptions.length > 0 ? (
                <CollapsibleSection
                  title="Valance Styles"
                  subtitle={selectedValance?.name || 'Select valance style'}
                  isOpen={openSections.includes('valance')}
                  onToggle={() => toggleSection('valance')}
                >
                  <div className="pt-4 space-y-3">
                    <RadioGroup
                      value={selectedValance?.id}
                      onValueChange={(val) => {
                        const valance = valanceOptions.find((v) => v.id === val);
                        if (valance) setSelectedValance(valance);
                      }}
                    >
                      <div className="space-y-3">
                        {valanceOptions.map((valance) => (
                          <div key={valance.id}>
                            <RadioGroupItem
                              value={valance.id}
                              id={`valance-${valance.id}`}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={`valance-${valance.id}`}
                              className="flex gap-4 p-3 border border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300"
                            >
                              {valance.image ? (
                                <div className="w-24 h-24 shrink-0 bg-gray-100 overflow-hidden">
                                  <Image
                                    src={valance.image}
                                    alt={valance.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : null}
                              <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
                                <div>
                                  <span className="font-medium text-gray-900">
                                    {valance.name}
                                  </span>
                                  {valance.description ? (
                                    <p className="text-sm text-gray-500">
                                      {valance.description}
                                    </p>
                                  ) : null}
                                </div>
                                <span className="text-sm font-medium text-gray-900">
                                  {valance.price > 0 ? `+$${valance.price}` : 'Included'}
                                </span>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </CollapsibleSection>
              ) : null}

              {/* 6. Binding Edge */}
              {bindingEdgeOptions.length > 0 ? (
                <CollapsibleSection
                  title="Edge Binding Options"
                  subtitle={selectedBinding?.name || 'Select edge binding option'}
                  isOpen={openSections.includes('binding')}
                  onToggle={() => toggleSection('binding')}
                >
                  <div className="pt-4 space-y-3">
                    <RadioGroup
                      value={selectedBinding?.id}
                      onValueChange={(val) => {
                        const binding = bindingEdgeOptions.find((b) => b.id === val);
                        if (binding) setSelectedBinding(binding);
                      }}
                    >
                      <div className="space-y-2">
                        {bindingEdgeOptions.map((binding) => (
                          <div key={binding.id}>
                            <RadioGroupItem value={binding.id} id={`binding-${binding.id}`} className="peer sr-only" />
                            <Label htmlFor={`binding-${binding.id}`} className="flex items-center justify-between gap-4 p-3 border border-gray-200 cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300">
                              <div className="flex items-center gap-4">
                                {binding.image ? (
                                  <div className="w-16 h-16 shrink-0 bg-gray-100 overflow-hidden">
                                    <Image src={binding.image} alt={binding.name} className="w-full h-full object-cover" />
                                  </div>
                                ) : null}
                                <div>
                                  <span className="font-medium text-gray-900">{binding.name}</span>
                                  {binding.description ? (
                                    <p className="text-sm text-gray-500">{binding.description}</p>
                                  ) : null}
                                </div>
                              </div>
                              <span className="text-sm font-medium text-gray-900">{binding.price > 0 ? `+$${binding.price}` : 'Included'}</span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </CollapsibleSection>
              ) : null}

            </div>

            {/* Add to Cart */}
            <div className="pt-6 border-t border-gray-200 space-y-4">
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
                  <p className="text-3xl font-semibold text-gray-900">${totalPrice.toFixed(2)}</p>
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
      {/* Product Information - Wide Layout */}
      {/* ============================================ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">Product Information</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to know about our premium roller shades, from materials and care to installation and warranty coverage.</p>
          </div>

          <Accordion type="multiple" defaultValue={['measurement', 'specs']} className="w-full space-y-4">
            
            {/* Measurement & Installation */}
            <AccordionItem value="measurement" className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <RulerIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">Measurement & Installation Guide</span>
                    <p className="text-sm text-gray-500 font-normal">Learn how to measure your windows and install your roller shades</p>
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
                            <span className="text-xl font-bold text-emerald-600">1</span>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">Easy Level</p>
                            <p className="text-sm text-gray-500">10-15 minutes</p>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">Installation difficulty rated as beginner-friendly. No special tools required.</p>
                      </div>
                      <div className="p-5 bg-gray-50 rounded-xl">
                        <p className="font-semibold text-slate-900 mb-3">Tools Needed</p>
                        <div className="flex flex-wrap gap-2">
                          {['Screwdriver', 'Drill (standard mount)', 'Level', 'Measuring Tape'].map((tool) => (
                            <span key={tool} className="px-3 py-1 bg-white text-sm text-gray-600 rounded-full border border-gray-200">{tool}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <InfoIcon className="w-4 h-4 text-blue-600" />
                        Quick Measuring Tips for Roller Shades
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>For inside mount: Measure width at top, middle, and bottom 鈥?use the narrowest</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>For outside mount: Add 3-4 inches beyond window frame on each side</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>Round to nearest 1/8 inch for best fit</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>Minimum frame depth for inside mount: 2 inches</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                      <PlayIcon className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-gray-600 font-medium">Installation Video</p>
                      <p className="text-sm text-gray-500">3-minute guide</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-slate-400 transition-colors text-center">
                        <FileTextIcon className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-slate-900">PDF Guide</p>
                        <p className="text-xs text-gray-500">Download</p>
                      </button>
                      <button className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-slate-400 transition-colors text-center">
                        <RulerIcon className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-slate-900">Measuring</p>
                        <p className="text-xs text-gray-500">Tutorial</p>
                      </button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Specifications */}
            <AccordionItem value="specs" className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <InfoIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">Technical Specifications</span>
                    <p className="text-sm text-gray-500 font-normal">Detailed specs for our custom roller shades</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      {[
                        { label: 'Width Range', value: '12" - 96"' },
                        { label: 'Height Range', value: '12" - 96"' },
                        { label: 'Mount Types', value: 'Inside, Outside' },
                        { label: 'Lift Options', value: 'Cordless, Motorized, Chain' },
                        {
                          label: 'Lining',
                          value: liningSummary || 'Available based on selection',
                        },
                        { label: 'Material', value: '100% Polyester' },
                        { label: 'Warranty', value: '5 Year Limited' },
                        { label: 'Production Time', value: '7-10 business days' },
                        { label: 'Shipping', value: 'Free on orders over $200' },
                        { label: 'Max Weight', value: '25 lbs (standard), 15 lbs (no-drill)' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-500">{item.label}</span>
                          <span className="font-medium text-slate-900 text-right">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="aspect-square bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                      <InfoIcon className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-gray-600 font-medium">Technical Diagram</p>
                      <p className="text-sm text-gray-500">Shade construction details</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Care Instructions */}
            <AccordionItem value="care" className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <DropletsIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">Care & Maintenance</span>
                    <p className="text-sm text-gray-500 font-normal">Keep your roller shades looking beautiful for years</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Regular Maintenance</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Dust with feather duster or microfiber cloth</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Use vacuum with brush attachment on low setting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Spot clean with damp cloth and mild soap</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Deep Cleaning</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Remove shade from brackets</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Lay flat and clean with damp sponge</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Air dry completely before reinstalling</span>
                        </li>
                      </ul>
                    </div>
                    <div className="sm:col-span-2 p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <p className="font-semibold text-amber-900 mb-1">Important Care Note</p>
                      <p className="text-sm text-amber-800">Do not submerge roller shades in water. Avoid harsh chemicals that may damage fabric. Never use abrasive scrubbers.</p>
                    </div>
                  </div>
                  <div className="aspect-[4/5] bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                    <DropletsIcon className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium">Care Instructions</p>
                    <p className="text-sm text-gray-500">Visual care guide</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Returns & Warranty */}
            <AccordionItem value="returns" className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <RotateCcwIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">Returns & Warranty Policy</span>
                    <p className="text-sm text-gray-500 font-normal">Custom product protection & shipping coverage</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-5 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                        5-Year Limited Warranty
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>鈥?Covers roller mechanism and fabric defects</li>
                        <li>鈥?Motor warranty: 2 years</li>
                        <li>鈥?Fabric color fastness guaranteed</li>
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
            <AccordionItem value="safety" className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <BabyIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">Child Safety Features</span>
                    <p className="text-sm text-gray-500 font-normal">WCSC certified cordless and motorized options</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <ShieldIcon className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-slate-900 mb-1">WCSC Certified</h4>
                    <p className="text-sm text-gray-600">Meets all Window Covering Safety Council standards</p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <VolumeXIcon className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-slate-900 mb-1">Cordless Options</h4>
                    <p className="text-sm text-gray-600">Safe for homes with children and pets</p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <AwardIcon className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-slate-900 mb-1">Best for Kids</h4>
                    <p className="text-sm text-gray-600">Independently tested and certified safe</p>
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
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">Frequently Asked Questions</h3>
              <p className="text-gray-500">Everything you need to know about our roller shades</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border border-gray-200 bg-white">
                  <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-slate-900">How do I measure for roller shades?</span>
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  <div className="px-6 pb-4 text-gray-600 text-sm">
                    For inside mount, measure the width and height of your window frame in three places (top, middle, bottom for width; left, center, right for height). Use the smallest measurements. For outside mount, measure the area you want to cover, adding 3-4 inches beyond the window frame on each side for optimal light blocking.
                  </div>
                </div>
                <div className="border border-gray-200 bg-white">
                  <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-slate-900">What&apos;s the difference between light filtering and blackout?</span>
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  <div className="px-6 pb-4 text-gray-600 text-sm">
                    Light filtering fabrics gently diffuse natural light while maintaining privacy - perfect for living rooms and kitchens. Blackout fabrics block 99% of light, making them ideal for bedrooms, media rooms, or any space where you need complete darkness and maximum privacy.
                  </div>
                </div>
                <div className="border border-gray-200 bg-white">
                  <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-slate-900">Can I install roller shades myself?</span>
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  <div className="px-6 pb-4 text-gray-600 text-sm">
                    Yes! Our roller shades come with all necessary hardware and step-by-step installation instructions. Most customers can install them in 15-30 minutes with basic tools (drill, screwdriver, level). We also offer video tutorials and phone support if you need assistance.
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border border-gray-200 bg-white">
                  <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-slate-900">How long does shipping take?</span>
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  <div className="px-6 pb-4 text-gray-600 text-sm">
                    All our shades are custom-made to your specifications. Production typically takes 5-7 business days, and shipping takes 3-5 business days. You&apos;ll receive tracking information once your order ships. Free shipping on orders over $200.
                  </div>
                </div>
                <div className="border border-gray-200 bg-white">
                  <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-slate-900">What is your return policy?</span>
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  <div className="px-6 pb-4 text-gray-600 text-sm">
                    Since our shades are custom-made to your measurements, they cannot be returned unless there&apos;s a manufacturing defect. We strongly recommend ordering free fabric samples first to ensure you&apos;re happy with the color and material. If there&apos;s a defect, contact us within 30 days for a replacement.
                  </div>
                </div>
                <div className="border border-gray-200 bg-white">
                  <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-slate-900">Are motorized shades worth it?</span>
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  <div className="px-6 pb-4 text-gray-600 text-sm">
                    Motorized shades offer convenience, safety (no cords for children/pets), and smart home integration. They&apos;re especially worth it for hard-to-reach windows, large installations, or if you want scheduled automation. Our motorized options include rechargeable batteries that last 6-12 months.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-2xl font-semibold text-slate-900">Customer Reviews</h3>
              <span className="text-gray-500">({productReviewCount})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-6 text-center rounded-xl">
                <div className="text-5xl font-semibold text-slate-900">{productRating}</div>
                <div className="flex justify-center gap-1 my-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(productRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <div className="text-sm text-gray-500">Based on {productReviewCount} verified reviews</div>
              </div>
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviewsData.map((review) => (
                  <div key={review.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{review.author}</div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />)}
                        </div>
                      </div>
                      {review.verified && <span className="ml-auto text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Verified</span>}
                    </div>
                    <h4 className="font-medium text-slate-900 mb-1">{review.title}</h4>
                    <p className="text-gray-600 text-sm line-clamp-3">{review.content}</p>
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
            <div className="grid grid-cols-4 gap-2 max-h-60 overflow-y-auto">
              {colorOptions.map((color) => (
                <div key={color.id} className="p-2 bg-gray-50 text-center cursor-pointer hover:ring-1 hover:ring-slate-800 transition-all">
                  <div className="w-full h-10 mb-1 border border-gray-200 bg-center bg-cover" style={{ backgroundColor: color.hex || 'transparent', backgroundImage: color.sampleImage ? `url(${color.sampleImage})` : 'none' }} />
                  <p className="text-xs text-gray-900 truncate">{color.name}</p>
                </div>
              ))}
            </div>
            <div className="bg-emerald-50 p-3 flex items-center gap-2 text-sm text-emerald-800">
              <TruckIcon className="w-4 h-4" />
              <span>Free shipping 鈥?Arrives in 3-5 days</span>
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

export default ProductDetailShadesPage;


