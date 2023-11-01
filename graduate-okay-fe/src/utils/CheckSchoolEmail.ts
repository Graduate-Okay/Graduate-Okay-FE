const slice = {
  hanshin: -9,
};

const school = {
  hanshin: `@hs.ac.kr`,
};

const CheckSchoolEmail = (email: string) => {
  let emailResult = email.slice(slice.hanshin);
  if (emailResult !== school.hanshin) {
    emailResult = emailResult + school.hanshin;
  }
  return emailResult;
};

export default CheckSchoolEmail;
