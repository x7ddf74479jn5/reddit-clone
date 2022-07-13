import { useRouter } from "next/router";
import { useEffect } from "react";

import { useUserState } from "@/globalStates/userState";

export const AuthLayout: React.FC = ({ children }) => {
  const { push } = useRouter();
  const user = useUserState();

  useEffect(() => {
    user && push("/");
  }, [user]);

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="w-11/12 max-w-lg">{children}</div>
    </div>
  );
};
