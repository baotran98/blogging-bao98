import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
    &-category {
      margin-bottom: 16px;
    }
    &-info {
      margin-top: auto;
    }
    &-dot {
    }
    &-title {
      margin-bottom: 10px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-image {
        aspect-ratio: 16/9;
        height: auto;
      }
    }
  }
`;

const PostItem = ({ data }) => {
  return (
    <PostItemStyles>
      <PostImage
        url={data?.image}
        alt={data?.slug}
        className="post-image"
        to={data?.slug}
      />
      <PostCategory typeColor="primary" className="post-category">
        {data?.category.name}
      </PostCategory>
      <PostTitle className="post-title" to={data?.slug}>
        {data?.title}
      </PostTitle>
      <PostMeta
        textColor="primary"
        date={
          data?.createdAt
            ? new Date(data?.createdAt?.seconds * 1000).toLocaleDateString(
                "vi-VI"
              )
            : new Date().toLocaleDateString("vi-VI")
        }
        author={data?.user.fullname}
      ></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
