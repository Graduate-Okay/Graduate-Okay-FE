import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import RouteChangeTracker from "./utils/RouteChangeTracker";
import Spinner from "./components/Spinner";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/footer/Footer"));
const Notice = lazy(() => import("./pages/notice/Notice"));
const Main = lazy(() => import("./pages/Main"));
const KyRecommend = lazy(() => import("./pages/kyRecommend/KyRecommend"));
const Graduate = lazy(() => import("./pages/Graduate"));
const Mypage = lazy(() => import("./pages/mypage/Mypage"));
const Login = lazy(() => import("./pages/Login"));
const NoticeDetail = lazy(() => import("./pages/notice/NoticeDetail"));
const Signup = lazy(() => import("./pages/Signup"));
const KyRecommendDetail = lazy(
  () => import("./pages/kyRecommend/KyRecommendDetail")
);
const ModifyInfo = lazy(() => import("./pages/mypage/ModifyInfo"));
const Admin = lazy(() => import("./pages/administration/Admin"));
const Administration = lazy(
  () => import("./pages/administration/Administration")
);
const MyReview = lazy(() => import("./pages/mypage/MyReview"));
const Recruit = lazy(() => import("./pages/recruit/Recruit"));
const More = lazy(() => import("./pages/More"));
const Password = lazy(() => import("./pages/Password"));

function App() {
  return (
    <BrowserRouter>
      <RouteChangeTracker />
      <Suspense fallback={<Spinner />}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
          <Route path="/kyRecommend" element={<KyRecommend />} />
          <Route
            path="/kyRecommend/:id"
            element={<ProtectedRoute element={KyRecommendDetail} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/password" element={<Password />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/administration" element={<Administration />} />
          <Route
            path="/graduate"
            element={<ProtectedRoute element={Graduate} />}
          />
          <Route path="/mypage" element={<ProtectedRoute element={Mypage} />} />
          <Route
            path="/mypage/modifyInfo"
            element={<ProtectedRoute element={ModifyInfo} />}
          />
          <Route
            path="/mypage/myreview"
            element={<ProtectedRoute element={MyReview} />}
          />
          <Route path="/more" element={<More />} />
          <Route path="/recruit" element={<Recruit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
