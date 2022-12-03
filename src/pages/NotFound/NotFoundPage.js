import { Button } from "components/button";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotFoundStyle = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .logo {
    display: inline-block;
    margin-bottom: 30px;
  }
  .title {
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .back {
    display: inline-block;
    max-width: 200px;
  }
  @media screen and (max-width: 1023.98px) {
    .title {
      font-size: 30px;
    }
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundStyle>
      <NavLink to="/">
        <img
          className="logo"
          srcSet="/images/monkey-logo.png 2x"
          alt="monkey-blogging"
        />
      </NavLink>
      <h1 className="transition-all duration-200 ease-in-out title">
        Oops! Page Not Found
      </h1>
      <Button type="button" className="back" colorMain="primary">
        <NavLink to="/">Back to home</NavLink>
      </Button>
    </NotFoundStyle>
  );
};

export default NotFoundPage;
