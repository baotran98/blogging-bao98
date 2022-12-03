import { LoadingSkeleton } from "components/loading";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp/configFirebase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 16px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    &-category {
      display: inline-block;
      padding: 8px 12px;
      border-radius: 8px;
      color: #6b6b6b;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      background-color: #f3f3f3;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100px;
    }
  }

  @media screen and (min-width: 1024px) {
    height: 272px;
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-content {
        padding: 15px;
      }
    }
  }
`;
const PostFeatureItem = ({ data }) => {
  const { category, user } = data;
  const navigate = useNavigate();

  if (!data || !data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");

  return (
    <>
      <PostFeatureItemStyles>
        <PostImage url={data.image} alt="unsplash" className="post-image" />
        <div className="post-overlay"></div>
        <div className="post-content">
          <div className="post-top">
            {data.category?.name && (
              <PostCategory typeColor="primary">{category?.name}</PostCategory>
            )}
            <PostMeta author={user?.fullname} date={formatDate}></PostMeta>
            {/* <PostMeta author={data.author} date={formatDate}></PostMeta> */}
            {/* className="post-info" */}
          </div>
          <PostTitle size={"big"} to={data.slug}>
            {data.title}
          </PostTitle>
        </div>
      </PostFeatureItemStyles>
    </>
  );
};

export default PostFeatureItem;
