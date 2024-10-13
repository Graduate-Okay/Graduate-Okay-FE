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
    font-family: 'Jeju Gothic';
    font-style: normal;
    font-weight: 400;
    src: url(//fonts.gstatic.com/ea/jejugothic/v3/JejuGothic-Regular.eot);
    src: url(//fonts.gstatic.com/ea/jejugothic/v3/JejuGothic-Regular.eot?#iefix) format('embedded-opentype'),
         url(//fonts.gstatic.com/ea/jejugothic/v3/JejuGothic-Regular.woff2) format('woff2'),
         url(//fonts.gstatic.com/ea/jejugothic/v3/JejuGothic-Regular.woff) format('woff'),
         url(//fonts.gstatic.com/ea/jejugothic/v3/JejuGothic-Regular.ttf) format('truetype');
  }
  html{
    font-size : 62.5%;
  }
  body{
    font-family : 'Jeju Gothic';
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
