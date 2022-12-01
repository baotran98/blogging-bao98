import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      border-radius: 12px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
    &-category {
      margin-bottom: 8px;
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
const PostNewestItem = ({ data }) => {
  return (
    <PostNewestItemStyles>
      <PostImage
        url={data.image}
        alt={data.image_name}
        className="post-image"
        to={"/"}
      />
      <div className="post-content">
        <PostCategory className="post-category">
          {data.category?.name}
        </PostCategory>
        <PostTitle className="post-title" to={data.slug}>
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
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;
