import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  ShoppingBagIcon,
  StarIcon,
  PlayIcon,
  ArrowRightIcon,
  SwatchBookIcon,
  ChevronDownIcon,
  XIcon,
  SlidersHorizontalIcon,
} from 'lucide-react';
import {Button} from '~/components/ui/button';
import {Badge} from '~/components/ui/badge';
import {Checkbox} from '~/components/ui/checkbox';
import {Slider} from '~/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import {toast} from 'sonner';
import {useCart} from '~/contexts/cart-context';
import {Image} from '~/components/ui/image';
import {ScrollArea} from '~/components/ui/scroll-area';

const products = [
  {
    id: '1',
    name: 'Belgian Linen Curtain',
    price: 189,
    rating: 4.8,
    reviewCount: 324,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda',
    hoverImage:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/190087f6844e4a6d9e9eecd6e38fdad3_ve_miaoda',
    material: 'Linen',
    badge: 'Best Seller',
    colors: [
      {name: 'White', hex: '#F8F8F8'},
      {name: 'Cream', hex: '#F5F5DC'},
      {name: 'Natural', hex: '#E8DCC4'},
      {name: 'Oatmeal', hex: '#E6DCC4'},
      {name: 'Sage', hex: '#9CAF88'},
      {name: 'Charcoal', hex: '#36454F'},
      {name: 'Navy', hex: '#1E3A5F'},
      {name: 'Blush', hex: '#F4C2C2'},
    ],
  },
  {
    id: '2',
    name: 'Herringbone Linen Drape',
    price: 219,
    rating: 4.9,
    reviewCount: 256,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/190087f6844e4a6d9e9eecd6e38fdad3_ve_miaoda',
    hoverImage:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/6d9f0df723de4f648a28c44f08db77d1_ve_miaoda',
    material: 'Linen',
    badge: 'New',
    colors: [
      {name: 'Ivory', hex: '#FFFFF0'},
      {name: 'Taupe', hex: '#B8A89A'},
      {name: 'Grey', hex: '#808080'},
      {name: 'Mocha', hex: '#967969'},
      {name: 'Slate', hex: '#708090'},
      {name: 'Forest', hex: '#228B22'},
    ],
  },
  {
    id: '3',
    name: 'Cotton Canvas Curtain',
    price: 149,
    rating: 4.6,
    reviewCount: 189,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/6d9f0df723de4f648a28c44f08db77d1_ve_miaoda',
    material: 'Cotton',
    colors: [
      {name: 'White', hex: '#FFFFFF'},
      {name: 'Cream', hex: '#FFFDD0'},
      {name: 'Beige', hex: '#F5F5DC'},
      {name: 'Grey', hex: '#D3D3D3'},
      {name: 'Navy', hex: '#000080'},
      {name: 'Black', hex: '#000000'},
    ],
  },
  {
    id: '4',
    name: 'Velvet Luxe Drape',
    price: 279,
    rating: 4.9,
    reviewCount: 412,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/5f909e47df72474caafcd3b191e077fd_ve_miaoda',
    hoverImage:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/71c5a08726ba4857a88b02903542fc08_ve_miaoda',
    material: 'Velvet',
    badge: 'Premium',
    colors: [
      {name: 'Emerald', hex: '#50C878'},
      {name: 'Sapphire', hex: '#0F52BA'},
      {name: 'Burgundy', hex: '#800020'},
      {name: 'Charcoal', hex: '#36454F'},
      {name: 'Gold', hex: '#FFD700'},
      {name: 'Rose', hex: '#FF007F'},
      {name: 'Teal', hex: '#008080'},
      {name: 'Plum', hex: '#DDA0DD'},
    ],
  },
  {
    id: '5',
    name: 'Plaid Wool Curtain',
    price: 239,
    rating: 4.7,
    reviewCount: 156,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/71c5a08726ba4857a88b02903542fc08_ve_miaoda',
    material: 'Wool Blend',
    colors: [
      {name: 'Tan Plaid', hex: '#D2B48C'},
      {name: 'Grey Plaid', hex: '#A9A9A9'},
      {name: 'Navy Plaid', hex: '#4682B4'},
      {name: 'Red Plaid', hex: '#CD5C5C'},
    ],
  },
  {
    id: '6',
    name: 'Sheer Linen Panel',
    price: 129,
    rating: 4.5,
    reviewCount: 278,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/6310ecde128b4463aff2428e6a1327a2_ve_miaoda',
    material: 'Sheer Linen',
    colors: [
      {name: 'White', hex: '#FFFAFA'},
      {name: 'Ivory', hex: '#FFFFF0'},
      {name: 'Blush', hex: '#FFE4E1'},
      {name: 'Sage', hex: '#C1E1C1'},
      {name: 'Grey', hex: '#D3D3D3'},
      {name: 'Lavender', hex: '#E6E6FA'},
    ],
  },
  {
    id: '7',
    name: 'Blackout Cotton Curtain',
    price: 169,
    rating: 4.7,
    reviewCount: 523,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/34013fff634f414ea6ff57ba2c97cf2b_ve_miaoda',
    material: 'Cotton',
    badge: 'Best Seller',
    colors: [
      {name: 'White', hex: '#F5F5F5'},
      {name: 'Beige', hex: '#F5F5DC'},
      {name: 'Grey', hex: '#808080'},
      {name: 'Navy', hex: '#191970'},
      {name: 'Charcoal', hex: '#2F4F4F'},
      {name: 'Black', hex: '#0A0A0A'},
    ],
  },
  {
    id: '8',
    name: 'Silk Dupioni Curtain',
    price: 329,
    rating: 4.8,
    reviewCount: 98,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/4404b45f35da473c8fc6f026d2c13f56_ve_miaoda',
    hoverImage:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda',
    material: 'Silk',
    badge: 'Luxury',
    colors: [
      {name: 'Champagne', hex: '#F7E7CE'},
      {name: 'Silver', hex: '#C0C0C0'},
      {name: 'Gold', hex: '#D4AF37'},
      {name: 'Aubergine', hex: '#614051'},
      {name: 'Peacock', hex: '#004953'},
      {name: 'Coral', hex: '#FF7F50'},
    ],
  },
];

