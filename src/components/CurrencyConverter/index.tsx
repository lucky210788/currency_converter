import React, {useState, useEffect} from 'react';
import {api} from "../../api";
import styled from 'styled-components';
import {ConverterLine} from '../ConverterLine';
import {ButtonChange} from '../ButtonChange';
import {Spinner} from '../Spinner';

const StyledDiv = styled.div`
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.05);
  width: 320px;
  margin: 20px auto;
  padding: 20px;
`;

type ConversionRates = {
  [currency: string]: number;
};

interface ExchangeRateData {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: ConversionRates;
}

const CurrencyConverter: React.FC = () => {
  const [firstCurrency, setFirstCurrency] = useState<string>('');
  const [secondCurrency, setSecondCurrency] = useState<string>('');
  const [data, setData] = useState<string[]>([]);
  const [money, setMoney] = useState<string>('');
  const [moneyFrom, setMoneyFrom] = useState<boolean>(true);
  const [exchangeRate, setExchangeRate] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const regex = /^\d*\.?\d*$/;

  const onHandleRotate = () => {
    const temp = firstCurrency;
    setFirstCurrency(secondCurrency);
    setSecondCurrency(temp);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${api.latest}usd`);
      const responseData: ExchangeRateData = await response.json();

      const conversionRates = responseData.conversion_rates;

      if (conversionRates && typeof conversionRates === 'object') {
        const firstCurr = Object.keys(conversionRates)[145];
        setData([...Object.keys(conversionRates)]);
        setFirstCurrency(responseData.base_code);
        setSecondCurrency(Object.keys(conversionRates)[145]);
        setExchangeRate(conversionRates[firstCurr]);
        setIsLoading(false);
      } else {
        console.error('Invalid response format:', responseData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const fetchExchangeRate = async () => {
    if (firstCurrency && secondCurrency) {
      try {
        const response = await fetch(
          `${api.pair}/${firstCurrency}/${secondCurrency}`
        );
        const responseData = await response.json();
        setExchangeRate(responseData.conversion_rate);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    }
  };

  const calculateAmounts = () => {
    let toAmount = '';
    let fromAmount = '';

    if (moneyFrom) {
      fromAmount = money;
      if (money !== '') {
        toAmount = (parseFloat(fromAmount) * exchangeRate!).toFixed(4) || '0';
      }
    } else {
      toAmount = money;
      if (money !== '') {
        fromAmount = (parseFloat(toAmount) / exchangeRate!).toFixed(4) || '0';
      }
    }

    return {toAmount, fromAmount};
  };

  const onMoneyChange = (value: string, type: 'from' | 'to') => {
    if ((regex.test(value) && parseFloat(value) >= 0) || value === '') {
      setMoney(value);
      setMoneyFrom(type === 'from');
    }
  };

  const transformDataToOptions = (data: string[]) => {
    return data.map((item) => {
      return {
        value: item,
        label: item,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchExchangeRate();
  }, [firstCurrency, secondCurrency]);

  const {toAmount, fromAmount} = calculateAmounts();

  return (
    <>
      {isLoading && <Spinner/>}
      {!!data.length && !isLoading && (
        <StyledDiv>
          <ConverterLine
            title="Amount"
            currenciesList={transformDataToOptions(data)}
            selectedValue={firstCurrency}
            handleChangeCurrency={setFirstCurrency}
            onMoneyChange={(value) => onMoneyChange(value, 'from')}
            amountCurrency={fromAmount}
          />
          <ButtonChange onHandleRotate={onHandleRotate}/>
          <ConverterLine
            title="Converted Amount"
            currenciesList={transformDataToOptions(data.filter((cur) => cur !== firstCurrency))}
            selectedValue={secondCurrency}
            handleChangeCurrency={setSecondCurrency}
            onMoneyChange={(value) => onMoneyChange(value, 'to')}
            amountCurrency={toAmount}
          />
        </StyledDiv>
      )}
    </>
  );
};

export default CurrencyConverter;
