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


    const {
        data: statsData,
    } = useGetStatsDataQuery(fullUrl);
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

    const battingTableSchemaMap = {
        common: [
            { key: "matches_played", label: "Matches" },
            { key: "innings_batted", label: "Innings" },
            { key: "runs_scored", label: "Runs" },
            { key: "balls_faced", label: "Balls" },
            { key: "not_outs", label: "NO" },
            {
                key: "average",
                label: "Average",
                format: (v) => (typeof v === "number" ? v.toFixed(2) : "-"),
            },
            {
                key: "strike_rate",
                label: "Strike Rate",
                format: (v) => (typeof v === "number" ? v.toFixed(2) : "-"),
            },
            {
                key: "highest_score",
                label: "HS",
                display: (row) =>
                    row.highest_score === row.highest_not_out_score
                        ? `${row.highest_score}*`
                        : row.highest_score.toString(),
            },
            { key: "centuries", label: "100s" },
            { key: "half_centuries", label: "50s" },
            { key: "fifty_plus_scores", label: "50+" },
            { key: "ducks", label: "Ducks" },
            { key: "fours_scored", label: "4s" },
            { key: "sixes_scored", label: "6s" },
        ],

        batters: [
            { key: "batter_name", label: "Batter" },
            {
                key: "teams_represented",
                label: "Teams",
                format: (v) => (Array.isArray(v) ? v.join(", ") : v ?? "-"),
            },
            {
                key: "duration_span",
                label: "Span",
                format: (row) => formatDateSpan(row.min_date, row.max_date),
            },
        ],

        "team-innings": [
            { key: "batting_team_name", label: "Team" },
            { key: "players_count", label: "Players" },
            { key: "min_date", label: "From" },
            { key: "max_date", label: "To" },
        ],

        grounds: [
            { key: "ground_name", label: "Ground" },
            { key: "players_count", label: "Players" },
            { key: "min_date", label: "From" },
            { key: "max_date", label: "To" },
        ],

        oppositions: [
            { key: "opposition_team_name", label: "Opposition" },
            { key: "players_count", label: "Players" },
            { key: "min_date", label: "From" },
            { key: "max_date", label: "To" },
        ],

        series: [
            { key: "series_name", label: "Series" },
            { key: "series_season", label: "Season" },
            { key: "players_count", label: "Players" },
            { key: "min_date", label: "From" },
            { key: "max_date", label: "To" },
        ],

        tournaments: [
            { key: "tournament_name", label: "Tournament" },
            { key: "players_count", label: "Players" },
            { key: "min_date", label: "From" },
            { key: "max_date", label: "To" },
        ],

        years: [
            { key: "year", label: "Year" },
            { key: "players_count", label: "Players" },
        ],

        seasons: [
            { key: "season", label: "Season" },
            { key: "players_count", label: "Players" },
        ],

        decades: [
            { key: "decade", label: "Decade" },
            { key: "players_count", label: "Players" },
        ],

        aggregate: [
            { key: "players_count", label: "Players" },
            { key: "min_date", label: "From" },
            { key: "max_date", label: "To" },
        ],
        continents: [
            { key: "continent_name", label: "Continent" },
            { key: "players_count", label: "Players" },
            { key: "min_date", label: "From" },
            { key: "max_date", label: "To" },
        ],

        "host-nations": [
            { key: "host_nation_name", label: "Host Nation" },
            { key: "players_count", label: "Players" },
            { key: "min_date", label: "From" },
            { key: "max_date", label: "To" },
        ],
    };
    console.log(category);
    const columns = [
        ...(battingTableSchemaMap[category] || []),
        ...battingTableSchemaMap.common.filter(
          (commonCol) =>
            !(battingTableSchemaMap[category] || []).some(
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
                                    {key === "highest_score"
                                        ? display(row)
                                        : key === "duration_span" && format
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
