"use client";
import { useGetSeriesMatchesQuery } from "@/redux/features/series/seriesApi";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SeriesResult from "../SeriesResult";
import SeriesTab from "@/components/series/SeriesTab";

const page = ({ params: asyncParams }) => {
    const { seriesId } = React.use(asyncParams);

    const [seriesHeader, setSeriesHeader] = useState([]);
    const [seriesMatches, setSeriesMatches] = useState([]);
    // const [fixtureMatches, setFixtureMatches] = useState([]);

    // const [seriesTopBatters, setSeriesTopBatters] = useState([]);
    // const [seriesTopBowlers, setSeriesTopBowlers] = useState([]);
    const {
        data: seriesMatchesData,
        error,
        isLoading,
        isSuccess,
    } = useGetSeriesMatchesQuery(seriesId);

    console.log(seriesMatchesData);

    useEffect(() => {
        if (seriesMatchesData) {
            if (seriesMatchesData?.data?.series_header) {
                setSeriesHeader(seriesMatchesData.data.series_header);
            }
            if (seriesMatchesData?.data?.matches) {
                const sortedSeriesMatches = [
                    ...seriesMatchesData?.data?.matches,
                ].sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
                setSeriesMatches(sortedSeriesMatches);
            }            
        }
    }, [seriesMatchesData]);

    // useEffect(() => {
    //     if (matchHeader?.innings_scores) {
    // const sortedInningScore = [...matchHeader?.innings_scores].sort(
    //     (a, b) => a.innings_number - b.innings_number
    // );
    // setInningsScore(sortedInningScore);
    //     }
    // }, [matchHeader]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full py-4">
            <div className="p-2 my-4 border">
                <SeriesTab seriesId={seriesId} />
            </div>
            <h4 className="p-2 my-4 border font-bold bg-[#1866db] text-white">{`${seriesHeader?.series_name} ${seriesHeader.season} : Fixtures and Results`}</h4>
            {seriesMatches &&
                seriesMatches?.map((seriesInfo, index) => (
                    <SeriesResult seriesInfo={seriesInfo} key={index} />
                ))}
        </div>
    );
};

export default page;
