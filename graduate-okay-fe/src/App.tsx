import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <RouteChangeTracker />
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/KyRecommend" element={<KyRecommend />} />
        <Route path="/Graduate" element={<Graduate />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
