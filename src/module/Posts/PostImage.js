import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const PostImageStyle = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
`;

const PostImage = ({ className = "", url = "", alt = "", to = "" }) => {
  if (to)
    return (
      <Link to={`/${to}`} style={{ display: "block" }}>
        <PostImageStyle className={className}>
          <img src={url} alt={alt} loading="lazy" />
        </PostImageStyle>
      </Link>
    );

  return (
    <PostImageStyle className={className}>
      <img src={url} alt={alt} loading="lazy" />
    </PostImageStyle>
  );
};

export default PostImage;
