import Link from "next/link";
import React from "react";

const PlayingRoleSelect = ({
    handlePlayingRole,
    selectedRole,
    playingFormat,
    formatGender,
}) => {
    const role_map = ["Batting", "Bowling", "Team"];

    return (
        <div className="pb-2 mt-4">
            <div className="playing-role-select border-b">
                <ul className="flex mx-2">
                    {role_map.map((role) => (
                        <li
                            key={role}
                            className={`py-2 px-4 border-r-2 text-[14px] cursor-pointer ${
                                selectedRole === role
                                    ? "text-blue-600 font-bold"
                                    : "text-blue-500"
                            }`}
                            onClick={() => handlePlayingRole(role)}
                        >
                            <Link
                                href={`/stats/${role.toLowerCase()}?playing_format=${playingFormat}&is_male=${formatGender}`}
                                className="text-blue-500 underline"
                            >
                                {role}
                            </Link>
                            {/* <Link href="#">{role}</Link> */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PlayingRoleSelect;
