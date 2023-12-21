import styled from "styled-components";

export const StyledButtonWrap = styled.div`
  width: 100%;
  position: relative;
  margin: 15px 0;

  &:before {
    content: '';
    height: 1px;
    width: 100%;
    background-color: #E7E7EE;
    position: absolute;
    left: 0;
    top: 50%;
    transform: rotateX(-50%);
  }
`;

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #26278D;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: auto;
  position: relative;
  transition: all .3s ease-out;

  &.rotate {
    transform: rotate(180deg);
  }

  img {
    height: 20px;
  }
`;