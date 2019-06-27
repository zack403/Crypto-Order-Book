import React from 'react';
import Navbar from './components/navbar';
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { GetCurrencyPairs } from './services/currencyPairService';


function App() {
  return (
    <>
      <Navbar/>
      <GetCurrencyPairs/>
    </>
  );
}

export default App;
