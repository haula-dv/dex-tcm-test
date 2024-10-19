import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

interface IProps {
	background?: string;
}

export const BarCircularProgress = styled(LinearProgress, {
	shouldForwardProp: (prop) => prop != "background",
})<IProps>(({ theme, background }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.grey[200],
		...theme.applyStyles("dark", {
			backgroundColor: theme.palette.grey[800],
		}),
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: background ?? theme.palette.success.main,
		...theme.applyStyles("dark", {
			backgroundColor: background ?? theme.palette.success.main,
		}),
	},
}));
