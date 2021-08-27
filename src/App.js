import React from 'react';
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CurrencySelector from './components/CurrencySelector';
import ExchangeResult from './components/ExchangeResult';
import SwapVertIcon from '@material-ui/icons/SwapVert';

function App() {

	const url = "http://localhost:4000";

	const [currencyList, updateCurrencyList] = React.useState([]);
	const [baseCurrency, updateBaseCurrency] = React.useState("");
	const [targetCurrency, updateTargetCurrency] = React.useState("");
	const [amount, updateAmount] = React.useState(1.00);
	const [result, updateResult] = React.useState(0);
	const [exchangeRate, updateExchangeRate] = React.useState(0);

	React.useEffect(() => {
		axios.get(url + "/")
		.then(res => updateCurrencyList(res.data))
		.catch(err => console.log(err));
	}, []);

	React.useEffect(() => {
		if(baseCurrency.length > 0 && targetCurrency.length > 0){

			const baseSymbol = baseCurrency.substring(0,3).toLowerCase();
			const targetSymbol = targetCurrency.substring(0,3).toLowerCase();

			axios.post(url + "/", {baseCurrency: baseSymbol, targetCurrency: targetSymbol})
			.then(res => updateExchangeRate(res.data))
			.catch(err => console.log(err));
		}

	}, [baseCurrency, targetCurrency]);

	React.useEffect(() => {
		updateResult(amount*exchangeRate);
	}, [exchangeRate, amount]);

	function handleAmountChange(event) {
		updateAmount(event.target.value);
	}

	function swapCurrencies(event){
		const temp = baseCurrency;
		updateBaseCurrency(targetCurrency);
		updateTargetCurrency(temp);
		event.preventDefault();
	}

	return (
	<div>
		<Header />
		<div className="central-area">
			<CurrencySelector
			currencyList={currencyList}
			selectedCurrency={baseCurrency}
			onChangeCurrency={e => updateBaseCurrency(e.target.value)}
			/>

			<button className="swap-button" onClick={swapCurrencies}> <SwapVertIcon /> </button>

			<CurrencySelector
			currencyList={currencyList}
			selectedCurrency={targetCurrency}
			onChangeCurrency={e => updateTargetCurrency(e.target.value)}
			/>

			<input type="number" className="input-group input-group-lg input" value={amount} onChange={handleAmountChange} />
			
			{
				baseCurrency.length > 0 && targetCurrency.length > 0
				? <ExchangeResult 
					amount={amount}
					result={result}
					baseCurrency={baseCurrency}
					targetCurrency={targetCurrency}
					/>
				: null
			}
		</ div>
		<Footer />
	</div>
	);
}

export default App;
