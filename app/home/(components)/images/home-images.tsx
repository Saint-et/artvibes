"use client";

import {
  Card,
  CardContent,
  CardDescription,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LuLayoutPanelLeft } from "react-icons/lu";

export default function HomeImages() {
  const UseAppContext = useAppContext();
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  //onClick={() => {
  //  if (handleViewImage) {
  //    handleViewImage(img.src);
  //  }
  //}}

  return (
    <>
      <Card className="p-4 w-[100%] h-[100%] bg-black/50 border-none my-10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex">
            Discover creations & models{" "}
            <LuLayoutPanelLeft className="text-1xl ml-2" />
          </CardTitle>
          <CardDescription>Version: Open</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-md mx-auto mb-12">
            <div className="flex space-x-2 mb-4">
              <Input
                type="text"
                placeholder="Que cherchez-vous ?"
                className="bg-white/10 border-white/20 text-white placeholder-white/50"
              />
              <Button variant="secondary">Rechercher</Button>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Filtrer par catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="portrait">Portrait</SelectItem>
                <SelectItem value="landscape">Landscape</SelectItem>
                <SelectItem value="productAds">ProductAds</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="mb-[100px]">
        <Carousel
          plugins={[plugin.current]}
          opts={{
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {imagesIllustration?.map((img, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="relative overflow-hidden rounded-lg group">
                    <Link
                      href="#"
                      className="absolute inset-0 z-10"
                      prefetch={false}
                    >
                      <span className="sr-only">View</span>
                    </Link>
                    <Image
                      className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                      src={img}
                      alt="logo"
                      width={400}
                      height={300}
                      priority
                      onMouseDown={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 to-transparent p-4 text-white">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={SystemNoImg.src} />
                          <AvatarFallback>AC</AvatarFallback>
                        </Avatar>
                        <span>Pseudo</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <Badge variant="default" className="mr-1">
                          Image
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="mb-[100px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {imagesIllustration.map((img, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg group"
            >
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View</span>
              </Link>
              <Image
                className="object-cover w-full h-60 transition-transform duration-300 ease-in-out group-hover:scale-105"
                src={img}
                alt="logo"
                width={400}
                height={300}
                priority
                onMouseDown={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 to-transparent p-4 text-white">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={SystemNoImg.src} />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <span>Pseudo</span>
                </div>
                <div className="flex items-center mt-2">
                  <Badge variant="default" className="mr-1">
                    Image
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
