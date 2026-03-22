import type { FieldInputProps } from "../../types/form";

function DropdownField({ id, value, onChange, isDisabled, isMandatory, options = [] }: FieldInputProps) {
    const selectValue = typeof value === "string" || typeof value === "number" ? value : "";

    return (
        <select
            id={id}
            value={selectValue}
            onChange={onChange}
            disabled={isDisabled}
            required={isMandatory}
            className={`field-input ${isDisabled ? "disabled" : ""}`}
        >
            {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt === "" ? "-- Select --" : opt}
                </option>
            ))}
        </select>
    );
}

export default DropdownField;