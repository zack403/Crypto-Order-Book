import React, { useState } from "react";
import { toast } from "react-toastify";



const CurrencyPairDropDdown = ({ currencyPairs }) => {
  const [bids, setBids] = useState();
  const [asks, setAsks] = useState();
  const [loading, setLoading] = useState(false);
  const [toaster, setToaster] = useState(false);

 



  const handleChange = ({ target }) => {
    setLoading(true);
    //Bitstamp server
    let socket = new WebSocket("wss://ws.bitstamp.net");

    //connect to bitstamp server here
    socket.onopen = function(e) {
      console.log("[open] Connection established, send -> server");

      //send to bitstamp server to unsubscribe from the previous selected channel in the dropdown
      socket.send(
        JSON.stringify({
          event: "bts:unsubscribe",
          data: {
            channel: `order_book_${target.value}`
          }
        })
      );

      //send to bitstamp server to subscribe to the newly selected channel in the dropdown
      socket.send(
        JSON.stringify({
          event: "bts:subscribe",
          data: {
            channel: `order_book_${target.value}`
          }
        })
      );
    };

    //bitstamp server message returned here, pass the message to our state
    socket.onmessage = function(event) {
        setToaster(true);     

      //console.log(`[message] Data received: ${event.data} <- server`);
      const response = JSON.parse(event.data);
      const {bids, asks} = response.data;
      setBids(bids);
      setAsks(asks);   
      setLoading(false);
    };
        // display a toast notification
        if(toaster) {
            toast.success('Showing streaming order books (list of asks and bids)');
        } 
   

    //if there was a closed connecton between the browser and the server , or there was a network failure, handle it here
    socket.onclose = function(event) {
      setLoading(false);
      if (event.wasClean) {
        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        alert("[close] Connection died");
      }
    };

    //if there was an error connecting to the server , handle it here..
    socket.onerror = function(error) {
      setLoading(false);
      alert(`[error] ${error.message}`);
    };
  };

  const styles = {
    listStyleType: 'none',
    textAlign: 'right'
 }

 const h2 = {
     marginLeft : '216px'
 }


  return (
    <div className="form-group container">
      <label htmlFor="currencyPair" style={{'fontSize': 20}}>Currency Pair</label>
      <select name="currencyPair" className="form-control" id="currencyPair" onChange={handleChange}>
         <option  value="">Select to show streaming order books (list of bids and asks)</option>
         {currencyPairs.map(({url_symbol, name}) => (
          <option key={url_symbol} value={url_symbol}>
            {name}
          </option>
        ))}
      </select>
      { loading && <div className="spinner"></div> }
      {(bids && asks) && (
        <div className="mt-5 row">
            <div className="col-md-4">
              <h2 style={h2} >Bids</h2>
              {
                  bids.map(bid => (
                      <li style={styles} key={bid[0]}>{bid[1]} BTC @ {bid[0]} USD</li>
                  ))
              }
            </div>
            <div className="col-md-4">
              <h2 style={h2}>Asks</h2>
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
