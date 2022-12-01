import { Button } from "components/button";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

const CarouselHomeStyle = styled.div`
  min-height: 520px;
  padding: 40px 0;
  margin-top: 45px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );

  .carousel {
    &__main {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__left {
      max-width: 400px;
      color: white;
    }
    &__title {
      font-size: 42px;
      font-weight: 700;
      margin-bottom: 30px;
    }
    &__content {
      line-height: 1.75;
      margin-bottom: 50px;
    }
    &__right {
    }
  }
`;

const HomeCarousel = () => {
  const navigate = useNavigate();
  return (
    <>
      <CarouselHomeStyle>
        <div className="container">
          <div className="carousel__main">
            <div className="carousel__left">
              <h1 className="carousel__title">Monkey Blogging</h1>
              <p className="carousel__content">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Impedit dolores, excepturi facere doloremque quibusdam incidunt,
                pariatur ab numquam quae odit et nulla eveniet corrupti eius vel
                culpa, debitis sunt velit.
              </p>
              <Button
                colorMain="secondary"
                type="button"
                style={{ maxWidth: 230 }}
                onClick={() => navigate("/signup")}
              >
                <span>Get started</span>
              </Button>
            </div>
            <div className="carousel__right">
              <img src="/images/carousel.png" alt="carousel-home" />
            </div>
          </div>
        </div>
      </CarouselHomeStyle>
    </>
  );
};

export default HomeCarousel;
