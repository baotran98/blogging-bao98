import React from "react";
import styled from "styled-components";

const LabelSytles = styled.label`
  color: ${(props) => props.theme.grayDark};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <LabelSytles htmlFor={htmlFor} {...props}>
      {children}
    </LabelSytles>
  );
};

export default Label;
