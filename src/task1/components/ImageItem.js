import React from "react";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const ImageItem = ({ url, active = false, direction }) => {
  return (
    <Image
      src={url}
      alt="image"
      active={active}
      direction={direction}
      loading="lazy"
    />
  );
};

export default ImageItem;
const fadeAnimation = keyframes`${fadeIn}`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  filter: ${({ active }) => !active && "blur(8px)"};
  animation: 1s ${fadeAnimation};
  transform: ${({ active, direction }) => !active && direction}; ;
`;
