"use client";

import { useGetMatchInningCommentaryQuery } from "@/redux/features/matches/matchesApi";
import React, { useEffect, useState } from "react";
import MatchHeader from "@/components/match/MatchHeader";
import SingleMatchTabs from "@/components/match/SingleMatchTabs";
import { useRouter } from "next/navigation";

const page = ({ params: asyncParams }) => {
    const { matchId, inningsId } = React.use(asyncParams);

    const [matchInningsCommentary, setMatchInningCommentary] = useState([]);
    const [matchHeader, setMatchHeader] = useState([]);
    const [lastInningId, setLastInningId] = useState(null);

    const lastInningIdFunction = (inningId) => {
        setLastInningId(inningId);
    };
    const router = useRouter();

    const { data: commentaryData } = useGetMatchInningCommentaryQuery({
        matchId,
        inningsId,
    });

    useEffect(() => {
        if (commentaryData?.data?.commentary) {
            const sortedCommentaryData = [
                ...commentaryData?.data?.commentary,
            ].sort(
                (a, b) => b.innings_delivery_number - a.innings_delivery_number
            );
            setMatchInningCommentary(sortedCommentaryData);
        }
        if (commentaryData?.data?.match_header) {
            setMatchHeader(commentaryData?.data?.match_header);
        }
    }, [commentaryData]);

    console.log(matchInningsCommentary);
    const getRunBadge = (comment) => {
        const { player1_dismissal_type, player2_dismissal_type, is_four, is_six, legbyes, byes, noballs, wides, total_runs } = comment;

        if (player1_dismissal_type || player2_dismissal_type) return <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">W</span>;
        if (is_four) return <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">4</span>;
        if (is_six) return <span className="bg-pink-500 text-white px-2 py-1 rounded text-sm">6</span>;
        if (legbyes) return <span className="bg-gray-500 text-white px-2 py-1 rounded text-sm">{total_runs}lb</span>;
        if (byes) return <span className="bg-gray-500 text-white px-2 py-1 rounded text-sm">{total_runs}b</span>;
        if (noballs) return <span className="bg-gray-500 text-white px-2 py-1 rounded text-sm">{total_runs}NB</span>;
        if (wides) return <span className="bg-gray-500 text-white px-2 py-1 rounded text-sm">{total_runs}WD</span>;
        if (total_runs === 0) return <span className="bg-gray-400 text-white p-2 rounded text-sm">•</span>;
        return <span className="bg-gray-500 text-white px-2 py-1 rounded text-sm">{total_runs}</span>;
    };

    // Group balls by over_number
    let lastBallNumber = 0;
    let previousOverNumber = -1;
    const groupedCommentary = {};

    matchInningsCommentary.forEach((comment) => {
        const overNum = comment.over_number;

        if (!groupedCommentary[overNum]) {
            groupedCommentary[overNum] = {
                deliveries: [],
                totalRuns: 0,
            };
        }

        groupedCommentary[overNum].deliveries.push(comment);

        groupedCommentary[overNum].totalRuns += comment.total_runs;
    });

    return (
        <div className="py-2 my-4">
            <MatchHeader
                matchId={matchId}
                lastInningIdFunction={lastInningIdFunction}
            />
            <SingleMatchTabs matchId={matchId} inningId={inningsId} />
            <div className="w-full">
                <select
                    name="inning-commentary"
                    className="p-2 border w-40 mb-4 bg-gray-300"
                    onChange={(event) =>
                        router.push(
                            `/matches/${matchId}/innings/${event.target.value}/commentary`
                        )
                    }
                >
                    {matchHeader?.innings_scores?.map((inning) => (
                        <option
                            key={inning.innings_id}
                            value={inning.innings_id}
                            selected={
                                parseInt(inning.innings_id) ===
                                parseInt(inningsId)
                            }
                        >
                            {inning.batting_team_name}
                        </option>
                    ))}
                </select>

                {Object.entries(groupedCommentary)
                    .sort(
                        ([overA], [overB]) => parseInt(overB) - parseInt(overA)
                    )
                    .map(([overNum, overData]) => {
                        const { deliveries, totalRuns } = overData; 
                        return (
                            <div key={overNum} className="mt-4">
                                <h3 className="font-bold">Over {overNum}</h3>
                                <div className="mt-2 p-4 border bg-blue-300 flex text-white gap-10">
                                    Total Runs: {totalRuns}
                                </div>
                                {deliveries.map((comment, index) => (
                                    <div
                                        key={index}
                                        className="flex border p-4 gap-2 items-center"
                                    >
                                        <div className="flex w-24 gap-5 items-center">
                                            <p>{comment.ball_number}</p>
                                            <p>{getRunBadge(comment)}</p>
                                        </div>
                                        <div>
                                            <p>
                                                {`${comment.bowler_name} to ${comment.batter_name}`}
                                                ,{" "}
                                                {comment.player1_dismissal_type
                                                    ? `${comment.player1_dismissal_type} out`
                                                    : `${comment.total_runs} runs`}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default page;
