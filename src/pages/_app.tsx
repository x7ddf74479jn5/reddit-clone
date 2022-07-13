import "@/styles/global.css";

import type { CustomAppProps } from "next/app";
import { memo } from "react";

const App = ({ Component, pageProps }: CustomAppProps) => {
  return <Component {...pageProps} />;
};

export default memo(App);
