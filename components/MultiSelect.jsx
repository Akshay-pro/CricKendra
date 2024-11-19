"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component

const MultiSelect = ({
    placeholder,
    options: values,
    selectedOptions: selectedItems,
    setSelectedOptions: setSelectedItems,
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSelectChange = (value) => {
        if (!selectedItems.includes(value)) {
            setSelectedItems((prev) => [...prev, value]);
        } else {
            const referencedArray = [...selectedItems];
            const indexOfItemToBeRemoved = referencedArray.indexOf(value);
            referencedArray.splice(indexOfItemToBeRemoved, 1);
            setSelectedItems(referencedArray);
        }
    };

    const isOptionSelected = (value) => {
        return selectedItems.includes(value) ? true : false;
    };

    const getSelectedItemsLabel = () => {
        if (selectedItems.length === 0) {
            return placeholder;
        }
        return selectedItems.map((item) => {
            const option = values.find((value) => value.value === item);
            return option ? option.label : item;
        }).join(', ');
    };

    const filteredOptions = values.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="w-full">
                    <Button
                        variant="outline"
                        className="w-full flex items-center justify-between"
                    >
                        <div className="overflow-auto">{getSelectedItemsLabel()}</div>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-56"
                    onCloseAutoFocus={(e) => e.preventDefault()}
                >
                    <div className="p-2">
                        <Input
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {filteredOptions.map((value, index) => (
                        <DropdownMenuCheckboxItem
                            onSelect={(e) => e.preventDefault()}
                            key={index}
                            checked={isOptionSelected(value.value)}
                            onCheckedChange={() => handleSelectChange(value.value)}
                        >
                            {value.label}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default MultiSelect;
