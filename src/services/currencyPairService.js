import React, {useState ,useEffect} from 'react';
import axios from 'axios';
import CurrencyPairDropDdown from '../components/currencyPairDropdown';
import {toast} from 'react-toastify';

export function GetCurrencyPairs() {
    const [currencyPairs, setCurrencyPairs] = useState([]);
    
    useEffect(() => {
        const fetchCurrencyPair = async () => {
            try {
                const {data} = await axios.get('https://www.bitstamp.net/api/v2/trading-pairs-info/');
                setCurrencyPairs(data);
            } catch (error) {
                toast.error(`${error}, unable to fetch currency pairs. Check your internet connection`);
            }
        };
        fetchCurrencyPair();
    }, []);
  
  return <CurrencyPairDropDdown currencyPairs={currencyPairs} />;
}
