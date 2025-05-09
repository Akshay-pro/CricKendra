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

    const individualBowlingTableSchemaMap = {
        common: [
          { key: "bowler_name", label: "Bowler" },
        ],
        innings: [
          { key: "start_date", label: "Start Date" },
          { key: "city_name", label: "City" },
          { key: "innings_number", label: "Innings No." },
          { key: "batting_team_name", label: "Batting Team" },
          { key: "bowling_team_name", label: "Bowling Team" },
          { key: "overs_bowled", label: "Overs" },
          { key: "maiden_overs", label: "Maidens" },
          { key: "runs_conceded", label: "Runs" },
          { key: "wickets_taken", label: "Wickets" },
          { key: "economy", label: "Economy", format: (v) => (typeof v === "number" ? v.toFixed(2) : "-") },
          { key: "fours_conceded", label: "4s Conceded" },
          { key: "sixes_conceded", label: "6s Conceded" },
        ],
        "match-totals": [
          { key: "start_date", label: "Start Date" },
          { key: "city_name", label: "City" },
          { key: "batting_team_name", label: "Batting Team" },
          { key: "bowling_team_name", label: "Bowling Team" },
          { key: "overs_bowled", label: "Overs" },
          { key: "maiden_overs", label: "Maidens" },
          { key: "runs_conceded", label: "Runs" },
          { key: "wickets_taken", label: "Wickets" },
          { key: "average", label: "Avg" },
          { key: "strike_rate", label: "SR" },
          { key: "economy", label: "Economy" },
          { key: "fours_conceded", label: "4s Conceded" },
          { key: "sixes_conceded", label: "6s Conceded" },
        ],
        ground: [
          { key: "ground_name", label: "Ground" },
        ],
        series: [
          { key: "series_name", label: "Series" },
          { key: "series_season", label: "Season" },
        ],
        tournaments: [
          { key: "tournament_name", label: "Tournament" },
        ],
        "host-nations": [
          { key: "host_nation_name", label: "Host Nation" },
        ],
        oppositions: [
          { key: "opposition_team_name", label: "Opposition Team" },
        ],
        years: [
          { key: "year", label: "Year" },
        ],
        seasons: [
          { key: "season", label: "Season" },
        ],
      };
      

    console.log(category);
    const columns = [
        ...(individualBowlingTableSchemaMap[category] || []),
        ...individualBowlingTableSchemaMap.common.filter(
            (commonCol) =>
                !(individualBowlingTableSchemaMap[category] || []).some(
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
                                    {key === "runs_scored" || key === "highest_score"
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
