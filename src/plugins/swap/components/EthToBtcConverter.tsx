// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const EthToBtcConverter = () => {
// 	const [ethToBtcRate, setEthToBtcRate] = useState(null);
// 	const [btcAmount, setBtcAmount] = useState<any>(null);

// 	useEffect(() => {
// 		// Lấy tỷ giá ETH/BTC từ Coingecko
// 		const fetchExchangeRate = async () => {
// 			try {
// 				const response = await axios.get(
// 					'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=btc',
// 				);
// 				const rate = response.data.ethereum.btc;
// 				setEthToBtcRate(rate);
// 			} catch (error) {
// 				console.error('Error fetching exchange rate:', error);
// 			}
// 		};

// 		fetchExchangeRate();
// 	}, []);

// 	// Hàm tính toán số BTC nhận được khi hoán đổi 1 ETH
// 	const calculateBtcAmount = () => {
// 		if (ethToBtcRate) {
// 			setBtcAmount(12 * ethToBtcRate);
// 		}
// 	};

// 	console.log(ethToBtcRate);

// 	return (
// 		<div style={{ background: '#fff' }}>
// 			<h1>Convert 12 ETH to BTC</h1>
// 			{ethToBtcRate ? (
// 				<div>
// 					<p>Current ETH to BTC rate: {ethToBtcRate}</p>
// 					<button onClick={calculateBtcAmount}>Convert</button>
// 					{btcAmount && <p>1 ETH = {btcAmount} BTC</p>}
// 				</div>
// 			) : (
// 				<p>Loading exchange rate...</p>
// 			)}
// 		</div>
// 	);
// };

// export default EthToBtcConverter;

import axios from 'axios';
import { useEffect, useState } from 'react';

const EthToBtcConverter = () => {
	const [rate, setRate] = useState<any>(null);
	const [amount, setAmount] = useState<any>('');
	const [token1, setToken1] = useState('ethereum'); // Token mặc định là ETH
	const [token2, setToken2] = useState('bitcoin'); // Token mặc định là BTC

	useEffect(() => {
		// Hàm lấy tỷ giá giữa hai token từ Coingecko
		const fetchExchangeRate = async () => {
			try {
				const response = await axios.get(
					`https://api.coingecko.com/api/v3/simple/price?ids=${token1},${token2}&vs_currencies=usd`,
				);
				const token1ToUSD = response.data[token1].usd;
				const token2ToUSD = response.data[token2].usd;
				const exchangeRate = token1ToUSD / token2ToUSD;
				setRate(exchangeRate);
			} catch (error) {
				console.error('Error fetching exchange rate:', error);
			}
		};

		fetchExchangeRate();
	}, [token1, token2]);

	// Hàm tính toán số lượng token2 nhận được khi đổi từ token1
	const calculateAmount = () => {
		if (rate && amount) {
			return (amount * rate).toFixed(6); // Kết quả số lượng token2
		}
		return 0;
	};

	return (
		<div style={{ background: '#fff' }}>
			<h1>Convert between Tokens</h1>

			<div>
				<label>
					Enter amount of {token1.toUpperCase()}:
					<input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
				</label>

				<label>
					Choose Token 1:
					<select value={token1} onChange={(e) => setToken1(e.target.value)}>
						<option value="ethereum">Ethereum (ETH)</option>
						<option value="tether">Tether (USDT)</option>
						<option value="binancecoin">Binance Coin (BNB)</option>
					</select>
				</label>

				<label>
					Choose Token 2:
					<select value={token2} onChange={(e) => setToken2(e.target.value)}>
						<option value="bitcoin">Bitcoin (BTC)</option>
						<option value="tether">Tether (USDT)</option>
						<option value="binancecoin">Binance Coin (BNB)</option>
					</select>
				</label>

				<button onClick={calculateAmount}>Convert</button>
			</div>

			{rate && (
				<p>
					{amount} {token1.toUpperCase()} = {calculateAmount()} {token2.toUpperCase()}
				</p>
			)}
		</div>
	);
};

export default EthToBtcConverter;