const shoppableVideos = [
  {
    id: 'v1',
    thumbnail:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda',
    productId: '1',
    productName: 'Belgian Linen Curtain',
    duration: '0:45',
    title: 'How to Measure Your Windows',
  },
  {
    id: 'v2',
    thumbnail:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/190087f6844e4a6d9e9eecd6e38fdad3_ve_miaoda',
    productId: '4',
    productName: 'Velvet Luxe Drape',
    duration: '1:12',
    title: 'Velvet Curtain Styling Tips',
  },
  {
    id: 'v3',
    thumbnail:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/5f909e47df72474caafcd3b191e077fd_ve_miaoda',
    productId: '7',
    productName: 'Blackout Cotton Curtain',
    duration: '0:58',
    title: 'Installing Blackout Curtains',
  },
  {
    id: 'v4',
    thumbnail:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/6310ecde128b4463aff2428e6a1327a2_ve_miaoda',
    productId: '6',
    productName: 'Sheer Linen Panel',
    duration: '0:36',
    title: 'Layering Sheer & Blackout',
  },
];

const materialOptions = [
  'Linen',
  'Cotton',
  'Velvet',
  'Silk',
  'Wool Blend',
  'Sheer Linen',
];

const ProductCard = ({product, onQuickView}) => {
  const navigate = useNavigate();
  const {addToCart} = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      fabric: product.material,
      dimensions: {width: 54, height: 84, unit: 'inches'},
      lining: 'standard',
      mounting: 'grommet',
      quantity: 1,
      unitPrice: product.price,
      image: product.image,
    });
    toast.success(`${product.name} added to cart`);
  };

  const visibleColors = product.colors.slice(0, 6);
  const hasMoreColors = product.colors.length > 6;

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4">
        <Image
          src={
            isHovered && product.hoverImage ? product.hoverImage : product.image
          }
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[hsl(220_25%_25%)] text-white text-xs font-medium px-3 py-1.5">
            {product.badge}
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            className="bg-white text-foreground hover:bg-white/90 border-0"
            onClick={() => onQuickView(product)}
          >
            Quick View
          </Button>
          <Button
            size="sm"
            className="bg-[hsl(220_25%_25%)] text-white hover:bg-[hsl(220_25%_20%)] border-0"
            onClick={handleAddToCart}
          >
            <ShoppingBagIcon className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          {visibleColors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              className={`w-5 h-5 border transition-all ${
                selectedColor.name === color.name
                  ? 'border-foreground ring-1 ring-foreground'
                  : 'border-border hover:border-foreground/50'
              }`}
              style={{backgroundColor: color.hex}}
              title={color.name}
            />
          ))}
          {hasMoreColors && (
            <span className="text-xs text-muted-foreground ml-1">
              +{product.colors.length - 6}
            </span>
          )}
        </div>
        <h3
          className="font-medium text-foreground mb-1 cursor-pointer hover:text-[hsl(220_25%_25%)] transition-colors"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{product.material}</p>
        <div className="flex items-center gap-1 mb-3">
          <StarIcon className="h-3.5 w-3.5 fill-[hsl(220_25%_35%)] text-[hsl(220_25%_35%)]" />
          <span className="text-sm">{product.rating}</span>
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">From ${product.price}</span>
          <button
            onClick={() => navigate('/products/prod-2/swatches')}
            className="text-xs text-muted-foreground hover:text-[hsl(220_25%_25%)] flex items-center gap-1 transition-colors"
          >
            <SwatchBookIcon className="h-3 w-3" />
            Order Swatch
          </button>
        </div>
      </div>
    </div>
  );
};

