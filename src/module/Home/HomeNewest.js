import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp/configFirebase";
import Heading from "layout/Heading";
import PostItem from "module/Posts/PostItem";
import PostNewestItem from "module/Posts/PostNewestItem";
import PostNewestLarge from "module/Posts/PostNewestLarge";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 64px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
  @media screen and (max-width: 1023.98px) {
    .layout {
      grid-template-columns: 100%;
    }
    .sidebar {
      padding: 14px 10px;
    }
  }
`;

const HomeNewest = () => {
  const [postsNew, setPostsNew] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", false),
      limit(4)
    );
    onSnapshot(queries, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostsNew(result);
    });
  }, []);

  const [first, ...other] = postsNew;

  if (postsNew.length <= 0) return null;

  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Bài viết mới nhất</Heading>
        <div className="layout">
          <PostNewestLarge data={first}></PostNewestLarge>
          <div className="sidebar">
            {other.length > 0 &&
              other.map((item) => (
                <PostNewestItem key={item.id} data={item}></PostNewestItem>
              ))}
            {/* <PostNewestItem></PostNewestItem>
            <PostNewestItem></PostNewestItem> */}
          </div>
        </div>
        <div className="grid-layout grid-layout--primary">
          {/* <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem> */}
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
