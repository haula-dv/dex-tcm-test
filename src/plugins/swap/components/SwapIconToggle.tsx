import { MainIconButton } from "@/components/button/MainIconButton";
import theme from "@/utils/themes/mui-theme";
import { IconArrowsSort } from "@tabler/icons-react";

interface IProps {
  toggleSwapType: () => void;
}

export const ButtonSwapToggle = ({ toggleSwapType }: IProps) => {
  return (
    <div style={{ margin: "-20px auto -24px auto" }}>
      <MainIconButton
        color="inherit"
        sx={{ border: `4px solid ${theme.palette.common.white}` }}
        onClick={toggleSwapType}
      >
        <IconArrowsSort size={"1rem"} />
      </MainIconButton>
    </div>
  );
};
