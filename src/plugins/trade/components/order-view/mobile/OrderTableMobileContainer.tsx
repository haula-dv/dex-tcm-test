import { useOrderStream } from "@orderly.network/hooks";
import { OrdersView } from "@orderly.network/react";
import { API, OrderEntity, OrderStatus } from "@orderly.network/types";
import { memo } from "react";

interface IProps {
  orderBookStatus: OrderStatus;
  symbol: string;
}
const OrderTableMobileContainer = ({ orderBookStatus, symbol }: IProps) => {
  const [ordersUntyped, { isLoading }] = useOrderStream({
    status: orderBookStatus,
  });

  const orders = ordersUntyped as (API.Order | API.AlgoOrder)[];

  const cancelAlgoOrder = async (orderId: number, symbol: string) => {};
  const cancelOrder = async (orderId: number, symbol: string) => {};
  const cancelTPSLOrder = async (
    orderId: number,
    rootAlgoOrderId: number
  ) => {};
  const editAlgoOrder = async (orderId: string, order: OrderEntity) => {};
  const editOrder = async (orderId: string, order: OrderEntity) => {};
  const loadMore = async () => {};

  return (
    <>
      {orderBookStatus == "COMPLETED" ? (
        <>12</>
      ) : (
        <OrdersView
          cancelAlgoOrder={cancelAlgoOrder}
          cancelOrder={cancelOrder}
          cancelTPSLOrder={cancelTPSLOrder}
          dataSource={orders}
          editAlgoOrder={editAlgoOrder}
          editOrder={editOrder}
          isLoading={false}
          symbol={symbol}
          loadMore={loadMore}
        />
      )}
    </>
  );
};

export default memo(OrderTableMobileContainer);
