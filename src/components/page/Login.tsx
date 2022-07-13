import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { AuthLayout } from "@/components/ui/layout/AuthLayout";
import { loginWithEmailAndPassword } from "@/globalStates/userState";

export const LogIn: React.VFC = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChangeEmail = () => {
    (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  };
  const handleChangePassword = () => {
    (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  };

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginWithEmailAndPassword(email, password);
      await push("/");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <AuthLayout>
      <section>
        <h1 className="mb-6 text-xl font-bold">ログイン</h1>
        <form onSubmit={handleLogIn}>
          <div>
            <label htmlFor="email" className="block mb-1 w-20">
              Email:{" "}
            </label>
            <input
              id="email"
              className="py-1 px-2 w-full rounded border border-gray-400 border-solid"
              type="email"
              onChange={handleChangeEmail}
              required
            />
          </div>
          <div className="mt-2">
            <label htmlFor="password" className="block mb-1 w-20">
              Password:{" "}
            </label>
            <input
              id="password"
              className=" py-1 px-2 w-full rounded border border-gray-400 border-solid"
              type="password"
              onChange={handleChangePassword}
              required
            />
          </div>
          <button className="py-1 px-3 mt-4 text-white bg-blue-600 rounded border-blue-600 border-solid" type="submit">
            ログイン
          </button>
        </form>
        <div className="text-center">
          <Link href="/signup">
            <a className="inline-block mt-4 text-sm font-bold text-blue-600 hover:underline">サインアップ</a>
          </Link>
        </div>
      </section>
    </AuthLayout>
  );
};
