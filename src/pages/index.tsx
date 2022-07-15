import type { CustomNextPage } from "next";
import Head from "next/head";

import { Header } from "@/components/Header";

const IndexPage: CustomNextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Reddit 2.0 Clone</title>
      </Head>

      <Header />
    </div>
  );
};

export default IndexPage;
