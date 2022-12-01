import { signOut } from "firebase/auth";
import { auth } from "firebaseApp/configFirebase";
import HomeLayout from "layout/HomeLayout";
import HomeCarousel from "module/Home/HomeCarousel";
import HomeFeature from "module/Home/HomeFeature";
import HomeNewest from "module/Home/HomeNewest";

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HomePageStyle = styled.div``;

const HomePage = () => {
  const navigate = useNavigate();
  const SignOut = () => {
    signOut(auth);
    navigate("/signin");
  };
  return (
    <HomePageStyle>
      <HomeLayout>
        <HomeCarousel></HomeCarousel>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </HomeLayout>
    </HomePageStyle>
  );
};

export default HomePage;
