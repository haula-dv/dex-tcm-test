'use client';
import { useMemo, useState } from 'react';
import Field from './field';

export default function Page() {
	const [sellAmount, setSellAmount] = useState(0);
	const [buyAmount, setBuyAmount] = useState(0);

	const exchangeRate = 100; // Giả sử tỷ lệ là 100

	// Khi người dùng nhập số lượng vào form sell
	const handleSellChange = (value: number) => {
		setSellAmount(value);
		setBuyAmount(value * exchangeRate); // Tính toán số lượng buy tương ứng
	};

	// Khi người dùng nhập số lượng vào form buy
	const handleBuyChange = (value: number) => {
		setBuyAmount(value);
		setSellAmount(value / exchangeRate); // Tính toán số lượng sell tương ứng
	};

	const sellAmountTemp = useMemo(() => {
		return sellAmount * exchangeRate; // Có thể không cần thiết nếu bạn chỉ cần sellAmount
	}, [sellAmount, exchangeRate]);

	const buyAmountTemp = useMemo(() => {
		return buyAmount; // Buy amount đã được tính toán và không cần nhân lại
	}, [buyAmount]);

	return (
		<div>
			<span>Sell</span>
			<Field value={sellAmount} handleChange={handleSellChange} />
			<button
				onClick={() => {
					/* Thêm chức năng nếu cần */
				}}
			>
				Change sell or buy
			</button>

			<span>Buy</span>

			<Field value={buyAmount} handleChange={handleBuyChange} />
		</div>
	);
}
