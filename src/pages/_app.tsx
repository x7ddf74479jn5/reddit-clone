import "@/styles/global.css";

import { ApolloProvider } from "@apollo/client";
import type { CustomAppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { Header } from "@/components/Header";
import { client } from "@/lib/apollo";

const App = ({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) => {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Toaster />
        <div className="h-screen overflow-y-scroll bg-slate-200">
          <Header />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </ApolloProvider>
  );
};

export default App;
