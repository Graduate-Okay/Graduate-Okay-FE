import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/footer/Footer";
import Main from "./pages/Main";
import Notice from "./pages/Notice";
import KyRecommend from "./pages/KyRecommend";
import Graduate from "./pages/Graduate";
import Mypage from "./pages/Mypage";
import Login from "./pages/Login";
import RouteChangeTracker from "./utils/RouteChangeTracker";
import NoticeDetail from "./pages/NoticeDetail";
import Signup from "./pages/Signup";
import Find from "./pages/Find";

function App() {
  const [cookies] = useCookies(["accessToken"]);

  return (
    <BrowserRouter>
      <RouteChangeTracker />
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
            cookies.accessToken ? <Mypage /> : <Navigate replace to="/login" />
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
