"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mascotteArtvibes } from "@/models/schema";
import { Badge } from "@/components/ui/badge";
import {
  AddsInternals,
  DrawingLoadItems,
  DrawingName,
  DrawingVersion,
  FontsEditorName,
  FontsEditorVersion,
  SystemCover,
  SystemDrawingDiscoverModel,
  SystemDrawingVideoToGif,
  SystemFontImg,
  SystemName,
  SystemNewProjectDrawing,
  SystemPixelImg,
} from "@/public/assets/data/data";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useAppContext } from "@/app/provider/useAppContext";
import HomeImages from "./(components)/images/home-images";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter, useSearchParams } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import HomePost from "./(components)/post/home-post";
import {
  LuArrowRight,
  LuCaseSensitive,
  LuCrop,
  LuFlag,
  LuFolder,
  LuFolderSearch,
  LuFrown,
  LuGalleryHorizontalEnd,
  LuGem,
  LuImage,
  LuInfo,
  LuLayoutPanelLeft,
  LuLoader2,
  LuSmile,
  LuSquareStack,
  LuX,
} from "react-icons/lu";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { FaDrawPolygon } from "react-icons/fa6";
import HomeModel from "./(components)/mangas/home-model";
import { RemoveScroll } from "react-remove-scroll";
import AvatarSVG from "@/public/assets/images/avatar/svgTest";
import Credits from "../(components)/credit/credits";
import { Input } from "@/components/ui/input";
import Bot from "../(components)/bot/bot";

