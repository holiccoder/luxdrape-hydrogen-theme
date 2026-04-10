import {useState} from 'react';
import {useNavigate} from 'react-router';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  PlayIcon,
  WrenchIcon,
  RulerIcon,
  CheckIcon,
  AlertCircleIcon,
  ArrowRightIcon,
  DownloadIcon,
} from 'lucide-react';
import {Button} from '~/components/ui/button';
import installGuideData from '~/data/install-guide.json';

function HeroSection({onStartClick, onMeasureClick}) {
  return (
    <section className="w-full bg-[hsl(220_25%_25%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-6">
            {installGuideData.hero.title}
          </h1>
          <p className="text-lg text-white/80 mb-8">
            {installGuideData.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="secondary"
              className="bg-white text-[hsl(220_25%_25%)] hover:bg-white/90"
              onClick={onStartClick}
            >
              {installGuideData.hero.startCtaLabel}
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={onMeasureClick}
            >
              <RulerIcon className="h-4 w-4 mr-2" />
              {installGuideData.hero.measureCtaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function InstallMethodsSection({selectedMethod, setSelectedMethod}) {
  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            {installGuideData.installMethodsSection.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {installGuideData.installMethodsSection.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {installGuideData.installMethods.map((method) => (
            <div
              key={method.id}
              className={`border-2 cursor-pointer transition-all ${
                selectedMethod === method.id
                  ? 'border-[hsl(220_25%_35%)] bg-[hsl(220_25%_95%)]'
                  : 'border-border hover:border-[hsl(220_25%_35%)]/50'
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={method.image}
                  alt={method.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-xl">{method.title}</h3>
                  {selectedMethod === method.id && (
                    <div className="w-6 h-6 bg-[hsl(220_25%_35%)] flex items-center justify-center">
                      <CheckIcon className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground mb-4">
                  {method.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-[hsl(220_25%_35%)] mb-2">
                      {installGuideData.installMethodsSection.prosLabel}
                    </h4>
                    <ul className="space-y-1">
                      {method.pros.map((pro, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <CheckIcon className="h-3 w-3 text-[hsl(142_30%_45%)] mt-0.5 shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      {installGuideData.installMethodsSection.consLabel}
                    </h4>
                    <ul className="space-y-1">
                      {method.cons.map((con, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <AlertCircleIcon className="h-3 w-3 text-[hsl(35_80%_55%)] mt-0.5 shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolsSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl font-semibold mb-4">
              {installGuideData.toolsSection.title}
            </h2>
            <p className="text-muted-foreground mb-8">
              {installGuideData.toolsSection.subtitle}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {installGuideData.toolsList.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-3 p-3 border border-border bg-card"
                >
                  <WrenchIcon className="h-5 w-5 text-[hsl(220_25%_35%)]" />
                  <div>
                    <span className="text-sm font-medium">{tool.name}</span>
                    {tool.essential && (
                      <span className="text-xs text-[hsl(220_25%_35%)] ml-2">
                        {installGuideData.toolsSection.requiredLabel}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[hsl(220_25%_25%)] p-8 text-white">
            <h3 className="font-semibold text-xl mb-4">
              {installGuideData.toolsSection.proTipTitle}
            </h3>
            <p className="text-white/80 mb-6">{installGuideData.proTip}</p>
            <Button
              variant="secondary"
              className="bg-white text-[hsl(220_25%_25%)] hover:bg-white/90"
            >
              <DownloadIcon className="h-4 w-4 mr-2" />
              {installGuideData.toolsSection.downloadCtaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoTutorialsSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            {installGuideData.videoTutorialsSection.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {installGuideData.videoTutorialsSection.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {installGuideData.videoTutorials.map((video) => (
            <div
              key={video.id}
              className="group cursor-pointer border border-border hover:border-[hsl(220_25%_35%)] transition-colors"
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white flex items-center justify-center">
                    <PlayIcon className="h-6 w-6 text-foreground ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium group-hover:text-[hsl(220_25%_35%)] transition-colors">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepByStepSection({selectedMethod}) {
  const [activeStep, setActiveStep] = useState(0);
  const steps = installGuideData.stepByStepSection.steps.map((step) => ({
    ...step,
    content:
      step.contentByMethod?.[selectedMethod] ||
      step.contentByMethod?.inside ||
      step.content,
  }));

  return (
    <section id="steps" className="w-full py-16 md:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            {installGuideData.stepByStepSection.title}
          </h2>
          <p className="text-muted-foreground">
            {installGuideData.stepByStepSection.subtitle.replace(
              '{count}',
              String(steps.length),
            )}
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-12">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <button
                onClick={() => setActiveStep(index)}
                className={`w-10 h-10 flex items-center justify-center font-semibold transition-colors ${
                  index <= activeStep
                    ? 'bg-[hsl(220_25%_35%)] text-white'
                    : 'bg-border text-muted-foreground'
                }`}
              >
                {index + 1}
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`w-8 md:w-16 h-0.5 mx-1 md:mx-2 ${
                    index < activeStep ? 'bg-[hsl(220_25%_35%)]' : 'bg-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Active Step */}
        <div className="border border-border bg-card p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-[hsl(220_25%_35%)] flex items-center justify-center text-white font-bold text-xl shrink-0">
              {activeStep + 1}
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">
                {steps[activeStep].title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {steps[activeStep].content}
              </p>
            </div>
          </div>

          <div className="bg-[hsl(220_25%_95%)] p-4 border-l-4 border-[hsl(220_25%_35%)]">
            <p className="text-sm text-[hsl(220_25%_25%)]">
              <span className="font-semibold">
                {installGuideData.stepByStepSection.proTipLabel}:{' '}
              </span>
              {steps[activeStep].tip}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
          >
            <ChevronLeftIcon className="h-4 w-4 mr-2" />
            {installGuideData.stepByStepSection.previousLabel}
          </Button>
          <Button
            onClick={() =>
              setActiveStep(Math.min(steps.length - 1, activeStep + 1))
            }
            disabled={activeStep === steps.length - 1}
            className="bg-[hsl(220_25%_35%)]"
          >
            {installGuideData.stepByStepSection.nextLabel}
            <ChevronRightIcon className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function NeedHelpSection({onContactClick, onFaqClick}) {
  return (
    <section className="w-full py-16 bg-[hsl(220_25%_25%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl font-semibold text-white mb-4">
          {installGuideData.needHelpSection.title}
        </h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          {installGuideData.needHelpSection.subtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="secondary"
            className="bg-white text-[hsl(220_25%_25%)] hover:bg-white/90"
            onClick={onContactClick}
          >
            {installGuideData.needHelpSection.contactCtaLabel}
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white/10"
            onClick={onFaqClick}
          >
            {installGuideData.needHelpSection.faqCtaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function InstallationGuideTemplate() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('inside');

  const scrollToSteps = () => {
    document.getElementById('steps')?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        onStartClick={scrollToSteps}
        onMeasureClick={() => navigate('/guides/measure')}
      />
      <InstallMethodsSection
        selectedMethod={selectedMethod}
        setSelectedMethod={setSelectedMethod}
      />
      <ToolsSection />
      <VideoTutorialsSection />
      <StepByStepSection selectedMethod={selectedMethod} />
      <NeedHelpSection
        onContactClick={() => navigate('/pages/contact')}
        onFaqClick={() => navigate('/faqs')}
      />
    </div>
  );
}
