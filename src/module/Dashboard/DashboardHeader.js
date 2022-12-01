import { Button } from "components/button";
import { useAuth } from "contexts/authContext";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  /* border-bottom: 50px solid #eee; */
  border-radius: 12px;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
`;

const DashboardHeader = () => {
  const { userInfo } = useAuth();
  return (
    <DashboardHeaderStyles>
      <Button
        type="button"
        colorMain="primary"
        className="header-button"
        style={{
          height: 52,
          width: 200,
        }}
      >
        <NavLink to="/manage/add-post">Write new post</NavLink>
      </Button>
      <div className="header-avatar">
        <img src={userInfo.avatar} alt="" />
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
