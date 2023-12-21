import React, {useEffect, useState} from "react";
import {LineTitle} from "../LineTitle";
import Select from "react-select";
import {StyledInput, StyledSelectWrap, ConverterLineWrap} from "./styles"

type Option = {
  value: string;
  label: string;
}

interface ConverterLineProps {
  title: string;
  currenciesList: Option[];
  selectedValue: string;
  handleChangeCurrency: React.Dispatch<React.SetStateAction<string>>
  onMoneyChange: (value: string) => void;
  amountCurrency: string;
}

export const ConverterLine: React.FC<ConverterLineProps> = (props) => {
  const {
    title,
    currenciesList,
    selectedValue,
    handleChangeCurrency,
    onMoneyChange,
    amountCurrency
  } = props;

  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    currenciesList.find(cur => cur.value === selectedValue)
  );

  useEffect(() => {
    setSelectedOption(currenciesList.find(cur => cur.value === selectedValue));
  }, [selectedValue]);

  return (
    <>
      <LineTitle text={title}/>
      <ConverterLineWrap>
        <StyledSelectWrap>
          <Select
            value={selectedOption}
            onChange={(newValue, actionMeta) => {
              handleChangeCurrency(newValue!.value);
            }}
            options={currenciesList}
          />
        </StyledSelectWrap>
        <StyledInput
          type="text"
          value={amountCurrency}
          onChange={(e) => onMoneyChange(e.target.value)}
          placeholder="0.00"
        />
      </ConverterLineWrap>
    </>
  )
};
