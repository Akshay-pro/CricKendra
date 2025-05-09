"use client";
import { useGetStatsDataQuery } from "@/redux/features/stats/statsApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function CategoryPage() {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const router = useRouter();
    const pathname = usePathname();

    const [queryObject, setQueryObject] = useState({});
    const [statsInfo, setStatsInfo] = useState([]);

    const currentPage = parseInt(params.get("__page") || "1");
    const category = pathname.split("/").filter(Boolean).pop();

    const fullUrl = useMemo(() => {
        const queryString = searchParams.toString();
        return queryString ? `${pathname}?${queryString}` : pathname;
    }, [pathname, searchParams]);

    console.log(fullUrl);

    useEffect(() => {
        const paramsObject = {};
        for (const [key, value] of searchParams.entries()) {
            if (paramsObject[key]) {
                paramsObject[key] = Array.isArray(paramsObject[key])
                    ? [...paramsObject[key], value]
                    : [paramsObject[key], value];
            } else {
                paramsObject[key] = value;
            }
        }

        setQueryObject(paramsObject);
    }, [searchParams]);

    const { data: statsData } = useGetStatsDataQuery(fullUrl);
    useEffect(() => {
        if (statsData?.data?.stats) {
            setStatsInfo(statsData?.data?.stats);
        }
    }, [statsData]);
    console.log(statsInfo);

    if (!statsInfo || statsInfo.length === 0) {
        return <p>No data available</p>;
    }

    function formatDateSpan(minDate, maxDate) {
        if (!minDate || !maxDate) return "-";
        const start = new Date(minDate);
        const end = new Date(maxDate);

        const startYear = start.getFullYear();
        const endYear = end.getFullYear();

        return `${startYear}-${endYear}`;
    }

    const overallTeamTableSchemaMap = {
        common: [
            { key: "matches_played", label: "Matches" },
            { key: "matches_won", label: "Won" },
            { key: "matches_lost", label: "Lost" },
            { key: "matches_tied", label: "Tied" },
            { key: "matches_drawn", label: "Drawn" },
            { key: "matches_no_result", label: "No Result" },
            {
                key: "win_loss_ratio",
                label: "W/L Ratio",
                format: (v) => (typeof v === "number" ? v.toFixed(2) : "-"),
            },
            { key: "innings_count", label: "Innings" },
            { key: "total_runs", label: "Runs" },
            { key: "total_wickets", label: "Wickets" },
            { key: "total_balls", label: "Balls" },
            {
                key: "average",
                label: "Avg",
                format: (v) => (typeof v === "number" ? v.toFixed(2) : "-"),
            },
            {
                key: "scoring_rate",
                label: "SR",
                format: (v) => (typeof v === "number" ? v.toFixed(2) : "-"),
            },
            { key: "highest_score", label: "Highest Score" },
            { key: "lowest_score", label: "Lowest Score" },
        ],
        teams: [
            { key: "team_name", label: "Team" },
            { key: "min_start_date", label: "First Match" },
            { key: "max_start_date", label: "Last Match" },
        ],
        players: [
            { key: "player_name", label: "Player" },
            { key: "teams_count", label: "Teams" },
            { key: "min_start_date", label: "First Match" },
            { key: "max_start_date", label: "Last Match" },
        ],
        matches: [
            { key: "team1_name", label: "Team 1" },
            { key: "team2_name", label: "Team 2" },
            { key: "city_name", label: "City" },
            { key: "season", label: "Season" },
            { key: "start_date", label: "Start Date" },
            { key: "teams_count", label: "Teams" },
        ],
        series: [
            { key: "series_name", label: "Series" },
            { key: "series_season", label: "Season" },
            { key: "teams_count", label: "Teams" },
        ],
        tournaments: [
            { key: "tournament_name", label: "Tournament" },
            { key: "teams_count", label: "Teams" },
        ],
        grounds: [
            { key: "ground_name", label: "Ground" },
            { key: "min_start_date", label: "First Match" },
            { key: "max_start_date", label: "Last Match" },
            { key: "teams_count", label: "Teams" },
        ],
        "host-nations": [
            { key: "host_nation_name", label: "Host Nation" },
            { key: "min_start_date", label: "First Match" },
            { key: "max_start_date", label: "Last Match" },
            { key: "teams_count", label: "Teams" },
        ],
        continents: [
            { key: "continent_name", label: "Continent" },
            { key: "min_start_date", label: "First Match" },
            { key: "max_start_date", label: "Last Match" },
            { key: "teams_count", label: "Teams" },
        ],
        years: [
            { key: "year", label: "Year" },
            { key: "teams_count", label: "Teams" },
        ],
        seasons: [
            { key: "season", label: "Season" },
            { key: "teams_count", label: "Teams" },
        ],
        decades: [
            { key: "decade", label: "Decade" },
            { key: "teams_count", label: "Teams" },
        ],
        aggregate: [{ key: "teams_count", label: "Teams" }],
    };

    console.log(category);
    const columns = [
        ...(overallTeamTableSchemaMap[category] || []),
        ...overallTeamTableSchemaMap.common.filter(
            (commonCol) =>
                !(overallTeamTableSchemaMap[category] || []).some(
                    (catCol) => catCol.key === commonCol.key
                )
        ),
    ];

    const handlePageChange = (newPage) => {
        params.set("__page", newPage);
        router.push(`?${params.toString()}`);
    };

    return (
        <div style={{ overflowX: "auto" }}>
            <h4 className="text-center font-bold text-[22px] my-5">
                Stats Info
            </h4>

            <div>
                {queryObject && Object.keys(queryObject).length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                        <h3 className="font-bold">Query Parameters:</h3>
                        <ul>
                            {Object.entries(queryObject).map(([key, value]) => (
                                <li key={key}>
                                    <strong>{key.replace(/_/g, " ")}:</strong>{" "}
                                    {String(value)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr>
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
                    {statsInfo.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="odd:bg-gray-50 even:bg-white"
                        >
                            {columns.map(({ key, format, display }) => (
                                <td
                                    key={key}
                                    className="border border-gray-300 p-2 text-left text-sm text-gray-700 whitespace-nowrap"
                                >
                                    {key === "duration_span" && format
                                        ? format(row)
                                        : format
                                        ? format(row[key])
                                        : row[key]?.toString() ?? "0"}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex gap-4 mt-6">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!statsData?.data?.next}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
