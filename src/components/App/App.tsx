import React from 'react';
import './index.css';
import {Title} from "../Title";
import styled from "styled-components";
import CurrencyConverter from "../CurrencyConverter";

const StyledDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  background: rgb(234,234,254);
  background: linear-gradient(190deg, rgba(234,234,254,1) 0%, rgba(255,255,255,1) 40%);
  text-align: center;
  padding-top: 20px;
`;

const App: React.FC = () => {
  return (
    <StyledDiv>
      <Title text="Currency Converter" />
      <CurrencyConverter />
    </StyledDiv>
  );
}

export default App;
