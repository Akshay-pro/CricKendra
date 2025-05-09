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

    const overallBowlingTableSchemaMap = {
        common: [
          { key: "matches_played", label: "Matches" },
          { key: "innings_bowled", label: "Innings" },
          { key: "overs_bowled", label: "Overs" },
          { key: "maiden_overs", label: "Maidens" },
          { key: "runs_conceded", label: "Runs" },
          { key: "wickets_taken", label: "Wickets" },
          { key: "average", label: "Avg", format: (v) => (typeof v === "number" ? v.toFixed(2) : "-"), },
          { key: "strike_rate", label: "SR", format: (v) => (typeof v === "number" ? v.toFixed(2) : "-"), },
          { key: "economy", label: "Economy", format: (v) => (typeof v === "number" ? v.toFixed(2) : "-"), },
          { key: "four_wicket_hauls", label: "4W" },
          { key: "five_wicket_hauls", label: "5W" },
          { key: "ten_wicket_hauls", label: "10W" },
          { key: "best_match_wickets", label: "Best Match Wkts" },
          { key: "best_match_runs", label: "Best Match Runs" },
          { key: "best_innings_wickets", label: "Best Inn Wkts" },
          { key: "best_innings_runs", label: "Best Inn Runs" },
          { key: "fours_conceded", label: "4s Conceded" },
          { key: "sixes_conceded", label: "6s Conceded" },
        ],
        "bowlers": [
          { key: "bowler_name", label: "Bowler" },
          { key: "teams_represented", label: "Teams" },
          { key: "min_date", label: "First Match" },
          { key: "max_date", label: "Last Match" },
        ],
        "teams": [
          { key: "team_name", label: "Team" },
          { key: "players_count", label: "Players" },
          { key: "min_date", label: "First Match" },
          { key: "max_date", label: "Last Match" },
        ],
        oppositions: [
          { key: "opposition_team_name", label: "Opposition" },
          { key: "players_count", label: "Players" },
          { key: "min_date", label: "First Match" },
          { key: "max_date", label: "Last Match" },
        ],
        grounds: [
          { key: "ground_name", label: "Ground" },
          { key: "players_count", label: "Players" },
          { key: "min_date", label: "First Match" },
          { key: "max_date", label: "Last Match" },
        ],
        "host-nations": [
          { key: "host_nation_name", label: "Host Nation" },
          { key: "players_count", label: "Players" },
          { key: "min_date", label: "First Match" },
          { key: "max_date", label: "Last Match" },
        ],
        continents: [
          { key: "continent_name", label: "Continent" },
          { key: "players_count", label: "Players" },
          { key: "min_date", label: "First Match" },
          { key: "max_date", label: "Last Match" },
        ],
        series: [
          { key: "series_name", label: "Series" },
          { key: "series_season", label: "Season" },
          { key: "players_count", label: "Players" },
          { key: "min_date", label: "First Match" },
          { key: "max_date", label: "Last Match" },
        ],
        tournaments: [
          { key: "tournament_name", label: "Tournament" },
          { key: "players_count", label: "Players" },
          { key: "min_date", label: "First Match" },
          { key: "max_date", label: "Last Match" },
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
        matches: [
          { key: "team1_name", label: "Team 1" },
          { key: "team2_name", label: "Team 2" },
          { key: "season", label: "Season" },
          { key: "city_name", label: "City" },
          { key: "start_date", label: "Start Date" },
          { key: "players_count", label: "Players" },
        ],
        "team-innings": [
          { key: "innings_number", label: "Innings No." },
          { key: "bowling_team_name", label: "Bowling Team" },
          { key: "batting_team_name", label: "Batting Team" },
          { key: "season", label: "Season" },
          { key: "city_name", label: "City" },
          { key: "start_date", label: "Start Date" },
          { key: "players_count", label: "Players" },
        ],
        aggregate: [
          { key: "players_count", label: "Players" },
          { key: "min_date", label: "First Match" },
          { key: "max_date", label: "Last Match" },
        ],
      };
      
    console.log(category);
    const columns = [
        ...(overallBowlingTableSchemaMap[category] || []),
        ...overallBowlingTableSchemaMap.common.filter(
          (commonCol) =>
            !(overallBowlingTableSchemaMap[category] || []).some(
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
