import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, ChevronDown, Eye, Keyboard, Mouse, Zap, GitBranch, ThumbsUp, ThumbsDown } from 'lucide-react';
import { formatTraceTime } from '@/utils/timeline';

function getActionIcon(action) {
  switch (action) {
    case 'left_click':
    case 'right_click':
      return <Mouse className="w-3 h-3" />;
    case 'key':
    case 'type':
      return <Keyboard className="w-3 h-3" />;
    case 'screenshot':
      return <Eye className="w-3 h-3" />;
    default:
      return <Zap className="w-3 h-3" />;
  }
}

function getActionLabel(action) {
  const labels = {
    left_click: 'Click',
    right_click: 'Right Click',
    key: 'Key Press',
    type: 'Type',
    screenshot: 'Screenshot',
  };
  return labels[action] || action;
}

function getActionColor(action) {
  switch (action) {
    case 'left_click':
    case 'right_click':
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
    case 'key':
    case 'type':
      return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
    case 'screenshot':
      return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
    default:
      return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
  }
}

export default function TracePanel({
  activeStep,
  selectedTraceTimestamp: selectedTraceTimestampProp,
  setSelectedTraceTimestamp: setSelectedTraceTimestampProp,
  onTracePositionsChange,
  onTraceActionsChange,
  onTraceErrorsChange,
}) {
  const [activeTab, setActiveTab] = useState('trace');
  const [internalTimestamp, setInternalTimestamp] = useState('0:00');
  const [expandedResponses, setExpandedResponses] = useState({});
  const [ratings, setRatings] = useState({});
  const traceContentRef = useRef(null);

  const selectedTraceTimestamp = selectedTraceTimestampProp ?? internalTimestamp;
  const setSelectedTraceTimestamp = setSelectedTraceTimestampProp ?? setInternalTimestamp;

  // 5 logs with positions on the timeline (seconds 0–300). Not evenly spaced.
  const traces = [
    { timelineSeconds: 0, isActive: true, visual: 'Spreadsheet interface visible with formula bar showing "=SUM(B2:B10)". Cell A1 is selected and highlighted.', aiResponse: 'Good! I can see the formula is entered in the formula bar. Now I need to press Enter to execute the formula.', jsonLog: { id: 'toolu_014gtqpzqdMQYqWMgtpin5bF', name: 'anthropic_computer', arguments: { text: 'Return', action: 'key' } } },
    { timelineSeconds: 35, isActive: false, visual: 'Error message "#ERROR!" displayed in cell A1. Formula bar shows problematic sheet reference.', aiResponse: 'I can see there\'s an error (#ERROR!) in cell A1. This suggests there might be an issue with the sheet reference syntax. Let me click on cell A1 to see the formula and correct it.', jsonLog: { id: 'toolu_01XJ4gW5dYcPC8z8jF8NGe', name: 'anthropic_computer', arguments: { action: 'left_click', coordinate: [93, 157] } } },
    { timelineSeconds: 90, isActive: false, visual: 'Spreadsheet with data grid containing columns A (ID), B (Name), C (Value). 10 rows of employee data visible.', aiResponse: 'The spreadsheet has loaded successfully. I can see it contains employee salary data with 10 records. Let me analyze the data structure and identify any formatting issues.', jsonLog: { id: 'toolu_045TuVwXyZaBcDeFgHiJk', name: 'anthropic_computer', arguments: { action: 'screenshot' } } },
    { timelineSeconds: 180, isActive: false, hasError: true, errorMessage: 'Tool execution failed: timeout after 30s. The formula bar did not respond to the key press.', visual: 'Formula bar is now active with cursor positioned for input. Background is slightly highlighted in blue.', aiResponse: 'I need to navigate to the formula bar and enter a SUM formula to calculate the total of the salary column. Let me click on the formula input field to begin.', jsonLog: { id: 'toolu_025JkL9mNoPqRsTuVwXyZ', name: 'anthropic_computer', arguments: { action: 'left_click', coordinate: [300, 45] } } },
    { timelineSeconds: 300, isActive: false, visual: 'Cell A1 now displays the calculated value "2847.50" in green font, indicating successful formula execution.', aiResponse: 'Excellent! The formula has been executed successfully. The total sum of all salaries in column B is 2847.50.', jsonLog: { id: 'toolu_056UvWxYzAbCdEfGhIjKl', name: 'anthropic_computer', arguments: { action: 'screenshot' } } },
  ];

  const displayTimestamps = traces.map((t) => formatTraceTime(t.timelineSeconds));

  useEffect(() => {
    if (typeof onTracePositionsChange === 'function') onTracePositionsChange(traces.map((t) => t.timelineSeconds));
    if (typeof onTraceActionsChange === 'function') onTraceActionsChange(traces.map((t) => t.jsonLog?.arguments?.action));
    if (typeof onTraceErrorsChange === 'function') onTraceErrorsChange(traces.map((t) => t.hasError ?? false));
  }, []);

  useEffect(() => {
    if (!selectedTraceTimestamp || !traceContentRef.current) return;
    const el = traceContentRef.current.querySelector(
      `[data-trace-timestamp="${selectedTraceTimestamp}"]`
    );
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [selectedTraceTimestamp]);

  const handleCopyJSON = (jsonLog) => {
    navigator.clipboard.writeText(JSON.stringify(jsonLog, null, 2));
  };

  const isResponseExpanded = (timestamp) => expandedResponses[timestamp] ?? true;

  const toggleResponseExpanded = (timestamp) => {
    setExpandedResponses(prev => ({
      ...prev,
      [timestamp]: !(prev[timestamp] ?? true)
    }));
  };

  const handleRating = (timestamp, rating) => {
    setRatings(prev => ({
      ...prev,
      [timestamp]: prev[timestamp] === rating ? null : rating
    }));
  };

  const handleBranch = (timestamp) => {
    console.log('Branch from:', timestamp);
    // TODO: Implement branching logic
  };

  return (
    <aside className="w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full overflow-hidden">
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

        <TabsContent value="trace" ref={traceContentRef} className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 m-0">
          {traces.map((trace, index) => {
            const displayTime = displayTimestamps[index];
            const isSelected = selectedTraceTimestamp === displayTime;
            return (
            <div
              key={displayTime}
              data-trace-timestamp={displayTime}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedTraceTimestamp(displayTime)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedTraceTimestamp(displayTime); } }}
              className={`rounded-lg border overflow-hidden transition-all cursor-pointer ${
                isSelected
                  ? 'border-primary/40 dark:border-primary/40 bg-primary/[0.02] dark:bg-primary/5 ring-2 ring-primary/20'
                  : 'border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Timestamp Header */}
              <div
                className={`px-3 py-2 pl-4 border-b border-inherit ${
                  isSelected ? 'bg-primary/10 dark:bg-primary/5' : ''
                }`}
              >
                <span className={`text-xs font-medium ${isSelected ? 'text-primary font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                  {displayTime}
                </span>
              </div>

              {/* Error Section */}
              {trace.hasError && trace.errorMessage && (
                <div className="px-3 py-2 pl-4 border-b border-inherit bg-red-50 dark:bg-red-950/30">
                  <div className="font-medium text-red-700 dark:text-red-400 text-xs mb-1 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-200 dark:bg-red-900/50 text-red-600 dark:text-red-300 text-[10px] font-bold">!</span>
                    Error
                  </div>
                  <p className="text-[11px] leading-relaxed text-red-600 dark:text-red-300">{trace.errorMessage}</p>
                </div>
              )}

              {/* Agent Action Section */}
              <div className={`px-3 py-2 pl-4 border-b border-inherit text-xs text-slate-600 dark:text-slate-300 ${isSelected ? '' : 'text-slate-500 dark:text-slate-400'}`}>
                <div className="font-medium text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                  <Eye className="w-3 h-3" />
                  Agent Action
                </div>
                {(trace.jsonLog?.arguments?.action || trace.jsonLog?.action) && (
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium ${getActionColor(trace.jsonLog?.arguments?.action ?? trace.jsonLog?.action)}`}>
                      {getActionIcon(trace.jsonLog?.arguments?.action ?? trace.jsonLog?.action)}
                      {getActionLabel(trace.jsonLog?.arguments?.action ?? trace.jsonLog?.action)}
                    </span>
                  </div>
                )}
                <p className="text-[11px] leading-relaxed">{trace.visual}</p>
              </div>

              {/* AI Response Section */}
              <div className={`px-3 py-2 pl-4 border-b border-inherit text-xs text-slate-600 dark:text-slate-300 ${isSelected ? '' : 'text-slate-500 dark:text-slate-400'}`}>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleResponseExpanded(displayTime); }}
                  className="w-full flex items-center justify-between font-medium text-slate-700 dark:text-slate-200 mb-1 hover:opacity-80 transition-opacity"
                >
                  <span>AI Response</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isResponseExpanded(displayTime) ? 'rotate-180' : ''}`}
                  />
                </button>
                {isResponseExpanded(displayTime) && (
                  <p className="text-[11px] leading-relaxed">{trace.aiResponse}</p>
                )}
              </div>

              {/* JSON Log Section */}
              <div className="px-3 py-2 pl-4 bg-slate-950 dark:bg-slate-950 relative border-b border-inherit">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-slate-400 text-xs">JSON Log</div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleCopyJSON(trace.jsonLog); }}
                    className="p-1 hover:bg-slate-800 rounded transition-colors text-slate-400 hover:text-slate-300"
                    title="Copy JSON"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <pre className="text-[10px] font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap word-break break-word pr-8">
                  {JSON.stringify(trace.jsonLog, null, 2)}
                </pre>
              </div>

              {/* Action Buttons Section */}
              <div className="px-3 py-2 pl-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); handleBranch(displayTime); }}
                  className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Branch from this point"
                >
                  <GitBranch className="w-3 h-3" />
                  Branch
                </button>

                <div className="flex items-center gap-1 ml-auto">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRating(displayTime, 'up'); }}
                    className={`p-1 rounded transition-colors ${
                      ratings[displayTime] === 'up'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                    }`}
                    title="Good response"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRating(displayTime, 'down'); }}
                    className={`p-1 rounded transition-colors ${
                      ratings[displayTime] === 'down'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                    }`}
                    title="Bad response"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
          })}
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
