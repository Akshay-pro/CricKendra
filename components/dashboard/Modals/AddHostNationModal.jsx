"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useGetContinentsQuery } from "@/redux/features/venue/venueApi";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function AddHostNationModal() {
    const { data: { data: continentData, success: continentSuccess } = {} } =
        useGetContinentsQuery();
    const [selectedContinentId, setSelectedContinentId] = useState(null);

    console.log(continentData);
    const form = useForm({
        defaultValues: {
            hostNationName: "",
            continent_id: 0,
        },
    });

    const handleContinentChange = (value) => {
        console.log(value);
        setSelectedContinentId(value);
    };

    function onSubmit(values) {
        console.log(values);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto">
                    <Plus /> Add Host Nation
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add Host Nation Form</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="hostNationName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Host Nation Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="India" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="continent_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Continent</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={selectedContinentId}
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                handleContinentChange(value);
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Continent">
                                                    {continentData.find(
                                                        (continent) =>
                                                            continent.id ==
                                                            selectedContinentId
                                                    )?.name ||
                                                        "Select a continent"}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {continentSuccess &&
                                                    continentData.map(
                                                        (continent, index) => (
                                                            <SelectItem
                                                                value={
                                                                    continent.id
                                                                }
                                                                key={
                                                                    continent.id
                                                                }
                                                            >
                                                                {continent.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Add Host Nation</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
