import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import { fetchImages, fetchImageUrls } from "../../api/index";

import ImageItem from "../components/ImageItem";
import constants from "../constants/carousel";

const ImageCarousel = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { isLoading, error, data } = useQuery("imagesData", fetchImages);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (data.length + prev - 1) % data.length);
  };

  const getIndex = (direction = constants.RIGHT) => {
    return direction === constants.RIGHT
      ? (currentIndex + 1) % data.length
      : (data.length + currentIndex - 1) % data.length;
  };

  if (error) return "An error has occurred: " + error.message;

  return (
    <Container>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Row>
            <Icon>
              <BsArrowLeftCircleFill size={40} onClick={handlePrev} />
            </Icon>

            <ImageContainer>
              <ImageItem
                url={data[getIndex(constants.LEFT)]}
                direction={constants.LEFT_ROTATIONS}
              />
            </ImageContainer>

            <CurrentImageContainer>
              <ImageItem
                url={data[currentIndex]}
                active={true}
                key={currentIndex}
              />
            </CurrentImageContainer>

            <ImageContainer>
              <ImageItem
                url={data[getIndex()]}
                direction={constants.RIGHT_ROTATION}
              />
            </ImageContainer>

            <Icon>
              <BsArrowRightCircleFill size={40} onClick={handleNext} />
            </Icon>
          </Row>
          <h3>
            {currentIndex + 1} / {data.length}
          </h3>
        </>
      )}
    </Container>
  );
};
export default ImageCarousel;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
  padding: 20px 30px;
`;

const CurrentImageContainer = styled.div`
  width: 400px;
  height: 300px;
`;

const ImageContainer = styled.div`
  width: 350px;
  height: 250px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Icon = styled.div`
  cursor: pointer;
`;
