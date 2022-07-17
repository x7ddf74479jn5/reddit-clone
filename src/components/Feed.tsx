import { useQuery } from "@apollo/client";

import { Post } from "@/components/Post";
import { GET_ALL_POSTS } from "@/graphql/queries";

export const Feed = () => {
  const { data, error } = useQuery(GET_ALL_POSTS);

  const posts: Post[] = data?.getPostList;
  return (
    <div className="mt-5 space-y-4">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
