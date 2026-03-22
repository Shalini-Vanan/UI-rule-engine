import { useEffect, useRef } from "react";
import useFormStore from "../store/formStore";
import evaluateRules from "../rules/ruleEngine";
import defaultRules from "../rules/sampleRules.json";
import type { FieldValue, RuleDefinition } from "../types/form";

const useRuleEngine = (rules: RuleDefinition[] = defaultRules as RuleDefinition[]) => {
  const updateFieldStates = useFormStore((state) => state.updateFieldStates);

  const formValuesKey = useFormStore((state) =>
    JSON.stringify(
      Object.fromEntries(
        Object.entries(state.fieldStates).map(([id, s]) => [id, s.value])
      )
    )
  );

  // stable ref to avoid updateFieldStates in deps
  const updateRef = useRef(updateFieldStates);
  updateRef.current = updateFieldStates;

  const rulesKey = JSON.stringify(rules);

  useEffect(() => {
    const formValues = JSON.parse(formValuesKey) as Record<string, FieldValue>;
    evaluateRules(formValues, rules).then((results) => {
      updateRef.current(results); // ← via ref, not direct dependency
    });
  }, [formValuesKey, rulesKey]); // ← only formValuesKey and rulesKey, nothing else
};

export default useRuleEngine;