import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllTeams: builder.query({
            query: (pageNumber) => ({
                url: `/teams?__page=${pageNumber}`,
                method: "GET",
            }),
        }),
    }),
    overrideExisting: true,
});

export const { useGetAllTeamsQuery } = teamsApi;
