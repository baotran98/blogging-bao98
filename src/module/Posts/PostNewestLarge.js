import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
      border-radius: 16px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
    &-category {
      margin-bottom: 16px;
    }
    &-info {
    }
    &-dot {
    }
    &-title {
      margin-bottom: 10px;
    }
  }
`;

const PostNewestLarge = ({ data }) => {
  return (
    <PostNewestLargeStyles>
      <PostImage
        url={data.image}
        alt={data.image_name}
        className="post-image"
        to={data.slug}
      />
      <PostCategory typeColor="primary" className="post-category">
        {data.category?.name}
      </PostCategory>
      <PostTitle size={"big"} className="post-title" to={data.slug}>
        {data.title}
      </PostTitle>
      <PostMeta
        textColor="primary"
        date={
          data.createdAt
            ? new Date(data?.createdAt?.seconds * 1000).toLocaleDateString(
                "vi-VI"
              )
            : new Date().toLocaleDateString("vi-VI")
        }
        author={data.user?.fullname}
      />
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
