import type { RuleProperties } from "json-rules-engine";

export type FieldType = "text" | "number" | "checkbox" | "dropdown" | "date";

export type FieldValue = string | number | boolean;

export interface FieldConfigItem {
  id: string;
  type: FieldType;
  label: string;
  isMandatory: boolean;
  placeholder?: string;
  options?: string[];
}

export interface FieldRuntimeState {
  isVisible: boolean;
  isDisabled: boolean;
  isMandatory: boolean;
  value: FieldValue;
}

export type FieldStates = Record<string, FieldRuntimeState>;

export interface FieldChangeEvent {
  target: {
    value: FieldValue;
  };
}

export type FieldChangeHandler = (event: FieldChangeEvent) => void;

export interface FieldInputProps extends FieldConfigItem, FieldRuntimeState {
  onChange: FieldChangeHandler;
}

export interface FormStoreState {
  fieldStates: FieldStates;
  setFieldValue: (id: string, value: FieldValue) => void;
  updateFieldStates: (ruleResults: RuleResultMap) => void;
  resetForm: () => void;
}

export type RuleActionType =
  | "SHOW_FIELD"
  | "HIDE_FIELD"
  | "DISABLE_FIELD"
  | "MAKE_MANDATORY";

export interface RuleEvent {
  type: RuleActionType | string;
  params?: {
    fieldId?: string;
    [key: string]: unknown;
  };
}

export type RuleDefinition = RuleProperties;

export type RuleResultMap = Record<
  string,
  Omit<FieldRuntimeState, "value">
>;
