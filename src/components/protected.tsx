"use client";

import { signIn, useSession } from "next-auth/react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { useState } from "react";
import { Input } from "./ui/input";
import { LoaderCircle, Mail } from "lucide-react";

type ProtectdProps = {
  children: React.ReactNode;
};

const Protected = ({ children }: ProtectdProps) => {
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<string>("");

  const handleSignIn = async (provider: string, isEmail?: string) => {
    try {
      setIsLoading(true); // Start loading
      await signIn(provider, {
        email: isEmail,
        redirect: false,
      });
    } catch (error) {
      console.log(`error`, error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <section>
      <AlertDialog open={status === "unauthenticated"}>
        <AlertDialogContent className="w-96">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-center">
              Login or Register
            </AlertDialogTitle>
          </AlertDialogHeader>

          <div className="pt-8 space-y-5">
            <Button
              className="h-11 w-full rounded-full cursor-pointer"
              variant="outline"
              disabled={isLoading}
              onClick={() => handleSignIn("google")}
            >
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <LoaderCircle className="size-5 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                    alt="google logo"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span>Continue with Google</span>
                </div>
              )}
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {children}
    </section>
  );
};

export default Protected;
