import { useMutation, useQuery } from "@apollo/client";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { Jelly } from "@uiball/loaders";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Timeago from "react-timeago";

import { Avatar } from "@/components/Avatar";
import { ADD_VOTE } from "@/graphql/mutations";
import { GET_ALL_VOTES_BY_POST_ID } from "@/graphql/queries";

type PostProps = {
  post: Post;
};

export const Post: React.FC<PostProps> = ({ post }) => {
  const [isVote, setIsVote] = useState<boolean | undefined>(undefined);
  const { data: session } = useSession();

  const { data, loading } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  });

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, "getVotesByPostId"],
  });

  const handleVote = async (isUpvote: boolean) => {
    if (!session) {
      toast("❗️ You'll need to sign up to vote");
      return;
    }

    if (isVote && isUpvote) return;
    if (isVote === false && !isUpvote) return;

    console.log("voting...", isUpvote);

    await addVote({
      variables: {
        post_id: post.id,
        username: session?.user?.name,
        upvote: isUpvote,
      },
    });
  };

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId;

    const isVote = votes?.find((vote) => vote.username == session?.user?.name)?.upvote;

    setIsVote(isVote);
  }, [data]);

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId;
    const displayNumber = votes?.reduce((total, vote) => (vote.upvote ? (total += 1) : (total -= 1)), 0);

    if (votes?.length === 0) return 0;

    if (displayNumber === 0) {
      return votes[0]?.upvote ? 1 : -1;
    }

    return displayNumber;
  };

  if (!post) {
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#FF4501" />
      </div>
    );
  }

  return (
    <Link href={`/post/${post.id}`}>
      <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600 ">
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          <ArrowUpIcon
            onClick={() => handleVote(true)}
            className={`voteButtons hover:text-red-400 ${isVote && "text-red-400"}`}
          />
          <p className="text-sm font-bold text-black">{displayVotes(data)}</p>
          <ArrowDownIcon
            onClick={() => handleVote(false)}
            className={`voteButtons hover:text-blue-400 ${isVote === false && "text-blue-400"}`}
          />
        </div>

        <div className="p-3 pb-1">
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className="text-sm text-gray-400">
              <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                <span className="font-bold text-black hover:text-blue-400 hover:underline">
                  r/{post.subreddit[0]?.topic}
                </span>
              </Link>{" "}
              - Posted by u/{post.username} <Timeago date={post.created_at} />
            </p>
          </div>

          <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>

          <img className="w-full" src={post.image} alt="" />

          <div className="flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatIcon className="h-6 w-6" />
              <p className="">{post.comments.length} Comments</p>
            </div>
            <div className="postButtons">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Award</p>
            </div>
            <div className="postButtons">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="postButtons">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
            <div className="postButtons">
              <DotsHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
