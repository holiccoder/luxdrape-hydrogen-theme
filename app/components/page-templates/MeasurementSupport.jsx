import {
  AlertTriangleIcon,
  CheckIcon,
  DownloadIcon,
  VideoIcon,
} from 'lucide-react';
import {Button} from '~/components/ui/button';
import {Image} from '~/components/ui/image';
import measureGuideData from '~/data/measure-guide.json';
import {toast} from 'sonner';

export default function MeasurementSupportTemplate() {
  const hero = measureGuideData?.hero ?? {};
  const productTypes = measureGuideData?.productTypes ?? {};
  const products = productTypes?.products ?? [];
  const curtainsGuide = measureGuideData?.curtainsGuide ?? {};
  const shadesGuide = measureGuideData?.shadesGuide ?? {};
  const commonMistakes = measureGuideData?.commonMistakes ?? {};
  const needHelp = measureGuideData?.needHelp ?? {};

  return (
    <div className="measure-guide">
      <style>{`
        .measure-guide {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Hero Section */}
      <section className="w-full bg-[hsl(220_25%_25%)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
              {hero.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              {hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="secondary"
                className="bg-white text-[hsl(220_25%_25%)] hover:bg-white/90"
                onClick={() => toast.success('Download started')}
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                {hero.downloadButtonLabel}
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <VideoIcon className="h-4 w-4 mr-2" />
                {hero.videoButtonLabel}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Type Selection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-semibold mb-4">
            {productTypes.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {productTypes.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-border bg-card p-8 hover:border-[hsl(220_25%_35%)] transition-colors"
            >
              <div className="aspect-video bg-muted mb-6 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-3">
                {product.title}
              </h3>
              <p className="text-muted-foreground mb-6">{product.description}</p>
              <ul className="space-y-2 mb-6">
                {product.features?.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <CheckIcon className="h-4 w-4 text-[hsl(220_25%_35%)]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-[hsl(220_25%_25%)] hover:bg-[hsl(220_25%_20%)]"
                onClick={() => {
                  const el = document.getElementById(product.scrollTo);
                  el?.scrollIntoView({behavior: 'smooth'});
                }}
              >
                {product.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Curtains Guide Section */}
      <section
        id="curtains-guide"
        className="w-full bg-muted/30 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-semibold mb-4">
              {curtainsGuide.title}
            </h2>
            <p className="text-muted-foreground">{curtainsGuide.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {curtainsGuide.steps?.map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="w-10 h-10 bg-[hsl(220_25%_25%)] text-white flex items-center justify-center font-semibold shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    {step.description ? (
                      <p className="text-muted-foreground text-sm mb-3">
                        {step.description}
                      </p>
                    ) : null}
                    {step.tip ? (
                      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 text-sm text-amber-800">
                        <strong>{step.tip.label}</strong> {step.tip.text}
                      </div>
                    ) : null}
                    {step.items?.length ? (
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {step.items.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    ) : null}
                    {step.styles?.length ? (
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {step.styles.map((style) => (
                          <div key={style.name} className="bg-muted p-3">
                            <strong className="block mb-1">{style.name}</strong>
                            {style.value}
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {step.ratios?.length ? (
                      <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                        {step.ratios.map((ratio) => (
                          <li key={ratio}>• {ratio}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border p-6">
              <h3 className="font-semibold mb-4">{curtainsGuide.diagram?.title}</h3>
              <div className="aspect-[4/3] bg-muted mb-4 overflow-hidden">
                <Image
                  src={curtainsGuide.diagram?.image}
                  alt={curtainsGuide.diagram?.title || 'Curtain measurement diagram'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3 text-sm">
                {curtainsGuide.diagram?.specs?.map((spec, index) => (
                  <div
                    key={spec.label}
                    className={`flex justify-between py-2 ${index < curtainsGuide.diagram.specs.length - 1 ? 'border-b border-border' : ''}`}
                  >
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shades Guide Section */}
      <section
        id="shades-guide"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <div className="mb-12">
          <h2 className="font-serif text-3xl font-semibold mb-4">
            {shadesGuide.title}
          </h2>
          <p className="text-muted-foreground">{shadesGuide.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-card border border-border p-6 order-2 lg:order-1">
            <h3 className="font-semibold mb-4">{shadesGuide.compare?.title}</h3>
            <div className="aspect-[4/3] bg-muted mb-4 overflow-hidden">
              <Image
                src={shadesGuide.compare?.image}
                alt={shadesGuide.compare?.title || 'Shade measurement diagram'}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-muted p-4">
                <strong className="block mb-2 text-[hsl(220_25%_35%)]">
                  {shadesGuide.compare?.inside?.title}
                </strong>
                <ul className="space-y-1 text-muted-foreground">
                  {shadesGuide.compare?.inside?.items?.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-muted p-4">
                <strong className="block mb-2 text-[hsl(220_25%_35%)]">
                  {shadesGuide.compare?.outside?.title}
                </strong>
                <ul className="space-y-1 text-muted-foreground">
                  {shadesGuide.compare?.outside?.items?.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            {shadesGuide.steps?.map((step) => (
              <div key={step.number} className="flex gap-4">
                <div className="w-10 h-10 bg-[hsl(220_25%_25%)] text-white flex items-center justify-center font-semibold shrink-0">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  {step.description ? (
                    <p className="text-muted-foreground text-sm mb-3">
                      {step.description}
                    </p>
                  ) : null}
                  {step.warning ? (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 text-sm text-red-800 mb-3">
                      <strong>{step.warning.label}</strong> {step.warning.text}
                    </div>
                  ) : null}
                  {step.insideMount ? (
                    <p className="text-muted-foreground text-sm mb-3">
                      <strong>Inside Mount:</strong> {step.insideMount}
                    </p>
                  ) : null}
                  {step.outsideMount ? (
                    <p className="text-muted-foreground text-sm">
                      <strong>Outside Mount:</strong> {step.outsideMount}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes Section */}
      <section className="w-full bg-muted/30 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-semibold mb-4">
              {commonMistakes.title}
            </h2>
            <p className="text-muted-foreground">{commonMistakes.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {commonMistakes.mistakes?.map((mistake) => (
              <div key={mistake.title} className="bg-card border border-border p-6">
                <div className="w-12 h-12 bg-red-100 flex items-center justify-center mb-4">
                  <AlertTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">{mistake.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {mistake.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Need Help CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="bg-[hsl(220_25%_25%)] text-white p-8 md:p-12 text-center">
          <h2 className="font-serif text-3xl font-semibold mb-4">
            {needHelp.title}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {needHelp.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="secondary"
              className="bg-white text-[hsl(220_25%_25%)] hover:bg-white/90"
            >
              {needHelp.buttons?.schedule}
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              {needHelp.buttons?.contact}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
