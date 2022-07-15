import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Avatar } from "@/components/Avatar";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

export const PostBox = () => {
  const { data: session } = useSession();
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
  });

  return (
    <form onSubmit={handleFormSubmit} className="sticky top-16 z-50 rounded-md border border-gray-300 bg-white p-2">
      <div className="flex items-center space-x-3">
        <Avatar />

        <input
          {...register("postTitle", { required: true })}
          disabled={!session}
          className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
          type="text"
          placeholder={session ? "Crete a post by entering title!" : "Sign in to post"}
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

          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input
              {...register("subreddit", { required: true })}
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              type="text"
              placeholder="i.e. reactjs"
            />
          </div>

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
