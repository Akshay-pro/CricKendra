"use client";
import { useGetStatsDataQuery } from "@/redux/features/stats/statsApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "path";
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

    const individualTeamTableSchemaMap = {
        common: [
            { key: "team_name", label: "Team" },
            { key: "opposition_name", label: "Opposition" },
            { key: "city_name", label: "City" },
            { key: "start_date", label: "Start Date" },
        ],
        innings: [
            // { key: "innings_end", label: "Innings End" },
            {
                key: "runs_wickets",
                label: "Score",
                format: (row) => `${row.total_runs}/${row.total_wickets }`
            },
            
            { key: "total_overs", label: "Overs" },
            { key: "innings_number", label: "Inng No." },
            {
                key: "won_lost",
                label: "Inns Result",
                format: (row) => row.match_winner_id === row.team_id? `Won`: `Lost`
            },
            {
                key: "scoring_rate",
                label: "SR",
                format: (v) => (typeof v === "number" ? v.toFixed(2) : "-"),
            },
        ],
        "match-totals": [
            { key: "total_runs", label: "Runs" },
            { key: "total_balls", label: "Balls" },
            { key: "total_wickets", label: "Wickets" },
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
        ],
        "match-results": [
            { key: "innings_number", label: "Innings No." },
            { key: "win_margin", label: "Win Margin" },
            { key: "balls_remaining_after_win", label: "Balls Remaining" },
            { key: "is_won_by_runs", label: "By Runs" },
            { key: "is_won_by_innings", label: "By Innings" },
        ],
        series: [
            { key: "series_name", label: "Series" },
            { key: "series_season", label: "Season" },
            { key: "min_start_date", label: "First Match" },
            { key: "max_start_date", label: "Last Match" },
        ],
        tournaments: [
            { key: "tournament_name", label: "Tournament" },
            { key: "min_start_date", label: "First Match" },
            { key: "max_start_date", label: "Last Match" },
        ],
        grounds: [
            { key: "ground_name", label: "Ground" },
            { key: "min_start_date", label: "First Match" },
            { key: "max_start_date", label: "Last Match" },
        ],
        "host-nations": [
            { key: "host_nation_name", label: "Host Nation" },
            { key: "min_start_date", label: "First Match" },
            { key: "max_start_date", label: "Last Match" },
        ],
        years: [{ key: "year", label: "Year" }],
        seasons: [{ key: "season", label: "Season" }],
    };

    console.log(category);
    const columns = [
        ...individualTeamTableSchemaMap.common.filter(
            (commonCol) =>
                !(individualTeamTableSchemaMap[category] || []).some(
                    (catCol) => catCol.key === commonCol.key
                )
        ),
        ...(individualTeamTableSchemaMap[category] || []),
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
                                    {(key === "runs_wickets" || key === "won_lost") && format
                                        ? format(row)
                                        : format
                                        ? format(row[key])
                                        : row[key]?.toString() ?? "-"}
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
