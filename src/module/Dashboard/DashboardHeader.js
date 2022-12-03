import { Button } from "components/button";
import { useAuth } from "contexts/authContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MenuMobile from "./MenuMobile";

const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  margin: 0 5rem 0 5rem;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999;
  /* gap: 20px; */
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .header-avatar {
    max-width: 52px;
    height: 52px;
    margin-left: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
  @media screen and (max-width: 1023.98px) {
    margin: 0 0 0 0;
  }
`;

const DashboardHeader = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  return (
    <DashboardHeaderStyles>
      <div className="flex items-center justify-start visible lg:invisible">
        <MenuMobile />
      </div>
      <div className="flex items-center">
        <Button type="button" colorMain="primary" className="min-w-[200px]">
          <span onClick={() => navigate("/manage/add-post")}>
            Write new post
          </span>
        </Button>
        <div className="header-avatar">
          <img
            className="w-full h-full"
            src={userInfo.avatar}
            alt={userInfo.username}
          />
        </div>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
