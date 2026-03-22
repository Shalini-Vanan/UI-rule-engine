import { Engine } from "json-rules-engine";
import fieldConfig from "../config/fieldConfig";
import type {
  FieldValue,
  RuleDefinition,
  RuleEvent,
  RuleResultMap,
} from "../types/form";

// build base defaults from fieldConfig
const buildDefaults = () => {
  const defaults: RuleResultMap = {};
  fieldConfig.forEach((field) => {
    defaults[field.id] = {
      isVisible: true,
      isDisabled: false,
      isMandatory: field.isMandatory,
    };
  });
  return defaults;
};

const evaluateRules = async (
  formValues: Record<string, FieldValue>,
  rules: RuleDefinition[]
): Promise<RuleResultMap> => {
  // always start fresh from defaults every evaluation
  const result = buildDefaults();

  if (!rules || rules.length === 0) return result;

  try {
    const engine = new Engine();
    rules.forEach((rule) => engine.addRule(rule));

    const { events, failureEvents } = await engine.run({ ...formValues });

    // handle passing rules
    (events as RuleEvent[]).forEach((event) => {
      const { type, params } = event;
      const fieldId = params?.fieldId;
      if (!fieldId) return;
      if (!result[fieldId]) return;

      switch (type) {
        case "SHOW_FIELD":
          result[fieldId].isVisible = true;
          break;
        case "HIDE_FIELD":
          result[fieldId].isVisible = false;
          break;
        case "DISABLE_FIELD":
          result[fieldId].isDisabled = true;
          break;
        case "MAKE_MANDATORY":
          result[fieldId].isMandatory = true;
          break;
        default:
          break;
      }
    });

    // handle failing rules — reverse the effect
    (failureEvents as RuleEvent[]).forEach((event) => {
      const { type, params } = event;
      const fieldId = params?.fieldId;
      if (!fieldId) return;
      if (!result[fieldId]) return;

      switch (type) {
        case "SHOW_FIELD":
          result[fieldId].isVisible = false; // rule failed → hide
          break;
        case "HIDE_FIELD":
          result[fieldId].isVisible = true;  // rule failed → show
          break;
        case "DISABLE_FIELD":
          result[fieldId].isDisabled = false; // rule failed → enable
          break;
        case "MAKE_MANDATORY":
          // revert to base isMandatory from fieldConfig
          const base = fieldConfig.find((f) => f.id === fieldId);
          result[fieldId].isMandatory = base ? base.isMandatory : false;
          break;
        default:
          break;
      }
    });

  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown rule engine error";
    console.warn("Rule evaluation error:", message);
  }

  return result;
};

export default evaluateRules;