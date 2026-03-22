import type { ChangeEvent } from "react";
import type { FieldInputProps } from "../../types/form";

function CheckBoxField({ id, value, onChange, isMandatory, isDisabled }: FieldInputProps) {
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        onChange({
            target: {
                value: event.target.checked
            }
        });
    }
    return (
        <div className="checkbox-wrapper">
            <input
                type="checkbox"
                id={id}
                checked={!!value}
                onChange={handleChange}
                disabled={isDisabled}
                required={isMandatory}
                className="field-checkbox"
            />
            <span className="checkbox-custom" />
        </div>
    )
}

export default CheckBoxField;