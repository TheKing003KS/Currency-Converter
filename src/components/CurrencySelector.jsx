import React from 'react'

function currencySelector(props) {
  
  return (
	<div>
		<select className="form-select" value={props.selectedCurrency} onChange={props.onChangeCurrency}>
			<option value="">Choose a Currency</option>
			{props.currencyList.map(option => (
				<option key={option} value={option}>{option}</option>
			))}
		</select>
	</div>
  );
}

export default currencySelector;
