import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      {" "}
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
