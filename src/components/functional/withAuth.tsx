import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAuthState, useUserState } from "@/globalStates/userState";

export const withAuth = (Component: React.FC<any> | React.VFC<any>) => {
  const Wrapper: React.VFC<Parameters<typeof Component>[0]> = (props) => {
    const user = useUserState();
    const { push } = useRouter();
    const isLoading = useAuthState();

    useEffect(() => {
      if (!user) {
        push("/login");
      }
    }, [user]);

    Wrapper.displayName = `withAuth(${Component.displayName || Component.name})`;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return user && <Component {...props} />;
  };

  return Wrapper;
};
