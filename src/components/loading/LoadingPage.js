import React from "react";
import styled from "styled-components";

const LoadingPageStyles = styled.div`
  @keyframes bounce-loader {
    to {
      opacity: 0.1;
      transform: translateY(-1rem);
    }
  }
  display: flex;
  justify-content: center;
  & > div {
    width: 1rem;
    height: 1rem;
    margin: 0 0.5rem;
    background: #8385aa;
    border-radius: 50%;
    animation: bounce-loader 0.6s infinite alternate;
  }
  & > div:nth-child(2) {
    animation-delay: 0.15s;
  }
  & > div:nth-child(3) {
    animation-delay: 0.3s;
  }
  & > div:last-child {
    animation-delay: 0.45s;
  }
`;

const LoadingPage = () => {
  return (
    <LoadingPageStyles>
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
    </LoadingPageStyles>
  );
};

export default LoadingPage;
