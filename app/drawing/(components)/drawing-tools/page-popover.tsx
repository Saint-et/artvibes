"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { filters, SystemDefaultDrawing } from "@/public/assets/data/data";
import {
  DrawArea,
  IsNewOverlay,
  IsNewOverlaySave,
  NewImageSize,
} from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";
import { MutableRefObject, useRef } from "react";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaClone,
} from "react-icons/fa";
import {
  FaArrowsLeftRight,
  FaArrowsUpDown,
  FaCloudsmith,
  FaEllipsis,
  FaSliders,
  FaTrashCan,
} from "react-icons/fa6";

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
}

const PagePopover: React.FC<DrawingPagePopoverProps> = (props) => {
  const formBtnImg = SystemDefaultDrawing.src;

  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClickColor = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  const handleSliderOpacity = (newValue: number[]) => {
    const newOpacity = newValue[0];
    props.setImgOverlay({
      ...props.isImgOverlay,
      opacity: newOpacity,
    });
  };

  return (
    <>
      {props.isImgOverlay.img && (
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
            transition: "300ms",
          }}
        >
          <CardContent className="flex justify-between p-1 gap-2">
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" className="p-2" size={"icon"}>
                  <FaCloudsmith className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="m-[10px] opacity-50 hover:opacity-100"
                ref={props.overlayContextPropoverRef}
              >
                <div className="grid grid-cols-2 gap-2 p-1">
                  <Button
                    className="flex flex-col justify-center items-center h-full"
                    variant={
                      props.isImgOverlay.form === "square"
                        ? "secondary"
                        : "outline"
                    }
                    onClick={() => {
                      //props.setFileDialogOpenImport(!props.isFileDialogOpenImport);
                      props.setImgOverlay({
                        ...props.isImgOverlay,
                        opacity: props.isImgOverlay.opacity,
                        form: "square",
                        shadow: 0,
                        img: props.isImgOverlay.img
                          ? props.isImgOverlay.img
                          : formBtnImg,
                      });
                      if (!props.isImgOverlay.img) {
                        props.setDrawArea({
                          width: 300,
                          height: 300,
                          leftOffset: 0,
                          topOffset: 0,
                          positionX: props.isImageSize.w / 2 - 150, // 22
                          positionY: props.isImageSize.h / 2 - 100, // 22
                        });
                      }
                    }}
                  >
                    <img
                      className="w-full h-full transition hover:scale-95"
                      src={formBtnImg}
                      alt=""
                    />
                  </Button>
                  <Button
                    className="flex flex-col justify-center items-center h-full"
                    variant={
                      props.isImgOverlay.form === "squareRounded"
                        ? "secondary"
                        : "outline"
                    }
                    onClick={() => {
                      //props.setFileDialogOpenImport(!props.isFileDialogOpenImport);
                      props.setImgOverlay({
                        ...props.isImgOverlay,
                        opacity: props.isImgOverlay.opacity,
                        form: "squareRounded",
                        shadow: 0,
                        img: props.isImgOverlay.img
                          ? props.isImgOverlay.img
                          : formBtnImg,
                      });
                      if (!props.isImgOverlay.img) {
                        props.setDrawArea({
                          width: 300,
                          height: 300,
                          leftOffset: 0,
                          topOffset: 0,
                          positionX: props.isImageSize.w / 2 - 150, // 22
                          positionY: props.isImageSize.h / 2 - 100, // 22
                        });
                      }
                    }}
                  >
                    <img
                      className="w-full h-full rounded-[20px] transition hover:scale-95"
                      src={formBtnImg}
                      alt=""
                    />
                  </Button>
                  <Button
                    className="flex flex-col justify-center items-center h-full"
                    variant={
                      props.isImgOverlay.form === "circle"
                        ? "secondary"
                        : "outline"
                    }
                    onClick={() => {
                      //props.setFileDialogOpenImport(!props.isFileDialogOpenImport);
                      props.setImgOverlay({
                        ...props.isImgOverlay,
                        opacity: props.isImgOverlay.opacity,
                        form: "circle",
                        shadow: 0,
                        img: props.isImgOverlay.img
                          ? props.isImgOverlay.img
                          : formBtnImg,
                      });
                      if (!props.isImgOverlay.img) {
                        props.setDrawArea({
                          width: 300,
                          height: 300,
                          leftOffset: 0,
                          topOffset: 0,
                          positionX: props.isImageSize.w / 2 - 150, // 22
                          positionY: props.isImageSize.h / 2 - 100, // 22
                        });
                      }
                    }}
                  >
                    <img
                      className="w-full h-full rounded-full transition hover:scale-95"
                      src={formBtnImg}
                      alt=""
                    />
                  </Button>
                  <Button
                    className="flex flex-col justify-center items-center h-full"
                    variant={
                      props.isImgOverlay.form === "squareShadow"
                        ? "secondary"
                        : "outline"
                    }
                    onClick={() => {
                      //props.setFileDialogOpenImport(!props.isFileDialogOpenImport);
                      props.setImgOverlay({
                        ...props.isImgOverlay,
                        opacity: props.isImgOverlay.opacity,
                        form: "squareShadow",
                        shadow: 10,
                        img: props.isImgOverlay.img
                          ? props.isImgOverlay.img
                          : formBtnImg,
                      });
                      if (!props.isImgOverlay.img) {
                        props.setDrawArea({
                          width: 300,
                          height: 300,
                          leftOffset: 0,
                          topOffset: 0,
                          positionX: props.isImageSize.w / 2 - 150, // 22
                          positionY: props.isImageSize.h / 2 - 100, // 22
                        });
                      }
                    }}
                  >
                    <img
                      className="w-full h-full shadow-[0px_0px_4px_2px_white] transition hover:scale-95"
                      src={formBtnImg}
                      alt=""
                    />
                  </Button>
                  <Button
                    className="flex flex-col justify-center items-center h-full"
                    variant={
                      props.isImgOverlay.form === "squareRoundedShadow"
                        ? "secondary"
                        : "outline"
                    }
                    onClick={() => {
                      //props.setFileDialogOpenImport(!props.isFileDialogOpenImport);
                      props.setImgOverlay({
                        ...props.isImgOverlay,
                        opacity: props.isImgOverlay.opacity,
                        form: "squareRoundedShadow",
                        shadow: 10,
                        img: props.isImgOverlay.img
                          ? props.isImgOverlay.img
                          : formBtnImg,
                      });
                      if (!props.isImgOverlay.img) {
                        props.setDrawArea({
                          width: 300,
                          height: 300,
                          leftOffset: 0,
                          topOffset: 0,
                          positionX: props.isImageSize.w / 2 - 150, // 22
                          positionY: props.isImageSize.h / 2 - 100, // 22
                        });
                      }
                    }}
                  >
                    <img
                      className="w-full h-full shadow-[0px_0px_4px_2px_white] rounded-[20px] transition hover:scale-95"
                      src={formBtnImg}
                      alt=""
                    />
                  </Button>
                  <Button
                    className="flex flex-col justify-center items-center h-full"
                    variant={
                      props.isImgOverlay.form === "circleShadow"
                        ? "secondary"
                        : "outline"
                    }
                    onClick={() => {
                      //props.setFileDialogOpenImport(!props.isFileDialogOpenImport);
                      props.setImgOverlay({
                        ...props.isImgOverlay,
                        opacity: props.isImgOverlay.opacity,
                        form: "circleShadow",
                        shadow: 10,
                        img: props.isImgOverlay.img
                          ? props.isImgOverlay.img
                          : formBtnImg,
                      });
                      if (!props.isImgOverlay.img) {
                        props.setDrawArea({
                          width: 300,
                          height: 300,
                          leftOffset: 0,
                          topOffset: 0,
                          positionX: props.isImageSize.w / 2 - 150, // 22
                          positionY: props.isImageSize.h / 2 - 100, // 22
                        });
                      }
                    }}
                  >
                    <img
                      className="w-full h-ful shadow-[0px_0px_4px_2px_white] rounded-full transition hover:scale-95"
                      src={formBtnImg}
                      alt=""
                    />
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" size={"icon"}>
                  <FaSliders className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="opacity-30 hover:opacity-100"
                ref={props.overlayFiltersRef}
              >
                <div className="w-full grid grid-cols-3 gap-2 p-4">
                  {filters?.map((promise, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-lg group cursor-pointer"
                      onClick={() => {
                        return props.setImgOverlay({
                          ...props.isImgOverlay,
                          filter: promise.filter,
                        });
                      }}
                    >
                      <img
                        className="object-cover w-full h-20 transition-transform duration-300 ease-in-out group-hover:scale-105"
                        src={props.isImgOverlay.img}
                        alt="image"
                        style={{
                          filter: `
                    brightness(${promise.filter.brightness}%)
                    contrast(${promise.filter.contrast}%)
                    saturate(${promise.filter.saturation}%)
                    sepia(${promise.filter.sepia}%)
                    hue-rotate(${promise.filter.hue}deg)
                    blur(${promise.filter.blur}px)
                    grayscale(${promise.filter.grayscale}%)
                    invert(${promise.filter.invert}%)
                    `,
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" size={"icon"}>
                  <FaEllipsis className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="m-[10px] opacity-30 hover:opacity-100"
                ref={props.overlayToolsRef}
              >
                <div>horizontal :</div>
                <div className="grid grid-cols-3 gap-2 p-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      props.setDrawArea({
                        ...props.drawArea,
                        positionX: 0 - props.drawArea.leftOffset, // 22
                      });
                    }}
                  >
                    <FaArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      props.setDrawArea({
                        ...props.drawArea,
                        positionX:
                          props.isImageSize.w / 2 -
                          props.drawArea.width / 2 -
                          props.drawArea.leftOffset, // 22
                      });
                    }}
                  >
                    <FaArrowsLeftRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      props.setDrawArea({
                        ...props.drawArea,
                        positionX:
                          props.isImageSize.w -
                          props.drawArea.width -
                          props.drawArea.leftOffset, // 22
                      });
                    }}
                  >
                    <FaArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <div>vertical :</div>
                <div className="grid grid-cols-3 gap-2 p-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      props.setDrawArea({
                        ...props.drawArea,
                        positionY: 0 - props.drawArea.topOffset, // 22
                      });
                    }}
                  >
                    <FaArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      props.setDrawArea({
                        ...props.drawArea,
                        positionY:
                          props.isImageSize.h / 2 -
                          props.drawArea.height / 2 -
                          props.drawArea.topOffset, // 22
                      });
                    }}
                  >
                    <FaArrowsUpDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      props.setDrawArea({
                        ...props.drawArea,
                        positionY:
                          props.isImageSize.h -
                          props.drawArea.height -
                          props.drawArea.topOffset, // 22
                      });
                    }}
                  >
                    <FaArrowDown className="h-4 w-4" />
                  </Button>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-2 p-1">
                  <div className="border rounded flex items-center gap-2 p-1 h-[40px] overflow-hidden">
                    w:{" "}
                    <Input
                      value={props.drawArea.width.toFixed() || 0}
                      defaultValue={props.drawArea.width.toFixed() || 0}
                      onChange={() => {}}
                      disabled
                      className="w-full h-[40px] border-none bg-inherit"
                      type="number"
                      placeholder="width"
                    />
                  </div>
                  <div className="border rounded flex items-center gap-2 p-1 h-[40px] overflow-hidden">
                    h:{" "}
                    <Input
                      value={props.drawArea.height.toFixed() || 0}
                      defaultValue={props.drawArea.height.toFixed() || 0}
                      onChange={() => {}}
                      disabled
                      className="w-full h-[40px] border-none bg-inherit"
                      type="number"
                      placeholder="height"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button
              variant="outline"
              size={"icon"}
              onClick={(e) => {
                e.stopPropagation();
                props.setImgOverlaySave([
                  ...props.isImgOverlaySave,
                  {
                    id: Date.now(),
                    form: props.isImgOverlay.form,
                    img: props.isImgOverlay.img,
                    cropY: props.isImgOverlay.cropY,
                    filter: props.isImgOverlay.filter,
                    opacity: props.isImgOverlay.opacity,
                    shadow: props.isImgOverlay.shadow,
                    borderColor: props.isImgOverlay.borderColor,
                    h: props.drawArea.height,
                    w: props.drawArea.width,
                    x: props.drawArea.positionX + props.drawArea.leftOffset,
                    y: props.drawArea.positionY + props.drawArea.topOffset,
                  },
                ]);
                props.setImgOverlay({
                  ...props.isImgOverlay,
                  id: Date.now(),
                });
                props.setDrawArea({
                  width: props.drawArea.width,
                  height: props.drawArea.height,
                  leftOffset: props.drawArea.leftOffset,
                  topOffset: props.drawArea.topOffset,
                  positionX: props.drawArea.positionX + 20,
                  positionY: props.drawArea.positionY + 20,
                });
              }}
            >
              <FaClone className="h-4 w-4" />
            </Button>
            <Button
              className="flex flex-col justify-center items-center h-full rounded-full h-[40px] w-[40px]"
              variant={"outline"}
              onClick={handleButtonClickColor}
              style={{
                background: props.isImgOverlay.borderColor,
              }}
              size={"icon"}
            >
              <input
                ref={colorInputRef}
                value={props.isImgOverlay.borderColor}
                defaultValue={props.isImgOverlay.borderColor}
                className="appearance-none cursor-pointer"
                style={{
                  background: "none",
                  opacity: 0,
                  zIndex: -1,
                  width: 0,
                  height: 0,
                }}
                onChange={(e) => {
                  props.setImgOverlay({
                    ...props.isImgOverlay,
                    borderColor: e.target.value,
                  });
                  //setSystemColor(e.target.value);
                }}
                type="color"
                name=""
                id=""
              />
            </Button>
            <div className="w-full max-w-[100px]">
              <div>opacity</div>
              <Slider
                onValueChange={handleSliderOpacity}
                defaultValue={[props.isImgOverlay.opacity]}
                value={[props.isImgOverlay.opacity]}
                min={0.1}
                max={1.0}
                step={0.1}
              />
            </div>
            <Separator className="h-[40px] mx-1" orientation="vertical" />
            <Button
              variant="outline"
              size={"icon"}
              onClick={(e) => {
                e.stopPropagation();
                props.handleResetImgOverlay();
              }}
            >
              <FaTrashCan className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default PagePopover;
