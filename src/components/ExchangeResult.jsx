import React from "react";

function ExchangeResult(props){

    return (
        <div className="output-area">
            <h3> {props.amount} {props.baseCurrency.substring(0,3)} =</h3>
            <h3>{props.result} {props.targetCurrency.substring(0,3)}</h3>
        </div>
    );
}
export default ExchangeResult;