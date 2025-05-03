"use client";
import React, { useEffect, useState } from "react";
import PlayingFormatSelect from "@/components/StatsTool/PlayingFormatSelect";
import PlayingRoleSelect from "@/components/StatsTool/PlayingRoleSelect";
import { useGetFilterOptionsQuery } from '@/redux/features/stats/statsApi'
import CommonStatsForm from "./CommonStatsForm";

const page = () => {
    const [playingFormat, setPlayingFormat] = useState("ODI");
    const [formatGender, setFormatGender] = useState(true);

    const [playingRole, setPlayingRole] = useState(null);

    const formats_map = ["TEST", "ODI", "T20I", "first_class", "list_a", "T20"];
    const role_map = ["Batting", "Bowling", "Team"];

    const { data: filterOptions } = useGetFilterOptionsQuery({playingFormat, formatGender});

    const [filterOptionData, setFilterOptionData] = useState(null);

    useEffect(() => {
      if(filterOptions?.data){
        setFilterOptionData(filterOptions?.data)
      }      
    }, [filterOptions?.data])

    const handlePlayingFormat = (format) => {
        setPlayingFormat(format);
        setFormatGender(true);
    };
    const handlePlayingRole = (role) => {
        setPlayingRole(role);
    };
    return (
        <div className="w-full m-auto shadow-lg p-2 my-4 border">
            <h4 className="text-center font-bold text-[22px] mb-8">
                Crickendra Stats Tool
            </h4>

            {/* playing format selector */}
            <PlayingFormatSelect handlePlayingFormat={handlePlayingFormat} selectedFormat={playingFormat} />
            {/* Playing Role */}
            <PlayingRoleSelect handlePlayingRole={handlePlayingRole} selectedRole={playingRole} />
            
            {/* Playing Role Batting */}
            { playingRole==="Batting" && (
              <div className="p-2">
                  <CommonStatsForm filterOptionData={filterOptionData} />
              </div>
            )}

             {/* Playing Role Bowling */}


              {/* Playing Role Team */}
        </div>
    );
};

export default page;
