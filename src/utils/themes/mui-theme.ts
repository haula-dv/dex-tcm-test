"use client";
import * as locales from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";
import _ from "lodash";
import components from "./custom-theme/Components";
import { DarkThemeColors } from "./custom-theme/DarkThemeColors";
import { baseDarkTheme, baselightTheme } from "./custom-theme/DefaultColors";
import { LightThemeColors } from "./custom-theme/LightThemeColors";
import { darkshadows, shadows } from "./custom-theme/shadow";
import typography from "./custom-theme/Typography";

const themeSelector = {
	activeMode: "dark",
	activeDir: "lt",
};

export const BuildTheme = (config: any) => {
	const themeOptions = LightThemeColors.find((theme) => theme.name === config.theme);
	const darkthemeOptions = DarkThemeColors.find((theme) => theme.name === config.theme);
	const defaultTheme = themeSelector.activeMode === "dark" ? baseDarkTheme : baselightTheme;
	const defaultShadow = themeSelector.activeMode === "dark" ? darkshadows : shadows;
	const themeSelect = themeSelector.activeMode === "dark" ? darkthemeOptions : themeOptions;

	const baseMode = {
		palette: {
			mode: themeSelector.activeMode,
		},

		shape: {
			borderRadius: 6,
		},

		shadows: defaultShadow,
		typography: typography,
	};

	const theme = createTheme(
		_.merge({}, baseMode, defaultTheme, locales, themeSelect, {
			direction: config.direction,
		}),
	);

	theme.components = components(theme) as any;

	return theme;
};

const ThemeSettings = () => {
	const activDir = themeSelector.activeDir;
	const activeTheme = "BLUE_THEME";

	const theme = BuildTheme({
		direction: activDir,
		theme: activeTheme,
	});

	return theme;
};

export const theme = ThemeSettings();

declare module "@mui/material/Button" {
	interface ButtonPropsVariantOverrides {
		filledTonal: true;
		outlinedTonal: true;
		textLink: true;
	}

	interface ButtonPropsSizeOverrides {
		xsmall: true;
	}
	interface ButtonPropsColorOverrides {
		darkPrimary: true;
		white: true;
		dark: true;
		darkWhite: true;
		blue: true;
	}
}

declare module "@mui/material/IconButton" {
	interface IconButtonPropsColorOverrides {
		white: true;
		grey: true;
		cpPrimary: true;
	}
}

declare module "@mui/material/Chip" {
	interface ChipPropsVariantOverrides {
		filledTonal: true;
	}

	interface ChipPropsColorOverrides {
		white: true;
	}
}

declare module "@mui/material/Checkbox" {
	interface CheckboxPropsColorOverrides {
		darkPrimary: true;
	}
}

declare module "@mui/material/TextField" {
	interface TextFieldPropsSizeOverrides {
		xsmall: true;
	}
}
