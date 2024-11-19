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
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    useGetMatchFormatQuery,
    useGetMatchLevelQuery,
} from "@/redux/features/matches/matchesApi";
import { useCreateTounamentMutation } from "@/redux/features/tournament/tournamentApi";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function AddTournamentModal() {
    const { data: { data: matchFormats, success: matchFormatStatus } = {} } =
        useGetMatchFormatQuery();

    const { data: { data: matchLevels, success: matchLevelStatus } = {} } =
        useGetMatchLevelQuery();

    const [createTournament, { isLoading, isSuccess, error }] =
        useCreateTounamentMutation();

    const { toast } = useToast();
    const form = useForm({
        defaultValues: {
            name: "",
            playing_level: "",
            is_male: true,
            playing_format: "",
        },
    });

    async function onSubmit(values) {
        console.log(values);

        if (!isLoading) {
            await createTournament(values);
        }
    }

    const [matchFormatData, setMatchFormatData] = useState([]);
    const [matchLevelData, setMatchLevelData] = useState([]);

    useEffect(() => {
        if (matchFormatStatus === true && matchFormats) {
            setMatchFormatData(matchFormats);
        }
    }, [matchFormatStatus, matchFormatData]);

    useEffect(() => {
        if (matchLevelStatus === true && matchLevels) {
            setMatchLevelData(matchLevels);
        }
    }, [matchLevelStatus, matchLevelData]);

    useEffect(() => {
        if (isSuccess) {
            toast({
                description: "Tournament created successfully!",
                variant: "success",
                duration: 5000,
            });

            redirect("/dashboard/matches/tournament");
        }

        if (error) {
            toast({
                description: error,
            });
        }
    }, [isLoading, error, isSuccess]);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto">
                    <Plus /> Add Tournament
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[500px]"
                aria-describedby={undefined}
            >
                <DialogHeader>
                    <DialogTitle>Add Tournament Form</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tournament Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="India" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="playing_level"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Playing Level</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {matchLevelData.map(
                                                    (level, index) => (
                                                        <SelectItem
                                                            value={level}
                                                            key={index}
                                                        >
                                                            {level}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="is_male"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tournament Gender</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            value={field.value} // Ensure the value is managed by the field
                                            onValueChange={field.onChange}
                                            className="flex gap-4"
                                            defaultValue={true}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value={true}
                                                    id="team-male"
                                                />
                                                <Label htmlFor="team-male">
                                                    Male
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value={false}
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
                            name="playing_format"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tournament Format</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="format" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {matchFormatData.map(
                                                    (format, index) => (
                                                        <SelectItem
                                                            value={format}
                                                            key={index}
                                                        >
                                                            {format}
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
                            <Button type="submit">
                                {isLoading ? "Wait..." : "Add Tournament"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
