"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  filters,
  OverlayForm,
  StyleForm,
  SystemDefaultDrawing,
} from "@/public/assets/data/data";
import {
  DrawArea,
  DrawForm,
  DrawSvg,
  DrawSvgFull,
  DrawText,
  ExpandImg,
  IsNewOverlay,
  IsNewOverlaySave,
  LayerElement,
  LoadedImage,
  NewImageSize,
} from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaClone,
} from "react-icons/fa";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaArrowsLeftRight,
  FaArrowsUpDown,
  FaBold,
  FaCloudsmith,
  FaEllipsis,
  FaItalic,
  FaSliders,
  FaTrashCan,
  FaUnderline,
} from "react-icons/fa6";
import {
  LuArrowDownLeft,
  LuArrowDownRight,
  LuArrowDownToLine,
  LuArrowLeftToLine,
  LuArrowRightToLine,
  LuArrowUpLeft,
  LuArrowUpRight,
  LuArrowUpToLine,
  LuCircle,
  LuCopyPlus,
  LuFocus,
  LuFoldHorizontal,
  LuFoldVertical,
  LuImage,
  LuMoonStar,
  LuMoreHorizontal,
  LuMove,
  LuPaintBucket,
  LuRefreshCw,
  LuSliders,
  LuSmilePlus,
  LuSparkles,
  LuTextCursorInput,
} from "react-icons/lu";
import DrawingFilterSlider from "./filters/filter-sliders";
import DrawingFilterImg from "./filters/filter-img";
import AreaDirectionTools from "./area-tools/area-direction-tools";
import useUtilsDrawing from "../utils/utilsDrawing";
import { Textarea } from "@/components/ui/textarea";
import SvgComponents from "./area-tools/overlay/svg-file";
import SvgFullComponents from "./area-tools/overlay/svg-file-full";

interface DrawingPagePopoverProps {
  isImgOverlay: IsNewOverlay;
  overlayContextRef: MutableRefObject<HTMLDivElement | null>;
  isResizing: ResizeDirection;
  setImgOverlaySave: React.Dispatch<React.SetStateAction<any>>;
  setImgOverlay: React.Dispatch<React.SetStateAction<any>>;
  isImgOverlaySave: IsNewOverlaySave[];
  drawArea: DrawArea;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  isImageSize: NewImageSize;
  overlayContextPropoverRef: MutableRefObject<HTMLDivElement | null>;
  overlayFiltersRef: MutableRefObject<HTMLDivElement | null>;
  overlayToolsRef: MutableRefObject<HTMLDivElement | null>;
  startPosition: { x: number; y: number };
  handleResetImgOverlay: () => void;
  handleResetForm: () => void;
  handleSaveImgOverlay: (
    newImg?: string,
    form?: string,
    shadow?: number
  ) => void;
  handleSaveForm: () => void;
  zoom: number[];
  isDrawingLoad: LoadedImage;
  drawingExpandImg: ExpandImg;
  isFormCanvasVisible: string;
  setDrawForm: React.Dispatch<React.SetStateAction<any>>;
  setFormCanvasVisible: React.Dispatch<React.SetStateAction<any>>;
  drawForm: DrawForm;
  formDrawRef: MutableRefObject<HTMLDivElement | null>;
  overlayImgRef: MutableRefObject<HTMLDivElement | null>;
  overlayImgBgRef: MutableRefObject<HTMLDivElement | null>;
  isLayers: LayerElement[];
  setLayers: React.Dispatch<React.SetStateAction<any>>;
  textCanvasVisible: boolean;
  drawText: DrawText;
  handleResetText: () => void;
  setDrawText: React.Dispatch<React.SetStateAction<any>>;
  handleSaveText: () => void;
  setDrawSvg: React.Dispatch<React.SetStateAction<any>>;
  drawSvg: DrawSvg;
  handleResetSvg: () => void;
  handleSaveSvg: () => void;
  strokePathRef: MutableRefObject<SVGPathElement | null>;
  strokeRectRef: MutableRefObject<SVGRectElement | null>;
  strokeRectBgRef: MutableRefObject<SVGRectElement | null>;

  drawSvgFull: DrawSvgFull;
  setDrawSvgFull: React.Dispatch<React.SetStateAction<any>>;
  handleResetSvgFull: () => void;
  handleSaveSvgFull: () => void;
}

