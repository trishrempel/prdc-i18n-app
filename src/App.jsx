import "./App.css";
import React, { useEffect, useState, useCallback, useMemo } from "react";

const FILE_TYPES = ["file", "image", "video"];

function App() {
  const [formattedFileType, setFormattedFileType] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedQuantity, setFormattedQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [formattedAmount, setFormattedAmount] = useState("");
  const [formattedCurrency, setFormattedCurrency] = useState("");

  const FileTypeOptions = useMemo(() => {
    return FILE_TYPES.map((fileType) => (
      <option key={fileType} value={fileType}>
        {fileType}
      </option>
    ));
  }, []);

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

  const handleFileTypeChange = (e) => {
    const fileType = e.target.value;
    setFormattedFileType(`The ${fileType} is ready.`);
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
        <h1>Internationalization is for Everyone</h1>
        <div className="form">
          <label htmlFor="file-type">Select a file type:</label>
          <select
            name="file-type"
            id="file-type"
            onChange={handleFileTypeChange}
          >
            {FileTypeOptions}
          </select>
          <label htmlFor="formatted-file-type">Formatted file type:</label>
          <div id="formatted-file-type">{formattedFileType}</div>
          <label htmlFor="date">Enter a date:</label>
          <input id="date" type="date" onChange={handleDateChange} />
          <label htmlFor="formatted-date">Formatted date:</label>
          <div id="formatted-date">{formattedDate}</div>
          <label htmlFor="quantity">Enter a quantity:</label>
          <input id="quantity" type="number" onChange={handleQuantityChange} />
          <label htmlFor="formatted-quantity">Formatted quantity:</label>
          <div id="formatted-quantity">{formattedQuantity}</div>
          <label htmlFor="currency">Select a currency:</label>
          <select name="currency" id="currency" onChange={handleCurrencyChange}>
            <option value="USD">US Dollar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="JPY">Japanese Yen (JPY)</option>
          </select>
          <label htmlFor="amount">Enter an amount:</label>
          <input id="amount" type="number" onChange={handleAmountChange} />
          <label htmlFor="formatted-amount">Formatted amount:</label>
          <div id="formatted-amount">{formattedAmount}</div>
          <label htmlFor="formatted-currency">Formatted currency:</label>
          <div id="formatted-currency">{formattedCurrency}</div>
        </div>
        <p>
          Slide deck available on the{" "}
          <a
            className="App-link"
            href="https://www.prairiedevcon.com/winnipeg.html"
          >
            Prairie Dev Con Winnipeg website
          </a>
          .
        </p>
      </header>
    </div>
  );
}

export default App;
