import { apiSlice } from "../api/apiSlice";

export const venueApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // CONTINENTS

        getContinents: builder.query({
            query: () => ({
                url: "/continents",
                method: "GET",
            }),
        }),

        createContinent: builder.mutation({
            query: (data) => ({
                url: "/continents",
                method: "POST",
                body: { ...data },
            }),
        }),


    }),
    overrideExisting: true,
});

export const { useCreateContinentMutation, useGetContinentsQuery } = venueApi;
