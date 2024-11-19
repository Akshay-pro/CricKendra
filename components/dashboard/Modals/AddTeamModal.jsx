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
import { useGetCitiesQuery } from "../../../redux/features/matches/matchesApi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AddTeamModal() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [cityData, setCityData] = useState([]);
    const { data: cities, isSuccess, isError } = useGetCitiesQuery();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const form = useForm({
        defaultValues: {},
    });

    function onSubmit(values) {
        console.log(values);
    }

    useEffect(() => {
        if (isSuccess) {
            setCityData(cities?.data?.cities);
        }
    }, [cities]);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto">
                    <Plus /> Add Team
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add Team Form</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="teamName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="India" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="playingLevel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Playing Level</FormLabel>
                                    <FormControl>
                                        <Select {...field}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {/* {cityData.map((city) => (
                                                    <SelectItem key={city.id} value={city.name}>
                                                        {city.name}
                                                    </SelectItem>
                                                ))} */}

                                                <SelectItem value="international">
                                                    International
                                                </SelectItem>
                                                <SelectItem value="domestic">
                                                    Domestic
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="teamGender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team Gender</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            {...field}
                                            className="flex gap-4 mt-2"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value="true"
                                                    id="team-male"
                                                />
                                                <Label htmlFor="team-male">
                                                    Male
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value="false"
                                                    id="team-female"
                                                />
                                                <Label htmlFor="team-female">
                                                    Female
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="teamImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="team-image"
                                            type="file"
                                            onChange={handleFileChange}
                                            {...field}
                                        />
                                        {/* {selectedFile && (
                                                <div className="mt-2 ml-2">
                                                    <Image
                                                        src={selectedFile}
                                                        alt="Preview"
                                                        className="rounded-md"
                                                        width={80}
                                                        height={40}
                                                    />
                                                </div>
                                            )} */}
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="shortName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team's Short Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="IND" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Add Team</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
