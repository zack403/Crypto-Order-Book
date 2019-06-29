import React, {useState ,useEffect} from 'react';
import axios from 'axios';
import CurrencyPairDropDdown from '../components/currencyPairDropdown';

export function GetCurrencyPairs() {
    const [currencyPairs, setCurrencyPairs] = useState([]);

    
    useEffect(() => {
        const fetchCurrencyPair = async () => {
            try {
                const {data} = await axios.get('https://www.bitstamp.net/api/v2/trading-pairs-info/');
                setCurrencyPairs(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCurrencyPair();
    }, []);
  
  return <CurrencyPairDropDdown currencyPairs={currencyPairs} />;
}
