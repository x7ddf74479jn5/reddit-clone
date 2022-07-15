import "@/styles/global.css";

import type { CustomAppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

const App = ({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />;
    </SessionProvider>
  );
};

export default App;
