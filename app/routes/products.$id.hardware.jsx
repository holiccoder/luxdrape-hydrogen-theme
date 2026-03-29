import {useState, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '~/components/ui/button';
import {RadioGroup, RadioGroupItem} from '~/components/ui/radio-group';
import {Label} from '~/components/ui/label';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '~/components/ui/accordion';
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
  UserIcon,
  ShieldCheckIcon,
  DropletsIcon,
  RotateCcwIcon,
  BabyIcon,
  ShieldIcon,
  AwardIcon,
  WrenchIcon,
  PackageIcon,
  Ruler,
} from 'lucide-react';

export function meta() {
  return [{title: 'Premium Curtain Hardware | LuxDrape'}];
}

const productData = {
  id: 'curtain-hardware',
  name: 'Premium Curtain Rods & Hardware',
  description:
    'Complete your window treatment with our premium hardware collection. Heavy-duty rods, elegant finials, and all mounting hardware included.',
  basePrice: 49.99,
  rating: 4.7,
  reviewCount: 892,
  features: [
    'Heavy-duty steel construction',
    'Supports up to 30 lbs per bracket',
    'All mounting hardware included',
    'Adjustable length rods',
    '5-year warranty',
  ],
  images: [
    {
      id: '1',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda',
      alt: 'Brass curtain rod with decorative finials',
    },
    {
      id: '2',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
      alt: 'Matte black curtain rod set',
    },
    {
      id: '3',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda',
      alt: 'Hardware mounting bracket detail',
    },
    {
      id: '4',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda',
      alt: 'Curtain rings and hardware accessories',
    },
  ],
};

const finishOptions = [
  {id: 'matte-black', name: 'Matte Black', color: '#2C2C2C', price: 0},
  {id: 'brushed-nickel', name: 'Brushed Nickel', color: '#C0C0C0', price: 10},
  {id: 'antique-brass', name: 'Antique Brass', color: '#B5A642', price: 15},
  {
    id: 'oil-rubbed-bronze',
    name: 'Oil Rubbed Bronze',
    color: '#4A3728',
    price: 15,
  },
  {id: 'polished-chrome', name: 'Polished Chrome', color: '#E8E8E8', price: 10},
  {id: 'satin-gold', name: 'Satin Gold', color: '#D4AF37', price: 20},
];

const diameterOptions = [
  {
    id: '0.75',
    name: '3/4" Diameter',
    price: 0,
    description: 'Standard weight, ideal for light to medium curtains',
  },
  {
    id: '1',
    name: '1" Diameter',
    price: 15,
    description: 'Heavy-duty, perfect for blackout and layered curtains',
  },
  {
    id: '1.25',
    name: '1-1/4" Diameter',
    price: 30,
    description: 'Extra heavy-duty, best for velvet and extra wide spans',
  },
];

const lengthOptions = [
  {id: '28-48', name: '28" - 48"', price: 0, range: 'Small windows'},
  {id: '48-84', name: '48" - 84"', price: 15, range: 'Standard windows'},
  {id: '84-120', name: '84" - 120"', price: 35, range: 'Large windows'},
  {
    id: '120-170',
    name: '120" - 170"',
    price: 65,
    range: 'Extra large / Patio doors',
  },
];

const mountingOptions = [
  {
    id: 'wall',
    name: 'Wall Mount',
    price: 0,
    description: 'Standard wall brackets included',
  },
  {
    id: 'ceiling',
    name: 'Ceiling Mount',
    price: 10,
    description: 'Ceiling brackets for floor-to-ceiling look',
  },
];

const reviewsData = [
  {
    id: '1',
    author: 'Thomas H.',
    rating: 5,
    date: '2024-02-20',
    title: 'Solid construction',
    content:
      'The 1-inch rod easily supports my heavy velvet curtains. Mounting hardware was high quality too.',
    verified: true,
  },
  {
    id: '2',
    author: 'Maria G.',
    rating: 5,
    date: '2024-02-17',
    title: 'Beautiful finish',
    content:
      'The antique brass looks stunning in my dining room. Exactly as pictured.',
    verified: true,
  },
  {
    id: '3',
    author: 'Chris P.',
    rating: 4,
    date: '2024-02-14',
    title: 'Great value',
    content:
      'Good quality for the price. Installation was straightforward with the included instructions.',
    verified: true,
  },
  {
    id: '4',
    author: 'Lisa R.',
    rating: 5,
    date: '2024-02-10',
    title: 'Perfect length',
    content: 'Love that these extend. Covered my 9-foot window with one rod.',
    verified: true,
  },
  {
    id: '5',
    author: 'David K.',
    rating: 5,
    date: '2024-02-08',
    title: 'Heavy duty',
    content:
      'Got the 1.25" for my extra wide living room window. No sagging at all.',
    verified: true,
  },
  {
    id: '6',
    author: 'Amanda S.',
    rating: 5,
    date: '2024-02-05',
    title: 'Complete set',
    content:
      'Everything you need is in the box. Rings, brackets, screws, and even wall anchors.',
    verified: true,
  },
];

