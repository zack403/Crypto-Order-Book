import React from 'react';

const CurrencyPairDropDdown = ({currencyPairs}) => {
    return (
        <div className="form-group container">
            <label htmlFor="currencyPair">Currency Pair</label>
                <select name="currencyPair" className="form-control" id="currencyPair">
                <option value=""/>
                {
                    currencyPairs.map(currency => (
                    <option key={currency.url_symbol} value={currency.url_symbol}>
                        {currency.name}
                    </option>
                ))}
                </select>
        </div>
    );
}

export default CurrencyPairDropDdown;