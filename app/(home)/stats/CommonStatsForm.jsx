import React from "react";

const CommonStatsForm = ({ filterOptionData, register }) => {
    console.log(filterOptionData);
    return (
        <div className="w-full !text-[14px]">
            {/* Primary Team */}
            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Primary Team:</h4>

                <select className="w-1/3 py-2 px-2 border border-blue-500 rounded-sm" {...register("primary_team")} defaultValue="">
                    <option value="">All Teams</option>
                    {filterOptionData &&
                        filterOptionData?.primary_teams?.map((team) => (
                            <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                </select>

                <button className="w-1/3 text-right px-4 text-blue-500 underline">
                    View All
                </button>
            </div>

            {/* Opposition Team */}
            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Opposition Team:</h4>

                <select className="w-1/3 py-2 px-2 border border-blue-500 rounded-sm"  {...register("opposition_team")} defaultValue="">
                    <option value="">All Teams</option>
                    {filterOptionData &&
                        filterOptionData?.opposition_teams?.map((team) => (
                            <option  key={team.id} value={team.id}>{team.name}</option>
                        ))}
                </select>

                <button className="w-1/3 text-right px-4 text-blue-500 underline">
                    View All
                </button>
            </div>

            {/* Home or Away */}
            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Home or Away:</h4>

                <div className="w-2/3 px-4 flex gap-8">
                    <label className="flex items-center gap-2">
                        {" "}
                        <input type="checkbox" value="home" {...register("home_or_away")} /> Home
                    </label>
                    <label className="flex items-center gap-2">
                        {" "}
                        <input type="checkbox" value="away" {...register("home_or_away")} /> Away
                    </label>
                    <label className="flex items-center gap-2">
                        {" "}
                        <input type="checkbox" value="neutral" {...register("home_or_away")} /> Neutral Venue
                    </label>
                </div>
            </div>

            {/* Host Nation */}
            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Host Nation:</h4>

                <select className="w-1/3 py-2 px-2 border border-blue-500 rounded-sm" {...register("host_nation")} defaultValue="">
                    <option value="">All Nations</option>
                    {filterOptionData &&
                        filterOptionData?.host_nations?.map((nation) => (
                            <option key={nation.id} value={nation.id}>{nation.name}</option>
                        ))}
                </select>

                <button className="w-1/3 text-right px-4 text-blue-500 underline">
                    View All
                </button>
            </div>

            {/* Continent */}
            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Continent:</h4>

                <select className="w-1/3 py-2 px-2 border border-blue-500 rounded-sm"  {...register("continent")} defaultValue="">
                    <option value="">All Continents</option>
                    {filterOptionData &&
                        filterOptionData?.continents.map((continent) => (
                            <option key={continent.id} value={continent.id}>
                                {continent.name}
                            </option>
                        ))}
                </select>

                <button className="w-1/3 text-right px-4 text-blue-500 underline">
                    View All
                </button>
            </div>

            {/* Ground */}
            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Ground:</h4>

                <select className="w-1/3 py-2 px-2 border border-blue-500 rounded-sm"     {...register("ground")} defaultValue="">
                    <option value="">All Grounds</option>
                    {filterOptionData &&
                        filterOptionData?.grounds?.map((ground) => (
                            <option
                                key={ground.id}
                                value={ground.id}
                            
                            >{`${ground.name}, ${ground.city_name}, ${ground.host_nation_name}`}</option>
                        ))}
                </select>

                <button className="w-1/3 text-right px-4 text-blue-500 underline">
                    View All
                </button>
            </div>

            {/* Starting Date */}
            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Starting Date:</h4>

                <div className="w-2/3 px-4 flex gap-8">
                    <label>
                        {" "}
                        from:{" "}
                        <input
                            type="date"
                            className="px-2 border border-blue-500 rounded-sm"
                            defaultValue={filterOptionData?.min_date}
                            {...register("min_start_date")}
                        />
                    </label>
                    <label>
                        {" "}
                        To:{" "}
                        <input
                            type="date"
                            className="px-2 border border-blue-500 rounded-sm"
                            defaultValue={filterOptionData?.max_date}
                            {...register("max_start_date")}
                        />
                    </label>
                </div>
            </div>

            {/* Season */}
            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Season:</h4>

                <select className="w-1/3 py-2 px-2 border border-blue-500 rounded-sm" {...register("season")} defaultValue={""}>
                    <option value="">All Season</option>
                    {filterOptionData &&
                        filterOptionData?.seasons?.map((season, index) => (
                            <option key={index} value={season}>{season}</option>
                        ))}
                </select>

                <button className="w-1/3 text-right px-4 text-blue-500 underline">
                    View All
                </button>
            </div>

            {/* Series */}
            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Series:</h4>

                <select className="w-1/3 py-2 px-2 border border-blue-500 rounded-sm"  {...register("series")} defaultValue="">
                    <option value="">All Series</option>
                    {filterOptionData &&
                        filterOptionData?.series?.map((series) => (
                            <option
                                key={series.id}
                                value={series.id}
                               
                            >{`${series.name}, ${series.season}`}</option>
                        ))}
                </select>

                <button className="w-1/3 text-right px-4 text-blue-500 underline">
                    View All
                </button>
            </div>

            {/* Tournament */}
            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Tournament:</h4>

                <select className="w-1/3 py-2 px-2 border border-blue-500 rounded-sm"  {...register("tournament")} defaultValue="">
                    <option value="">All Tournaments</option>
                    {filterOptionData &&
                        filterOptionData?.tournaments?.map((tournament) => (
                            <option key={tournament.id} value={tournament.id}>
                                {tournament.name}
                            </option>
                        ))}
                </select>

                <button className="w-1/3 text-right px-4 text-blue-500 underline">
                    View All
                </button>
            </div>

            {/* Match Result */}
            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Match Result:</h4>

                <div className="w-2/3 px-4 flex gap-8">
                    <label className="flex items-center gap-2">
                        {" "}
                        <input type="radio" value="won" {...register("match_result")} /> Won
                    </label>
                    <label className="flex items-center gap-2">
                        {" "}
                        <input type="radio" value="lost" {...register("match_result")} /> Lost
                    </label>
                    <label className="flex items-center gap-2">
                        {" "}
                        <input type="radio" value="drawn" {...register("match_result")} /> Drawn
                    </label>
                    <label className="flex items-center gap-2">
                        {" "}
                        <input type="radio" value="tied" {...register("match_result")} /> Tied
                    </label>
                    <label className="flex items-center gap-2">
                        {" "}
                        <input type="radio" value="no-result" {...register("match_result")} />
                        No Result
                    </label>
                </div>
            </div>

            {/* Toss Result */}
            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Toss Result:</h4>

                <div className="w-2/3 px-4 flex gap-8">
                    <label className="flex items-center gap-2">
                        {" "}
                        <input type="radio" value="won" {...register("toss_result")} /> Won
                    </label>
                    <label className="flex items-center gap-2">
                        {" "}
                        <input type="radio" value="lost" {...register("toss_result")} /> Lost
                    </label>
                </div>
            </div>

            {/* Bat or field first  */}
            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Batting or fielding first:</h4>

                <div className="w-2/3 px-4 flex gap-8">
                    <label className="flex items-center gap-2">
                        {" "}
                        <input type="radio" value="bat" {...register("bat_field_first")} /> Batting First
                    </label>
                    <label className="flex items-center gap-2">
                        {" "}
                        <input type="radio" value="field" {...register("bat_field_first")} /> Fielding First
                    </label>
                </div>
            </div>

            {/* Inning Number */}
            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Innings Number:</h4>

                <div className="w-2/3 px-4 flex gap-8">
                    <label className="flex items-center gap-2">
                        {" "}
                        <input type="checkbox" value="1" {...register("innings_number ")}  /> 1st Inning
                    </label>
                    <label className="flex items-center gap-2">
                        {" "}
                        <input type="checkbox" value="2" {...register("innings_number ")}  /> 2nd Inning
                    </label>
                    <label className="flex items-center gap-2">
                        {" "}
                        <input type="checkbox" value="3" {...register("innings_number ")}  /> 3rd Inning
                    </label>
                    <label className="flex items-center gap-2">
                        {" "}
                        <input type="checkbox" value="4" {...register("innings_number ")}  /> 4th Inning
                    </label>
                </div>
            </div>
        </div>
    );
};

export default CommonStatsForm;
