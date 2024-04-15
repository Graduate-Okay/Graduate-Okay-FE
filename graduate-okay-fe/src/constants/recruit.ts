const REGION = [
  {
    id: 0,
    value: "서울",
    code: "R3010",
  },
  {
    id: 1,
    value: "인천",
    code: "R3011",
  },
  {
    id: 2,
    value: "대전",
    code: "R3012",
  },
  {
    id: 3,
    value: "대구",
    code: "R3013",
  },
  {
    id: 4,
    value: "부산",
    code: "R3014",
  },
  {
    id: 5,
    value: "광주",
    code: "R3015",
  },
  {
    id: 6,
    value: "울산",
    code: "R3016",
  },
  {
    id: 7,
    value: "경기",
    code: "R3017",
  },
  {
    id: 8,
    value: "강원",
    code: "R3018",
  },
  {
    id: 9,
    value: "충남",
    code: "R3019",
  },
  {
    id: 10,
    value: "충북",
    code: "R3020",
  },
  {
    id: 11,
    value: "경북",
    code: "R3021",
  },
  {
    id: 12,
    value: "경남",
    code: "R3022",
  },
  {
    id: 13,
    value: "전남",
    code: "R3023",
  },
  {
    id: 14,
    value: "전북",
    code: "R3024",
  },
  {
    id: 15,
    value: "제주",
    code: "R3025",
  },
  {
    id: 16,
    value: "세종",
    code: "R3026",
  },
  {
    id: 17,
    value: "해외",
    code: "R3030",
  },
];

const EMPLOYMENT_TYPE = [
  {
    id: 0,
    value: "정규직",
    code: "R1010",
  },
  {
    id: 1,
    value: "계약직",
    code: "R1020",
  },
  {
    id: 2,
    value: "무기계약직",
    code: "R1030",
  },
  {
    id: 3,
    value: "비정규직",
    code: "R1040",
  },
  {
    id: 4,
    value: "청년인턴",
    code: "R1050",
  },
  {
    id: 5,
    value: "청년인턴(체험형)",
    code: "R1060",
  },
  {
    id: 6,
    value: "청년인턴(채용형)",
    code: "R1070",
  },
];

const RECRUITMENT_CLASSIFICATION = [
  {
    id: 0,
    value: "신입",
    code: "R2010",
  },
  {
    id: 1,
    value: "경력",
    code: "R2020",
  },
  {
    id: 2,
    value: "신입+경력",
    code: "R2030",
  },
  {
    id: 3,
    value: "외국인 전형",
    code: "R2040",
  },
];

const NCS_CLASSIFICATION = [
  {
    id: 0,
    value: "사업관리",
    code: "R600001",
  },
  {
    id: 1,
    value: "경영/회계/사무",
    code: "R600002",
  },
  {
    id: 2,
    value: "금융/보험",
    code: "R600003",
  },
  {
    id: 3,
    value: "교육/자연/사회과학",
    code: "R600004",
  },
  {
    id: 4,
    value: "법률/경찰/소방/교도/국방",
    code: "R600005",
  },
  {
    id: 5,
    value: "보건/의료",
    code: "R600006",
  },
  {
    id: 6,
    value: "사회복지/종교",
    code: "R600007",
  },
  {
    id: 7,
    value: "문화/예술/디자인/방송",
    code: "R600008",
  },
  {
    id: 8,
    value: "운전/운송",
    code: "R600009",
  },
  {
    id: 9,
    value: "영업판매",
    code: "R600010",
  },
  {
    id: 10,
    value: "경비/청소",
    code: "R600011",
  },
  {
    id: 11,
    value: "이용/숙박/여행/오락/스포츠",
    code: "R600012",
  },
  {
    id: 12,
    value: "음식서비스",
    code: "R600013",
  },
  {
    id: 13,
    value: "건설",
    code: "R600014",
  },
  {
    id: 14,
    value: "기계",
    code: "R600015",
  },
  {
    id: 15,
    value: "재료",
    code: "R600016",
  },
  {
    id: 16,
    value: "화학",
    code: "R600017",
  },
  {
    id: 17,
    value: "섬유/의복",
    code: "R600018",
  },
  {
    id: 18,
    value: "전기/전자",
    code: "R600019",
  },
  {
    id: 19,
    value: "정보통신",
    code: "R600020",
  },
  {
    id: 20,
    value: "식품가공",
    code: "R600021",
  },
  {
    id: 21,
    value: "인쇄/목재/가구/공예",
    code: "R600022",
  },
  {
    id: 22,
    value: "환경/에너지/안전",
    code: "R600023",
  },
  {
    id: 23,
    value: "농림어업",
    code: "R600024",
  },
  {
    id: 24,
    value: "연구",
    code: "R600025",
  },
];

const EDU_LEVEL = [
  {
    id: 0,
    value: "학력무관",
    code: "R7010",
  },
  {
    id: 1,
    value: "중졸이하",
    code: "R7020",
  },
  {
    id: 2,
    value: "고졸",
    code: "R7030",
  },
  {
    id: 3,
    value: "대졸(2~3년)",
    code: "R7040",
  },
  {
    id: 4,
    value: "대졸(4년)",
    code: "R7050",
  },
  {
    id: 5,
    value: "석사",
    code: "R7060",
  },
  {
    id: 6,
    value: "박사",
    code: "R7070",
  },
];

const recruit = {
  REGION,
  EMPLOYMENT_TYPE,
  RECRUITMENT_CLASSIFICATION,
  NCS_CLASSIFICATION,
  EDU_LEVEL,
};
export default recruit;
