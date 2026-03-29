import {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router';
import {
  ArrowRightIcon,
  StarIcon,
  TruckIcon,
  RulerIcon,
  ShieldCheckIcon,
  AwardIcon,
  PlayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PaletteIcon,
  ClipboardListIcon,
  PackageCheckIcon,
  SwatchBookIcon,
  UsersIcon,
  BadgePercentIcon,
  ShoppingBagIcon,
  QuoteIcon,
  ArrowUpRightIcon,
} from 'lucide-react';
import {Button} from '~/components/ui/button';
import {Badge} from '~/components/ui/badge';
import homeData from '~/data/_index.json';

const iconMap = {
  Award: AwardIcon,
  Truck: TruckIcon,
  ShieldCheck: ShieldCheckIcon,
  Ruler: RulerIcon,
  Palette: PaletteIcon,
  ClipboardList: ClipboardListIcon,
  PackageCheck: PackageCheckIcon,
  BadgePercent: BadgePercentIcon,
  SwatchBook: SwatchBookIcon,
  Users: UsersIcon,
};

function HeroSection() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const slide = homeData.hero.slides[current];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % homeData.hero.slides.length);
    }, homeData.hero.autoPlayInterval || 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[78vh] min-h-[600px] max-h-[900px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
      </div>

      <div className="relative h-full w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] mb-6">
            {slide.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-lg">
            {slide.subtitle}
          </p>
          <Button
            className="bg-gray-600 text-white hover:bg-gray-700 px-10 h-14 text-base font-medium tracking-wide"
            onClick={() => navigate(slide.link)}
          >
            {slide.cta}
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {homeData.hero.slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-[2px] transition-all duration-500 ${i === current ? 'w-8 bg-white' : 'w-4 bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
}

function TrustSection() {
  const IconComponent = (iconName) => iconMap[iconName] || AwardIcon;
  return (
    <section className="py-12 md:py-16 bg-white border-b border-border">
      <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {homeData.trust.factors.map((factor) => {
            const Icon = IconComponent(factor.icon);
            return (
              <div key={factor.title} className="text-center">
                <Icon
                  className="h-9 w-9 mx-auto mb-3 text-[hsl(220_15%_35%)]"
                  strokeWidth={1.5}
                />
                <h3 className="font-medium text-base mb-1">{factor.title}</h3>
                <p className="text-sm text-muted-foreground">{factor.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PopularStylesSection() {
  const navigate = useNavigate();
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-4">
            {homeData.popularStyles.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {homeData.popularStyles.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {homeData.popularStyles.items.map((style) => (
            <div
              key={style.id}
              className="group cursor-pointer"
              onClick={() => navigate(style.href)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-6">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-foreground backdrop-blur-sm text-xs">
                    {style.feature}
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white text-lg font-medium">
                    {style.price}
                  </span>
                </div>

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button className="bg-white text-foreground hover:bg-white/90">
                    Shop {style.name}
                    <ArrowUpRightIcon className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {style.subtitle}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-medium mb-3">
                  {style.name}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {style.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ForEveryNeedSection() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -320 : 320,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-3">
              {homeData.forEveryNeed.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {homeData.forEveryNeed.subtitle}
            </p>
          </div>
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 border border-border flex items-center justify-center hover:bg-[hsl(220_10%_97%)] transition-colors shadow-sm"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 border border-border flex items-center justify-center hover:bg-[hsl(220_10%_97%)] transition-colors shadow-sm"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-4 gap-5 md:gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0"
          style={{scrollbarWidth: 'none'}}
        >
          {homeData.forEveryNeed.items.map((need) => (
            <div
              key={need.id}
              className="group cursor-pointer flex-shrink-0 w-[260px] md:w-auto"
              onClick={() => navigate(need.href)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4">
                <img
                  src={need.image}
                  alt={need.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-foreground backdrop-blur-sm text-xs">
                    {need.feature}
                  </Badge>
                </div>

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button className="bg-white text-foreground hover:bg-white/90">
                    Learn More
                    <ArrowUpRightIcon className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {need.subtitle}
                </p>
                <h3 className="font-serif text-xl md:text-2xl font-medium mb-2">
                  {need.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {need.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomizationStepsSection() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -320 : 320,
        behavior: 'smooth',
      });
    }
  };

  const IconComponent = (iconName) => iconMap[iconName] || PaletteIcon;

  return (
    <section className="py-14 md:py-18 bg-[hsl(220_15%_18%)] text-white">
      <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-16">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-3">
              {homeData.customizationSteps.title}
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-xl">
              {homeData.customizationSteps.subtitle}
            </p>
          </div>

          <div className="hidden md:flex gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-3 gap-5 md:gap-10 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0"
          style={{scrollbarWidth: 'none'}}
        >
          {homeData.customizationSteps.steps.map((step) => {
            return (
              <div
                key={step.step}
                className="flex-shrink-0 w-[280px] md:w-auto bg-white/5 md:bg-transparent p-6 md:p-0 text-left md:text-center"
              >
                <div className="flex md:flex-col items-start md:items-center gap-4">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white text-[hsl(220_15%_18%)] font-semibold flex items-center justify-center text-2xl md:text-4xl font-bold">
                      {step.step}
                    </div>
                  </div>

                  <div className="flex-1 md:mt-6">
                    <h3 className="font-medium text-lg md:text-xl mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex md:hidden justify-center gap-3 mt-6">
          {homeData.customizationSteps.steps.map((step) => (
            <div key={step.step} className="w-3 h-3 rounded-full bg-white/30" />
          ))}
        </div>

        <div className="text-center mt-10 md:mt-14">
          <Button
            className="bg-gray-600 text-white hover:bg-gray-700 px-8 md:px-10 h-12 md:h-14 text-base font-medium w-full md:w-auto"
            onClick={() => navigate(homeData.customizationSteps.ctaLink)}
          >
            {homeData.customizationSteps.cta}
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function ShopByRoomSection() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -380 : 380,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 md:py-20 bg-[hsl(220_10%_97%)]">
      <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-3">
              {homeData.shopByRoom.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {homeData.shopByRoom.subtitle}
            </p>
          </div>
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 bg-white border border-border flex items-center justify-center hover:bg-[hsl(220_10%_95%)] transition-colors shadow-sm"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 bg-white border border-border flex items-center justify-center hover:bg-[hsl(220_10%_95%)] transition-colors shadow-sm"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0"
          style={{scrollbarWidth: 'none'}}
        >
          {homeData.shopByRoom.rooms.map((room) => (
            <div
              key={room.id}
              className="group cursor-pointer flex-shrink-0 w-[300px] md:w-[340px]"
              onClick={() => navigate(room.href)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-medium text-xl mb-1">
                    {room.name}
                  </h3>
                  <p className="text-white/70 text-sm">{room.count}</p>
                </div>

                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRightIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SamplesSection() {
  const navigate = useNavigate();
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <Badge className="mb-4 bg-[hsl(220_15%_25%)] text-white hover:bg-[hsl(220_15%_25%)] text-xs">
              {homeData.samples.badge}
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-3">
              {homeData.samples.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {homeData.samples.subtitle}
            </p>
          </div>
          <Button
            variant="outline"
            className="hidden md:flex h-12 px-6"
            onClick={() => navigate(homeData.samples.browseAllLink)}
          >
            {homeData.samples.browseAllLabel}
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {homeData.samples.fabrics.map((fabric) => (
            <div
              key={fabric.id}
              className="group cursor-pointer"
              onClick={() => navigate(fabric.href)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4">
                <img
                  src={fabric.image}
                  alt={fabric.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-foreground px-5 py-2.5 text-sm font-medium">
                    Order Sample
                  </span>
                </div>
              </div>
              <h3 className="font-medium text-base mb-1">{fabric.name}</h3>
              <p className="text-sm text-muted-foreground">
                {fabric.colors} Colors
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoShoppableSection() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -310 : 310,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 md:py-20 bg-[hsl(220_10%_97%)]">
      <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-3">
              {homeData.videoShoppable.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {homeData.videoShoppable.subtitle}
            </p>
          </div>
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 bg-white border border-border flex items-center justify-center hover:bg-white/80 transition-colors shadow-sm"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 bg-white border border-border flex items-center justify-center hover:bg-white/80 transition-colors shadow-sm"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0"
          style={{scrollbarWidth: 'none'}}
        >
          {homeData.videoShoppable.videos.map((video) => (
            <div
              key={video.id}
              className="group cursor-pointer flex-shrink-0 w-[200px] md:flex-1 md:flex-shrink-0 md:min-w-0 md:w-auto md:max-w-[calc(25%-15px)]"
              onClick={() =>
                navigate(
                  `/products/${video.product.toLowerCase().replace(/\s+/g, '-')}`,
                )
              }
            >
              <div className="relative aspect-[9/16] overflow-hidden bg-muted mb-3 md:mb-4">
                <img
                  src={video.image}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PlayIcon
                      className="h-6 w-6 md:h-7 md:w-7 text-foreground ml-0.5"
                      fill="currentColor"
                    />
                  </div>
                </div>
                <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                  <p className="text-white text-sm md:text-base font-medium truncate">
                    {video.title}
                  </p>
                  <p className="text-white/70 text-xs md:text-sm">
                    {video.views} views
                  </p>
                </div>
                <div className="absolute top-3 md:top-4 right-3 md:right-4">
                  <ShoppingBagIcon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
              </div>
              <div className="px-1">
                <p className="text-sm md:text-base font-medium truncate">
                  {video.author}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {video.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -400 : 400,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <QuoteIcon
              className="h-10 w-10 mb-4 text-[hsl(220_15%_35%)]"
              strokeWidth={1}
            />
            <h2 className="font-serif text-4xl md:text-5xl font-medium">
              {homeData.reviews.title}
            </h2>
          </div>
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 border border-border flex items-center justify-center hover:bg-[hsl(220_10%_97%)] transition-colors"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 border border-border flex items-center justify-center hover:bg-[hsl(220_10%_97%)] transition-colors"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0"
          style={{scrollbarWidth: 'none'}}
        >
          {homeData.reviews.items.map((review) => (
            <div
              key={review.id}
              className="flex-shrink-0 w-[360px] bg-[hsl(220_10%_97%)] p-8"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-base leading-relaxed mb-6 text-foreground/90">
                "{review.text}"
              </p>
              <div className="pt-4 border-t border-border">
                <p className="font-medium text-base">{review.name}</p>
                <p className="text-sm text-muted-foreground">
                  {review.location} • {review.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TradeProgramSection() {
  const navigate = useNavigate();
  const IconComponent = (iconName) => iconMap[iconName] || BadgePercentIcon;

  return (
    <section className="py-16 md:py-20 bg-[hsl(220_10%_97%)]">
      <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative aspect-[3/4] md:aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={homeData.tradeProgram.image}
              alt="Trade Program"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <Badge className="mb-4 bg-[hsl(220_15%_25%)] text-white hover:bg-[hsl(220_15%_25%)] text-xs">
              {homeData.tradeProgram.badge}
            </Badge>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-4">
              {homeData.tradeProgram.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {homeData.tradeProgram.description}
            </p>
            <ul className="space-y-3 mb-8">
              {homeData.tradeProgram.benefits.map((benefit, index) => {
                const Icon = IconComponent(benefit.icon);
                return (
                  <li key={index} className="flex items-center gap-3 text-base">
                    <Icon
                      className="h-5 w-5 text-[hsl(220_15%_35%)]"
                      strokeWidth={1.5}
                    />
                    <span>{benefit.text}</span>
                  </li>
                );
              })}
            </ul>
            <div className="flex gap-4">
              <Button
                className="bg-[hsl(220_15%_25%)] hover:bg-[hsl(220_15%_20%)] h-12 px-8"
                onClick={() => navigate(homeData.tradeProgram.link)}
              >
                {homeData.tradeProgram.applyLabel}
              </Button>
              <Button
                variant="outline"
                className="h-12 px-8"
                onClick={() => navigate(homeData.tradeProgram.link)}
              >
                {homeData.tradeProgram.learnMoreLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CraftedSection() {
  const navigate = useNavigate();
  return (
    <section className="relative py-20 md:py-28 bg-[hsl(220_15%_18%)] text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={homeData.crafted.backgroundImage}
          alt="Craftsmanship"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-5">
          {homeData.crafted.title}
        </h2>
        <p className="text-white/70 mb-10 text-lg md:text-xl leading-relaxed">
          {homeData.crafted.description}
        </p>
        <Button
          variant="outline"
          className="border-white/40 text-white hover:bg-white/10 h-12 px-8"
          onClick={() => navigate(homeData.crafted.ctaLink)}
        >
          {homeData.crafted.cta}
        </Button>
      </div>
    </section>
  );
}

export function meta() {
  return [{title: 'LuxDrape | Home'}];
}

export default function Homepage() {
  return (
    <div className="w-full">
      <HeroSection />
      <TrustSection />
      <PopularStylesSection />
      <CustomizationStepsSection />
      <ForEveryNeedSection />
      <ShopByRoomSection />
      <SamplesSection />
      <VideoShoppableSection />
      <ReviewsSection />
      <TradeProgramSection />
      <CraftedSection />
    </div>
  );
}
