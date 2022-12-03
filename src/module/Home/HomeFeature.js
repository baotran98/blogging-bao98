import { LoadingSkeleton } from "components/loading";
import LoadingPage from "components/loading/LoadingPage";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp/configFirebase";
import Heading from "layout/Heading";
import PostFeatureItem from "module/Posts/PostFeatureItem";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const colRef = collection(db, "posts");
      const queries = query(
        colRef,
        where("status", "==", 1),
        where("hot", "==", true),
        limit(3)
      );
      onSnapshot(queries, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(result);
      });
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  if (posts.length <= 0) return null;

  return (
    <>
      <HomeFeatureStyles className="home-block">
        <div className="container">
          <Heading>Bài viết nổi bật</Heading>
          <div className="grid-layout">
            {loading && <LoadingPage />}
            {!loading &&
              posts.map((item) => (
                <PostFeatureItem key={item.id} data={item} />
              ))}
          </div>
        </div>
      </HomeFeatureStyles>
    </>
  );
};

export default HomeFeature;
