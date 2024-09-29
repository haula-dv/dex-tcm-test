// Một hàm để chuyển đổi các tham số thành chuỗi
export function toQueryString(params: Record<string, any>): string {
	// Chuyển đổi tất cả các giá trị thành chuỗi, và loại bỏ các thuộc tính undefined
	const stringParams: Record<string, string> = Object.fromEntries(
		Object.entries(params).map(([key, value]) => [key, value === undefined ? '' : String(value)]),
	);

	return new URLSearchParams(stringParams).toString();
}

const formatNumber = (num: number) => {
	// Divide the number by 100 to insert two decimal places
	const formattedNum = (num / 100).toFixed(2);

	// Split the number into integer and decimal parts
	const parts = formattedNum.split('.');

	// Add commas to the integer part
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	// Combine the integer and decimal parts with a period
	return parts.join('.');
};

export const totalEstPrice = (quantity: number, price: number, baseDecimals: number) => {
	const total = (quantity * price) / 1000;
	const formattedPrice = parseFloat(total.toFixed(baseDecimals + 2));

	// Format số với dấu phẩy và 1 chữ số thập phân
	const a = formattedPrice.toString().replace('.', '');
	const b = Number(a);
	return formatNumber(b);
};
