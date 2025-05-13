"use client";
import Link from "next/link";
import React from "react";

export const navItemsData = [
    {
        name: "Live Scores",
        url: "/",
    },
    {
        name: "Matches",
        url: "/matches",
    },
    {
        name: "Players",
        url: "/players",
    },
    {
        name: "Series",
        url: "/series",
    },
];

const NavItems = ({ activeItem, isMobile }) => {
    return (
        <>
            <div className="hidden min-[800px]:flex">
                {navItemsData &&
                    navItemsData.map((item, index) => (
                        <Link href={`${item.url}`} key={index} passHref>
                            <span
                                className={`${
                                    activeItem == index
                                        ? "dark:text-[#37a39a] text-[crimson]"
                                        : "dark:text-white text-black"
                                } text-[18px] px-6 font-Poppins font-[400]`}
                            >
                                {item.name}
                            </span>
                        </Link>
                    ))}
            </div>

            {isMobile && (
                <div className="min-[800px]:hidden mt-5">
                    <div className="w-full text-center py-6">
                        <Link
                            href={"/"}
                            className={`text-[20px] font-Poppins font-[500] text-black dark:text-white`}
                        >
                            Crickendra
                        </Link>
                    </div>
                    {navItemsData &&
                        navItemsData.map((item, index) => (
                            <Link href={`${item.url}`} key={index} passHref>
                                <span
                                    className={`${
                                        activeItem == index
                                            ? "dark:text-[#37a39a] text-[crimson]"
                                            : "dark:text-white text-black"
                                    } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                                >
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                </div>
            )}
        </>
    );
};

export default NavItems;
