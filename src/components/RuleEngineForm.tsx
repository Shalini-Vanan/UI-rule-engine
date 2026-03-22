import fieldConfig from "../config/fieldConfig";
import useRuleEngine from "../hooks/useRuleEngine";
import useFormStore from "../store/formStore";
import FieldRenderer from "./FieldRenderer";
import type { RuleDefinition } from "../types/form";

interface RuleEngineFormProps {
  rules: RuleDefinition[];
}

function RuleEngineForm({ rules }: RuleEngineFormProps) {
  useRuleEngine(rules);
  const resetForm = useFormStore((state) => state.resetForm);
 
  return (
    <div className="form-card">
      <div className="form-header">
        <h2 className="form-title">Job Application</h2>
        <p className="form-subtitle">Fields update dynamically based on your input</p>
      </div>
 
      <div className="form-body">
        {fieldConfig.map((field) => (
          <FieldRenderer key={field.id} fieldConfig={field} />
        ))}
      </div>
 
      <div className="form-footer">
        <button className="btn-reset" onClick={resetForm}>Reset</button>
        <button className="btn-submit" onClick={() => alert("Submitted!")}>Submit</button>
      </div>
    </div>
  );
}

export default RuleEngineForm;