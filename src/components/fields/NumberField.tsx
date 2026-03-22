import type { FieldInputProps } from "../../types/form";

function NumberField({ id, value, isMandatory, isDisabled, onChange }: FieldInputProps) {
    return <input 
        type="number" 
        id={id} 
        value={typeof value === "number" || typeof value === "string" ? value : ""}
        required={isMandatory} 
        disabled={isDisabled} 
        onChange={onChange}
        className={`field-input ${isDisabled ? "disabled" : ""}`}
    />;
}

export default NumberField;