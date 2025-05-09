
"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllPlayersQuery } from "@/redux/features/players/playersApi";
import Link from "next/link";

const page = () => {

    const [playersInfo, setPlayersInfo] = useState([]);
    
    const { data: playersData } = useGetAllPlayersQuery();

    console.log(playersData)

    useEffect(() => {
        if(playersData?.data?.players){
            setPlayersInfo(playersData?.data?.players)
        }
    }, [playersData])

    return (
        <div>
            <div className="border my-10 shadow-md py-2 px-8">
                <h4 className="font-bold text-[24px] my-4">All Cricketers</h4>

                <div className="w-full">
                    <Tabs defaultValue="all-player" className="w-full">
                        <TabsList>
                            <TabsTrigger value="all-player" className="w-40">
                                All Players
                            </TabsTrigger>
                            <TabsTrigger value="test" className="w-40">
                                Test Players
                            </TabsTrigger>
                            <TabsTrigger value="odi" className="w-40">
                                ODI Players
                            </TabsTrigger>
                            <TabsTrigger value="t20" className="w-40">
                                T20 Players
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="all-player" className="px-4 py-2">
                            {
                                playersInfo?.map((player) => (
                                    <Link key={player.id} href={`players/${player.id}`} className="py-2 block border-b border-b-green-300">  
                                        <h4><span className="font-bold">Player's Name :</span> <span className="text-blue-500">{player.name}</span></h4>
                                    </Link>
                                )) 
                            }
                        </TabsContent>
                        <TabsContent value="test" className="px-4 py-2">Test Players</TabsContent>
                        <TabsContent value="odi" className="px-4 py-2">T20 Players</TabsContent>
                        <TabsContent value="t20" className="px-4 py-2">ODI Players</TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default page;