const ShopPage = () => {
  const navigate = useNavigate();
  const {addToCart} = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    materials: [],
    priceRange: [0, 400],
  });

  const filteredProducts = React.useMemo(() => {
    let result = [...products];

    if (filters.materials.length > 0) {
      result = result.filter((p) => filters.materials.includes(p.material));
    }

    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
    );

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [filters, sortBy]);

  const toggleMaterial = (material) => {
    setFilters((prev) => ({
      ...prev,
      materials: prev.materials.includes(material)
        ? prev.materials.filter((m) => m !== material)
        : [...prev.materials, material],
    }));
  };

  const clearFilters = () => {
    setFilters({materials: [], priceRange: [0, 400]});
  };

  const activeFilterCount =
    filters.materials.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 400 ? 1 : 0);

  return (
    <>
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda"
          alt="Curtains Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl">
              <Badge className="mb-4 bg-white/20 text-white border-0 hover:bg-white/30">
                Custom Made
              </Badge>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4">
                Curtains Collection
              </h1>
              <p className="text-lg text-white/90 mb-6">
                Handcrafted from premium fabrics. Designed for your unique
                windows. Free swatches available to see colors in your home.
              </p>
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="bg-white text-foreground hover:bg-white/90 border-0"
                  onClick={() => {
                    const el = document.getElementById('products');
                    el?.scrollIntoView({behavior: 'smooth'});
                  }}
                >
                  Shop Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate('/products/prod-2/swatches')}
                >
                  <SwatchBookIcon className="h-4 w-4 mr-2" />
                  Order Swatches
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 mx-auto mb-4 bg-accent flex items-center justify-center">
                <SwatchBookIcon className="h-6 w-6 text-[hsl(220_25%_35%)]" />
              </div>
              <h3 className="font-semibold mb-2">Free Fabric Swatches</h3>
              <p className="text-sm text-muted-foreground">
                See colors and textures in your home before ordering. Free
                shipping on swatches.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 bg-accent flex items-center justify-center">
                <StarIcon className="h-6 w-6 text-[hsl(220_25%_35%)]" />
              </div>
              <h3 className="font-semibold mb-2">Custom Made to Order</h3>
              <p className="text-sm text-muted-foreground">
                Every curtain is handcrafted to your exact measurements. Perfect
                fit guaranteed.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 bg-accent flex items-center justify-center">
                <ShoppingBagIcon className="h-6 w-6 text-[hsl(220_25%_35%)]" />
              </div>
              <h3 className="font-semibold mb-2">14-Day Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Quick turnaround without compromising quality. Free shipping on
                orders over $200.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <h2 className="font-serif text-3xl font-semibold mb-2">
                Shop Curtains
              </h2>
              <p className="text-muted-foreground">
                {filteredProducts.length} products available
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowMobileFilters(true)}
              >
                <SlidersHorizontalIcon className="h-4 w-4 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-8">
            <aside className="hidden lg:block w-60 shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">Filters</h3>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="mb-8">
                  <h4 className="font-medium mb-4">Material</h4>
                  <div className="space-y-3">
                    {materialOptions.map((material) => (
                      <label
                        key={material}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <Checkbox
                          checked={filters.materials.includes(material)}
                          onCheckedChange={() => toggleMaterial(material)}
                        />
                        <span className="text-sm text-muted-foreground">
                          {material}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Price Range</h4>
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: value,
                      }))
                    }
                    max={400}
                    step={10}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {filters.materials.map((material) => (
                    <Badge
                      key={material}
                      variant="secondary"
                      className="gap-1 cursor-pointer"
                      onClick={() => toggleMaterial(material)}
                    >
                      {material}
                      <XIcon className="h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              )}

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">
                    No products match your filters
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={setQuickViewProduct}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6">
                Find Your Perfect Fabric
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                From breathable linen to luxurious velvet, our curated
                collection offers something for every style and space. Each
                fabric is carefully selected for quality, durability, and
                beautiful drape.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Linen - Natural & breathable',
                  'Cotton - Soft & versatile',
                  'Velvet - Rich & luxurious',
                  'Silk - Elegant & lustrous',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-[hsl(220_25%_35%)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                onClick={() => navigate('/products/prod-2/swatches')}
              >
                Order Free Swatches
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda"
                alt="Fabric detail"
                className="w-full aspect-[3/4] object-cover"
              />
              <Image
                src="https://miaoda.feishu.cn/aily/api/v1/files/static/190087f6844e4a6d9e9eecd6e38fdad3_ve_miaoda"
                alt="Fabric detail"
                className="w-full aspect-[3/4] object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Shop the Look
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Watch styling tips, installation guides, and room transformations.
              Click any video to shop the featured products.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {shoppableVideos.map((video) => (
              <div
                key={video.id}
                className="group cursor-pointer"
                onClick={() => navigate(`/products/${video.productId}`)}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-3">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-white flex items-center justify-center">
                      <PlayIcon className="h-6 w-6 text-foreground ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1">
                    {video.duration}
                  </div>
                  <div className="absolute top-3 left-3 bg-[hsl(220_25%_25%)] text-white text-xs px-2 py-1 flex items-center gap-1">
                    <ShoppingBagIcon className="h-3 w-3" />
                    Shop
                  </div>
                </div>
                <h3 className="font-medium text-sm mb-1 group-hover:text-[hsl(220_25%_25%)] transition-colors">
                  {video.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {video.productName}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Got questions? We've got answers. If you don't find what you're
              looking for, feel free to contact our support team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="border border-border bg-card">
                <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent transition-colors">
                  <span className="font-medium">
                    How do I choose the right fabric?
                  </span>
                  <ChevronDownIcon className="w-5 h-5 text-muted-foreground" />
                </button>
                <div className="px-6 pb-4 text-muted-foreground text-sm">
                  Consider the room's function: linen and cotton are great for
                  living spaces due to their breathability, while velvet adds
                  luxury to bedrooms. For high sun exposure, choose
                  fade-resistant fabrics. Order free swatches first.
                </div>
              </div>
              <div className="border border-border bg-card">
                <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent transition-colors">
                  <span className="font-medium">What sizes do you offer?</span>
                  <ChevronDownIcon className="w-5 h-5 text-muted-foreground" />
                </button>
                <div className="px-6 pb-4 text-muted-foreground text-sm">
                  All our curtains are custom-made to your exact measurements.
                  We can accommodate widths from 20" to 300" and lengths from
                  24" to 144".
                </div>
              </div>
              <div className="border border-border bg-card">
                <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent transition-colors">
                  <span className="font-medium">
                    How do I care for my curtains?
                  </span>
                  <ChevronDownIcon className="w-5 h-5 text-muted-foreground" />
                </button>
                <div className="px-6 pb-4 text-muted-foreground text-sm">
                  Most fabrics can be dry cleaned. Linen and cotton may be
                  machine washed on gentle cycle in cold water. Always check the
                  care label.
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border border-border bg-card">
                <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent transition-colors">
                  <span className="font-medium">
                    What's your delivery timeline?
                  </span>
                  <ChevronDownIcon className="w-5 h-5 text-muted-foreground" />
                </button>
                <div className="px-6 pb-4 text-muted-foreground text-sm">
                  Each order is handcrafted and takes 7-10 business days to
                  produce. Shipping takes an additional 3-5 business days.
                </div>
              </div>
              <div className="border border-border bg-card">
                <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent transition-colors">
                  <span className="font-medium">Can I return or exchange?</span>
                  <ChevronDownIcon className="w-5 h-5 text-muted-foreground" />
                </button>
                <div className="px-6 pb-4 text-muted-foreground text-sm">
                  Since all items are custom-made, we cannot accept returns.
                  However, if there's a manufacturing defect, contact us within
                  30 days.
                </div>
              </div>
              <div className="border border-border bg-card">
                <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent transition-colors">
                  <span className="font-medium">
                    Do you offer installation?
                  </span>
                  <ChevronDownIcon className="w-5 h-5 text-muted-foreground" />
                </button>
                <div className="px-6 pb-4 text-muted-foreground text-sm">
                  We provide detailed DIY installation guides and video
                  tutorials. Installation is straightforward with basic tools.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[hsl(220_25%_25%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-4">
            Not Sure Which Fabric?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Order free fabric swatches to see colors and textures in your own
            home. No commitment required.
          </p>
          <Button
            size="lg"
            className="bg-white text-[hsl(220_25%_25%)] hover:bg-white/90 border-0"
            onClick={() => navigate('/products/prod-2/swatches')}
          >
            <SwatchBookIcon className="h-5 w-5 mr-2" />
            Order Free Swatches
          </Button>
        </div>
      </section>

      <Dialog open={showMobileFilters} onOpenChange={setShowMobileFilters}>
        <DialogContent className="sm:max-w-[400px] p-0 gap-0">
          <DialogHeader className="p-6 border-b border-border">
            <DialogTitle className="flex items-center justify-between">
              Filters
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground"
                >
                  Clear all
                </button>
              )}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[calc(100vh-200px)] p-6">
            <div className="mb-8">
              <h4 className="font-medium mb-4">Material</h4>
              <div className="space-y-3">
                {materialOptions.map((material) => (
                  <label
                    key={material}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <Checkbox
                      checked={filters.materials.includes(material)}
                      onCheckedChange={() => toggleMaterial(material)}
                    />
                    <span className="text-sm text-muted-foreground">
                      {material}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Price Range</h4>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: value,
                  }))
                }
                max={400}
                step={10}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-border">
            <Button
              className="w-full bg-[hsl(220_25%_25%)]"
              onClick={() => setShowMobileFilters(false)}
            >
              Show {filteredProducts.length} Products
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!quickViewProduct}
        onOpenChange={() => setQuickViewProduct(null)}
      >
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden gap-0">
          {quickViewProduct && (
            <div className="grid md:grid-cols-2">
              <div className="aspect-square bg-muted">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col">
                <DialogHeader className="mb-4">
                  <DialogTitle className="font-serif text-2xl">
                    {quickViewProduct.name}
                  </DialogTitle>
                </DialogHeader>

                <div className="flex items-center gap-1 mb-4">
                  <StarIcon className="h-4 w-4 fill-[hsl(220_25%_35%)] text-[hsl(220_25%_35%)]" />
                  <span className="font-medium">{quickViewProduct.rating}</span>
                  <span className="text-muted-foreground">
                    ({quickViewProduct.reviewCount} reviews)
                  </span>
                </div>

                <p className="text-muted-foreground mb-4">
                  Premium {quickViewProduct.material.toLowerCase()} curtains
                  with elegant drape and lasting quality. Available in{' '}
                  {quickViewProduct.colors.length} colors.
                </p>

                <div className="mb-6">
                  <p className="text-sm font-medium mb-2">Available Colors</p>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.colors.slice(0, 8).map((color) => (
                      <div
                        key={color.name}
                        className="w-8 h-8 border border-border"
                        style={{backgroundColor: color.hex}}
                        title={color.name}
                      />
                    ))}
                    {quickViewProduct.colors.length > 8 && (
                      <div className="w-8 h-8 border border-border flex items-center justify-center text-xs text-muted-foreground">
                        +{quickViewProduct.colors.length - 8}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-auto space-y-3">
                  <div className="text-3xl font-serif font-semibold">
                    From ${quickViewProduct.price}
                  </div>
                  <Button
                    className="w-full bg-[hsl(220_25%_25%)]"
                    onClick={() => {
                      if (!quickViewProduct) return;
                      addToCart({
                        id: `${quickViewProduct.id}-${Date.now()}`,
                        productId: quickViewProduct.id,
                        productName: quickViewProduct.name,
                        fabric: quickViewProduct.material,
                        dimensions: {width: 54, height: 84, unit: 'inches'},
                        lining: 'standard',
                        mounting: 'grommet',
                        quantity: 1,
                        unitPrice: quickViewProduct.price,
                        image: quickViewProduct.image,
                      });
                      toast.success(`${quickViewProduct.name} added to cart`);
                      setQuickViewProduct(null);
                    }}
                  >
                    <ShoppingBagIcon className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(`/products/${quickViewProduct.id}`)}
                  >
                    View Full Details
                  </Button>
                  <button
                    onClick={() => navigate('/products/prod-2/swatches')}
                    className="w-full text-center text-sm text-muted-foreground hover:text-[hsl(220_25%_25%)] flex items-center justify-center gap-2 py-2"
                  >
                    <SwatchBookIcon className="h-4 w-4" />
                    Order Free Swatch
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export function meta() {
  return [{title: 'Shop Curtains | LuxDrape'}];
}

export default ShopPage;
