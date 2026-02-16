import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, SkipBack, SkipForward, Plus, Minus } from 'lucide-react';

export default function Timeline({ activeStep, setActiveStep }) {
  const [speed, setSpeed] = useState('1.0x');

  const frames = [
    { time: '10:30:15', label: 'Frame 0', active: false, error: false },
    { time: '10:30:18', label: 'Frame 1', active: false, error: false },
    { time: '10:30:21', label: 'Frame 2', active: true, error: false },
    { time: '10:30:24', label: 'Frame 3', active: false, error: true },
    { time: '10:30:27', label: 'Frame 4', active: false, error: false },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
      {/* Timeline Sections */}
      <div className="relative overflow-hidden">
        <div className="absolute left-[380px] top-0 bottom-0 w-0.5 bg-primary z-30 shadow-[0_0_8px_rgba(59,130,246,0.5)]">
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-white dark:border-slate-900"></div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <div className="min-w-[1200px]">
            {/* Video Frames */}
            <div className="timeline-grid border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="p-3 border-r border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-slate-400">videocam</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Video Frames</span>
              </div>
              <div className="flex items-center gap-4 px-4 py-3">
                {frames.map((frame) => (
                  <div
                    key={frame.time}
                    className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      frame.active ? 'ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-slate-900 rounded' : ''
                    } ${!frame.active && !frame.error ? 'opacity-60 hover:opacity-100' : ''}`}
                    onClick={() => setActiveStep(frame.time)}
                  >
                    <div
                      className={`w-20 h-12 rounded border overflow-hidden relative ${
                        frame.error
                          ? 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800/50'
                          : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {frame.error ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="material-symbols-outlined text-red-500 text-lg">error</span>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[8px] text-slate-400">
                          {frame.label}
                        </div>
                      )}
                    </div>
                    <span className={`text-[9px] font-mono ${frame.active ? 'text-primary font-bold' : 'text-slate-400'}`}>
                      {frame.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Actions */}
            <div className="timeline-grid border-b border-slate-100 dark:border-slate-800 relative">
              <div className="p-3 border-r border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-slate-400">touch_app</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Agent Actions</span>
              </div>
              <div className="flex items-center h-14 relative px-4">
                <div className="absolute left-[350px] top-0 bottom-0 w-[180px] bg-red-50/60 dark:bg-red-950/20 border-x border-red-100 dark:border-red-900/30 flex flex-col items-center justify-center">
                  <span className="text-[9px] font-bold text-red-400 uppercase tracking-tighter mb-1">
                    Failure Zone
                  </span>
                </div>
                <div className="flex gap-16 ml-8 z-10">
                  <div className="flex flex-col items-center group cursor-pointer">
                    <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white dark:border-slate-900 shadow-sm"></div>
                    <span className="text-[9px] mt-1 text-slate-500 font-medium">Click</span>
                  </div>
                  <div className="flex flex-col items-center group cursor-pointer">
                    <div className="w-4 h-4 rounded-sm bg-indigo-500 border-2 border-white dark:border-slate-900 shadow-sm"></div>
                    <span className="text-[9px] mt-1 text-slate-500 font-medium">Input</span>
                  </div>
                  <div className="flex flex-col items-center group cursor-pointer">
                    <div className="w-4 h-4 rotate-45 bg-amber-500 border-2 border-white dark:border-slate-900 shadow-sm"></div>
                    <span className="text-[9px] mt-1 text-slate-500 font-medium">Navigate</span>
                  </div>
                  <div className="flex flex-col items-center translate-x-12">
                    <span className="material-symbols-outlined text-red-500 text-lg leading-none">close</span>
                    <span className="text-[9px] mt-1 text-red-500 font-bold">Error</span>
                  </div>
                  <div className="flex flex-col items-center translate-x-14">
                    <span className="material-symbols-outlined text-red-500 text-lg leading-none">close</span>
                    <span className="text-[9px] mt-1 text-red-500 font-bold">Diverge</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Internal Thoughts */}
            <div className="timeline-grid bg-slate-50/30 dark:bg-slate-900/30">
              <div className="p-3 border-r border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-slate-400">psychology</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Internal Thoughts</span>
              </div>
              <div className="flex items-center h-16 px-4 gap-8">
                <div className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 max-w-[200px] shadow-sm">
                  <p className="text-[10px] font-mono text-slate-600 dark:text-slate-400 line-clamp-2">
                    "Locating the 'Submit' button on bottom right..."
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 max-w-[200px] shadow-sm ml-12">
                  <p className="text-[10px] font-mono text-slate-600 dark:text-slate-400 line-clamp-2">
                    "Reading cell values in column B (Employee Name)..."
                  </p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded border border-red-200 dark:border-red-900/40 max-w-[200px] shadow-sm ml-8">
                  <p className="text-[10px] font-mono text-red-600 dark:text-red-400 line-clamp-2">
                    "Error: Element not found. Retrying selector..."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="h-12 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 bg-white dark:bg-slate-900 z-40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-slate-400">
            <Button variant="ghost" size="icon" className="h-6 w-6 hover:text-primary">
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-[10px] font-bold uppercase w-12 text-center">Zoom</span>
            <Button variant="ghost" size="icon" className="h-6 w-6 hover:text-primary">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">00:02:45.312</span>
            <span className="text-[10px] text-slate-400">/ 00:05:00.000</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-slate-600">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-blue-600 shadow-sm">
              <Play className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-slate-600">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-slate-400">Speed</span>
            <select
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5 text-[11px] font-medium focus:ring-1 focus:ring-primary outline-none"
            >
              <option>1.0x</option>
              <option>1.5x</option>
              <option>2.0x</option>
              <option>0.5x</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
