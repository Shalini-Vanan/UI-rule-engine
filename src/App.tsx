import { useState } from 'react'
import defaultRules from "./rules/sampleRules.json";
import type { RuleDefinition } from "./types/form";

import RuleEngineForm from './components/RuleEngineForm'
import RuleEditor from './components/RuleEditor';

function App() {
  const [rules, setRules] = useState<RuleDefinition[]>(defaultRules as RuleDefinition[]);
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">UI Rule Engine</h1>
        <p className="app-desc">
          JSON-driven dynamic form — field visibility, disabled state, and mandatory rules
          evaluated at runtime. No hardcoded if/else.
        </p>
      </header>
      <main className="app-layout">
        <div className="col-form">
          <RuleEngineForm rules={rules} />
        </div>
        <div className="col-editor">
          <RuleEditor rules={rules} onRulesChange={setRules} />
        </div>
      </main>
    </div>
  )
}

export default App
