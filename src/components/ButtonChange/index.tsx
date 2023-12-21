import React, {useState} from "react";
import iconChange from "../../assets/images/change.svg";
import {StyledButton, StyledButtonWrap} from "./styles";

interface ButtonChangeProps {
  onHandleRotate: () => void;
}

export const ButtonChange: React.FC<ButtonChangeProps> = (props) => {
  const {onHandleRotate} = props;
  const [isRotate, setIsRotate] = useState<boolean>(false);

  const handleClick = () => {
    onHandleRotate();
    setIsRotate(!isRotate);
  }

  return (
    <StyledButtonWrap>
      <StyledButton onClick={handleClick} className={isRotate ? 'rotate' : ''}>
        <img src={iconChange} alt="change"/>
      </StyledButton>
    </StyledButtonWrap>
  )
};
