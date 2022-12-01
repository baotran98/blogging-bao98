import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "firebaseApp/configFirebase";
import parse from "html-react-parser";
import HomeLayout from "layout/HomeLayout";
import PostCategory from "module/Posts/PostCategory";
import PostImage from "module/Posts/PostImage";
import PostMeta from "module/Posts/PostMeta";
import PostRelated from "module/Posts/PostRelated";
import NotFoundPage from "pages/NotFound/NotFoundPage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapShot) => {
        snapShot.forEach((doc) => {
          doc.data() && setPostInfo(doc.data());
          console.log(doc.data());
        });
      });
    }
    fetchData();
  }, [slug]);

  if (!postInfo.title) return null;
  if (!slug) return <NotFoundPage />;
  return (
    <PostDetailsPageStyles>
      <HomeLayout>
        <div className="container">
          <div className="post-header">
            <PostImage url={postInfo.image} className="post-feature" />
            <div className="post-info">
              <PostCategory typeColor="primary" className="mb-6">
                {postInfo.category?.name}
              </PostCategory>
              <h1 className="post-heading">{postInfo.title}</h1>
              <PostMeta
                textColor="primary"
                date={
                  postInfo?.createdAt
                    ? new Date(
                        postInfo?.createdAt?.seconds * 1000
                      ).toLocaleDateString("vi-VI")
                    : new Date().toLocaleDateString("vi-VI")
                }
                author={postInfo.author}
              />
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">{parse(postInfo.content || "")}</div>
            <div className="author">
              <div className="author-image">
                <img
                  src={
                    postInfo.user.avatar
                      ? postInfo.user.avatar
                      : "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                  }
                  alt=""
                />
              </div>
              <div className="author-content">
                <h3 className="author-name">
                  {postInfo.user.fullname
                    ? postInfo.user.fullname
                    : postInfo.author}
                </h3>
                <p className="author-desc">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Dignissimos non animi porro voluptates quibusdam optio nulla
                  quis nihil ipsa error delectus temporibus nesciunt, nam
                  officiis adipisci suscipit voluptate eum totam!
                </p>
              </div>
            </div>
          </div>
          <PostRelated categoryId={postInfo.category?.id} />
        </div>
      </HomeLayout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
