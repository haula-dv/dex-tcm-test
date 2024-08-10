import { MainIconButton } from "@/components/button/MainIconButton";
import { IconDots } from "@tabler/icons-react";
import { useState } from "react";

export const MainnestList = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MainIconButton
        variant="filledTonal"
        color="inherit"
        id="mainnest-button"
        aria-controls={open ? "mainnest-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <IconDots />
      </MainIconButton>

      {/* <MainPopup
        id="mainnest-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "mainnest-button",
        }}
      >
        1233
      </MainPopup> */}
    </>
  );
};
