import { Button } from "components/button";
import { useAuth } from "contexts/authContext";
import React, { Fragment } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "firebase/auth";
import { auth } from "firebaseApp/configFirebase";

const menuList = [
  {
    id: 1,
    url: "/",
    title: "Home",
  },
  {
    id: 2,
    url: "/blog",
    title: "Blog",
  },
  {
    id: 3,
    url: "/contact",
    title: "Contact",
  },
];

const HeaderStyle = styled.div`
  .header__main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  .logo {
    display: block;
    max-width: 50px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
  }
  .menu__item {
  }

  .search {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 15px;
    padding: 15px 25px;
    border: 1px solid transparent;
    border-radius: 8px;
    width: 100%;
    max-width: 320px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
  .search__input {
    flex: 1;
    padding-right: 30px;
    &::placeholder {
      font-size: 14px;
      font-weight: 400;
    }
  }
  .search__icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 25px;
  }
  .header__button {
    margin-left: 20px;
    max-width: 150px;
    height: 56px;
  }
  @media screen and (max-width: 1023.98px) {
    .logo {
      max-width: 30px;
    }
    .menu,
    .search,
    .header-button,
    .header-auth {
      display: none;
    }
  }
`;

function getLastName(name) {
  const length = name?.split(" ").length;
  return name?.split(" ")[length - 1];
}

const Header = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  return (
    <HeaderStyle>
      <div className="container">
        <div className="header__main">
          <NavLink to="/">
            <img
              className="logo"
              srcSet="./images/monkey-logo.png 2x"
              alt="monkey-blogging"
            />
          </NavLink>
          <ul className="menu">
            {menuList.length > 0 &&
              menuList.map((item) => (
                <li className="menu__item" key={item.id}>
                  <NavLink to={item.url} className="menu__link">
                    {item.title}
                  </NavLink>
                </li>
              ))}
          </ul>

          {/* <div className="search">
            <input
              className="search__input"
              type="text"
              placeholder="Search posts..."
            />
            <span className="search__icon">
              <svg
                width={18}
                height={17}
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div> */}
          {!userInfo ? (
            <Button
              type="button"
              className="header__button"
              colorMain="primary"
            >
              <NavLink to={"/signup"}>Sign up</NavLink>
            </Button>
          ) : (
            <div className="header__auth">
              <span>Welcome,</span>
              <br />
              <Menu>
                <Menu.Button>
                  <strong className="">{userInfo?.displayName}</strong>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-200"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute w-[150px] text-[16px] max-h-fit p-5 rounded-lg flex flex-col bg-white items-start border border-slate-100 shadow-lg transition-all ease-linear duration-200 cursor-pointer gap-y-2 ">
                    <Menu.Item className="hover:text-[#2EBAC1] transition-all ease-out duration-200">
                      {({ active }) => (
                        <span
                          className={`${active && "bg-blue-500"}`}
                          onClick={() => navigate("/dashboard")}
                        >
                          Dashboard
                        </span>
                      )}
                    </Menu.Item>
                    <Menu.Item className="text-red-600 hover:text-[#2EBAC1] transition-all ease-out duration-200">
                      {({ active }) => (
                        <span
                          className={`${active && "bg-blue-500"}`}
                          onClick={() => {
                            signOut(auth);
                            navigate("/");
                          }}
                        >
                          Logout
                        </span>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )}
        </div>
      </div>
    </HeaderStyle>
  );
};

export default Header;
