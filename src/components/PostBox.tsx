import { useMutation } from "@apollo/client";
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Avatar } from "@/components/Avatar";
import { ADD_POST, ADD_SUBREDDIT } from "@/graphql/mutations";
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from "@/graphql/queries";
import { client } from "@/lib/apollo";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

type PostBoxProps = {
  subreddit?: string;
};

export const PostBox: React.FC<PostBoxProps> = ({ subreddit }) => {
  const { data: session } = useSession();
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, "getPostList"],
  });
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [isImageBoxOpen, setIsImageBoxOpen] = useState(false);

  const handleClickPhoto = () => {
    setIsImageBoxOpen((isOpen) => !isOpen);
  };

  const handleFormSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    const notification = toast.loading("Creating new post...");

    try {
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: subreddit || formData.subreddit,
        },
      });

      const isSubredditExists = getSubredditListByTopic.length > 0;

      if (!isSubredditExists) {
        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });

        console.log("Creating post...", formData);

        const image = formData.postImage || "";

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log("New post added", newPost);
      } else {
        console.log(getSubredditListByTopic);

        const image = formData.postImage || "";

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log("New post added", newPost);
      }

      setValue("postBody", "");
      setValue("postImage", "");
      setValue("postTitle", "");
      setValue("subreddit", "");

      toast.success("New post created!", {
        id: notification,
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", {
        id: notification,
      });
    }
  });

  return (
    <form onSubmit={handleFormSubmit} className="sticky top-20 z-50 rounded-md border border-gray-300 bg-white p-2">
      <div className="flex items-center space-x-3">
        <Avatar />

        <input
          {...register("postTitle", { required: true })}
          disabled={!session}
          className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
          type="text"
          placeholder={
            session
              ? subreddit
                ? `Create a post by r/${subreddit}`
                : "Crete a post by entering title!"
              : "Sign in to post"
          }
        />

        <PhotographIcon
          onClick={handleClickPhoto}
          className={`h-6 cursor-pointer text-gray-300 ${isImageBoxOpen && "text-blue-300"} `}
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>

      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              {...register("postBody")}
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              type="text"
              placeholder="Text (optional)"
            />
          </div>

          {!subreddit && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Subreddit:</p>
              <input
                {...register("subreddit", { required: true })}
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                type="text"
                placeholder="i.e. reactjs"
              />
            </div>
          )}

          {isImageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                {...register("postImage")}
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                type="text"
                placeholder="Optional..."
              />
            </div>
          )}

          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === "required" && <p>- A Post Title is required</p>}

              {errors.subreddit?.type === "required" && <p>- A Subreddit is required</p>}
            </div>
          )}

          {!!watch("postTitle") && (
            <button className="w-full rounded-full bg-blue-400 p-2 text-white" type="submit">
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
};
