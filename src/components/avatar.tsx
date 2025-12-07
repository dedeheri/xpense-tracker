"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { LogOut, Palette } from "lucide-react";
import { Button } from "./ui/button";
import SwitchDarkMode from "./switch-dark-mode";

const Avatar = ({
  image,
  name,
  email,
}: {
  image: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="size-8 p-0 rounded-full" asChild>
          <Image
            loading="lazy"
            src={image || "/assets/images/default_avatar.png"}
            alt="users avatar"
            className="!rounded-full cursor-pointer"
            width={33}
            height={33}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-3xl" align="end">
        <DropdownMenuLabel>
          <div className="flex items-center space-x-3">
            <Image
              loading="lazy"
              src={image || "/assets/images/default_avatar.png"}
              alt="users avatar"
              className="rounded-full cursor-pointer"
              width={40}
              height={40}
            />

            <div className="-space-y-1">
              <h1 className="font-semibold">{name}</h1>
              <h2 className="text-muted-foreground">{email}</h2>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div
          className="w-full px-3 flex items-center justify-between hover:bg-neutral-100 hover:rounded-xl
         dark:hover:bg-neutral-800 duration-300 py-2"
        >
          <div className="flex items-center space-x-1.5 ">
            <Palette size="18" />
            <h1>Themes</h1>
          </div>
          <SwitchDarkMode />
        </div>

        {/* Settings */}
        {/* <div className="px-3 flex items-center justify-between  hover:bg-neutral-100  dark:hover:bg-neutral-800 duration-300 py-1.5">
          <div className="flex items-center space-x-1.5">
            <Settings size="18" />
            <h1>Settings</h1>
          </div>
        </div> */}

        {/* log out */}
        <div
          onClick={() => signOut()}
          className="cursor-pointer px-3 flex items-center justify-between hover:bg-neutral-100 hover:rounded-xl
            dark:hover:bg-neutral-800 duration-300 py-2 mb-1"
        >
          <div className="flex items-center space-x-1.5">
            <LogOut size="18" />
            <h1>Sign out</h1>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Avatar;
