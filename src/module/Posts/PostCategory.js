import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const PostCategoryStyle = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  color: #6b6b6b;
  font-size: 14px;
  font-weight: 600;
  background-color: #ffffff;
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px; */
  ${(props) =>
    props.typeColor === "primary" &&
    css`
      background-color: #f3edff;
    `}
`;

const PostCategory = ({ children, typeColor = "", className = "" }) => {
  return (
    <PostCategoryStyle typeColor={typeColor} className={className}>
      {children}
    </PostCategoryStyle>
  );
};

export default PostCategory;
