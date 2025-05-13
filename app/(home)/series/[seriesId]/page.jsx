"use client";
import { useGetSeriesByIdQuery } from "@/redux/features/series/seriesApi";
import React, { useEffect, useState } from "react";
import SeriesTab from "@/components/series/SeriesTab";
import SeriesResult from "./SeriesResult";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ArticlesPage from "../../articles/ArticlesPage";
const page = ({ params: asyncParams }) => {
    const { seriesId } = React.use(asyncParams);

    const [seriesHeader, setSeriesHeader] = useState([]);
    const [resultMatches, setResultMatches] = useState([]);
    const [fixtureMatches, setFixtureMatches] = useState([]);

    const [seriesTopBatters, setSeriesTopBatters] = useState([]);
    const [seriesTopBowlers, setSeriesTopBowlers] = useState([]);
    const {
        data: seriesData,
        error,
        isLoading,
        isSuccess,
    } = useGetSeriesByIdQuery(seriesId);
    console.log(seriesData);

    useEffect(() => {
        if (seriesData) {
            if (seriesData?.data?.series_header) {
                setSeriesHeader(seriesData.data.series_header);
            }
            if (seriesData?.data?.result_matches) {
                const sortedResultMatches = [
                    ...seriesData?.data?.result_matches,
                ].sort((a, b) => b.event_match_number - a.event_match_number);
                setResultMatches(sortedResultMatches);
            }
            if (seriesData?.data?.result_matches) {
                setFixtureMatches(seriesData?.data?.fixture_matches);
            }
            if (seriesData?.data?.series_header?.top_batters) {
                const sortedBattingScore = [
                    ...seriesData?.data?.series_header?.top_batters,
                ].sort((a, b) => b.runs_scored - a.runs_scored);
                setSeriesTopBatters(sortedBattingScore);
            }
            if (seriesData?.data?.series_header?.top_bowlers) {
                const sortedBowlingScore = [
                    ...seriesData?.data?.series_header?.top_bowlers,
                ].sort((a, b) => b.wickets_taken - a.wickets_taken);
                setSeriesTopBowlers(sortedBowlingScore);
            }
        }
    }, [seriesData]);

    // useEffect(() => {
    //     if (matchHeader?.innings_scores) {
    // const sortedInningScore = [...matchHeader?.innings_scores].sort(
    //     (a, b) => a.innings_number - b.innings_number
    // );
    // setInningsScore(sortedInningScore);
    //     }
    // }, [matchHeader]);

    console.log(seriesTopBowlers);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full py-4">
            <div className="p-2 my-4 border">
                <SeriesTab seriesId={seriesId} />
            </div>
            <div className="p-2 my-4 border font-bold bg-[#1866db] text-white">
                {`Series > ${seriesHeader?.series_name} ${seriesHeader?.season}`}
            </div>
            <div className="w-full flex gap-5">
                <div className="w-1/3 p-2">
                    <Tabs defaultValue="reuslt" className="w-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="reuslt" className="w-1/2">
                                Results
                            </TabsTrigger>
                            <TabsTrigger value="fixtures" className="w-1/2">
                                Fixtures
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="reuslt">
                            {resultMatches &&
                                resultMatches?.map((seriesInfo, index) => (
                                    <SeriesResult
                                        seriesInfo={seriesInfo}
                                        key={index}
                                    />
                                ))}
                        </TabsContent>
                        <TabsContent value="fixtures">
                            Change your fixtures here.
                        </TabsContent>
                    </Tabs>
                </div>
                <div className="w-1/3 p-4 border">
                    <ArticlesPage />     
                </div>
                <div className="w-1/3 p-2">
                    <div className="top-batter-card shadow-md p-2 mb-2">
                        <h3 className="p-2 border font-bold">
                            {" "}
                            {`${seriesHeader?.series_name} ${seriesHeader?.season} Top Run Scorer`}
                        </h3>

                        <div>
                            {seriesTopBatters &&
                                seriesTopBatters?.map((batter,index) => (
                                    <div className="p-2 flex items-center gap-10 w-full border-b border-slate-300 last:border-none" key={index}>
                                        <Image
                                            src={
                                                batter?.batter_image_url ||
                                                "/assets/defaultTeamImg.png"
                                            }
                                            className="w-16"
                                            width={35}
                                            height={35}
                                            alt="logo"
                                        />
                                        <div className="w-2/3">
                                            <h2 className="text-[14px] font-bold">
                                                {batter?.batter_name}
                                            </h2>
                                            <h2 className="text-[22px] font-bold">
                                                {batter?.runs_scored}
                                            </h2>
                                            <p className="text-[12px] text-[#646464] flex gap-5">
                                                <span>{`Inning: ${batter?.innings_batted}`}</span>{" "}
                                                <span>{`Average: ${batter?.average?.toFixed(2)}`}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="top-bowler-card shadow-md p-2">
                        <h3 className="p-2 font-bold">
                            {" "}
                            {`${seriesHeader?.series_name} ${seriesHeader?.season} Top Wicket Takers`}
                        </h3>

                        <div>
                            {seriesTopBowlers &&
                                seriesTopBowlers?.map((bowler, index) => (
                                    <div className="p-2 flex items-center gap-10 w-full border-b border-slate-300 last:border-none" key={index}>
                                        <Image
                                            src={
                                                bowler?.bowler_image_url ||
                                                "/assets/defaultTeamImg.png"
                                            }
                                            className="w-16"
                                            width={35}
                                            height={35}
                                            alt="logo"
                                        />
                                        <div className="w-2/3">
                                            <h2 className="text-[14px] font-bold">
                                                {bowler?.bowler_name}
                                            </h2>
                                            <h2 className="text-[22px] font-bold">
                                                {bowler?.wickets_taken}
                                            </h2>
                                            <p className="text-[12px] text-[#646464] flex gap-5">
                                                <span>{`Inning: ${bowler?.innings_bowled}`}</span>{" "}
                                                <span>{`Average: ${bowler?.average.toFixed(2)}`}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
