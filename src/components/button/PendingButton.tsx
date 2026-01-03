import { Button } from "@mui/material";
import { useState } from "react";
import IconLoading from "../icons/loading";

export default function PendingButton({
    disabled,
    onClick,
    children,
}: {
    disabled?: boolean;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(false);

    return (
        <Button
            variant="contained"
            fullWidth
            disabled={disabled || loading}
            onClick={async (event) => {
                setLoading(true);
                try {
                    await onClick(event);
                } finally {
                    setLoading(false);
                }
            }}
        >
            {loading && <IconLoading />} {children}
        </Button>
    );
}