import React, { useState } from "react";

const CurrencyPairDropDdown = ({ currencyPairs }) => {
  const [bids, setBids] = useState();
  const [asks, setAsks] = useState();

  const handleChange = ({ target }) => {
    let socket = new WebSocket("wss://ws.bitstamp.net");
    socket.onopen = function(e) {
      alert("[open] Connection established, send -> server");
      socket.send(
        JSON.stringify({
          event: "bts:unsubscribe",
          data: {
            channel: `order_book_${target.value}`
          }
        })
      );
      socket.send(
        JSON.stringify({
          event: "bts:subscribe",
          data: {
            channel: `order_book_${target.value}`
          }
        })
      );
    };
    socket.onmessage = function(event) {
      //console.log(`[message] Data received: ${event.data} <- server`);
      const response = JSON.parse(event.data);
      const {bids, asks} = response.data;
      setBids(bids);
      setAsks(asks);      
    };
    socket.onclose = function(event) {
      if (event.wasClean) {
        alert(
          `[close] Connection closed cleanly, code=${event.code} reason=${
            event.reason
          }`
        );
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        alert("[close] Connection died");
      }
    };

    socket.onerror = function(error) {
      alert(`[error] ${error.message}`);
    };
  };

  const styles = {
    listStyleType: 'none'
}


  return (
    <div className="form-group container">
      <label htmlFor="currencyPair">Currency Pair</label>
      <select
        name="currencyPair"
        className="form-control"
        id="currencyPair"
        onChange={handleChange}
      >
        <option value="" />
        {currencyPairs.map(currency => (
          <option key={currency.url_symbol} value={currency.url_symbol}>
            {currency.name}
          </option>
        ))}
      </select>

      {bids && asks && (
        <div className="mt-5 row">
            <div className="col-md-6">
              <h2>Bids</h2>
              {
                  bids.map(bid => (
                      <li style={styles} key={bid[0]}>{bid[1]} BTC @ {bid[0]} USD</li>
                  ))
              }
            </div>
            <div className="col-md-6">
              <h2>Asks</h2>
              {
                   asks.map(ask => (
                    <li style={styles} key={ask[0]}>{ask[1]} BTC @ {ask[0]} USD</li>
                ))
              }
            </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyPairDropDdown;
