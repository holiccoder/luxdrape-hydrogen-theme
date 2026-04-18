import {useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  ShoppingBagIcon,
  StarIcon,
  SwatchBookIcon,
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
import {ScrollArea} from '~/components/ui/scroll-area';
import {Image} from '~/components/ui/image';
import {toast} from 'sonner';
import {useCart} from '~/contexts/cart-context';

const sampleProducts = [
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

const materialOptions = [
  'Linen',
  'Cotton',
  'Velvet',
  'Silk',
  'Wool Blend',
  'Sheer Linen',
];

function getProductImage(product) {
  return (
    product?.featuredImage?.url ||
    product?.image ||
    'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda'
  );
}

function getProductPrice(product) {
  return (
    product?.priceRange?.minVariantPrice?.amount ||
    product?.price ||
    0
  );
}

/**
 * Converts Shopify rich text JSON to HTML string.
 */
function richTextToHtml(richText) {
  if (!richText) return '';
  try {
    const parsed = typeof richText === 'string' ? JSON.parse(richText) : richText;
    return renderRichTextNode(parsed);
  } catch {
    // If it's not valid JSON, return as-is (might already be HTML or plain text)
    return richText;
  }
}

function renderRichTextNode(node) {
  if (!node) return '';
  if (typeof node === 'string') return node;

  if (node.type === 'text') {
    let text = node.value || '';
    if (node.bold) text = `<strong>${text}</strong>`;
    if (node.italic) text = `<em>${text}</em>`;
    return text;
  }

  const children = (node.children || []).map(renderRichTextNode).join('');

  switch (node.type) {
    case 'root':
      return children;
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'heading':
      const tag = `h${node.level || 2}`;
      return `<${tag}>${children}</${tag}>`;
    case 'list':
      const listTag = node.listType === 'ordered' ? 'ol' : 'ul';
      return `<${listTag}>${children}</${listTag}>`;
    case 'list-item':
      return `<li>${children}</li>`;
    case 'link':
      return `<a href="${node.url || '#'}" target="${node.target || '_self'}">${children}</a>`;
    default:
      return children;
  }
}

function ProductCard({product}) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const productImage = getProductImage(product);
  const productPrice = getProductPrice(product);
  const productColors = product.colors || [];
  const [selectedColor, setSelectedColor] = useState(productColors[0] || null);

  const visibleColors = productColors.slice(0, 6);
  const hasMoreColors = productColors.length > 6;

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4">
        <Image
          src={isHovered && product.hoverImage ? product.hoverImage : productImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {product.badge ? (
          <div className="absolute top-3 left-3 bg-[hsl(220_25%_25%)] text-white text-xs font-medium px-3 py-1.5">
            {product.badge}
          </div>
        ) : null}
      </div>

      <div>
        <div className="flex items-center gap-1.5 mb-2">
          {visibleColors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              className={`w-5 h-5 border transition-all ${
                selectedColor?.name === color.name
                  ? 'border-foreground ring-1 ring-foreground'
                  : 'border-border hover:border-foreground/50'
              }`}
              style={{backgroundColor: color.hex}}
              title={color.name}
            />
          ))}
          {hasMoreColors ? (
            <span className="text-xs text-muted-foreground ml-1">
              +{product.colors.length - 6}
            </span>
          ) : null}
        </div>

        <button
          className="font-medium text-foreground mb-1 hover:text-[hsl(220_25%_25%)] transition-colors text-left"
          onClick={() => navigate(`/products/${product.handle || product.id}`)}
        >
          {product.name}
        </button>
        <p className="text-sm text-muted-foreground mb-2">
          {product.material || 'Custom Collection'}
        </p>
        {product.rating ? (
          <div className="flex items-center gap-1 mb-3">
            <StarIcon className="h-3.5 w-3.5 fill-[hsl(220_25%_35%)] text-[hsl(220_25%_35%)]" />
            <span className="text-sm">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
          </div>
        ) : null}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">From ${productPrice}</span>
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
}

