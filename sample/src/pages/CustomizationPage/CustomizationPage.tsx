import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  RulerIcon,
  PaletteIcon,
  LayersIcon,
  ShoppingBagIcon,
  SaveIcon,
  RotateCcwIcon,
} from 'lucide-react';
import { useCart } from '@/contexts/cart-context';

// Fabric options data
const fabrics = [
  {
    id: 'natural-linen',
    name: 'Natural Linen',
    description: '100% pure linen, breathable and elegant',
    priceMultiplier: 1,
    lightTransmission: 'Sheer',
    texture: 'Natural weave',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/4404b45f35da473c8fc6f026d2c13f56_ve_miaoda',
  },
  {
    id: 'cream-velvet',
    name: 'Cream Velvet',
    description: 'Luxurious velvet with soft touch',
    priceMultiplier: 1.4,
    lightTransmission: 'Blackout',
    texture: 'Plush',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/18c82e1fd4c74d7a9a8b1f676ef57916_ve_miaoda',
  },
  {
    id: 'white-sheer',
    name: 'White Sheer',
    description: 'Light and airy, filters natural light',
    priceMultiplier: 0.8,
    lightTransmission: 'Sheer',
    texture: 'Delicate',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/4e475ac2c1334bc5ad8c6230d0dae59e_ve_miaoda',
  },
  {
    id: 'charcoal-blackout',
    name: 'Charcoal Blackout',
    description: 'Complete light blocking, thermal insulated',
    priceMultiplier: 1.2,
    lightTransmission: 'Blackout',
    texture: 'Thick weave',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/34013fff634f414ea6ff57ba2c97cf2b_ve_miaoda',
  },
  {
    id: 'botanical-print',
    name: 'Botanical Print',
    description: 'Elegant floral pattern on cotton blend',
    priceMultiplier: 1.3,
    lightTransmission: 'Light-filtering',
    texture: 'Printed cotton',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5f909e47df72474caafcd3b191e077fd_ve_miaoda',
  },
  {
    id: 'raw-cotton',
    name: 'Raw Cotton',
    description: 'Organic cotton with natural texture',
    priceMultiplier: 1.1,
    lightTransmission: 'Light-filtering',
    texture: 'Slub weave',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/71c5a08726ba4857a88b02903542fc08_ve_miaoda',
  },
];

// Room background options for preview
const roomBackgrounds = [
  {
    id: 'living-room',
    name: 'Living Room',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/58c5b1e0bea9442eb4d1ea59746e3978_ve_miaoda',
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/7b849f6ee3bf42e885b324dd0907336b_ve_miaoda',
  },
  {
    id: 'dining-room',
    name: 'Dining Room',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/ef5c765748204a14b6ad03baebd04785_ve_miaoda',
  },
  {
    id: 'office',
    name: 'Home Office',
    image: 'https://miaoda.feishu.cn/aily/api/v1/files/static/cd2fb6ff06674ea6bc31045cd9354193_ve_miaoda',
  },
];

// Lining options
const liningOptions = [
  { id: 'standard', name: 'Standard Lining', price: 0, description: 'Basic protection and drape' },
  { id: 'blackout', name: 'Blackout Lining', price: 25, description: 'Blocks 99% of light' },
  { id: 'thermal', name: 'Thermal Lining', price: 35, description: 'Insulates against heat/cold' },
];

// Mounting options
const mountingOptions = [
  { id: 'rod-pocket', name: 'Rod Pocket', description: 'Classic gathered look' },
  { id: 'grommet', name: 'Grommet', description: 'Modern and easy to slide' },
  { id: 'back-tab', name: 'Back Tab', description: 'Clean, tailored appearance' },
];

const steps = [
  { id: 1, label: 'Choose Fabric', icon: PaletteIcon },
  { id: 2, label: 'Enter Dimensions', icon: RulerIcon },
  { id: 3, label: 'Select Lining', icon: LayersIcon },
  { id: 4, label: 'Review & Order', icon: ShoppingBagIcon },
];

const BASE_PRICE_PER_SQ_FT = 12;

const CustomizationPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Current step state
  const [currentStep, setCurrentStep] = useState(1);
  
  // Configuration state
  const [selectedFabric, setSelectedFabric] = useState<string>('');
  const [dimensions, setDimensions] = useState({ width: '', height: '', unit: 'inches' as 'inches' | 'cm' });
  const [selectedLining, setSelectedLining] = useState<string>('standard');
  const [selectedMounting, setSelectedMounting] = useState<string>('rod-pocket');
  const [selectedRoom, setSelectedRoom] = useState<string>('living-room');
  const [quantity, setQuantity] = useState(1);

  // Load saved configuration on mount
  useEffect(() => {
    const saved = localStorage.getItem('__global_curtain_customization');
    if (saved) {
      try {
        const config = JSON.parse(saved);
        if (config.fabric) setSelectedFabric(config.fabric);
        if (config.dimensions) setDimensions(config.dimensions);
        if (config.lining) setSelectedLining(config.lining);
        if (config.mounting) setSelectedMounting(config.mounting);
        if (config.roomType) setSelectedRoom(config.roomType);
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Save configuration when changes occur
  useEffect(() => {
    const config = {
      fabric: selectedFabric,
      dimensions,
      lining: selectedLining,
      mounting: selectedMounting,
      roomType: selectedRoom,
    };
    localStorage.setItem('__global_curtain_customization', JSON.stringify(config));
  }, [selectedFabric, dimensions, selectedLining, selectedMounting, selectedRoom]);

  // Calculate price
  const calculatePrice = () => {
    const fabric = fabrics.find(f => f.id === selectedFabric);
    if (!fabric || !dimensions.width || !dimensions.height) return 0;
    
    let width = parseFloat(dimensions.width);
    let height = parseFloat(dimensions.height);
    
    // Convert to inches if needed
    if (dimensions.unit === 'cm') {
      width = width / 2.54;
      height = height / 2.54;
    }
    
    const sqFt = (width * height) / 144;
    const lining = liningOptions.find(l => l.id === selectedLining);
    const liningPrice = lining?.price || 0;
    
    return Math.round((sqFt * BASE_PRICE_PER_SQ_FT * fabric.priceMultiplier + liningPrice) * quantity);
  };

  const totalPrice = calculatePrice();

  // Validation
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!selectedFabric;
      case 2:
        return dimensions.width && dimensions.height && 
               parseFloat(dimensions.width) >= 20 && parseFloat(dimensions.height) >= 20 &&
               parseFloat(dimensions.width) <= 300 && parseFloat(dimensions.height) <= 300;
      case 3:
        return !!selectedLining && !!selectedMounting;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const fabric = fabrics.find(f => f.id === selectedFabric);
    if (!fabric) return;

    const cartItem = {
      id: `custom-${Date.now()}`,
      productId: 'custom-curtain',
      productName: `Custom ${fabric.name} Curtain`,
      fabric: fabric.name,
      dimensions: {
        width: parseFloat(dimensions.width),
        height: parseFloat(dimensions.height),
        unit: dimensions.unit,
      },
      lining: selectedLining as 'standard' | 'blackout' | 'thermal',
      mounting: selectedMounting as 'rod-pocket' | 'grommet' | 'back-tab',
      quantity,
      unitPrice: totalPrice / quantity,
      image: fabric.image,
    };

    addToCart(cartItem);
    toast.success('Added to cart successfully!');
    navigate('/cart');
  };

  const handleSaveConfig = () => {
    toast.success('Configuration saved!');
  };

  const handleReset = () => {
    setSelectedFabric('');
    setDimensions({ width: '', height: '', unit: 'inches' });
    setSelectedLining('standard');
    setSelectedMounting('rod-pocket');
    setQuantity(1);
    setCurrentStep(1);
    toast.info('Configuration reset');
  };

  const selectedFabricData = fabrics.find(f => f.id === selectedFabric);
  const selectedRoomData = roomBackgrounds.find(r => r.id === selectedRoom);

  return (
    <>
      <style jsx>{`
        .fabric-card {
          transition: all 0.3s ease;
        }
        .fabric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }
        .fabric-card.selected {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px var(--primary);
        }
        .step-indicator {
          transition: all 0.3s ease;
        }
        .preview-container {
          position: relative;
          overflow: hidden;
        }
        .preview-curtain {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.5s ease;
        }
      `}</style>

      <div className="w-full space-y-8 pb-16">
        {/* Header */}
        <section className="w-full bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                  Customize Your Curtains
                </h1>
                <p className="text-muted-foreground mt-2">
                  Design custom curtains tailored to your space
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSaveConfig} className="rounded-full">
                  <SaveIcon className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="ghost" size="sm" onClick={handleReset} className="rounded-full">
                  <RotateCcwIcon className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Step Navigation */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center step-indicator ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : isCompleted
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckIcon className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium ${
                        isActive ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        isCompleted ? 'bg-primary' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Configuration */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Choose Fabric */}
              {currentStep === 1 && (
                <Card className="rounded-2xl">
                  <CardContent className="p-6">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
                      Select Your Fabric
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Choose from our premium collection of fabrics
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {fabrics.map((fabric) => (
                        <div
                          key={fabric.id}
                          className={`fabric-card cursor-pointer rounded-2xl border-2 overflow-hidden ${
                            selectedFabric === fabric.id ? 'selected border-primary' : 'border-border'
                          }`}
                          onClick={() => setSelectedFabric(fabric.id)}
                        >
                          <div className="aspect-[3/4] overflow-hidden">
                            <img
                              src={fabric.image}
                              alt={fabric.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-foreground">{fabric.name}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {fabric.lightTransmission}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {fabric.description}
                            </p>
                            <p className="text-sm font-medium text-primary">
                              +{Math.round((fabric.priceMultiplier - 1) * 100)}% vs base
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Enter Dimensions */}
              {currentStep === 2 && (
                <Card className="rounded-2xl">
                  <CardContent className="p-6">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
                      Enter Your Dimensions
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Measure your window for a perfect fit
                    </p>

                    <div className="space-y-6">
                      {/* Unit Toggle */}
                      <div className="flex items-center gap-4">
                        <Label className="text-sm font-medium">Unit:</Label>
                        <RadioGroup
                          value={dimensions.unit}
                          onValueChange={(v) => setDimensions({ ...dimensions, unit: v as 'inches' | 'cm' })}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="inches" id="inches" />
                            <Label htmlFor="inches" className="text-sm">Inches</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cm" id="cm" />
                            <Label htmlFor="cm" className="text-sm">Centimeters</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Dimensions Input */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="width" className="text-sm font-medium">
                            Width ({dimensions.unit === 'inches' ? '"' : 'cm'})
                          </Label>
                          <Input
                            id="width"
                            type="number"
                            placeholder={`Min 20, Max 300`}
                            value={dimensions.width}
                            onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                            className="rounded-lg"
                          />
                          <p className="text-xs text-muted-foreground">
                            Measure the width of your window frame
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="height" className="text-sm font-medium">
                            Height ({dimensions.unit === 'inches' ? '"' : 'cm'})
                          </Label>
                          <Input
                            id="height"
                            type="number"
                            placeholder={`Min 20, Max 300`}
                            value={dimensions.height}
                            onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                            className="rounded-lg"
                          />
                          <p className="text-xs text-muted-foreground">
                            Measure from top to desired length
                          </p>
                        </div>
                      </div>

                      {/* Tips Card */}
                      <div className="bg-accent/50 rounded-xl p-4">
                        <h4 className="font-semibold text-foreground mb-2">Measuring Tips</h4>
                        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                          <li>Measure width in 3 places: top, middle, bottom</li>
                          <li>Use the smallest measurement for width</li>
                          <li>Add 4-6 inches to height for proper coverage</li>
                          <li>Double-check your measurements before ordering</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Select Lining */}
              {currentStep === 3 && (
                <Card className="rounded-2xl">
                  <CardContent className="p-6">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
                      Select Lining & Mounting
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Choose the perfect finishing touches
                    </p>

                    {/* Lining Options */}
                    <div className="space-y-4 mb-8">
                      <h3 className="font-semibold text-foreground">Lining Type</h3>
                      <RadioGroup value={selectedLining} onValueChange={setSelectedLining}>
                        <div className="grid grid-cols-1 gap-3">
                          {liningOptions.map((lining) => (
                            <div
                              key={lining.id}
                              className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                selectedLining === lining.id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/50'
                              }`}
                              onClick={() => setSelectedLining(lining.id)}
                            >
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value={lining.id} id={lining.id} />
                                <div>
                                  <Label htmlFor={lining.id} className="font-semibold text-foreground cursor-pointer">
                                    {lining.name}
                                  </Label>
                                  <p className="text-sm text-muted-foreground">{lining.description}</p>
                                </div>
                              </div>
                              <span className="font-semibold text-primary">
                                {lining.price > 0 ? `+$${lining.price}` : 'Included'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <Separator className="my-6" />

                    {/* Mounting Options */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Mounting Style</h3>
                      <RadioGroup value={selectedMounting} onValueChange={setSelectedMounting}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {mountingOptions.map((mounting) => (
                            <div
                              key={mounting.id}
                              className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                                selectedMounting === mounting.id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/50'
                              }`}
                              onClick={() => setSelectedMounting(mounting.id)}
                            >
                              <RadioGroupItem value={mounting.id} id={mounting.id} className="sr-only" />
                              <Label htmlFor={mounting.id} className="font-semibold text-foreground cursor-pointer block mb-1">
                                {mounting.name}
                              </Label>
                              <p className="text-xs text-muted-foreground">{mounting.description}</p>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Review & Order */}
              {currentStep === 4 && (
                <Card className="rounded-2xl">
                  <CardContent className="p-6">
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
                      Review Your Order
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Double-check your configuration before adding to cart
                    </p>

                    <div className="space-y-6">
                      {/* Configuration Summary */}
                      <div className="bg-accent/30 rounded-xl p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Fabric</span>
                          <span className="font-semibold text-foreground">{selectedFabricData?.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Dimensions</span>
                          <span className="font-semibold text-foreground">
                            {dimensions.width} × {dimensions.height} {dimensions.unit}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Lining</span>
                          <span className="font-semibold text-foreground">
                            {liningOptions.find(l => l.id === selectedLining)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Mounting</span>
                          <span className="font-semibold text-foreground">
                            {mountingOptions.find(m => m.id === selectedMounting)?.name}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center text-lg">
                          <span className="font-semibold text-foreground">Total Price</span>
                          <span className="font-bold text-primary text-xl">${totalPrice}</span>
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Quantity</Label>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full h-8 w-8"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          >
                            -
                          </Button>
                          <span className="font-semibold w-8 text-center">{quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full h-8 w-8"
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <Button
                        className="w-full rounded-full py-6 text-lg font-semibold"
                        onClick={handleAddToCart}
                      >
                        <ShoppingBagIcon className="h-5 w-5 mr-2" />
                        Add to Cart - ${totalPrice}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="rounded-full"
                >
                  <ChevronLeftIcon className="h-4 w-4 mr-2" />
                  Back
                </Button>
                {currentStep < 4 && (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="rounded-full"
                  >
                    Next
                    <ChevronRightIcon className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>

            {/* Right Panel - Preview & Summary */}
            <div className="space-y-6">
              {/* Preview Card */}
              <Card className="rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-foreground">Preview</h3>
                  </div>
                  <div className="preview-container aspect-[4/3] bg-muted">
                    {selectedRoomData && (
                      <img
                        src={selectedRoomData.image}
                        alt={selectedRoomData.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {selectedFabricData && (
                      <div
                        className="preview-curtain left-0 w-1/3 opacity-90"
                        style={{
                          backgroundImage: `url(${selectedFabricData.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    )}
                    {selectedFabricData && (
                      <div
                        className="preview-curtain right-0 w-1/3 opacity-90"
                        style={{
                          backgroundImage: `url(${selectedFabricData.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    )}
                  </div>
                  
                  {/* Room Selector */}
                  <div className="p-4">
                    <Label className="text-sm font-medium mb-3 block">Room Setting</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {roomBackgrounds.map((room) => (
                        <button
                          key={room.id}
                          className={`p-2 rounded-lg text-xs font-medium transition-all ${
                            selectedRoom === room.id
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-accent text-accent-foreground hover:bg-accent/80'
                          }`}
                          onClick={() => setSelectedRoom(room.id)}
                        >
                          {room.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary Card */}
              <Card className="rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fabric</span>
                      <span className="text-foreground font-medium">
                        {selectedFabricData?.name || 'Not selected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimensions</span>
                      <span className="text-foreground font-medium">
                        {dimensions.width && dimensions.height
                          ? `${dimensions.width}×${dimensions.height} ${dimensions.unit}`
                          : 'Not set'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lining</span>
                      <span className="text-foreground font-medium">
                        {liningOptions.find(l => l.id === selectedLining)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mounting</span>
                      <span className="text-foreground font-medium">
                        {mountingOptions.find(m => m.id === selectedMounting)?.name}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Estimated Price</span>
                    <span className="font-bold text-primary text-2xl">
                      ${totalPrice || '---'}
                    </span>
                  </div>

                  {totalPrice > 200 && (
                    <p className="text-xs text-success mt-2 flex items-center gap-1">
                      <CheckIcon className="h-3 w-3" />
                      Qualifies for free shipping!
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CustomizationPage;
