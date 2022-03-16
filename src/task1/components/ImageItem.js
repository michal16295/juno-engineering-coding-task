import React from "react";
import styled from "styled-components";

const ImageItem = ({ url }) => {
  return <Image src={url} alt="image" />;
};

export default ImageItem;

const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
`;
