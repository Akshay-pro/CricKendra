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

export default function AddTourModal() {

    const form = useForm({
        defaultValues: {},
    });

    function onSubmit(values) {
        console.log(values);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto">
                    <Plus /> Add Tour 
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add Tour Form</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="touringTeamId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tourning Team Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="India" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="hostNationId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Host Nation Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Australia" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="seasonName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Season Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="2025" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Add Tour</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
