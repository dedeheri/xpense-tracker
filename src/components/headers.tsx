"use client";

import Loading from "./loading-and-error";
import dynamic from "next/dynamic";
const Avatar = dynamic(() => import("./avatar"), {
  ssr: false,
});
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const Header = () => {
  const { data, status } = useSession();
  const pathName = usePathname();

  const name = data?.user?.name;
  const email = data?.user?.email;
  const image = data?.user?.image;

  return (
    <section className="h-14 fixed top-0 left-0 right-0 backdrop-blur-lg z-50">
      <div className="max-w-5xl lg:px-0 px-5 mx-auto flex items-center justify-between h-full">
        <div className="flex space-x-1 items-center">
          <Link href={"/"}>
            <Button
              variant={"ghost"}
              className="rounded-xl cursor-pointer px-3"
            >
              <h1 className="text-2xl font-bold font-sans">X</h1>
            </Button>
          </Link>

          {/* <Link href={"/"}>
            <Button
              variant={pathName === "/" ? "secondary" : "ghost"}
              className="rounded-full cursor-pointer px-3"
            >
              <p>Tracking</p>
            </Button>
          </Link>

          <Link href={"/targets"}>
            <Button
              variant={pathName === "/targets" ? "secondary" : "ghost"}
              className="rounded-full cursor-pointer px-3"
            >
              <p>Target</p>
            </Button>
          </Link> */}
        </div>

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
