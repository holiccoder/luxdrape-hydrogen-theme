import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { toast } from 'sonner';
import {
  MinusIcon,
  PlusIcon,
  Trash2Icon,
  ShoppingBagIcon,
  ArrowRightIcon,
  TagIcon,
  ShieldCheckIcon,
  LockIcon,
  CreditCardIcon,
} from 'lucide-react';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const shippingCost = cartTotal >= 200 ? 0 : 15;
  const taxRate = 0.08;
  const taxAmount = (cartTotal - discount) * taxRate;
  const finalTotal = cartTotal - discount + shippingCost + taxAmount;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string, productName: string) => {
    removeFromCart(id);
    toast.success(`${productName} removed from cart`);
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      toast.error('Please enter a promo code');
      return;
    }
    setIsApplyingPromo(true);
    setTimeout(() => {
      if (promoCode.toUpperCase() === 'SAVE10') {
        const discountAmount = cartTotal * 0.1;
        setDiscount(discountAmount);
        toast.success(`Promo code applied! You saved $${discountAmount.toFixed(2)}`);
      } else if (promoCode.toUpperCase() === 'FREESHIP') {
        setDiscount(0);
        toast.success('Free shipping applied!');
      } else {
        toast.error('Invalid promo code');
      }
      setIsApplyingPromo(false);
    }, 800);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <>
        <style jsx>{`
          .cart-empty {
            animation: fadeIn 0.5s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 cart-empty">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBagIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any curtains yet. Explore our collection and find the perfect window treatments for your home.
            </p>
            <Button
              onClick={() => navigate('/shop')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 h-auto"
            >
              Start Shopping
              <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <style jsx>{`
        .cart-page {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 cart-page">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column - Cart Items */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-serif text-3xl font-semibold text-foreground">
                Shopping Cart
              </h1>
              <span className="text-muted-foreground">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Cart Items List */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="bg-card border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-32 md:w-32 md:h-40 flex-shrink-0 rounded-xl overflow-hidden bg-accent">
                        <Image
                          src={item.image}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h3 className="font-medium text-foreground text-lg line-clamp-2">
                              {item.productName}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.fabric} • {item.lining} lining
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {item.dimensions.width}" × {item.dimensions.height}" {item.dimensions.unit}
                            </p>
                            <p className="text-sm text-muted-foreground capitalize">
                              {item.mounting.replace('-', ' ')}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleRemoveItem(item.id, item.productName)}
                          >
                            <Trash2Icon className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 bg-accent rounded-full p-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-full"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              <MinusIcon className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-full"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <PlusIcon className="w-3 h-3" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="font-semibold text-foreground">
                              ${(item.unitPrice * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ${item.unitPrice.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-96">
            <Card className="bg-card border-border rounded-2xl shadow-sm sticky top-24">
              <CardContent className="p-6">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
                  Order Summary
                </h2>

                {/* Subtotal */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${cartTotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-success">Discount</span>
                      <span className="text-success">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shippingCost === 0 ? 'text-success' : 'text-foreground'}>
                      {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Tax</span>
                    <span className="text-foreground">${taxAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-semibold text-foreground text-xl">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                  {cartTotal < 200 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Add ${(200 - cartTotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="pl-9 rounded-lg"
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleApplyPromo}
                      disabled={isApplyingPromo}
                      className="rounded-lg"
                    >
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Try "SAVE10" or "FREESHIP"
                  </p>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-4 h-auto font-medium"
                >
                  Proceed to Checkout
                  <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Button>

                {/* Express Checkout */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-center text-muted-foreground mb-4">
                    Or checkout with
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="rounded-lg h-11">
                      <span className="font-semibold text-sm">PayPal</span>
                    </Button>
                    <Button variant="outline" className="rounded-lg h-11">
                      <span className="font-semibold text-sm">Apple</span>
                    </Button>
                    <Button variant="outline" className="rounded-lg h-11">
                      <span className="font-semibold text-sm">Google</span>
                    </Button>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <LockIcon className="w-4 h-4" />
                    <span>Secure SSL Encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheckIcon className="w-4 h-4" />
                    <span>30-Day Money Back Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CreditCardIcon className="w-4 h-4" />
                    <span>All Major Cards Accepted</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
