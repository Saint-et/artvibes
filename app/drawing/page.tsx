"use client";

import Link from "next/link";
import DrawingNavbar from "./(components)/drawing-navbar/drawing-navbar";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import {
  FaArrowPointer,
  FaArrowRightToBracket,
  FaBell,
  FaBorderTopLeft,
  FaClockRotateLeft,
  FaCloudArrowDown,
  FaDrawPolygon,
  FaEllipsisVertical,
  FaExpand,
  FaFlag,
  FaFolder,
  FaRegLightbulb,
  FaTableCells,
  FaTableCellsLarge,
  FaToolbox,
} from "react-icons/fa6";
import useDrawing from "./(components)/drawing-tools/useDrawing";
import { Input } from "@/components/ui/input";
import TextEditDrawing from "./(components)/drawing-tools/rich_text/text-edit";
import CropArea from "./(components)/drawing-tools/crop/crop-area";
import DrawingSidebar from "./(components)/drawing-navbar/(components)/drawing-sidebar";
import LastImport from "./(components)/drawing-tools/last-import";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DrawingTimer from "./(components)/drawing-navbar/(components)/drawing-timer";
import {
  SystemCoverDrawin3,
  SystemCoverDrawing,
  SystemNoImg,
} from "@/public/assets/data/data";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CropPreArea from "./(components)/drawing-tools/crop/crop-pre-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DrawingSidebarMenu from "./(components)/drawing-navbar/(components)/drawing-sidebar-menu/drawing-sidebar-menu";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GrabScrollComponent from "./(components)/drawing-navbar/(components)/grab-to-scroll";
import OverlayArea from "./(components)/drawing-tools/overlay/overlay-area";
import OverlayAreaSave from "./(components)/drawing-tools/overlay/overlay-area-save";
import Benchmark from "./(components)/drawing-tools/benchmark/benchmark";
import { VscAccount } from "react-icons/vsc";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import PagePopover from "./(components)/drawing-tools/page-popover";
import DrawingIntro from "./(components)/drawing-intro";

