import { Button } from "components/button";
import { debounce } from "lodash";
import DashboardHeading from "module/Dashboard/DashboardHeading";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "./UserTable";

const UserManage = () => {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const searchUserDebounce = debounce((e) => {
    setFilter(e.target.value);
  }, 1000);

  return (
    <div>
      <DashboardHeading title="Manage users" />
      <div className="items-center mb-5 lg:flex lg:justify-between">
        <Button
          onClick={() => {
            navigate("/manage/add-user");
          }}
          type="button"
          colorMain="primary"
          className="lg:max-w-[200px] mb-3"
        >
          Create user
        </Button>
        <input
          className="px-4 py-3 w-full mb-3 lg:w-[200px] font-medium border-2 rounded-md shadow-sm border-slate-400 focus:border-[#00a7b4] transition-all ease-in-out duration-300"
          type="text"
          placeholder="Search user here..."
          onChange={searchUserDebounce}
        />
      </div>

      <UserTable filter={filter}></UserTable>
    </div>
  );
};

export default UserManage;
