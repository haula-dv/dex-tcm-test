import { Stack } from "@mui/material";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { PasswordElement } from "react-hook-form-mui";

interface InputFieldProps<V extends FieldValues> {
  formContext: UseFormReturn<V>;
  name: Path<V>;
  type?: "text" | "number" | "email";
  label?: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
}

const InputPasswordField = <V extends FieldValues>({
  name,
  type = "text",
  label = "",
  required = false,
  placeholder = "",
  rows = 1,
  disabled = false,
  formContext,
}: InputFieldProps<V>) => {
  return (
    <Stack width={"100%"} className="input-field">
      {/* {label ? (
        <CustomFormLabel htmlFor={name}>
          {label} <span className="required">{required ? "*" : ""}</span>
        </CustomFormLabel>
      ) : null} */}

      <PasswordElement
        name={name}
        control={formContext.control}
        multiline={rows > 1}
        minRows={rows}
        maxRows={rows}
        fullWidth
        type={type}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        variant="filled"
        label={label}
      />
    </Stack>
  );
};

export default InputPasswordField;
