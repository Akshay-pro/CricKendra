"use client";
import { useGetPlayerByIdQuery } from "@/redux/features/players/playersApi";
import React, { useEffect, useState } from "react";
import PlayerTabs from "@/components/Players/SinglePlayerTabs";
const page = ({ params }) => {
    const [playerOverview, setPlayerOverview] = useState([]);
    const [stats, setStats] = useState(null);
    const [playingFormat, setPlayingFormat] = useState(null);
    const [playerGender, setPlayerGender] = useState(null);
    const { playerId } = React.use(params);

    const { data: playerData } = useGetPlayerByIdQuery(playerId);

    console.log(playerOverview);
    useEffect(() => {
        if (playerData?.data) {
            setPlayerOverview(playerData?.data);
            setStats({
                ODI: playerData?.data?.odi_stats,
                T20I: playerData?.data?.t20i_stats,
                ListA: playerData?.data?.lista_stats,
                T20: playerData?.data?.t20_stats,
            });
            if (playerData?.data?.test_stats) setPlayingFormat("TEST");
            else if (playerData?.data?.odi_stats) setPlayingFormat("ODI");
            else if (playerData?.data?.t20i_stats) setPlayingFormat("T20I");
            else if (playerData?.data?.lista_stats) setPlayingFormat("LISTA");
            else if (playerData?.data?.t20_stats) setPlayingFormat("T20");

            setPlayerGender(playerData?.data?.is_male);
        }
    }, [playerData]);

    const battingColumns = [
        { key: "matches_played", label: "Matches" },
        { key: "innings_batted", label: "Innings" },
        { key: "not_outs", label: "Not Outs" },
        { key: "runs_scored", label: "Runs Scored" },
        { key: "balls_faced", label: "Balls Faced" },
        {
            key: "highest_score",
            label: "Highest Score",
            format: (row) =>
                row.is_highest_not_out
                    ? `${row.highest_score}*`
                    : row.highest_score.toString(),
        },
        {
            key: "average",
            label: "AVG",
            format: (row) =>
                (
                    (row?.runs_scored * 100) /
                    (row?.innings_batted - row?.not_outs)
                ).toFixed(2),
        },
        {
            key: "strike_rate",
            label: "SR",
            format: (row) =>
                ((row?.runs_scored * 100) / row?.balls_faced).toFixed(2),
        },

        { key: "centuries_scored", label: "100s" },
        { key: "fifties_scored", label: "50s" },
        { key: "fours_scored", label: "4s" },
        { key: "sixes_scored", label: "6s" },
    ];

    const bowlingColumns = [
        { key: "matches_played", label: "Matches" },
        { key: "innings_bowled", label: "Innings" },
        { key: "balls_bowled", label: "Balls Bowled" },
        { key: "runs_conceded", label: "Runs Conceded" },
        { key: "wickets_taken", label: "Wickets" },
        {
            key: "average",
            label: "AVG",
            format: (row) =>
                (row?.runs_conceded / row?.wickets_taken).toFixed(2),
        },
        {
            key: "strike_rate",
            label: "SR",
            format: (row) =>
                (row?.balls_bowled / row?.wickets_taken).toFixed(2),
        },
        {
            key: "economy",
            label: "ECO",
            format: (row) =>
                ((row?.runs_conceded / row?.balls_bowled) * 6).toFixed(2),
        },
        {
            key: "best_inn_fig_runs",
            label: "BBI",
            format: (row) =>
                `${row.best_inn_fig_runs}/${row.best_inn_fig_wkts}`,
        },
        {
            key: "best_match_fig_runs",
            label: "BBM",
            format: (row) =>
                `${row.best_match_fig_runs}/${row.best_match_fig_wkts}`,
        },
        { key: "five_wkt_hauls", label: "5w" },
        { key: "four_wkt_hauls", label: "4w" },
        { key: "ten_wkt_hauls", label: "10w" },
        { key: "fours_conceded", label: "4s" },
        { key: "sixes_conceded", label: "6s" },
    ];
    console.log(stats);

    if (!stats) return <div>Loading...</div>; // Loading state
    return (
        <div>
            <PlayerTabs
                playerId={playerId}
                playingFormat={playingFormat}
                playerGender={playerGender}
            />

            <div className="w-full shadow-md">
                <div className="flex flex-wrap gap-10 p-8 border-b border-b-green-300">
                    <div className="w-[30%]">
                        <h2 className="font-bold">Full Name</h2>
                        <p>{playerOverview.full_name}</p>
                    </div>
                    <div className="w-[30%]">
                        <h2 className="font-bold">DOB</h2>
                        <p>{playerOverview.dob || "---"}</p>
                    </div>
                    <div className="w-[30%]">
                        <h2 className="font-bold">Nationality</h2>
                        <p>{playerOverview.nationality || "---"}</p>
                    </div>
                </div>

                <div className="p-8 border-b ">
                    <h4 className="mb-4 border-b border-t py-2 font-bold">
                        Teams Represented:
                    </h4>
                    <div className="flex">
                        {playerOverview?.teams_represented?.map((team) => (
                            <li key={team.id} className="font-bold w-1/2 text-gray-500">
                                {team.name}
                            </li>
                        ))}
                    </div>
                </div>
                <div className="p-8 border-b ">
                    <h4 className="mb-4 border-b border-t py-2 font-bold">
                        Biography:
                    </h4>
                    <p className="">
                        {playerOverview.biography || "Data Not Available"}
                    </p>
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
                        <caption className="font-bold text-left bg-gray-600 text-white p-2">
                            Batting
                        </caption>
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2 text-left text-sm font-medium text-gray-700">
                                    Format
                                </th>
                                {battingColumns.map(({ key, label }) => (
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
                            {["ODI", "T20I", "ListA", "T20"].map(
                                (formatName) => (
                                    <tr
                                        key={formatName}
                                        className="odd:bg-gray-50 even:bg-white"
                                    >
                                        <td className="border border-gray-300 p-2  font-bold text-left text-sm text-gray-700 whitespace-nowrap capitalize">
                                            {formatName}
                                        </td>
                                        {battingColumns.map(
                                            ({ key, format }) => (
                                                <td
                                                    key={key}
                                                    className="border border-gray-300 p-2 text-left text-sm text-gray-700 whitespace-nowrap"
                                                >
                                                    {format
                                                        ? format(
                                                              stats[formatName]
                                                          )
                                                        : stats[formatName][
                                                              key
                                                          ]?.toString() ?? "-"}
                                                </td>
                                            )
                                        )}
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>

                    <table className="min-w-full table-auto border-collapse my-4">
                        <caption className="font-bold text-left bg-gray-600 text-white p-2">
                            Bowling
                        </caption>
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2 text-left text-sm font-medium  text-gray-700">
                                    Format
                                </th>
                                {bowlingColumns.map(({ key, label }) => (
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
                            {["ODI", "T20I", "ListA", "T20"].map(
                                (formatName) => (
                                    <tr
                                        key={formatName}
                                        className="odd:bg-gray-50 even:bg-white"
                                    >
                                        <td className="border border-gray-300 p-2 text-left text-sm text-gray-700 font-bold whitespace-nowrap capitalize">
                                            {formatName}
                                        </td>
                                        {bowlingColumns.map(
                                            ({ key, format }) => (
                                                <td
                                                    key={key}
                                                    className="border border-gray-300 p-2 text-left text-sm text-gray-700 whitespace-nowrap"
                                                >
                                                    {format
                                                        ? format(
                                                              stats[formatName]
                                                          )
                                                        : stats[formatName][
                                                              key
                                                          ]?.toString() ?? "0"}
                                                </td>
                                            )
                                        )}
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default page;
