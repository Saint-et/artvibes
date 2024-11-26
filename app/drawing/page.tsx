"use client";

import DrawingNavbar from "./(components)/drawing-navbar/drawing-navbar";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useEffect } from "react";
import {
  FaClockRotateLeft,
  FaTableCells,
  FaTableCellsLarge,
} from "react-icons/fa6";
import useDrawing from "./(components)/drawing-tools/useDrawing";
import { Input } from "@/components/ui/input";
import CropArea from "./(components)/drawing-tools/area-tools/crop/crop-area";
import DrawingSidebar from "./(components)/drawing-navbar/(components)/drawing-sidebar";
import LastImport from "./(components)/drawing-tools/last-import";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  DrawingName,
  DrawingVersion,
  SystemImg,
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
import CropPreArea from "./(components)/drawing-tools/area-tools/crop/crop-pre-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DrawingSidebarMenu from "./(components)/drawing-navbar/(components)/drawing-sidebar-menu/drawing-sidebar-menu";
import { Separator } from "@/components/ui/separator";
import OverlayArea from "./(components)/drawing-tools/area-tools/overlay/overlay-area";
import OverlayAreaSave from "./(components)/drawing-tools/area-tools/overlay/overlay-area-save";
import PagePopover from "./(components)/drawing-tools/page-popover";
import DrawingIntro from "./(components)/drawing-intro";
import {
  LuArrowDownToLine,
  LuArrowUpRightSquare,
  LuBoxSelect,
  LuExpand,
  LuFolder,
  LuFrame,
  LuGauge,
  LuGem,
  LuHome,
  LuImage,
  LuMaximize,
  LuMousePointer,
  LuPackage,
  LuPackageOpen,
  LuSearch,
  LuSearchCode,
  LuSettings2,
  LuSun,
  LuTimer,
  LuTimerReset,
  LuVolume2,
} from "react-icons/lu";
import DrawingRenderingImg from "./(components)/drawing-tools/drawing-rendering/drawing-rendering-img";
import { RemoveScroll } from "react-remove-scroll";
import DrawingSidebarTools from "./(components)/drawing-navbar/(components)/drawing-sidebar-tools";
import OverlayAreaSaveItems from "./(components)/drawing-tools/area-tools/overlay-area-save-items";
import DrawingArea from "./(components)/drawing-tools/area-tools/draw/drawing-area";
import DrawingBlanket from "./(components)/drawing-tools/area-tools/blanket/drawing-blanket";
import useUtilsComponents from "./(components)/utils/utils-components";
import LoaderApp from "../(components)/loader/loader";
import {
  DrawArea,
  DrawingSetting,
  FileDialogOpen,
  IsNewImage,
  LoadedImage,
  WaifuProcess,
} from "@/utils/interface";
import { WaifuProcessDefault } from "@/public/assets/data/defaultValue-drawing";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
//import { loadModels } from "./(components)/utils/getModels";

