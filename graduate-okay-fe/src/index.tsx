import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const GlobalStyle = createGlobalStyle`
  ${reset}
  a{
    text-decoration : none;
    color : black;
  }
  @font-face {
    font-family: 'JejuGothic';
    font-weight: normal;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/jeju/JejuGothic.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/jeju/JejuGothic.eot?#iefix')
            format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/jeju/JejuGothic.woff2')
            format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/jeju/JejuGothic.woff')
            format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/jeju/JejuGothic.ttf')
            format('truetype');
    font-display: swap;
  }
  html{
    font-size : 62.5%;
  }
  body{
    font-family : 'JejuGothic';
  }
`;
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
