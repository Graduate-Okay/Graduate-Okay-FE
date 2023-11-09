import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import RouteChangeTracker from "./utils/RouteChangeTracker";
const Header = React.lazy(() => import("./components/Header"));
const Nav = React.lazy(() => import("./components/Nav"));
const Footer = React.lazy(() => import("./components/footer/Footer"));
const Notice = React.lazy(() => import("./pages/Notice"));
const Main = React.lazy(() => import("./pages/Main"));
const KyRecommend = React.lazy(() => import("./pages/KyRecommend"));
const Graduate = React.lazy(() => import("./pages/Graduate"));
const Mypage = React.lazy(() => import("./pages/Mypage"));
const Login = React.lazy(() => import("./pages/Login"));
const NoticeDetail = React.lazy(() => import("./pages/NoticeDetail"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Find = React.lazy(() => import("./pages/Find"));
const KyRecommendDetail = React.lazy(() => import("./pages/KyRecommendDetail"));
const ModifyInfo = React.lazy(() => import("./pages/ModifyInfo"));

function App() {
  const [cookies] = useCookies(["accessToken"]);

  return (
    <BrowserRouter>
      <RouteChangeTracker />
      <Suspense fallback={<div>로딩중...</div>}>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
          <Route path="/KyRecommend" element={<KyRecommend />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/find" element={<Find />} />
          <Route
            path="/KyRecommend/:id"
            element={
              cookies.accessToken ? (
                <KyRecommendDetail />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/Graduate"
            element={
              cookies.accessToken ? (
                <Graduate />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/Mypage"
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
