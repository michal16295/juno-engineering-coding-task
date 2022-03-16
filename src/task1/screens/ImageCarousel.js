import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { fetchImageUrls } from "../../api/index";

import ImageItem from "../components/ImageItem";

const ImageCarousel = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { isLoading, error, data } = useQuery("imagesData", fetchImageUrls);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (data.length + prev - 1) % data.length);
  };

  if (error) return "An error has occurred: " + error.message;

  return (
    <Container>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Row>
            <BsArrowLeftCircleFill
              size={40}
              onClick={handlePrev}
              style={{ cursor: "pointer" }}
            />

            <ImageContainer>
              <ImageItem url={data[currentIndex]} />
            </ImageContainer>

            <BsArrowRightCircleFill
              size={40}
              onClick={handleNext}
              style={{ cursor: "pointer" }}
            />
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
`;

const ImageContainer = styled.div`
  width: 500px;
  height: 500px;
`;

const Row = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
