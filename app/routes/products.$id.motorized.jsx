import {useState, useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
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
import {Image} from '~/components/ui/image';
import {toast} from 'sonner';
import {useCart} from '~/contexts/cart-context';
import {
  Star,
  CheckIcon,
  RulerIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  HeartIcon,
  Share2Icon,
  ShieldCheckIcon,
  RotateCcwIcon,
  ZapIcon,
  VolumeXIcon,
  SmartphoneIcon,
  ClockIcon,
  PlayIcon,
  PauseIcon,
  BatteryIcon,
  WifiIcon,
  HomeIcon,
  WrenchIcon,
  FileTextIcon,
  VideoIcon,
  PlusIcon,
  MinusIcon,
  BatteryChargingIcon,
  MoonIcon,
  SunIcon,
} from 'lucide-react';

export function meta() {
  return [{title: 'Smart Motorized Roman Shades | LuxDrape'}];
}

const productData = {
  id: 'motorized-1',
  name: 'Smart Motorized Roman Shades',
  description:
    'Experience the future of window treatments with our premium motorized Roman shades. Featuring whisper-quiet operation under 35dB, smart home integration with Alexa, Google Home, and Apple HomeKit, and a rechargeable battery that lasts up to 6 months on a single charge.',
  basePrice: 449.99,
  category: 'Motorized Shades',
  style: ['Smart Home', 'Modern', 'Luxury'],
  materials: ['Premium Polyester', 'Blackout Fabric', 'Aluminum Rail'],
  rating: 4.9,
  reviewCount: 256,
  features: [
    'Whisper-quiet operation (<35dB)',
    'Smart home compatible (Alexa, Google, HomeKit)',
    'Rechargeable battery (6-month life)',
    'Schedule automation',
    'Child and pet safe',
    '5-year motor warranty',
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
      id: 'gray',
      name: 'Light Gray',
      hex: '#9CA3AF',
      image:
        'https://miaoda.feishu.cn/aily/api/v1/files/static/71c5a08726ba4857a88b02903542fc08_ve_miaoda',
    },
    {
      id: 'navy',
      name: 'Navy Blue',
      hex: '#2C3E50',
      image:
        'https://miaoda.feishu.cn/aily/api/v1/files/static/190087f6844e4a6d9e9eecd6e38fdad3_ve_miaoda',
    },
  ],
  images: [
    {
      id: '1',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/32e10cbf3d664f158a4ef73292dda052_ve_miaoda',
      alt: 'Motorized shades in smart home',
    },
    {
      id: '2',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/58c5b1e0bea9442eb4d1ea59746e3978_ve_miaoda',
      alt: 'Remote control operation',
    },
    {
      id: '3',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d6e513cd18d543ba880d3432113b8457_ve_miaoda',
      alt: 'Smartphone app control',
    },
    {
      id: '4',
      url: 'https://miaoda.feishu.cn/aily/api/v1/files/static/ef5c765748204a14b6ad03baebd04785_ve_miaoda',
      alt: 'Close-up of fabric texture',
    },
  ],
  liningOptions: [
    {
      id: 'light-filtering',
      name: 'Light Filtering',
      price: 0,
      description: 'Soft natural light with privacy',
    },
    {
      id: 'room-darkening',
      name: 'Room Darkening',
      price: 50,
      description: 'Blocks 90% of light',
    },
    {
      id: 'blackout',
      name: 'Blackout',
      price: 80,
      description: 'Complete light blockage, perfect for bedrooms',
    },
  ],
  controlOptions: [
    {
      id: 'remote',
      name: 'Remote Control',
      price: 0,
      description: 'Handheld remote included',
    },
    {
      id: 'wall-switch',
      name: 'Wall Switch',
      price: 35,
      description: 'Hardwired wall control',
    },
    {
      id: 'smart-hub',
      name: 'Smart Hub Bundle',
      price: 99,
      description: 'Hub for app and voice control',
    },
  ],
};

const SilentOperationDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [shadePosition, setShadePosition] = useState(0);
  const [decibelLevel, setDecibelLevel] = useState(28);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setShadePosition((prev) => {
          const newPos = prev + 0.5;
          setDecibelLevel(30 + Math.random() * 5);
          if (newPos >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return newPos;
        });
      }, 50);
    } else {
      setDecibelLevel(28);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const resetDemo = () => {
    setIsPlaying(false);
    setShadePosition(0);
    setDecibelLevel(28);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-medium flex items-center gap-2 text-lg">
            <VolumeXIcon className="w-5 h-5 text-emerald-400" />
            Whisper-Quiet Operation Demo
          </h4>
          <p className="text-sm text-slate-400 mt-1">
            Experience our sub-35dB motor technology
          </p>
        </div>
        <div className="flex gap-2">
          {!isPlaying && shadePosition === 0 ? (
            <button
              onClick={() => setIsPlaying(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <PlayIcon className="w-4 h-4" />
              Play Demo
            </button>
          ) : shadePosition >= 100 ? (
            <button
              onClick={resetDemo}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-full text-sm font-medium hover:bg-slate-600 transition-colors"
            >
              <RotateCcwIcon className="w-4 h-4" />
              Replay
            </button>
          ) : (
            <button
              onClick={() => setIsPlaying(false)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-full text-sm font-medium hover:bg-slate-600 transition-colors"
            >
              <PauseIcon className="w-4 h-4" />
              Pause
            </button>
          )}
        </div>
      </div>
      <div
        className="relative bg-sky-200 rounded-xl overflow-hidden mb-4"
        style={{height: '200px'}}
      >
        <div className="absolute inset-4 border-4 border-white rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-100">
            <div className="absolute top-3 left-6 w-16 h-8 bg-white/70 rounded-full" />
            <div className="absolute top-6 right-10 w-12 h-6 bg-white/50 rounded-full" />
            <div className="absolute top-2 right-1/3 w-10 h-5 bg-white/60 rounded-full" />
          </div>
          <div
            className="absolute inset-x-0 top-0 bg-gradient-to-b from-slate-100 to-slate-200 transition-all duration-75 shadow-inner"
            style={{height: `${100 - shadePosition}%`}}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(0,0,0,0.1) 15px, rgba(0,0,0,0.1) 16px)',
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-slate-300" />
          </div>
          <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full">
            <div className="flex items-center gap-2">
              <div className="flex items-end gap-0.5 h-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-1 bg-emerald-400 rounded-full transition-all duration-100"
                    style={{
                      height: isPlaying
                        ? `${Math.min(100, (decibelLevel - 25) * (i * 0.8 + 2))}%`
                        : '15%',
                      opacity: isPlaying ? 1 : 0.5,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-emerald-400">
                {decibelLevel.toFixed(1)} dB
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 bg-slate-700/50 rounded-lg">
          <VolumeXIcon className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
          <p className="text-xs font-medium">&lt; 35dB</p>
          <p className="text-[10px] text-slate-400">Library Quiet</p>
        </div>
        <div className="text-center p-3 bg-slate-700/50 rounded-lg">
          <BatteryChargingIcon className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
          <p className="text-xs font-medium">6 Months</p>
          <p className="text-[10px] text-slate-400">Battery Life</p>
        </div>
        <div className="text-center p-3 bg-slate-700/50 rounded-lg">
          <WifiIcon className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <p className="text-xs font-medium">Smart Ready</p>
          <p className="text-[10px] text-slate-400">Voice Control</p>
        </div>
      </div>
    </div>
  );
};

const DifficultyMeter = ({level, time, message}) => {
  const colors = {1: 'bg-emerald-500', 2: 'bg-amber-500', 3: 'bg-orange-500'};
  return (
    <div className="bg-accent/30 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-medium flex items-center gap-2">
            <WrenchIcon className="w-4 h-4 text-primary" />
            Installation Difficulty
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Based on customer feedback
          </p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${colors[level]}`}
        >
          Level {level}
        </div>
      </div>
      <div className="relative h-3 bg-border rounded-full overflow-hidden mb-4">
        <div
          className={`absolute left-0 top-0 h-full ${colors[level]} transition-all duration-500`}
          style={{width: `${(level / 3) * 100}%`}}
        />
        <div className="absolute left-1/3 top-0 w-px h-full bg-white/50" />
        <div className="absolute left-2/3 top-0 w-px h-full bg-white/50" />
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <ClockIcon className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{time}</span>
        </div>
        <span className="text-primary font-medium italic">
          &quot;{message}&quot;
        </span>
      </div>
    </div>
  );
};

const TutorialHub = () => {
  const [activeTab, setActiveTab] = useState('video');
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('video')}
          className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'video' ? 'bg-primary/5 text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <VideoIcon className="w-4 h-4" />
          Quick Video (1 min)
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'guide' ? 'bg-primary/5 text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <FileTextIcon className="w-4 h-4" />
          Download Guides
        </button>
      </div>
      <div className="p-4">
        {activeTab === 'video' ? (
          <div className="space-y-3">
            <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
              <div className="relative z-10 w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <PlayIcon className="w-6 h-6 text-primary-foreground ml-1" />
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-xs text-white/80">
                  Motorized Shade Installation
                </span>
                <span className="text-xs text-white/60">1:24</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Watch our step-by-step guide for installing motorized shades. No
              electrician needed for battery-powered models.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button className="p-4 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-colors text-left">
                <FileTextIcon className="w-6 h-6 text-primary mb-2" />
                <p className="font-medium text-sm">Measurement Checklist</p>
                <p className="text-xs text-muted-foreground">PDF • 2 pages</p>
              </button>
              <button className="p-4 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-colors text-left">
                <FileTextIcon className="w-6 h-6 text-primary mb-2" />
                <p className="font-medium text-sm">Installation Manual</p>
                <p className="text-xs text-muted-foreground">PDF • 8 pages</p>
              </button>
              <button className="p-4 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-colors text-left">
                <FileTextIcon className="w-6 h-6 text-primary mb-2" />
                <p className="font-medium text-sm">Smart Setup Guide</p>
                <p className="text-xs text-muted-foreground">PDF • 5 pages</p>
              </button>
              <button className="p-4 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-colors text-left">
                <FileTextIcon className="w-6 h-6 text-primary mb-2" />
                <p className="font-medium text-sm">Troubleshooting</p>
                <p className="text-xs text-muted-foreground">PDF • 3 pages</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const VisualMeasureGuide = ({mountType, onMountTypeChange}) => {
  return (
    <div className="relative">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => onMountTypeChange('inside')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${mountType === 'inside' ? 'bg-primary text-primary-foreground' : 'bg-accent text-foreground hover:bg-accent/70'}`}
        >
          Inside Mount
        </button>
        <button
          onClick={() => onMountTypeChange('outside')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${mountType === 'outside' ? 'bg-primary text-primary-foreground' : 'bg-accent text-foreground hover:bg-accent/70'}`}
        >
          Outside Mount
        </button>
      </div>
      <div className="bg-accent/30 rounded-xl p-4">
        <div className="relative aspect-[4/3] bg-white rounded-lg border-2 border-border overflow-hidden">
          {mountType === 'inside' ? (
            <>
              <div className="absolute inset-8 border-4 border-slate-300 rounded bg-sky-50">
                <div className="absolute inset-0 border-8 border-slate-400">
                  <div className="absolute inset-1 bg-slate-200 rounded-sm">
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-slate-300 rounded-sm" />
                  </div>
                </div>
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center">
                  <div className="w-2 h-2 border-l-2 border-b-2 border-primary rotate-45 -ml-1" />
                  <div className="flex-1 h-px bg-primary" />
                  <span className="px-2 text-xs font-medium text-primary bg-white">
                    Width
                  </span>
                  <div className="flex-1 h-px bg-primary" />
                  <div className="w-2 h-2 border-r-2 border-t-2 border-primary rotate-45 -mr-1" />
                </div>
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-2 h-2 border-l-2 border-t-2 border-primary rotate-45 -mt-1" />
                  <div className="w-px flex-1 bg-primary" />
                  <span className="py-1 text-xs font-medium text-primary bg-white">
                    Height
                  </span>
                  <div className="w-px flex-1 bg-primary" />
                  <div className="w-2 h-2 border-r-2 border-b-2 border-primary rotate-45 -mb-1" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-center">
                <p className="text-xs text-muted-foreground">
                  Measure inside the window frame
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="absolute inset-8">
                <div className="absolute -inset-2 border-4 border-primary rounded bg-slate-200">
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-slate-300 rounded-sm" />
                </div>
                <div className="absolute inset-4 border-4 border-slate-400 bg-sky-50 rounded" />
                <div className="absolute -left-2 -right-2 top-1/2 -translate-y-1/2 flex items-center">
                  <div className="w-2 h-2 border-l-2 border-b-2 border-primary rotate-45" />
                  <div className="flex-1 h-px bg-primary" />
                  <span className="px-2 text-xs font-medium text-primary bg-white">
                    Width + 4&quot;
                  </span>
                  <div className="flex-1 h-px bg-primary" />
                  <div className="w-2 h-2 border-r-2 border-t-2 border-primary rotate-45" />
                </div>
                <div className="absolute -top-2 -bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-2 h-2 border-l-2 border-t-2 border-primary rotate-45" />
                  <div className="w-px flex-1 bg-primary" />
                  <span className="py-1 text-xs font-medium text-primary bg-white">
                    Height + 3&quot;
                  </span>
                  <div className="w-px flex-1 bg-primary" />
                  <div className="w-2 h-2 border-r-2 border-b-2 border-primary rotate-45" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-center">
                <p className="text-xs text-muted-foreground">
                  Shade overlaps window frame by 2-3&quot;
                </p>
              </div>
            </>
          )}
        </div>
        <div className="mt-3 text-sm text-muted-foreground">
          {mountType === 'inside' ? (
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                Measure width at top, middle, and bottom
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                Use the narrowest width measurement
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                We&apos;ll deduct 1/4&quot; for proper clearance
              </li>
            </ul>
          ) : (
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                Measure the area you want to cover
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                Add 3-4&quot; to width for optimal coverage
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                Add 3&quot; to height for better light blockage
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const SizeCalculator = ({mountType}) => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
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
    <div className="bg-accent/30 rounded-xl p-4 space-y-4">
      <h4 className="font-medium flex items-center gap-2">
        <RulerIcon className="w-4 h-4 text-primary" />
        Size Calculator
      </h4>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs mb-1.5 block">Window Width (&quot;)</Label>
          <Input
            type="number"
            step="0.125"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="36"
            className="h-10"
          />
        </div>
        <div>
          <Label className="text-xs mb-1.5 block">Window Height (&quot;)</Label>
          <Input
            type="number"
            step="0.125"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="48"
            className="h-10"
          />
        </div>
      </div>
      <Button
        onClick={calculate}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Calculate Shade Size
      </Button>
      {result && (
        <div className="bg-primary/10 rounded-lg p-3 space-y-1">
          <p className="text-sm font-medium text-primary">
            Recommended Shade Size:
          </p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Width:</span>
            <span className="font-semibold">{result.width}&quot;</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Height:</span>
            <span className="font-semibold">{result.height}&quot;</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function MotorizedShadesPage() {
  const navigate = useNavigate();
  const {addToCart} = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedLining, setSelectedLining] = useState(
    productData.liningOptions[0],
  );
  const [selectedControl, setSelectedControl] = useState(
    productData.controlOptions[0],
  );
  const [width, setWidth] = useState('36');
  const [height, setHeight] = useState('48');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mountType, setMountType] = useState('inside');
  const [showMeasureGuide, setShowMeasureGuide] = useState(false);

  const totalPrice = useMemo(() => {
    const basePrice = productData.basePrice;
    const liningPrice = selectedLining.price;
    const controlPrice = selectedControl.price;
    const widthValue = parseFloat(width) || 36;
    const heightValue = parseFloat(height) || 48;
    const sizeMultiplier = (widthValue * heightValue) / (36 * 48);
    const unitPrice =
      (basePrice + liningPrice + controlPrice) * Math.max(sizeMultiplier, 0.7);
    return Math.round(unitPrice * quantity);
  }, [selectedLining, selectedControl, width, height, quantity]);

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
      mounting: 'motorized',
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
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
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="outline"
                  className="rounded-full text-xs font-medium text-purple-600 border-purple-200 bg-purple-50"
                >
                  <ZapIcon className="w-3 h-3 mr-1" />
                  Smart Motorized
                </Badge>
                <Badge
                  variant="outline"
                  className="rounded-full text-xs font-medium text-primary border-primary/30"
                >
                  Premium
                </Badge>
              </div>
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
                  ({productData.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-foreground">
                  ${totalPrice}
                </span>
                <span className="text-lg text-muted-foreground">
                  for {width}&quot; x {height}&quot;
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <CheckIcon className="w-4 h-4" />
                <span>FREE Shipping • 5-Year Motor Warranty</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Color: {selectedColor.name}
                </Label>
                <button className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                  <RulerIcon className="w-3 h-3" />
                  {showMeasureGuide ? 'Hide Guide' : 'Show Visual Guide'}
                </button>
              </div>
              {showMeasureGuide && (
                <VisualMeasureGuide
                  mountType={mountType}
                  onMountTypeChange={setMountType}
                />
              )}
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
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Dimensions (inches)
                </Label>
                <button
                  onClick={() => setShowMeasureGuide(!showMeasureGuide)}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <RulerIcon className="w-3 h-3" />
                  {showMeasureGuide ? 'Hide Guide' : 'Show Visual Guide'}
                </button>
              </div>
              {showMeasureGuide && (
                <VisualMeasureGuide
                  mountType={mountType}
                  onMountTypeChange={setMountType}
                />
              )}
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
              <Label className="text-sm font-medium">Light Control</Label>
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
              <Label className="text-sm font-medium">Control Method</Label>
              <RadioGroup
                value={selectedControl.id}
                onValueChange={(val) => {
                  const control = productData.controlOptions.find(
                    (c) => c.id === val,
                  );
                  if (control) setSelectedControl(control);
                }}
              >
                <div className="grid gap-3">
                  {productData.controlOptions.map((control) => (
                    <div key={control.id}>
                      <RadioGroupItem
                        value={control.id}
                        id={control.id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={control.id}
                        className="flex items-start gap-3 p-4 rounded-xl border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-muted-foreground"
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{control.name}</span>
                            <span className="text-sm">
                              {control.price > 0
                                ? `+$${control.price}`
                                : 'Included'}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {control.description}
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
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 py-2">
              <div className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-purple-50 border border-purple-100">
                <VolumeXIcon className="w-5 h-5 text-purple-600" />
                <span className="text-xs text-purple-700">
                  Whisper
                  <br />
                  Quiet
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-blue-50 border border-blue-100">
                <BatteryChargingIcon className="w-5 h-5 text-blue-600" />
                <span className="text-xs text-blue-700">
                  6-Month
                  <br />
                  Battery
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <ShieldCheckIcon className="w-5 h-5 text-emerald-600" />
                <span className="text-xs text-emerald-700">
                  5-Year
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <DifficultyMeter
              level={1}
              time="15-20 min"
              message="You got this!"
            />
          </div>
          <div className="lg:col-span-2">
            <TutorialHub />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-2">
            Experience the Silence
          </h2>
          <p className="text-muted-foreground">
            Our advanced motor technology operates at under 35dB — quieter than
            a whisper
          </p>
        </div>
        <SilentOperationDemo />
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="smart"
        >
          <AccordionItem value="smart" className="border-b border-border">
            <AccordionTrigger className="py-4 text-lg font-serif font-semibold hover:no-underline">
              <div className="flex items-center gap-2">
                <SmartphoneIcon className="w-5 h-5 text-purple-500" />
                Smart Home Integration
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-accent/30 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-2xl">🎤</span>
                  </div>
                  <h4 className="font-medium mb-1">Voice Control</h4>
                  <p className="text-xs text-muted-foreground">
                    Works with Alexa, Google Assistant, and Siri
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-accent/30 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-100 flex items-center justify-center">
                    <SunIcon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 className="font-medium mb-1">Schedules</h4>
                  <p className="text-xs text-muted-foreground">
                    Automate opening/closing times
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-accent/30 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
                    <MoonIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-1">Sunrise/Sunset</h4>
                  <p className="text-xs text-muted-foreground">
                    Sync with local sunrise times
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="battery" className="border-b border-border">
            <AccordionTrigger className="py-4 text-lg font-serif font-semibold hover:no-underline">
              <div className="flex items-center gap-2">
                <BatteryIcon className="w-5 h-5 text-emerald-500" />
                Rechargeable Battery
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Our high-capacity lithium battery provides up to 6 months of
                  use on a single charge, depending on usage frequency.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-emerald-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-emerald-600">6</p>
                    <p className="text-xs text-emerald-700">
                      Months Battery Life
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-emerald-600">4hr</p>
                    <p className="text-xs text-emerald-700">Full Charge Time</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-emerald-600">500+</p>
                    <p className="text-xs text-emerald-700">Cycles/Charge</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-emerald-600">USB-C</p>
                    <p className="text-xs text-emerald-700">Charging Port</p>
                  </div>
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
                  <tr>
                    <td className="py-3 text-sm text-muted-foreground w-1/3">
                      Motor Noise Level
                    </td>
                    <td className="py-3 text-sm font-medium">&lt; 35dB</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-muted-foreground">
                      Battery Capacity
                    </td>
                    <td className="py-3 text-sm font-medium">2600mAh Li-ion</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-muted-foreground">
                      Max Shade Weight
                    </td>
                    <td className="py-3 text-sm font-medium">20 lbs</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-muted-foreground">
                      Smart Protocols
                    </td>
                    <td className="py-3 text-sm font-medium">
                      WiFi, Bluetooth 5.0
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-sm text-muted-foreground">
                      Warranty
                    </td>
                    <td className="py-3 text-sm font-medium">
                      5 Years on Motor
                    </td>
                  </tr>
                </tbody>
              </table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
