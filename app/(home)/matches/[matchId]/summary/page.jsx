"use client";
import { useGetMatchSummaryQuery } from "@/redux/features/matches/matchesApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MatchHeader from "@/components/match/MatchHeader";
import SingleMatchTabs from "@/components/match/SingleMatchTabs";
const page = ({ params: asyncParams }) => {
    const { matchId } = React.use(asyncParams);

    const [matchHeader, setMatchHeader] = useState([]);
    const [scorecardSummary, setScorecardSummary] = useState([]);
    const [latestCommentary, setLatestCommentary] = useState([]);
    const [inningsScore, setInningsScore] = useState([]);
    const {
        data: matchData,
        error,
        isLoading,
        isSuccess,
    } = useGetMatchSummaryQuery(matchId);

    const [lastInningId, setLastInningId] = useState(null);

    const lastInningIdFunction = (inningId) => {
        setLastInningId(inningId);
    };
    useEffect(() => {
        if (matchData) {
            if (matchData?.data?.match_header) {
                setMatchHeader(matchData.data.match_header);
            }
            if (matchData?.data?.scorecard_summary) {
                setScorecardSummary(matchData.data.scorecard_summary);
            }
            if (matchData?.data?.latest_commentary) {
                setLatestCommentary(matchData.data.latest_commentary);
            }
        }
    }, [matchData]);

    useEffect(() => {
        if (matchHeader?.innings_scores) {
            const sortedInningScore = [...matchHeader?.innings_scores].sort(
                (a, b) => a.innings_number - b.innings_number
            );
            setInningsScore(sortedInningScore);
        }
    }, [matchHeader]);

    // console.log(matchHeader);
    console.log(matchHeader);

    const getOrdinalSuffix = (number) => {
        const suffix = ["th", "st", "nd", "rd"];
        const lastTwoDigits = number % 100;

        if (number == null) {
            return "";
        }
        return (
            number +
            suffix[
                lastTwoDigits % 10 && (lastTwoDigits < 11 || lastTwoDigits > 13)
                    ? number % 10
                    : 0
            ]
        );
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {matchHeader && (
                <div className="py-2 my-4">
                    <MatchHeader
                        matchId={matchId}
                        lastInningIdFunction={lastInningIdFunction}
                    />

                    <SingleMatchTabs
                        matchId={matchId}
                        inningId={lastInningId}
                    />
                    {scorecardSummary && (
                        <div className="mt-10 flex">
                            <div className="w-3/4">
                                <p className="border bg-[#ededed] p-2">
                                    ScoreCard Summary
                                </p>

                                <div className="summary-team1">
                                    <h4 className="p-2 border">
                                        <span className="font-bold">
                                            {
                                                scorecardSummary[0]
                                                    ?.batting_team_name
                                            }{" "}
                                            :{scorecardSummary[0]?.total_runs} /
                                            {scorecardSummary[0]?.total_wickets}
                                        </span>
                                        <span className="pl-2">
                                            (
                                            {Math.floor(
                                                scorecardSummary[0]
                                                    ?.total_overs / 6
                                            )}
                                            .
                                            {scorecardSummary[0]?.total_overs %
                                                6}
                                            )
                                        </span>
                                    </h4>
                                    <div className="flex">
                                        <div className="flex justify-between border w-1/2 p-2 text-[#575757]">
                                            <h4 className="font-bold">
                                                {
                                                    scorecardSummary[0]
                                                        ?.top_batters[0]
                                                        .batter_name
                                                }
                                            </h4>
                                            <p>
                                                <span className="font-bold">
                                                    {
                                                        scorecardSummary[0]
                                                            ?.top_batters[0]
                                                            .runs_scored
                                                    }
                                                </span>{" "}
                                                (
                                                {
                                                    scorecardSummary[0]
                                                        ?.top_batters[0]
                                                        .balls_faced
                                                }
                                                )
                                            </p>
                                        </div>
                                        <div className="flex justify-between border w-1/2 p-2">
                                            <h4 className="font-bold">
                                                {
                                                    scorecardSummary[1]
                                                        ?.top_bowlers[0]
                                                        .bowler_name
                                                }
                                            </h4>
                                            <p>
                                                <span className="font-bold">
                                                    {
                                                        scorecardSummary[1]
                                                            ?.top_bowlers[0]
                                                            .wickets_taken
                                                    }{" "}
                                                    /{" "}
                                                    {
                                                        scorecardSummary[1]
                                                            ?.top_bowlers[0]
                                                            .runs_conceded
                                                    }
                                                </span>{" "}
                                                (
                                                {
                                                    scorecardSummary[1]
                                                        ?.top_bowlers[0]
                                                        .overs_bowled
                                                }
                                                )
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex justify-between border w-1/2 p-2 text-[#575757]">
                                            <h4 className="font-bold">
                                                {
                                                    scorecardSummary[0]
                                                        ?.top_batters[1]
                                                        .batter_name
                                                }
                                            </h4>
                                            <p>
                                                <span className="font-bold">
                                                    {
                                                        scorecardSummary[0]
                                                            ?.top_batters[1]
                                                            .runs_scored
                                                    }
                                                </span>{" "}
                                                (
                                                {
                                                    scorecardSummary[0]
                                                        ?.top_batters[1]
                                                        .balls_faced
                                                }
                                                )
                                            </p>
                                        </div>
                                        <div className="flex justify-between border w-1/2 p-2">
                                            <h4 className="font-bold">
                                                {
                                                    scorecardSummary[1]
                                                        ?.top_bowlers[1]
                                                        .bowler_name
                                                }
                                            </h4>
                                            <p>
                                                <span className="font-bold">
                                                    {
                                                        scorecardSummary[1]
                                                            ?.top_bowlers[1]
                                                            .wickets_taken
                                                    }{" "}
                                                    /{" "}
                                                    {
                                                        scorecardSummary[1]
                                                            ?.top_bowlers[1]
                                                            .runs_conceded
                                                    }
                                                </span>{" "}
                                                (
                                                {
                                                    scorecardSummary[1]
                                                        ?.top_bowlers[1]
                                                        .overs_bowled
                                                }
                                                )
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="summary-team2 ">
                                    <h4 className="p-2 border">
                                        <span className="font-bold">
                                            {
                                                scorecardSummary[1]
                                                    ?.batting_team_name
                                            }{" "}
                                            :{scorecardSummary[1]?.total_runs} /
                                            {scorecardSummary[1]?.total_wickets}
                                        </span>
                                        <span className="pl-2">
                                            (
                                            {Math.floor(
                                                scorecardSummary[1]
                                                    ?.total_overs / 6
                                            )}
                                            .
                                            {scorecardSummary[1]?.total_overs %
                                                6}
                                            )
                                        </span>
                                    </h4>
                                    <div className="flex border">
                                        <div className="flex justify-between border w-1/2 p-2 text-[#575757]">
                                            <h4 className="font-bold">
                                                {
                                                    scorecardSummary[1]
                                                        ?.top_batters[0]
                                                        .batter_name
                                                }
                                            </h4>
                                            <p>
                                                <span className="font-bold">
                                                    {
                                                        scorecardSummary[1]
                                                            ?.top_batters[0]
                                                            .runs_scored
                                                    }
                                                </span>{" "}
                                                (
                                                {
                                                    scorecardSummary[1]
                                                        ?.top_batters[0]
                                                        .balls_faced
                                                }
                                                )
                                            </p>
                                        </div>
                                        <div className="flex justify-between border w-1/2 p-2">
                                            <h4 className="font-bold">
                                                {
                                                    scorecardSummary[0]
                                                        ?.top_bowlers[0]
                                                        .bowler_name
                                                }
                                            </h4>
                                            <p>
                                                <span className="font-bold">
                                                    {
                                                        scorecardSummary[0]
                                                            ?.top_bowlers[0]
                                                            .wickets_taken
                                                    }{" "}
                                                    /{" "}
                                                    {
                                                        scorecardSummary[0]
                                                            ?.top_bowlers[0]
                                                            .runs_conceded
                                                    }
                                                </span>{" "}
                                                (
                                                {
                                                    scorecardSummary[0]
                                                        ?.top_bowlers[0]
                                                        .overs_bowled
                                                }
                                                )
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <div className="flex justify-between border w-1/2 p-2 text-[#575757]">
                                            <h4 className="font-bold">
                                                {
                                                    scorecardSummary[1]
                                                        ?.top_batters[1]
                                                        .batter_name
                                                }
                                            </h4>
                                            <p>
                                                <span className="font-bold">
                                                    {
                                                        scorecardSummary[1]
                                                            ?.top_batters[1]
                                                            .runs_scored
                                                    }
                                                </span>{" "}
                                                (
                                                {
                                                    scorecardSummary[1]
                                                        ?.top_batters[1]
                                                        .balls_faced
                                                }
                                                )
                                            </p>
                                        </div>
                                        <div className="flex justify-between border w-1/2 p-2">
                                            <h4 className="font-bold">
                                                {
                                                    scorecardSummary[0]
                                                        ?.top_bowlers[1]
                                                        .bowler_name
                                                }
                                            </h4>
                                            <p>
                                                <span className="font-bold">
                                                    {
                                                        scorecardSummary[0]
                                                            ?.top_bowlers[1]
                                                            .wickets_taken
                                                    }{" "}
                                                    /{" "}
                                                    {
                                                        scorecardSummary[0]
                                                            ?.top_bowlers[1]
                                                            .runs_conceded
                                                    }
                                                </span>{" "}
                                                (
                                                {
                                                    scorecardSummary[0]
                                                        ?.top_bowlers[1]
                                                        .overs_bowled
                                                }
                                                )
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-blue-400 p-2 text-center">
                                    <a href="" className="text-blue-500">
                                        View Full ScoreCard
                                    </a>
                                </div>
                            </div>
                            <div className="w-1/4">
                                <p className="border bg-[#ededed] p-2">
                                    Match Details
                                </p>
                                <div className="text-[#575757]">
                                    <a href="#" className="font-bold p-2 block">
                                        {matchHeader.ground_name}
                                    </a>
                                    {/* {is_toss_decision_bat && (
                                        <div className="flex">
                                            <p className="w-1/4 font-bold border p-2">
                                                Toss
                                            </p>
                                            <p className="w-3/4 border p-2">
                                                {}
                                            </p>
                                        </div>
                                    )} */}
                                    <div className="flex">
                                        <p className="w-1/4 font-bold border p-2">
                                            Series
                                        </p>
                                        <p className="w-3/4 border p-2">
                                            {matchHeader?.main_series_name}
                                        </p>
                                    </div>

                                    <div className="flex">
                                        <p className="w-1/4 font-bold border p-2">
                                            Season
                                        </p>
                                        <p className="w-3/4 border p-2">
                                            {matchHeader?.season}
                                        </p>
                                    </div>

                                    <div className="flex">
                                        <p className="w-1/4 font-bold border p-2">
                                            Player of the match
                                        </p>
                                        <p className="w-3/4 border p-2">
                                            {
                                                matchHeader?.player_awards?.[0]
                                                    ?.player_name
                                            }
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <p className="w-1/4 font-bold border p-2">
                                            Match Number
                                        </p>
                                        <p className="w-3/4 border p-2">
                                            {matchHeader?.match_id}
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <p className="w-1/4 font-bold border p-2">
                                            Match Day
                                        </p>
                                        <p className="w-3/4 border p-2">
                                            {matchHeader?.start_date}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default page;
