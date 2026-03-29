import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
  RulerIcon,
  PaletteIcon,
  SunIcon,
  SparklesIcon,
  ArrowRightIcon,
  MessageCircleIcon,
  PhoneIcon,
  DownloadIcon,
  EyeIcon,
  StarIcon,
  BedDoubleIcon,
  UtensilsIcon,
  BathIcon,
  BriefcaseIcon,
} from 'lucide-react';
import {Button} from '~/components/ui/button';
import {Badge} from '~/components/ui/badge';
import {toast} from 'sonner';

export function meta() {
  return [{title: 'Living Room | LuxDrape'}];
}

const roomData = {
  id: 'living-room',
  name: 'Living Room',
  title: 'Living Room Window Treatments',
  heroImage:
    'https://miaoda.feishu.cn/aily/api/v1/files/static/d6e513cd18d543ba880d3432113b8457_ve_miaoda',
  description:
    'The living room is the heart of your home—a space for relaxation, entertainment, and connection. The right window treatments balance natural light, privacy, and style to create an inviting atmosphere.',
};

const recommendations = [
  {
    id: 'sheer-drapes',
    name: 'Sheer Linen Drapes',
    tagline: 'Soft Light & Airy Feel',
    description:
      'Perfect for living rooms that need gentle light diffusion while maintaining an open, spacious feel.',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda',
    price: 'From $189',
    tags: ['Light Filtering', 'Elegant', 'Layering Base'],
  },
  {
    id: 'cellular-shades',
    name: 'Cellular Shades',
    tagline: 'Energy Efficiency Meets Style',
    description:
      'Honeycomb design traps air for insulation while providing excellent light control and privacy.',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
    price: 'From $219',
    tags: ['Energy Saving', 'Cordless', 'Blackout Option'],
  },
  {
    id: 'layered-curtains',
    name: 'Layered Curtains',
    tagline: 'Maximum Versatility',
    description:
      'Combine sheer panels with blackout drapes for ultimate control—light and airy by day, cozy and private by night.',
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda',
    price: 'From $349',
    tags: ['Dual Function', 'Luxurious', 'Complete Control'],
  },
];

const collectionProducts = [
  {
    id: 1,
    name: 'Belgian Linen Curtain',
    price: 189,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda',
    tag: 'Best Seller',
    rating: 4.8,
    reviews: 324,
  },
  {
    id: 2,
    name: 'Double Cell Blackout Shade',
    price: 249,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
    tag: 'Energy Efficient',
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 3,
    name: 'Silk Sheer Panel',
    price: 159,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda',
    tag: 'Elegant',
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 4,
    name: 'Motorized Roller Shade',
    price: 399,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/d0cc4e03afad443e8155bdebc1dc3e72_ve_miaoda',
    tag: 'Smart Home',
    rating: 4.9,
    reviews: 201,
  },
  {
    id: 5,
    name: 'Velvet Blackout Curtain',
    price: 279,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda',
    tag: 'Luxury',
    rating: 4.8,
    reviews: 142,
  },
  {
    id: 6,
    name: 'Natural Woven Wood Shade',
    price: 229,
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/6310ecde128b4463aff2428e6a1327a2_ve_miaoda',
    tag: 'Organic',
    rating: 4.6,
    reviews: 78,
  },
];

const galleryImages = [
  {
    id: 1,
    src: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d6e513cd18d543ba880d3432113b8457_ve_miaoda',
    alt: 'Modern living room with floor-to-ceiling sheer curtains',
  },
  {
    id: 2,
    src: 'https://miaoda.feishu.cn/aily/api/v1/files/static/7b849f6ee3bf42e885b324dd0907336b_ve_miaoda',
    alt: 'Cozy living room with layered window treatments',
  },
  {
    id: 3,
    src: 'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda',
    alt: 'Minimalist living room with cellular shades',
  },
  {
    id: 4,
    src: 'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
    alt: 'Traditional living room with velvet curtains',
  },
];

const faqData = [
  {
    question: "What's the best window treatment for a living room with a view?",
    answer:
      'Sheer or light-filtering shades are ideal for preserving views while providing daytime privacy. Consider top-down/bottom-up cellular shades that can be lowered from the top to maintain your view while covering the lower portion for privacy.',
  },
  {
    question: 'How do I reduce glare on my TV while keeping natural light?',
    answer:
      'Roller shades with a solar screen fabric (1-5% openness) block glare while preserving your view and natural light. Alternatively, sheer curtains diffuse light beautifully.',
  },
  {
    question: 'Should curtains touch the floor in a living room?',
    answer:
      'Yes, floor-length curtains create a polished, intentional look. Let them "kiss" the floor for a modern aesthetic, or allow 1-2 inches to pool for a more traditional feel.',
  },
];

const relatedRooms = [
  {id: 'bedroom', name: 'Bedroom', icon: BedDoubleIcon, href: '/rooms/bedroom'},
  {id: 'kitchen', name: 'Kitchen', icon: UtensilsIcon, href: '/rooms/kitchen'},
  {id: 'bathroom', name: 'Bathroom', icon: BathIcon, href: '/rooms/bathroom'},
  {
    id: 'office',
    name: 'Home Office',
    icon: BriefcaseIcon,
    href: '/rooms/office',
  },
];

