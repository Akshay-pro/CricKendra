"use client";
import React, { useState } from "react";
import NavItems from "./NavItems";
import Link from "next/link";
import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi";

const Header = ({ activeItem, setOpen, route, open, setRoute }) => {
    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);

    const handleClose = (e) => {
        if (e.target.id === "screen") {
            setOpenSidebar(false);
        }
    };
    return (
        <div className="w-full relative">
            <div
                className={`${
                    active
                        ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
                        : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
                }`}
            >
                <div className="w-[95%] min-[800px]:w-[92%] m-auto py-2 h-full">
                    <div className="w-full h-[80px] flex items-center justify-between p-3">
                        <div>
                            <Link
                                href={"/"}
                                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
                            >
                                CricKendra
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <NavItems
                                activeItem={activeItem}
                                isMobile={false}
                            />
                            <ThemeSwitcher />

                            {/* for mobile */}
                            <div className="min-[800px]:hidden">
                                <HiOutlineMenuAlt3
                                    size={25}
                                    className="cursor-pointer dark:text-white text-black"
                                    onClick={() => setOpenSidebar(true)}
                                />
                            </div>
                            <HiOutlineUserCircle
                                size={25}
                                className="hidden min-[800px]:block cursor-pointer dark:text-white text-black"
                                onClick={() => setOpen(true)}
                            />
                        </div>
                    </div>
                </div>

                {/* mobile sidebar */}
                {openSidebar && (
                    <div
                        className="fixed w-full h-screen top-0 left-0 z-[9999] dark:bg-[unset] bg-[#00000024]"
                        onClick={handleClose}
                        id="screen"
                    >
                        <div className="w-[70%] fixed z-[99999] h-screen bg-white dark:bg-slate-900 dark-bg-opacity-90 top-0 right-0">
                            <NavItems activeItem={activeItem} isMobile={true} />
                            <HiOutlineUserCircle
                                size={25}
                                className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                                onClick={() => setOpen(true)}
                            />
                            <br />
                            <br />
                            <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                                Copyright &copy; 2024 | Crickendra
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
