import { TSizes } from "@/utils/themes/custom-theme/sizes";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

export interface ISelectFieldValue {
  value: string | number;
  label: string | number;
}

interface IProps {
  options: ISelectFieldValue[];
  defaltValue?: string | any;
  width?: string;
  handleChange?: (value: any) => void;
}

export const BaseSelectField = ({
  options,
  defaltValue,
  width = "auto",
  handleChange,
}: IProps) => {
  const [value, setValue] = useState<any>(defaltValue ?? options[0].value);

  const onChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as any);
    handleChange && handleChange(event.target.value as any);
  };

  return (
    <FormControl sx={{ maxWidth: "auto", width: width }}>
      <Custom
        size="small"
        labelId="side-select-label"
        id="side-select"
        value={value}
        onChange={onChange as any}
        MenuProps={{ className: "menu-form-control" }}
      >
        {options.length > 0 &&
          options.map((opt, index) => (
            <MenuItem key={index} value={opt.value} sx={{ fontSize: "12px" }}>
              {opt.label}
            </MenuItem>
          ))}
      </Custom>
    </FormControl>
  );
};

const Custom = styled(Select)(({ theme }) => ({
  borderRadius: TSizes.borderRadius,
  height: "34px",
  fontSize: "12px !important",
}));
