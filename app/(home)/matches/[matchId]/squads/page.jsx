"use client";

import {
    useGetMatchScorecardQuery,
    useGetMatchSquadQuery,
} from "@/redux/features/matches/matchesApi";
import React, { useEffect, useState } from "react";
import MatchHeader from "@/components/match/MatchHeader";
import SingleMatchTabs from "@/components/match/SingleMatchTabs";

const page = ({ params: asyncParams }) => {
    const { matchId } = React.use(asyncParams);

    const [matchSquads, setMatchSquads] = useState([]);

    const {
        data: matchSquad,
        error,
        isLoading,
        isSuccess,
    } = useGetMatchSquadQuery(matchId);

    const [lastInningId, setLastInningId] = useState(null);

    const lastInningIdFunction = (inningId) => {
        setLastInningId(inningId);
    };

    useEffect(() => {
        if (matchSquad) {
            if (matchSquad?.data?.team_squads) {
                setMatchSquads(matchSquad?.data?.team_squads);
            }
        }
    }, [matchSquad]);

    // console.log(matchSquads);
    return (
        <div className="py-2 my-4">
            <MatchHeader
                matchId={matchId}
                lastInningIdFunction={lastInningIdFunction}
            />

            <SingleMatchTabs matchId={matchId} inningId={lastInningId} />
            <div className="w-full">
                <h4 className="font-bold text-center py-4">Playing XI</h4>
                <div className="flex">
                    {matchSquads &&
                        matchSquads.map((squad) => (
                            <div className="w-1/2 border">
                                <h4 className="p-2 bg-blue-300">
                                    {squad.team_name}
                                </h4>
                                {squad.players.map((player) => (
                                    <div>
                                        <h4 className="p-2 border">
                                            {`${player.player_name}  ${
                                                player.is_captain &&
                                                player.is_wk
                                                    ? "(C & WK)"
                                                    : player.is_vice_captain &&
                                                      player.is_wk
                                                    ? "(VC & WK)"
                                                    : player.is_captain &&
                                                      !player.is_wk
                                                    ? "(C)"
                                                    : player.is_vice_captain &&
                                                      !player.is_wk
                                                    ? "(VC)"
                                                    : ""
                                            }`}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default page;
