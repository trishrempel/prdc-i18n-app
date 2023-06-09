/* eslint-disable jsx-a11y/anchor-has-content */
import "./App.css";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  Suspense,
} from "react";
import { useTranslation, Trans } from "react-i18next";
import LoadingSpinner from "./components/LoadingSpinner";

const FILE_TYPES = ["file", "image", "video"];
const CURRENCIES = ["USD", "EUR", "JPY"];

function App() {
  const { t, i18n } = useTranslation();
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
        {t(`file-type-${fileType}`)}
      </option>
    ));
  }, [t]);

  const CurrencyOptions = useMemo(() => {
    let currencyNames;
    try {
      currencyNames = new Intl.DisplayNames(i18n.language, {
        type: "currency",
      });
    } catch {
      currencyNames = new Intl.DisplayNames(i18n.resolvedLanguage, {
        type: "currency",
      });
    }
    return CURRENCIES.map((currency) => (
      <option key={currency} value={currency}>
        {`${currencyNames.of(currency)} (${currency})`}
      </option>
    ));
  }, [i18n.language, i18n.resolvedLanguage]);

  const updateFormattedAmount = useCallback(() => {
    if (isNaN(amount) || amount === "") {
      setFormattedAmount("");
      setFormattedCurrency("");
    } else {
      try {
        setFormattedAmount(amount.toLocaleString(i18n.language));
        setFormattedCurrency(
          amount.toLocaleString(i18n.language, {
            style: "currency",
            currency,
            currencyDisplay: "narrowSymbol",
          })
        );
      } catch {}
    }
  }, [amount, currency, i18n.language]);

  useEffect(() => {
    updateFormattedAmount();
  }, [amount, currency, updateFormattedAmount]);

  const handleLocaleChange = (e) => {
    i18n.changeLanguage(e.target.value);
    setFormattedFileType("");
    setFormattedDate("");
    setFormattedQuantity("");
    setFormattedAmount("");
    setFormattedCurrency("");
  };

  const handleFileTypeChange = (e) => {
    const fileType = e.target.value;
    setFormattedFileType(t(`formatted-file-type-${fileType}`));
  };

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    if (isNaN(date.getTime())) {
      setFormattedDate("");
    } else {
      try {
        setFormattedDate(
          date.toLocaleDateString(i18n.language, {
            timeZone: "UTC",
            dateStyle: "long",
          })
        );
      } catch {}
    }
  };

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value);
    if (isNaN(quantity)) {
      setFormattedQuantity("");
    } else {
      try {
        setFormattedQuantity(
          t("formatted-quantity", {
            count: quantity,
            formattedCount: quantity.toLocaleString(i18n.language),
          })
        );
      } catch {}
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
    <Suspense fallback={LoadingSpinner}>
      <div className="App" dir={i18n.dir()}>
        <header className="App-header">
          <h1>{t("heading")}</h1>
          <div className="form">
            <label htmlFor="locale">{t("label-locale")}</label>
            <input
              id="locale"
              type="text"
              onChange={handleLocaleChange}
              defaultValue={i18n.language}
            />
            <label htmlFor="file-type">{t("label-file-type")}</label>
            <select
              name="file-type"
              id="file-type"
              onChange={handleFileTypeChange}
            >
              {FileTypeOptions}
            </select>
            <label htmlFor="formatted-file-type">
              {t("label-formatted-file-type")}
            </label>
            <div id="formatted-file-type">{formattedFileType}</div>
            <label htmlFor="date">{t("label-date")}</label>
            <input id="date" type="date" onChange={handleDateChange} />
            <label htmlFor="formatted-date">{t("label-formatted-date")}</label>
            <div id="formatted-date">{formattedDate}</div>
            <label htmlFor="quantity">{t("label-quantity")}</label>
            <input
              id="quantity"
              type="number"
              onChange={handleQuantityChange}
            />
            <label htmlFor="formatted-quantity">
              {t("label-formatted-quantity")}
            </label>
            <div id="formatted-quantity">{formattedQuantity}</div>
            <label htmlFor="currency">{t("label-currency")}</label>
            <select
              name="currency"
              id="currency"
              onChange={handleCurrencyChange}
            >
              {CurrencyOptions}
            </select>
            <label htmlFor="amount">{t("label-amount")}</label>
            <input id="amount" type="number" onChange={handleAmountChange} />
            <label htmlFor="formatted-amount">
              {t("label-formatted-amount")}
            </label>
            <div id="formatted-amount">{formattedAmount}</div>
            <label htmlFor="formatted-currency">
              {t("label-formatted-currency")}
            </label>
            <div id="formatted-currency">{formattedCurrency}</div>
          </div>
          <p>
            <Trans
              i18nKey="slide-deck"
              components={{
                a: (
                  <a
                    className="App-link"
                    href="https://www.prairiedevcon.com/winnipeg.html"
                  />
                ),
              }}
            />
          </p>
        </header>
      </div>
    </Suspense>
  );
}

export default App;
