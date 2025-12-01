import { authSession } from "./auth";

interface ISessions {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  userId?: string | null;
}

export const sessions = async (): Promise<ISessions> => {
  const session = await authSession();

  return {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    image: session?.user?.image || "",
    userId: session?.user?.sub || "",
  };
};
