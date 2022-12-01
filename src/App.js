import React, { Fragment, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

const HomePage = React.lazy(() => import("pages/Home/HomePage"));
const SignIn = React.lazy(() => import("pages/SignIn"));
const SignUp = React.lazy(() => import("pages/SignUp"));
const NotFoundPage = React.lazy(() => import("pages/NotFound/NotFoundPage"));

const UserAddNew = React.lazy(() => import("module/User/UserAddNew"));
const UserUpdate = React.lazy(() => import("module/User/UserUpdate"));
const UserManage = React.lazy(() => import("module/User/UserManage"));
const UserProfile = React.lazy(() => import("module/User/UserProfile"));

const DashboardLayout = React.lazy(() =>
  import("module/Dashboard/DashboardLayout")
);
const DashboardPage = React.lazy(() => import("pages/Dashboard/DashboardPage"));
const PostAddNew = React.lazy(() => import("module/Posts/PostAddNew"));
const PostManage = React.lazy(() => import("module/Posts/PostManage"));
const PostDetailsPage = React.lazy(() =>
  import("pages/Detail/PostDetailsPage")
);
const PostUpdate = React.lazy(() => import("module/Posts/PostUpdate"));

const CategoryAddNew = React.lazy(() =>
  import("module/Category/CategoryAddNew")
);
const CategoryManage = React.lazy(() =>
  import("module/Category/CategoryManage")
);
const CategoryUpdate = React.lazy(() =>
  import("module/Category/CategoryUpdate")
);

function App() {
  return (
    <Fragment>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/:slug" element={<PostDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/manage/post" element={<PostManage />} />
              <Route path="/manage/add-post" element={<PostAddNew />} />
              <Route path="/manage/update-post" element={<PostUpdate />} />
              <Route path="/manage/category" element={<CategoryManage />} />
              <Route path="/manage/add-category" element={<CategoryAddNew />} />
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate />}
              />
              <Route path="/manage/user" element={<UserManage />} />
              <Route path="/manage/add-user" element={<UserAddNew />} />
              <Route path="/manage/update-user" element={<UserUpdate />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </Fragment>
  );
}

export default App;
