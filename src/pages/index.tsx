import type { CustomNextPage } from "next";
import Head from "next/head";

import { Feed } from "@/components/Feed";
import { PostBox } from "@/components/PostBox";

const IndexPage: CustomNextPage = () => {
  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Reddit 2.0 Clone</title>
      </Head>

      <PostBox />

      <div className="flex">
        <Feed />
      </div>
    </div>
  );
};

export default IndexPage;
