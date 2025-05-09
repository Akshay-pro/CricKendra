"use client";
import { useGetPlayerByIdQuery } from "@/redux/features/players/playersApi";
import React, { useEffect, useState } from "react";
import PlayerTabs from "@/components/Players/SinglePlayerTabs";
const page = ({ params }) => {
    const [playerOverview, setPlayerOverview] = useState([]);
    const [stats, setStats] = useState(null);
    const { playerId } = React.use(params);

    const { data: playerData } = useGetPlayerByIdQuery(playerId);

    console.log(playerOverview);
    useEffect(() => {
        if (playerData?.data) {
            setPlayerOverview(playerData?.data);
            setStats({
                odi: playerData?.data?.odi_stats,
                t20i: playerData?.data?.t20i_stats,
                t20: playerData?.data?.t20_stats,
                lista: playerData?.data?.lista_stats,
            });
        }
    }, [playerData]);

    const columns = [
        { key: "balls_bowled", label: "Balls Bowled" },
        { key: "balls_faced", label: "Balls Faced" },
        { key: "best_inn_fig_runs", label: "BIF (Runs)" },
        { key: "best_inn_fig_wkts", label: "BIF (Wkts)" },
        { key: "best_match_fig_runs", label: "BMF (Runs)" },
        { key: "best_match_fig_wkts", label: "BMF (Wkts)" },
        { key: "centuries_scored", label: "100s" },
        { key: "fifties_scored", label: "50s" },
        { key: "five_wkt_hauls", label: "5w" },
        { key: "four_wkt_hauls", label: "4w" },
        { key: "fours_conceded", label: "4s Conceded" },
        { key: "fours_scored", label: "4s Scored" },
        { key: "highest_score", label: "Highest Score" },
        { key: "innings_batted", label: "Inng. Batted" },
        { key: "innings_bowled", label: "Inng. Bowled" },
        { key: "is_highest_not_out", label: "HS (NO)" },
        { key: "matches_played", label: "Matches Played" },
        { key: "not_outs", label: "Not Outs" },
        { key: "runs_conceded", label: "Runs Conceded" },
        { key: "runs_scored", label: "Runs Scored" },
        { key: "sixes_conceded", label: "Sixes Conceded" },
        { key: "sixes_scored", label: "Sixes Scored" },
        { key: "ten_wkt_hauls", label: "10w" },
        { key: "wickets_taken", label: "Wickets Taken" },
    ];
    console.log(stats);

     if (!stats) return <div>Loading...</div>; // Loading state
    return (
        <div>
            <PlayerTabs playerId={playerId} />

            <div className="w-full shadow-md">
                <div className="flex flex-wrap gap-10 p-8 border-b border-b-green-300">
                    <div className="w-[30%]">
                        <h2 className="font-bold">Full Name</h2>
                        <p>{playerOverview.full_name}</p>
                    </div>
                    <div className="w-[30%]">
                        <h2 className="font-bold">DOB</h2>
                        <p>{playerOverview.full_name}</p>
                    </div>
                    <div className="w-[30%]">
                        <h2 className="font-bold">Batting Position</h2>
                        <p>{playerOverview.full_name}</p>
                    </div>
                    <div className="w-[30%]">
                        <h2 className="font-bold">Bowling Style</h2>
                        <p>{playerOverview.full_name}</p>
                    </div>
                    <div className="w-[30%]">
                        <h2 className="font-bold">Playing Role</h2>
                        <p>{playerOverview.full_name}</p>
                    </div>
                    <div className="w-[30%]">
                        <h2 className="font-bold">Height</h2>
                        <p>{playerOverview.full_name}</p>
                    </div>
                    <div className="w-[30%]">
                        <h2 className="font-bold">Education</h2>
                        <p>{playerOverview.full_name}</p>
                    </div>
                </div>

                <div className="p-8 border-b ">
                    <h4 className="mb-4 border-b border-t py-2 font-bold">
                        Teams Represented:
                    </h4>
                    <div className="flex">
                        {playerOverview?.teams_represented?.map((team) => (
                            <li key={team.id} className="font-bold w-1/2">
                                {team.name}
                            </li>
                        ))}
                    </div>
                </div>

                <div
                    className="p-8 border-b border-b-green-300"
                    style={{ overflowX: "auto" }}
                >
                    <h4 className="mb-4 border-b border-t py-2 font-bold">
                        {" "}
                        <p>{playerOverview.full_name} Career Stats:</p>
                    </h4>
    
                    <table className="min-w-full table-auto border-collapse">
                        <thead>  
                            <tr>
                              <th className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-700">Format</th>
                                {columns.map(({ key, label }) => (
                                    <th
                                        key={key}
                                        className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-700"
                                    >
                                        {label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {["odi", "t20i", "t20", "lista"].map((format) => (
                                <tr
                                    key={format}
                                    className="odd:bg-gray-50 even:bg-white"
                                >
                                    <td className="border border-gray-300 p-2 text-left text-sm text-gray-700 whitespace-nowrap capitalize">{format}</td>
                                    {columns.map(({ key }) => (
                                        <td
                                            key={key}
                                            className="border border-gray-300 p-2 text-left text-sm text-gray-700 whitespace-nowrap"
                                        >
                                            {stats[format][key]?.toString() ??
                                                "-"}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default page;
