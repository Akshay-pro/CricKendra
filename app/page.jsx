"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/user/Navbar/Header";
import { useGetCompletedMatchesQuery } from "@/redux/features/matches/matchesApi";
import MatchCard from "@/components/match/MatchCard";
import ArticlesPage from "./(home)/articles/ArticlesPage";
const page = () => {
    const [open, setOpen] = useState(false);
    const [completedMatches, setCompletedMatches] = useState([]);
    const [activeItem, setActiveItem] = useState(0);

    const {
        data: completedMatchData,
        error,
        isLoading,
    } = useGetCompletedMatchesQuery();

    useEffect(() => {
        if (completedMatchData?.data.matches) {
            setCompletedMatches(completedMatchData?.data.matches);
        }
    }, [completedMatchData]);
    console.log(completedMatchData);

    if (isLoading) return <div className="p-4">Loading...</div>;
    if (error)
        return <div className="p-4 text-red-600">Error loading matches.</div>;

    const matches = completedMatches.slice(0, 5) || [];
    return (
        <div>
            <Header open={open} setOpen={setOpen} activeItem={activeItem} />

            <div className="px-10 py-5">

                <div className="mb-4">
                    {/* <h2 className="font-bold mb-2">Matches</h2> */}
                    <div className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hidden">
                        {matches.map((match) => (
                            <div key={match.match_id}>
                                <MatchCard match={match} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <ArticlesPage />
                </div>
            </div>
        </div>
    );
};

export default page;
