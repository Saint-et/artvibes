"use client";

import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SystemCoverImg, SystemNoImg } from "@/public/assets/data/data";
import Color from "color-thief-react";
import EditProfile from "../(components)/edit-profile";
import TabsProfile from "../(components)/tabs-profile/tabs-profile";
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
import { FormSchemaText, imagesIllustration } from "@/models/schema";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";
import { useAppContext } from "@/app/provider/useAppContext";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { FiAward, FiImage, FiSmile } from "react-icons/fi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function profileHome() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  const words = `Welcome to my profile! Don't hesitate to take a look and discover my creations. I hope you like them! 🚀✨`;

  const { handleViewImage } = useAppContext();

  const formText = useForm<z.infer<typeof FormSchemaText>>({
    resolver: zodResolver(FormSchemaText),
    defaultValues: {
      text: "",
    },
  });

  function onSubmitText(data: z.infer<typeof FormSchemaText>) {
    console.log("Form data:", data.text);
  }

  return (
    <div className="pt-[60px]">
      <Color src={SystemCoverImg.src} crossOrigin="anonymous" format="hex">
        {({ data }) => {
          return (
            <div
              className="CoverImage FlexEmbed FlexEmbed--2by1 max-w-[800px]"
              style={{
                boxShadow: `${data} 0px 30px 100px 50px`,
                backgroundImage: `url(${SystemCoverImg.src})`,
                backgroundPosition: `50% ${0}%`,
              }}
            />
          );
        }}
      </Color>
      <div className="flex items-center flex-col z-10">
        <div className="flex justify-center items-center h-max flex-col md:flex-row">
          <div className="flex justify-start items-start flex-col w-[90%] max-w-[500px] p-3">
            <div className="w-max flex items-start mt-5 flex-col p-3">
              <Avatar className="w-[150px] h-[150px]">
                <AvatarImage
                  src={SystemNoImg.src}
                  alt="@shadcn"
                  onMouseDown={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Avatar>
              <div className="font-bold z-10">UserName</div>
              <div className="flex flex-wrap z-10">
                <Badge className="bg-gradient-to-r from-fuchsia-600 to-pink-600 mr-1">
                  ArtVibes
                </Badge>
                <Badge className="admin mr-1">Admin</Badge>
                <Badge variant="outline" className="mr-1">
                  Handicraft
                </Badge>
                <Badge variant="outline">AI Generator</Badge>
              </div>
            </div>
            <div className="flex justify-center align-center m-1 z-10">
              <Button type="button" className="text-white mr-1 rounded-full">
                follow {`1k`}
              </Button>
              <EditProfile />
              <Button
                type="button"
                className="text-white ml-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-900"
              >
                Moderation
                <FiAward className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-start items-center flex-col w-[90%] max-w-[500px] p-3">
            <div className="leading-7 [&:not(:first-child)]:mt-6 w-[100%] max-w-[1200px] text-center z-10">
              <TextGenerateEffect words={words} />
            </div>
          </div>
        </div>
      </div>

      {/** Menu Tabs */}

      <div className="flex items-center pt-[10px] flex-col mb-[50px]">
        <TabsProfile />
      </div>

      <div className="flex items-center pt-[10px] flex-col mb-[50px]">
        <div className="w-[90%] max-w-[1200px] flex justify-center items-center h-max flex-col">
          <Card className="w-full bg-transparent">
            <CardHeader>
              <CardTitle className="flex items-center">
                New post
                <div className="flex ml-2">
                  <Button className="mr-2">
                    <FiImage className="h-4 w-4" />
                  </Button>
                  <Button>
                    <FiSmile className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Form {...formText}>
                <form
                  onSubmit={formText.handleSubmit(onSubmitText)}
                  className="w-full space-y-6"
                >
                  <FormField
                    control={formText.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="mr-2">
                    Submit
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center pt-[10px] flex-col mb-[100px]">
        <div className="w-[90%] max-w-[1200px] flex justify-center items-center h-max flex-col">
          <div className="text-2xl font-bold text-start w-full pb-10">
            Last post
          </div>

          <Carousel
            plugins={[plugin.current]}
            opts={{
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {imagesIllustration?.map((img, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <Card className="overflow-hidden rounded-lg shadow-md">
                    <Image
                      className="w-full h-48 object-cover"
                      src={img}
                      alt="Post Image"
                      width={400}
                      height={250}
                      priority
                      onMouseDown={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <CardContent className="p-4">
                      <p className="text-muted-foreground line-clamp-2">
                        Brève description du post. Ceci est un exemple de texte
                        qui peut être affiché dans la vignette.
                      </p>
                    </CardContent>
                    <CardFooter className="p-4">
                      <Link
                        href="#"
                        className="font-medium text-gray-300"
                        prefetch={false}
                      >
                        Voir plus
                      </Link>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <div className="flex items-center flex-col mb-[150px]">
        <Tabs defaultValue="images" className="w-[90%] max-w-[1200px]">
          <TabsList>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="manga">Manga</TabsTrigger>
          </TabsList>
          <TabsContent value="images">
            <h1 className="text-2xl font-bold text-start w-full pb-10">
              Images
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
              {imagesIllustration.map((img, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg group"
                >
                  <Link
                    href="#"
                    className="absolute inset-0 z-10"
                    prefetch={false}
                  >
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
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 to-transparent p-4 text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    <div className="flex items-center text-lg font-semibold">
                      <Avatar className="mr-2">
                        <AvatarImage src={SystemNoImg.src} alt="@shadcn" />
                      </Avatar>
                      Pseudo
                    </div>
                    <div className="flex items-center mt-2">
                      <Badge variant="default" className="mr-1">
                        Manga
                      </Badge>
                      {false && (
                        <Badge variant="default" className="mr-1">
                          Image
                        </Badge>
                      )}
                      <Badge className="nsfw">NSFW</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="manga">
            <h1 className="text-2xl font-bold text-start w-full pb-10">
              Manga
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
              {imagesIllustration.map((img, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg group"
                >
                  <Link
                    href="#"
                    className="absolute inset-0 z-10"
                    prefetch={false}
                  >
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
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 to-transparent p-4 text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    <div className="flex items-center text-lg font-semibold">
                      <Avatar className="mr-2">
                        <AvatarImage src={SystemNoImg.src} alt="@shadcn" />
                      </Avatar>
                      Pseudo
                    </div>
                    <div className="flex items-center mt-2">
                      <Badge variant="default" className="mr-1">
                        Manga
                      </Badge>
                      {false && (
                        <Badge variant="default" className="mr-1">
                          Image
                        </Badge>
                      )}
                      <Badge className="nsfw">NSFW</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
