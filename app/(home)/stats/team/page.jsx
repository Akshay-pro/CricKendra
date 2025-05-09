"use client";
import { useGetDismissalOptionsQuery } from "@/redux/features/players/playersApi";
import { useGetFilterOptionsQuery } from "@/redux/features/stats/statsApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CommonStatsForm from "../CommonStatsForm";
import { useForm } from "react-hook-form";
const page = () => {
    const [filterOptionData, setFilterOptionData] = useState(null);
    const [viewFormat, setViewFormat] = useState("overall");
    const [selectedFigure, setSelectedFigure] = useState("teams");
    const [selectedResultQualification, setSelectedResultQualification] =
        useState("None");

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const playingFormat = searchParams.get("playing_format");
    const formatGender = searchParams.get("is_male");
    const playingRole = pathname.split("/").pop();

    const { register, handleSubmit, unregister, setValue } = useForm();
    const onSubmit = (data) => {
        const filteredParams = new URLSearchParams();

        Object.entries(data).forEach(([rawKey, value]) => {
            const key = rawKey.trim();

            if (
                value === undefined ||
                value === null ||
                value === false ||
                value === "" ||
                (Array.isArray(value) && value.length === 0)
            ) {
                return;
            }

            if (Array.isArray(value)) {
                value.forEach((v) => {
                    filteredParams.append(key, v);
                });
            } else {
                filteredParams.append(key, value);
            }
        });

        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => {
                return !(
                    value === undefined ||
                    value === null ||
                    value === false ||
                    value === "" ||
                    (Array.isArray(value) && value.length === 0)
                );
            })
        );
        console.log(filteredData);
        const queryString = filteredParams.toString();
        const url = `/stats/overall/bowlers?${queryString}`;

        if (viewFormat === "overall") {
            router.push(
                `/stats/team/${viewFormat}/${selectedFigure}?${queryString}&playing_format=${playingFormat}&is_male=${formatGender}&__page=1`
            );
        } else {
            router.push(
                `/stats/team/individual/${viewFormat}?${queryString}&playing_format=${playingFormat}&is_male=${formatGender}&__page=1`
            );
        }
        console.log(
            viewFormat +
                " " +
                selectedFigure +
                " " +
                selectedResultQualification
        );
        // console.log("Filtered Data:", filteredData);
    };

    useEffect(() => {
        if (
            selectedResultQualification &&
            selectedResultQualification !== "None"
        ) {
            unregister("min__dynamic");
            unregister("max__dynamic");

            setValue("min__" + selectedResultQualification, "");
            setValue("max__" + selectedResultQualification, "");
        }
    }, [selectedResultQualification]);

    const formats_map = ["TEST", "ODI", "T20I", "first_class", "list_a", "T20"];
    const role_map = ["Batting", "Bowling", "Team"];
    const groupFigureBy = [
        {
            name: "each bowlers",
            value: "bowlers",
        },
        {
            name: "each team innings",
            value: "team-innings",
        },
        {
            name: "each matches",
            value: "matches",
        },
        {
            name: "teams",
            value: "teams",
        },
        {
            name: "oppositions",
            value: "oppositions",
        },
        {
            name: "ground",
            value: "grounds",
        },
        {
            name: "host nations",
            value: "host-nations",
        },
        {
            name: "continent",
            value: "continents",
        },
        {
            name: "series",
            value: "series",
        },
        {
            name: "tournament",
            value: "tournaments",
        },
        {
            name: "years",
            value: "years",
        },
        {
            name: "seasons",
            value: "seasons",
        },
        {
            name: "decades",
            value: "decades",
        },
        {
            name: "aggregate",
            value: "aggregate",
        },
    ];
    const resultQualifiationFilter = [
        {
            name: "matches played",
            value: "matches_played",
        },
        {
            name: "matches won",
            value: "matches_won",
        },
        {
            name: "matches lost",
            value: "matches_lost",
        },
        {
            name: "matches tied",
            value: "matches_tied",
        },
        {
            name: "matches drawn",
            value: "matches_drawn",
        },
        {
            name: "matches with no result",
            value: "matches_with_no_result",
        },
        {
            name: "win/loss ratio",
            value: "win_loss_ratio",
        },
        {
            name: "innings count",
            value: "innings_count",
        },
        {
            name: "total runs",
            value: "total_runs",
        },
        {
            name: "total balls",
            value: "total_balls",
        },
        {
            name: "total wickets",
            value: "total_wickets",
        },
        {
            name: "average",
            value: "average",
        },
        {
            name: "scoring rate",
            value: "scoring_rate",
        },
    ];

    const supportedSortingFields = [
        {
            name: "matches won",
            value: "matches_won",
        },
        {
            name: "matches lost",
            value: "matches_lost",
        },
        {
            name: "win/loss ratio",
            value: "win_loss_ratio",
        },
        {
            name: "matches played",
            value: "matches_played",
        },
        {
            name: "matches tied",
            value: "matches_tied",
        },
        {
            name: "matches drawn",
            value: "matches_drawn",
        },
        {
            name: "matches with no result",
            value: "matches_with_no_result",
        },
        {
            name: "total runs",
            value: "total_runs",
        },
        {
            name: "total wickets",
            value: "total_wickets",
        },
        {
            name: "total balls",
            value: "total_balls",
        },
        {
            name: "average",
            value: "average",
        },
        {
            name: "scoring rate",
            value: "scoring_rate",
        },
        {
            name: "innings count",
            value: "innings_count",
        },
        {
            name: "highest score",
            value: "highest_score",
        },
        {
            name: "lowest score",
            value: "lowest_score",
        },
        {
            name: "start date",
            value: "start_date",
        },
        {
            name: "innings number",
            value: "innings_number",
        },
        {
            name: "team name",
            value: "team_name",
        },
        {
            name: "player name",
            value: "player_name",
        },
    ];

    const { data: filterOptions } = useGetFilterOptionsQuery({
        playingFormat,
        formatGender,
    });

    const { data: dismissalTypes } = useGetDismissalOptionsQuery();

    useEffect(() => {
        if (filterOptions?.data) {
            setFilterOptionData(filterOptions?.data);
        }
    }, [filterOptions?.data]);

    return (
        <div>
            {playingRole === "team" && (
                <form
                    className="p-2 text-[14px]"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <CommonStatsForm
                        filterOptionData={filterOptionData}
                        register={register}
                    />

                    {/* Team Runs */}
                    <div className="w-full flex items-center border p-2">
                        <h4 className="w-1/3 font-bold">Team Runs:</h4>

                        <div className="w-2/3 px-4 flex gap-8">
                            <label>
                                {" "}
                                from:{" "}
                                <input
                                    type="number"
                                    min={0}
                                    className="px-2 border border-blue-500 rounded-sm"
                                    {...register("min__team_innings_runs")}
                                />
                            </label>
                            <label>
                                {" "}
                                To:{" "}
                                <input
                                    type="number"
                                    className="px-2 border border-blue-500 rounded-sm"
                                    {...register("max__team_innings_runs")}
                                />
                            </label>
                        </div>
                    </div>
                    {/* Team Wicket */}
                    <div className="w-full flex items-center border p-2">
                        <h4 className="w-1/3 font-bold">Team Wickets:</h4>

                        <div className="w-2/3 px-4 flex gap-8">
                            <label>
                                {" "}
                                from:{" "}
                                <input
                                    type="number"
                                    min={0}
                                    className="px-2 border border-blue-500 rounded-sm"
                                    {...register("min__team_innings_wickets")}
                                />
                            </label>
                            <label>
                                {" "}
                                To:{" "}
                                <input
                                    type="number"
                                    className="px-2 border border-blue-500 rounded-sm"
                                    {...register("max__team_innings_wickets")}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Team Bowls Recieved/bowled */}
                    <div className="w-full flex items-center border p-2">
                        <h4 className="w-1/3 font-bold">
                            Team Bowls Recieved/bowled:
                        </h4>

                        <div className="w-2/3 px-4 flex gap-8">
                            <label>
                                {" "}
                                from:{" "}
                                <input
                                    type="number"
                                    min={0}
                                    className="px-2 border border-blue-500 rounded-sm"
                                    {...register("min__team_innings_balls")}
                                />
                            </label>
                            <label>
                                {" "}
                                To:{" "}
                                <input
                                    type="number"
                                    max={200000}
                                    className="px-2 border border-blue-500 rounded-sm"
                                    {...register("max__team_innings_balls")}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Team totals for */}
                    <div className="w-full flex items-center border p-2">
                        <h4 className="w-1/3 font-bold">Team totals for:</h4>

                        <div className="w-2/3 px-4 flex gap-8">
                            <label className="flex items-center gap-2">
                                {" "}
                                <input
                                    type="radio"
                                    value="batting"
                                    defaultChecked
                                    {...register("team_total_for")}
                                />{" "}
                                batting Team
                            </label>
                            <label className="flex items-center gap-2">
                                {" "}
                                <input
                                    type="radio"
                                    value="bowling"
                                    {...register("team_total_for")}
                                />{" "}
                                bowling team
                            </label>
                        </div>
                    </div>
                    {/* View Format */}
                    <div className="w-full flex items-center border p-2">
                        <h4 className="w-1/3 font-bold">View Format:</h4>

                        <div className="w-2/3 flex gap-8">
                            <div>
                                <label className="flex items-center gap-2 ">
                                    {" "}
                                    <input
                                        type="radio"
                                        defaultChecked={
                                            viewFormat === "overall"
                                        }
                                        name="view_format_type"
                                        value="Overall"
                                        onClick={(e) =>
                                            setViewFormat(e.target.value)
                                        }
                                    />{" "}
                                    Overall figures
                                </label>
                                <label className="flex items-center gap-2">
                                    {" "}
                                    <input
                                        type="radio"
                                        name="view_format_type"
                                        value="innings"
                                        onClick={(e) =>
                                            setViewFormat(e.target.value)
                                        }
                                    />{" "}
                                    Innings by innings list
                                </label>
                                <label className="flex items-center gap-2">
                                    {" "}
                                    <input
                                        type="radio"
                                        value="match-totals"
                                        name="view_format_type"
                                        onClick={(e) =>
                                            setViewFormat(e.target.value)
                                        }
                                    />{" "}
                                    Match Totals
                                </label>
                            </div>
                            <div>
                                <label className="flex items-center gap-2">
                                    {" "}
                                    <input
                                        type="radio"
                                        value="grounds"
                                        name="view_format_type"
                                        onClick={(e) =>
                                            setViewFormat(e.target.value)
                                        }
                                    />
                                    Ground averages
                                </label>
                                <label className="flex items-center gap-2">
                                    {" "}
                                    <input
                                        type="radio"
                                        value="series"
                                        name="view_format_type"
                                        onClick={(e) =>
                                            setViewFormat(e.target.value)
                                        }
                                    />{" "}
                                    Series averages
                                </label>
                                <label className="flex items-center gap-2">
                                    {" "}
                                    <input
                                        type="radio"
                                        value="host-nations"
                                        name="view_format_type"
                                        onClick={(e) =>
                                            setViewFormat(e.target.value)
                                        }
                                    />{" "}
                                    By Host Country
                                </label>
                                <label className="flex items-center gap-2">
                                    {" "}
                                    <input
                                        type="radio"
                                        value="oppositions"
                                        name="view_format_type"
                                        onClick={(e) =>
                                            setViewFormat(e.target.value)
                                        }
                                    />
                                    By Opposition Teams
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center gap-2">
                                    {" "}
                                    <input
                                        type="radio"
                                        value="years"
                                        name="view_format_type"
                                        onClick={(e) =>
                                            setViewFormat(e.target.value)
                                        }
                                    />{" "}
                                    By year of match start
                                </label>
                                <label className="flex items-center gap-2">
                                    {" "}
                                    <input
                                        type="radio"
                                        value="seasons"
                                        name="view_format_type"
                                        onClick={(e) =>
                                            setViewFormat(e.target.value)
                                        }
                                    />{" "}
                                    By season
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* Group By Figures */}
                    <div className="w-full flex items-center border p-2">
                        <h4 className="w-1/3 font-bold">Group Figures By:</h4>

                        <select
                            className="w-1/3 py-2 px-2 border border-blue-500 rounded-sm"
                            onChange={(e) => setSelectedFigure(e.target.value)}
                        >
                            <option
                                selected
                                disabled={viewFormat === "overall"}
                            >
                                Individual Players
                            </option>

                            {viewFormat === "overall" &&
                                groupFigureBy?.map((figure, index) => (
                                    <option
                                        key={index}
                                        value={figure.value}
                                        selected={
                                            selectedFigure === figure.value
                                        }
                                    >
                                        {figure.name}
                                    </option>
                                ))}
                        </select>

                        <button className="w-1/3 text-right px-4 text-blue-500 underline">
                            View All
                        </button>
                    </div>
                    {/* Result Qualifications */}
                    <div className="w-full flex items-center border p-2">
                        <h4 className="w-1/3 font-bold">
                            Result Qualification Filter:
                        </h4>

                        <select
                            className="w-[25%] py-2 px-2 border border-blue-500 rounded-sm"
                            onChange={(e) =>
                                setSelectedResultQualification(e.target.value)
                            }
                        >
                            <option selected>None</option>

                            {resultQualifiationFilter?.map((filter, index) => (
                                <option value={filter.value} key={index}>
                                    {filter.name}
                                </option>
                            ))}
                        </select>

                        <div className="w-[40%] px-4 flex gap-2">
                            <label className="flex items-center gap-2">
                                {" "}
                                from:{" "}
                                <input
                                    type="number"
                                    min={0}
                                    className="px-2 border border-blue-500 rounded-sm"
                                    {...(selectedResultQualification !== "None"
                                        ? register(
                                              `min__${selectedResultQualification}`
                                          )
                                        : {})}
                                />
                            </label>
                            <label className="flex items-center gap-2">
                                {" "}
                                To:{" "}
                                <input
                                    type="number"
                                    max={200000}
                                    className="px-2 border border-blue-500 rounded-sm"
                                    {...(selectedResultQualification !== "None"
                                        ? register(
                                              `max__${selectedResultQualification}`
                                          )
                                        : {})}
                                />
                            </label>
                        </div>
                    </div>
                    {/* Sort Result By */}
                    <div className="w-full flex items-center border p-2">
                        <h4 className="w-1/3 font-bold">Sort Result By:</h4>

                        <select
                            className="w-[25%] py-2 px-2 border border-blue-500 rounded-sm"
                            {...register("sort_by")}
                            defaultValue="runs_scored"
                        >
                            {supportedSortingFields?.map((sort, index) => (
                                <option key={index} value={sort.value}>
                                    {sort.name}
                                </option>
                            ))}
                        </select>

                        <div className="w-[40%] px-4 flex gap-2">
                            <label className="flex items-center gap-2 ">
                                {" "}
                                <input
                                    type="radio"
                                    value="default"
                                    {...register("sort_order")}
                                    defaultChecked
                                />{" "}
                                Default Sort
                            </label>
                            <label className="flex items-center gap-2">
                                {" "}
                                <input
                                    type="radio"
                                    value="reverse"
                                    {...register("sort_order")}
                                />{" "}
                                Reverse Sort
                            </label>
                        </div>
                    </div>

                    {/* Result Per Page */}
                    <div className="w-full flex items-center border p-2">
                        <h4 className="w-1/3 font-bold">Result Per Page:</h4>

                        <select className="w-[10%] py-2 px-2 border border-blue-500 rounded-sm">
                            <option
                                selected
                                value="25"
                                {...register("__limit")}
                            >
                                25
                            </option>
                            <option value="50" {...register("__limit")}>
                                50
                            </option>
                            <option value="75" {...register("__limit")}>
                                75
                            </option>
                            <option value="100" {...register("__limit")}>
                                100
                            </option>
                        </select>
                    </div>

                    {/* Batting Query Buttons */}
                    <div className="flex gap-4 border justify-end">
                        <input
                            type="submit"
                            value="Submit Query"
                            className="w-[200px] bg-gray-300 p-2 font-bold my-4 block shadow-md"
                        />

                        <input
                            type="reset"
                            value="Reset Query"
                            className="w-[200px] bg-gray-300 font-bold p-2 my-4 block shadow-md"
                        />
                    </div>
                </form>
            )}
        </div>
    );
};

export default page;
