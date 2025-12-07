"use client";

import Loading from "./loading-and-error";
import dynamic from "next/dynamic";
const Avatar = dynamic(() => import("./avatar"), {
  ssr: false,
});
import { useSession } from "next-auth/react";

const Header = () => {
  const { data, status } = useSession();

  const name = data?.user?.name;
  const email = data?.user?.email;
  const image = data?.user?.image;

  return (
    <section className="h-14 fixed top-0 left-0 right-0 backdrop-blur-lg z-50">
      <div className="max-w-5xl lg:px-0 px-5 mx-auto flex items-center justify-between h-full">
        <h1 className="text-2xl font-bold font-sans">Xpense</h1>

        <Loading
          height="h-[35px]"
          width="w-[35px]"
          isLoading={status === "loading"}
        >
          <Avatar email={email} name={name} image={image} />
        </Loading>
      </div>
    </section>
  );
};

export default Header;
