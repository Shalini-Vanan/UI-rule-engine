import { create } from 'zustand'
import fieldConfig from '../config/fieldConfig'
import type { FieldStates, FormStoreState } from '../types/form'

// Initialize fieldStates from fieldConfig
const buildInitialFieldStates = () => {
  const states: FieldStates = {};
  fieldConfig.forEach((field) => {
    states[field.id] = {
      isVisible: true,
      isDisabled: false,
      isMandatory: field.isMandatory,
      value: field.type === "checkbox" ? false : "",
    };
  });
  return states;
};

const useFormStore = create<FormStoreState>((set) => ({
  // runtime state per field
  fieldStates: buildInitialFieldStates(),

  // actions
  setFieldValue: (id, value) => set((state) => ({
    fieldStates: {
      ...state.fieldStates,
      [id]: {
        ...state.fieldStates[id],
        value
      }
    }
  })),
  updateFieldStates: (ruleResults) => set((state) => {
    const updated = { ...state.fieldStates };
    Object.entries(ruleResults).forEach(([id, ruleState]) => {
        updated[id] = {
            ...updated[id],
            isVisible: ruleState.isVisible,
            isDisabled: ruleState.isDisabled,
            isMandatory: ruleState.isMandatory,
        };
    });
    return { fieldStates: updated };
  }),
  resetForm: () => set(() => ({ fieldStates: buildInitialFieldStates() }))
}));

export default useFormStore;