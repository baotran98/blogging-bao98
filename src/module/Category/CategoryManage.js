import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import { LabelStatus } from "components/label";
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { statusCate } from "utils/constants";

const CATEGORY_PER_PAGE = 10;

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "categories");
      const newRef = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8")
          )
        : query(colRef, limit(CATEGORY_PER_PAGE));
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
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategoryList(result);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);

  const handleDelCategory = (docId) => {
    const colRef = doc(db, "categories", docId);
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
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
      }
    });
  };

  const filterCateDebounce = debounce((e) => {
    setFilter(e.target.value);
  }, 1000);

  const handleLoadMore = async () => {
    const nextRef = query(
      collection(db, "categories"),
      startAfter(lastDoc),
      limit(CATEGORY_PER_PAGE)
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
      setCategoryList([...categoryList, ...result]); // lấy giá trị trước đó
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };

  return (
    <div>
      <DashboardHeading title="Categories" />
      <div className="flex items-center justify-between mb-5">
        <Button
          onClick={() => {
            navigate("/manage/add-category");
          }}
          type="button"
          colorMain="primary"
          className="max-w-[230px]"
        >
          Create category
        </Button>
        <input
          className="px-4 py-3 font-medium border-2 rounded-md shadow-sm border-slate-400 focus:border-[#00a7b4] transition-all ease-in-out duration-300"
          type="text"
          placeholder="Search category here..."
          onChange={filterCateDebounce}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((cate) => (
              <tr key={cate.id}>
                <td>{cate.id}</td>
                <td>{cate.name}</td>
                <td>
                  <span className="italic text-gray-400">{cate.slug}</span>
                </td>
                <td>
                  {cate.status === statusCate.APPROVED && (
                    <LabelStatus type="success">approved</LabelStatus>
                  )}
                  {cate.status === statusCate.UNAPPROVED && (
                    <LabelStatus type="warning">unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-x-2">
                    <ActionView />
                    <ActionEdit
                      onClick={() => {
                        navigate(`/manage/update-category?id=${cate.id}`);
                      }}
                    />
                    <ActionDelete onClick={() => handleDelCategory(cate.id)} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="flex items-center justify-end mt-5">
        {total > categoryList.length && (
          <button
            onClick={handleLoadMore}
            className="w-[200px] max-w-fit px-5 py-3 rounded-md bg-[#00a7b4] border border-transparent text-white hover:text-[#00a7b4] hover:bg-white hover:border-[#00a7b4] transition-all ease-in-out duration-300"
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryManage;
