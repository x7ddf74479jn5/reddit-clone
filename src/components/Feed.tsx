import { useQuery } from "@apollo/client";

import { Post } from "@/components/Post";
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from "@/graphql/queries";

type FeedProps = {
  topic?: string;
};

export const Feed: React.FC<FeedProps> = ({ topic }) => {
  const params = !topic
    ? { query: GET_ALL_POSTS, options: undefined }
    : {
        query: GET_ALL_POSTS_BY_TOPIC,
        options: {
          variables: {
            topic: topic,
          },
        },
      };

  const { data, error } = useQuery(params.query, params.options);
  const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic;

  return (
    <div className="mt-5 space-y-4">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
