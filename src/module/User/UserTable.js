import { ActionDelete, ActionEdit } from "components/action";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp/configFirebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { roleUser, statusUser } from "utils/constants";

const UserTable = ({ filter }) => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "users");
      const newRef = filter
        ? query(
            colRef,
            where("email", ">=", filter),
            where("email", "<=", filter + "utf8") ||
              where("fullname", ">=", filter),
            where("fullname", "<=", filter + "utf8")
          )
        : query(colRef);
      onSnapshot(newRef, (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUserList(result);
      });
    }
    fetchData();
  }, [filter]);

  const renderStatusUser = (status) => {
    switch (status) {
      case statusUser.ACTIVE:
        return <LabelStatus type="success">active</LabelStatus>;
      case statusUser.PENDING:
        return <LabelStatus type="warning">pending</LabelStatus>;
      case statusUser.BAN:
        return <LabelStatus type="danger">reject</LabelStatus>;

      default:
        break;
    }
  };

  const renderRoleUser = (role) => {
    switch (role) {
      case roleUser.ADMIN:
        return <LabelStatus type="danger">ADMIN</LabelStatus>;
      case roleUser.MOD:
        return <LabelStatus type="warning">MOD</LabelStatus>;
      case roleUser.USER:
        return <LabelStatus type="default">USER</LabelStatus>;

      default:
        break;
    }
  };

  const handleDelUser = async (u) => {
    const colRef = doc(db, "users", u.id);
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
        // await deleteUser(u);
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your info has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-[16px]">
          {userList.length > 0 &&
            userList.map((u) => (
              <tr key={u.id}>
                <th title={u.id}>{u.id.slice(0, 5) + "..."}</th>
                <th className="whitespace-nowrap">
                  <div className="flex items-center gap-x-2">
                    <img
                      className="flex-shrink-0 object-cover w-10 h-10 rounded-md shadow-md"
                      src={
                        u.avatar
                          ? u.avatar
                          : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                      }
                      alt="avatar-user"
                    />
                    <div className="flex-1">
                      <h5 title={u.fullname}>
                        {u.fullname.length > 13
                          ? u.fullname.slice(0, 13) + "..."
                          : u.fullname}
                      </h5>
                      <span className="text-[12px] text-slate-400">
                        Date:{" "}
                        {u?.createdAt
                          ? new Date(
                              u?.createdAt?.seconds * 1000
                            ).toLocaleDateString("vi-VI")
                          : new Date().toLocaleDateString("vi-VI")}
                      </span>
                    </div>
                  </div>
                </th>
                <th title={u.username} className="whitespace-nowrap">
                  {u.username?.slice(0, 15) + "..."}
                </th>
                <th title={u.email}>{u.email.slice(0, 15) + "..."}</th>
                <th>{renderStatusUser(Number(u.status))}</th>
                <th>{renderRoleUser(Number(u.role))}</th>
                <th>
                  <div className="flex items-center justify-center gap-x-1">
                    <ActionEdit
                      onClick={() => navigate(`/manage/update-user?id=${u.id}`)}
                    />
                    <ActionDelete onClick={() => handleDelUser(u)} />
                  </div>
                </th>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserTable;