const PagePopover: React.FC<DrawingPagePopoverProps> = (props) => {
  const { rgbToHex } = useUtilsDrawing();

  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const colorInput2Ref = useRef<HTMLInputElement | null>(null);
  const handleButtonClickColor = (ref: any) => {
    if (ref) {
      ref.click();
    }
  };

  const handleStyleForm = (el: string) => {
    if (el === "line") return { background: "#ffffff", borderRadius: 0 };

    if (el === "squareFull") return { background: "#ffffff", borderRadius: 0 };
    if (el === "squareEmpty")
      return {
        boxShadow: `inset 0px 0px 0px ${2}px ${"#ffffff"}`,
        borderRadius: 0,
      };

    if (el === "squareRoundedFull")
      return { background: "#ffffff", borderRadius: 10 };
    if (el === "squareRoundedEmpty")
      return {
        boxShadow: `inset 0px 0px 0px ${2}px ${"#ffffff"}`,
        borderRadius: 10,
      };

    if (el === "circleFull")
      return { background: "#ffffff", borderRadius: 9999 };
    if (el === "circleEmpty")
      return {
        boxShadow: `inset 0px 0px 0px ${2}px ${"#ffffff"}`,
        borderRadius: 9999,
      };
  };

  const formBtnImg = props.isDrawingLoad?.defaultImage;
  const svgList = [
    {
      img: formBtnImg,
      svg: "square",
      crop: {
        x: 0,
        y: 0,
        size: 24,
      },
    },
    {
      img: formBtnImg,
      svg: "circle",
      crop: {
        x: 0,
        y: 0,
        size: 24,
      },
    },
    {
      img: formBtnImg,
      svg: "triangle",
      crop: {
        x: 0,
        y: 0,
        size: 24,
      },
    },
    {
      img: formBtnImg,
      svg: "cloud",
      crop: {
        x: 0,
        y: 0,
        size: 24,
      },
    },
    {
      img: formBtnImg,
      svg: "ticket",
      crop: {
        x: 0,
        y: 0,
        size: 24,
      },
    },
    {
      img: formBtnImg,
      svg: "droplet",
      crop: {
        x: 0,
        y: 0,
        size: 24,
      },
    },
    {
      img: formBtnImg,
      svg: "star",
      crop: {
        x: 0,
        y: 0,
        size: 24,
      },
    },
    {
      img: formBtnImg,
      svg: "heart",
      crop: {
        x: 0,
        y: 0,
        size: 24,
      },
    },
    {
      img: formBtnImg,
      svg: "hexagon",
      crop: {
        x: 0,
        y: 0,
        size: 24,
      },
    },
  ];

  const svgFullList = [
    {
      svg: "square-full",
      backgroundColor: "#ffffff",
      color: "#ffffff",
    },
    {
      svg: "circle-full",
      backgroundColor: "#ffffff",
      color: "#ffffff",
    },
    {
      svg: "triangle-full",
      backgroundColor: "#ffffff",
      color: "#ffffff",
    },
    {
      svg: "cloud-full",
      backgroundColor: "#ffffff",
      color: "#ffffff",
    },
    {
      svg: "ticket-full",
      backgroundColor: "#ffffff",
      color: "#ffffff",
    },
    {
      svg: "droplet-full",
      backgroundColor: "#ffffff",
      color: "#ffffff",
    },
    {
      svg: "star-full",
      backgroundColor: "#ffffff",
      color: "#ffffff",
    },
    {
      svg: "heart-full",
      backgroundColor: "#ffffff",
      color: "#ffffff",
    },
    {
      svg: "hexagon-full",
      backgroundColor: "#ffffff",
      color: "#ffffff",
    },
  ];

  const defaultColorSvg = (ref?: any) => {
    if (!ref) return "#000000";

    let color;
    if (ref) {
      color = rgbToHex(ref || "rgb(0, 0, 0)");
    }
    return color || "#000000";
  };

  const itemOn = props.isLayers?.find(
    (element: any) =>
      element.id === props.isImgOverlay.id ||
      element.id === props.drawForm.id ||
      element.id === props.drawText.id ||
      element.id === props.drawSvg.id ||
      element.id === props.drawSvgFull.id
  );

  if (
    props.isImgOverlay.img ||
    props.isFormCanvasVisible ||
    props.textCanvasVisible ||
    props.drawSvg.svg ||
    props.drawSvgFull.svg
  )
    return (
      <>
        <Card
          className="opacity-60 hover:opacity-100 open-element-page-melted"
          ref={props.overlayContextRef}
          style={{
            zIndex: 50,
            position: "absolute",
            left: "50%",
            bottom: props.isResizing ? "-100px" : "80px",
            width: props.isImgOverlay.img
              ? 400
              : props.isFormCanvasVisible
              ? 440
              : props.textCanvasVisible
              ? 370
              : props.drawSvg.svg
              ? 500
              : props.drawSvgFull.svg
              ? 500
              : 400,
            transform: "translateX(-50%)",
            transition: "500ms",
          }}
        >
          <CardContent className="flex justify-between p-1 gap-1">
            {(props.isImgOverlay.img !== "" ||
              props.isFormCanvasVisible !== "" ||
              props.textCanvasVisible !== false ||
              props.drawSvg.svg !== "" ||
              props.drawSvgFull.svg !== "") && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="p-2" size={"icon"}>
                    <LuCircle className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="m-[10px] opacity-50 hover:opacity-100 p-0"
                  ref={props.overlayContextPropoverRef}
                >
                  {props.isImgOverlay.img !== "" && (
                    <div className="grid grid-cols-2 gap-2 p-1">
                      {OverlayForm?.map((el, index) => (
                        <Button
                          key={index}
                          className="flex flex-col justify-center items-center h-full"
                          variant={
                            props.isImgOverlay.form === el.form
                              ? "secondary"
                              : "outline"
                          }
                          onClick={() => {
                            props.setImgOverlay({
                              ...props.isImgOverlay,
                              opacity: props.isImgOverlay.opacity,
                              form: el.form,
                              shadow: el.shadow,
                              img:
                                props.isImgOverlay.img ??
                                props.isDrawingLoad.defaultImage,
                            });
                          }}
                        >
                          <img
                            className="w-[85px] h-[85px] object-cover transition hover:scale-95"
                            style={el.imgStyle}
                            src={props.isImgOverlay.miniature}
                            alt=""
                          />
                        </Button>
                      ))}
                    </div>
                  )}
                  {props.isFormCanvasVisible !== "" && (
                    <div className="grid grid-cols-2 gap-2 p-1">
                      {StyleForm?.map((el, index) => (
                        <Button
                          key={index}
                          className="flex flex-col justify-center items-center h-full"
                          variant={
                            props.isFormCanvasVisible === el.form
                              ? "secondary"
                              : "ghost"
                          }
                          onClick={() => {
                            props.setFormCanvasVisible(el.form);
                          }}
                        >
                          <div
                            style={{
                              ...handleStyleForm(el.form),
                              width: el.w,
                              height: el.h,
                              borderRadius: el.borderRadius,
                            }}
                          />
                        </Button>
                      ))}
                    </div>
                  )}
                  {props.textCanvasVisible && (
                    <div className="grid gap-2 p-1">
                      <div className="grid grid-cols-4 gap-2 p-1">
                        <Button
                          className="flex flex-col justify-center items-center h-full"
                          variant={
                            props.drawText.textAlign === "start"
                              ? "activeBlue"
                              : "outline"
                          }
                          onClick={() => {
                            props.setDrawText((prevState: DrawText) => ({
                              ...prevState,
                              textAlign: "start",
                            }));
                          }}
                        >
                          <FaAlignLeft className="text-1xl" />
                        </Button>
                        <Button
                          className="flex flex-col justify-center items-center h-full"
                          variant={
                            props.drawText.textAlign === "center"
                              ? "activeBlue"
                              : "outline"
                          }
                          onClick={() => {
                            props.setDrawText((prevState: DrawText) => ({
                              ...prevState,
                              textAlign: "center",
                            }));
                          }}
                        >
                          <FaAlignCenter className="text-1xl" />
                        </Button>
                        <Button
                          className="flex flex-col justify-center items-center h-full"
                          variant={
                            props.drawText.textAlign === "justify"
                              ? "activeBlue"
                              : "outline"
                          }
                          onClick={() => {
                            props.setDrawText((prevState: DrawText) => ({
                              ...prevState,
                              textAlign: "justify",
                            }));
                          }}
                        >
                          <FaAlignJustify className="text-1xl" />
                        </Button>
                        <Button
                          className="flex flex-col justify-center items-center h-full"
                          variant={
                            props.drawText.textAlign === "end"
                              ? "activeBlue"
                              : "outline"
                          }
                          onClick={() => {
                            props.setDrawText((prevState: DrawText) => ({
                              ...prevState,
                              textAlign: "end",
                            }));
                          }}
                        >
                          <FaAlignRight className="text-1xl" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-2 p-1">
                        <Button
                          className="flex flex-col justify-center items-center h-full"
                          variant={"outline"}
                        >
                          <FaBold className="text-1xl" />
                        </Button>
                        <Button
                          className="flex flex-col justify-center items-center h-full"
                          variant={"outline"}
                        >
                          <FaUnderline className="text-1xl" />
                        </Button>
                        <Button
                          className="flex flex-col justify-center items-center h-full"
                          variant={"outline"}
                        >
                          <FaItalic className="text-1xl" />
                        </Button>
                      </div>
                    </div>
                  )}
                  {props.drawSvg.svg !== "" && (
                    <>
                      <div className="grid grid-cols-3 gap-2 p-1">
                        {svgList?.map((el, index) => (
                          <Button
                            key={index}
                            className="flex flex-col justify-center items-center h-full"
                            variant="ghost"
                            onClick={() => {
                              if (props.isFormCanvasVisible !== "") {
                                props.handleSaveForm();
                                props.handleResetForm();
                              }
                              if (props.isImgOverlay.img) {
                                props.handleSaveImgOverlay();
                                props.handleResetImgOverlay();
                              }
                              props.setDrawSvg((prevState: DrawSvg) => ({
                                ...prevState,
                                svg: el.svg,
                                img: props.drawSvg.img
                                  ? props.drawSvg.img
                                  : formBtnImg,
                              }));
                              if (!props.drawSvg.img) {
                                const size =
                                  props.isImageSize.w < props.isImageSize.h
                                    ? props.isImageSize.w
                                    : props.isImageSize.h;
                                props.setDrawArea({
                                  width: size / 2,
                                  height: size / 2,
                                  leftOffset: 0,
                                  topOffset: 0,
                                  positionX: props.isImageSize.w / 2 - size / 4,
                                  positionY: props.isImageSize.h / 2 - size / 4,
                                  rotate: 0,
                                });
                              }
                            }}
                          >
                            <SvgComponents
                              drawSvg={el}
                              strokeRectRef={null}
                              strokePathRef={null}
                            />
                          </Button>
                        ))}
                      </div>
                      <Separator className="my-4" />
                      <div className="grid grid-cols-1 gap-2 p-4">
                        <div className="text-1xl flex justify-between items-center">
                          postion y: {props.drawSvg.crop.y}%
                          <LuRefreshCw
                            className="h-4 w-4 cursor-pointer hover:animate-spin"
                            onClick={() => {
                              props.setDrawSvg((prevState: DrawSvg) => ({
                                ...prevState,
                                crop: {
                                  ...prevState.crop,
                                  y: 0,
                                },
                              }));
                            }}
                          />
                        </div>
                        <Slider
                          onValueChange={(e) => {
                            props.setDrawSvg((prevState: DrawSvg) => ({
                              ...prevState,
                              crop: {
                                ...prevState.crop,
                                y: e[0],
                              },
                            }));
                          }}
                          value={[props.drawSvg.crop.y]}
                          max={props.drawSvg.crop.size}
                          min={-props.drawSvg.crop.size}
                          step={1}
                        />
                        <Separator className="my-0" />
                        <div className="text-1xl flex justify-between items-center">
                          postion x: {props.drawSvg.crop.x}%
                          <LuRefreshCw
                            className="h-4 w-4 cursor-pointer hover:animate-spin"
                            onClick={() => {
                              props.setDrawSvg((prevState: DrawSvg) => ({
                                ...prevState,
                                crop: {
                                  ...prevState.crop,
                                  x: 0,
                                },
                              }));
                            }}
                          />
                        </div>
                        <Slider
                          onValueChange={(e) => {
                            props.setDrawSvg((prevState: DrawSvg) => ({
                              ...prevState,
                              crop: {
                                ...prevState.crop,
                                x: e[0],
                              },
                            }));
                          }}
                          value={[props.drawSvg.crop.x]}
                          max={props.drawSvg.crop.size}
                          min={-props.drawSvg.crop.size}
                          step={1}
                        />
                        <Separator className="my-0" />
                        <div className="text-1xl flex justify-between items-center">
                          Size: {props.drawSvg.crop.size}%
                          <LuRefreshCw
                            className="h-4 w-4 cursor-pointer hover:animate-spin"
                            onClick={() => {
                              props.setDrawSvg((prevState: DrawSvg) => ({
                                ...prevState,
                                crop: {
                                  ...prevState.crop,
                                  size: 24,
                                },
                              }));
                            }}
                          />
                        </div>
                        <Slider
                          onValueChange={(e) => {
                            props.setDrawSvg((prevState: DrawSvg) => ({
                              ...prevState,
                              crop: {
                                ...prevState.crop,
                                size: e[0],
                              },
                            }));
                          }}
                          value={[props.drawSvg.crop.size]}
                          max={100}
                          step={1}
                        />
                      </div>
                    </>
                  )}
                  {props.drawSvgFull.svg !== "" && (
                    <div className="grid grid-cols-3 gap-2 p-1">
                      {svgFullList?.map((el, index) => (
                        <Button
                          key={index}
                          className="flex flex-col justify-center items-center h-full"
                          variant="ghost"
                          onClick={() => {
                            if (props.isFormCanvasVisible !== "") {
                              props.handleSaveForm();
                              props.handleResetForm();
                            }
                            if (props.isImgOverlay.img) {
                              props.handleSaveImgOverlay();
                              props.handleResetImgOverlay();
                            }
                            if (props.drawSvg.svg) {
                              props.handleSaveSvg();
                              props.handleResetSvg();
                            }
                            props.setDrawSvgFull((prevState: DrawSvgFull) => ({
                              ...prevState,
                              svg: el.svg,
                            }));
                            if (!props.drawSvgFull.svg) {
                              const size =
                                props.isImageSize.w < props.isImageSize.h
                                  ? props.isImageSize.w
                                  : props.isImageSize.h;
                              props.setDrawArea({
                                width: size / 2,
                                height: size / 2,
                                leftOffset: 0,
                                topOffset: 0,
                                positionX: props.isImageSize.w / 2 - size / 4,
                                positionY: props.isImageSize.h / 2 - size / 4,
                                rotate: 0,
                              });
                            }
                          }}
                        >
                          <SvgFullComponents
                            drawSvgFull={el}
                            strokeRectBgRef={null}
                            strokeRectRef={null}
                            strokePathRef={null}
                          />
                        </Button>
                      ))}
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            )}

            {(props.isImgOverlay.img !== "" || props.drawSvg.svg !== "") && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size={"icon"}>
                    <LuSliders className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="opacity-30 hover:opacity-100 p-0"
                  ref={props.overlayFiltersRef}
                >
                  {props.isImgOverlay.img !== "" && (
                    <>
                      <ScrollArea className="h-[200px] w-full p-4">
                        <div className="w-full grid grid-cols-3 gap-2">
                          <DrawingFilterImg
                            setSystemSetting={props.setImgOverlay}
                            defaultImg={props.isImgOverlay.miniature}
                            inSide
                          />
                        </div>
                      </ScrollArea>
                      <Separator className="my-2" />
                      <ScrollArea className="h-[200px] w-full p-4">
                        <DrawingFilterSlider
                          setSystemSetting={props.setImgOverlay}
                          systemSetting={props.isImgOverlay.filter}
                          inSide
                        />
                      </ScrollArea>
                    </>
                  )}
                  {props.drawSvg.svg !== "" && (
                    <>
                      <ScrollArea className="h-[200px] w-full p-4">
                        <div className="w-full grid grid-cols-3 gap-2">
                          <DrawingFilterImg
                            setSystemSetting={props.setDrawSvg}
                            defaultImg={props.drawSvg.img}
                            inSide
                          />
                        </div>
                      </ScrollArea>
                      <Separator className="my-2" />
                      <ScrollArea className="h-[200px] w-full p-4">
                        <DrawingFilterSlider
                          setSystemSetting={props.setDrawSvg}
                          systemSetting={props.drawSvg.filter}
                          inSide
                        />
                      </ScrollArea>
                    </>
                  )}
                </PopoverContent>
              </Popover>
            )}
            <AreaDirectionTools {...props} itemOn={itemOn} />
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                if (props.isImgOverlay.img !== "") {
                  if (props.isImgOverlay.id !== 0) {
                    props.handleSaveImgOverlay();
                    props.setImgOverlay((prevState: IsNewOverlay) => ({
                      ...prevState,
                      type: "overlay",
                      id: 0,
                    }));
                  } else {
                    props.handleSaveImgOverlay();
                  }
                }
                if (props.isFormCanvasVisible !== "") {
                  props.handleSaveForm();
                  props.setDrawForm((prevState: any) => ({
                    ...prevState,
                    id: 0,
                  }));
                }
                if (props.textCanvasVisible) {
                  props.handleSaveText();
                  props.setDrawText((prevState: any) => ({
                    ...prevState,
                    id: 0,
                  }));
                }
                if (props.drawSvg.svg !== "") {
                  props.handleSaveSvg();
                  props.setDrawSvg((prevState: DrawSvg) => ({
                    ...prevState,
                    id: 0,
                  }));
                }
                if (props.drawSvgFull.svg !== "") {
                  props.handleSaveSvgFull();
                  props.setDrawSvgFull((prevState: DrawSvg) => ({
                    ...prevState,
                    id: 0,
                  }));
                }
                props.setDrawArea({
                  width: props.drawArea.width,
                  height: props.drawArea.height,
                  leftOffset: props.drawArea.leftOffset,
                  topOffset: props.drawArea.topOffset,
                  rotate: props.drawArea.rotate,
                  positionX: props.drawArea.positionX + 20,
                  positionY: props.drawArea.positionY + 20,
                });
              }}
            >
              <LuCopyPlus className="h-4 w-4" />
            </Button>
            {props.drawSvgFull.svg && (
              <>
                <Separator className="h-[40px]" orientation="vertical" />
                <Button
                  className="flex flex-col justify-center items-center h-full rounded-full h-[40px] w-[40px] hue-background"
                  variant="ghost"
                  onClick={() => {
                    handleButtonClickColor(colorInput2Ref.current);
                  }}
                  size={"icon"}
                  onBlur={() => {
                    if (colorInput2Ref?.current) {
                      let color = colorInput2Ref.current.value;

                      console.log(color);

                      props.setDrawSvgFull((prevState: DrawSvgFull) => ({
                        ...prevState,
                        color: color,
                      }));
                    }
                  }}
                >
                  <LuImage className="h-5 w-5" />
                  <input
                    ref={colorInput2Ref}
                    className="appearance-none cursor-pointer"
                    onChange={(e) => {
                      if (
                        props.strokeRectBgRef &&
                        props.strokeRectBgRef.current
                      ) {
                        props.strokeRectBgRef.current.style.fill =
                          e.target.value;
                      }
                    }}
                    value={defaultColorSvg(
                      props.strokeRectBgRef.current?.style.fill
                    )}
                    style={{
                      background: "none",
                      opacity: 0,
                      zIndex: -1,
                      width: 0,
                      height: 0,
                    }}
                    type="color"
                    name=""
                    id=""
                  />
                </Button>
              </>
            )}
            {props.isImgOverlay.img !== "" && (
              <>
                <Separator className="h-[40px]" orientation="vertical" />
                <Button
                  className="flex flex-col justify-center items-center h-full rounded-full h-[40px] w-[40px]"
                  variant="ghost"
                  onClick={() => {
                    handleButtonClickColor(colorInputRef.current);
                  }}
                  style={{
                    background: props.isImgOverlay.borderColor || "#000000",
                  }}
                  disabled={
                    props.isImgOverlay.form === "square" ||
                    props.isImgOverlay.form === "squareRounded" ||
                    props.isImgOverlay.form === "circle"
                  }
                  size={"icon"}
                  onBlur={() => {
                    if (colorInputRef?.current) {
                      let color = colorInputRef.current.value;
                      props.setImgOverlay((prevState: any) => ({
                        ...prevState,
                        borderColor: color,
                      }));
                    }
                  }}
                >
                  <LuMoonStar className="h-5 w-5" />
                  <input
                    ref={colorInputRef}
                    defaultValue={props.isImgOverlay.borderColor || "#000000"}
                    className="appearance-none cursor-pointer"
                    style={{
                      background: "none",
                      opacity: 0,
                      zIndex: -1,
                      width: 0,
                      height: 0,
                    }}
                    onChange={(e) => {
                      if (
                        props.overlayImgRef?.current &&
                        props.overlayImgBgRef?.current
                      ) {
                        props.overlayImgRef.current.style.boxShadow = `0px 0px 15px 8px ${e.target.value}`;
                        props.overlayImgBgRef.current.style.background =
                          e.target.value;
                      }
                    }}
                    type="color"
                    name=""
                    id=""
                  />
                </Button>
              </>
            )}
            {props.isFormCanvasVisible !== "" && (
              <>
                <Separator className="h-[40px]" orientation="vertical" />
                <Button
                  className="flex flex-col justify-center items-center h-full rounded-full h-[40px] w-[40px] hue-background"
                  variant="ghost"
                  onClick={() => {
                    handleButtonClickColor(colorInputRef.current);
                  }}
                  size={"icon"}
                >
                  <LuPaintBucket className="h-5 w-5" />
                  <input
                    ref={colorInputRef}
                    value={
                      props.formDrawRef?.current
                        ? rgbToHex(
                            props.formDrawRef.current.style.background ||
                              "rgb(0,0,0)"
                          )
                        : "#000000"
                    }
                    className="appearance-none cursor-pointer"
                    style={{
                      background: "none",
                      opacity: 0,
                      zIndex: -1,
                      width: 0,
                      height: 0,
                    }}
                    onChange={(e) => {
                      if (props.formDrawRef?.current) {
                        if (
                          props.isFormCanvasVisible === "squareEmpty" ||
                          props.isFormCanvasVisible === "squareRoundedEmpty" ||
                          props.isFormCanvasVisible === "circleEmpty"
                        ) {
                          return (props.formDrawRef.current.style.boxShadow = `inset 0px 0px 0px ${props.drawForm.thickness}px ${e.target.value}`);
                        }
                        props.formDrawRef.current.style.background =
                          e.target.value;
                      }
                    }}
                    type="color"
                    name=""
                    id=""
                  />
                </Button>
              </>
            )}
            {props.textCanvasVisible && (
              <Button
                className="flex flex-col justify-center items-center h-full rounded-full h-[40px] w-[40px] hue-background"
                variant={"outline"}
                onClick={() => {
                  handleButtonClickColor(colorInputRef.current);
                }}
                size={"icon"}
              >
                <LuPaintBucket className="h-5 w-5" />
                <input
                  ref={colorInputRef}
                  className="appearance-none cursor-pointer"
                  style={{
                    background: "none",
                    opacity: 0,
                    zIndex: -1,
                    width: 0,
                    height: 0,
                  }}
                  type="color"
                  name=""
                  id=""
                />
              </Button>
            )}
            {props.drawSvg.svg && (
              <>
                <Separator className="h-[40px]" orientation="vertical" />
                <Button
                  className="flex flex-col justify-center items-center h-full rounded-full h-[40px] w-[40px] hue-background"
                  variant="ghost"
                  onClick={() => {
                    handleButtonClickColor(colorInputRef.current);
                  }}
                  size={"icon"}
                  onBlur={() => {
                    if (colorInputRef?.current) {
                      let color = colorInputRef.current.value;

                      props.setDrawSvg((prevState: DrawSvg) => ({
                        ...prevState,
                        borderColor: color,
                      }));
                    }
                  }}
                >
                  <LuPaintBucket className="h-5 w-5" />
                  <input
                    ref={colorInputRef}
                    className="appearance-none cursor-pointer"
                    onChange={(e) => {
                      if (props.strokePathRef && props.strokePathRef.current) {
                        props.strokePathRef.current.style.stroke =
                          e.target.value;
                      }
                      if (props.strokeRectRef && props.strokeRectRef.current) {
                        props.strokeRectRef.current.style.stroke =
                          e.target.value;
                      }
                    }}
                    value={defaultColorSvg(
                      props.strokePathRef.current?.style.stroke ||
                        props.strokeRectRef.current?.style.stroke
                    )}
                    style={{
                      background: "none",
                      opacity: 0,
                      zIndex: -1,
                      width: 0,
                      height: 0,
                    }}
                    type="color"
                    name=""
                    id=""
                  />
                </Button>
              </>
            )}
            {props.drawSvgFull.svg && (
              <>
                <Separator className="h-[40px]" orientation="vertical" />
                <Button
                  className="flex flex-col justify-center items-center h-full rounded-full h-[40px] w-[40px] hue-background"
                  variant="ghost"
                  onClick={() => {
                    handleButtonClickColor(colorInputRef.current);
                  }}
                  size={"icon"}
                  onBlur={() => {
                    if (colorInputRef?.current) {
                      let color = colorInputRef.current.value;

                      props.setDrawSvgFull((prevState: DrawSvgFull) => ({
                        ...prevState,
                        borderColor: color,
                      }));
                    }
                  }}
                >
                  <LuPaintBucket className="h-5 w-5" />
                  <input
                    ref={colorInputRef}
                    className="appearance-none cursor-pointer"
                    onChange={(e) => {
                      if (props.strokePathRef && props.strokePathRef.current) {
                        props.strokePathRef.current.style.stroke =
                          e.target.value;
                      }
                      if (props.strokeRectRef && props.strokeRectRef.current) {
                        props.strokeRectRef.current.style.stroke =
                          e.target.value;
                      }
                    }}
                    value={defaultColorSvg(
                      props.strokePathRef.current?.style.stroke ||
                        props.strokeRectRef.current?.style.stroke
                    )}
                    style={{
                      background: "none",
                      opacity: 0,
                      zIndex: -1,
                      width: 0,
                      height: 0,
                    }}
                    type="color"
                    name=""
                    id=""
                  />
                </Button>
              </>
            )}

            {props.isFormCanvasVisible !== "" && (
              <div className="w-full max-w-[100px]">
                <div>thickness</div>
                <Slider
                  onValueChange={(e) => {
                    props.setDrawForm((prevState: any) => ({
                      ...prevState,
                      thickness: e[0],
                    }));
                  }}
                  defaultValue={[props.drawForm.thickness]}
                  value={[props.drawForm.thickness]}
                  disabled={
                    props.isFormCanvasVisible === "squareFull" ||
                    props.isFormCanvasVisible === "squareRoundedFull" ||
                    props.isFormCanvasVisible === "circleFull"
                  }
                  min={4}
                  max={100}
                  step={1}
                />
              </div>
            )}
            <div className="w-full max-w-[100px]">
              <div>opacity</div>
              <Slider
                onValueChange={(e) => {
                  if (props.isImgOverlay.img !== "") {
                    props.setImgOverlay((prevState: IsNewOverlay) => ({
                      ...prevState,
                      opacity: e[0],
                    }));
                  }

                  if (props.isFormCanvasVisible !== "") {
                    props.setDrawForm((prevState: DrawForm) => ({
                      ...prevState,
                      opacity: e[0],
                    }));
                  }
                  if (props.textCanvasVisible) {
                    props.setDrawText((prevState: DrawText) => ({
                      ...prevState,
                      opacity: e[0],
                    }));
                  }
                  if (props.drawSvg.svg !== "") {
                    props.setDrawSvg((prevState: DrawSvg) => ({
                      ...prevState,
                      opacity: e[0],
                    }));
                  }
                  if (props.drawSvgFull.svg !== "") {
                    props.setDrawSvgFull((prevState: DrawSvgFull) => ({
                      ...prevState,
                      opacity: e[0],
                    }));
                  }
                }}
                value={[
                  props.isImgOverlay.img !== ""
                    ? props.isImgOverlay.opacity
                    : props.isFormCanvasVisible !== ""
                    ? props.drawForm.opacity
                    : props.textCanvasVisible
                    ? props.drawText.opacity
                    : props.drawSvg.svg !== ""
                    ? props.drawSvg.opacity
                    : props.drawSvgFull.svg !== ""
                    ? props.drawSvgFull.opacity
                    : 0,
                ]}
                min={0.1}
                max={1.0}
                step={0.1}
              />
            </div>
            {(props.drawSvgFull.svg !== "" || props.drawSvg.svg !== "") && (
              <div className="w-full max-w-[100px]">
                <div>border</div>
                <Slider
                  onValueChange={(e) => {
                    if (props.drawSvgFull.svg !== "") {
                      props.setDrawSvgFull((prevState: DrawSvgFull) => ({
                        ...prevState,
                        thickness: e[0],
                      }));
                    }
                    if (props.drawSvg.svg !== "") {
                      props.setDrawSvg((prevState: DrawSvg) => ({
                        ...prevState,
                        thickness: e[0],
                      }));
                    }
                  }}
                  value={
                    props.drawSvgFull.svg
                      ? [props.drawSvgFull.thickness]
                      : props.drawSvg.svg
                      ? [props.drawSvg.thickness]
                      : [0]
                  }
                  min={0}
                  max={1}
                  step={0.1}
                />
              </div>
            )}
            <Separator className="h-[40px]" orientation="vertical" />
            <Button
              variant="ghost"
              size={"icon"}
              onClick={(e) => {
                e.stopPropagation();
                if (props.isImgOverlay.img !== "") {
                  props.handleResetImgOverlay();
                  if (props.isImgOverlay.id !== 0) {
                    props.setLayers((prevLayers: LayerElement[]) =>
                      prevLayers.filter(
                        (element: LayerElement) =>
                          element.id !== props.isImgOverlay.id
                      )
                    );
                  }
                }
                if (props.isFormCanvasVisible !== "") {
                  props.handleResetForm();
                  if (props.drawForm.id !== 0) {
                    props.setLayers((prevLayers: LayerElement[]) =>
                      prevLayers.filter(
                        (element: LayerElement) =>
                          element.id !== props.drawForm.id
                      )
                    );
                  }
                }
                if (props.textCanvasVisible) {
                  props.handleResetText();
                  if (props.drawText.id !== 0) {
                    props.setLayers((prevLayers: LayerElement[]) =>
                      prevLayers.filter(
                        (element: LayerElement) =>
                          element.id !== props.drawText.id
                      )
                    );
                  }
                }
                if (props.drawSvg.svg !== "") {
                  props.handleResetSvg();
                  if (props.drawSvg.id !== 0) {
                    props.setLayers((prevLayers: LayerElement[]) =>
                      prevLayers.filter(
                        (element: LayerElement) =>
                          element.id !== props.drawSvg.id
                      )
                    );
                  }
                }
                if (props.drawSvgFull.svg !== "") {
                  props.handleResetSvgFull();
                  if (props.drawSvgFull.id !== 0) {
                    props.setLayers((prevLayers: LayerElement[]) =>
                      prevLayers.filter(
                        (element: LayerElement) =>
                          element.id !== props.drawSvgFull.id
                      )
                    );
                  }
                }
              }}
            >
              <FaTrashCan className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </>
    );
  /*
  //props.isFormCanvasVisible
  if (null == null)
    return (
      <>
        <Card
          className="opacity-60 hover:opacity-100"
          ref={props.overlayContextRef}
          style={{
            zIndex: 50,
            position: "absolute",
            left: "50%",
            bottom: props.isResizing ? "-100px" : "80px",
            width: 460,
            transform: "translateX(-50%)",
            transition: "500ms",
          }}
        >
          <CardContent className="flex justify-between p-1 gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="p-2" size={"icon"}>
                  <LuCircle className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="m-[10px] opacity-50 hover:opacity-100 p-0"
                ref={props.overlayContextPropoverRef}
              >
                <div className="grid grid-cols-2 gap-2 p-1">
                  {StyleForm?.map((el, index) => (
                    <Button
                      key={index}
                      className="flex flex-col justify-center items-center h-full"
                      variant={
                        props.isFormCanvasVisible === el.form
                          ? "secondary"
                          : "ghost"
                      }
                      onClick={() => {
                        props.setFormCanvasVisible(el.form);
                      }}
                    >
                      <div
                        style={{
                          ...handleStyleForm(el.form),
                          width: el.w,
                          height: el.h,
                          borderRadius: el.borderRadius,
                        }}
                      />
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <AreaDirectionTools {...props} itemOn={itemOn} />
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                props.handleSaveForm();
                props.setDrawForm((prevState: any) => ({
                  ...prevState,
                  id: 0,
                }));
                props.setDrawArea({
                  width: props.drawArea.width,
                  height: props.drawArea.height,
                  leftOffset: props.drawArea.leftOffset,
                  topOffset: props.drawArea.topOffset,
                  rotate: props.drawArea.rotate,
                  positionX: props.drawArea.positionX + 20,
                  positionY: props.drawArea.positionY + 20,
                });
              }}
            >
              <LuCopyPlus className="h-4 w-4" />
            </Button>

            <Button
              className="flex flex-col justify-center items-center h-full rounded-full h-[40px] w-[40px] hue-background"
              variant="ghost"
              onClick={() => {
                handleButtonClickColor(colorInputRef.current);
              }}
              size={"icon"}
            >
              <LuPaintBucket className="h-5 w-5" />
              <input
                ref={colorInputRef}
                value={
                  props.formDrawRef?.current
                    ? rgbToHex(
                        props.formDrawRef.current.style.background ||
                          "rgb(0,0,0)"
                      )
                    : "#000000"
                }
                className="appearance-none cursor-pointer"
                style={{
                  background: "none",
                  opacity: 0,
                  zIndex: -1,
                  width: 0,
                  height: 0,
                }}
                onChange={(e) => {
                  if (props.formDrawRef?.current) {
                    if (
                      props.isFormCanvasVisible === "squareEmpty" ||
                      props.isFormCanvasVisible === "squareRoundedEmpty" ||
                      props.isFormCanvasVisible === "circleEmpty"
                    ) {
                      return (props.formDrawRef.current.style.boxShadow = `inset 0px 0px 0px ${props.drawForm.thickness}px ${e.target.value}`);
                    }
                    props.formDrawRef.current.style.background = e.target.value;
                  }
                }}
                type="color"
                name=""
                id=""
              />
            </Button>
            <div className="w-full max-w-[100px]">
              <div>thickness</div>
              <Slider
                onValueChange={(e) => {
                  props.setDrawForm((prevState: any) => ({
                    ...prevState,
                    thickness: e[0],
                  }));
                }}
                defaultValue={[props.drawForm.thickness]}
                value={[props.drawForm.thickness]}
                disabled={
                  props.isFormCanvasVisible === "squareFull" ||
                  props.isFormCanvasVisible === "squareRoundedFull" ||
                  props.isFormCanvasVisible === "circleFull"
                }
                min={4}
                max={100}
                step={1}
              />
            </div>
            <div className="w-full max-w-[100px]">
              <div>opacity</div>
              <Slider
                onValueChange={(e) => {
                  props.setDrawForm((prevState: any) => ({
                    ...prevState,
                    opacity: e[0],
                  }));
                }}
                defaultValue={[props.drawForm.opacity]}
                value={[props.drawForm.opacity]}
                min={0.1}
                max={1.0}
                step={0.1}
              />
            </div>
            <Separator className="h-[40px]" orientation="vertical" />
            <Button
              variant="ghost"
              size={"icon"}
              onClick={(e) => {
                e.stopPropagation();
                props.handleResetForm();
                if (props.drawForm.id !== 0) {
                  props.setLayers((prevLayers: LayerElement[]) =>
                    prevLayers.filter(
                      (element: LayerElement) =>
                        element.id !== props.drawForm.id
                    )
                  );
                }
              }}
            >
              <FaTrashCan className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </>
    );
  // props.textCanvasVisible
  if (null == null)
    return (
      <>
        <Card
          className="opacity-60 hover:opacity-100"
          ref={props.overlayContextRef}
          style={{
            zIndex: 50,
            position: "absolute",
            left: "50%",
            bottom: props.isResizing ? "-100px" : "80px",
            width: 410,
            transform: "translateX(-50%)",
            transition: "500ms",
          }}
        >
          <CardContent className="flex justify-between p-1 gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="p-2" size={"icon"}>
                  <LuTextCursorInput className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="m-[10px] opacity-50 hover:opacity-100 p-0"
                ref={props.overlayContextPropoverRef}
              >
                <div className="grid gap-2 p-1">
                  <div className="grid grid-cols-4 gap-2 p-1">
                    <Button
                      className="flex flex-col justify-center items-center h-full"
                      variant={
                        props.drawText.textAlign === "start"
                          ? "activeBlue"
                          : "outline"
                      }
                      onClick={() => {
                        props.setDrawText((prevState: DrawText) => ({
                          ...prevState,
                          textAlign: "start",
                        }));
                      }}
                    >
                      <FaAlignLeft className="text-1xl" />
                    </Button>
                    <Button
                      className="flex flex-col justify-center items-center h-full"
                      variant={
                        props.drawText.textAlign === "center"
                          ? "activeBlue"
                          : "outline"
                      }
                      onClick={() => {
                        props.setDrawText((prevState: DrawText) => ({
                          ...prevState,
                          textAlign: "center",
                        }));
                      }}
                    >
                      <FaAlignCenter className="text-1xl" />
                    </Button>
                    <Button
                      className="flex flex-col justify-center items-center h-full"
                      variant={
                        props.drawText.textAlign === "justify"
                          ? "activeBlue"
                          : "outline"
                      }
                      onClick={() => {
                        props.setDrawText((prevState: DrawText) => ({
                          ...prevState,
                          textAlign: "justify",
                        }));
                      }}
                    >
                      <FaAlignJustify className="text-1xl" />
                    </Button>
                    <Button
                      className="flex flex-col justify-center items-center h-full"
                      variant={
                        props.drawText.textAlign === "end"
                          ? "activeBlue"
                          : "outline"
                      }
                      onClick={() => {
                        props.setDrawText((prevState: DrawText) => ({
                          ...prevState,
                          textAlign: "end",
                        }));
                      }}
                    >
                      <FaAlignRight className="text-1xl" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-1">
                    <Button
                      className="flex flex-col justify-center items-center h-full"
                      variant={"outline"}
                    >
                      <FaBold className="text-1xl" />
                    </Button>
                    <Button
                      className="flex flex-col justify-center items-center h-full"
                      variant={"outline"}
                    >
                      <FaUnderline className="text-1xl" />
                    </Button>
                    <Button
                      className="flex flex-col justify-center items-center h-full"
                      variant={"outline"}
                    >
                      <FaItalic className="text-1xl" />
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="gradient-animated5"
                  variant="outline"
                  size={"icon"}
                >
                  <LuSparkles className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="grid grid-cols-1 gap-4 m-[10px] opacity-50 hover:opacity-100">
                <div className="flex w-full items-center justify-center">
                  <div className="grid w-full max-w-sm gap-2">
                    <Textarea
                      className="h-[100px]"
                      style={{ resize: "none" }}
                      placeholder="Type your request here."
                      disabled
                    />
                    <Button className="gradient-animated5" disabled>
                      Send your request
                    </Button>
                  </div>
                </div>
                <Separator className="my-0" />
                <div className="text-neutral-500 text-sm">
                  Attention : L'utilisation de cette fonctionnalité
                  d'intelligence artificielle nécessitera des gems. Veuillez
                  vous assurer que vous avez suffisamment de gems disponibles
                  avant de continuer.
                </div>
              </PopoverContent>
            </Popover>
            <AreaDirectionTools {...props} itemOn={itemOn} />
            <Button
              variant="outline"
              size={"icon"}
              onClick={(e) => {
                e.stopPropagation();
                props.handleSaveText();
                props.setDrawText((prevState: any) => ({
                  ...prevState,
                  id: 0,
                }));
                props.setDrawArea({
                  width: props.drawArea.width,
                  height: props.drawArea.height,
                  leftOffset: props.drawArea.leftOffset,
                  topOffset: props.drawArea.topOffset,
                  rotate: props.drawArea.rotate,
                  positionX: props.drawArea.positionX + 20,
                  positionY: props.drawArea.positionY + 20,
                });
              }}
            >
              <LuCopyPlus className="h-4 w-4" />
            </Button>

            <Button
              className="flex flex-col justify-center items-center h-full rounded-full h-[40px] w-[40px] hue-background"
              variant={"outline"}
              onClick={() => {
                handleButtonClickColor(colorInputRef.current);
              }}
              size={"icon"}
            >
              <LuPaintBucket className="h-5 w-5" />
              <input
                ref={colorInputRef}
                className="appearance-none cursor-pointer"
                style={{
                  background: "none",
                  opacity: 0,
                  zIndex: -1,
                  width: 0,
                  height: 0,
                }}
                type="color"
                name=""
                id=""
              />
            </Button>
            <div className="w-full max-w-[100px]">
              <div>size</div>
              <Slider
                //onValueChange={(e) => {}}
                defaultValue={[0]}
                value={[0]}
                min={0}
                max={100}
                step={1}
              />
            </div>
            <Separator className="h-[40px]" orientation="vertical" />
            <Button
              variant="outline"
              size={"icon"}
              onClick={(e) => {
                e.stopPropagation();
                props.handleResetText();
                if (props.drawText.id !== 0) {
                  props.setLayers((prevLayers: LayerElement[]) =>
                    prevLayers.filter(
                      (element: LayerElement) =>
                        element.id !== props.drawText.id
                    )
                  );
                }
              }}
            >
              <FaTrashCan className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </>
    );
  // props.drawSvg.svg
  if (null == null)
    return (
      <>
        <Card
          className="opacity-60 hover:opacity-100"
          ref={props.overlayContextRef}
          style={{
            zIndex: 50,
            position: "absolute",
            left: "50%",
            bottom: props.isResizing ? "-100px" : "80px",
            width: 410,
            transform: "translateX(-50%)",
            transition: "500ms",
          }}
        >
          <CardContent className="flex justify-between p-1 gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="p-2" size={"icon"}>
                  <LuCircle className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="m-[10px] opacity-50 hover:opacity-100 p-0"
                ref={props.overlayContextPropoverRef}
              >
                <div className="grid grid-cols-3 gap-2 p-1">
                  {svgList?.map((el, index) => (
                    <Button
                      key={index}
                      className="flex flex-col justify-center items-center h-full"
                      variant="ghost"
                      onClick={() => {
                        if (props.isFormCanvasVisible !== "") {
                          props.handleSaveForm();
                          props.handleResetForm();
                        }
                        if (props.isImgOverlay.img) {
                          props.handleSaveImgOverlay();
                          props.handleResetImgOverlay();
                        }
                        props.setDrawSvg((prevState: DrawSvg) => ({
                          ...prevState,
                          svg: el.svg,
                          img: props.drawSvg.img
                            ? props.drawSvg.img
                            : formBtnImg,
                        }));
                        if (!props.drawSvg.img) {
                          const size =
                            props.isImageSize.w < props.isImageSize.h
                              ? props.isImageSize.w
                              : props.isImageSize.h;
                          props.setDrawArea({
                            width: size / 2,
                            height: size / 2,
                            leftOffset: 0,
                            topOffset: 0,
                            positionX: props.isImageSize.w / 2 - size / 4,
                            positionY: props.isImageSize.h / 2 - size / 4,
                            rotate: 0,
                          });
                        }
                      }}
                    >
                      <SvgComponents
                        drawSvg={el}
                        strokeRectRef={null}
                        strokePathRef={null}
                      />
                    </Button>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-1 gap-2 p-4">
                  <div className="text-1xl flex justify-between items-center">
                    postion y: {props.drawSvg.crop.y}%
                    <LuRefreshCw
                      className="h-4 w-4 cursor-pointer hover:animate-spin"
                      onClick={() => {
                        props.setDrawSvg((prevState: DrawSvg) => ({
                          ...prevState,
                          crop: {
                            ...prevState.crop,
                            y: 0,
                          },
                        }));
                      }}
                    />
                  </div>
                  <Slider
                    onValueChange={(e) => {
                      props.setDrawSvg((prevState: DrawSvg) => ({
                        ...prevState,
                        crop: {
                          ...prevState.crop,
                          y: e[0],
                        },
                      }));
                    }}
                    value={[props.drawSvg.crop.y]}
                    max={props.drawSvg.crop.size}
                    min={-props.drawSvg.crop.size}
                    step={1}
                  />
                  <Separator className="my-0" />
                  <div className="text-1xl flex justify-between items-center">
                    postion x: {props.drawSvg.crop.x}%
                    <LuRefreshCw
                      className="h-4 w-4 cursor-pointer hover:animate-spin"
                      onClick={() => {
                        props.setDrawSvg((prevState: DrawSvg) => ({
                          ...prevState,
                          crop: {
                            ...prevState.crop,
                            x: 0,
                          },
                        }));
                      }}
                    />
                  </div>
                  <Slider
                    onValueChange={(e) => {
                      props.setDrawSvg((prevState: DrawSvg) => ({
                        ...prevState,
                        crop: {
                          ...prevState.crop,
                          x: e[0],
                        },
                      }));
                    }}
                    value={[props.drawSvg.crop.x]}
                    max={props.drawSvg.crop.size}
                    min={-props.drawSvg.crop.size}
                    step={1}
                  />
                  <Separator className="my-0" />
                  <div className="text-1xl flex justify-between items-center">
                    Size: {props.drawSvg.crop.size}%
                    <LuRefreshCw
                      className="h-4 w-4 cursor-pointer hover:animate-spin"
                      onClick={() => {
                        props.setDrawSvg((prevState: DrawSvg) => ({
                          ...prevState,
                          crop: {
                            ...prevState.crop,
                            size: 24,
                          },
                        }));
                      }}
                    />
                  </div>
                  <Slider
                    onValueChange={(e) => {
                      props.setDrawSvg((prevState: DrawSvg) => ({
                        ...prevState,
                        crop: {
                          ...prevState.crop,
                          size: e[0],
                        },
                      }));
                    }}
                    value={[props.drawSvg.crop.size]}
                    max={100}
                    step={1}
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size={"icon"}>
                  <LuSliders className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="opacity-30 hover:opacity-100 p-0"
                ref={props.overlayFiltersRef}
              >
                <ScrollArea className="h-[200px] w-full p-4">
                  <div className="w-full grid grid-cols-3 gap-2">
                    <DrawingFilterImg
                      setSystemSetting={props.setDrawSvg}
                      defaultImg={props.drawSvg.img}
                      inSide
                    />
                  </div>
                </ScrollArea>
                <Separator className="my-2" />
                <ScrollArea className="h-[200px] w-full p-4">
                  <DrawingFilterSlider
                    setSystemSetting={props.setDrawSvg}
                    systemSetting={props.drawSvg.filter}
                    inSide
                  />
                </ScrollArea>
              </PopoverContent>
            </Popover>
            <AreaDirectionTools {...props} itemOn={itemOn} />
            <Button
              variant="ghost"
              size={"icon"}
              onClick={(e) => {
                e.stopPropagation();
                props.handleSaveSvg();
                props.setDrawSvg((prevState: DrawSvg) => ({
                  ...prevState,
                  id: 0,
                }));
                props.setDrawArea({
                  width: props.drawArea.width,
                  height: props.drawArea.height,
                  leftOffset: props.drawArea.leftOffset,
                  topOffset: props.drawArea.topOffset,
                  rotate: props.drawArea.rotate,
                  positionX: props.drawArea.positionX + 20,
                  positionY: props.drawArea.positionY + 20,
                });
              }}
            >
              <LuCopyPlus className="h-4 w-4" />
            </Button>

            <Button
              className="flex flex-col justify-center items-center h-full rounded-full h-[40px] w-[40px] hue-background"
              variant="ghost"
              onClick={() => {
                handleButtonClickColor(colorInputRef.current);
              }}
              size={"icon"}
              onBlur={() => {
                if (colorInputRef?.current) {
                  let color = colorInputRef.current.value;

                  props.setDrawSvg((prevState: DrawSvg) => ({
                    ...prevState,
                    borderColor: color,
                  }));
                }
              }}
            >
              <LuPaintBucket className="h-5 w-5" />
              <input
                ref={colorInputRef}
                className="appearance-none cursor-pointer"
                onChange={(e) => {
                  if (props.strokePathRef && props.strokePathRef.current) {
                    props.strokePathRef.current.style.stroke = e.target.value;
                  }
                  if (props.strokeRectRef && props.strokeRectRef.current) {
                    props.strokeRectRef.current.style.stroke = e.target.value;
                  }
                }}
                value={defaultColorSvg(
                  props.strokePathRef.current?.style.stroke ||
                    props.strokeRectRef.current?.style.stroke
                )}
                style={{
                  background: "none",
                  opacity: 0,
                  zIndex: -1,
                  width: 0,
                  height: 0,
                }}
                type="color"
                name=""
                id=""
              />
            </Button>
            <div className="w-full max-w-[100px]">
              <div>border</div>
              <Slider
                onValueChange={(e) => {
                  props.setDrawSvg((prevState: DrawSvg) => ({
                    ...prevState,
                    thickness: e[0],
                  }));
                }}
                value={[props.drawSvg.thickness]}
                min={0}
                max={1}
                step={0.1}
              />
            </div>
            <Separator className="h-[40px]" orientation="vertical" />
            <Button
              variant="ghost"
              size={"icon"}
              onClick={(e) => {
                e.stopPropagation();
                props.handleResetSvg();
                if (props.drawSvg.id !== 0) {
                  props.setLayers((prevLayers: LayerElement[]) =>
                    prevLayers.filter(
                      (element: LayerElement) => element.id !== props.drawSvg.id
                    )
                  );
                }
              }}
            >
              <FaTrashCan className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </>
    );
  // props.drawSvgFull.svg
  if (null == null)
    return (
      <>
        <Card
          className="opacity-60 hover:opacity-100"
          ref={props.overlayContextRef}
          style={{
            zIndex: 50,
            position: "absolute",
            left: "50%",
            bottom: props.isResizing ? "-100px" : "80px",
            width: 410,
            transform: "translateX(-50%)",
            transition: "500ms",
          }}
        >
          <CardContent className="flex justify-between p-1 gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="p-2" size={"icon"}>
                  <LuCircle className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="m-[10px] opacity-50 hover:opacity-100 p-0"
                ref={props.overlayContextPropoverRef}
              >
                <div className="grid grid-cols-3 gap-2 p-1">
                  {svgFullList?.map((el, index) => (
                    <Button
                      key={index}
                      className="flex flex-col justify-center items-center h-full"
                      variant="ghost"
                      onClick={() => {
                        if (props.isFormCanvasVisible !== "") {
                          props.handleSaveForm();
                          props.handleResetForm();
                        }
                        if (props.isImgOverlay.img) {
                          props.handleSaveImgOverlay();
                          props.handleResetImgOverlay();
                        }
                        if (props.drawSvg.svg) {
                          props.handleSaveSvg();
                          props.handleResetSvg();
                        }
                        props.setDrawSvgFull((prevState: DrawSvgFull) => ({
                          ...prevState,
                          svg: el.svg,
                        }));
                        if (!props.drawSvgFull.svg) {
                          const size =
                            props.isImageSize.w < props.isImageSize.h
                              ? props.isImageSize.w
                              : props.isImageSize.h;
                          props.setDrawArea({
                            width: size / 2,
                            height: size / 2,
                            leftOffset: 0,
                            topOffset: 0,
                            positionX: props.isImageSize.w / 2 - size / 4,
                            positionY: props.isImageSize.h / 2 - size / 4,
                            rotate: 0,
                          });
                        }
                      }}
                    >
                      <SvgFullComponents
                        drawSvgFull={el}
                        strokeRectBgRef={null}
                        strokeRectRef={null}
                        strokePathRef={null}
                      />
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <AreaDirectionTools {...props} itemOn={itemOn} />
            <Button
              variant="ghost"
              size={"icon"}
              onClick={(e) => {
                e.stopPropagation();
                props.handleSaveSvgFull();
                props.setDrawSvgFull((prevState: DrawSvg) => ({
                  ...prevState,
                  id: 0,
                }));
                props.setDrawArea({
                  width: props.drawArea.width,
                  height: props.drawArea.height,
                  leftOffset: props.drawArea.leftOffset,
                  topOffset: props.drawArea.topOffset,
                  rotate: props.drawArea.rotate,
                  positionX: props.drawArea.positionX + 20,
                  positionY: props.drawArea.positionY + 20,
                });
              }}
            >
              <LuCopyPlus className="h-4 w-4" />
            </Button>
            <Separator className="h-[40px]" orientation="vertical" />
            <Button
              className="flex flex-col justify-center items-center h-full rounded-full h-[40px] w-[40px] hue-background"
              variant="ghost"
              onClick={() => {
                handleButtonClickColor(colorInput2Ref.current);
              }}
              size={"icon"}
              onBlur={() => {
                if (colorInput2Ref?.current) {
                  let color = colorInput2Ref.current.value;

                  console.log(color);

                  props.setDrawSvgFull((prevState: DrawSvgFull) => ({
                    ...prevState,
                    color: color,
                  }));
                }
              }}
            >
              <LuImage className="h-5 w-5" />
              <input
                ref={colorInput2Ref}
                className="appearance-none cursor-pointer"
                onChange={(e) => {
                  if (props.strokeRectBgRef && props.strokeRectBgRef.current) {
                    props.strokeRectBgRef.current.style.fill = e.target.value;
                  }
                }}
                value={defaultColorSvg(
                  props.strokeRectBgRef.current?.style.fill
                )}
                style={{
                  background: "none",
                  opacity: 0,
                  zIndex: -1,
                  width: 0,
                  height: 0,
                }}
                type="color"
                name=""
                id=""
              />
            </Button>
            <Separator className="h-[40px]" orientation="vertical" />
            <Button
              className="flex flex-col justify-center items-center h-full rounded-full h-[40px] w-[40px] hue-background"
              variant="ghost"
              onClick={() => {
                handleButtonClickColor(colorInputRef.current);
              }}
              size={"icon"}
              onBlur={() => {
                if (colorInputRef?.current) {
                  let color = colorInputRef.current.value;

                  props.setDrawSvgFull((prevState: DrawSvgFull) => ({
                    ...prevState,
                    borderColor: color,
                  }));
                }
              }}
            >
              <LuPaintBucket className="h-5 w-5" />
              <input
                ref={colorInputRef}
                className="appearance-none cursor-pointer"
                onChange={(e) => {
                  if (props.strokePathRef && props.strokePathRef.current) {
                    props.strokePathRef.current.style.stroke = e.target.value;
                  }
                  if (props.strokeRectRef && props.strokeRectRef.current) {
                    props.strokeRectRef.current.style.stroke = e.target.value;
                  }
                }}
                value={defaultColorSvg(
                  props.strokePathRef.current?.style.stroke ||
                    props.strokeRectRef.current?.style.stroke
                )}
                style={{
                  background: "none",
                  opacity: 0,
                  zIndex: -1,
                  width: 0,
                  height: 0,
                }}
                type="color"
                name=""
                id=""
              />
            </Button>
            <div className="w-full max-w-[100px]">
              <div>border</div>
              <Slider
                onValueChange={(e) => {
                  props.setDrawSvgFull((prevState: DrawSvgFull) => ({
                    ...prevState,
                    thickness: e[0],
                  }));
                }}
                value={[props.drawSvgFull.thickness]}
                min={0}
                max={1}
                step={0.1}
              />
            </div>
            <Separator className="h-[40px]" orientation="vertical" />
            <Button
              variant="ghost"
              size={"icon"}
              onClick={(e) => {
                e.stopPropagation();
                props.handleResetSvgFull();
                if (props.drawSvgFull.id !== 0) {
                  props.setLayers((prevLayers: LayerElement[]) =>
                    prevLayers.filter(
                      (element: LayerElement) =>
                        element.id !== props.drawSvgFull.id
                    )
                  );
                }
              }}
            >
              <FaTrashCan className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </>
    );
    */
};

export default PagePopover;
