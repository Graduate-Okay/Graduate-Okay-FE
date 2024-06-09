/**
 * @param email - 입력받은 이메일 문자열
 * @param password
 */
export const isEmpty = (email: string, password?: string) => {
  if (password) {
    return email === "" || password === "";
  }
  return email === "";
};

/**
 * 영어 혹은 숫자만 입력받았는지 체크하는 함수
 * @param email - 입력받은 이메일 문자열
 */
export const emailValidate = (email: string) => {
  const regex =
    /^([A-Za-z0-9]+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/;
  return !regex.test(email);
};

/**
 * 한신대학교 이메일이 입력되지않으면 붙여주는 유틸 함수
 * @param email - 입력받은 이메일 문자열
 * @returns 이메일 결과값
 */
export const checkSchoolEmail = (email: string) => {
  const emailSuffix = `@hs.ac.kr`;
  const hanshinEmail = `${email}${emailSuffix}`;
  const allowedDomains = ["@hs.ac.kr", "@hanshin.ac.kr"];

  if (allowedDomains.some((domain) => email.endsWith(domain))) {
    return email.replace(/@hanshin.ac.kr$/, "@hs.ac.kr");
  }

  return hanshinEmail;
};
