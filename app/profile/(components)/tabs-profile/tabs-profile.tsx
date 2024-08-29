"use client";

import { FiMaximize, FiSearch } from "react-icons/fi";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormControl,
  Form,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  FormSchemaSearch,
  FormSchemaText,
  mascotteArtvibes,
} from "@/models/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsProfile() {
  const form = useForm<z.infer<typeof FormSchemaSearch>>({
    resolver: zodResolver(FormSchemaSearch),
    defaultValues: {
      search: "",
    },
  });

  function onSubmitSearch(data: z.infer<typeof FormSchemaSearch>) {
    console.log("Form data:", data);
  }

  const formText = useForm<z.infer<typeof FormSchemaText>>({
    resolver: zodResolver(FormSchemaText),
    defaultValues: {
      text: "",
    },
  });

  function onSubmitText(data: z.infer<typeof FormSchemaText>) {
    console.log("Form data:", data.text);
  }

  const event =
    "As an event creator, you have the opportunity to give your attendees rewards to make every moment even more special.";

  const people = [
    {
      id: 1,
      name: "John Doe",
      image: mascotteArtvibes.src,
    },
    {
      id: 2,
      name: "Robert Johnson",
      image: mascotteArtvibes.src,
    },
    {
      id: 3,
      name: "Jane Smith",
      image: mascotteArtvibes.src,
    },
    {
      id: 4,
      name: "Emily Davis",
      image: mascotteArtvibes.src,
    },
    {
      id: 5,
      name: "Tyler Durden",
      image: mascotteArtvibes.src,
    },
    {
      id: 6,
      name: "Dora",
      image: mascotteArtvibes.src,
    },
  ];


  return (
    <>
      <Tabs defaultValue="followers" className="max-w-[1200px] w-[90%]">
        <TabsList>
          <TabsTrigger value="followers">Followers</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="special-subscriber">
            Special Subscriber
          </TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>
        <TabsContent value="followers">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Followers</CardTitle>
              <CardDescription>
                Find all the accounts that follow you. {`1k`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-row items-center mb-5 w-full">
                <AnimatedTooltip items={people} />
              </div>
              <Button className="ml-5 text-white" variant="link">
                See more ...
              </Button>
            </CardContent>
            <CardFooter>
              <Button>Show subscribers</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                Current Event
                <Button className="ml-5" variant="outline" size="icon">
                  <FiMaximize className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                Create an event for your community.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="leading-7 [&:not(:first-child)]:mt-6 w-[100%] max-w-[1200px] text-center z-10">
                {event}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-wrap">
                <Button className="mr-1 rounded-full mt-1">
                  Create a new event
                </Button>
                <Button
                  variant={"destructive"}
                  className="mr-1 rounded-full mt-1"
                >
                  Cancel event
                </Button>
                <Button className="rounded-full mt-1">Participate</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="special-subscriber">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                View the latest answers
                <Button className="ml-5" variant="outline" size="icon">
                  <FiMaximize className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                Some answers can be pinned to avoid repetitive questions, pinned
                answers will remain anonymous.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmitSearch)}
                  className="flex items-center space-x-2 mr-2"
                >
                  <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            className="border-none"
                            id="search"
                            type="search"
                            {...field}
                            placeholder="Search ..."
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">
                    <FiSearch />
                  </Button>
                </form>
              </Form>
              <div className="space-y-6">
                <h2 className="text-1xl font-bold">Suggestions</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {[1, 2, 3, 4]?.map((_, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-2 hover:bg-stone-900 transition-colors cursor-pointer"
                      title="All questions here ?"
                    >
                      <div className="truncate h-6 font-medium break-words transition">
                        All questions here ?
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                Contact me
                <Button className="ml-5" variant="outline" size="icon">
                  <FiMaximize className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                If you have any questions, you can ask them directly here, the
                response time will depend on the account owner.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Form {...formText}>
                <form
                  onSubmit={formText.handleSubmit(onSubmitText)}
                  className="w-full space-y-6"
                >
                  <FormField
                    control={formText.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
