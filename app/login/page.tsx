"use client";

import InputForm from "./components/login/login";
import Signup from "./components/signup/signup";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Illustration from "../../public/assets/images/2151134332.jpg";
import Illustration2 from "../../public/assets/images/anime-style-character-space.jpg";
import Illustration3 from "../../public/assets/images/2151134176.jpg";
import Illustration4 from "../../public/assets/images/2151134327.jpg";
import Illustration5 from "../../public/assets/images/2151134257.jpg";
import Illustration6 from "../../public/assets/images/2151134064.jpg";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const images = [
  Illustration,
  Illustration2,
  Illustration3,
  Illustration4,
  Illustration5,
  Illustration6,
];

export default function Log_page() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  return (
    <>
      <div className="flex items-center pt-[10px] flex-col">
        <div className="flex justify-center items-center max-w-max h-max flex-col md:flex-row">
          <div className="flex justify-center items-center flex-col w-[90%] max-w-[500px] p-3">
            <h1 className="text-8xl font-bold text-center mb-10 bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              Login to Artvibes
            </h1>
            <InputForm />
            <Signup />
            <Link href="/" className="w-2/3">
              <Button
                className="w-[100%] bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:scale-110 transition mt-3"
                type="button"
              >
                Visite Artvibes
              </Button>
            </Link>
          </div>
          <div className="flex justify-center items-center max-w-max h-max flex-col">
          <Carousel
            plugins={[plugin.current]}
            className="w-[100%] max-w-[800px]"
          >
            <CarouselContent>
              {images?.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="bg-transparent border-none">
                      <CardContent className="flex aspect-square items-center justify-center p-1 bg-transparent">
                        <Image
                          className="w-[100%] rounded-md"
                          src={img}
                          alt="logo"
                          priority
                          onMouseDown={(e) => e.preventDefault()}
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="flex justify-center w-[100%] pb-[50px]">
        <p className="leading-7 [&:not(:first-child)]:mt-6 w-[100%] max-w-[1200px] text-center">
          Welcome to our platform dedicated to art and manga enthusiasts !
          Whether you are a talented creator or a lover of works unique, immerse
          yourself in a universe where each poster tells the story of a history.
          Explore, share and buy original creations from our inspired artists
          and individuals. Turn your walls into Living art galleries with
          captivating posters and manga Enveloping. Join us and let your
          imagination run wild !
        </p>
      </div>
      </div>
        </div>
      </div>

    </>
  );
}
