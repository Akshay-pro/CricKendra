"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SeriesResult = ({ seriesInfo }) => {
    const [inningsScore, setInningsScore] = useState([]);

    useEffect(() => {
        if (seriesInfo?.innings_scores) {
            const sortedInningScore = [...seriesInfo?.innings_scores].sort(
                (a, b) => a.innings_number - b.innings_number
            );
            setInningsScore(sortedInningScore);
        }
    }, [seriesInfo]);

    const getOrdinalSuffix = (number) => {
        if (!number || isNaN(number)) return "";

        const suffix = ["th", "st", "nd", "rd"];
        const lastTwoDigits = number % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
            return `${number}th`;
        }

        const lastDigit = number % 10;
        return `${number}${suffix[lastDigit] || "th"}`;
    };
    const convertDate = (dateString) => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };

    console.log(seriesInfo);
    return (
        <div>
            {seriesInfo && (
                <div
                    className="shadow-md border my-4"
                    key={seriesInfo?.match_id}
                >
                    {/* Summary Match State */}
                    <div className="border-b-2 border-green-200 p-2">
                        <h2 className="text-[13px] font-semibold capitalize">
                            {seriesInfo?.match_state}
                        </h2>
                        <p className="text-[12px]">
                            {getOrdinalSuffix(seriesInfo?.event_match_number)}{" "}
                            {seriesInfo?.playing_format}
                            {", "}
                            {seriesInfo?.main_series_name}
                            {", "}
                            {seriesInfo?.ground_name}
                            {", "}
                            {convertDate(seriesInfo?.start_date)}
                        </p>
                    </div>

                    {/* Summary Team and Score */}
                    <div className="p-1 flex">
                        {/* match status completed */}
                        {seriesInfo.match_state === "completed" &&
                            inningsScore && (
                                <div className="w-full p-2">
                                    <div
                                        className={`flex justify-between items-center ${
                                            seriesInfo?.match_winner_team_id ==
                                            inningsScore[0]
                                                ?.batting_team_id
                                                ? ""
                                                : "opacity-50"
                                        }`}
                                    >
                                        <div className="flex items-center">
                                            <Image
                                                src={
                                                    seriesInfo.team1_image_url ||
                                                    "/assets/defaultTeamImg.png"
                                                }
                                                width={25}
                                                height={25}
                                                alt="logo"
                                            />
                                            <h2 className="font-bold text-[14px] capitalize ml-4">
                                                {
                                                    inningsScore[0]
                                                        ?.batting_team_name
                                                }
                                            </h2>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[16px]">
                                               {` ${
                                                    inningsScore[0]
                                                        ?.total_runs
                                                }/${
                                                    inningsScore[0]
                                                        ?.total_wickets
                                                }`}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className={`my-4 flex justify-between items-center ${
                                            seriesInfo?.match_winner_team_id ==
                                            inningsScore[1]
                                                ?.batting_team_id
                                                ? ""
                                                : "opacity-50"
                                        }`}>
                                        <div className="flex items-center">
                                            <Image
                                                src={
                                                    seriesInfo.team2_image_url ||
                                                    "/assets/defaultTeamImg.png"
                                                }
                                                width={25}
                                                height={25}
                                                alt="logo"
                                            />
                                            <h2 className="font-bold text-[14px] capitalize ml-4">
                                                {
                                                    inningsScore[1]
                                                        ?.batting_team_name
                                                }
                                            </h2>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[16px]">
                                            {` ${
                                                    inningsScore[1]
                                                        ?.total_runs
                                                }/${
                                                    inningsScore[1]
                                                        ?.total_wickets
                                                }`}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="text-[13px] text-[#1866db]">
                                        {seriesInfo?.is_won_by_runs ? (
                                            <div>
                                                {`${
                                                    inningsScore[0]
                                                        ?.batting_team_name
                                                } 
                                            won by 
                                            ${
                                                inningsScore[0]?.total_runs -
                                                inningsScore[1]?.total_runs
                                            } runs`}
                                            </div>
                                        ) : (
                                            <div>
                                                {`${
                                                    inningsScore[1]
                                                        ?.batting_team_name
                                                }
                                            won by 
                                            ${Math.abs(
                                                inningsScore[1]?.total_wickets -
                                                    inningsScore[0]
                                                        ?.total_wickets
                                            )} wickets`}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                        {/* {seriesInfo.match_state === "completed" && (
                        <div>completed</div>
                    )} */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeriesResult;
