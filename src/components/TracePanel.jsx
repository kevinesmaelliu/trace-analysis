import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TracePanel({ activeStep }) {
  const [activeTab, setActiveTab] = useState('trace');

  const traces = [
    {
      time: '10:30:21',
      type: 'AI Response',
      icon: 'smart_toy',
      content: 'The table has 25 rows of employee data. I will now filter the data to find employees in the Engineering department.',
      isActive: true,
      json: JSON.stringify(
        {
          action: 'filter_data',
          params: {
            column: 'Department',
            value: 'Engineering',
          },
        },
        null,
        2
      ),
    },
    {
      time: '10:30:18',
      type: 'Visual Marker',
      icon: 'visibility',
      content: 'Analyzed table structure.',
      isActive: false,
    },
    {
      time: '10:30:24',
      type: 'Execution Error',
      icon: 'error',
      content: 'Failed to find selector "#submit-btn". Retrying in 2s...',
      isActive: false,
      isError: true,
    },
  ];

  const activeTrace = traces.find((t) => t.time === activeStep);

  return (
    <aside className="w-[380px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
        <TabsList className="w-full rounded-none border-b border-slate-200 dark:border-slate-800 bg-transparent p-0 h-auto">
          <TabsTrigger
            value="trace"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 text-xs font-bold uppercase tracking-wider"
          >
            Trace
          </TabsTrigger>
          <TabsTrigger
            value="analysis"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 text-xs font-bold uppercase tracking-wider"
          >
            Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trace" className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 m-0">
          {traces.map((trace) => (
            <div key={trace.time} className={`space-y-2 ${!trace.isActive ? 'opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-200' : ''}`}>
              <div className={`text-[10px] font-bold uppercase tracking-widest ${trace.isError ? 'text-red-400' : 'text-primary'}`}>
                {trace.time}
              </div>

              {trace.isActive ? (
                <div className="rounded-lg border-2 border-primary/20 dark:border-primary/30 bg-primary/[0.02] dark:bg-primary/5 overflow-hidden">
                  <div className="p-3 border-b border-primary/10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-sm text-primary">{trace.icon}</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{trace.type}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">{trace.content}</p>
                  </div>
                  {trace.json && (
                    <div className="p-3 bg-slate-900">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-sm text-slate-400">code</span>
                        <span className="text-xs font-bold text-slate-400">JSON Log</span>
                      </div>
                      <pre className="text-[10px] font-mono text-emerald-400 overflow-x-auto">{trace.json}</pre>
                    </div>
                  )}
                </div>
              ) : (
                <div className={`rounded-lg border p-3 ${trace.isError ? 'border-red-200 dark:border-red-900/40 bg-red-50/30 dark:bg-red-900/10' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`material-symbols-outlined text-sm ${trace.isError ? 'text-red-500' : 'text-slate-400'}`}>
                      {trace.icon}
                    </span>
                    <span className={`text-xs font-semibold ${trace.isError ? 'text-red-700 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'}`}>
                      {trace.type}
                    </span>
                  </div>
                  <p className={`text-xs ${trace.isError ? 'text-red-600 dark:text-red-400 font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
                    {trace.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </TabsContent>

        <TabsContent value="analysis" className="flex-1 overflow-y-auto custom-scrollbar p-4 m-0">
          <div className="text-center text-slate-400 py-8">
            <p className="text-sm">Analysis view coming soon</p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex gap-2">
        <Button variant="outline" className="flex-1 text-[11px] font-bold uppercase tracking-wider">
          Export Logs
        </Button>
        <Button variant="outline" className="flex-1 text-[11px] font-bold uppercase tracking-wider">
          Debug View
        </Button>
      </div>
    </aside>
  );
}
