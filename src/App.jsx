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

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col overflow-hidden">
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
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden mb-4">
            <WorkspaceView />
          </div>
          <div className="h-32 overflow-hidden shrink-0">
            <Timeline activeStep={activeStep} setActiveStep={setActiveStep} />
          </div>
        </div>
        <div className="w-80 overflow-y-auto shrink-0">
          <TracePanel activeStep={activeStep} />
        </div>
      </main>
    </div>
  );
}
