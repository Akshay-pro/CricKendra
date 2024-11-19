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

export default function AddGroundModal() {

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
                    <Plus /> Add Ground 
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add Ground Form</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="groundName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ground Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ekana.." {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="cityId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Lucknow" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Add Ground</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
