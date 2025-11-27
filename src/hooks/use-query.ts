import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useQueryHandler = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSetQuery = (key: string, value: string): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return { handleSetQuery };
};
