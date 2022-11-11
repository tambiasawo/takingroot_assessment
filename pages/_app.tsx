import "../styles/globals.css";
import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import { UserContext } from "../lib/user";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient();
  const [user, setUser] = React.useState(null);
  useEffect(() => {
    /**
     * Here goes the logic of retrieving a user
     * from the backend and redirecting
     * an unauthorized user
     * to the login page
     */
    //setUser(result)
  }, []);

  return (
    <UserContext.Provider value={user}>
      <QueryClientProvider client={client}>
        {" "}
        <Component {...pageProps} />
      </QueryClientProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
