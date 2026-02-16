import { Button } from '@/components/ui/button';

export default function WorkspaceView() {
  return (
    <div className="flex-1 min-h-0 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col relative">
      <div className="p-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
        <span className="text-xs font-medium text-slate-500 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">screenshot</span>
          Workspace View: Google Sheets
        </span>
        <Button variant="link" className="text-[11px] text-primary font-semibold">
          Full View
        </Button>
      </div>
      <div className="flex-1 min-h-0 flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-6 relative overflow-hidden">
        <img
          alt="Agent Workspace Screenshot"
          className="max-w-full max-h-full object-contain rounded border border-slate-200 dark:border-slate-800 shadow-xl"
          src="/workspace-screenshot.png"
        />
      </div>
    </div>
  );
}
