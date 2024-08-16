import { Avatar, Typography } from "@mui/material";
import { useMemo } from "react";

interface IProps {
  symbol: string;
  sizes?: string;
  fontSize?: string;
}

export const NoToken = ({ symbol, sizes, fontSize = "12px" }: IProps) => {
  // Generate a random background color using useMemo to avoid recalculating on every render
  const randomBgColor = useMemo(() => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, []);

  return (
    <Avatar
      sx={{
        height: sizes ? sizes : "36px",
        width: sizes ? sizes : "36px",
        backgroundColor: randomBgColor,
      }}
    >
      <Typography
        fontSize={fontSize}
        fontWeight={600}
        sx={{ textTransform: "uppercase" }}
      >
        {symbol.substring(0, 3)}
      </Typography>
    </Avatar>
  );
};
