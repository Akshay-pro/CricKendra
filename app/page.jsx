"use client";

import React, { useState } from "react";
import Header from "@/components/user/Navbar/Header";

const page = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    return (
        <div>
            <Header open={open} setOpen={setOpen} activeItem={activeItem} />
        </div>
    );
};

export default page;
