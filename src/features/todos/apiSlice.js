import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = async (args, api, extraOptions) => {
  const rawBaseQuary = fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearar ${token}`);
      }
      return headers;
    },
  });
  const response = await rawBaseQuary(args, api, extraOptions);
  if (response.error) {
    const { status } = response.error;
    if (status === 401 || status === 403) {
      console.error("Unauthorized access - Redirecting to login...");
    }
  }
  return response;
};
const fetchBaseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQueryWithRetry,
  tagTypes: ["todosApi"],
  endpoints: () => ({}),
});
