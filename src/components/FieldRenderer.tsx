import TextField from "./fields/TextField";
import NumberField from "./fields/NumberField";
import CheckBoxField from "./fields/CheckBoxField";
import DropdownField from "./fields/DropdownField";
import DateField from "./fields/DateField";

import useFormStore from "../store/formStore";
import type { FieldChangeEvent, FieldConfigItem, FieldInputProps } from "../types/form";

interface FieldRendererProps {
    fieldConfig: FieldConfigItem;
}

function FieldRenderer({ fieldConfig }: FieldRendererProps) {
    const fieldState = useFormStore((state) => state.fieldStates[fieldConfig.id]);
    const setFieldValue = useFormStore((state) => state.setFieldValue);

    if (!fieldState.isVisible) return null;

    function handleChange(event: FieldChangeEvent) {
        setFieldValue(fieldConfig.id, event.target.value);
    }

    const props: FieldInputProps = {
        ...fieldConfig,
        ...fieldState,
        onChange: handleChange
    }
    let fieldComponent;
    switch (fieldConfig.type) {
        case "text":
            fieldComponent = <TextField {...props} />;
            break;
        case "number":
            fieldComponent = <NumberField {...props} />;
            break;
        case "checkbox":
            fieldComponent = <CheckBoxField {...props} />;
            break;
        case "dropdown":
            fieldComponent = <DropdownField {...props} />;
            break;
        case "date":
            fieldComponent = <DateField {...props} />;
            break;
        default:
            return null;
    }
    return (
        <div className={`field-group ${fieldState.isDisabled ? "field-disabled" : ""}`}>
            <label htmlFor={fieldConfig.id} className="field-label">
                {fieldConfig.label}
                {fieldState.isMandatory && <span className="mandatory">*</span>}
            </label>
            {fieldComponent}
        </div>
    );
}

export default FieldRenderer;