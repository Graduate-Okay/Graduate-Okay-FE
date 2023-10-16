const deviceSizes = {
  mobile: "375px",
  tablet: "768px",
  laptop: "1024px",
  largeLaptop: "1440px",
};

const device = {
  mobile: `screen and (min-width : ${deviceSizes.mobile})`,
  tablet: `screen and (min-width : ${deviceSizes.tablet})`,
  laptop: `screen and (min-width : ${deviceSizes.laptop})`,
  largeLaptop: `screen and (min-width : ${deviceSizes.largeLaptop})`,
};

const theme = {
  device,
};

export default theme;
