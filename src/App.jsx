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

      <main className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          <WorkspaceView />
          <Timeline activeStep={activeStep} setActiveStep={setActiveStep} />
        </div>
        <TracePanel activeStep={activeStep} />
      </main>
    </div>
  );
}
