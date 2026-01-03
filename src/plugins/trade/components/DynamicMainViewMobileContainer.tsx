import { memo } from "react";
interface IProps {
    symbol: string;
}

function PureMainViewMobileContainer({ symbol }: IProps) {
    return <div>DynamicMainViewMobileContainer</div>;
}

export const MainViewMobileContainer = memo(PureMainViewMobileContainer, (prevProps, nextProps) => {
    return prevProps.symbol === nextProps.symbol;
})