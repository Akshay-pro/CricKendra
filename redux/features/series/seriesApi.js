import { apiSlice } from "../api/apiSlice";

export const seriesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSeriesById: builder.query({
            query: (seriesId) => `/series/${seriesId}`,
        }),
        getSeriesMatches: builder.query({
            query: (seriesId) => `/series/${seriesId}/matches`,
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetSeriesByIdQuery,
    useGetSeriesMatchesQuery
} = seriesApi;
