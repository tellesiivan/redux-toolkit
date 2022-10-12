import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// type
import type { BitcoinData } from "../bitcoinTypes";

const BASE_URL = "https://blockchain.info";

export const bitcoinApi = createApi({
  reducerPath: "bitcoinAPi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    // undefined, since we have no param that needs to be passsed, if we did then it could be a number | string
    getBitcoinData: builder.query<BitcoinData, undefined>({
      query: () => "/ticker",
    }),
  }),
});

export const { useGetBitcoinDataQuery } = bitcoinApi;
