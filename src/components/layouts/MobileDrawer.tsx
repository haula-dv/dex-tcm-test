import { themeSelectorState } from "@/common/stores/common";
import { MainButton } from "@/components/button/MainButton";
import { TLocalStorage } from "@/utils/constants/key_store";
import { setColorThemeMode } from "@/utils/helpers";
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    useTheme,
} from "@mui/material";
import { IconMoonStars, IconSun, IconX } from "@tabler/icons-react";
import { setZustandValue } from "nes-zustand";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "zustand";
import Logo from "../icons/Logo";

interface IMobileDrawerProps {
    open: boolean;
    onClose: () => void;
    navItems: {
        label: string;
        to: string;
        actived: string[];
    }[];
}

export const MobileDrawer = ({
    open,
    onClose,
    navItems,
}: IMobileDrawerProps) => {
    const theme = useTheme();
    const pathname = usePathname();
    const themeSelector = useStore(themeSelectorState, (state) => state.value);

    // Handle change theme mode
    const handleChangeTheme = () => {
        localStorage.setItem(
            TLocalStorage.DEX_THEME_MODE,
            themeSelector.activeMode == "light" ? "dark" : "light"
        );
        setZustandValue(themeSelectorState, (prev: any) => {
            return {
                ...prev,
                activeMode: prev.activeMode == "light" ? "dark" : "light",
            };
        });

        location.reload();
    };

    return (
        <Drawer
            anchor={"left"}
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: "100%",
                    height: "100%",
                    backgroundColor: theme.palette.background.default,
                    backgroundImage: "none",
                },
            }}
        >
            <Box p={2} pb={6} height="100%" display="flex" flexDirection="column">
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mb={4}
                >
                    <Box onClick={onClose}>
                        <Link href={"/trading"}>
                            <Logo width="80px" height="40px" />
                        </Link>
                    </Box>

                    <IconButton onClick={onClose}>
                        <IconX />
                    </IconButton>
                </Stack>

                <List sx={{ flexGrow: 1 }}>
                    {navItems.map((item) => {
                        const isActive = item.actived.includes(pathname);
                        return (
                            <ListItem key={item.label} disablePadding>
                                <Link
                                    href={item.to}
                                    style={{ width: "100%" }}
                                    onClick={onClose}
                                >
                                    <ListItemButton
                                        sx={{
                                            borderRadius: "8px",
                                            mb: 1,
                                            backgroundColor: isActive
                                                ? setColorThemeMode(
                                                    theme.palette.primary.light,
                                                    "rgba(255, 255, 255, 0.08)"
                                                )
                                                : "transparent",
                                        }}
                                    >
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                fontWeight: isActive ? 700 : 500,
                                                color: isActive
                                                    ? theme.palette.primary.main
                                                    : theme.palette.text.primary,
                                            }}
                                        />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        );
                    })}
                </List>

                <Box mt={2}>
                    <MainButton
                        fullWidth
                        variant="outlined"
                        onClick={handleChangeTheme}
                        startIcon={
                            themeSelector.activeMode == "light" ? (
                                <IconSun />
                            ) : (
                                <IconMoonStars />
                            )
                        }
                        color={setColorThemeMode("darkGrey", "white")}
                        sx={{
                            borderColor: theme.palette.divider,
                            justifyContent: "center",
                        }}
                    >
                        {themeSelector.activeMode == "light" ? "Light Mode" : "Dark Mode"}
                    </MainButton>
                </Box>
            </Box>
        </Drawer>
    );
};
