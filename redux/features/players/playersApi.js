import { apiSlice } from "../api/apiSlice";

export const playersApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getDismissalOptions: builder.query({
            query: () => ({
                url: "/options/players/dismissal-types",
                method: "GET",
            }),
        })

    }),
    overrideExisting: true,
});

export const { useGetDismissalOptionsQuery } = playersApi;
