"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Illustration from "../public/assets/images/2151134332.jpg";
import Illustration2 from "../public/assets/images/anime-style-character-space.jpg";
import Illustration3 from "../public/assets/images/2151134176.jpg";
import Illustration4 from "../public/assets/images/2151134327.jpg";
import Illustration5 from "../public/assets/images/2151134257.jpg";
import Illustration6 from "../public/assets/images/2151134064.jpg";
import React, { useRef } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const images = [
  Illustration,
  Illustration2,
  Illustration3,
  Illustration4,
  Illustration5,
  Illustration6,
];

export default function Home() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  return (
    <>
      <div className="flex items-center pt-[10px] flex-col">
        <div className="w-[90%] flex justify-center items-center max-w-max h-max flex-col">
          <h1 className="text-3xl md:text-6xl font-bold text-center pb-10 bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
            Top of the moment:
          </h1>
          <Carousel
            plugins={[plugin.current]}
            className="w-[100%] max-w-[800px]"
          >
            <CarouselContent>
              {images?.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="bg-transparent border-stone-800 border-[1px]">
                      <CardContent className="flex aspect-square items-center justify-center p-1 bg-transparent flex-col text-white">
                        <h1 className="text-2xl font-bold text-center mb-10">
                          Name
                        </h1>
                        <Image
                          className="w-[80%] rounded-md"
                          src={img}
                          alt="logo"
                          priority
                          onMouseDown={(e) => e.preventDefault()}
                          onContextMenu={(e) => e.preventDefault()}
                        />

                        <div className="flex justify-center items-center w-[100%] flex-col">
                          <p className="leading-7 [&:not(:first-child)]:mt-6 w-[100%] max-w-[1200px] text-center">
                            Welcome to our platform dedicated to art and manga
                            enthusiasts ! Whether you are a talented creator or
                            a lover of works unique, immerse yourself in a
                            universe where each poster tells the story of a
                            history. Explore, share and buy original creations
                            from our inspired artists and individuals. Turn your
                            walls into Living art galleries with captivating
                            posters and manga Enveloping. Join us and let your
                            imagination run wild !
                          </p>

                          <div className="w-max flex items-center mt-5 flex-col p-3 hover:scale-110 transition cursor-pointer">
                            <Avatar>
                              <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                              />
                            </Avatar>
                            <div className="font-bold">Pseudo</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <div className="flex items-center pt-[10px] flex-col">
        <div className="flex justify-center items-center max-w-max h-max flex-col">
          <h1 className="text-3xl md:text-6xl font-bold text-center pb-10 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            That might interest you:
          </h1>

          <div className="w-[90%] max-w-[1800px] grid grid-cols-2 md:grid-cols-5 gap-4 ">
            {Array.from({ length: 10 }).map((_, index) => (
              <div className="flex aspect-square items-center justify-center p-1 bg-transparent flex-col text-white">
                <h1 className="text-2xl font-bold text-center mb-2">
                  Name {index + 1}
                </h1>
                <Image
                  className="rounded-md hover:scale-110 transition cursor-pointer"
                  src={Illustration}
                  alt="logo"
                  priority
                  onMouseDown={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            ))}
          </div>
          <div className="w-[100%] flex justify-center">
            <Button
              className="w-[90%] max-w-[500px] bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-110 transition mt-3"
              type="button"
            >
              See more ...
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
