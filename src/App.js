import React from 'react';
import Navbar from './components/navbar';
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetCurrencyPairs } from './services/currencyPairService';


function App() {
  return (
    <>
      <ToastContainer />
      <Navbar/>
      <GetCurrencyPairs/>
    </>
  );
}

export default App;
