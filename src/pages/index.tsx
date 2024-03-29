import { useQuery } from "@apollo/client";
import type { CustomNextPage } from "next";
import Head from "next/head";

import { Feed } from "@/components/Feed";
import { PostBox } from "@/components/PostBox";
import { SubredditRow } from "@/components/SubredditRow";
import { GET_SUBREDDIT_WITH_LIMIT } from "@/graphql/queries";

const IndexPage: CustomNextPage = () => {
  const { data } = useQuery(GET_SUBREDDIT_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  });

  const subreddits: Subreddit[] = data?.getSubredditListLimit;

  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Reddit 2.0 Clone</title>
      </Head>

      <PostBox />

      <div className="flex">
        <Feed />

        <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
          <p className="mb-1 p-4 pb-3 text-base font-bold ">Top Communities</p>
          <div>
            {subreddits?.map((subreddit, i) => (
              <SubredditRow key={subreddit.id} topic={subreddit.topic} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
