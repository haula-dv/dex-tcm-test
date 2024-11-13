import { Typography, useTheme } from "@mui/material";

export const RenderFormError = ({ error }: { error?: string }) => {
	const theme = useTheme();

	return (
		<>
			{error && (
				<Typography
					fontSize={"9px"}
					color={`${theme.palette.error.main} !important`}
					lineHeight={"13px"}
					pt={"4px"}>
					{error ? `${error.charAt(0).toUpperCase()}${error.slice(1)}` : ""}
				</Typography>
			)}
		</>
	);
};
