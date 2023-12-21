import React from "react";
import styled from "styled-components";

const StyledP = styled.p`
  color: #989898;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 14px;
`;

interface LineTitleProps {
  text: string;
}

export const LineTitle: React.FC<LineTitleProps> = (props) => {
  const {text} = props;

  return (
    <StyledP>{text}</StyledP>
  )
};
