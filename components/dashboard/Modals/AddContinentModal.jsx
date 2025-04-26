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
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCreateContinentMutation } from "@/redux/features/venue/venueApi";
import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

export default function AddContinentModal() {

    const [createContinent, {isSuccess, isLoading, error}] = useCreateContinentMutation();
    
    const form = useForm({
        defaultValues: {},
    });

    function onSubmit(values) {
        createContinent(values);
    }

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess) {
            toast({
                description: "Continent created successfully!",
                variant: "success",
                duration: 5000,
            });

            redirect("/dashboard/venue/continent");
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
                    <Plus /> Add Continent 
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add Continent Form</DialogTitle>
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
                                    <FormLabel>Continent Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Australia" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Add Continent</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
