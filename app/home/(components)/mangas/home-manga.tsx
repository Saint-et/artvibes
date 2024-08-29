"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function HomeManga() {
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
          Discovery of the moment
        </h1>

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
                <div
                  key={index}
                  className="bg-black rounded-lg shadow-md overflow-hidden"
                >
                  <Link href="#" className="block" prefetch={false}>
                    <Image
                      className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
                      src={img}
                      alt="logo"
                      width={400}
                      height={300}
                      priority
                      onMouseDown={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </Link>
                  <div className="p-4">
                    <div className="flex justify-between">
                      <h2 className="text-1xl font-semibold mb-2">
                        <Link href="#" prefetch={false}>
                          Title
                        </Link>
                      </h2>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={SystemNoImg.src} />
                          <AvatarFallback>AC</AvatarFallback>
                        </Avatar>
                        <span>Pseudo</span>
                      </div>
                    </div>
                    <div className="flex items-center mt-2">
                      <Badge variant="default" className="mr-1">
                        Manga
                      </Badge>
                      <Badge className="nsfw">NSFW</Badge>
                    </div>
                    <p className="text-[14px] text-gray-500 line-clamp-3">
                      Brève description du post. Ceci est un exemple de texte
                      qui peut être affiché dans la vignette.
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="mb-[100px]">
        <h1 className="text-2xl font-bold text-start w-full pb-10">
          Based on your recent searches
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {imagesIllustration.map((img, index) => (
            <div
              key={index}
              className="bg-black rounded-lg shadow-md overflow-hidden"
            >
              <Link href="#" className="block" prefetch={false}>
                <Image
                  className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
                  src={img}
                  alt="logo"
                  width={400}
                  height={300}
                  priority
                  onMouseDown={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Link>
              <div className="p-4">
                <div className="flex justify-between">
                  <h2 className="text-1xl font-semibold mb-2">
                    <Link href="#" prefetch={false}>
                      Title
                    </Link>
                  </h2>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={SystemNoImg.src} />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <span>Pseudo</span>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <Badge variant="default" className="mr-1">
                    Manga
                  </Badge>
                  <Badge className="nsfw">NSFW</Badge>
                </div>
                <p className="text-[14px] text-gray-500 line-clamp-3">
                  Brève description du post. Ceci est un exemple de texte qui
                  peut être affiché dans la vignette.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-[100px]">
        <h1 className="text-2xl font-bold text-start w-full pb-10">
          Sailing in search of the rare pearl
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {imagesIllustration.map((img, index) => (
            <div
              key={index}
              className="bg-black rounded-lg shadow-md overflow-hidden"
            >
              <Link href="#" className="block" prefetch={false}>
                <Image
                  className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
                  src={img}
                  alt="logo"
                  width={400}
                  height={300}
                  priority
                  onMouseDown={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Link>
              <div className="p-4">
                <div className="flex justify-between">
                  <h2 className="text-1xl font-semibold mb-2">
                    <Link href="#" prefetch={false}>
                      Title
                    </Link>
                  </h2>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={SystemNoImg.src} />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <span>Pseudo</span>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <Badge variant="default" className="mr-1">
                    Manga
                  </Badge>
                  <Badge className="nsfw">NSFW</Badge>
                </div>
                <p className="text-[14px] text-gray-500 line-clamp-3">
                  Brève description du post. Ceci est un exemple de texte qui
                  peut être affiché dans la vignette.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
