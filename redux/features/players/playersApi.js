import { apiSlice } from "../api/apiSlice";

export const playersApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getAllPlayers: builder.query({
            query: () => ({
                url: "/players",
                method: "GET",
            }),
        }),
        getPlayerById: builder.query({
            query: (playerId) => ({
                url: `players/${playerId}`,
                method: "GET",
            }),
        }),
        getDismissalOptions: builder.query({
            query: () => ({
                url: "/options/players/dismissal-types",
                method: "GET",
            }),
        })

    }),
    overrideExisting: true,
});

export const { useGetDismissalOptionsQuery, useGetAllPlayersQuery, useGetPlayerByIdQuery} = playersApi;
