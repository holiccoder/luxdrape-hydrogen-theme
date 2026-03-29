import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image } from '@/components/ui/image';
import {
  ClockIcon,
  FileTextIcon,
  PlayIcon,
  DownloadIcon,
  RulerIcon,
  ChevronRightIcon,
  CheckIcon,
  InfoIcon,
  LightbulbIcon,
  WrenchIcon,
  ArrowRightIcon,
  XIcon
} from 'lucide-react';

// ============================================
// 1. Difficulty Meter - 安装难度评估仪表盘
// ============================================

interface IDifficultyMeterProps {
  level?: 1 | 2 | 3;
  time?: string;
  tools?: string[];
  skills?: string[];
}

export const DifficultyMeter: React.FC<IDifficultyMeterProps> = ({
  level = 1,
  time = '15-20 min',
  tools = ['Screwdriver', 'Drill', 'Level'],
  skills = ['Basic DIY']
}) => {
  const levelConfig = {
    1: { 
      label: 'Easy', 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50', 
      border: 'border-emerald-200',
      fill: 'bg-emerald-500',
      encouragement: 'You got this! Even first-timers can handle it.'
    },
    2: { 
      label: 'Moderate', 
      color: 'text-amber-600', 
      bg: 'bg-amber-50', 
      border: 'border-amber-200',
      fill: 'bg-amber-500',
      encouragement: 'Takes a bit more focus, but totally doable.'
    },
    3: { 
      label: 'Advanced', 
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      border: 'border-red-200',
      fill: 'bg-red-500',
      encouragement: 'Consider a helper for this one.'
    }
  };

  const config = levelConfig[level];

  return (
    <div className={`${config.bg} ${config.border} border rounded-2xl p-5`}>
      <div className="flex items-start gap-4">
        {/* Meter Visual */}
        <div className="flex-shrink-0">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-border/30"
              />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${(level / 3) * 100} 100`}
                strokeLinecap="round"
                className={config.fill.replace('bg-', 'text-')}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-lg font-bold ${config.color}`}>{level}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`font-semibold ${config.color}`}>Level {level}: {config.label}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground flex items-center gap-1">
              <ClockIcon className="w-3.5 h-3.5" />
              {time}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">{config.encouragement}</p>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Tools Needed:</p>
              <div className="flex flex-wrap gap-1">
                {tools.map((tool, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-background rounded-full text-muted-foreground">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Skills:</p>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-background rounded-full text-muted-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 2. Tutorial Hub - 分阶段教程矩阵
// ============================================

interface ITutorialHubProps {
  videoUrl?: string;
  measuringPdf?: string;
  installPdf?: string;
  faqItems?: { question: string; answer: string }[];
}

export const TutorialHub: React.FC<ITutorialHubProps> = ({
  videoUrl,
  measuringPdf,
  installPdf,
  faqItems = []
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <WrenchIcon className="w-5 h-5 text-primary" />
        <h3 className="font-serif text-lg font-semibold">Installation Resources</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Video Section */}
        <Card className="rounded-2xl overflow-hidden">
          <div className="relative aspect-video bg-accent">
            {isVideoPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/90">
                <div className="text-center text-white">
                  <PlayIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm opacity-70">Video player placeholder</p>
                  <p className="text-xs opacity-50 mt-1">Integrate with your video platform</p>
                </div>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                  >
                    <PlayIcon className="w-7 h-7 ml-1" />
                  </button>
                  <p className="mt-3 text-sm font-medium text-foreground">Quick Install Video</p>
                  <p className="text-xs text-muted-foreground">1 min watch</p>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* PDF Downloads */}
        <div className="space-y-3">
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <RulerIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Measuring Guide</p>
                  <p className="text-xs text-muted-foreground">PDF • 2 pages</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-full shrink-0">
                  <DownloadIcon className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileTextIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Installation Manual</p>
                  <p className="text-xs text-muted-foreground">PDF • 4 pages</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-full shrink-0">
                  <DownloadIcon className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Pre-Install Checklist</p>
                  <p className="text-xs text-muted-foreground">PDF • 1 page</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-full shrink-0">
                  <DownloadIcon className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Quick Tips */}
      {faqItems.length > 0 && (
        <div className="bg-accent/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <LightbulbIcon className="w-4 h-4 text-warning" />
            <span className="font-medium text-sm">Quick Tips</span>
          </div>
          <div className="space-y-2">
            {faqItems.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <CheckIcon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{item.answer}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// 3. Visual Measure Guide - 可视化测量引导
// ============================================

interface IVisualMeasureGuideProps {
  showGuide?: 'width' | 'height' | null;
  mountType?: 'inside' | 'outside';
  onMountTypeChange?: (type: 'inside' | 'outside') => void;
}

export const VisualMeasureGuide: React.FC<IVisualMeasureGuideProps> = ({
  showGuide,
  mountType = 'inside',
  onMountTypeChange
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showGuide) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [showGuide]);

  if (!isVisible) return null;

  return (
    <div className="relative">
      {/* Desktop: Side Panel */}
      <div className="hidden lg:block absolute left-full ml-4 top-0 w-80 z-10">
        <Card className="rounded-2xl shadow-lg border-primary/20">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RulerIcon className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">Measuring Guide</span>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="w-6 h-6 rounded-full hover:bg-accent flex items-center justify-center"
              >
                <XIcon className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Mount Type Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => onMountTypeChange?.('inside')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                  mountType === 'inside'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-foreground hover:bg-accent/70'
                }`}
              >
                Inside Mount
              </button>
              <button
                onClick={() => onMountTypeChange?.('outside')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                  mountType === 'outside'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-foreground hover:bg-accent/70'
                }`}
              >
                Outside Mount
              </button>
            </div>

            {/* Visual Diagram */}
            <div className="relative bg-accent/50 rounded-xl p-4 h-48">
              <svg viewBox="0 0 200 150" className="w-full h-full">
                {/* Window Frame */}
                <rect x="40" y="20" width="120" height="110" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
                
                {/* Glass Area */}
                <rect x="50" y="30" width="100" height="90" fill="currentColor" className="text-sky-100" />
                
                {/* Shade */}
                <rect x={mountType === 'inside' ? 50 : 30} y={mountType === 'inside' ? 30 : 10} width={mountType === 'inside' ? 100 : 140} height={mountType === 'inside' ? 90 : 130} fill="currentColor" className="text-primary/20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
                
                {/* Width Arrow */}
                {showGuide === 'width' && (
                  <>
                    <line x1={mountType === 'inside' ? 50 : 30} y1="75" x2={mountType === 'inside' ? 150 : 170} y2="75" stroke="currentColor" strokeWidth="2" className="text-primary" />
                    <polygon points={mountType === 'inside' ? "50,75 56,71 56,79" : "30,75 36,71 36,79"} fill="currentColor" className="text-primary" />
                    <polygon points={mountType === 'inside' ? "150,75 144,71 144,79" : "170,75 164,71 164,79"} fill="currentColor" className="text-primary" />
                    <rect x="80" y="67" width="40" height="16" fill="currentColor" className="text-primary" rx="3" />
                    <text x="100" y="78" textAnchor="middle" className="text-[10px] fill-primary-foreground font-medium">WIDTH</text>
                  </>
                )}
                
                {/* Height Arrow */}
                {showGuide === 'height' && (
                  <>
                    <line x1="100" y1={mountType === 'inside' ? 30 : 10} x2="100" y2={mountType === 'inside' ? 120 : 140} stroke="currentColor" strokeWidth="2" className="text-primary" />
                    <polygon points={mountType === 'inside' ? "100,30 96,36 104,36" : "100,10 96,16 104,16"} fill="currentColor" className="text-primary" />
                    <polygon points={mountType === 'inside' ? "100,120 96,114 104,114" : "100,140 96,134 104,134"} fill="currentColor" className="text-primary" />
                    <rect x="108" y="65" width="40" height="16" fill="currentColor" className="text-primary" rx="3" />
                    <text x="128" y="76" textAnchor="middle" className="text-[10px] fill-primary-foreground font-medium">HEIGHT</text>
                  </>
                )}
              </svg>
            </div>

            {/* Instructions */}
            <div className="space-y-2 text-xs text-muted-foreground">
              {mountType === 'inside' ? (
                <>
                  <p>• Measure inside the window frame</p>
                  <p>• Measure at 3 points and use the smallest</p>
                  <p>• Deduct 1/4&quot; from width for clearance</p>
                </>
              ) : (
                <>
                  <p>• Measure outside the window frame</p>
                  <p>• Add 2-4&quot; to each side for overlap</p>
                  <p>• Mount 2-3&quot; above window for height</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile: Bottom Sheet */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 translate-y-0">
        <Card className="rounded-t-2xl shadow-2xl border-t border-x max-h-[60vh] overflow-y-auto">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RulerIcon className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">Measuring Guide</span>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="w-8 h-8 rounded-full hover:bg-accent flex items-center justify-center"
              >
                <XIcon className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Mount Type Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => onMountTypeChange?.('inside')}
                className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  mountType === 'inside'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-foreground hover:bg-accent/70'
                }`}
              >
                Inside Mount
              </button>
              <button
                onClick={() => onMountTypeChange?.('outside')}
                className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  mountType === 'outside'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-foreground hover:bg-accent/70'
                }`}
              >
                Outside Mount
              </button>
            </div>

            {/* Visual Diagram */}
            <div className="relative bg-accent/50 rounded-xl p-4 aspect-[4/3]">
              <svg viewBox="0 0 200 150" className="w-full h-full">
                <rect x="40" y="20" width="120" height="110" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
                <rect x="50" y="30" width="100" height="90" fill="currentColor" className="text-sky-100" />
                <rect x={mountType === 'inside' ? 50 : 30} y={mountType === 'inside' ? 30 : 10} width={mountType === 'inside' ? 100 : 140} height={mountType === 'inside' ? 90 : 130} fill="currentColor" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" className="text-primary/20 [&amp;]:stroke-primary" />
                
                {showGuide === 'width' && (
                  <>
                    <line x1={mountType === 'inside' ? 50 : 30} y1="75" x2={mountType === 'inside' ? 150 : 170} y2="75" stroke="currentColor" strokeWidth="2" className="text-primary" />
                    <polygon points={mountType === 'inside' ? "50,75 56,71 56,79" : "30,75 36,71 36,79"} fill="currentColor" className="text-primary" />
                    <polygon points={mountType === 'inside' ? "150,75 144,71 144,79" : "170,75 164,71 164,79"} fill="currentColor" className="text-primary" />
                    <rect x="80" y="67" width="40" height="16" fill="currentColor" className="text-primary" rx="3" />
                    <text x="100" y="78" textAnchor="middle" className="text-[10px] fill-primary-foreground font-medium">WIDTH</text>
                  </>
                )}
                
                {showGuide === 'height' && (
                  <>
                    <line x1="100" y1={mountType === 'inside' ? 30 : 10} x2="100" y2={mountType === 'inside' ? 120 : 140} stroke="currentColor" strokeWidth="2" className="text-primary" />
                    <polygon points={mountType === 'inside' ? "100,30 96,36 104,36" : "100,10 96,16 104,16"} fill="currentColor" className="text-primary" />
                    <polygon points={mountType === 'inside' ? "100,120 96,114 104,114" : "100,140 96,134 104,134"} fill="currentColor" className="text-primary" />
                    <rect x="108" y="65" width="40" height="16" fill="currentColor" className="text-primary" rx="3" />
                    <text x="128" y="76" textAnchor="middle" className="text-[10px] fill-primary-foreground font-medium">HEIGHT</text>
                  </>
                )}
              </svg>
            </div>

            {/* Instructions */}
            <div className="space-y-2 text-sm text-muted-foreground">
              {mountType === 'inside' ? (
                <>
                  <p>• Measure inside the window frame</p>
                  <p>• Measure at 3 points and use the smallest</p>
                  <p>• Deduct 1/4&quot; from width for clearance</p>
                </>
              ) : (
                <>
                  <p>• Measure outside the window frame</p>
                  <p>• Add 2-4&quot; to each side for overlap</p>
                  <p>• Mount 2-3&quot; above window for height</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// ============================================
// 4. Measurement Calculator - 尺寸计算器
// ============================================

interface IMeasurementCalculatorProps {
  onCalculate?: (width: number, height: number) => void;
}

export const MeasurementCalculator: React.FC<IMeasurementCalculatorProps> = ({ onCalculate }) => {
  const [mountType, setMountType] = useState<'inside' | 'outside'>('inside');
  const [windowWidth, setWindowWidth] = useState('');
  const [windowHeight, setWindowHeight] = useState('');
  const [result, setResult] = useState<{ width: string; height: string } | null>(null);

  const calculate = () => {
    const w = parseFloat(windowWidth);
    const h = parseFloat(windowHeight);
    if (!w || !h) return;

    if (mountType === 'inside') {
      setResult({ width: (w - 0.25).toFixed(2), height: h.toFixed(2) });
    } else {
      setResult({ width: (w + 6).toFixed(2), height: (h + 4).toFixed(2) });
    }
    onCalculate?.(mountType === 'inside' ? w - 0.25 : w + 6, mountType === 'inside' ? h : h + 4);
  };

  return (
    <div className="bg-accent/30 rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-2">
        <RulerIcon className="w-4 h-4 text-primary" />
        <h4 className="font-medium">Measurement Calculator</h4>
      </div>

      {/* Mount Type */}
      <div className="flex gap-2">
        <button
          onClick={() => { setMountType('inside'); setResult(null); }}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            mountType === 'inside' ? 'bg-primary text-primary-foreground' : 'bg-background border border-border hover:border-primary'
          }`}
        >
          Inside Mount
        </button>
        <button
          onClick={() => { setMountType('outside'); setResult(null); }}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            mountType === 'outside' ? 'bg-primary text-primary-foreground' : 'bg-background border border-border hover:border-primary'
          }`}
        >
          Outside Mount
        </button>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Window Width (in)</Label>
          <Input
            type="number"
            step="0.125"
            value={windowWidth}
            onChange={(e) => setWindowWidth(e.target.value)}
            placeholder="36"
            className="h-10"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Window Height (in)</Label>
          <Input
            type="number"
            step="0.125"
            value={windowHeight}
            onChange={(e) => setWindowHeight(e.target.value)}
            placeholder="48"
            className="h-10"
          />
        </div>
      </div>

      <Button onClick={calculate} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
        Calculate Shade Size
      </Button>

      {/* Result */}
      {result && (
        <div className="bg-primary/10 rounded-xl p-4 space-y-2">
          <p className="text-sm font-medium text-primary">Recommended Shade Size:</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Width:</span>
            <span className="font-semibold">{result.width}&quot;</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Height:</span>
            <span className="font-semibold">{result.height}&quot;</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {mountType === 'inside'
              ? 'We subtracted 1/4" for proper clearance.'
              : 'We added 6" width and 4" height for optimal coverage.'}
          </p>
        </div>
      )}
    </div>
  );
};

// ============================================
// 5. Opacity Level Selector - 透光度选择器
// ============================================

interface IOpacityLevelProps {
  selectedLevel?: 'sheer' | 'light-filtering' | 'room-darkening' | 'blackout';
  onLevelChange?: (level: 'sheer' | 'light-filtering' | 'room-darkening' | 'blackout') => void;
}

export const OpacityLevelSelector: React.FC<IOpacityLevelProps> = ({
  selectedLevel = 'light-filtering',
  onLevelChange
}) => {
  const levels = [
    { id: 'sheer', name: 'Sheer', light: '100%', privacy: 'Low', icon: '☀️', description: 'Soft light, no privacy' },
    { id: 'light-filtering', name: 'Light Filtering', light: '60%', privacy: 'Medium', icon: '🌤️', description: 'Diffused light, daytime privacy' },
    { id: 'room-darkening', name: 'Room Darkening', light: '20%', privacy: 'High', icon: '🌥️', description: 'Blocks most light' },
    { id: 'blackout', name: 'Blackout', light: '0%', privacy: 'Full', icon: '🌑', description: 'Complete darkness' },
  ] as const;

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Light Control (Opacity)</Label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => onLevelChange?.(level.id)}
            className={`relative p-3 rounded-xl border-2 text-left transition-all ${
              selectedLevel === level.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-muted-foreground'
            }`}
          >
            <div className="text-xl mb-1">{level.icon}</div>
            <p className="text-xs font-medium">{level.name}</p>
            <p className="text-[10px] text-muted-foreground">{level.light} light</p>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {levels.find(l => l.id === selectedLevel)?.description}
      </p>
    </div>
  );
};

// ============================================
// 6. Back View Preview - 背面预览组件
// ============================================

interface IBackViewPreviewProps {
  frontImage: string;
  backImage: string;
  liningType: string;
  safetyFeatures?: string[];
}

export const BackViewPreview: React.FC<IBackViewPreviewProps> = ({
  frontImage,
  backImage,
  liningType,
  safetyFeatures = []
}) => {
  const [showBack, setShowBack] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Product Preview</Label>
        <button
          onClick={() => setShowBack(!showBack)}
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          <ArrowRightIcon className={`w-3 h-3 transition-transform ${showBack ? 'rotate-180' : ''}`} />
          {showBack ? 'View Front' : 'View Back'}
        </button>
      </div>

      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-accent">
        <Image
          src={showBack ? backImage : frontImage}
          alt={showBack ? 'Back view' : 'Front view'}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        {showBack && (
          <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-xl p-3">
            <p className="text-xs font-medium mb-1">Lining: {liningType}</p>
            <div className="flex flex-wrap gap-1">
              {safetyFeatures.map((feature, idx) => (
                <span key={idx} className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// 7. Hardware Compatibility - 硬件搭配展示
// ============================================

interface IHardwareCompatibilityProps {
  hardwareItems: { name: string; price: number; image: string; description: string }[];
}

export const HardwareCompatibility: React.FC<IHardwareCompatibilityProps> = ({ hardwareItems }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Recommended Hardware</Label>
        <button className="text-xs text-primary hover:underline">View All</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {hardwareItems.slice(0, 3).map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer">
            <div className="aspect-square rounded-lg overflow-hidden bg-accent mb-2">
              <Image src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs font-medium truncate">{item.name}</p>
            <p className="text-xs text-muted-foreground">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// 8. Natural Light Comparison - 自然光变化对比
// ============================================

interface INaturalLightComparisonProps {
  images: { time: string; image: string; description: string }[];
}

export const NaturalLightComparison: React.FC<INaturalLightComparisonProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">See It In Different Light</Label>
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-accent">
        <Image
          src={images[activeIndex]?.image}
          alt={`Light at ${images[activeIndex]?.time}`}
          className="w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-white font-medium">{images[activeIndex]?.time}</p>
          <p className="text-white/80 text-sm">{images[activeIndex]?.description}</p>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeIndex === idx
                ? 'bg-primary text-primary-foreground'
                : 'bg-accent text-foreground hover:bg-accent/70'
            }`}
          >
            {img.time}
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================
// 9. Silent Motor Demo - 静音电机演示
// ============================================

export const SilentMotorDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [shadePosition, setShadePosition] = useState(0);
  const [showSilentBadge, setShowSilentBadge] = useState(false);

  const playDemo = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setShowSilentBadge(true);

    let pos = 0;
    const upInterval = setInterval(() => {
      pos += 2;
      setShadePosition(pos);
      if (pos >= 100) {
        clearInterval(upInterval);
        setTimeout(() => {
          const downInterval = setInterval(() => {
            pos -= 2;
            setShadePosition(pos);
            if (pos <= 0) {
              clearInterval(downInterval);
              setIsPlaying(false);
              setTimeout(() => setShowSilentBadge(false), 1500);
            }
          }, 35);
        }, 600);
      }
    }, 35);
  };

  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium flex items-center gap-2">
            <WrenchIcon className="w-4 h-4 text-primary" />
            Whisper-Quiet Motor
          </h4>
          <p className="text-xs text-muted-foreground mt-1">Experience the silent operation</p>
        </div>
        <button
          onClick={playDemo}
          disabled={isPlaying}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {isPlaying ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Running
            </>
          ) : (
            <>
              <PlayIcon className="w-4 h-4" />
              Play Demo
            </>
          )}
        </button>
      </div>

      {/* Animated Window */}
      <div className="relative bg-gradient-to-b from-sky-200 to-sky-100 rounded-xl overflow-hidden" style={{ height: '180px' }}>
        <div className="absolute inset-3 border-2 border-white/80 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300/50 to-sky-200/50" />
          <div
            className="absolute inset-x-0 top-0 bg-gradient-to-b from-stone-100 to-stone-50 shadow-inner transition-all duration-100"
            style={{ height: `${100 - shadePosition}%` }}
          >
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(139,115,85,0.15) 10px, rgba(139,115,85,0.15) 12px)'
            }} />
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-stone-200" />
          </div>
          {showSilentBadge && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-medium animate-pulse shadow-sm">
              <XIcon className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-700">&lt; 35dB</span>
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2 bg-white/50 rounded-lg">
          <p className="text-lg font-bold text-primary">&lt;35dB</p>
          <p className="text-[10px] text-muted-foreground">Silent</p>
        </div>
        <div className="p-2 bg-white/50 rounded-lg">
          <p className="text-lg font-bold text-primary">Smart</p>
          <p className="text-[10px] text-muted-foreground">Alexa/Google</p>
        </div>
        <div className="p-2 bg-white/50 rounded-lg">
          <p className="text-lg font-bold text-primary">Timer</p>
          <p className="text-[10px] text-muted-foreground">Schedules</p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 10. Scene Gallery - 场景图展示
// ============================================

interface ISceneGalleryProps {
  scenes: { room: string; image: string; description: string }[];
}

export const SceneGallery: React.FC<ISceneGalleryProps> = ({ scenes }) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">See It In Real Rooms</Label>
      <div className="grid grid-cols-2 gap-3">
        {scenes.map((scene, idx) => (
          <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group">
            <Image src={scene.image} alt={scene.room} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-medium">{scene.room}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