export default function DefaultCollectionPageTemplate({collection, metaobjects, collectionMetafields}) {
  const navigate = useNavigate();
  const {addToCart} = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({materials: [], priceRange: [0, 400]});
  const desktopHeroImage =
    collection?.image?.url ||
    'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda';
  const mobileHeroImage = collection?.mobileBannerUrl?.value || desktopHeroImage;
  const heroImageAlt = collection?.image?.altText || collection?.title || 'Curtains Collection';

  const products = useMemo(() => {
    const collectionProducts =
      collection?.products?.nodes?.map((product) => ({
        id: product.id,
        handle: product.handle,
        name: product.title,
        featuredImage: product.featuredImage,
        priceRange: product.priceRange,
      })) || [];

    return collectionProducts.length > 0 ? collectionProducts : sampleProducts;
  }, [collection]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.materials.length > 0) {
      result = result.filter((p) => filters.materials.includes(p.material));
    }

    result = result.filter(
      (p) =>
        Number(getProductPrice(p)) >= filters.priceRange[0] &&
        Number(getProductPrice(p)) <= filters.priceRange[1],
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
      default:
        break;
    }

    return result;
  }, [filters, products, sortBy]);

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
          src={mobileHeroImage}
          alt={heroImageAlt}
          className="w-full h-full object-cover md:hidden"
        />
        <Image
          src={desktopHeroImage}
          alt={heroImageAlt}
          className="hidden w-full h-full object-cover md:block"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl">
              <Badge className="mb-4 bg-white/20 text-white border-0 hover:bg-white/30">
                Custom Made
              </Badge>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4">
                {collection?.title || 'Curtains Collection'}
              </h1>
              <p className="text-lg text-white/90 mb-6">
                {collection?.description ||
                  'Handcrafted from premium fabrics. Designed for your unique windows. Free swatches available to see colors in your home.'}
              </p>
              <div className="flex gap-3">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate('/collections/fabric-booklets')}
                >
                  <SwatchBookIcon className="h-4 w-4 mr-2" />
                  Order Swatches
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-serif text-3xl font-semibold mb-2">Shop Curtains</h2>
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
                {activeFilterCount > 0 ? (
                  <Badge variant="secondary" className="ml-2">
                    {activeFilterCount}
                  </Badge>
                ) : null}
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[170px]">
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
                  {activeFilterCount > 0 ? (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </button>
                  ) : null}
                </div>
                <div className="mb-8">
                  <h4 className="font-medium mb-4">Material</h4>
                  <div className="space-y-3">
                    {materialOptions.map((material) => (
                      <label key={material} className="flex items-center gap-3 cursor-pointer">
                        <Checkbox
                          checked={filters.materials.includes(material)}
                          onCheckedChange={() => toggleMaterial(material)}
                        />
                        <span className="text-sm text-muted-foreground">{material}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Price Range</h4>
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) =>
                      setFilters((prev) => ({...prev, priceRange: value}))
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
              {activeFilterCount > 0 ? (
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
              ) : null}

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">No products match your filters</p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {collectionMetafields && collectionMetafields.length > 0 && (() => {
        const samplesDisplayMf = collectionMetafields.find(
          (mf) => mf?.key === 'hydrogen_collections_samples_display',
        );
        const samplesMetaobject = samplesDisplayMf?.reference;

        if (!samplesMetaobject) return null;

        const fields = samplesMetaobject.fields || [];
        const samplesTextRaw = fields.find((f) => f.key === 'samples_text')?.value || '';
        const samplesText = richTextToHtml(samplesTextRaw);
        const imageField = fields.find((f) => f.key === 'image');
        const imageUrl = imageField?.reference?.image?.url || '';
        const imageAlt = imageField?.reference?.image?.altText || collection?.title || '';
        const buttonUrl = fields.find((f) => f.key === 'button_url')?.value || '';

        return (
          <section className="pt-4 pb-16 md:pt-6 md:pb-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    className="w-full aspect-[4/3] object-cover rounded-lg shadow-sm"
                  />
                ) : null}
                <div>
                  {samplesText ? (
                    <div
                      className="text-muted-foreground leading-relaxed prose max-w-none [&>h1:first-child]:text-4xl [&>h1:first-child]:font-semibold [&>h1:first-child]:text-foreground [&>h2:first-child]:text-4xl [&>h2:first-child]:font-semibold [&>h2:first-child]:text-foreground"
                      dangerouslySetInnerHTML={{__html: samplesText}}
                    />
                  ) : null}
                  {buttonUrl ? (
                    <Button
                      className="mt-6"
                      onClick={() => {
                        if (buttonUrl.startsWith('http')) {
                          window.location.href = buttonUrl;
                          return;
                        }
                        navigate(buttonUrl);
                      }}
                    >
                      Order Samples
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        );
      })()}


      {metaobjects && metaobjects.length > 0 && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {metaobjects.map((metaobject, index) => {
              const fields = metaobject.fields || [];
              const titleField = fields.find(f => f.key === 'title')?.value || '';
              const descriptionField = fields.find(f => f.key === 'description')?.value || '';
              const imageField = fields.find(f => f.key === 'image');
              const imageUrl = imageField?.reference?.image?.url || '';
              const imageAlt = imageField?.reference?.image?.altText || '';

              return (
                <div key={metaobject.handle || index} className="mb-16 last:mb-0">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    {imageUrl && (
                      <div className="order-2 md:order-1">
                        <Image
                          src={imageUrl}
                          alt={imageAlt || titleField}
                          className="w-full aspect-[4/3] object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className={imageUrl ? 'order-1 md:order-2' : ''}>
                      {titleField && (
                        <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                          {titleField}
                        </h2>
                      )}
                      {descriptionField && (
                        <div
                          className="text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{__html: descriptionField}}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {collectionMetafields && collectionMetafields.length > 0 && (() => {
        const imageAndContentMf = collectionMetafields.find((mf) => mf?.key === 'image_and_content_section');
        const metaobjectNodes = imageAndContentMf?.references?.nodes || [];

        if (metaobjectNodes.length === 0) return null;

        return (
          <section className="py-16 md:py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {metaobjectNodes.map((metaobj, index) => {
                const fields = metaobj.fields || [];
                const title = fields.find(f => f.key === 'title')?.value || '';
                const descriptionRaw = fields.find(f => f.key === 'description')?.value || '';
                const description = richTextToHtml(descriptionRaw);
                const imageField = fields.find(f => f.key === 'image');
                const imageUrl = imageField?.reference?.image?.url || '';
                const imageAlt = imageField?.reference?.image?.altText || '';
                const isImageRight = index % 2 === 1;

                return (
                  <div key={metaobj.handle || index} className="mb-16 last:mb-0">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      {imageUrl && (
                        <div className={isImageRight ? 'order-1 md:order-2' : 'order-1'}>
                          <Image
                            src={imageUrl}
                            alt={imageAlt || title}
                            className="w-full aspect-[4/3] object-cover rounded-lg shadow-sm"
                          />
                        </div>
                      )}
                      <div className={imageUrl ? (isImageRight ? 'order-2 md:order-1' : 'order-2') : ''}>
                        {title && (
                          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
                            {title}
                          </h2>
                        )}
                        {description && (
                          <div
                            className="text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{__html: description}}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })()}

      {collectionMetafields && collectionMetafields.length > 0 && (() => {
        const faqMf = collectionMetafields.find((mf) => mf?.key === 'hydrogen_collections_faq');
        const faqNodes = faqMf?.references?.nodes || [];

        if (faqNodes.length === 0) return null;

        return (
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-10 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqNodes.map((faqObj, index) => {
                  const fields = faqObj.fields || [];
                  const question = fields.find(f => f.key === 'question')?.value || '';
                  const answerRaw = fields.find(f => f.key === 'answer')?.value || '';
                  const answer = richTextToHtml(answerRaw);

                  return (
                    <details
                      key={faqObj.handle || index}
                      className="group border border-border/50 rounded-lg"
                    >
                      <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-medium text-foreground hover:text-[hsl(220_25%_25%)] transition-colors list-none">
                        {question}
                        <span className="ml-4 shrink-0 text-muted-foreground group-open:rotate-180 transition-transform">
                          ▾
                        </span>
                      </summary>
                      <div
                        className="px-6 pb-4 text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{__html: answer}}
                      />
                    </details>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })()}

      <section className="py-16 bg-[hsl(220_25%_25%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-4">
            Not Sure Which Fabric?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Order free fabric swatches to see colors and textures in your own home.
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
              {activeFilterCount > 0 ? (
                <button onClick={clearFilters} className="text-sm text-muted-foreground">
                  Clear all
                </button>
              ) : null}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[calc(100vh-200px)] p-6">
            <div className="mb-8">
              <h4 className="font-medium mb-4">Material</h4>
              <div className="space-y-3">
                {materialOptions.map((material) => (
                  <label key={material} className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={filters.materials.includes(material)}
                      onCheckedChange={() => toggleMaterial(material)}
                    />
                    <span className="text-sm text-muted-foreground">{material}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Price Range</h4>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) =>
                  setFilters((prev) => ({...prev, priceRange: value}))
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

      <Dialog open={Boolean(quickViewProduct)} onOpenChange={() => setQuickViewProduct(null)}>
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden gap-0">
          {quickViewProduct ? (
            <div className="grid md:grid-cols-2">
              <div className="aspect-square bg-muted">
                <Image
                  src={getProductImage(quickViewProduct)}
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
                {quickViewProduct.rating ? (
                  <div className="flex items-center gap-1 mb-4">
                    <StarIcon className="h-4 w-4 fill-[hsl(220_25%_35%)] text-[hsl(220_25%_35%)]" />
                    <span className="font-medium">{quickViewProduct.rating}</span>
                    <span className="text-muted-foreground">
                      ({quickViewProduct.reviewCount} reviews)
                    </span>
                  </div>
                ) : null}
                <p className="text-muted-foreground mb-4">
                  Premium{' '}
                  {(quickViewProduct.material || 'collection').toLowerCase()} products with
                  elegant styling and lasting quality.
                </p>
                {quickViewProduct.colors ? (
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
                    </div>
                  </div>
                ) : null}
                <div className="mt-auto space-y-3">
                  <div className="text-3xl font-serif font-semibold">
                    From ${getProductPrice(quickViewProduct)}
                  </div>
                  <Button
                    className="w-full bg-[hsl(220_25%_25%)]"
                    onClick={() => {
                      addToCart({
                        id: `${quickViewProduct.id}-${Date.now()}`,
                        productId: quickViewProduct.id,
                        productName: quickViewProduct.name,
                        fabric: quickViewProduct.material || 'Standard',
                        dimensions: {width: 54, height: 84, unit: 'inches'},
                        lining: 'standard',
                        mounting: 'grommet',
                        quantity: 1,
                        unitPrice: Number(getProductPrice(quickViewProduct)),
                        image: getProductImage(quickViewProduct),
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
                    onClick={() =>
                      navigate(`/products/${quickViewProduct.handle || quickViewProduct.id}`)
                    }
                  >
                    View Full Details
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
