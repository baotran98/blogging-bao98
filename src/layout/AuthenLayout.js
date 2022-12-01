import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthenLayoutStyle = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .form {
    max-width: 500px;
    margin: 0 auto;
  }
  .heading {
    color: ${(props) => props.theme.primary};
    text-align: center;
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 50px;
  }
  .is__account {
    text-align: end;
    margin-bottom: 30px;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
      font-weight: 500;
      margin-left: 5px;
      text-decoration: none;
    }
  }
`;

const AuthenLayout = ({ children }) => {
  return (
    <AuthenLayoutStyle>
      <div className="container">
        <NavLink to={"/"}>
          <img
            className="logo"
            srcSet="./images/monkey-logo.png 2x"
            alt="monkey-blogging"
          />
        </NavLink>
        <h1 className="heading">Monkey Blogging</h1>
        {children}
      </div>
    </AuthenLayoutStyle>
  );
};

export default AuthenLayout;
