import React from "react";
import styled, { css } from "styled-components";

const PostMetaStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  ${(props) =>
    props.textColor === "primary" &&
    css`
      color: #6b6b6b;
    `};
  .post {
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
`;

const PostMeta = ({
  date = "Mar 23",
  author = "Andiez Le",
  textColor = "",
  className = "",
}) => {
  return (
    <PostMetaStyle textColor={textColor} className={className}>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <span className="post-author">{author}</span>
    </PostMetaStyle>
  );
};

export default PostMeta;
