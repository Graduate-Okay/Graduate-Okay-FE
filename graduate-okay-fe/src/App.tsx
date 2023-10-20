import React from "react";
import ReactGA from "react-ga";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Notice from "./pages/Notice";
import KyRecommend from "./pages/KyRecommend";
import Graduate from "./pages/Graduate";

const gaTrackingID: any = process.env.REACT_APP_GA_TRACKING_ID;
ReactGA.initialize(gaTrackingID, { debug: true });
ReactGA.pageview(window.location.pathname);

function App() {
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
