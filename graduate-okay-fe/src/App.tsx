import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import RouteChangeTracker from "./utils/RouteChangeTracker";
import Spinner from "./components/Spinner";
const Header = lazy(() => import("./components/Header"));
const Nav = lazy(() => import("./components/Nav"));
const Footer = lazy(() => import("./components/footer/Footer"));
const Notice = lazy(() => import("./pages/Notice"));
const Main = lazy(() => import("./pages/Main"));
const KyRecommend = lazy(() => import("./pages/kyRecommend/KyRecommend"));
const Graduate = lazy(() => import("./pages/Graduate"));
const Mypage = lazy(() => import("./pages/mypage/Mypage"));
const Login = lazy(() => import("./pages/Login"));
const NoticeDetail = lazy(() => import("./pages/NoticeDetail"));
const Signup = lazy(() => import("./pages/Signup"));
const KyRecommendDetail = lazy(
  () => import("./pages/kyRecommend/KyRecommendDetail")
);
const ModifyInfo = lazy(() => import("./pages/mypage/ModifyInfo"));
const Admin = lazy(() => import("./pages/administration/Admin"));
const Administration = lazy(
  () => import("./pages/administration/Administration")
);

function App() {
  const [cookies] = useCookies(["accessToken"]);

  return (
    <BrowserRouter>
      <RouteChangeTracker />
      <Suspense fallback={<Spinner />}>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
          <Route path="/kyRecommend" element={<KyRecommend />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/administration" element={<Administration />} />
          <Route
            path="/kyRecommend/:id"
            element={
              cookies.accessToken ? (
                <KyRecommendDetail />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/graduate"
            element={
              cookies.accessToken ? (
                <Graduate />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/mypage"
            element={
              cookies.accessToken ? (
                <Mypage />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/mypage/modifyInfo"
            element={
              cookies.accessToken ? (
                <ModifyInfo />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
        </Routes>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
