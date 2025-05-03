import { apiSlice } from "../api/apiSlice";

export const statsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // getFilterOptions: builder.query({
        //     query: ({playingFormat, playingGender}) => ({
        //         url: `/stats/filter-options?playing_format=${playingFormat}&is_male=${playingGender}`,
        //         method: "GET",
        //     }),
        // }),

        getFilterOptions: builder.query({
            query: ({playingFormat, formatGender}) => {
                console.log(playingFormat + " " + formatGender)          
              return `/stats/filter-options?playing_format=${playingFormat}&is_male=${formatGender}`;
            },
          }),
    }),
    overrideExisting: true,
});

export const { useGetFilterOptionsQuery } = statsApi;
