import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon, HomeIcon, MenuIcon, SearchIcon } from "@heroicons/react/solid";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="sticky top-0 z-50  flex bg-white px-4 py-2 shadow-sm">
      <div className="relative h-10 w-20 shrink-0 cursor-pointer">
        <Image src="/images/Reddit_logo_new.svg.png" objectFit="contain" layout="fill" alt="" />
      </div>

      <div className="mx-7 flex items-center xl:min-w-[300px] ">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      <form className="flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1 ">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input className="flex-1 bg-transparent outline-none" type="text" placeholder="Search Reddit" />
        <button type="submit" hidden></button>
      </form>

      <div className="mx-5  hidden items-center space-x-2 text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>

      <div className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex">
        <div className="relative h-5 w-5 shrink-0">
          <Image
            objectFit="contain"
            src="/images/52053-reddit-logo-icon-vector-icon-vector-eps.png"
            alt=""
            layout="fill"
            height={5}
            width={5}
          />
        </div>

        <p className="text-gray-400">Sign In</p>
      </div>
    </div>
  );
};
