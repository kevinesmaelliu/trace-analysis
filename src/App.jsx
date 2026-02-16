import { useState } from 'react';
import Header from './components/Header';
import WorkspaceView from './components/WorkspaceView';
import Timeline from './components/Timeline';
import TracePanel from './components/TracePanel';

export default function App() {
  const [selectedRun, setSelectedRun] = useState('Run 2024-02-16 10:30');
  const [environment, setEnvironment] = useState('Production');
  const [model, setModel] = useState('GPT-4');
  const [job, setJob] = useState('Data Analysis');
  const [activeStep, setActiveStep] = useState('10:30:21');
  const [selectedTraceTimestamp, setSelectedTraceTimestamp] = useState('0:00');
  const [tracePositions, setTracePositions] = useState([]);
  const [traceActions, setTraceActions] = useState([]);
  const [traceErrors, setTraceErrors] = useState([]);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 h-screen flex flex-col overflow-hidden">
      <Header
        selectedRun={selectedRun}
        setSelectedRun={setSelectedRun}
        environment={environment}
        setEnvironment={setEnvironment}
        model={model}
        setModel={setModel}
        job={job}
        setJob={setJob}
      />

      <main className="flex flex-1 overflow-hidden gap-4 p-4">
        <div className="flex-1 flex flex-col overflow-hidden gap-4">
          <div className="flex-1 min-h-0 overflow-hidden">
            <WorkspaceView />
          </div>
          <div className="min-h-[176px] overflow-clip shrink-0 rounded-lg bg-white">
            <Timeline
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              tracePositions={tracePositions}
              traceActions={traceActions}
              traceErrors={traceErrors}
              selectedTraceTimestamp={selectedTraceTimestamp}
              setSelectedTraceTimestamp={setSelectedTraceTimestamp}
            />
          </div>
        </div>
        <div className="w-80 overflow-y-auto shrink-0">
          <TracePanel
            activeStep={activeStep}
            selectedTraceTimestamp={selectedTraceTimestamp}
            setSelectedTraceTimestamp={setSelectedTraceTimestamp}
            onTracePositionsChange={setTracePositions}
            onTraceActionsChange={setTraceActions}
            onTraceErrorsChange={setTraceErrors}
          />
        </div>
      </main>
    </div>
  );
}
