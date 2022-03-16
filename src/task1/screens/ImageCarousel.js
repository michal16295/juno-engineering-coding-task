import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { fetchImageUrls } from "../../api/index";

import ImageItem from "../components/ImageItem";

const ImageCarousel = (props) => {
  const [currentIndex, setCurrentIndex] = useState();
  const { isLoading, error, data } = useQuery("imagesData", fetchImageUrls, {
    onSuccess: (data) => setCurrentIndex(Math.floor(data.length / 2)),
  });

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (data.length + prev - 1) % data.length);
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Container>
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
      <div>
        {currentIndex + 1} / {data.length}
      </div>
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
