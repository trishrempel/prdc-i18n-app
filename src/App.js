import "./App.css";
import React, { useEffect, useState, useCallback } from "react";

function App() {
  const [formattedName, setFormattedName] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedQuantity, setFormattedQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [formattedAmount, setFormattedAmount] = useState("");
  const [formattedCurrency, setFormattedCurrency] = useState("");

  const updateFormattedAmount = useCallback(() => {
    if (isNaN(amount) || amount === "") {
      setFormattedAmount("");
      setFormattedCurrency("");
    } else {
      setFormattedAmount(amount.toString());
      setFormattedCurrency(`$${amount.toString()} ${currency}`);
    }
  }, [amount, currency]);

  useEffect(() => {
    updateFormattedAmount();
  }, [amount, currency, updateFormattedAmount]);

  const handleNameChange = (e) => {
    const name = e.target.value;
    if (name === "") {
      setFormattedName("");
    } else {
      setFormattedName(`Hello ${name}!`);
    }
  };

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    if (isNaN(date.getTime())) {
      setFormattedDate("");
    } else {
      setFormattedDate(
        `${
          date.getUTCMonth() + 1
        }/${date.getUTCDate()}/${date.getUTCFullYear()}`
      );
    }
  };

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value);
    if (isNaN(quantity)) {
      setFormattedQuantity("");
    } else {
      setFormattedQuantity(
        `There ${quantity === 1 ? "is 1 item" : `are ${quantity} items`}`
      );
    }
  };

  const handleAmountChange = (e) => {
    const amount = Number(e.target.value);
    setAmount(amount);
  };

  const handleCurrencyChange = (e) => {
    const currency = e.target.value;
    setCurrency(currency);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>i18n is for Everyone</h1>
        <div className="form">
          <label htmlFor="date">Enter a name:</label>
          <input id="name" type="text" onChange={handleNameChange} />
          <label htmlFor="formatted-name">Formatted name:</label>
          <div id="formatted-name">{formattedName}</div>
          <label htmlFor="date">Enter a date:</label>
          <input id="date" type="date" onChange={handleDateChange} />
          <label htmlFor="formatted-date">Formatted date:</label>
          <div id="formatted-date">{formattedDate}</div>
          <label htmlFor="currency">Currency:</label>
          <select name="currency" id="currency" onChange={handleCurrencyChange}>
            <option value="USD">US Dollar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="JPY">Japanese Yen (JPY)</option>
          </select>
          <label htmlFor="quantity">Quantity:</label>
          <input id="quantity" type="number" onChange={handleQuantityChange} />
          <label htmlFor="formatted-quantity">Formatted Quantity:</label>
          <div id="formatted-quantity">{formattedQuantity}</div>
          <label htmlFor="amount">Amount:</label>
          <input id="amount" type="number" onChange={handleAmountChange} />
          <label htmlFor="formatted-amount">Formatted Amount:</label>
          <div id="formatted-amount">{formattedAmount}</div>
          <label htmlFor="formatted-currency">Formatted Currency:</label>
          <div id="formatted-currency">{formattedCurrency}</div>
        </div>
      </header>
    </div>
  );
}

export default App;
