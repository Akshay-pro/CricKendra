"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import MultiSelect from "@/components/MultiSelect";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

export default function AddPlayer() {
    const [selectedRoleItems, setSelectedRoleItems] = useState([]);
    const [date, setDate] = useState();
    const form = useForm({
        defaultValues: {
            playerName: "",
        },
    });

    function onSubmit(values) {
        console.log(values);
    }

    return (
        <div>
            <h2 className="font-bold text-center mb-4">Add Player Form</h2>
            <Tabs defaultValue="step1" className="m-auto w-[800px]">
                <TabsList>
                    <TabsTrigger value="step1" className="w-60">
                        Step1
                    </TabsTrigger>
                    <TabsTrigger value="step2" className="w-60">
                        Step2
                    </TabsTrigger>
                    <TabsTrigger value="step3" className="w-60">
                        Step3
                    </TabsTrigger>
                </TabsList>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <TabsContent
                            value="step1"
                            className="ml-4 mt-4 max-w-[720px]"
                        >
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="playerName"
                                        className="col-span-12"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Player Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Kohli"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="playerFullName"
                                        className="col-span-12"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Player Full Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Virat Kohli"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="playingRole"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Playing Role
                                                </FormLabel>
                                                <FormControl>
                                                    {/* <Input
                                                        placeholder="Role"
                                                        {...field}
                                                    /> */}
                                                    <MultiSelect
                                                        placeholder="Role"
                                                        options={[
                                                            {
                                                                label: "Wicketkeeper-batter",
                                                                value: "Wicketkeeper-batter",
                                                            },
                                                            {
                                                                label: "Middle-order batter",
                                                                value: "Middle-order batter",
                                                            },
                                                            {
                                                                label: "All-rounder",
                                                                value: "All-rounder",
                                                            },
                                                            {
                                                                label: "Top-order Batter",
                                                                value: "Top-order Batter",
                                                            },
                                                        ]}
                                                        selectedOptions={
                                                            selectedRoleItems
                                                        }
                                                        setSelectedOptions={
                                                            setSelectedRoleItems
                                                        }
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="nationality"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Nationality
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Indian.."
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="teamGender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Player Gender
                                                </FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        {...field}
                                                        value={field.value}
                                                        className="flex gap-4 mt-2"
                                                        onChange={(e) => field.onChange(e.target.value)} 
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem
                                                                value="true"
                                                                id="player-male"
                                                            />
                                                            <Label htmlFor="player-male">
                                                                Male
                                                            </Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem
                                                                value="false"
                                                                id="player-female"
                                                            />
                                                            <Label htmlFor="player-female">
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
                                        name="dob"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Date of Birth
                                                </FormLabel>
                                                <FormControl>
                                                    <Popover {...field}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant={
                                                                    "outline"
                                                                }
                                                                className={cn(
                                                                    "w-full justify-start text-left font-normal",
                                                                    !date &&
                                                                        "text-muted-foreground"
                                                                )}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {date ? (
                                                                    format(
                                                                        date,
                                                                        "PPP"
                                                                    )
                                                                ) : (
                                                                    <span>
                                                                        Pick a
                                                                        date
                                                                    </span>
                                                                )}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={date}
                                                                onSelect={
                                                                    setDate
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="playerImage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Player Image
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="player-image"
                                                        type="file"
                                                        // onChange={handleFileChange}
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
                                        name="biography"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Biography</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Write Biography..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent
                            value="step2"
                            className="ml-4 mt-4 w-[720px]"
                        >
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="bowlingStyle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bowling Style</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Bowling Style"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="primaryBowlingStyle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Primary Bowling Style
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Primary Bowling"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="playerStyle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Player Style</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    {...field}
                                                    className="flex gap-4 mt-2"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem
                                                            value="true"
                                                            id="player-rhb"
                                                        />
                                                        <Label htmlFor="player-rhb">
                                                            RHB
                                                        </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem
                                                            value="false"
                                                            id="player-lhb"
                                                        />
                                                        <Label htmlFor="player-lhb">
                                                            LHB
                                                        </Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="teamRepresentation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Represented Team
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Team Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent
                            value="step3"
                            className="ml-4 mt-4 w-[720px]"
                        >
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="bg-white dark:bg-gray-700 border rounded-lg shadow-sm shadow-neutral-200 dark:shadow-none px-4 !no-underline font-bold">
                                        Test Stats
                                    </AccordionTrigger>
                                    <AccordionContent className="ml-2 mt-4 space-y-4">
                                        <div className="grid grid-cols-3 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="matchesPlayed"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Matches Played
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Matches Played"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="debutMatchId"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Debut Match Id
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Debut Match Id"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="lastMatchId"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Last Match Id
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Last Match Id"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <Accordion
                                            type="single"
                                            collapsible
                                            className="space-y-4"
                                        >
                                            <AccordionItem value="item-1">
                                                <AccordionTrigger className="bg-white dark:bg-gray-700 border rounded-lg shadow-sm shadow-neutral-200 dark:shadow-none px-4 !no-underline font-bold">
                                                    Test Batting Stats
                                                </AccordionTrigger>
                                                <AccordionContent className="ml-2 mt-4 space-y-4">
                                                    <div className="ml-2 mt-4 space-y-4">
                                                        <div className="grid grid-cols-3 gap-4">
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="nnningsBatted"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Innings
                                                                            Batted
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Innings Batted"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="runsScored"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Runs
                                                                            Scored
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Runs Scored"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="battingDismissals"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Batting
                                                                            Dismissals
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Batting Dismissals"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-4">
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="ballsFaced"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Balls
                                                                            Faced
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Balls Faced"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="foursScored"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Fours
                                                                            Scored
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Fours Scored"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="sixesScored"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Sixes
                                                                            Scored
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Sixes Scored"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-4">
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="centuriesScored"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Centuries
                                                                            Scored
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Centuries Scored"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="fiftiesScored"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Fifties
                                                                            Scored
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Fifties Scored"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="highestScore"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Highest
                                                                            Score
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Highest Score"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <FormField
                                                            control={
                                                                form.control
                                                            }
                                                            name="isHighestNotOut"
                                                            render={({
                                                                field,
                                                            }) => (
                                                                <FormItem>
                                                                    <FormLabel>
                                                                        Is
                                                                        Highest
                                                                        Not Out
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="Is Highest Not Out"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                            <AccordionItem value="item-2">
                                                <AccordionTrigger className="bg-white dark:bg-gray-700 border rounded-lg shadow-sm shadow-neutral-200 dark:shadow-none px-4 !no-underline font-bold">
                                                    Test Bowling Stats
                                                </AccordionTrigger>
                                                <AccordionContent className="ml-2 mt-4 space-y-4">
                                                    <div className="ml-2 mt-4 space-y-4">
                                                        <div className="grid grid-cols-3 gap-4">
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="inningsBowled"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Innings
                                                                            Bowled
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Innings Bowled"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="runsConceded"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Runs
                                                                            Conceded
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Runs Conceded"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="wicketsTaken"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Wickets
                                                                            Taken
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Wickets Taken"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-4">
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="ballsBowled"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Balls
                                                                            Bowled
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Balls Bowled"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="foursConceded"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Fours
                                                                            Conceded
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Fours Conceded"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="sixesConceded"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Sixes
                                                                            Conceded
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Sixes Conceded"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-4">
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="fourWktHauls"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Four
                                                                            Wkt
                                                                            Hauls
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Four Wkt Hauls"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="fiveWktHauls"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Five
                                                                            Wkt
                                                                            Hauls
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Five Wkt Hauls"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="tenWktHauls"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Ten
                                                                            Wkt
                                                                            Hauls
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Ten Wkt Hauls"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-4">
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="bestInnFigRuns"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Best
                                                                            Inn
                                                                            Fig
                                                                            Runs
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Best Inn Fig Runs"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="bestInnFigWkts"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Best
                                                                            Inn
                                                                            Fig
                                                                            Wkts
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Best Inn Fig Wkts"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="bestMatchFigRuns"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <FormLabel>
                                                                            Best
                                                                            Match
                                                                            FigRuns
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Best Match FigRuns"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        <FormField
                                                            control={
                                                                form.control
                                                            }
                                                            name="bestMatchFigWkts"
                                                            render={({
                                                                field,
                                                            }) => (
                                                                <FormItem>
                                                                    <FormLabel>
                                                                        Best
                                                                        Match
                                                                        FigWkts
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="Best Match FigRuns"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </TabsContent>

                        <div className="text-left mt-10 ml-4 w-[200px]">
                            <Button type="submit" className="w-full">
                                Add Player
                            </Button>
                        </div>
                    </form>
                </Form>
            </Tabs>
        </div>
    );
}
