const colors = {
  black: "#1e272e",
  blue: "#0fbcf9",
  white: "white",
  gray: "#808e9b",
  mainColor: "#8f8de7",
  selectFooter: "#a489f0",
};

const fonts = {
  JejuGothic: "JejuGothic",
};

const deviceSizes = {
  mobile: 375,
  tablet: 768,
  laptop: 1024,
  largeLaptop: 1800,
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
  colors,
  fonts,
};

export default theme;
