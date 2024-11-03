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
import { Separator } from "@/components/ui/separator";
import { FaEllipsis, FaRegImages } from "react-icons/fa6";
import {
  HeartIcon,
  MessageCircleIcon,
  SendIcon,
  BookmarkIcon,
  FileWarningIcon,
  MoveHorizontalIcon,
  StarIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function HomePost() {
  const UseAppContext = useAppContext();
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  //onClick={() => {
  //  if (handleViewImage) {
  //    handleViewImage(img.src);
  //  }
  //}}

  //<div className="flex items-center mt-2">
  //  <Badge variant="default" className="mr-1">
  //    Manga
  //  </Badge>
  //  {false && (
  //    <Badge variant="default" className="mr-1">
  //      Image
  //    </Badge>
  //  )}
  //  <Badge className="nsfw">NSFW</Badge>
  //</div>

  return (
    <>
      <div className="mb-[100px]">
        <h1 className="text-2xl font-bold text-start w-full pb-10">
          All posts
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {imagesIllustration?.map((img, index) => (
            <Card key={index} className="w-full">
              <CardHeader className="p-2 pt-4">
                <div className="flex items-center text-muted-foreground text-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={SystemNoImg.src} />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <span>Pseudo</span>
                  </div>
                  <Separator orientation="vertical" className="mx-4" />
                  <span>24 juin 2023</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 ml-auto rounded-full"
                      >
                        <FaEllipsis className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <StarIcon className="w-4 h-4 mr-2" />
                        Ajouter aux favoris
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <FileWarningIcon className="w-4 h-4 mr-2" />
                        Signaler
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative overflow-hidden w-full mx-auto group">
                  <img
                    src={img.src}
                    alt="Cover image"
                    width={1200}
                    height={600}
                    className="object-cover w-full aspect-[2/1] transition group-hover:scale-105 cursor-pointer"
                  />
                  <div className="absolute flex items-center top-4 right-4 bg-primary px-2 py-1 rounded-md text-primary-foreground text-sm font-medium">
                    <FaRegImages className="mr-2" /> 4
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Button
                      className="text-2xl text-white font-bold p-0 h-2"
                      variant={"link"}
                    >
                      Découvrez les merveilles de la nature
                    </Button>
                  </div>
                  <div className="flex mt-2">
                    <Badge className="post-badge mr-1">Post</Badge>
                    <Badge className="nsfw">NSFW</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    La nature est une source inépuisable de beauté et de
                    merveilles. Des paysages à couper le souffle aux créatures
                    fascinantes, elle nous offre un spectacle sans cesse
                    renouvelé. Plongez avec nous dans l'exploration de ces
                    trésors naturels, et laissez-vous émerveiller par la
                    diversité et la richesse de notre monde.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-2 pb-4">
                <div className="flex items-center w-full gap-1">
                  <Button className="rounded-full" variant="ghost" size="icon">
                    <HeartIcon className="w-4 h-4" />
                    <span className="sr-only">J'aime</span>
                  </Button>
                  <div className="text-sm text-muted-foreground">10 likes</div>
                  <Button className="rounded-full" variant="ghost" size="icon">
                    <MessageCircleIcon className="w-4 h-4" />
                    <span className="sr-only">Commenter</span>
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    5 comments
                  </div>
                  <Button className="rounded-full" variant="ghost" size="icon">
                    <SendIcon className="w-4 h-4" />
                    <span className="sr-only">Partager</span>
                  </Button>
                  <div className="text-sm text-muted-foreground">10 shares</div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
