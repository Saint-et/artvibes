"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { UserMenu } from "./navbar-menu/user-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  FiBell,
  FiBox,
  FiCoffee,
  FiDroplet,
  FiShoppingBag,
  FiLayout,
  FiSearch,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Briefcase, Check } from "lucide-react";
import NavDashboard from "./navbar-menu/nav-dashboard";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Link from "next/link";
import { FormField, FormItem, FormControl, Form } from "@/components/ui/form";
import { FormSchemaSearch } from "@/models/schema";
import { SystemName } from "@/public/assets/data/data";
import { useSearchParams, usePathname } from "next/navigation";
import { FaDrawPolygon } from "react-icons/fa6";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

const words = `Discover our Premium offer and access exclusive
features that will enrich your experience.`;

export default function Navbar() {
  const pagePathname = usePathname().split("/");

  const form = useForm<z.infer<typeof FormSchemaSearch>>({
    resolver: zodResolver(FormSchemaSearch),
    defaultValues: {
      search: "",
    },
  });

  function onSubmitSearch(data: z.infer<typeof FormSchemaSearch>) {
    console.log("Form data:", data);
  }

  if (pagePathname[1] === "drawing") return null;

  return (
    <>
      <div className="flex justify-center fixed w-full h-[50px] border-b-stone-800 border-b-[1px] backdrop-blur top-0 bg-[#000000e6] z-[20000]">
        <div className="flex justify-between items-center w-[90%]">
          <div className="flex items-center">
            <NavDashboard />
            <Link href={"/?type=images"} className="text-2xl font-bold w-max">
              {SystemName}
            </Link>
          </div>
          <div className="flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-gradient-to-r from-fuchsia-600 to-pink-600 mr-2">
                    System <FiBox className="ml-2" />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[300px] lg:w-[400px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md shadow-lg shadow-pink-700"
                            href="/?type=images"
                          >
                            <FiDroplet className="h-6 w-6" />
                            <div className="mb-1 mt-1 text-2xl font-bold bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                              Premium
                            </div>
                            <div className="text-sm leading-tight text-muted-foreground">
                              <TextGenerateEffect words={words} />
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <Button className="hover:scale-95 transition">
                        Workspace <Briefcase className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          window.open(
                            "/drawing",
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }}
                        className="gradient2 hover:scale-95 transition"
                      >
                        Drawing <FaDrawPolygon className="ml-2 h-4 w-4" />
                      </Button>
                      <Button className="gradient5 hover:scale-95 transition">
                        Masterpiece <FiCoffee className="ml-2 h-4 w-4" />
                      </Button>
                      <Button className="gradient4 hover:scale-95 transition">
                        Access pass <FiShoppingBag className="ml-2 h-4 w-4" />
                      </Button>
                      <Button className="hover:scale-95 transition">
                        Artvibes add <FiLayout className="ml-2 h-4 w-4" />
                      </Button>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>

              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="mr-2">
                    <FiBell />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <Card className="md:w-[300px] lg:w-[400px] border-none bg-none">
                      <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>
                          You have 3 unread messages.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        <div>
                          {notifications.map((notification, index) => (
                            <div
                              key={index}
                              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                            >
                              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {notification.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          <Check className="mr-2 h-4 w-4" /> Mark all as read
                        </Button>
                      </CardFooter>
                    </Card>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitSearch)}
                className="flex w-full max-w-sm items-center space-x-2 mr-2"
              >
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem>
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
            <UserMenu />
          </div>
        </div>
      </div>
    </>
  );
}
