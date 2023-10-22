const deviceSizes = {
  mobile: 375,
  tablet: 768,
  laptop: 1024,
  largeLaptop: 1440,
};

const device = {
  mobile: `screen and (min-width : ${deviceSizes.mobile}px)`,
  tablet: `screen and (min-width : ${deviceSizes.tablet}px)`,
  laptop: `screen and (min-width : ${deviceSizes.laptop}px)`,
  largeLaptop: `screen and (min-width : ${deviceSizes.largeLaptop}px)`,
};

const theme = {
  device,
  deviceSizes,
};

export default theme;
