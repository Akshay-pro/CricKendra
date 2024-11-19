import { apiSlice } from "../api/apiSlice";

export const matchesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCities: builder.query({
            query: () => ({
                url: "/cities",
                method: "GET",
            }),
        }),
        getMatchLevel: builder.query({
            query: () => ({
                url: "/matches/match-level-options",
                method: "GET",
            }),
        }),
        getMatchFormat: builder.query({
            query: () => ({
                url: "/matches/match-format-options",
                method: "GET",
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetCitiesQuery, useGetMatchFormatQuery, useGetMatchLevelQuery } = matchesApi;
