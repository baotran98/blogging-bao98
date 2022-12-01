import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import { LabelStatus } from "components/label";
import { Pagination } from "components/pagination";
import { Table } from "components/table";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp/configFirebase";
import { debounce } from "lodash";
import DashboardHeading from "module/Dashboard/DashboardHeading";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { statusPost } from "utils/constants";

const POST_PER_PAGE = 4;

const PostManage = () => {
  const [postList, setPostList] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [filter, setFilter] = useState("");
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Monkey Blogging - Manage post page";
  }, []);

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(newRef, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setPostList(result);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);

  const handleDelPost = (postId) => {
    const colRef = doc(db, "posts", postId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00a7b4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      }
    });
  };

  const handleLoadMore = async () => {
    const nextRef = query(
      collection(db, "posts"),
      startAfter(lastDoc),
      limit(POST_PER_PAGE)
    );
    setLastDoc(nextRef);
    onSnapshot(nextRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostList([...postList, ...result]); // lấy giá trị trước đó
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };

  const renderStatusPost = (status) => {
    switch (status) {
      case statusPost.APPROVED:
        return <LabelStatus type="success">approved</LabelStatus>;
      case statusPost.PENDING:
        return <LabelStatus type="warning">pending</LabelStatus>;
      case statusPost.REJECT:
        return <LabelStatus type="danger">reject</LabelStatus>;

      default:
        break;
    }
  };

  const handleSearchPost = debounce((e) => {
    setFilter(e.target.value);
  }, 1000);

  return (
    <div>
      <DashboardHeading title="Manage posts" />
      <div className="flex items-center justify-end mb-5">
        {/* <Button
          onClick={() => {
            navigate("/manage/add-category");
          }}
          type="button"
          colorMain="primary"
          className="max-w-[230px]"
        >
          Add new post
        </Button> */}
        <input
          className="px-4 py-3 font-medium border-2 rounded-md shadow-sm border-slate-400 focus:border-[#00a7b4] transition-all ease-in-out duration-300"
          type="text"
          placeholder="Search post here..."
          onChange={handleSearchPost}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Info post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList.length > 0 &&
            postList.map((p) => (
              <tr key={p.id}>
                <th title={p.id}>{p.id.slice(0, 5) + "..."}</th>
                <td>
                  <div className="flex items-center gap-x-3">
                    <img
                      src={
                        p.image
                          ? p.image
                          : "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
                      }
                      alt={p.image_name}
                      className="w-[66px] h-[55px] rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3
                        className="font-semibold max-w-[250px] whitespace-pre-wrap"
                        title={p.title}
                      >
                        {p.title}
                      </h3>
                      <time className="text-[12px] text-slate-400 font-bold">
                        Date:{" "}
                        {p?.createdAt
                          ? new Date(
                              p?.createdAt?.seconds * 1000
                            ).toLocaleDateString("vi-VI")
                          : new Date().toLocaleDateString("vi-VI")}
                      </time>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-gray-500">{p.category?.name}</span>
                </td>
                <td>
                  <span className="text-gray-500">{p.author}</span>
                </td>
                <td>{renderStatusPost(Number(p.status))}</td>
                <td>
                  <div className="flex items-center gap-x-2">
                    <ActionView onClick={() => navigate(`/${p.slug}`)} />
                    <ActionEdit
                      onClick={() => {
                        navigate(`/manage/update-post?id=${p.id}`);
                      }}
                    />
                    <ActionDelete onClick={() => handleDelPost(p.id)} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="flex items-center justify-end mt-5">
        {total > postList.length && (
          <button
            onClick={handleLoadMore}
            className="w-[200px] max-w-fit px-5 py-3 text-xl border font-bold border-transparent rounded-md bg-primary-gradient bg-clip-text text-transparent hover:border hover:border-[#23BB86] transition-all ease-in-out duration-300"
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default PostManage;
