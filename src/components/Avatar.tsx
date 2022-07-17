import Image from "next/image";
import { useSession } from "next-auth/react";

type AvatarProps = {
  seed?: string | undefined;
  large?: string | undefined;
};

export const Avatar: React.FC<AvatarProps> = ({ seed, large }) => {
  const { data: session } = useSession();

  return (
    <div className={`relative h-10 w-10 overflow-hidden rounded-full border-gray-300 bg-white ${large && "h-20 w-20"}`}>
      <Image
        layout="fill"
        src={`https://avatars.dicebear.com/api/open-peeps/${seed || session?.user?.name || "placeholder"}.svg`}
        alt=""
      />
    </div>
  );
};
