import React from "react";
import RouteChangeTracker from "./utils/RouteChangeTracker";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Notice from "./pages/Notice";
import KyRecommend from "./pages/KyRecommend";
import Graduate from "./pages/Graduate";

function App() {
  // RouteChangeTracker();/

  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/KyRecommend" element={<KyRecommend />} />
        <Route path="/Graduate" element={<Graduate />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
