import React from "react";
import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
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

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <GlobalStyle />
        <App />
      </CookiesProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </React.StrictMode>
);
