import { IFetcherError } from "@/types/fetcher-type";

interface ITransactionParams {
  category?: string;
  type?: string;
  page?: string; // Optional, default to 1
  // Add other possible parameters here
}

const objectToQueryParams = (params: ITransactionParams = {}): string => {
  const searchParams = new URLSearchParams();

  for (const key in params) {
    if (params[key as keyof ITransactionParams] !== undefined) {
      searchParams.append(key, params[key]);
    }
  }
  return searchParams.toString();
};

export const standardFetcher = async ([url, params]: [
  string,
  ITransactionParams
]) => {
  const queryParams = objectToQueryParams(params);
  let fullUrl: string;

  if (url === "/api/transaction") {
    fullUrl = queryParams ? `${url}?${queryParams}` : url;
  } else {
    fullUrl = url;
  }

  const res = await fetch(fullUrl);

  if (!res.ok) {
    const errorBody = await res.json();

    throw {
      status: res.status,
      isError: true,
      message: errorBody.error || "Gagal memuat data",
    } as IFetcherError;
  }

  return res.json();
};

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export interface MutationPayload<T = unknown> {
  data?: T; // data menjadi opsional dan tipenya dinamis (default 'unknown')
  method: HttpMethod;
}

export const dynamicFetcher = async (
  urlArray: string[],
  { arg }: { arg: MutationPayload }
) => {
  const { data, method } = arg;

  const fetchPromise = urlArray.map(async (url: string) => {
    const res = await fetch(url, {
      method: method, // Gunakan method yang diteruskan
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Kirim data sebagai JSON string
    });

    return await res.json();
  });

  return await Promise.all(fetchPromise);
};

// export const dynamicFetcher = async <T, R>(
//   url: string,
//   arg?: { arg: MutationPayload<T> }
// ): Promise<R> => {
//   const method: HttpMethod = arg?.arg?.method || "GET";
//   const data: T | undefined = arg?.arg?.data;

//   const options: RequestInit = {
//     method: method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   if (data !== undefined && method !== "GET" && method !== "DELETE") {
//     options.body = JSON.stringify(data);
//   }

//   return (await fetch(url, options)).json() as Promise<R>;
// };
