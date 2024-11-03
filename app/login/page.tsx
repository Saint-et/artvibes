"use client";

import InputForm from "./components/login/login";
import Signup from "./components/signup/signup";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { LoginItems, SystemCarouselImg } from "@/public/assets/data/data";
import { FlipWords } from "@/components/ui/flip-words";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Log_page() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  const words = ["Welcome", "Login", "More", "Go"];

  const [isAlertEventOpen, setAlertEventOpen] = useState<boolean>(false);

  useEffect(() => {
    setAlertEventOpen(true);
  }, []);
  const router = useRouter();

  const handleVisite = () => {
    router.push("/?type=images");
  };

  return (
    <>
      <AlertDialog open={isAlertEventOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              🌟 Join Alpha Discovery and Earn Credits for Free! 🌟
            </AlertDialogTitle>
            <AlertDialogDescription className="grid gap-4">
              <div className="text-[14px] w-max inline-block rounded-lg gradient5 px-3 py-1 font-medium text-primary-foreground">
                Special Event
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                  <p className="text-[16px] text-muted-foreground">
                    End: 15/07/2024
                  </p>
                </div>
              </div>
              <p className="text-[16px] text-muted-foreground">
                We're excited to invite you to participate in our exclusive
                Alpha Phase! To celebrate this exciting first step, we are
                offering all new users full access to our image editing app. By
                creating an account, you will unlock 100 free credits to use on
                our platform!
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setAlertEventOpen(false);
              }}
            >
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex items-center pt-[60px] flex-col">
        <div className="flex justify-center items-center max-w-max h-max flex-col md:flex-row">
          <div className="flex justify-start items-center flex-col w-[90%] max-w-[500px] p-3">
            <div className="text-4xl md:text-6xl font-bold text-center mb-10 bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              <FlipWords className="text-white w-max poiretOne" words={words} />
              <br />
              to Artvibes
            </div>
            <InputForm />
            <Signup />
            <Button
              className="w-2/3 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:scale-95 transition mt-3"
              type="button"
              onClick={handleVisite}
            >
              Visite Artvibes
            </Button>
          </div>
          <div className="flex justify-center items-center max-w-max h-max flex-col">
            <Carousel
              plugins={[plugin.current]}
              className="w-[100%] max-w-[800px]"
              opts={{
                loop: true,
              }}
            >
              <CarouselContent>
                {SystemCarouselImg?.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card className="bg-transparent border-none">
                        <CardContent className="flex aspect-square items-center justify-center p-1 bg-transparent">
                          <Image
                            className="w-[100%] rounded-md shadow-lg shadow-fuchsia-700"
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
          </div>
        </div>

        <BentoGrid className="w-[90%] h-max md:auto-rows-max">
          {LoginItems.map((item, i) => (
            <BentoGridItem
              key={i}
              header={item.header}
              title={item.title}
              description={item.description}
              //icon={item.icon}
              className={"h-max"}
            />
          ))}
        </BentoGrid>
      </div>
    </>
  );
}
