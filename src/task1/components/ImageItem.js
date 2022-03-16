import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import CircularProgress from "@mui/material/CircularProgress";

const ImageItem = ({ url, active = false, direction }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && (
        <LoaderContainer direction={direction}>
          <CircularProgress size={20} />
        </LoaderContainer>
      )}
      <Image
        loaded={loaded}
        src={url}
        alt="image"
        active={active}
        direction={direction}
        loading="eager"
        onLoad={() => {
          setLoaded(true);
        }}
      />
    </>
  );
};

export default ImageItem;
const fadeAnimation = keyframes`${fadeIn}`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  filter: ${({ active }) => !active && "blur(8px)"};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  animation: 1s ${fadeAnimation};
  transform: ${({ active, direction }) => !active && direction};
  display: ${({ loaded }) => (loaded ? "block" : "none")};
`;

const LoaderContainer = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  transform: ${({ active, direction }) => !active && direction};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  display: flex;
  align-items: center;
  justify-content: center;
`;
