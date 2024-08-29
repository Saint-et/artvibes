"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { imagesIllustration, mascotteArtvibes } from "@/models/schema";
import { Badge } from "@/components/ui/badge";
import {
  AddsInternals,
  SystemAddsDrawingMin,
  SystemAddsMin,
  SystemAddsPremiumMin,
  SystemCoverImg,
  SystemLogo,
  SystemName,
  SystemNoImg,
} from "@/public/assets/data/data";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { FiLayout, FiSmile } from "react-icons/fi";
import { useAppContext } from "@/app/provider/useAppContext";
import Link from "next/link";
import HomeImages from "./(components)/images/home-images";
import HomeManga from "./(components)/mangas/home-manga";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter, useSearchParams } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import HomePost from "./(components)/post/home-post";

export default function HomeWebsite() {
  const UseAppContext = useAppContext();

  //onClick={() => {
  //  if (handleViewImage) {
  //    handleViewImage(img.src);
  //  }
  //}}
  //<div>User Ads</div>
  //<div>Sponsored advertising</div>;

  const words = `Welcome to our website! We are delighted to have you among the we.
  If you have any questions, suggestions, or if you encounter a
  problem, feel free to leave feedback. We're here to help you and
  improve your experience. Thank you for visiting!`;

  // Définir l'état pour suivre la valeur sélectionnée
  const [selectedValue, setSelectedValue] = useState<string>("images");

  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  // Gestionnaire d'événements pour mettre à jour la valeur sélectionnée
  const handleChange = (value: string) => {
    router.push(`?type=${value}`);
  };

  useEffect(() => {
    if (type) {
      setSelectedValue(type);
    }
  }, [type]);

  return (
    <>
      <div className="flex items-center pt-[60px] flex-col mb-[100px]">
        <div className="w-[90%] flex justify-center items-center max-w-max h-max flex-col">
          <div className="flex justify-center items-center w-[100%] flex-col">
            <div className="w-max flex items-center mt-5 flex-col p-3">
              <Avatar className="w-[100px] h-[100px] shadow-lg shadow-pink-700">
                <AvatarImage
                  src={mascotteArtvibes.src}
                  alt="@shadcn"
                  onMouseDown={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Avatar>
              <div className="font-bold z-10">ArtVibes</div>
              <Badge className="bg-gradient-to-r from-fuchsia-600 to-pink-600">
                ArtVibes
              </Badge>
            </div>

            <div className="leading-7 [&:not(:first-child)]:mt-6 w-[100%] max-w-[1200px] text-center">
              <TextGenerateEffect words={words} />
            </div>
            <div className="flex justify-center m-1">
              <Button
                type="button"
                variant={"link"}
                className="text-white mr-1"
              >
                I have a suggestion
                <FiSmile className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-center pt-[10px] 2xl:justify-center">
        <Card className="w-[90%] max-w-[250px] h-[80vh] sticky top-20 m-4 hidden 2xl:flex">
          <ScrollArea className=" h-full w-full">
            <CardHeader>
              <CardTitle className="text-1xl">Home</CardTitle>
              <CardDescription>Display preference</CardDescription>
            </CardHeader>
            {type && (
              <CardContent>
                <RadioGroup defaultValue={type} onValueChange={handleChange}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="images" id="r21" />
                    <Label htmlFor="r21">Images</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manga" id="r22" />
                    <Label htmlFor="r22">Manga</Label>
                  </div>

                  <Separator className="my-2" orientation="horizontal" />

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="events" id="r23" />
                    <Label htmlFor="r23">Events</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="posts" id="r24" />
                    <Label htmlFor="r24">Posts</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            )}

            <Separator className="my-2" orientation="horizontal" />

            <CardContent>
              <div className="space-y-2">
                <div className="text-[14px] inline-block rounded-lg gradient5 px-3 py-1 font-medium text-primary-foreground">
                  Special Event
                </div>
                <h2 className="text-1xl font-bold">
                  Join Alpha Discovery and Earn Credits for Free! 🌟
                </h2>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                  <p className="text-[14px] text-muted-foreground">
                    End: 15/07/2024
                  </p>
                </div>
              </div>
              <p className="text-[14px] text-muted-foreground">
                We're excited to invite you to participate in our exclusive
                Alpha Phase! To celebrate this exciting first step, we are
                offering all new users full access to our image editing app. By
                creating an account, you will unlock 100 free credits to use on
                our platform!
              </p>
            </CardContent>
          </ScrollArea>
        </Card>

        <div className="w-[90%] max-w-[1200px] 2xl:max-w-[950px] flex justify-center items-center h-max flex-col">
          <Tabs
            defaultValue={"images"}
            value={selectedValue}
            className="w-full"
          >
            <TabsContent value="images">
              <HomeImages />
            </TabsContent>
            <TabsContent value="manga">
              <HomeManga />
            </TabsContent>
            <TabsContent value="posts">
              <HomePost />
            </TabsContent>
          </Tabs>
        </div>

        <Card className="w-[100%] max-w-[250px] min-w-[250px] h-full overflow-hidden sticky top-20 m-4 hidden 2xl:flex flex-col">
          {AddsInternals?.map((promise, index) => (
            <div key={index} className="relative w-400 min-h-[240px]">
              <div className="text-[14px]">{promise.type}</div>
              <img
                src={promise.img.src}
                alt="Annonce"
                width={400}
                height={240}
                className="w-full h-auto object-cover"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 hover:opacity-100 transition">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button className="p-2 h-8">Details ...</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-full max-w-md rounded-lg shadow-lg">
                    <div className="grid grid-cols-3 gap-2">
                      <img
                        src={promise.img.src}
                        width={200}
                        height={150}
                        alt="Annonce 1"
                        className="rounded-l-lg object-cover"
                      />
                      <img
                        src={promise.img.src}
                        width={200}
                        height={150}
                        alt="Annonce 2"
                        className="object-cover"
                      />
                      <img
                        src={promise.img.src}
                        width={200}
                        height={150}
                        alt="Annonce 3"
                        className="rounded-r-lg object-cover"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-2 mt-2">
                      <div>
                        {promise.titre && (
                          <h3 className="text-xl font-bold mb-2">
                            {promise.titre}
                          </h3>
                        )}
                        {promise.description && (
                          <p className="text-muted-foreground">
                            {promise.description}
                          </p>
                        )}
                      </div>

                      <Button className="p-2 h-8 mt-2">Open</Button>
                      <Button className="p-2 h-8">Contact the owner</Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <Button className="p-2 h-8">Open</Button>
                <Button className="p-2 h-8">Contact the owner</Button>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}
