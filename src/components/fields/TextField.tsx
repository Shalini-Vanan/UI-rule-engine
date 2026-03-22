import type { FieldInputProps } from "../../types/form";

function TextField({ id, value, isDisabled, isMandatory, onChange }: FieldInputProps) {
    return <input 
        type="text" 
        id={id} 
        value={String(value ?? "")}
        required={isMandatory} 
        disabled={isDisabled} 
        onChange={onChange}
        className={`field-input ${isDisabled ? "disabled" : ""}`}
    />;
}

export default TextField;