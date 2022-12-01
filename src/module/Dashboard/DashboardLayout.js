import { useAuth } from "contexts/authContext";
import NotFoundPage from "pages/NotFound/NotFoundPage";
import React from "react";
import { Link, Outlet, Redirect, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { roleUser } from "utils/constants";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 40px;
      letter-spacing: 1px;
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      background-image: linear-gradient(
        ${(props) => props.theme.primaryMain},
        ${(props) => props.theme.secondary}
      );
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
  }
`;
const DashboardLayout = ({ children }) => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  // if (userInfo.role !== roleUser.ADMIN || roleUser.MOD) return navigate("/");
  if (!userInfo) return <NotFoundPage />;
  return (
    <DashboardStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <Sidebar></Sidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
