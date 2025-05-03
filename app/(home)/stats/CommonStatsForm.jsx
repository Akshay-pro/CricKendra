import React from "react";

const CommonStatsForm = ({ filterOptionData }) => {
    console.log(filterOptionData);
    return (
        <div className="w-full !text-[14px]">
            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Primary Team:</h4>

                <select className="w-1/3 py-2 px-2 border border-blue-500 rounded-sm">
                    <option selected>All Teams</option>
                    {filterOptionData &&
                        filterOptionData?.primary_teams.map((team) => (
                            <option value={team.id}>{team.name}</option>
                        ))}
                </select>

                <button className="w-1/3 text-right px-4 text-blue-500 underline">
                    View All
                </button>
            </div>

            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Opposition Team:</h4>

                <select className="w-1/3 py-2 px-2 border border-blue-500 rounded-sm">
                    <option selected>All Teams</option>
                    {filterOptionData &&
                        filterOptionData?.opposition_teams.map((team) => (
                            <option value={team.id}>{team.name}</option>
                        ))}
                </select>

                <button className="w-1/3 text-right px-4 text-blue-500 underline">
                    View All
                </button>
            </div>

            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Host Nation:</h4>

                <select className="w-1/3 py-2 px-2 border border-blue-500 rounded-sm">
                    <option selected>All Nations</option>
                    {filterOptionData &&
                        filterOptionData?.host_nations.map((nation) => (
                            <option value={nation.id}>{nation.name}</option>
                        ))}
                </select>

                <button className="w-1/3 text-right px-4 text-blue-500 underline">
                    View All
                </button>
            </div>

            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Continent:</h4>

                <select className="w-1/3 py-2 px-2 border border-blue-500 rounded-sm">
                    <option selected>All Continents</option>
                    {filterOptionData &&
                        filterOptionData?.continents.map((continent) => (
                            <option value={continent.id}>
                                {continent.name}
                            </option>
                        ))}
                </select>

                <button className="w-1/3 text-right px-4 text-blue-500 underline">
                    View All
                </button>
            </div>

            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Ground:</h4>

                <select className="w-1/3 py-2 px-2 border border-blue-500 rounded-sm">
                    <option selected>All Grounds</option>
                    {filterOptionData &&
                        filterOptionData?.grounds.map((ground) => (
                            <option
                                value={ground.id}
                            >{`${ground.name}, ${ground.city_name}, ${ground.host_nation_name}`}</option>
                        ))}
                </select>

                <button className="w-1/3 text-right px-4 text-blue-500 underline">
                    View All
                </button>
            </div>

            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Starting Date:</h4>

                

                <div className="w-2/3 px-4 flex gap-8">
                    <label> from:  <input type="date" className="px-2 border border-blue-500 rounded-sm" value={filterOptionData?.min_date} /></label>
                    <label> To:  <input type="date"  className="px-2 border border-blue-500 rounded-sm" value={filterOptionData?.max_date} /></label>
                </div>
            </div>

            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Season:</h4>

                <select className="w-1/3 py-2 px-2 border border-blue-500 rounded-sm">
                    <option selected>All Season</option>
                    {filterOptionData &&
                        filterOptionData?.seasons.map((season) => (
                            <option value={season}>{season}</option>
                        ))}
                </select>

                <button className="w-1/3 text-right px-4 text-blue-500 underline">
                    View All
                </button>
            </div>

            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Series:</h4>

                <select className="w-1/3 py-2 px-2 border border-blue-500 rounded-sm">
                    <option selected>All Series</option>
                    {filterOptionData &&
                        filterOptionData?.series.map((series) => (
                            <option
                                value={series.id}
                            >{`${series.name}, ${series.season}`}</option>
                        ))}
                </select>

                <button className="w-1/3 text-right px-4 text-blue-500 underline">
                    View All
                </button>
            </div>

            <div className="w-full flex items-center border p-2">
                <h4 className="w-1/3 font-bold">Tournament:</h4>

                <select className="w-1/3 py-2 px-2 border border-blue-500 rounded-sm">
                    <option selected>All Tournaments</option>
                    {filterOptionData &&
                        filterOptionData?.tournaments.map((tournament) => (
                            <option value={tournament.id}>
                                {tournament.name}
                            </option>
                        ))}
                </select>

                <button className="w-1/3 text-right px-4 text-blue-500 underline">
                    View All
                </button>
            </div>
        </div>
    );
};

export default CommonStatsForm;
