"use client";
import React, { useEffect, useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useGetAllTeamsQuery } from "@/redux/features/teams/teamsApi";
import { useRouter, useSearchParams } from "next/navigation";

const page = () => {
    const [teamsInfo, setTeamsInfo] = useState([]);

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const router = useRouter();

    const currentPage = parseInt(params.get("__page") || "1");
   
    const { data: teamsData } = useGetAllTeamsQuery(currentPage);

    useEffect(() => {
        if (teamsData?.data?.teams) {
            setTeamsInfo(teamsData?.data?.teams);
        }
    }, [teamsData]);

    const handlePageChange = (newPage) => {
        params.set("__page", newPage);
        router.push(`?${params.toString()}`);
    };
    return (
        <div>
            <div className="border my-10 shadow-md py-2 px-8">
                <h4 className="font-bold text-[24px] my-4">All Teams</h4>

                <div className="w-full">
                    <div className="px-4 py-2">
                        {teamsInfo?.map((team) => (
                            <div
                                key={team.id}
                                className="py-2 flex border-b border-b-green-300"
                            >
                                <h4 className="w-1/3 text-left text-blue-500">
                                    {team.name}
                                </h4>
                                <p className="w-1/3">{team.short_name}</p>
                                <p className="w-1/3 text-right capitalize">
                                    {team.playing_level}
                                </p>
                            </div>
                        ))}
                    </div>

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
                            disabled={!teamsData?.data?.next}
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
