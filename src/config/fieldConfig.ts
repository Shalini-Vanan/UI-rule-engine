import type { FieldConfigItem } from "../types/form";

const fields: FieldConfigItem[] = [
  {
    id: "employmentType",
    type: "dropdown",
    label: "Employment Type",
    options: ["", "Full-time", "Part-time", "Contract", "Freelance"],
    isMandatory: true,
  },
  {
    id: "contractDuration",
    type: "number",
    label: "Contract Duration (months)",
    isMandatory: false,
    placeholder: "Enter duration in months",
  },
  {
    id: "companyName",
    type: "text",
    label: "Company Name",
    isMandatory: true,
    placeholder: "Enter company name",
  },
  {
    id: "isRemote",
    type: "checkbox",
    label: "Remote Work",
    isMandatory: false,
  },
  {
    id: "officeLocation",
    type: "text",
    label: "Office Location",
    isMandatory: false,
    placeholder: "Enter office location",
  },
  {
    id: "startDate",
    type: "date",
    label: "Start Date",
    isMandatory: true,
  },
  {
    id: "salary",
    type: "number",
    label: "Expected Salary (LPA)",
    isMandatory: true,
    placeholder: "Enter expected salary",
  },
];

export default fields;