const ProductDetailHardwarePage = () => {
  const navigate = useNavigate();
  const {addToCart} = useCart();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(finishOptions[0]);
  const [selectedDiameter, setSelectedDiameter] = useState(diameterOptions[0]);
  const [selectedLength, setSelectedLength] = useState(lengthOptions[1]);
  const [selectedMounting, setSelectedMounting] = useState(mountingOptions[0]);
  const [quantity, setQuantity] = useState(1);

  const totalPrice = useMemo(() => {
    const finishPrice = selectedFinish.price;
    const diameterPrice = selectedDiameter.price;
    const lengthPrice = selectedLength.price;
    const mountingPrice = selectedMounting.price;

    const unitPrice =
      productData.basePrice +
      finishPrice +
      diameterPrice +
      lengthPrice +
      mountingPrice;
    return Math.round(unitPrice * quantity);
  }, [
    selectedFinish,
    selectedDiameter,
    selectedLength,
    selectedMounting,
    quantity,
  ]);

  const handleAddToCart = () => {
    const cartItem = {
      id: `${productData.id}-${Date.now()}`,
      productId: productData.id,
      productName: `${productData.name} - ${selectedFinish.name}`,
      fabric: `${selectedDiameter.name}, ${selectedLength.name}, ${selectedMounting.name}`,
      dimensions: {width: 0, height: 0, unit: 'inches'},
      lining: 'standard',
      mounting: 'rod-pocket',
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
          <span className="text-gray-900">Curtain Hardware</span>
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
                  Best Seller
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
                <span>5-year warranty</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3 pb-6 border-b border-gray-200">
              <span className="text-xs font-medium text-slate-700 uppercase tracking-wide">
                Hardware
              </span>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                Premium Curtain Rods & Hardware
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
                <span className="text-gray-500">per set</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium text-gray-900">
                    Finish Color
                  </Label>
                  <span className="text-sm text-gray-500">
                    {selectedFinish.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {finishOptions.map((finish) => (
                    <button
                      key={finish.id}
                      onClick={() => setSelectedFinish(finish)}
                      className={`relative w-14 h-14 border-2 transition-all ${
                        selectedFinish.id === finish.id
                          ? 'border-slate-800 ring-1 ring-slate-800'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                      style={{backgroundColor: finish.color}}
                      title={finish.name}
                    >
                      {selectedFinish.id === finish.id && (
                        <CheckIcon
                          className={`absolute inset-0 m-auto w-5 h-5 ${
                            ['#FFFFFF', '#E8E8E8', '#C0C0C0'].includes(
                              finish.color,
                            )
                              ? 'text-slate-800'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
                {selectedFinish.price > 0 && (
                  <p className="text-sm text-gray-500">
                    +${selectedFinish.price} for {selectedFinish.name}
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <Label className="text-base font-medium text-gray-900">
                  Rod Diameter
                </Label>
                <RadioGroup
                  value={selectedDiameter.id}
                  onValueChange={(val) => {
                    const option = diameterOptions.find((o) => o.id === val);
                    if (option) setSelectedDiameter(option);
                  }}
                >
                  <div className="space-y-2">
                    {diameterOptions.map((option) => (
                      <div key={option.id}>
                        <RadioGroupItem
                          value={option.id}
                          id={`diameter-${option.id}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`diameter-${option.id}`}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-md cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300"
                        >
                          <div>
                            <span className="font-medium text-gray-900">
                              {option.name}
                            </span>
                            <p className="text-sm text-gray-500">
                              {option.description}
                            </p>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {option.price > 0
                              ? `+$${option.price}`
                              : 'Included'}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <Label className="text-base font-medium text-gray-900">
                  Adjustable Length
                </Label>
                <RadioGroup
                  value={selectedLength.id}
                  onValueChange={(val) => {
                    const option = lengthOptions.find((o) => o.id === val);
                    if (option) setSelectedLength(option);
                  }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {lengthOptions.map((option) => (
                      <div key={option.id}>
                        <RadioGroupItem
                          value={option.id}
                          id={`length-${option.id}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`length-${option.id}`}
                          className="flex flex-col p-4 border border-gray-200 rounded-md cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300"
                        >
                          <span className="font-medium text-gray-900">
                            {option.name}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            {option.range}
                          </span>
                          <span className="text-sm font-medium text-gray-900 mt-2">
                            {option.price > 0
                              ? `+$${option.price}`
                              : 'Base Price'}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <Label className="text-base font-medium text-gray-900">
                  Mounting Style
                </Label>
                <RadioGroup
                  value={selectedMounting.id}
                  onValueChange={(val) => {
                    const option = mountingOptions.find((o) => o.id === val);
                    if (option) setSelectedMounting(option);
                  }}
                >
                  <div className="space-y-2">
                    {mountingOptions.map((option) => (
                      <div key={option.id}>
                        <RadioGroupItem
                          value={option.id}
                          id={`mounting-${option.id}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`mounting-${option.id}`}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-md cursor-pointer transition-all peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-gray-50 hover:border-gray-300"
                        >
                          <div>
                            <span className="font-medium text-gray-900">
                              {option.name}
                            </span>
                            <p className="text-sm text-gray-500">
                              {option.description}
                            </p>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {option.price > 0
                              ? `+$${option.price}`
                              : 'Included'}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                  <PackageIcon className="w-4 h-4" />
                  What's Included
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Adjustable steel rod ({selectedLength.name})</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Decorative finials (2 pieces)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      Mounting brackets (
                      {selectedMounting.id === 'ceiling' ? 'ceiling' : 'wall'}{' '}
                      mount)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Curtain rings (14 pieces)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>All screws and wall anchors</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Quantity</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-md"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-md"
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

              <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 p-3 rounded-md">
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
              Everything you need to know about our premium curtain hardware.
            </p>
          </div>

          <Accordion
            type="multiple"
            defaultValue={['specs']}
            className="w-full space-y-4"
          >
            <AccordionItem
              value="specs"
              className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                    <Ruler className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">
                      Technical Specifications
                    </span>
                    <p className="text-sm text-gray-500 font-normal">
                      Detailed specs and weight limits
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900">Materials</h4>
                    <div className="space-y-2 text-sm">
                      {[
                        {
                          label: 'Rod Material',
                          value: 'Steel with plated finish',
                        },
                        {
                          label: 'Finial Material',
                          value: 'Resin with metallic coating',
                        },
                        {
                          label: 'Bracket Material',
                          value: 'Steel with matching finish',
                        },
                        {label: 'Rings', value: 'Metal with nylon liner'},
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between py-2 border-b border-gray-100"
                        >
                          <span className="text-gray-500">{item.label}</span>
                          <span className="font-medium text-slate-900">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900">
                      Weight Capacity
                    </h4>
                    <div className="space-y-2 text-sm">
                      {[
                        {label: '3/4" Rod', value: 'Up to 15 lbs'},
                        {label: '1" Rod', value: 'Up to 25 lbs'},
                        {label: '1-1/4" Rod', value: 'Up to 35 lbs'},
                        {label: 'Bracket Spacing', value: 'Every 36-48 inches'},
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between py-2 border-b border-gray-100"
                        >
                          <span className="text-gray-500">{item.label}</span>
                          <span className="font-medium text-slate-900">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="installation"
              className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                    <WrenchIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">
                      Installation Guide
                    </span>
                    <p className="text-sm text-gray-500 font-normal">
                      Easy DIY installation in minutes
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 bg-gray-50 rounded-md text-center">
                    <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold">1</span>
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Mark Position
                    </h4>
                    <p className="text-sm text-gray-600">
                      Mark bracket positions 4-6 inches above window frame
                    </p>
                  </div>
                  <div className="p-5 bg-gray-50 rounded-md text-center">
                    <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold">2</span>
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Install Brackets
                    </h4>
                    <p className="text-sm text-gray-600">
                      Drill pilot holes and secure brackets with included screws
                    </p>
                  </div>
                  <div className="p-5 bg-gray-50 rounded-md text-center">
                    <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold">3</span>
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Hang Rod
                    </h4>
                    <p className="text-sm text-gray-600">
                      Slide rod through brackets and attach finials
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-sm text-amber-800">
                    <strong>Tip:</strong> For spans over 72 inches, use a center
                    support bracket (included with 1" and 1-1/4" rods) to
                    prevent sagging.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="care"
              className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                    <DropletsIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">
                      Care & Maintenance
                    </span>
                    <p className="text-sm text-gray-500 font-normal">
                      Keep your hardware looking new
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">
                      Cleaning
                    </h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Dust regularly with a soft cloth</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Clean with damp cloth and mild soap</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Dry immediately to prevent water spots</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Avoid</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-start gap-2">
                        <InfoIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>Abrasive cleaners or scrubbers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <InfoIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>Harsh chemicals or ammonia</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <InfoIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>Excessive moisture on finish</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="warranty"
              className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                    <ShieldCheckIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-lg text-slate-900">
                      Warranty & Returns
                    </span>
                    <p className="text-sm text-gray-500 font-normal">
                      5-year limited warranty coverage
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-5 bg-gray-50 rounded-md">
                    <h4 className="font-semibold text-slate-900 mb-3">
                      5-Year Limited Warranty
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Covers manufacturing defects</li>
                      <li>• Finish peeling or flaking</li>
                      <li>• Bracket or hardware failure</li>
                      <li>• Rod bending under rated weight</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-gray-50 rounded-md">
                    <h4 className="font-semibold text-slate-900 mb-3">
                      30-Day Returns
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Unused items in original packaging</li>
                      <li>• Free return shipping</li>
                      <li>• Full refund or exchange</li>
                      <li>• Defective items replaced at no cost</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-16 pt-16 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-2xl font-semibold text-slate-900">
                Customer Reviews
              </h3>
              <span className="text-gray-500">({productData.reviewCount})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-6 text-center rounded-md">
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
                    className="bg-white p-5 rounded-md border border-gray-200 shadow-sm"
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
    </div>
  );
};

export default ProductDetailHardwarePage;