export default function Drawing() {
  const GrabScrollDrawing = GrabScrollComponent();
  const UseDrawing = useDrawing();

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

  useEffect(() => {
    if (!UseDrawing.isNewImage.img) return;

    const img = new window.Image();
    img.src = UseDrawing.isNewImage.img;
    img.onload = () => {
      UseDrawing.setImageSize({
        w: img.width,
        h: img.height,
      });
    };
    img.onerror = () => {
      console.error("Failed to load the image.");
    };
  }, [UseDrawing.isNewImage]);

  const [isSliderLuminosity, setSliderLuminosity] = useState<number>(0);

  const handleSliderLuminosity = (newValue: number[]) => {
    const newLuminosity = newValue[0];
    setSliderLuminosity(newLuminosity);
  };

  const [mouseSide, setMouseSide] = useState<boolean>(true);

  useEffect(() => {
    if (UseDrawing.isNewImage.img) return;
    // Définir un intervalle qui met à jour la valeur toutes les 2 secondes
    const interval = setInterval(() => {
      setMouseSide((prevMouseSide) => !prevMouseSide); // Utiliser l'état précédent pour éviter tout bug
    }, 5500);

    // Nettoyage de l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, [UseDrawing.isNewImage.img]);

  const handleSliderExpand = (newValue: number[]) => {
    const newExpand = newValue[0];
    UseDrawing?.setDrawingExpandImg(newExpand);
  };

  return (
    <>
      <Dialog
        open={UseDrawing.isFileDialogOpenNewImgAlert}
        onOpenChange={UseDrawing.setFileDialogOpenNewImgAlert}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to change the current image?
            </DialogTitle>
            <DialogDescription>
              The changes made will be applied to the new image. However, if the
              size of the new image differs, adjustments may be required to
              maintain the desired effects.
            </DialogDescription>
          </DialogHeader>
          {UseDrawing.isFileDialogOpenNewImgAlertElement.img && (
            <div className="flex justify-center">
              <Card className="w-[90%] max-w-[300px]">
                <CardContent className="p-1">
                  <Image
                    className="w-[100%] rounded-md"
                    src={UseDrawing.isFileDialogOpenNewImgAlertElement.img}
                    width={200}
                    height={200}
                    alt="logo"
                    onMouseDown={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant={"activeBlue"}
                onClick={UseDrawing.handleNewPictureAdd}
              >
                Apply
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="fixed top-0 flex justify-center bg-[#0d0d0d] h-[60px] w-full z-[3000]">
        <div className="flex justify-between items-center w-[98%]">
          <div className="flex">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="mr-2">
                  <AvatarImage src={SystemNoImg.src} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Credits</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Service</DropdownMenuLabel>
                <DropdownMenuItem>Drawing</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DrawingNavbar {...UseDrawing} />
          </div>

          {UseDrawing.isNewImage.img && (
            <Card className="bg-inherit border-none">
              <CardContent className="flex gap-2 p-2">
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="border p-2 rounded"
                  onClick={() => {
                    UseDrawing.setFileDialogOpenImport(
                      !UseDrawing.isFileDialogOpenImport
                    );
                  }}
                >
                  <FaFolder className="h-4 w-4" />
                </Button>
                <Separator className="h-[40px]" orientation="vertical" />
                <Button
                  variant={UseDrawing.isSelectArea ? "activeBlue" : "outline"}
                  size={"icon"}
                  onClick={() => {
                    UseDrawing.setSelectArea(!UseDrawing.isSelectArea);
                  }}
                >
                  <FaArrowPointer className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => {
                    UseDrawing?.setImgBorderOn(!UseDrawing?.isImgBorderOn);
                  }}
                  variant={UseDrawing?.isImgBorderOn ? "activeBlue" : "outline"}
                  size={"icon"}
                >
                  <FaBorderTopLeft className="h-4 w-4" />
                </Button>
                <Popover>
                  <PopoverTrigger>
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className="border p-2 rounded"
                    >
                      <FaRegLightbulb className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="mb-4">
                      luminosity : {Math.floor(isSliderLuminosity / 2.55)}%
                    </div>
                    <Slider
                      defaultValue={[isSliderLuminosity]}
                      value={[isSliderLuminosity]}
                      onValueChange={handleSliderLuminosity}
                      min={0}
                      max={255}
                      step={1}
                      aria-label="input-slider"
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger>
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className="border p-2 rounded"
                    >
                      <FaExpand className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="mb-4">
                      Develop the main image : {UseDrawing?.drawingExpandImg}px
                    </div>
                    <Slider
                      defaultValue={[UseDrawing?.drawingExpandImg]}
                      value={[UseDrawing?.drawingExpandImg]}
                      onValueChange={handleSliderExpand}
                      max={500}
                      min={0}
                      step={2}
                    />
                  </PopoverContent>
                </Popover>
                <Separator className="h-[40px]" orientation="vertical" />
                <Button
                  onClick={() => {
                    UseDrawing?.setImgSeparator(
                      UseDrawing?.isImgSeparator === "3x3" ? "none" : "3x3"
                    );
                  }}
                  variant={
                    UseDrawing?.isImgSeparator === "3x3"
                      ? "activeBlue"
                      : "outline"
                  }
                  size={"icon"}
                >
                  <FaTableCells className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => {
                    UseDrawing?.setImgSeparator(
                      UseDrawing?.isImgSeparator === "2x2" ? "none" : "2x2"
                    );
                  }}
                  variant={
                    UseDrawing?.isImgSeparator === "2x2"
                      ? "activeBlue"
                      : "outline"
                  }
                  size={"icon"}
                >
                  <FaTableCellsLarge className="h-4 w-4" />
                </Button>
                <Separator className="h-[40px]" orientation="vertical" />
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="gradient5"
                  variant={"outline"}
                  size={"icon"}
                >
                  <VscAccount className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="flex">
            <Button className="mr-5" variant="outline" size="icon">
              <FiArrowLeft className="h-4 w-4" />
            </Button>
            <Button className="mr-5" variant="outline" size="icon">
              <FiArrowRight className="h-4 w-4" />
            </Button>
            <Button className="mr-5" variant="outline" size="icon">
              <FaClockRotateLeft className="h-4 w-4" />
            </Button>
            <DrawingTimer duration={300} isNewImage={UseDrawing.isNewImage} />
          </div>
        </div>
      </div>

      <PagePopover {...UseDrawing} />

      <div
        className="flex flex-col h-screen overflow-hidden pt-[60px] pb-[60px]"
        style={{
          backgroundColor:
            isSliderLuminosity === 0
              ? "transparent"
              : `rgb(${isSliderLuminosity},${isSliderLuminosity},${isSliderLuminosity})`,
        }}
        onDragOver={UseDrawing.handleDragOver}
      >
        <div
          className={`flex h-full w-full ${
            UseDrawing.isNewImage.img ? "initial" : "background-img-animated"
          }`}
          style={{
            backgroundImage: UseDrawing.isNewImage.img
              ? "none" // Explicitly set the backgroundImage to 'none' if isNewImage is true
              : `url(${
                  mouseSide ? SystemCoverDrawing.src : SystemCoverDrawin3.src
                })`,
            backgroundSize: UseDrawing.isNewImage.img ? "initial" : "contain",
            //backgroundPosition: UseDrawing.isNewImage.img
            //  ? "initial"
            //  : `${50}% ${50}%`,
            transition: UseDrawing.isNewImage.img ? "0s" : "1s",
          }}
        >
          <>
            <DrawingSidebarMenu {...UseDrawing} />
            <DrawingSidebar {...UseDrawing} />
            {UseDrawing.isNewImage.img ? (
              <>
                <div
                  ref={GrabScrollDrawing.scrollRef}
                  className="scrollbar-style w-full h-full flex justify-start items-center" //flex justify-center items-start
                  style={{
                    overflow: "scroll",
                    //padding: 20,
                  }}
                  onMouseDown={(e) => {
                    if (UseDrawing.textCanvasVisible) {
                      return;
                    }
                    if (UseDrawing.isMenuOpen === 5) {
                      return;
                    }
                    if (UseDrawing.isImgOverlay.img) {
                      return;
                    }
                    if (UseDrawing.isSelectArea) {
                      return UseDrawing.handleMouseDown(e);
                    }
                    return GrabScrollDrawing.handleMouseDown(e);
                  }}
                  onMouseMove={(e) => {
                    if (UseDrawing.textCanvasVisible) {
                      return UseDrawing.handleMouseMoveResizing(e);
                    }
                    if (UseDrawing.isMenuOpen === 5) {
                      return UseDrawing.handleMouseMoveResizing(e);
                    }
                    if (UseDrawing.isImgOverlay.img) {
                      return UseDrawing.handleMouseMoveResizing(e);
                    }
                    if (UseDrawing.isSelectArea) {
                      return UseDrawing.handleMouseMove(e);
                    }
                    return GrabScrollDrawing.handleMouseMove(e);
                  }}
                  onMouseUp={() => {
                    if (UseDrawing.textCanvasVisible) {
                      return UseDrawing.handleMouseUpResizing();
                    }
                    if (UseDrawing.isMenuOpen === 5) {
                      return UseDrawing.handleMouseUpResizing();
                    }
                    if (UseDrawing.isImgOverlay.img) {
                      return UseDrawing.handleMouseUpResizing();
                    }
                    if (UseDrawing.isSelectArea) {
                      return UseDrawing.handleMouseUp();
                    }
                    return GrabScrollDrawing.handleMouseUp();
                  }}
                  onMouseLeave={() => {
                    if (UseDrawing.textCanvasVisible) {
                      return UseDrawing.handleMouseUpResizing();
                    }
                    if (UseDrawing.isMenuOpen === 5) {
                      return UseDrawing.handleMouseUpResizing();
                    }
                    if (UseDrawing.isImgOverlay.img) {
                      return UseDrawing.handleMouseUpResizing();
                    }
                    if (UseDrawing.isSelectArea) {
                      return UseDrawing.handleMouseUp();
                    }
                    return GrabScrollDrawing.handleMouseUp();
                  }}
                >
                  <div
                    ref={UseDrawing.captureRef}
                    className="my-auto mx-auto"
                    style={{
                      //transformOrigin: "left", //left
                      height: UseDrawing.isImageSize.h * UseDrawing.zoom[0],
                      width: UseDrawing.isImageSize.w * UseDrawing.zoom[0],
                      padding:
                        (UseDrawing.drawingExpandImg / 2) * UseDrawing.zoom[0],
                    }}
                  >
                    {UseDrawing.selecting &&
                      UseDrawing.startX !== 0 &&
                      UseDrawing.startY !== 0 &&
                      UseDrawing.endX !== 0 &&
                      UseDrawing.endY !== 0 && (
                        <div
                          style={{
                            zIndex: 50,
                            position: "absolute",
                            backgroundColor: "rgba(0, 106, 255, 0.2)",
                            border: "1px solid #006aff",
                            left: Math.min(UseDrawing.startX, UseDrawing.endX),
                            top: Math.min(UseDrawing.startY, UseDrawing.endY),
                            width: Math.abs(
                              UseDrawing.endX - UseDrawing.startX
                            ),
                            height: Math.abs(
                              UseDrawing.endY - UseDrawing.startY
                            ),
                          }}
                        />
                      )}
                    <div
                      ref={UseDrawing.canvasContainerRef}
                      style={{
                        transform: `scale(${UseDrawing.zoom})`,
                        transformOrigin: "left top", //left
                        width: "max-content",
                        height: "max-content",
                        //padding: 20,
                      }}
                    >
                      <CropArea {...UseDrawing} />
                      <CropPreArea {...UseDrawing} />
                      <TextEditDrawing {...UseDrawing} />
                      <OverlayArea {...UseDrawing} {...GrabScrollDrawing} />
                      <Benchmark {...UseDrawing} />
                      {UseDrawing.isImgSeparator === "3x3" && (
                        <>
                          <div
                            className="border border-white absolute top-[30%] z-50"
                            style={{
                              width: UseDrawing?.isImageSize.w,
                              transition: "200ms",
                            }}
                          />
                          <div
                            className="border border-white absolute top-[70%] z-50"
                            style={{
                              width: UseDrawing?.isImageSize.w,
                              transition: "200ms",
                            }}
                          />
                          <div
                            className="border border-white absolute left-[35%] z-50"
                            style={{
                              height: UseDrawing?.isImageSize.h,
                              transition: "200ms",
                            }}
                          />
                          <div
                            className="border border-white absolute left-[65%] z-50"
                            style={{
                              height: UseDrawing?.isImageSize.h,
                              transition: "200ms",
                            }}
                          />
                        </>
                      )}
                      {UseDrawing.isImgSeparator === "2x2" && (
                        <>
                          <div
                            className="border border-white absolute top-[50%] z-50"
                            style={{
                              width: UseDrawing?.isImageSize.w,
                            }}
                          />
                          <div
                            className="border border-white absolute left-[50%] z-50"
                            style={{
                              height: UseDrawing?.isImageSize.h,
                            }}
                          />
                        </>
                      )}
                      <OverlayAreaSave {...UseDrawing} />
                      {UseDrawing.drawingExpandImg > 0 && (
                        <div
                          style={{
                            zIndex: 50,
                            position: "absolute",
                            left: -(UseDrawing.drawingExpandImg / 2),
                            top: -(UseDrawing.drawingExpandImg / 2),
                            width:
                              UseDrawing?.isImageSize.w +
                              UseDrawing.drawingExpandImg,
                            height:
                              UseDrawing?.isImageSize.h +
                              UseDrawing.drawingExpandImg,
                            border: "2px solid red",
                            //transition: "200ms",
                          }}
                        />
                      )}
                      <div
                        style={{
                          zIndex: 200,
                          position: "absolute",
                          width: UseDrawing?.isImageSize.w,
                          height: UseDrawing?.isImageSize.h,
                          border:
                            UseDrawing.isMenuOpen === 5
                              ? "2px dashed gold"
                              : UseDrawing?.isImgBorderOn
                              ? "2px dashed gold"
                              : "2px dashed transparent",
                          transition: "200ms",
                        }}
                      />
                      <div
                        style={{
                          filter: `
                             brightness(${UseDrawing.systemSetting.brightness}%)
                             contrast(${UseDrawing.systemSetting.contrast}%)
                             saturate(${UseDrawing.systemSetting.saturation}%)
                             sepia(${UseDrawing.systemSetting.sepia}%)
                             hue-rotate(${UseDrawing.systemSetting.hue}deg)
                             blur(${UseDrawing.systemSetting.blur}px)
                             grayscale(${UseDrawing.systemSetting.grayscale}%)
                             invert(${UseDrawing.systemSetting.invert}%)
                           `,
                          transition: "200ms",
                        }}
                      >
                        <div
                          style={{
                            zIndex: 500,
                            position: "absolute",
                            left: -(UseDrawing.drawingExpandImg / 2),
                            top: -(UseDrawing.drawingExpandImg / 2),
                            width:
                              UseDrawing?.isImageSize.w +
                              UseDrawing.drawingExpandImg,
                            height:
                              UseDrawing?.isImageSize.h +
                              UseDrawing.drawingExpandImg,
                            boxShadow: `${0}px ${0}px ${Math.min(
                              UseDrawing?.systemShadow.opacity,
                              4
                            )}px ${Math.min(
                              UseDrawing?.systemShadow.size,
                              10
                            )}px ${UseDrawing?.systemShadow.color},
                          inset
                          ${0}px ${0}px ${0}px ${Math.min(
                              UseDrawing?.systemShadow.size / 2,
                              10
                            )}px ${UseDrawing?.systemShadow.color}
                          ,inset ${UseDrawing?.systemShadow.x}px ${
                              UseDrawing?.systemShadow.y
                            }px ${UseDrawing?.systemShadow.opacity}px ${
                              UseDrawing?.systemShadow.size
                            }px ${UseDrawing?.systemShadow.color}`,
                            //transition: "200ms",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        />
                        <img
                          ref={UseDrawing?.imageRef}
                          src={UseDrawing?.isNewImage?.img}
                          alt="logo"
                          //onMouseDown={(e) => e.preventDefault()}
                          onDragStart={(e) => e.preventDefault()}
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <DrawingIntro {...UseDrawing} />
              </>
            )}
          </>
        </div>
      </div>

      <div className="fixed bottom-0 flex justify-center bg-[#0d0d0d] h-[60px] w-full z-[3000]">
        <div className="flex justify-between items-center w-[98%]">
          {!UseDrawing.isNewImage.img ? (
            <Link
              href={"/"}
              className="text-1xl font-bold w-max flex items-center"
            >
              Drawing <FaDrawPolygon className="text-1xl ml-2" />
            </Link>
          ) : (
            <Card className="bg-inherit border-none">
              <CardContent className="flex p-1 gap-4">
                <div className="border rounded flex items-center gap-2 p-1 h-[40px] overflow-hidden">
                  w:{" "}
                  <Input
                    value={
                      UseDrawing.isImageSize.w + UseDrawing?.drawingExpandImg
                    }
                    disabled
                    className="w-[80px] h-[40px] border-none"
                    type="number"
                    placeholder="width"
                  />
                </div>
                <div className="border rounded flex items-center gap-2 p-1 h-[40px] overflow-hidden">
                  h:{" "}
                  <Input
                    value={
                      UseDrawing.isImageSize.h + UseDrawing?.drawingExpandImg
                    }
                    disabled
                    className="w-[80px] h-[40px] border-none"
                    type="number"
                    placeholder="height"
                  />
                </div>
              </CardContent>
            </Card>
          )}
          <div className="flex w-full items-center max-w-[400px]">
            <Popover>
              <PopoverTrigger
                className="border p-2 rounded"
                disabled={!UseDrawing.isNewImage.img}
              >
                <FaToolbox className="h-4 w-4" />
              </PopoverTrigger>
              <PopoverContent>
                <div className="mb-1">File :</div>
                <div className="flex flex-col gap-2">
                  <Button
                    variant={"secondary"}
                    onClick={() => {
                      UseDrawing.setFileDialogOpenImport(
                        !UseDrawing.isFileDialogOpenImport
                      );
                    }}
                  >
                    <FaFolder className="h-4 w-4 mr-4" /> File...
                  </Button>
                </div>
                <Separator className="my-4" />
                <div className="mb-1">Select :</div>
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => {
                      UseDrawing.setSelectArea(!UseDrawing.isSelectArea);
                    }}
                    variant={
                      UseDrawing.isSelectArea ? "activeBlue" : "secondary"
                    }
                  >
                    <FaArrowPointer className="h-4 w-4 mr-4" /> Selector
                  </Button>
                </div>
                <Separator className="my-4" />
                <div className="mb-1">Border :</div>
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => {
                      UseDrawing?.setImgBorderOn(!UseDrawing?.isImgBorderOn);
                    }}
                    variant={
                      UseDrawing?.isImgBorderOn ? "activeBlue" : "secondary"
                    }
                  >
                    <FaBorderTopLeft className="h-4 w-4 mr-4" /> img border
                  </Button>
                </div>
                <Separator className="my-4" />
                <div className="mb-1">Separator :</div>
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => {
                      UseDrawing?.setImgSeparator(
                        UseDrawing?.isImgSeparator === "3x3" ? "none" : "3x3"
                      );
                    }}
                    variant={
                      UseDrawing?.isImgSeparator === "3x3"
                        ? "activeBlue"
                        : "secondary"
                    }
                  >
                    <FaTableCells className="h-4 w-4 mr-4" /> 3 x 3
                  </Button>
                  <Button
                    onClick={() => {
                      UseDrawing?.setImgSeparator(
                        UseDrawing?.isImgSeparator === "2x2" ? "none" : "2x2"
                      );
                    }}
                    variant={
                      UseDrawing?.isImgSeparator === "2x2"
                        ? "activeBlue"
                        : "secondary"
                    }
                  >
                    <FaTableCellsLarge className="h-4 w-4 mr-4" /> 2 x 2
                  </Button>
                </div>
                <Separator className="my-4" />
                <div className="mb-1">
                  Develop the main image : {UseDrawing?.drawingExpandImg}px
                </div>
                <div className="flex flex-col gap-2">
                  <Slider
                    defaultValue={[UseDrawing?.drawingExpandImg]}
                    value={[UseDrawing?.drawingExpandImg]}
                    onValueChange={handleSliderExpand}
                    max={500}
                    min={0}
                    step={2}
                  />
                  <Separator className="my-4" />
                  <div className="mb-1">
                    luminosity : {Math.floor(isSliderLuminosity / 2.55)}%
                  </div>
                  <Slider
                    defaultValue={[isSliderLuminosity]}
                    value={[isSliderLuminosity]}
                    onValueChange={handleSliderLuminosity}
                    min={0}
                    max={255}
                    step={1}
                    aria-label="input-slider"
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Slider
              className="ml-4"
              defaultValue={UseDrawing.zoom}
              value={UseDrawing.zoom}
              onValueChange={UseDrawing.handleChange}
              min={0.1}
              max={5.0}
              step={0.1}
              aria-label="input-slider"
              disabled={UseDrawing.isNewImage.id === 0}
            />
            <div className="ml-2 mr-2">
              {(UseDrawing.zoom[0] * 200).toFixed(0)}%
            </div>
            <Popover>
              <PopoverTrigger className="border p-2 rounded">
                <FaEllipsisVertical className="h-4 w-4" />
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-2">
                  <Button variant={"secondary"}>
                    <FaBell className="h-4 w-4 mr-4" /> notification
                  </Button>
                  <Button variant={"destructive"}>
                    <FaFlag className="h-4 w-4 mr-4" /> report issue
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <Input
        id="picture"
        type="file"
        ref={UseDrawing.fileInputRef}
        multiple={true}
        style={{ display: "none" }}
        onChange={UseDrawing.handleFileChangeImport}
      />

      <LastImport {...UseDrawing} />

      {UseDrawing.isDraggingDrop && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          style={{ transition: "500ms" }}
        >
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onDragOver={UseDrawing.handleDragOver}
            onDragLeave={UseDrawing.handleDragLeave}
            onDrop={UseDrawing.handleDrop}
            onClick={() => {
              UseDrawing.setIsDraggingDrop(false);
            }}
            style={{ zIndex: 20000 }}
          />
          <div className="relative w-full max-w-5xl">
            <div className="h-[80vh] w-full rounded-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-[90%] w-[90%] max-h-[400px] max-w-[800px] flex-col items-center justify-center rounded-lg text-white">
                  <FaArrowRightToBracket className="h-10 w-10 rotate-90 mb-2" />
                  <p className="text-2xl font-bold">
                    Glissez-déposez vos images ici
                  </p>
                  {!UseDrawing.isNewImage.img && (
                    <div className="flex text-slate-400 gap-1">
                      Ceux-ci seront importés dans la collection, vous les
                      trouverez dans{" "}
                      <span className="flex items-center gap-1 text-sky-500">
                        [ fichier
                        <FaFolder />]
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
