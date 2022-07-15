import "@/styles/global.css";

import type { CustomAppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { Header } from "@/components/Header";

const App = ({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) => {
  return (
    <SessionProvider session={session}>
      <div className="h-screen overflow-y-scroll bg-slate-200">
        <Header />
      </div>
      <Component {...pageProps} />;
    </SessionProvider>
  );
};

export default App;
