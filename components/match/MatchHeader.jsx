"use client";
import { useGetMatchSummaryQuery } from "@/redux/features/matches/matchesApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MatchHeader = ({ matchId, lastInningIdFunction}) => {
    // const { matchId } = React.use(params);

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
            lastInningIdFunction(sortedInningScore[sortedInningScore.length - 1].innings_id);
        }
    }, [matchHeader]);

    // console.log(inningsScore);
    // console.log(matchHeader);

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
                <div className="shadow-md border">
                    {/* Summary Match State */}
                    <div className="border-b-2 border-green-200 p-4">
                        <h2 className="text-[16px] font-semibold capitalize">
                            {matchHeader?.match_state}
                        </h2>
                        <p className="text-[14px] py-1">
                            {getOrdinalSuffix(matchHeader?.event_match_number)}{" "}
                            {matchHeader?.playing_format},{" "}
                            {matchHeader?.main_series_name},{" "}
                            {matchHeader?.ground_name}{" "}
                        </p>
                    </div>

                    {/* Summary Team and Score */}
                    <div className="p-4 flex">
                        {/* match status completed */}
                        {matchHeader.match_state === "completed" &&
                            matchHeader?.innings_scores && (
                                <div className="w-full px-2">
                                    <div className="my-4 flex justify-between items-center">
                                        <div className="flex items-center">
                                            <Image
                                                src={
                                                    matchHeader.team1_image_url ||
                                                    "/assets/defaultTeamImg.png"
                                                }
                                                width={35}
                                                height={35}
                                                alt="logo"
                                            />
                                            <h2 className="font-bold text-[16px] capitalize ml-4">
                                                {
                                                    matchHeader
                                                        ?.innings_scores[0]
                                                        ?.batting_team_name
                                                }
                                            </h2>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[20px]">
                                                {
                                                    matchHeader
                                                        ?.innings_scores[0]
                                                        ?.total_runs
                                                }
                                                /
                                                {
                                                    matchHeader
                                                        ?.innings_scores[0]
                                                        ?.total_wickets
                                                }
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="my-4 flex justify-between items-center">
                                        <div className="flex items-center">
                                            <Image
                                                src={
                                                    matchHeader.team2_image_url ||
                                                    "/assets/defaultTeamImg.png"
                                                }
                                                width={35}
                                                height={35}
                                                alt="logo"
                                            />
                                            <h2 className="font-bold text-[16px] capitalize ml-4">
                                                {
                                                    matchHeader
                                                        ?.innings_scores[1]
                                                        ?.batting_team_name
                                                }
                                            </h2>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[20px]">
                                                {
                                                    matchHeader
                                                        ?.innings_scores[1]
                                                        ?.total_runs
                                                }
                                                /
                                                {
                                                    matchHeader
                                                        ?.innings_scores[1]
                                                        ?.total_wickets
                                                }
                                            </h3>
                                        </div>
                                    </div>

                                    {matchHeader?.is_won_by_runs && (
                                        <div>
                                            {inningsScore[0]?.batting_team_name}{" "}
                                            won by{" "}
                                            {inningsScore[0]?.total_runs -
                                                inningsScore[1]
                                                    ?.total_runs}{" "}
                                            runs
                                        </div>
                                    )}

                                    {matchHeader?.is_won_by_innings && (
                                        <div>
                                            {inningsScore[1]?.batting_team_name}{" "}
                                            won by{" "}
                                            {inningsScore[1]?.total_wickets -
                                                inningsScore[0]
                                                    ?.total_wickets}{" "}
                                            runs
                                        </div>
                                    )}
                                </div>
                            )}

                        {/* {matchHeader.match_state === "completed" && (
                        <div>completed</div>
                    )} */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MatchHeader;
