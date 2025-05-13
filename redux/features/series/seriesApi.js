import { apiSlice } from "../api/apiSlice";

export const seriesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSeriesById: builder.query({
            query: (seriesId) => `/series/${seriesId}`,
        }),
        getSeriesMatches: builder.query({
            query: (seriesId) => `/series/${seriesId}/matches`,
        }),
        getSeries: builder.query({
            query: (page = 1) => `/series?__page=${page}`,
        }),
    }),
    overrideExisting: false,
});

export const { useGetSeriesByIdQuery, useGetSeriesMatchesQuery, useGetSeriesQuery } = seriesApi;
