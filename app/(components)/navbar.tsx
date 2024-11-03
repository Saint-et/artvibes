"use client";

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
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { BarChart, Bell, Briefcase, Check, Settings, User } from "lucide-react";
import NavDashboard from "./navbar-menu/nav-dashboard";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Link from "next/link";
import { SystemName } from "@/public/assets/data/data";
import { usePathname } from "next/navigation";
import { FaDrawPolygon } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  if (pagePathname[1] === "drawing") return null;

  return (
    <nav className=" fixed top-0 z-[200000] w-full bg-black/20 text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mon Application</h1>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Profil</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Voir le profil</DropdownMenuItem>
              <DropdownMenuItem>Déconnexion</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Nouveau message</DropdownMenuItem>
              <DropdownMenuItem>Mise à jour système</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Réglages</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Réglages</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Préférences</DropdownMenuItem>
              <DropdownMenuItem>Sécurité</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <BarChart className="h-5 w-5" />
                <span className="sr-only">Rapports</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Rapports</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Rapport mensuel</DropdownMenuItem>
              <DropdownMenuItem>Statistiques</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      <div className="flex justify-center w-full h-[50px] fixed top-0 z-[20000]">
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
            <UserMenu />
          </div>
        </div>
      </div>
    </>
  );
}
