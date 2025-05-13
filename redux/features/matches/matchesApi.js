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

        getMatchSummary: builder.query({
            query: (matchId) => `/matches/${matchId}/summary`,
        }),

        getMatchScorecard: builder.query({
            query: (matchId) => `/matches/${matchId}/full-scorecard`,
        }),

        getMatchSquad: builder.query({
            query: (matchId) => `/matches/${matchId}/squads`,
        }),
        getMatchInningCommentary: builder.query({
            query: ({ matchId, inningsId }) => {
                return `/matches/${matchId}/innings/${inningsId}/commentary`;
            },
        }),

        getCompletedMatches: builder.query({
            query: () => "/matches?match_state=completed",
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetCitiesQuery,
    useGetMatchFormatQuery,
    useGetMatchLevelQuery,
    useGetMatchSummaryQuery,
    useGetMatchScorecardQuery,
    useGetMatchSquadQuery,
    useGetMatchInningCommentaryQuery,
    useGetCompletedMatchesQuery
} = matchesApi;
