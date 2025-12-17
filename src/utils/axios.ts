import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    Promise.reject({
      message: error.response?.data?.error,
      isError: error.response?.data?.error ? true : false,
      status: error?.response?.status,
    });
  }
);

export default axiosInstance;

interface ITransactionParams {
  category?: string;
  type?: string;
  page?: string;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export interface MutationPayload<T = unknown> {
  data?: T; // data menjadi opsional dan tipenya dinamis (default 'unknown')
  method: HttpMethod;
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

export const standardFetchers = async (args: string) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const queryParams = objectToQueryParams(config);

  const shouldAppendParams =
    url === "/api/transaction" || "/api/transaction/chart";
  const fullUrl = shouldAppendParams ? `${url}?${queryParams}` : url;
  try {
    const response = await axiosInstance.get(fullUrl);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const dynamicFetcher = async (
  url: string,
  { arg }: { arg: MutationPayload }
) => {
  const { data, method } = arg;

  if (method === "POST") {
    try {
      const response = await axiosInstance.post(url, data);

      return response.data;
    } catch (error) {
      // console.log(`axios`, error);
      throw error;
    }
  }

  // return fetch(url, {
  //   method: method,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .catch((error) => {
  //     console.log({ error });
  //   });
};
