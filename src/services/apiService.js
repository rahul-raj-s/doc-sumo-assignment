import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createMutation } from "./serviceHelper";

export const commonApiService = createApi({
  reducerPath: "commonApi",
  name: "commonApi",
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://apptesting.docsumo.com/api/v1/eevee",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: createMutation(builder, "login/"),
  }),
});

export const { useLoginMutation } = commonApiService;
