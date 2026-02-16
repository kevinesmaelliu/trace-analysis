import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TracePanel({ activeStep }) {
  const [activeTab, setActiveTab] = useState('trace');

  const traces = [
    {
      timestamp: '10:30:21',
      isActive: true,
      visual: 'Spreadsheet interface visible with formula bar showing "=SUM(B2:B10)". Cell A1 is selected and highlighted.',
      aiResponse: 'Good! I can see the formula is entered in the formula bar. Now I need to press Enter to execute the formula.',
      jsonLog: {
        id: 'toolu_014gtqpzqdMQYqWMgtpin5bF',
        name: 'anthropic_computer',
        arguments: {
          text: 'Return',
          action: 'key',
        },
      },
    },
    {
      timestamp: '10:30:19',
      isActive: false,
      visual: 'Error message "#ERROR!" displayed in cell A1. Formula bar shows problematic sheet reference.',
      aiResponse: 'I can see there\'s an error (#ERROR!) in cell A1. This suggests there might be an issue with the sheet reference syntax. Let me click on cell A1 to see the formula and correct it.',
      jsonLog: {
        id: 'toolu_01XJ4gW5dYcPC8z8jF8NGe',
        name: 'anthropic_computer',
        arguments: {
          action: 'left_click',
          coordinate: [93, 157],
        },
      },
    },
    {
      timestamp: '10:30:17',
      isActive: false,
      visual: 'Spreadsheet with data grid containing columns A (ID), B (Name), C (Value). 10 rows of employee data visible. Column widths appear optimal.',
      aiResponse: 'The spreadsheet has loaded successfully. I can see it contains employee salary data with 10 records. Let me analyze the data structure and identify any formatting issues.',
      jsonLog: {
        id: 'toolu_045TuVwXyZaBcDeFgHiJk',
        name: 'anthropic_computer',
        arguments: {
          action: 'screenshot',
        },
      },
    },
    {
      timestamp: '10:30:15',
      isActive: false,
      visual: 'Formula bar is now active with cursor positioned for input. Background is slightly highlighted in blue.',
      aiResponse: 'I need to navigate to the formula bar and enter a SUM formula to calculate the total of the salary column. Let me click on the formula input field to begin.',
      jsonLog: {
        id: 'toolu_025JkL9mNoPqRsTuVwXyZ',
        name: 'anthropic_computer',
        arguments: {
          action: 'left_click',
          coordinate: [300, 45],
        },
      },
    },
    {
      timestamp: '10:30:14',
      isActive: false,
      visual: 'Formula bar displaying the typed formula "=SUM(B2:B10)" character by character as input continues.',
      aiResponse: 'Perfect! I\'m entering the SUM formula to calculate the total salary across all 10 employee records in column B.',
      jsonLog: {
        id: 'toolu_034aBcDeFgHiJkLmNoPqRs',
        name: 'anthropic_computer',
        arguments: {
          text: '=SUM(B2:B10)',
          action: 'type',
        },
      },
    },
    {
      timestamp: '10:30:13',
      isActive: false,
      visual: 'Cell A1 now displays the calculated value "2847.50" in green font, indicating successful formula execution.',
      aiResponse: 'Excellent! The formula has been executed successfully. The total sum of all salaries in column B is 2847.50.',
      jsonLog: {
        id: 'toolu_056UvWxYzAbCdEfGhIjKl',
        name: 'anthropic_computer',
        arguments: {
          action: 'screenshot',
        },
      },
    },
    {
      timestamp: '10:30:12',
      isActive: false,
      visual: 'Spreadsheet application window showing title "Employee_Data.xlsx" in the title bar. Menu bar and toolbar are visible.',
      aiResponse: 'The spreadsheet file "Employee_Data.xlsx" has been opened successfully. I can see the data is already loaded with employee information. Now I need to examine the data structure carefully.',
      jsonLog: {
        id: 'toolu_067VwXyZaBcDeFgHiJkLmN',
        name: 'anthropic_computer',
        arguments: {
          action: 'screenshot',
        },
      },
    },
    {
      timestamp: '10:30:11',
      isActive: false,
      visual: 'Column headers are visible: ID (column A), Name (column B), Salary (column C), Department (column D), Start_Date (column E).',
      aiResponse: 'I can see the column structure clearly now. The spreadsheet contains employee IDs, names, and their corresponding salary data. I should sort by department to better organize the data.',
      jsonLog: {
        id: 'toolu_078WxYzAbCdEfGhIjKlMnO',
        name: 'anthropic_computer',
        arguments: {
          action: 'left_click',
          coordinate: [234, 78],
        },
      },
    },
    {
      timestamp: '10:30:10',
      isActive: false,
      visual: 'Cell D2 is now selected (Department column). Dropdown arrow appears next to the column header indicating sort/filter options available.',
      aiResponse: 'I\'ve clicked on the Department column to access the filtering options. This will allow me to organize the employees by their respective departments more efficiently.',
      jsonLog: {
        id: 'toolu_089XyZaBcDeFgHiJkLmNoP',
        name: 'anthropic_computer',
        arguments: {
          action: 'left_click',
          coordinate: [256, 78],
        },
      },
    },
    {
      timestamp: '10:30:09',
      isActive: false,
      visual: 'Dropdown menu is open showing department options: Engineering (3), Marketing (2), Sales (4), HR (1).',
      aiResponse: 'A dropdown menu has appeared showing the different departments in the spreadsheet. I can see the count of employees in each department. Let me select "Engineering" to filter the data.',
      jsonLog: {
        id: 'toolu_090YzaBcDeFgHiJkLmNoPq',
        name: 'anthropic_computer',
        arguments: {
          action: 'left_click',
          coordinate: [95, 112],
        },
      },
    },
    {
      timestamp: '10:30:08',
      isActive: false,
      visual: 'Spreadsheet now filtered showing only Engineering department employees. 3 employee records are visible with their complete data.',
      aiResponse: 'Great! I\'ve successfully filtered the data to show only employees in the Engineering department. There are 3 engineering staff members with salaries totaling 950.00.',
      jsonLog: {
        id: 'toolu_101ZaBcDeFgHiJkLmNoPqR',
        name: 'anthropic_computer',
        arguments: {
          action: 'screenshot',
        },
      },
    },
    {
      timestamp: '10:30:07',
      isActive: false,
      visual: 'Mouse cursor hovering over "Export" button in the toolbar. Button shows blue highlight on hover.',
      aiResponse: 'The data filtering is complete. Now I should export the Engineering department data to a separate file for the report. Let me click the Export button.',
      jsonLog: {
        id: 'toolu_112AbCdEfGhIjKlMnoPqRs',
        name: 'anthropic_computer',
        arguments: {
          action: 'left_click',
          coordinate: [189, 34],
        },
      },
    },
  ];

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

        <TabsContent value="trace" className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 m-0">
          {traces.map((trace) => (
            <div
              key={trace.timestamp}
              className={`rounded-lg border overflow-hidden transition-all ${
                trace.isActive
                  ? 'border-primary/40 dark:border-primary/40 bg-primary/[0.02] dark:bg-primary/5 ring-2 ring-primary/20'
                  : 'border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Timestamp Header */}
              <div
                className={`px-3 py-2 pl-4 border-b border-inherit ${
                  trace.isActive ? 'bg-primary/10 dark:bg-primary/5' : ''
                }`}
              >
                <span className={`text-xs font-medium ${trace.isActive ? 'text-primary font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                  {trace.timestamp}
                </span>
              </div>

              {/* Visual Section */}
              <div className={`px-3 py-2 pl-4 border-b border-inherit text-xs text-slate-600 dark:text-slate-300 ${trace.isActive ? '' : 'text-slate-500 dark:text-slate-400'}`}>
                <div className="font-medium text-slate-700 dark:text-slate-200 mb-1">Visual</div>
                <p className="text-[11px] leading-relaxed">{trace.visual}</p>
              </div>

              {/* AI Response Section */}
              <div className={`px-3 py-2 pl-4 border-b border-inherit text-xs text-slate-600 dark:text-slate-300 ${trace.isActive ? '' : 'text-slate-500 dark:text-slate-400'}`}>
                <div className="font-medium text-slate-700 dark:text-slate-200 mb-1">AI Response</div>
                <p className="text-[11px] leading-relaxed">{trace.aiResponse}</p>
              </div>

              {/* JSON Log Section */}
              <div className="px-3 py-2 pl-4 bg-slate-950 dark:bg-slate-950">
                <div className="font-medium text-slate-400 mb-1 text-xs">JSON Log</div>
                <pre className="text-[10px] font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap word-break break-word">
                  {JSON.stringify(trace.jsonLog, null, 2)}
                </pre>
              </div>
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
