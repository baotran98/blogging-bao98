import React, { Fragment } from "react";
import Header from "./header/Header";

const HomeLayout = ({ children }) => {
  return (
    <Fragment>
      <Header></Header>
      {children}
    </Fragment>
  );
};

export default HomeLayout;
