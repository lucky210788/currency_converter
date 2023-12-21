import React from "react";
import styled from "styled-components";

const StyledP = styled.p`
  color: #1F2261;
  text-align: center;
  font-size: 25px;
  font-weight: 700;
  line-height: normal;
  margin: 0 auto 41px;
`;

interface TitleProps {
  text: string;
}

export const Title: React.FC<TitleProps> = (props) => {
  const {text} = props;

  return (
    <StyledP>{text}</StyledP>
  )
};
