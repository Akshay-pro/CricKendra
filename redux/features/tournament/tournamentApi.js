import { apiSlice } from "../api/apiSlice";

export const tournamentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTounament: builder.mutation({
            query: (data) => ({
                url: "/tournaments",
                method: "POST",
                body: { ...data },
            }),
        }),
    }),
    overrideExisting: true,
});

export const { useCreateTounamentMutation } = tournamentApi;
