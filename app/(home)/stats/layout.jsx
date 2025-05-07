"use client";
import PlayingFormatSelect from "@/components/StatsTool/PlayingFormatSelect";
import PlayingRoleSelect from "@/components/StatsTool/PlayingRoleSelect";
import React, { useState } from "react";

const StatsLayout = ({ children }) => {
    const [playingFormat, setPlayingFormat] = useState("ODI");

    const [playingRole, setPlayingRole] = useState(null);
    const [formatGender, setFormatGender] = useState(true);


    const handlePlayingFormat = (format) => {
        setPlayingFormat(format);
        setFormatGender(true);
    };
    const handlePlayingRole = (role) => {
        setPlayingRole(role);
    };

   
    return (
        <div>
            <div className="w-full m-auto shadow-lg p-2 my-4 border">
                <h4 className="text-center font-bold text-[22px] mb-8">
                    Crickendra Stats Tool
                </h4>

                {/* playing format selector */}
                <PlayingFormatSelect
                    handlePlayingFormat={handlePlayingFormat}
                    selectedFormat={playingFormat}
                />
                {/* Playing Role */}
                <PlayingRoleSelect
                    handlePlayingRole={handlePlayingRole}
                    selectedRole={playingRole}
                    playingFormat={playingFormat}
                    formatGender={formatGender}
                />

                {children}
            </div>
        </div>
    );
};

export default StatsLayout;
