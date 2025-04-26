"use client";

import { useGetMatchScorecardQuery } from "@/redux/features/matches/matchesApi";
import React, { useEffect, useState } from "react";
import MatchHeader from "@/components/match/MatchHeader";
import SingleMatchTabs from "@/components/match/SingleMatchTabs";

const page = ({ params: asyncParams }) => {
   const { matchId } = React.use(asyncParams)

    const [inningScorecard, setInningScorecard] = useState([]);

    const [batterScorecard1, setBatterScorecard1] = useState([]);
    const [bowlerScorecard1, setBowlerScorecard1] = useState([]);
    const [batterScorecard2, setBatterScorecard2] = useState([]);
    const [bowlerScorecard2, setBowlerScorecard2] = useState([]);

    const [fallOfWicketTeam1, setFallOfWicketTeam1] = useState([]);
    const [fallOfWicketTeam2, setFallOfWicketTeam2] = useState([]);

    const [lastInningId, setLastInningId] = useState(null);

    const lastInningIdFunction = (inningId) => {
        setLastInningId(inningId);
    }
    const {
        data: matchScorecard,
        error,
        isLoading,
        isSuccess,
    } = useGetMatchScorecardQuery(matchId);

    useEffect(() => {
        if (matchScorecard) {
            if (matchScorecard?.data?.innings_scorecards) {
                const sortedInningScorecard = [
                    ...matchScorecard?.data?.innings_scorecards,
                ].sort((a, b) => a.innings_number - b.innings_number);
                setInningScorecard(sortedInningScorecard);
            }
        }
    }, [matchScorecard]);

    useEffect(() => {
        if (inningScorecard?.[0]?.batter_scorecard_entries) {
            const sortedBatterScorecard = [
                ...inningScorecard[0].batter_scorecard_entries,
            ].sort((a, b) => a.batting_position - b.batting_position);
            setBatterScorecard1(sortedBatterScorecard);
        }
        if (inningScorecard?.[0]?.bowler_scorecard_entries) {
            const sortedBowlerScorecard = [
                ...inningScorecard[0].bowler_scorecard_entries,
            ].sort((a, b) => a.bowling_position - b.bowling_position);
            setBowlerScorecard1(sortedBowlerScorecard);
        }
        if (inningScorecard?.[1]?.bowler_scorecard_entries) {
            const sortedBatterScorecard = [
                ...inningScorecard[1].batter_scorecard_entries,
            ].sort((a, b) => a.batting_position - b.batting_position);
            setBatterScorecard2(sortedBatterScorecard);
        }
        if (inningScorecard?.[1]?.bowler_scorecard_entries) {
            const sortedBowlerScorecard = [
                ...inningScorecard[1].bowler_scorecard_entries,
            ].sort((a, b) => a.bowling_position - b.bowling_position);
            setBowlerScorecard2(sortedBowlerScorecard);
        }

        if (inningScorecard?.[0]?.fall_of_wickets) {
            const fallofwicket = [...inningScorecard[0].fall_of_wickets].sort(
                (a, b) => a.wicket_number - b.wicket_number
            );
            setFallOfWicketTeam1(fallofwicket);
        }
        if (inningScorecard?.[1]?.fall_of_wickets) {
            const fallofwicket = [...inningScorecard[1].fall_of_wickets].sort(
                (a, b) => a.wicket_number - b.wicket_number
            );
            setFallOfWicketTeam2(fallofwicket);
        }
    }, [inningScorecard]);
    // console.log(inningScorecard);
    return (
        <div className="py-2 my-4">
            <MatchHeader matchId={matchId} lastInningIdFunction={lastInningIdFunction}  />

            <SingleMatchTabs matchId={matchId} inningId={lastInningId} />
            <div className="">
                {inningScorecard &&
                    inningScorecard.map((inning, index) => {
                        const currentBatters =
                            index === 0 ? batterScorecard1 : batterScorecard2;
                        const currentFallofwicket =
                            index === 0 ? fallOfWicketTeam1 : fallOfWicketTeam2;
                        const currentBowlers =
                            index === 0 ? bowlerScorecard1 : bowlerScorecard2;
                        return (
                            <div className="border my-4">
                                <h4 className="p-3 bg-blue-300">
                                    {inning.batting_team_name}
                                </h4>

                                <div className="inning-batting-box">
                                    <ul className="flex p-2 bg-[#ececec] text-[14px]">
                                        <li className="w-[58%]">Batting</li>
                                        <li className="w-[8%] text-center">
                                            R
                                        </li>
                                        <li className="w-[8%] text-center">
                                            B
                                        </li>
                                        <li className="w-[8%] text-center">
                                            M
                                        </li>
                                        <li className="w-[8%] text-center">
                                            4s
                                        </li>
                                        <li className="w-[8%] text-center">
                                            6s
                                        </li>
                                        <li className="w-[8%] text-center">SR</li>
                                    </ul>
                                    {currentBatters.map(
                                        (batter) =>
                                            batter?.has_batted && (
                                                <ul className="flex text-[14px]">
                                                    <li className="w-[58%] flex gap-5 border p-2">
                                                        <h4 className="w-1/2">
                                                            {
                                                                batter?.batter_name
                                                            }
                                                        </h4>
                                                        <p className="w-1/2">
                                                            {batter.dismissal_type
                                                                ? batter.dismissal_type.toLowerCase() ===
                                                                  "retired hurt"
                                                                    ? "retired hurt"
                                                                    : `${batter.dismissal_type} - b ${batter.dismissed_by_name}`
                                                                : "not out"}
                                                        </p>
                                                    </li>
                                                    <li className="w-[8%] p-2 border text-center">
                                                        {batter?.runs_scored}
                                                    </li>
                                                    <li className="w-[8%] p-2 border text-center">
                                                        {batter?.balls_faced}
                                                    </li>
                                                    <li className="w-[8%] p-2 border text-center">
                                                        {batter?.minutes_batted}
                                                    </li>
                                                    <li className="w-[8%] p-2 border text-center">
                                                        {batter?.fours_scored}
                                                    </li>
                                                    <li className="w-[8%] p-2 border text-center">
                                                        {batter?.sixes_scored}
                                                    </li>
                                                    <li className="w-[8%] p-2 border text-center">
                                                    {((batter?.runs_scored * 100) / batter?.balls_faced).toFixed(2)}

                                                    </li>
                                                </ul>
                                            )
                                    )}
                                    <ul className="p-2 flex">
                                        <li className="w-[58%] flex gap-5">
                                            <h4 className="w-1/2">Extras</h4>
                                            <p className="w-1/2">
                                                ({"lb " + inning?.leg_byes},{" "}
                                                {" w " + inning?.wides} ,{" "}
                                                {" nb " + inning?.noballs})
                                            </p>
                                        </li>
                                        <li className="w-[8%] text-center">
                                            {inning.leg_byes +
                                                inning.wides +
                                                inning.noballs}
                                        </li>
                                    </ul>
                                    <ul className="p-2 flex bg-[#adadad] font-bold">
                                        <li className="w-[58%] flex gap-5">
                                            <h4 className="w-1/2">Total</h4>
                                            <p className="w-1/2">{`${Math.floor(
                                                inning.total_overs / 6
                                            )}.${
                                                inning.total_overs % 6
                                            } Overs`}</p>
                                        </li>
                                        <li className="w-[8%] text-center">{`${inning.total_runs}/${inning.total_wickets}`}</li>
                                    </ul>
                                    {/* fall of wicket and did not bat section */}
                                    <div className="p-2 border flex flex-wrap gap-2">
                                        <span className="font-bold">
                                            Fall of Wickets:{" "}
                                        </span>
                                        {currentFallofwicket &&
                                            currentFallofwicket.map(
                                                (wicket) => (
                                                    <h4>
                                                        <span className="font-bold">{`${wicket.wicket_number}-${wicket.team_runs}`}</span>
                                                        <span>{` (${wicket.batter_name}, ${wicket.ball_number}), `}</span>
                                                    </h4>
                                                )
                                            )}
                                    </div>
                                </div>

                                <div className="inning-bowling-box">
                                    <ul className="flex p-2 bg-[#ececec] text-[14px]">
                                        <li className="w-[37%]">Bowling</li>
                                        <li className="w-[7%] text-center">
                                            O
                                        </li>
                                        <li className="w-[7%] text-center">
                                            M
                                        </li>
                                        <li className="w-[7%] text-center">
                                            R
                                        </li>
                                        <li className="w-[7%] text-center">
                                            W
                                        </li>
                                        <li className="w-[7%] text-center">
                                            Econ
                                        </li>
                                        {/* <li className="w-[7%] text-center">
                                            0s
                                        </li> */}
                                        <li className="w-[7%] text-center">
                                            4s
                                        </li>
                                        <li className="w-[7%] text-center">
                                            6s
                                        </li>
                                        <li className="w-[7%] text-center">
                                            WD
                                        </li>
                                        <li className="w-[7%] text-center">
                                            NB
                                        </li>
                                    </ul>
                                    {currentBowlers.map((bowler) => (
                                        <ul className="flex text-[14px]">
                                            <li className="w-[37%] flex gap-5 border p-2">
                                                {bowler.bowler_name}
                                            </li>
                                            <li className="w-[7%] p-2 border text-center">
                                                {bowler?.overs_bowled}
                                            </li>
                                            <li className="w-[7%] p-2 border text-center">
                                                {bowler?.maiden_overs}
                                            </li>
                                            <li className="w-[7%] p-2 border text-center">
                                                {bowler?.runs_conceded}
                                            </li>
                                            <li className="w-[7%] p-2 border text-center">
                                                {bowler?.wickets_taken}
                                            </li>
                                            <li className="w-[7%] p-2 border text-center">
    
                                            {((bowler?.runs_conceded * 6) / bowler?.overs_bowled).toFixed(2)}
                                            </li>
                                            <li className="w-[7%] p-2 border text-center">
                                                {bowler?.fours_conceded}
                                            </li>
                                            <li className="w-[7%] p-2 border text-center">
                                                {bowler?.sixes_conceded}
                                            </li>
                                            <li className="w-[7%] p-2 border text-center">
                                                {bowler?.wides_conceded}
                                            </li>
                                            <li className="w-[7%] p-2 border text-center">
                                                {bowler?.noballs_conceded}
                                            </li>
                                            {/* <li className="w-[8%] p-2 border text-center">{batter?.batter_name}</li> */}
                                        </ul>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default page;
