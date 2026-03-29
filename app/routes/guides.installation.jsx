import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
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
import {Image} from '~/components/ui/image';

export function meta() {
  return [{title: 'Installation Guide | LuxDrape'}];
}

const installMethods = [
  {
    id: 'inside',
    title: 'Inside Mount',
    description:
      'Install within the window frame for a clean, built-in look. Best for windows with sufficient depth.',
    pros: [
      'Clean, streamlined appearance',
      'Shows off window trim',
      'Takes up less wall space',
    ],
    cons: [
      'Requires minimum 2" window depth',
      'May allow some light leakage on sides',
    ],
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda',
  },
  {
    id: 'outside',
    title: 'Outside Mount',
    description:
      'Install on the wall above the window frame. Provides maximum light blocking and makes windows appear larger.',
    pros: [
      'Maximum light blocking',
      'Makes windows appear larger',
      'Hides unattractive window frames',
      'Works with any window depth',
    ],
    cons: ['Requires more wall space', 'Visible mounting brackets'],
    image:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/d9f0951f7cd24ef091f3b1384b20fcfa_ve_miaoda',
  },
];

const toolsList = [
  {name: 'Power Drill', essential: true},
  {name: 'Phillips Head Screwdriver', essential: true},
  {name: 'Measuring Tape', essential: true},
  {name: 'Pencil', essential: true},
  {name: 'Level', essential: true},
  {name: 'Stud Finder', essential: false},
  {name: 'Step Ladder', essential: true},
  {name: 'Drywall Anchors', essential: false},
];

const videoTutorials = [
  {
    id: 'v1',
    title: 'Inside Mount Installation',
    duration: '5:32',
    thumbnail:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda',
  },
  {
    id: 'v2',
    title: 'Outside Mount Installation',
    duration: '6:15',
    thumbnail:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/190087f6844e4a6d9e9eecd6e38fdad3_ve_miaoda',
  },
  {
    id: 'v3',
    title: 'Troubleshooting Common Issues',
    duration: '4:48',
    thumbnail:
      'https://miaoda.feishu.cn/aily/api/v1/files/static/40775611ee2246cc99f56c0128eb297b_ve_miaoda',
  },
];

export function InstallGuidePage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('inside');
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Prepare Your Space',
      content:
        'Clear the area around your window. Lay down a drop cloth if needed. Have all your tools within reach. Remove any existing window treatments.',
      tip: 'Take photos of your window before starting for reference.',
    },
    {
      title: 'Mark Your Bracket Positions',
      content:
        selectedMethod === 'inside'
          ? 'Hold the bracket inside the window frame, about 2-3 inches from each side. Mark the screw holes with a pencil. Ensure brackets are level.'
          : 'Measure and mark 2-3 inches above the window frame. Extend 3-4 inches beyond the window width on each side for optimal coverage. Use a level to ensure straight placement.',
      tip: 'For wide windows, add a center bracket for extra support.',
    },
    {
      title: 'Pre-Drill Holes',
      content:
        'Using a drill bit slightly smaller than your screws, pre-drill holes at your marked positions. If not drilling into a stud, insert drywall anchors.',
      tip: 'Start with a smaller drill bit and work up to avoid splitting the wood.',
    },
    {
      title: 'Mount the Brackets',
      content:
        'Attach the brackets using the provided screws. Ensure they are secure and level. Double-check alignment before fully tightening.',
      tip: 'Do not overtighten - stop when the bracket is snug against the surface.',
    },
    {
      title: 'Install the Shade/Curtain',
      content:
        'Carefully align the shade or curtain rod with the mounted brackets. For roller shades, insert the pin end first, then snap the control end into place.',
      tip: 'Have a helper hold the shade steady while you secure it.',
    },
    {
      title: 'Test and Adjust',
      content:
        'Operate your shade or curtain several times to ensure smooth movement. Check that it hangs level and straight. Make any necessary adjustments to the brackets.',
      tip: 'If the shade binds, loosen the brackets slightly and reposition.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-[hsl(220_25%_25%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6">
              Installation Guide
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Professional results with DIY simplicity. Follow our step-by-step
              instructions for a perfect installation every time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="secondary"
                className="bg-white text-[hsl(220_25%_25%)] hover:bg-white/90"
                onClick={() =>
                  document
                    .getElementById('steps')
                    ?.scrollIntoView({behavior: 'smooth'})
                }
              >
                Start Installation
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/guides/measure-curtains')}
              >
                <RulerIcon className="h-4 w-4 mr-2" />
                Measuring Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Methods */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Choose Your Mount Type
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the installation method that works best for your windows
              and style preferences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {installMethods.map((method) => (
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
                  <Image
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
                        Pros
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
                        Considerations
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

      {/* Tools Section */}
      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl font-semibold mb-4">
                Tools You'll Need
              </h2>
              <p className="text-muted-foreground mb-8">
                Gather these tools before you begin. Most are common household
                items.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {toolsList.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-3 p-3 border border-border bg-card"
                  >
                    <WrenchIcon className="h-5 w-5 text-[hsl(220_25%_35%)]" />
                    <div>
                      <span className="text-sm font-medium">{tool.name}</span>
                      {tool.essential && (
                        <span className="text-xs text-[hsl(220_25%_35%)] ml-2">
                          Required
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[hsl(220_25%_25%)] p-8 text-white">
              <h3 className="font-semibold text-xl mb-4">Pro Tip</h3>
              <p className="text-white/80 mb-6">
                Always double-check your measurements before drilling. It's
                easier to adjust a pencil mark than to fill unnecessary holes.
                If you're unsure, order our installation template for perfect
                bracket placement every time.
              </p>
              <Button
                variant="secondary"
                className="bg-white text-[hsl(220_25%_25%)] hover:bg-white/90"
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download Template
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Video Tutorials
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Watch our detailed video guides for visual step-by-step
              instructions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {videoTutorials.map((video) => (
              <div
                key={video.id}
                className="group cursor-pointer border border-border hover:border-[hsl(220_25%_35%)] transition-colors"
                onClick={() => {}}
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
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

      {/* Step-by-Step Instructions */}
      <section id="steps" className="w-full py-16 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Step-by-Step Instructions
            </h2>
            <p className="text-muted-foreground">
              Follow these {steps.length} simple steps for a professional
              installation.
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
                    className={`flex-1 h-0.5 mx-2 ${
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
                <span className="font-semibold">Pro Tip: </span>
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
              Previous
            </Button>
            <Button
              onClick={() =>
                setActiveStep(Math.min(steps.length - 1, activeStep + 1))
              }
              disabled={activeStep === steps.length - 1}
              className="bg-[hsl(220_25%_35%)]"
            >
              Next Step
              <ChevronRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Need Help */}
      <section className="w-full py-16 bg-[hsl(220_25%_25%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-semibold text-white mb-4">
            Need Help?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Our installation experts are here to assist. Schedule a free video
            consultation or visit our help center for more resources.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="secondary"
              className="bg-white text-[hsl(220_25%_25%)] hover:bg-white/90"
              onClick={() => navigate('/pages/contact')}
            >
              Contact Support
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate('/faqs')}
            >
              View FAQs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InstallGuidePage;
