/**
 * 한신대학교 이메일이 입력되지않으면 붙여주는 유틸 함수
 * @param email - 입력받은 이메일 문자열
 * @returns 이메일 결과값
 */
const CheckSchoolEmail = (email: string) => {
  const emailSuffix = `@hs.ac.kr`;
  const hanshinEmail = `${email}${emailSuffix}`;

  return email.endsWith(emailSuffix) ? email : hanshinEmail;
};

export default CheckSchoolEmail;
