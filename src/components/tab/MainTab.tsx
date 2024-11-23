import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import TabContext from "@mui/lab/TabContext";
import { Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { memo, ReactElement, ReactNode, useState } from "react";

interface ITab {
  label: string;
  value: string | number;
}

interface IProps {
  tabs: ITab[];
  onChange?: (tab: ITab) => void;
  fullWidth?: boolean;
  children?: ReactElement;
  height?: string;
  defaultValue?: string | number;
  rightSideTab?: ReactNode;
}

const MainTab = ({
  tabs,
  onChange,
  fullWidth,
  height,
  children,
  defaultValue,
  rightSideTab,
}: IProps) => {
  const [value, setValue] = useState<any>(
    defaultValue ? defaultValue : tabs[0].value
  );

  const handleChange = (val: ITab) => {
    setValue(val.value);
    onChange && onChange(val);
  };

  return (
    <TabContext value={value ?? defaultValue}>
      <Stack
        className="tab-header"
        direction={"row"}
        pb={{ xs: "6px", md: "10px" }}
        width={"100%"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={"10px"} width={"100%"}>
          {tabs.map((item, index) => {
            return (
              <TabItem
                actived={value === item.value}
                key={index}
                fullWidth={fullWidth}
                height={height}
                onClick={(e) => handleChange(item)}
              >
                {item.label}
              </TabItem>
            );
          })}
        </Stack>

        {rightSideTab}
      </Stack>
      <>{children}</>
    </TabContext>
  );
};

export default memo(MainTab);

interface IItabCustom {
  actived: boolean;
  height?: string;
}

export const TabItem = styled(Button, {
  shouldForwardProp: (prop) => prop !== "actived",
})<IItabCustom>(({ theme, actived, height }) => ({
  borderRadius: TSizes.borderRadius,
  height: height ? height : TSizes.buttonHeightSmall,
  minHeight: height ? height : TSizes.buttonHeightSmall,
  fontSize: "13px",
  fontWeight: 600,
  color: theme.palette.grey[500],
  ...(actived && {
    backgroundColor: setColorThemeMode(theme.palette.common.white, "#322B27"),
    color: setColorThemeMode(theme.palette.grey[600], theme.palette.grey[100]),
  }),

  "&:hover": {
    backgroundColor: setColorThemeMode(theme.palette.common.white, "#322B27"),
  },

  "& svg": {
    color: setColorThemeMode(theme.palette.grey[600], theme.palette.grey[100]),
  },

  [theme.breakpoints.down("md")]: {
    fontSize: "12px",
    fontWeight: 500,
  },
}));