export function LivingRoomCollectionPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openTip, setOpenTip] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="bg-[hsl(220_10%_97%)] border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRightIcon className="h-4 w-4" />
            <Link to="/shop" className="hover:text-foreground">
              Shop
            </Link>
            <ChevronRightIcon className="h-4 w-4" />
            <span className="text-foreground">Living Room</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="relative bg-[hsl(220_15%_22%)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-white/10 text-white border-0">
                Room Collection
              </Badge>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                {roomData.title}
              </h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-xl">
                {roomData.description}
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <Button
                  className="bg-white text-[hsl(220_15%_22%)] hover:bg-white/90"
                  onClick={() => navigate('#collection')}
                >
                  Shop Collection
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => navigate('/products/prod-2/swatches')}
                >
                  Order Free Swatches
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={roomData.heroImage}
                alt={`${roomData.name} window treatments`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Why This Room */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-3">
              Why {roomData.name} Window Treatments Matter
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-border">
              <div className="w-14 h-14 mx-auto mb-4 bg-[hsl(220_10%_97%)] flex items-center justify-center">
                <SunIcon className="h-6 w-6 text-[hsl(220_15%_35%)]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Light Control</h3>
              <p className="text-sm text-muted-foreground">
                Adjust natural light for TV viewing, reading, or creating
                ambiance.
              </p>
            </div>
            <div className="text-center p-6 border border-border">
              <div className="w-14 h-14 mx-auto mb-4 bg-[hsl(220_10%_97%)] flex items-center justify-center">
                <EyeIcon className="h-6 w-6 text-[hsl(220_15%_35%)]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Privacy Without Sacrifice
              </h3>
              <p className="text-sm text-muted-foreground">
                Maintain privacy while preserving your view and natural light.
              </p>
            </div>
            <div className="text-center p-6 border border-border">
              <div className="w-14 h-14 mx-auto mb-4 bg-[hsl(220_10%_97%)] flex items-center justify-center">
                <SparklesIcon className="h-6 w-6 text-[hsl(220_15%_35%)]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Style Statement</h3>
              <p className="text-sm text-muted-foreground">
                Window treatments frame your view and anchor the room's design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section
        className="py-16 md:py-20 bg-[hsl(220_10%_97%)]"
        id="recommendations"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-3">
              Curated for Your {roomData.name}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="group bg-white border border-border overflow-hidden cursor-pointer hover:border-[hsl(220_15%_35%)] transition-colors"
                onClick={() => navigate('/products/prod-2/shades')}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={rec.image}
                    alt={rec.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-[hsl(220_15%_25%)] text-white">
                      {rec.price}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs text-[hsl(220_15%_35%)] font-medium uppercase tracking-wide mb-1">
                    {rec.tagline}
                  </p>
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    {rec.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {rec.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {rec.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-[hsl(220_10%_97%)] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Collection */}
      <section className="py-16 md:py-20 bg-white" id="collection">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-2">
                The {roomData.name} Collection
              </h2>
            </div>
            <Button variant="outline" onClick={() => navigate('/shop')}>
              View All Products
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {collectionProducts.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer"
                onClick={() => navigate('/products/prod-2/shades')}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.tag && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-[hsl(220_15%_25%)] text-white text-[10px]">
                        {product.tag}
                      </Badge>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-sm mb-1 group-hover:text-[hsl(220_15%_35%)] transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm font-semibold">${product.price}</p>
                <div className="flex items-center gap-1 mt-1">
                  <StarIcon className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-20 bg-[hsl(220_10%_97%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-3">
              {roomData.name} Inspiration Gallery
            </h2>
          </div>
          <div className="relative">
            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-muted">
              <img
                src={galleryImages[currentIndex].src}
                alt={galleryImages[currentIndex].alt}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 transition-all ${index === currentIndex ? 'bg-[hsl(220_15%_35%)] w-6' : 'bg-border'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-[hsl(220_10%_97%)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-3">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-start justify-between p-4 text-left hover:bg-[hsl(220_10%_97%)] transition-colors gap-4"
                >
                  <span className="font-medium text-sm">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUpIcon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[hsl(220_15%_22%)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-white/10">
              <div className="w-12 h-12 mx-auto mb-4 bg-white/10 flex items-center justify-center">
                <PaletteIcon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Order Free Swatches</h3>
              <p className="text-sm text-white/70 mb-4">
                See and feel our fabrics in your home before ordering.
              </p>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => navigate('/products/prod-2/swatches')}
              >
                Request Swatches
              </Button>
            </div>
            <div className="text-center p-6 border border-white/10">
              <div className="w-12 h-12 mx-auto mb-4 bg-white/10 flex items-center justify-center">
                <RulerIcon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Free Measurement Guide</h3>
              <p className="text-sm text-white/70 mb-4">
                Download our expert guide to measuring windows perfectly.
              </p>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => navigate('/guides/measure')}
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
            <div className="text-center p-6 border border-white/10">
              <div className="w-12 h-12 mx-auto mb-4 bg-white/10 flex items-center justify-center">
                <MessageCircleIcon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Design Consultation</h3>
              <p className="text-sm text-white/70 mb-4">
                Get personalized recommendations from our experts.
              </p>
              <Button
                className="bg-white text-[hsl(220_15%_22%)] hover:bg-white/90"
                onClick={() => navigate('/contact')}
              >
                Book Free Consult
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Rooms */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold mb-8 text-center">
            Explore Other Rooms
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedRooms.map((room) => (
              <div
                key={room.id}
                className="group cursor-pointer text-center p-6 border border-border hover:border-[hsl(220_15%_35%)] transition-colors"
                onClick={() => navigate(room.href)}
              >
                <room.icon className="h-8 w-8 mx-auto mb-3 text-muted-foreground group-hover:text-[hsl(220_15%_35%)] transition-colors" />
                <h3 className="font-medium group-hover:text-[hsl(220_15%_35%)] transition-colors">
                  {room.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LivingRoomCollectionPage;
