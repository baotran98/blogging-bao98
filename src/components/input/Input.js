import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputStyle = styled.div`
  position: relative;
  width: 100%;
  .input {
    height: 60px;
    width: 100%;
    padding: ${(props) => (props.hasIcon ? "20px 60px 20px 20px" : "20px")};
    background-color: ${(props) => props.theme.grayLight};
    border: 1px solid transparent;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    transition: all 0.2s linear;
  }
  .input:focus {
    background-color: #fff;
    border-color: ${(props) => props.theme.primary};
  }
  .input::-webkit-input-placeholder {
    color: "#84878B";
  }
  .input::-moz-input-placeholder {
    color: "#84878B";
  }
  .icon-style {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const Input = ({
  name = "",
  type = "text",
  children,
  control,
  isIcon = false,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <InputStyle isIcon={children ? true : false}>
      <input id={name} type={type} {...field} {...props} />
      {children}
    </InputStyle>
  );
};

Input.propTypes = {
  control: PropTypes.any.isRequired,
  type: PropTypes.string,
  children: PropTypes.any,
  name: PropTypes.string.isRequired,
};

export default Input;
