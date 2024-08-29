"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { SystemDefaultDrawing } from "@/public/assets/data/data";
import {
  IsNewOverlay,
  IsNewOverlaySave,
  DrawArea,
  NewImageSize,
} from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";
import { MutableRefObject } from "react";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowsLeftRight,
  FaArrowsUpDown,
  FaArrowUp,
  FaClone,
  FaTrashCan,
} from "react-icons/fa6";

interface DrawingSidebarToolsProps {
  isImgOverlay: IsNewOverlay;
  overlayContextRef: MutableRefObject<HTMLDivElement | null>;
  isResizing: ResizeDirection;
  setImgOverlaySave: React.Dispatch<React.SetStateAction<any>>;
  setImgOverlay: React.Dispatch<React.SetStateAction<any>>;
  isImgOverlaySave: IsNewOverlaySave[];
  drawArea: DrawArea;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  isImageSize: NewImageSize;
  startPosition: { x: number; y: number };
  overlayToolsRef: MutableRefObject<HTMLDivElement | null>;
}

const DrawingSidebarTools: React.FC<DrawingSidebarToolsProps> = (props) => {
  const formBtnImg = SystemDefaultDrawing.src;

  const handleSliderOpacity = (newValue: number[]) => {
    const newOpacity = newValue[0];
    props.setImgOverlay({
      ...props.isImgOverlay,
      opacity: newOpacity,
    });
  };

  if (!props.isImgOverlay.img) return null;

  return (
    <>
      <ScrollArea
        ref={props.overlayToolsRef}
        className="drawing-css-bg w-[20%] min-w-[250px] max-w-[250px]"
      >
        <Card className="border-none rounded-none bg-inherit mb-5 p-4">
          <CardHeader className="p-2">
            <CardTitle className="text-1xl">Overlay edit</CardTitle>
          </CardHeader>
          <Separator className="my-4" />
          <CardContent className="p-0">
            <div>Forms :</div>
            <div className="grid grid-cols-2 gap-2 p-1">
              <Button
                className="flex flex-col justify-center items-center h-full p-1"
                variant={
                  props.isImgOverlay.form === "square" ? "secondary" : "outline"
                }
                onClick={() => {
                  //props.setFileDialogOpenImport(!props.isFileDialogOpenImport);
                  props.setImgOverlay({
                    ...props.isImgOverlay,
                    opacity: 1.0,
                    form: "square",
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
                className="flex flex-col justify-center items-center h-full p-1"
                variant={
                  props.isImgOverlay.form === "squareRouded"
                    ? "secondary"
                    : "outline"
                }
                onClick={() => {
                  //props.setFileDialogOpenImport(!props.isFileDialogOpenImport);
                  props.setImgOverlay({
                    ...props.isImgOverlay,
                    opacity: 1.0,
                    form: "squareRouded",
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
                className="flex flex-col justify-center items-center h-full p-1"
                variant={
                  props.isImgOverlay.form === "circle" ? "secondary" : "outline"
                }
                onClick={() => {
                  //props.setFileDialogOpenImport(!props.isFileDialogOpenImport);
                  props.setImgOverlay({
                    ...props.isImgOverlay,
                    opacity: 1.0,
                    form: "circle",
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
            </div>
            <Separator className="my-4" />
            <div>vertical :</div>
            <div className="grid grid-cols-3 gap-2 p-1">
              <Button variant="outline" size="icon">
                <FaArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <FaArrowsLeftRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <FaArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div>horizontal :</div>
            <div className="grid grid-cols-3 gap-2 p-1">
              <Button variant="outline" size="icon">
                <FaArrowDown className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <FaArrowsUpDown className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <FaArrowUp className="h-4 w-4" />
              </Button>
            </div>
            <Separator className="my-4" />
            <div>Other :</div>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
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
                <FaClone className="h-4 w-4 mr-4" /> duplicate
              </Button>
            </div>
            <Separator className="my-4" />
            <div className="p-4">
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
            <div className="flex gap-1">
              <div className="border rounded flex items-center gap-2 p-1 h-[40px] overflow-hidden">
                w:{" "}
                <Input
                  value={props.drawArea.width}
                  disabled
                  className="w-[80px] h-[40px] border-none"
                  type="number"
                  placeholder="width"
                />
              </div>
              <div className="border rounded flex items-center gap-2 p-1 h-[40px] overflow-hidden">
                h:{" "}
                <Input
                  value={props.drawArea.height}
                  disabled
                  className="w-[80px] h-[40px] border-none"
                  type="number"
                  placeholder="height"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </ScrollArea>
    </>
  );
};

export default DrawingSidebarTools;
