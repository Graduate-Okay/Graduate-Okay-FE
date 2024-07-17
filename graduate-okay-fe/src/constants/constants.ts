export const myPage = [
  {
    headerText: "졸업요건 조회",
    sub: [
      {
        link: "/graduate",
        text: "졸업결과 확인하기",
      },
      {
        link: "/recruit",
        text: "채용공고 확인하기",
      },
    ],
  },
  {
    headerText: "나의 정보",
    sub: [
      {
        link: "/mypage/modifyInfo",
        text: "정보 수정하기",
      },
      {
        link: "/mypage/myreview",
        text: "리뷰 관리",
      },
    ],
  },
  {
    headerText: "기타",
    sub: [
      {
        link: "/notice",
        text: "공지사항",
      },
      {
        link: "",
        text: "회원탈퇴",
      },
    ],
  },
];

export const HEADER_DATA = [
  {
    title: "인기교양추천",
    navigate: "/kyRecommend",
  },
  {
    title: "졸업요건조회",
    navigate: "/graduate",
  },
  {
    title: "채용공고",
    navigate: "/recruit",
  },
  {
    title: "마이페이지",
    navigate: "/mypage",
  },
];

export const LOGIN = {
  title: "로그인",
  navigate: "/login",
};

export const LOGOUT = {
  title: "로그아웃",
};