export default function HomeWebsite() {
  useEffect(() => {
    // Sauvegarde de l'état original de overflow du body
    const originalOverflow = document.body.style.overflow;
    // Cache la barre de défilement
    document.body.style.overflow = "hidden";
    // Restaure l'état original de overflow lors du démontage du composant
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const UseAppContext = useAppContext();

  const isNewImage = UseAppContext.isNewImage;

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
  const [selectedValue, setSelectedValue] = useState<string>("artvibe");

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

  const menuItems = [
    {
      title: DrawingName,
      version: DrawingVersion,
      icon: FaDrawPolygon,
      img: SystemNewProjectDrawing.src,
      link: "drawing",
      info: (
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <LuInfo className="w-5 h-5 mr-2" /> info
        </Button>
      ),
      modele: (
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <LuInfo className="w-5 h-5 mr-2" /> info
        </Button>
      ),
    },
  ];

  const toolItems = [
    {
      title: FontsEditorName,
      version: FontsEditorVersion,
      icon: LuCaseSensitive,
      img: SystemFontImg.src,
      link: "#",
      info: (
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <LuInfo className="w-5 h-5 mr-2" /> info
        </Button>
      ),
    },
    {
      title: "Gif editor",
      version: FontsEditorVersion,
      icon: LuGalleryHorizontalEnd,
      img: SystemDrawingVideoToGif.src,
      link: "#",
      info: (
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <LuInfo className="w-5 h-5 mr-2" /> info
        </Button>
      ),
    },
  ];

  return (
    <>
      <RemoveScroll removeScrollBar={true} className="h-screen w-screen">
        <video
          className="w-screen h-screen fixed top-0 object-cover"
          autoPlay={true}
          muted
          loop
        >
          <source
            src="/assets/videos/artvibe-studio/691452_bg.mp4"
            type="video/mp4"
          />
        </video>
        {/*<div
          className="w-screen h-screen fixed top-0 main-bg-animated"
          style={{
            zIndex: -1,
            backgroundImage: `url(${SystemCover.src})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />*/}
        <div className="w-full h-full overflow-hidden flex items-center justify-center">
          <div className="h-[100%] w-[90%] max-w-[1200px]">
            <ScrollArea className="h-[100%] w-[100%] border-none">
              <Card className="p-4 w-[100%] h-[100%] bg-inherit border-none">
                <CardHeader className="bg-black/50 rounded backdrop-blur-sm">
                  <CardTitle className="flex">
                    {SystemName} <FaDrawPolygon className="text-1xl ml-2" />
                  </CardTitle>
                  <CardDescription>
                    Artvibe Studio a été créé dans le but de mettre en
                    valeur mes compétences. C'est un projet conçu pour démontrer
                    mon expertise dans divers domaines créatifs et techniques,
                    en proposant une plateforme qui reflète mes capacités et mon
                    engagement envers l'excellence.
                  </CardDescription>
                </CardHeader>
                <Separator className="my-4" />
                <CardContent>
                  {isNewImage.img && (
                    <>
                      <h1 className="text-2xl font-bold text-start w-full my-10 flex items-center">
                        in progress...{" "}
                        <LuLoader2 className="ml-4 animate-spin" />
                      </h1>
                      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 items-start">
                        <div
                          className="bg-secondary p-6 overflow-hidden rounded-lg shadow-lg group cursor-pointer hover:scale-105 transition-transform main-bg-animated"
                          style={{
                            backgroundImage: `url(${isNewImage.img})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: `${50}% ${50}%`,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            UseAppContext.setDrawingLoad((prevState: any) => ({
                              ...prevState,
                              home: false,
                            }));
                            router.push("/drawing");
                          }}
                        >
                          <div className="drawing-css-bg rounded-full p-4 inline-block mb-4 group-hover:animate-bounce shadow-md">
                            <FaDrawPolygon className="w-8 h-8" />
                          </div>
                          <div
                            className="text-lg font-semibold group-hover:underline decoration-solid decoration-2 underline-offset-4 mb-2 transition-colors duration-300"
                            style={{ textShadow: "#000000 1px 0 10px" }}
                          >
                            {DrawingName}
                          </div>
                          version: {DrawingVersion}
                          <Input
                            type="text"
                            onClick={(e: any) => {
                              e.stopPropagation();
                            }}
                            onBlur={() => {
                              if (isNewImage.fileName === "") {
                                UseAppContext.setNewImage({
                                  ...UseAppContext.isNewImage,
                                  fileName: `${DrawingName}-${Date.now()}`,
                                });
                              }
                            }}
                            onChange={(e) => {
                              UseAppContext.setNewImage({
                                ...UseAppContext.isNewImage,
                                fileName: e.target.value,
                              });
                            }}
                            value={isNewImage.fileName}
                            placeholder={isNewImage.fileName}
                          />
                          <div className="flex gap-2 opacity-30 group-hover:opacity-100 mt-4">
                            <Button
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <LuInfo className="w-5 h-5 mr-2" /> info
                            </Button>
                            <Button
                              variant="outline"
                              title="Double click"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              onDoubleClick={() => {
                                UseAppContext.handleResetDrawing();
                              }}
                            >
                              <LuX className="w-5 h-5 mr-2" /> Close
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Separator className="my-4" />
                    </>
                  )}
                  <h1 className="text-2xl font-bold text-start w-full my-10">
                    Applications
                  </h1>
                  <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 items-start">
                    {menuItems.map((item, index) => (
                      <div
                        key={index}
                        className="bg-secondary p-6 overflow-hidden rounded-lg shadow-lg group cursor-pointer hover:scale-105 transition-transform duration-300"
                        style={{
                          backgroundImage: item.img
                            ? `url(${item.img})`
                            : "none",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: `${50}% ${50}%`,
                        }}
                        onClick={() => {
                          router.push(item.link);
                          UseAppContext.setDrawingLoad((prevState: any) => ({
                            ...prevState,
                            home: true,
                          }));
                        }}
                      >
                        <div className="drawing-css-bg rounded-full p-4 inline-block mb-4 group-hover:animate-bounce shadow-md">
                          {UseAppContext.isDrawingLoad?.load ? (
                            <item.icon className="w-8 h-8" />
                          ) : (
                            <LuLoader2 className="w-8 h-8 animate-spin" />
                          )}
                        </div>
                        <h3
                          className="text-lg font-semibold group-hover:underline decoration-solid decoration-2 underline-offset-4 mb-2 transition-colors duration-300"
                          style={{ textShadow: "#000000 1px 0 10px" }}
                        >
                          {item.title}
                        </h3>
                        <div className="text-[12px]">
                          version: {item.version}
                        </div>

                        <div className="flex gap-2 opacity-30 group-hover:opacity-100 mt-4">
                          {item.info}
                          <Button
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <LuFolderSearch className="w-5 h-5 mr-2" />{" "}
                            components
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <h1 className="text-2xl font-bold text-start w-full my-10">
                    Tools
                  </h1>
                  <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 items-start">
                    {toolItems.map((item, index) => (
                      <div
                        key={index}
                        className="bg-secondary p-6 overflow-hidden rounded-lg shadow-lg group cursor-pointer hover:scale-105 transition-transform duration-300"
                        style={{
                          backgroundImage: item.img
                            ? `url(${item.img})`
                            : "none",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: `${50}% ${50}%`,
                        }}
                        onClick={() => {
                          router.push(item.link);
                          UseAppContext.setDrawingLoad((prevState: any) => ({
                            ...prevState,
                            home: true,
                          }));
                        }}
                      >
                        <div className="drawing-css-bg rounded-full p-4 inline-block mb-4 group-hover:animate-bounce shadow-md">
                          {UseAppContext.isDrawingLoad?.load ? (
                            <item.icon className="w-8 h-8" />
                          ) : (
                            <LuLoader2 className="w-8 h-8 animate-spin" />
                          )}
                        </div>
                        <h3
                          className="text-lg font-semibold group-hover:underline decoration-solid decoration-2 underline-offset-4 mb-2 transition-colors duration-300"
                          style={{ textShadow: "#000000 1px 0 10px" }}
                        >
                          {item.title}
                        </h3>
                        <div className="text-[12px]">
                          version: {item.version}
                        </div>

                        <div className="flex gap-2 opacity-30 group-hover:opacity-100 mt-4">
                          {item.info}
                          <Button
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <LuFolderSearch className="w-5 h-5 mr-2" />{" "}
                            components
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Credits />
                  <Separator className="my-4" />
                  <BentoGrid className="h-max md:auto-rows-max my-10">
                    {DrawingLoadItems.map((item, i) => (
                      <BentoGridItem
                        key={i}
                        //header={item.header}
                        title={item.title}
                        description={item.description}
                        //icon={item.icon}
                        className={"h-max bg-black/90"}
                      />
                    ))}
                  </BentoGrid>
                </CardContent>
              </Card>
            </ScrollArea>
          </div>
        </div>
      </RemoveScroll>
    </>
  );
}
