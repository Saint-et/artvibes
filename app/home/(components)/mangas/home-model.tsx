"use client";

import {
  Card,
  CardContent,
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
import React, { useRef } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { imagesIllustration, mascotteArtvibes } from "@/models/schema";
import { Badge } from "@/components/ui/badge";
import { SystemNoImg } from "@/public/assets/data/data";
import { useAppContext } from "@/app/provider/useAppContext";
import Link from "next/link";
import {
  FileWarningIcon,
  HeartIcon,
  MessageCircleIcon,
  SendIcon,
  StarIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegImages } from "react-icons/fa";
import { FaEllipsis } from "react-icons/fa6";

export default function HomeModel() {
  const UseAppContext = useAppContext();
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  //onClick={() => {
  //  if (handleViewImage) {
  //    handleViewImage(img.src);
  //  }
  //}}

  //<div className="flex items-center mt-2">
  //                <Badge variant="default" className="mr-1">
  //                  Manga
  //                </Badge>
  //                {false && (
  //                  <Badge variant="default" className="mr-1">
  //                    Image
  //                  </Badge>
  //                )}
  //                <Badge className="nsfw">NSFW</Badge>
  //              </div>

  return (
    <>
      <div className="mb-[100px]">
        <h1 className="text-2xl font-bold text-start w-full pb-10">
          Based on your recent searches
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {imagesIllustration.map((img, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-2">
                <CardTitle>{"test"}</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <Image
                  src={img.src}
                  alt={`Modèle de ${"test"}`}
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover rounded-md"
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full">Sélectionner</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-[100px]">
        <h1 className="text-2xl font-bold text-start w-full pb-10">
          Sailing in search of the rare pearl
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {imagesIllustration.map((img, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-2">
                <CardTitle>{"test"}</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <Image
                  src={img.src}
                  alt={`Modèle de ${"test"}`}
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover rounded-md"
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full">Sélectionner</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
