import type { FieldInputProps } from "../../types/form";

function DateField({ id, value, onChange, isDisabled, isMandatory }: FieldInputProps) {
  return (
    <input
      type="date"
      id={id}
      value={typeof value === "string" || typeof value === "number" ? value : ""}
      onChange={onChange}
      disabled={isDisabled}
      required={isMandatory}
      className={`field-input ${isDisabled ? "disabled" : ""}`}
    />
  );
}
 
export default DateField;