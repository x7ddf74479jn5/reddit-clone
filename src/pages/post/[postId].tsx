import { useMutation, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Post } from "@/components/Post";
import { ADD_COMMENT } from "@/graphql/mutations";
import { GET_POST_BY_POST_ID } from "@/graphql/queries";

type FormData = {
  comment: string;
};

const PostPage: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, "getPostByPostId"],
  });

  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: router.query.postId,
    },
  });

  const post: Post = data?.getPostByPostId;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);

    const notification = toast.loading("Posting your comment...");

    await addComment({
      variables: {
        post_id: router.query.postId,
        username: session?.user?.name,
        text: data.comment,
      },
    });

    setValue("comment", "");

    toast.success("Comment successfully posted!", {
      id: notification,
    });
  };

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />

      <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
        <p>
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
          <textarea
            {...register("comment")}
            disabled={!session}
            className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={session ? "What are you thoughts?" : "Please sign in to comment"}
          />
          <button type="submit" className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200">
            Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostPage;
