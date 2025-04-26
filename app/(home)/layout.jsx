"use client";
import Header from "@/components/user/Navbar/Header";
import React, { useState } from "react";

const HomeLayout = ({children}) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    return (
        <div>
            <Header open={open} setOpen={setOpen} activeItem={activeItem} />
            <div className="w-4/5 m-auto">
             {children}
            </div>
        </div>
    )
};

export default HomeLayout;
