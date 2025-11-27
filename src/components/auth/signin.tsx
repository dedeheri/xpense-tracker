"use client";

import Image from "next/image";
import { Button } from "../ui/button";

const SignIn = () => {
  return (
    <section className="border max-w-md mx-auto m-10 rounded-lg p-10 space-y-9">
      <h1 className="font-sans font-semibold text-2xl">Log in or register</h1>

      <div
        className="
      space-y-10 "
      >
        <Button
          variant="outline"
          size="lg"
          className="rounded-full w-full h-11"
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/24px-Google_%22G%22_logo.svg.png"
            width={18}
            height={18}
            alt="google"
          />
          <span>Sign in with Google</span>
        </Button>
      </div>
    </section>
  );
};

export default SignIn;
