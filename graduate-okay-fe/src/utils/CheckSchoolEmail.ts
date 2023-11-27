const slice = {
  hanshin: -9,
};

const school = {
  hanshin: `@hs.ac.kr`,
};

/**
 * 한신대학교 이메일이 입력되지않으면 붙여주는 유틸 함수
 * @param email - 입력받은 이메일 문자열
 * @returns 이메일 결과값
 */
const CheckSchoolEmail = (email: string) => {
  let emailResult = email.slice(slice.hanshin);
  if (emailResult !== school.hanshin) {
    emailResult = emailResult + school.hanshin;
  }
  return emailResult;
};

export default CheckSchoolEmail;
