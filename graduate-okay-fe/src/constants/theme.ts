const deviceSizes = {
  mobile: "375px",
  tablet: "768px",
  laptop: "1024px",
  largeLaptop: "1440px",
};

const device = {
  mobile: `screen and (max-width : ${deviceSizes.mobile})`,
  tablet: `screen and (max-width : ${deviceSizes.tablet})`,
  laptop: `screen and (max-width : ${deviceSizes.laptop})`,
  largeLaptop: `screen and (max-width : ${deviceSizes.largeLaptop})`,
};

const theme = {
  device,
};

export default theme;
