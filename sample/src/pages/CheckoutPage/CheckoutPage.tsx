import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheckIcon, 
  LockIcon, 
  CreditCardIcon, 
  TruckIcon,
  ChevronRightIcon,
  PackageIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/cart-context';
import { toast } from 'sonner';

interface ICheckoutPageProps {}

interface IFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

const CheckoutPage: React.FC<ICheckoutPageProps> = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const shippingCost = shippingMethod === 'express' ? 25 : cartTotal >= 200 ? 0 : 15;
  const tax = cartTotal * 0.08;
  const orderTotal = cartTotal + shippingCost + tax;

  useEffect(() => {
    if (cartItems.length === 0 && !isOrderComplete) {
      navigate('/cart');
    }
  }, [cartItems, navigate, isOrderComplete]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsOrderComplete(true);
    clearCart();
    toast.success('Order placed successfully!');
  };

  if (isOrderComplete) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="h-10 w-10 text-success" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Thank You for Your Order!
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Your order has been confirmed. We'll send you a confirmation email shortly with your order details.
          </p>
          <div className="bg-card rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-foreground mb-2">Order Summary</h3>
            <p className="text-muted-foreground mb-1">Order Number: <span className="text-foreground font-medium">#DS{Date.now().toString().slice(-8)}</span></p>
            <p className="text-muted-foreground">Estimated Delivery: <span className="text-foreground font-medium">{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span></p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/shop')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
            >
              Continue Shopping
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
              className="rounded-full px-8"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2">
              Checkout
            </h1>
            <p className="text-muted-foreground">
              Complete your order by providing your details below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">1</span>
                  </div>
                  <h2 className="font-semibold text-lg text-foreground">Contact Information</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="mt-1.5 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      className="mt-1.5 rounded-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">2</span>
                  </div>
                  <h2 className="font-semibold text-lg text-foreground">Shipping Address</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                        First Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="mt-1.5 rounded-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                        Last Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="mt-1.5 rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className="text-sm font-medium text-foreground">
                      Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      required
                      className="mt-1.5 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="apartment" className="text-sm font-medium text-foreground">
                      Apartment, Suite, etc. (Optional)
                    </Label>
                    <Input
                      id="apartment"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      placeholder="Apt 4B"
                      className="mt-1.5 rounded-lg"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <Label htmlFor="city" className="text-sm font-medium text-foreground">
                        City <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="mt-1.5 rounded-lg"
                      />
                    </div>
                    <div className="col-span-1">
                      <Label htmlFor="state" className="text-sm font-medium text-foreground">
                        State <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="CA"
                        required
                        className="mt-1.5 rounded-lg"
                      />
                    </div>
                    <div className="col-span-1">
                      <Label htmlFor="zipCode" className="text-sm font-medium text-foreground">
                        ZIP <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="12345"
                        required
                        className="mt-1.5 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">3</span>
                  </div>
                  <h2 className="font-semibold text-lg text-foreground">Shipping Method</h2>
                </div>
                
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <div className="flex items-center gap-2">
                        <TruckIcon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Standard Shipping</p>
                          <p className="text-sm text-muted-foreground">5-7 business days</p>
                        </div>
                      </div>
                    </div>
                    <span className="font-semibold text-foreground">
                      {cartTotal >= 200 ? 'Free' : '$15.00'}
                    </span>
                  </label>
                  
                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="express" id="express" />
                      <div className="flex items-center gap-2">
                        <PackageIcon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Express Shipping</p>
                          <p className="text-sm text-muted-foreground">2-3 business days</p>
                        </div>
                      </div>
                    </div>
                    <span className="font-semibold text-foreground">$25.00</span>
                  </label>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">4</span>
                  </div>
                  <h2 className="font-semibold text-lg text-foreground">Payment Information</h2>
                </div>
                
                <div className="flex items-center gap-2 mb-6 p-3 bg-success/10 rounded-lg">
                  <LockIcon className="h-4 w-4 text-success" />
                  <span className="text-sm text-success">Your payment information is secure and encrypted</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber" className="text-sm font-medium text-foreground">
                      Card Number <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative mt-1.5">
                      <CreditCardIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        required
                        className="pl-10 rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="cardName" className="text-sm font-medium text-foreground">
                      Name on Card <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className="mt-1.5 rounded-lg"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry" className="text-sm font-medium text-foreground">
                        Expiry Date <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="expiry"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                        className="mt-1.5 rounded-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-sm font-medium text-foreground">
                        CVV <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={4}
                        required
                        className="mt-1.5 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ShieldCheckIcon className="h-4 w-4" />
                      <span>SSL Secure</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <LockIcon className="h-4 w-4" />
                      <span>256-bit Encryption</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                type="button"
                variant="outline"
                onClick={() => navigate('/cart')}
                className="sm:flex-1 rounded-full h-12"
              >
                Back to Cart
              </Button>
              <Button 
                type="submit"
                disabled={isProcessing}
                className="sm:flex-[2] bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 text-base font-medium"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  `Complete Order - $${orderTotal.toFixed(2)}`
                )}
              </Button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-6">
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-foreground">Order Summary</h3>
                  <button
                    onClick={() => setShowOrderSummary(!showOrderSummary)}
                    className="lg:hidden text-muted-foreground hover:text-foreground"
                  >
                    {showOrderSummary ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                  </button>
                </div>

                <div className={`space-y-4 ${showOrderSummary ? '' : 'hidden lg:block'}`}>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-accent rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{item.productName}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.fabric} · {item.dimensions.width}×{item.dimensions.height} {item.dimensions.unit}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.lining} · {item.mounting.replace('-', ' ')}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                          <span className="font-medium text-foreground">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-foreground">
                        {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Estimated Tax</span>
                      <span className="text-foreground">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-serif text-2xl font-semibold text-primary">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-accent/50 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <ShieldCheckIcon className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-foreground">Secure Checkout</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your payment is protected with 256-bit SSL encryption. We never store your full card details.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 text-muted-foreground">
              <span className="text-xs">Visa</span>
              <span className="text-xs">Mastercard</span>
              <span className="text-xs">Amex</span>
              <span className="text-xs">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
