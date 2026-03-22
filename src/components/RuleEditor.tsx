import { useState } from "react";
import type { ChangeEvent } from "react";
import type { RuleDefinition } from "../types/form";

interface RuleEditorProps {
  rules: RuleDefinition[];
  onRulesChange: (rules: RuleDefinition[]) => void;
}

function RuleEditor({ rules, onRulesChange }: RuleEditorProps) {
  const [text, setText] = useState(JSON.stringify(rules, null, 2));
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value) as RuleDefinition[];
      setError(null);
      onRulesChange(parsed);
    } catch {
      setError("Invalid JSON — fix to apply rules");
    }
  }

  return (
    <div className="rule-editor">
      <p className="rule-editor-title">Rule Config (JSON)</p>
      <p className="rule-editor-hint">Edit rules live — form reacts instantly</p>
      <textarea
        className={`rule-textarea ${error ? "rule-textarea-error" : ""}`}
        value={text}
        onChange={handleChange}
        rows={18}
        spellCheck={false}
      />
      {error && <p className="rule-error">{error}</p>}
    </div>
  );
}

export default RuleEditor;