import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { AuthLayout } from "@/components/ui/layout/AuthLayout";
import { createUserWithEmailAndPassword } from "@/globalStates/userState";

export const SignUp: React.VFC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(email, password);
      await router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleChangeEmail = () => {
    (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  };
  const handleChangePassword = () => {
    (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  };

  return (
    <AuthLayout>
      <section>
        <h1 className="mb-6 text-xl font-bold">サインアップ</h1>
        <form onSubmit={handleCreateUser}>
          <div>
            <label htmlFor="email" className="block mb-1 w-20">
              Email:{" "}
            </label>
            <input
              id="email"
              className="py-1 px-2 w-full rounded border border-gray-400 border-solid"
              type="email"
              required
              onChange={handleChangeEmail}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="password" className="block mb-1 w-20">
              Password:{" "}
            </label>
            <input
              id="password"
              className="py-1 px-2 w-full rounded border border-gray-400 border-solid"
              type="password"
              required
              onChange={handleChangePassword}
            />
          </div>
          <button className="py-1 px-3 mt-4 text-white bg-blue-600 rounded border-blue-600 border-solid" type="submit">
            サインアップ
          </button>
        </form>
        <div className="text-center">
          <Link href="/login">
            <a className="inline-block mt-4 text-sm font-bold text-blue-600 hover:underline">ログインへ</a>
          </Link>
        </div>
      </section>
    </AuthLayout>
  );
};
