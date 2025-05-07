import { apiSlice } from "../api/apiSlice";

export const statsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getFilterOptions: builder.query({
            query: ({playingFormat, formatGender}) => {       
              return `/stats/filter-options?playing_format=${playingFormat}&is_male=${formatGender}`;
            },
          }),

          getStatsData: builder.query({
            query: (queryUrl) => {       
              return `${queryUrl}`
            },
          }),
    }),
    overrideExisting: true,
});

export const { useGetFilterOptionsQuery, useGetStatsDataQuery} = statsApi;
