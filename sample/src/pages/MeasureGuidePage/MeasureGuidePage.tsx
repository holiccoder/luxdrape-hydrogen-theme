import React from 'react';
import { RulerIcon, AlertTriangleIcon, CheckIcon, ArrowRightIcon, DownloadIcon, VideoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { toast } from 'sonner';

const MeasureGuidePage: React.FC = () => {
  return (
    <>
      <style jsx>{`
        .measure-guide {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="measure-guide">
        {/* Hero Section */}
        <section className="w-full bg-[hsl(220_25%_25%)] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
                How to Measure
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8">
                Accurate measurements are essential for custom-fit curtains and shades. 
                Follow our step-by-step guides to ensure a perfect fit every time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="secondary"
                  className="bg-white text-[hsl(220_25%_25%)] hover:bg-white/90"
                  onClick={() => toast.success('Download started')}
                >
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Download PDF Guide
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <VideoIcon className="h-4 w-4 mr-2" />
                  Watch Video Tutorial
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Type Selection */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-semibold mb-4">Choose Your Product Type</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Different products require different measurement approaches. Select the guide that matches your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Curtains Card */}
            <div className="border border-border bg-card p-8 hover:border-[hsl(220_25%_35%)] transition-colors">
              <div className="aspect-video bg-muted mb-6 overflow-hidden">
                <Image
                  src="https://miaoda.feishu.cn/aily/api/v1/files/static/39ca6344fda4409e8177e7359d39c6f1_ve_miaoda"
                  alt="Measuring curtains"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-3">Curtains & Drapes</h3>
              <p className="text-muted-foreground mb-6">
                Measure for inside mount, outside mount, or ceiling mount installations. 
                Includes fullness calculations for various pleat styles.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <CheckIcon className="h-4 w-4 text-[hsl(220_25%_35%)]" />
                  Width and height measurements
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckIcon className="h-4 w-4 text-[hsl(220_25%_35%)]" />
                  Rod placement guidelines
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckIcon className="h-4 w-4 text-[hsl(220_25%_35%)]" />
                  Fullness ratios for each style
                </li>
              </ul>
              <Button
                className="w-full bg-[hsl(220_25%_25%)] hover:bg-[hsl(220_25%_20%)]"
                onClick={() => {
                  const el = document.getElementById('curtains-guide');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Curtains Guide
              </Button>
            </div>

            {/* Shades Card */}
            <div className="border border-border bg-card p-8 hover:border-[hsl(220_25%_35%)] transition-colors">
              <div className="aspect-video bg-muted mb-6 overflow-hidden">
                <Image
                  src="https://miaoda.feishu.cn/ily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda"
                  alt="Measuring shades"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-3">Roller & Roman Shades</h3>
              <p className="text-muted-foreground mb-6">
                Precise measurements for inside mount and outside mount shade installations. 
                Critical depth requirements included.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <CheckIcon className="h-4 w-4 text-[hsl(220_25%_35%)]" />
                  Inside vs outside mount
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckIcon className="h-4 w-4 text-[hsl(220_25%_35%)]" />
                  Window depth requirements
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckIcon className="h-4 w-4 text-[hsl(220_25%_35%)]" />
                  Deduction calculations
                </li>
              </ul>
              <Button
                className="w-full bg-[hsl(220_25%_25%)] hover:bg-[hsl(220_25%_20%)]"
                onClick={() => {
                  const el = document.getElementById('shades-guide');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Shades Guide
              </Button>
            </div>
          </div>
        </section>

        {/* Curtains Guide Section */}
        <section id="curtains-guide" className="w-full bg-muted/30 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="font-serif text-3xl font-semibold mb-4">Curtains Measurement Guide</h2>
              <p className="text-muted-foreground">
                Follow these steps carefully for accurate curtain measurements.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Steps */}
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[hsl(220_25%_25%)] text-white flex items-center justify-center font-semibold shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Determine Mount Type</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Decide between inside mount (within window frame) or outside mount (wall above window). 
                      Outside mount is recommended for better light control and to make windows appear larger.
                    </p>
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 text-sm text-amber-800">
                      <strong>Tip:</strong> For outside mount, add 6-12 inches to window width for optimal coverage.
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[hsl(220_25%_25%)] text-white flex items-center justify-center font-semibold shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Measure Width</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Measure the width of your window in three places: top, middle, and bottom. 
                      Use the widest measurement for outside mount, or the narrowest for inside mount.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Use a steel tape measure for accuracy</li>
                      <li>• Measure to the nearest 1/8 inch</li>
                      <li>• Record all three measurements</li>
                    </ul>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[hsl(220_25%_25%)] text-white flex items-center justify-center font-semibold shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Measure Height</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      For floor-length curtains, measure from where the rod will be mounted to the floor. 
                      Subtract 1/2 inch for clearance, or add extra for a pooling effect.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-muted p-3">
                        <strong className="block mb-1">Floating</strong>
                        1/2" above floor
                      </div>
                      <div className="bg-muted p-3">
                        <strong className="block mb-1">Kissing</strong>
                        Just touching floor
                      </div>
                      <div className="bg-muted p-3">
                        <strong className="block mb-1">Breaking</strong>
                        1-2" on floor
                      </div>
                      <div className="bg-muted p-3">
                        <strong className="block mb-1">Pooling</strong>
                        3-8" on floor
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[hsl(220_25%_25%)] text-white flex items-center justify-center font-semibold shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Calculate Fullness</h3>
                    <p className="text-muted-foreground text-sm">
                      Different pleat styles require different fullness ratios:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                      <li>• Pinch Pleat: 2x width</li>
                      <li>• Triple Pleat: 2.5x width</li>
                      <li>• Tailor Pleat: 1.8x width</li>
                      <li>• Rod Pocket: 2x width</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Visual Guide */}
              <div className="bg-card border border-border p-6">
                <h3 className="font-semibold mb-4">Measurement Diagram</h3>
                <div className="aspect-[4/3] bg-muted mb-4 overflow-hidden">
                  <Image
                    src="https://miaoda.feishu.cn/aily/api/v1/files/static/d5da9e382c034ee7afb544a0e56cda09_ve_miaoda"
                    alt="Curtain measurement diagram"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Rod Height</span>
                    <span className="font-medium">4-6" above window frame</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Side Extension</span>
                    <span className="font-medium">3-6" beyond window</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Bottom Clearance</span>
                    <span className="font-medium">1/2" or pooling</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shades Guide Section */}
        <section id="shades-guide" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-semibold mb-4">Shades Measurement Guide</h2>
            <p className="text-muted-foreground">
              Precise measurements are critical for custom shades. Follow these steps exactly.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Visual Guide */}
            <div className="bg-card border border-border p-6 order-2 lg:order-1">
              <h3 className="font-semibold mb-4">Inside vs Outside Mount</h3>
              <div className="aspect-[4/3] bg-muted mb-4 overflow-hidden">
                <Image
                  src="https://miaoda.feishu.cn/aily/api/v1/files/static/5d8c0e282d4344afb92cc3e76c72c066_ve_miaoda"
                  alt="Shade measurement diagram"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted p-4">
                  <strong className="block mb-2 text-[hsl(220_25%_35%)]">Inside Mount</strong>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Clean, built-in look</li>
                    <li>• Requires 2"+ depth</li>
                    <li>• Light gaps possible</li>
                    <li>• Measure width top/middle/bottom</li>
                  </ul>
                </div>
                <div className="bg-muted p-4">
                  <strong className="block mb-2 text-[hsl(220_25%_35%)]">Outside Mount</strong>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Better light blocking</li>
                    <li>• No depth requirements</li>
                    <li>• Covers window trim</li>
                    <li>• Add 3-4" to each side</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-8 order-1 lg:order-2">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[hsl(220_25%_25%)] text-white flex items-center justify-center font-semibold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Check Window Depth (Inside Mount)</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Measure the depth of your window frame from the glass to the outer edge. 
                    You need at least 2 inches of depth for inside mount roller shades.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 text-sm text-red-800">
                    <strong>Critical:</strong> Less than 2" depth requires outside mount.
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[hsl(220_25%_25%)] text-white flex items-center justify-center font-semibold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Measure Width</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    For inside mount: Measure the exact width of the window opening at the top, 
                    middle, and bottom. Record the narrowest measurement. Round down to the nearest 1/8".
                  </p>
                  <p className="text-muted-foreground text-sm">
                    For outside mount: Measure the window width and add 3-4 inches to each side 
                    (6-8 inches total) for optimal light control.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[hsl(220_25%_25%)] text-white flex items-center justify-center font-semibold shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Measure Height</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    For inside mount: Measure the exact height of the window opening on the left, 
                    center, and right. Record the longest measurement.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    For outside mount: Measure from where you want the top of the shade to where 
                    you want it to end. Add 2-3 inches above the window frame for mounting.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[hsl(220_25%_25%)] text-white flex items-center justify-center font-semibold shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Note Obstructions</h3>
                  <p className="text-muted-foreground text-sm">
                    Check for window cranks, handles, locks, or alarm sensors that might interfere 
                    with shade operation. Measure their depth if present.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section className="w-full bg-muted/30 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-semibold mb-4">Common Mistakes to Avoid</h2>
              <p className="text-muted-foreground">Learn from others' mistakes to ensure perfect measurements.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border p-6">
                <div className="w-12 h-12 bg-red-100 flex items-center justify-center mb-4">
                  <AlertTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">Using a Cloth Tape</h3>
                <p className="text-muted-foreground text-sm">
                  Cloth measuring tapes can stretch and provide inaccurate measurements. 
                  Always use a rigid steel tape measure.
                </p>
              </div>

              <div className="bg-card border border-border p-6">
                <div className="w-12 h-12 bg-red-100 flex items-center justify-center mb-4">
                  <AlertTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">Measuring Only Once</h3>
                <p className="text-muted-foreground text-sm">
                  Windows are rarely perfectly square. Measure width and height in multiple 
                  places to account for variations.
                </p>
              </div>

              <div className="bg-card border border-border p-6">
                <div className="w-12 h-12 bg-red-100 flex items-center justify-center mb-4">
                  <AlertTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">Ignoring Depth Requirements</h3>
                <p className="text-muted-foreground text-sm">
                  Inside mount shades need adequate window depth. Always measure depth 
                  before choosing inside mount.
                </p>
              </div>

              <div className="bg-card border border-border p-6">
                <div className="w-12 h-12 bg-red-100 flex items-center justify-center mb-4">
                  <AlertTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">Forgetting Obstructions</h3>
                <p className="text-muted-foreground text-sm">
                  Window handles, cranks, and locks can prevent proper operation. 
                  Always note these when measuring.
                </p>
              </div>

              <div className="bg-card border border-border p-6">
                <div className="w-12 h-12 bg-red-100 flex items-center justify-center mb-4">
                  <AlertTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">Rounding Up Measurements</h3>
                <p className="text-muted-foreground text-sm">
                  For inside mount, always round down to the nearest 1/8". 
                  Rounding up can make the shade too large to fit.
                </p>
              </div>

              <div className="bg-card border border-border p-6">
                <div className="w-12 h-12 bg-red-100 flex items-center justify-center mb-4">
                  <AlertTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">Measuring Old Treatments</h3>
                <p className="text-muted-foreground text-sm">
                  Never measure existing curtains or shades. Always measure the 
                  actual window opening for best results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Need Help CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-[hsl(220_25%_25%)] text-white p-8 md:p-12 text-center">
            <h2 className="font-serif text-3xl font-semibold mb-4">Still Need Help?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Our measurement experts are here to assist you. Schedule a free video consultation 
              or send us photos of your windows for personalized guidance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="secondary"
                className="bg-white text-[hsl(220_25%_25%)] hover:bg-white/90"
              >
                Schedule Consultation
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MeasureGuidePage;
