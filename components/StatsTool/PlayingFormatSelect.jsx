import React from "react";

const PlayingFormatSelect = ({ handlePlayingFormat, selectedFormat }) => {
    const formats_map = ["TEST", "ODI", "T20I", "first_class", "list_a", "T20"];

    return (
        <div className="pt-2 mt-4  border-b">
            <div className="playing-format-select">
                <ul className="flex gap-4 mx-2 border-b border-gray-300 ">
                    {formats_map.map((format) => (
                        <li
                            key={format}
                            className={`px-8 py-2 shadow-md rounded-md text-[14px] cursor-pointer ${
                                selectedFormat === format
                                    ? "bg-blue-500 text-white border-b-2 border-white"
                                    : "bg-gray-300 text-black border border-gray-300"
                            }`}
                            onClick={() => handlePlayingFormat(format)}
                        >
                            <a href="#">{format}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PlayingFormatSelect;
