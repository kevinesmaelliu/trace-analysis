import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header({ selectedRun, setSelectedRun, environment, setEnvironment, model, setModel, job, setJob }) {
  return (
    <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-0.5">
            Select Run
          </label>
          <select
            value={selectedRun}
            onChange={(e) => setSelectedRun(e.target.value)}
            className="bg-transparent border-none p-0 text-sm font-medium focus:ring-0 cursor-pointer outline-none"
          >
            <option>Run 2024-02-16 10:30</option>
            <option>Run 2024-02-15 14:20</option>
          </select>
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>

        <div className="flex flex-col">
          <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-0.5">
            Environment
          </label>
          <select
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            className="bg-transparent border-none p-0 text-sm font-medium focus:ring-0 cursor-pointer outline-none"
          >
            <option>Production</option>
            <option>Staging</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-0.5">
            Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="bg-transparent border-none p-0 text-sm font-medium focus:ring-0 cursor-pointer outline-none"
          >
            <option>GPT-4</option>
            <option>GPT-3.5-Turbo</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-0.5">
            Job
          </label>
          <select
            value={job}
            onChange={(e) => setJob(e.target.value)}
            className="bg-transparent border-none p-0 text-sm font-medium focus:ring-0 cursor-pointer outline-none"
          >
            <option>Data Analysis</option>
            <option>Web Scraper</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-slate-500">
          <Settings className="h-5 w-5" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
          JD
        </div>
      </div>
    </header>
  );
}
