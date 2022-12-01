import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "firebaseApp/configFirebase";
import Heading from "layout/Heading";
import { useEffect, useState } from "react";
import PostItem from "./PostItem";

const PostRelated = ({ categoryId = "" }) => {
  const [postRelated, setPostRelated] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "posts"),
        where("category.id", "==", categoryId)
      );
      onSnapshot(docRef, (snapShot) => {
        const result = [];
        snapShot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostRelated(result);
      });
    }
    fetchData();
  }, [categoryId]);
  if (!categoryId || postRelated.length <= 0) return null;
  return (
    <div className="post-related">
      <Heading>Bài viết liên quan</Heading>
      <div className="grid-layout grid-layout--primary">
        {postRelated.length > 0 &&
          postRelated.map((item) => <PostItem key={item.id} data={item} />)}
      </div>
    </div>
  );
};

export default PostRelated;