export default function Drawing() {
  const UseDrawing = useDrawing();
  const UtilsComponents = useUtilsComponents();

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

  const detectFaces = async (img: any, defaultArea: DrawArea) => {
    /*
    try {
      await img.decode(); // Attend que l'image soit chargée complètement

      const detections = await faceapi
        .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      if (detections.length === 0) {
        UseDrawing.setFaceApi({
          facedetect: detections.length,
          value: defaultArea,
          faceApi: FaceApiDefault,
        });
        if (UseDrawing.isMenuOpen === 5) {
          UseDrawing.setDrawArea(defaultArea);
        }
        throw new Error("Aucun visage détecté");
      }

      // detection.detection.box.x
      const updatedFaceVisible = detections.map((detection) => ({
        rotate: 0,
        width: img.width / 2,
        height: img.height / 2,
        leftOffset: 0,
        topOffset: 0,
        positionX:
          detection.detection.box.x +
          detection.detection.box.width / 2 -
          img.width / 4,
        positionY:
          detection.detection.box.y +
          detection.detection.box.height / 2 -
          img.height / 4,
      }));
      const faceApi = detections.map((detection) => ({
        imgWidth: img.width,
        imgHeight: img.height,
        width: detection.detection.box.width,
        height: detection.detection.box.height,
        positionX: detection.detection.box.x,
        positionY: detection.detection.box.y,
      }));
      //console.log(updatedFaceVisible[0]);
      if (UseDrawing.isMenuOpen === 5) {
        UseDrawing.setDrawArea(updatedFaceVisible[0]);
      }
      UseDrawing.setFaceApi({
        facedetect: detections.length,
        value: updatedFaceVisible[0],
        faceApi: faceApi[0],
      });
    } catch (error) {
      if (UseDrawing.isMenuOpen === 5) {
        UseDrawing.setDrawArea(defaultArea);
      }
      UseDrawing.setFaceApi({
        facedetect: 0,
        value: defaultArea,
        faceApi: FaceApiDefault,
      });
      throw new Error("Aucun visage détecté");
    }
    */
  };

  const handleInitialZoom = () => {
    if (!UseDrawing?.imageRef.current) return;

    const vhW = typeof window !== "undefined" ? window.innerWidth : 0;
    const vhH = typeof window !== "undefined" ? window.innerHeight : 0;
    const maxWidth = vhW * 0.7;
    const maxHeight = vhH * 0.7;

    let initialZoom;
    // Calcul du facteur de redimensionnement initial
    const widthScaleFactor =
      maxWidth /
      (UseDrawing?.imageRef.current?.width +
        UseDrawing.drawingExpandImg.expand);
    const heightScaleFactor =
      maxHeight /
      (UseDrawing?.imageRef.current?.height +
        UseDrawing.drawingExpandImg.expand);

    if (
      UseDrawing?.imageRef.current?.width < UseDrawing?.imageRef.current?.height
    ) {
      initialZoom = Math.min(widthScaleFactor, heightScaleFactor);
    } else {
      initialZoom = Math.min(heightScaleFactor, widthScaleFactor);
    }

    return [Math.max(initialZoom, 0.02)];
  };
  useEffect(() => {
    if (!UseDrawing.isNewImage.img) return;

    const img = new window.Image();
    img.src = UseDrawing.isNewImage.img;
    img.onload = () => {
      const vhW = typeof window !== "undefined" ? window.innerWidth : 0;
      const vhH = typeof window !== "undefined" ? window.innerHeight : 0;
      const maxWidth = vhW * 0.7;
      const maxHeight = vhH * 0.7;

      let initialZoom;
      // Calcul du facteur de redimensionnement initial
      const widthScaleFactor =
        maxWidth / (img.width + UseDrawing.drawingExpandImg.expand);
      const heightScaleFactor =
        maxHeight / (img.height + UseDrawing.drawingExpandImg.expand);

      if (img.width < img.height) {
        initialZoom = Math.min(widthScaleFactor, heightScaleFactor);
      } else {
        initialZoom = Math.min(heightScaleFactor, widthScaleFactor);
      }

      UseDrawing.setZoom([Math.max(initialZoom, 0.02)]);
      UseDrawing.setImageSize({
        w: img.width,
        h: img.height,
      });

      UseDrawing.hasTransparency(img).then((result) => {
        UseDrawing.setDrawingSetting((prevState: DrawingSetting) => ({
          ...prevState,
          transparence: result,
        }));
      });
      return;
    };
    img.onerror = () => {
      console.error("Failed to load the image.");
    };
  }, [UseDrawing.isNewImage.img]);

  //const handleSliderLuminosity = (newValue: number[]) => {
  //  const newLuminosity = newValue[0];
  //  UseDrawing.setDrawingSetting((prevState: DrawingSetting) => ({
  //    ...prevState,
  //    luminosity: newLuminosity,
  //  }));
  //};

  //const pourcentageHeightFaceApi = Math.max(
  //  Math.min(
  //    Math.round(
  //      (UseDrawing.faceApi.faceApi.positionY /
  //        UseDrawing.faceApi.faceApi.height) *
  //        200
  //    ),
  //    200
  //  ),
  //  0
  //);

  const hExpand =
    (UseDrawing.isImageSize.h + UseDrawing.drawingExpandImg.expand) *
    UseDrawing.zoom[0];

  const wExpand =
    (UseDrawing.isImageSize.w + UseDrawing.drawingExpandImg.expand) *
    UseDrawing.zoom[0];

  //const bgColor = Math.max(
  //  Math.min(UseDrawing.isDrawingSetting.luminosity, 100),
  //  50
  //);

  const isWaifuProcessParams = [
    {
      name: "Style",
      value: UseDrawing.isWaifuProcess?.params.style,
      icon: LuImage,
    },
    {
      name: "Noise",
      value: UseDrawing.isWaifuProcess?.params.noise,
      icon: LuVolume2,
    },
    {
      name: "Size",
      value: UseDrawing.isWaifuProcess?.params.size,
      icon: LuMaximize,
    },
    {
      name: "Size after scale",
      value: UseDrawing.isWaifuProcess?.params.sizeAfterScale,
      icon: LuExpand,
    },
    {
      name: "Test-Time Augmentation",
      value: UseDrawing.isWaifuProcess?.params.tta,
      icon: LuTimerReset,
    },
    {
      name: "Time",
      value: UseDrawing.isWaifuProcess?.params.time,
      icon: LuTimer,
    },
  ];


  if (!UseDrawing.isDrawingLoad?.load)
    return (
      <>
        <LoaderApp
          background={UseDrawing.isDrawingLoad?.bgHome}
          name={DrawingName}
          version={DrawingVersion}
        />
      </>
    );

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {UseDrawing.isWaifuProcess?.startProcess && (
        <LoaderApp
          background={UseDrawing.isDrawingLoad?.bgHome}
          name={"IA"}
          version={"Waifu2x"}
          Waifu2xTfjs={UseDrawing.isWaifuProcess}
        />
      )}
      <RemoveScroll removeScrollBar={true}>
        <DrawingIntro {...UseDrawing} />
        <Dialog
          open={UseDrawing.isFileDialogOpenNewImgAlert}
          onOpenChange={UseDrawing.setFileDialogOpenNewImgAlert}
        >
          <DialogContent
            style={{
              zIndex: 100100,
            }}
          >
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to change the current image?
              </DialogTitle>
              <DialogDescription>
                The changes made will be applied to the new image. However, if
                the size of the new image differs, adjustments may be required
                to maintain the desired effects.
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

        <AlertDialog
          open={UseDrawing.isWaifuProcess?.openMenuEnd}
          onOpenChange={(e) => {
            if (!e) {
              UseDrawing.setWaifuProcess((prevState: WaifuProcess) => ({
                ...prevState,
                openMenuEnd: false,
              }));
            }
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Improving quality by AI: Result
              </AlertDialogTitle>
              <AlertDialogDescription>
                <span className="grid grid-cols-1 gap-2">
                  <span>Apply (Don't save): Ne remplace pas l'originale.</span>
                  <span>Apply (Save): Remplace l'originale.</span>
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Tabs defaultValue="result">
              <TabsList className="grid w-full grid-cols-2 bg-black gap-2 p-0 px-2">
                <TabsTrigger value="result" className="h-[30px]">
                  Result
                </TabsTrigger>
                <TabsTrigger value="params" className="h-[30px]">
                  Params
                </TabsTrigger>
              </TabsList>
              <TabsContent value="result">
                <div className="flex justify-center mb-4">
                  <Card className="w-[90%]">
                    <CardContent className="p-1">
                      <div>Original:</div>
                      <div
                        className="w-[100%] h-28 rounded-md"
                        style={{
                          overflow: "hidden",
                        }}
                      >
                        <img
                          className="w-[100%] h-[100%] object-cover"
                          style={{
                            transform: `scale(${UseDrawing.isWaifuProcess?.scaleImg})`,
                            overflow: "hidden",
                          }}
                          src={UseDrawing.isNewImage.img}
                          alt="logo"
                          onMouseDown={(e) => e.preventDefault()}
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </div>
                      <div>Result:</div>
                      <div
                        className="w-[100%] h-28 rounded-md"
                        style={{
                          overflow: "hidden",
                        }}
                      >
                        <img
                          className="w-[100%] h-[100%] object-cover"
                          style={{
                            transform: `scale(${UseDrawing.isWaifuProcess?.scaleImg})`,
                          }}
                          src={UseDrawing.isWaifuProcess?.params.img}
                          alt="logo"
                          onMouseDown={(e) => e.preventDefault()}
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Slider
                  defaultValue={[1]}
                  min={1}
                  max={8}
                  step={0.1}
                  onValueChange={(e: number[]) => {
                    UseDrawing.setWaifuProcess((prevState: WaifuProcess) => ({
                      ...prevState,
                      scaleImg: e[0],
                    }));
                  }}
                />
              </TabsContent>
              <TabsContent value="params">
                <ul className="grid grid-cols-1 gap-2">
                  {isWaifuProcessParams.map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5 text-blue-500" />
                      <div>
                        <span className="text-blue-500">{item.name}:</span>{" "}
                        {item.value}
                      </div>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  UseDrawing.setWaifuProcess(WaifuProcessDefault);
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  UseDrawing.setNewImage((prevState: IsNewImage) => ({
                    ...prevState,
                    img: UseDrawing.isWaifuProcess.params.img,
                  }));
                  UseDrawing.setWaifuProcess(WaifuProcessDefault);
                }}
              >
                Apply (Don't save)
              </AlertDialogAction>
              <AlertDialogAction
                className="bg-blue-500"
                onClick={() => {
                  UseDrawing.setNewImage((prevState: IsNewImage) => ({
                    ...prevState,
                    img: UseDrawing.isWaifuProcess.params.img,
                  }));
                  UseDrawing.setNewImageImport((prevLayers: IsNewImage[]) => {
                    const updatedLayers = prevLayers.map((el: IsNewImage) => {
                      if (el.id === UseDrawing.isNewImage.id) {
                        return {
                          ...UseDrawing.isNewImage,
                          img: UseDrawing.isWaifuProcess.params.img,
                        };
                      }
                      return el;
                    });
                    return updatedLayers;
                  });
                  UseDrawing.setWaifuProcess(WaifuProcessDefault);
                }}
              >
                Apply (Save)
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <DrawingRenderingImg {...UseDrawing} />

        <div className="fixed top-0 flex justify-center bg-[#0d0d0d] h-[60px] w-full z-[3000]">
          <div className="flex justify-between items-center w-[98%]">
            <div className="flex">
              <Avatar
                className="ml-4 cursor-pointer"
                onClick={() => {
                  UseDrawing.setDrawingLoad((prevState: LoadedImage) => ({
                    ...prevState,
                    home: true,
                  }));
                }}
              >
                <AvatarImage src={SystemImg.src} />
                <AvatarFallback>KS</AvatarFallback>
              </Avatar>
              <DrawingNavbar {...UseDrawing} />
            </div>

            <Card className="bg-inherit border-none hidden md:block">
              <CardContent className="flex gap-2 p-2">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="p-2 rounded"
                  onClick={() => {
                    UseDrawing.setFileDialogOpen(
                      (prevState: FileDialogOpen) => ({
                        ...prevState,
                        lastImport: !prevState.lastImport,
                      })
                    );
                  }}
                >
                  <LuFolder className="h-4 w-4" />
                </Button>
                <Separator className="h-[40px]" orientation="vertical" />
                <Button
                  variant={UseDrawing.isSelectArea ? "activeBlue" : "ghost"}
                  size={"icon"}
                  onClick={() => {
                    UseDrawing.setSelectArea(!UseDrawing.isSelectArea);
                  }}
                >
                  <LuMousePointer className="h-4 w-4" />
                </Button>
                <Separator className="h-[40px]" orientation="vertical" />
                <Button
                  onClick={() => {
                    UseDrawing?.setImgBorderOn(!UseDrawing?.isImgBorderOn);
                  }}
                  variant={UseDrawing?.isImgBorderOn ? "activeBlue" : "ghost"}
                  size={"icon"}
                >
                  <LuBoxSelect className="h-4 w-4" />
                </Button>
                <Separator className="h-[40px]" orientation="vertical" />
                <Button
                  onClick={() => {
                    UseDrawing.setDrawingSetting(
                      (prevState: DrawingSetting) => ({
                        ...prevState,
                        separatorBorder:
                          prevState.separatorBorder === "3x3" ? "none" : "3x3",
                      })
                    );
                  }}
                  variant={
                    UseDrawing?.isDrawingSetting.separatorBorder === "3x3"
                      ? "activeBlue"
                      : "ghost"
                  }
                  size={"icon"}
                >
                  <FaTableCells className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => {
                    UseDrawing.setDrawingSetting(
                      (prevState: DrawingSetting) => ({
                        ...prevState,
                        separatorBorder:
                          prevState.separatorBorder === "2x2" ? "none" : "2x2",
                      })
                    );
                  }}
                  variant={
                    UseDrawing?.isDrawingSetting.separatorBorder === "2x2"
                      ? "activeBlue"
                      : "ghost"
                  }
                  size={"icon"}
                >
                  <FaTableCellsLarge className="h-4 w-4" />
                </Button>
                {/*
                <Separator className="h-[40px]" orientation="vertical" />
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (UseDrawing.faceApi.facedetect === null) return;
                        if (UseDrawing.isMenuOpen === 5) {
                          return UseDrawing.setDrawArea(
                            UseDrawing.faceApi.value
                          );
                        }
                        if (UseDrawing.isMenuOpen === 11) {
                          return UseDrawing.setBlanket((prevState: any) => ({
                            ...prevState,
                            size: pourcentageHeightFaceApi,
                          }));
                        }
                      }}
                      variant={
                        UseDrawing.faceApi.facedetect === null
                          ? "ghost"
                          : UseDrawing.faceApi.facedetect > 0
                          ? "activeBlue"
                          : "destructive"
                      }
                      disabled={UseDrawing.faceApi.facedetect === null}
                      size={"icon"}
                    >
                      {UseDrawing.faceApi.facedetect === null ? (
                        <LuLoader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <LuScanFace className="h-5 w-5" />
                      )}
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="text-neutral-500 text-sm">
                    Note : L'intelligence artificielle utilisée pour la
                    reconnaissance faciale est uniquement dédiée à cette tâche
                    précise. Aucune donnée, image, ou information personnelle
                    n'est enregistrée ni stockée à aucun moment du processus.
                    Votre confidentialité est totalement respectée.
                  </HoverCardContent>
                </HoverCard>*/}
              </CardContent>
            </Card>

            <div className="flex">
              <Button className="mr-5" variant="ghost" size="icon">
                <FiArrowLeft className="h-4 w-4" />
              </Button>
              <Button className="mr-5" variant="ghost" size="icon">
                <FiArrowRight className="h-4 w-4" />
              </Button>
              <Button className="mr-5" variant="ghost" size="icon">
                <FaClockRotateLeft className="h-4 w-4" />
              </Button>
              {/*!UseDrawing.isNormalDrawing && <DrawingTimer {...UseDrawing} />*/}
            </div>
          </div>
        </div>

        {UseDrawing?.isNewImage?.img ? (
          <>
            {UseDrawing.isDrawingSetting.background === "no" && (
              <video
                className="w-screen h-screen fixed top-0 object-cover z-[-1] pt-[60px] pb-[60px]"
                autoPlay={true}
                muted
                loop
              >
                <source
                  src="/assets/videos/artvibe-studio/691452_bg.mp4"
                  type="video/mp4"
                />
              </video>
            )}
            <div
              className="flex flex-col h-screen w-screen overflow-hidden pt-[60px] pb-[60px]"
              style={{
                background:
                  UseDrawing.isDrawingSetting.background === "yes"
                    ? `linear-gradient(#191919, #0d0d0d)`
                    : "#00000099",
              }}
              onDragOver={UseDrawing.handleDragOver}
            >
              <div className="flex h-full w-full">
                <>
                  <DrawingSidebarMenu {...UseDrawing} />
                  <DrawingSidebar
                    {...UseDrawing}
                    //handleAlertStart={handleAlertStart}
                  />
                  <div
                    ref={UseDrawing.scrollGrabScrollRef}
                    className="scrollbar-style w-full h-full flex justify-start items-center" //flex justify-center items-start
                    style={{
                      overflow: "scroll",
                    }}
                    onMouseDown={(e) => {
                      if (UseDrawing.isDrawingNowCanvas.id !== null) {
                        return UseDrawing.startDrawingNowCanvas(e);
                      }
                      if (UseDrawing.textCanvasVisible) {
                        return;
                      }
                      if (UseDrawing.isMenuOpen === 11) {
                        return;
                      }
                      if (UseDrawing.isMenuOpen === 5) {
                        return;
                      }
                      if (UseDrawing.isFormCanvasVisible) {
                        return;
                      }
                      if (UseDrawing.drawSvg.svg) {
                        return;
                      }
                      if (UseDrawing.drawSvgFull.svg) {
                        return;
                      }
                      if (UseDrawing.isImgOverlay.img) {
                        return;
                      }
                      if (UseDrawing.isSelectArea) {
                        return UseDrawing.handleMouseDown(e);
                      }
                      return UseDrawing.handleMouseDownGrabScroll(e);
                    }}
                    onMouseMove={(e) => {
                      if (UseDrawing.isDrawingNowCanvas.id !== null) {
                        return;
                      }
                      if (UseDrawing.textCanvasVisible) {
                        return UseDrawing.handleMouseMoveResizing(e);
                      }
                      if (UseDrawing.isMenuOpen === 11) {
                        return UseDrawing.handleMouseMoveResizing(e);
                      }
                      if (UseDrawing.isMenuOpen === 5) {
                        return UseDrawing.handleMouseMoveResizing(e);
                      }
                      if (UseDrawing.isFormCanvasVisible) {
                        return UseDrawing.handleMouseMoveResizing(e);
                      }
                      if (UseDrawing.drawSvgFull.svg) {
                        return UseDrawing.handleMouseMoveResizing(e);
                      }
                      if (UseDrawing.drawSvg.svg) {
                        return UseDrawing.handleMouseMoveResizing(e);
                      }
                      if (UseDrawing.isImgOverlay.img) {
                        return UseDrawing.handleMouseMoveResizing(e);
                      }
                      if (UseDrawing.isSelectArea) {
                        return UseDrawing.handleMouseMove(e);
                      }
                      return UseDrawing.handleMouseMoveGrabScroll(e);
                    }}
                    onMouseUp={() => {
                      if (UseDrawing.isDrawingNowCanvas.id !== null) {
                        UseDrawing.DrawCanvasImg();
                        return UseDrawing.stopDrawingNowCanvas();
                      }
                      if (UseDrawing.textCanvasVisible) {
                        return UseDrawing.handleMouseUpResizing();
                      }
                      if (UseDrawing.isMenuOpen === 11) {
                        return UseDrawing.handleMouseUpResizing();
                      }
                      if (UseDrawing.isMenuOpen === 5) {
                        return UseDrawing.handleMouseUpResizing();
                      }
                      if (UseDrawing.isFormCanvasVisible) {
                        return UseDrawing.handleMouseUpResizing();
                      }
                      if (UseDrawing.drawSvgFull.svg) {
                        return UseDrawing.handleMouseUpResizing();
                      }
                      if (UseDrawing.drawSvg.svg) {
                        return UseDrawing.handleMouseUpResizing();
                      }
                      if (UseDrawing.isImgOverlay.img) {
                        return UseDrawing.handleMouseUpResizing();
                      }
                      if (UseDrawing.isSelectArea) {
                        return UseDrawing.handleMouseUp();
                      }
                      return UseDrawing.handleMouseUpGrabScroll();
                    }}
                    onMouseLeave={() => {
                      if (UseDrawing.isDrawingNowCanvas.id !== null) {
                        UseDrawing.DrawCanvasImg();
                        return UseDrawing.stopDrawingNowCanvas();
                      }
                      if (UseDrawing.textCanvasVisible) {
                        return UseDrawing.handleMouseUpResizing();
                      }
                      if (UseDrawing.isMenuOpen === 11) {
                        return UseDrawing.handleMouseUpResizing();
                      }
                      if (UseDrawing.isMenuOpen === 5) {
                        return UseDrawing.handleMouseUpResizing();
                      }
                      if (UseDrawing.isFormCanvasVisible) {
                        return UseDrawing.handleMouseUpResizing();
                      }
                      if (UseDrawing.drawSvgFull.svg) {
                        return UseDrawing.handleMouseUpResizing();
                      }
                      if (UseDrawing.drawSvg.svg) {
                        return UseDrawing.handleMouseUpResizing();
                      }
                      if (UseDrawing.isImgOverlay.img) {
                        return UseDrawing.handleMouseUpResizing();
                      }
                      if (UseDrawing.isSelectArea) {
                        return UseDrawing.handleMouseUp();
                      }
                      return UseDrawing.handleMouseUpGrabScroll();
                    }}
                  >
                    <PagePopover {...UseDrawing} />
                    <div
                      ref={UseDrawing.captureRef}
                      className="my-auto mx-auto drawing-css-bg-main-tranparent"
                      style={{
                        background:
                          UseDrawing.drawingExpandImg.expand === 0
                            ? "none"
                            : UseDrawing.drawingExpandImg.bgType ===
                              "bgTransparent"
                            ? ""
                            : UseDrawing.drawingExpandImg.bgType ===
                                "bgActiveImage" ||
                              UseDrawing.drawingExpandImg.bgType ===
                                "bgActiveColor"
                            ? "none"
                            : "",
                        width: "100%",
                        height: "100%",
                        minHeight: hExpand,
                        minWidth: wExpand,
                        maxHeight: hExpand,
                        maxWidth: wExpand,
                        padding:
                          (UseDrawing.drawingExpandImg.expand / 2) *
                          UseDrawing.zoom[0],
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
                              left: Math.min(
                                UseDrawing.startX,
                                UseDrawing.endX
                              ),
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
                          transformOrigin: "left top",
                          width: "max-content",
                          height: "max-content",
                          //padding: 20,
                        }}
                      >
                        <DrawingBlanket {...UseDrawing} />
                        {UseDrawing.isDrawingNowCanvas.id === null && (
                          <DrawingArea
                            {...UseDrawing}
                            expand={UseDrawing.drawingExpandImg.expand}
                            zIndex={null}
                          />
                        )}
                        <CropArea {...UseDrawing} />
                        <CropPreArea {...UseDrawing} />
                        {/*<TextEditDrawing {...UseDrawing} />*/}
                        {/*<Benchmark {...UseDrawing} />*/}
                        <OverlayArea {...UseDrawing} />
                        {UseDrawing?.isDrawingSetting.separatorBorder ===
                          "3x3" && (
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
                        {UseDrawing?.isDrawingSetting.separatorBorder ===
                          "2x2" && (
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
                        {UtilsComponents.handleBorder(
                          "#ffd500",
                          UseDrawing.isMenuOpen === 5 ||
                            UseDrawing?.isImgBorderOn,
                          UseDrawing?.isImageSize.w,
                          UseDrawing?.isImageSize.h,
                          UseDrawing.zoom[0],
                          0
                        )}
                        {UtilsComponents.handleBorder(
                          "#ff0000",
                          UseDrawing.drawingExpandImg.expand > 0 &&
                            UseDrawing?.isImgBorderOn,
                          UseDrawing?.isImageSize.w +
                            UseDrawing.drawingExpandImg.expand,
                          UseDrawing?.isImageSize.h +
                            UseDrawing.drawingExpandImg.expand,
                          UseDrawing.zoom[0],
                          -UseDrawing.drawingExpandImg.expand / 2
                        )}
                        <OverlayAreaSaveItems {...UseDrawing} />
                        {UseDrawing?.systemShadow.type.insetImg && (
                          <div
                            ref={UseDrawing?.insetImgRef}
                            className="bounce-open"
                            style={{
                              zIndex: 10,
                              position: "absolute",
                              left: 0,
                              top: 0,
                              width: `${UseDrawing?.isImageSize.w}px`,
                              height: `${UseDrawing?.isImageSize.h}px`,
                              boxShadow: `${0}px ${0}px ${Math.min(
                                UseDrawing?.systemShadow.opacity.opacityImg,
                                4
                              )}px ${Math.min(
                                UseDrawing?.systemShadow.size.sizeImg,
                                2
                              )}px ${
                                UseDrawing?.systemShadow.color.colorImg
                              },inset
                        ${0}px ${0}px ${0}px ${Math.min(
                                UseDrawing?.systemShadow.size.sizeImg / 2,
                                2
                              )}px ${UseDrawing?.systemShadow.color.colorImg}
                        ,inset ${0}px ${0}px ${
                                UseDrawing?.systemShadow.opacity.opacityImg
                              }px ${UseDrawing?.systemShadow.size.sizeImg}px ${
                                UseDrawing?.systemShadow.color.colorImg
                              }`,
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          />
                        )}
                        {UseDrawing?.systemShadow.type.insetExpand && (
                          <div
                            ref={UseDrawing?.insetExpandRef}
                            className="bounce-open"
                            style={{
                              zIndex: 100,
                              position: "absolute",
                              left: UseDrawing?.systemShadow.type.insetExpand
                                ? -(UseDrawing.drawingExpandImg.expand / 2)
                                : 0,
                              top: UseDrawing?.systemShadow.type.insetExpand
                                ? -(UseDrawing.drawingExpandImg.expand / 2)
                                : 0,
                              width: `${
                                UseDrawing?.systemShadow.type.insetExpand
                                  ? UseDrawing?.isImageSize.w +
                                    UseDrawing.drawingExpandImg.expand
                                  : UseDrawing?.isImageSize.w
                              }px`,
                              height: `${
                                UseDrawing?.systemShadow.type.insetExpand
                                  ? UseDrawing?.isImageSize.h +
                                    UseDrawing.drawingExpandImg.expand
                                  : UseDrawing?.isImageSize.h
                              }px`,

                              boxShadow: `${0}px ${0}px ${Math.min(
                                UseDrawing?.systemShadow.opacity.opacityExpand,
                                4
                              )}px ${Math.min(
                                UseDrawing?.systemShadow.size.sizeExpand,
                                2
                              )}px ${
                                UseDrawing?.systemShadow.color.colorExpand
                              },
                        inset
                        ${0}px ${0}px ${0}px ${Math.min(
                                UseDrawing?.systemShadow.size.sizeExpand / 2,
                                2
                              )}px ${UseDrawing?.systemShadow.color.colorExpand}
                        ,inset ${0}px ${0}px ${
                                UseDrawing?.systemShadow.opacity.opacityExpand
                              }px ${
                                UseDrawing?.systemShadow.size.sizeExpand
                              }px ${
                                UseDrawing?.systemShadow.color.colorExpand
                              }`,
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          />
                        )}
                        {UseDrawing?.systemShadow.type.outsideImg && (
                          <div
                            ref={UseDrawing?.colorOutsideImgRef}
                            className="bounce-open"
                            style={{
                              zIndex: 10,
                              position: "absolute",
                              left: 0,
                              top: 0,
                              width: `${UseDrawing?.isImageSize.w}px`,
                              height: `${UseDrawing?.isImageSize.h}px`,

                              boxShadow: `${
                                UseDrawing?.systemShadow.width.OutsideImgWidth
                              }px ${
                                UseDrawing?.systemShadow.height.OutsideImgHeight
                              }px ${Math.min(
                                UseDrawing?.systemShadow.opacity
                                  .opacityOutsideImg,
                                4
                              )}px ${Math.min(
                                UseDrawing?.systemShadow.size.sizeOutsideImg,
                                2
                              )}px ${
                                UseDrawing?.systemShadow.color.colorOutsideImg
                              },
                        ${UseDrawing?.systemShadow.width.OutsideImgWidth}px ${
                                UseDrawing?.systemShadow.height.OutsideImgHeight
                              }px ${0}px ${Math.min(
                                UseDrawing?.systemShadow.size.sizeOutsideImg /
                                  2,
                                2
                              )}px ${
                                UseDrawing?.systemShadow.color.colorOutsideImg
                              }
                        , ${UseDrawing?.systemShadow.width.OutsideImgWidth}px ${
                                UseDrawing?.systemShadow.height.OutsideImgHeight
                              }px ${
                                UseDrawing?.systemShadow.opacity
                                  .opacityOutsideImg
                              }px ${
                                UseDrawing?.systemShadow.size.sizeOutsideImg
                              }px ${
                                UseDrawing?.systemShadow.color.colorOutsideImg
                              }`,
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          />
                        )}
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
                          <img
                            ref={UseDrawing?.imageRef}
                            src={UseDrawing?.isNewImage?.img}
                            alt="logo"
                            //onMouseDown={(e) => e.preventDefault()}
                            onDragStart={(e) => e.preventDefault()}
                            onContextMenu={(e) => e.preventDefault()}
                            style={{
                              width: UseDrawing.isImageSize.w,
                              height: UseDrawing.isImageSize.h,
                            }}
                          />
                        </div>
                        {UseDrawing?.drawingExpandImg.bgType !==
                          "bgTransparent" && (
                          <div
                            ref={UseDrawing?.expandDivRef}
                            style={{
                              zIndex: -10,
                              position: "absolute",
                              left: -(UseDrawing.drawingExpandImg.expand / 2),
                              top: -(UseDrawing.drawingExpandImg.expand / 2),
                              width: `${
                                UseDrawing?.isImageSize.w +
                                UseDrawing.drawingExpandImg.expand
                              }px`,
                              height: `${
                                UseDrawing?.isImageSize.h +
                                UseDrawing.drawingExpandImg.expand
                              }px`,
                              ...(UseDrawing?.drawingExpandImg.bgType ===
                                "bgActiveColor" && {
                                backgroundColor:
                                  UseDrawing?.drawingExpandImg.bgColor,
                              }),
                              ...(UseDrawing?.drawingExpandImg.bgType ===
                                "bgActiveImage" && {
                                backgroundImage: `url(${
                                  UseDrawing?.drawingExpandImg?.bgExpand ||
                                  UseDrawing?.isNewImage?.img
                                })`,
                                backgroundSize: "cover",
                                backgroundPosition: "50% 50%",
                                backgroundRepeat: "no-repeat",
                                filter: `
                           brightness(${UseDrawing.drawingExpandImg.expandFilter?.brightness}%)
                           contrast(${UseDrawing.drawingExpandImg.expandFilter?.contrast}%)
                           saturate(${UseDrawing.drawingExpandImg.expandFilter?.saturation}%)
                           sepia(${UseDrawing.drawingExpandImg.expandFilter?.sepia}%)
                           hue-rotate(${UseDrawing.drawingExpandImg.expandFilter?.hue}deg)
                           blur(${UseDrawing.drawingExpandImg.expandFilter?.blur}px)
                           grayscale(${UseDrawing.drawingExpandImg.expandFilter?.grayscale}%)
                           invert(${UseDrawing.drawingExpandImg.expandFilter?.invert}%)
                          `,
                                transition: "300ms",
                              }),
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <DrawingSidebarTools {...UseDrawing} />
                </>
              </div>
            </div>
          </>
        ) : (
          <video
            className="w-screen h-screen object-cover pt-[60px] pb-[60px]"
            autoPlay={true}
            muted
            loop
          >
            <source
              src="/assets/videos/artvibe-studio/691452_bg.mp4"
              type="video/mp4"
            />
          </video>
        )}

        {/*<AlertPing
          alertHidden={UseDrawing.isMenuLayer?.menu}
          alertStart={handleAlertStart}
          onClickRef={UseDrawing.drawingSidebarToolsButtonRef.current}
        />*/}

        <div className="fixed bottom-0 flex justify-center bg-[#0d0d0d] h-[60px] w-full z-[3000]">
          <div className="flex justify-between items-center w-[98%]">
            <Card className="bg-inherit border-none">
              <CardContent className="flex p-1 gap-4">
                <div className="flex items-center gap-1 p-1 h-[40px] overflow-hidden">
                  <HoverCard>
                    <HoverCardTrigger className="flex items-center justify-center">
                      <LuGauge className="text-green-500" />
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <div className="text-[13px]">Optimization: ...</div>
                      <div
                        className="flex items-center text-[12px] text-blue-500 hover:underline"
                        onClick={() => {
                          UseDrawing.setMenuOpen(7);
                        }}
                      >
                        Change the app optimization as needed in params{" "}
                        <LuArrowUpRightSquare className="ml-2" />
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  <Separator className="mx-4" orientation="vertical" />
                  <HoverCard>
                    <HoverCardTrigger className="flex items-center justify-center">
                      <LuSearchCode className="text-blue-500" />
                      <div className="w-[40px] h-[40px] flex items-center justify-center text-gray-500 text-[12px] font-bold">
                        {UseDrawing.isDrawingSetting.maxZoom}x
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <div className="text-[13px]">Maximum: ...</div>
                      <div
                        className="flex items-center text-[12px] text-blue-500 hover:underline"
                        onClick={() => {
                          UseDrawing.setMenuOpen(7);
                        }}
                      >
                        Change the maximum zoom in params{" "}
                        <LuArrowUpRightSquare className="ml-2" />
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  <Separator className="mx-4" orientation="vertical" />
                  <LuFrame className="text-amber-400" />{" "}
                  <div className="w-[40px] h-[40px] flex items-center justify-center text-gray-500 text-[12px] font-bold">
                    {UseDrawing.isImageSize.w +
                      UseDrawing?.drawingExpandImg.expand}
                  </div>
                  x{" "}
                  <div className="w-[40px] h-[40px] flex items-center justify-center text-gray-500 text-[12px] font-bold ">
                    {UseDrawing.isImageSize.h +
                      UseDrawing?.drawingExpandImg.expand}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex w-full items-center max-w-[450px]">
              <Popover>
                <PopoverTrigger className="p-2 rounded" asChild>
                  <Button variant="ghost" size="icon">
                    <LuSettings2 className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="mb-1">File :</div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant={"secondary"}
                      onClick={() => {
                        UseDrawing.setFileDialogOpen(
                          (prevState: FileDialogOpen) => ({
                            ...prevState,
                            lastImport: !prevState.lastImport,
                          })
                        );
                      }}
                    >
                      <LuFolder className="h-4 w-4 mr-4" /> File...
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
                      <LuMousePointer className="h-4 w-4 mr-4" /> Selector
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
                      <LuBoxSelect className="h-4 w-4 mr-4" /> img border
                    </Button>
                  </div>
                  <Separator className="my-4" />
                  <div className="mb-1">Separator :</div>
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => {
                        UseDrawing.setDrawingSetting(
                          (prevState: DrawingSetting) => ({
                            ...prevState,
                            separatorBorder:
                              prevState.separatorBorder === "3x3"
                                ? "none"
                                : "3x3",
                          })
                        );
                      }}
                      variant={
                        UseDrawing?.isDrawingSetting.separatorBorder === "3x3"
                          ? "activeBlue"
                          : "outline"
                      }
                    >
                      <FaTableCells className="h-4 w-4 mr-4" /> 3 x 3
                    </Button>
                    <Button
                      onClick={() => {
                        UseDrawing.setDrawingSetting(
                          (prevState: DrawingSetting) => ({
                            ...prevState,
                            separatorBorder:
                              prevState.separatorBorder === "2x2"
                                ? "none"
                                : "2x2",
                          })
                        );
                      }}
                      variant={
                        UseDrawing?.isDrawingSetting.separatorBorder === "2x2"
                          ? "activeBlue"
                          : "outline"
                      }
                    >
                      <FaTableCellsLarge className="h-4 w-4 mr-4" /> 2 x 2
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Slider
                className="ml-4 w-[300px]"
                defaultValue={UseDrawing.zoom}
                value={UseDrawing.zoom}
                onValueChange={UseDrawing.handleChange}
                min={0.02}
                max={UseDrawing.isDrawingSetting.maxZoom}
                step={0.000001}
                aria-label="input-slider"
                disabled={UseDrawing.isNewImage.id === 0}
              />
              <Button
                className="ml-2 mr-2 p-1 w-[100px]"
                variant="ghost"
                onClick={() => {
                  UseDrawing.setZoom(handleInitialZoom() || UseDrawing.zoom);
                }}
              >
                {(UseDrawing.zoom[0] * 200).toFixed(0)}%
                <LuSearch className="ml-1" />
              </Button>
              <Button
                variant={UseDrawing.isMenuLayer.menu ? "ghost" : "activeBlue"}
                size="icon"
                onClick={() => {
                  UseDrawing.setMenuLayer((prevState: any) => ({
                    ...prevState,
                    menu: !UseDrawing.isMenuLayer.menu,
                  }));
                }}
              >
                {UseDrawing.isMenuLayer.menu ? (
                  <LuPackageOpen className="h-4 w-4" />
                ) : (
                  <LuPackage className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <Input
          id="picture"
          type="file"
          ref={UseDrawing.fileInputRef}
          multiple={true}
          style={{ display: "none" }}
          accept="image/jpeg, image/png"
          onChange={UseDrawing.handleFileChangeImport}
        />

        <LastImport {...UseDrawing} />

        {UseDrawing.isDraggingDrop &&
          !UseDrawing.isFileDialogOpen.lastImport && (
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
                      <LuArrowDownToLine className="h-10 w-10 mb-2" />
                      <p className="text-2xl font-bold">
                        Glissez-déposez vos images ici
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </RemoveScroll>
    </div>
  );
}
