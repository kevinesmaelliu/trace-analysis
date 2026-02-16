import { Button } from '@/components/ui/button';

export default function WorkspaceView() {
  return (
    <div className="flex-1 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col relative mb-4">
      <div className="p-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
        <span className="text-xs font-medium text-slate-500 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">screenshot</span>
          Workspace View: Google Sheets
        </span>
        <Button variant="link" className="text-[11px] text-primary font-semibold">
          Full View
        </Button>
      </div>
      <div className="flex-1 flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-6 relative overflow-hidden">
        <img
          alt="Agent Workspace Screenshot"
          className="max-w-full max-h-full rounded border border-slate-200 dark:border-slate-800 shadow-xl"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3WmV0UTMwY0yHom3RppYFUlkUEMqr7c3jz61SjfQTqd-j8aenFMU-mNMSgm9bcy6ctxYHFz_E_NIzSADgeu-FGvR9_QMCEuz3bOumnJgn1F1s-cH0FvuTFMVMZJ9mvg5DElWNx_pKQ-OYksSfE9c4OzublcECcB_969v0XGOlVxIktmYJ4bLOsag3otxj4NFlWtxhEoTGfNLV4h3NubYrog587M2kKvpWFcZiYoCKImfFV7_Bi0Yr6AomeNPw1FGHqV3Y8TqtQmI"
        />
      </div>
    </div>
  );
}
