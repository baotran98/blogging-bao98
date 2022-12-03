import { LoadingSpinner } from "components/loading";
import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const ButtonStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${(props) => props.height || "60px"};
  line-height: 1;
  border-radius: 8px;
  font-weight: 600;
  ${(props) =>
    props.colorMain === "primary" &&
    css`
      color: white;
      background-image: linear-gradient(
        to right,
        ${(props) => props.theme.primaryMain},
        ${(props) => props.theme.secondary}
      );
    `}
  ${(props) =>
    props.colorMain === "secondary" &&
    css`
      background-color: white;
      span {
        color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        background-image: linear-gradient(
          to right,
          ${(props) => props.theme.primaryMain},
          ${(props) => props.theme.secondary}
        );
      }
    `};
  font-size: 18px;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: no-drop;
  }
  @media screen and (max-width: 1023.98px) {
    font-size: 16px;
    min-width: 150px;
  }
`;

/**
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type Type of button "button" | "submit"
 * @returns
 */

const Button = ({
  children,
  type = "button",
  onClick = () => {},
  colorMain = "",

  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <LoadingSpinner /> : children; // convert !! => boolean
  // if (to !== "" && typeof to === "string") {
  //   return (
  //     <NavLink to={to}>
  //       <ButtonStyle type={type} onClick={onClick} {...props}>
  //         {child}
  //       </ButtonStyle>
  //     </NavLink>
  //   );
  // }
  return (
    <ButtonStyle type={type} colorMain={colorMain} onClick={onClick} {...props}>
      {child}
    </ButtonStyle>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired, // oneOf => giới hạn dữ liệu được sử dụng (button, submit)
  colorMain: PropTypes.string,
};

export default Button;
