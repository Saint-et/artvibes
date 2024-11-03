"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
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
import { MutableRefObject, useState } from "react";
import {
  LuArrowDownLeft,
  LuArrowDownRight,
  LuArrowDownToLine,
  LuArrowLeftToLine,
  LuArrowRightToLine,
  LuArrowUpLeft,
  LuArrowUpRight,
  LuArrowUpToLine,
  LuFocus,
  LuFoldHorizontal,
  LuFoldVertical,
  LuMoreHorizontal,
} from "react-icons/lu";

interface DrawingProps {
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
  handleSaveImgOverlay: () => void;
  zoom: number[];
  isDrawingLoad: LoadedImage;
  drawingExpandImg: ExpandImg;
  //isLayers: LayerElement[];
  setLayers: React.Dispatch<React.SetStateAction<any>>;
  itemOn: LayerElement | undefined;
  drawForm: DrawForm;
  drawText: DrawText;
  drawSvg: DrawSvg;
  drawSvgFull: DrawSvgFull;
}

const AreaDirectionTools: React.FC<DrawingProps> = (props) => {
  // Déclarez un état pour stocker la valeur de l'input
  const [inputValue, setInputValue] = useState<number>(0);

  // Fonction pour gérer les changements de valeur
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Mettez à jour l'état avec la nouvelle valeur, en la convertissant en nombre
    setInputValue(Number(event.target.value));
  };

  const maxH = Math.min(inputValue, props.isImageSize.h / 2);
  const maxW = Math.min(inputValue, props.isImageSize.w / 2);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size={"icon"}>
            <LuMoreHorizontal className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="m-[10px] opacity-30 hover:opacity-100 p-4"
          ref={props.overlayToolsRef}
        >
          <div>direction :</div>
          <div className="w-full flex justify-between mb-2 gap-2">
            <Button
              variant="outline"
              size={"icon"}
              onClick={() => {
                props.setDrawArea({
                  ...props.drawArea,
                  positionY: maxH - props.drawArea.topOffset,
                  positionX: maxW - props.drawArea.leftOffset,
                });
              }}
              onDoubleClick={() => {
                props.setDrawArea({
                  ...props.drawArea,
                  positionY:
                    maxH -
                    props.drawArea.topOffset -
                    props.drawingExpandImg.expand / 2,
                  positionX:
                    maxW -
                    props.drawArea.leftOffset -
                    props.drawingExpandImg.expand / 2,
                });
              }}
            >
              <LuArrowUpLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                props.setDrawArea({
                  ...props.drawArea,
                  positionY: maxH - props.drawArea.topOffset,
                });
              }}
              onDoubleClick={() => {
                props.setDrawArea({
                  ...props.drawArea,
                  positionY:
                    maxH -
                    props.drawArea.topOffset -
                    props.drawingExpandImg.expand / 2,
                });
              }}
            >
              <LuArrowUpToLine className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                props.setDrawArea({
                  ...props.drawArea,
                  positionY: maxH - props.drawArea.topOffset,
                  positionX:
                    props.isImageSize.w -
                    props.drawArea.width -
                    props.drawArea.leftOffset -
                    maxW,
                });
              }}
              onDoubleClick={() => {
                props.setDrawArea({
                  ...props.drawArea,
                  positionY:
                    maxH -
                    props.drawArea.topOffset -
                    props.drawingExpandImg.expand / 2,
                  positionX:
                    props.isImageSize.w -
                    props.drawArea.width -
                    props.drawArea.leftOffset -
                    maxW +
                    props.drawingExpandImg.expand / 2,
                });
              }}
            >
              <LuArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="w-full flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                props.setDrawArea({
                  ...props.drawArea,
                  positionX: maxW - props.drawArea.leftOffset,
                });
              }}
              onDoubleClick={() => {
                props.setDrawArea({
                  ...props.drawArea,
                  positionX:
                    maxW -
                    props.drawArea.leftOffset -
                    props.drawingExpandImg.expand / 2,
                });
              }}
            >
              <LuArrowLeftToLine className="h-4 w-4" />
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
                    props.drawArea.topOffset,
                  positionX:
                    props.isImageSize.w / 2 -
                    props.drawArea.width / 2 -
                    props.drawArea.leftOffset,
                });
              }}
            >
              <LuFocus className="h-4 w-4" />
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
                    props.drawArea.leftOffset -
                    maxW,
                });
              }}
              onDoubleClick={() => {
                props.setDrawArea({
                  ...props.drawArea,
                  positionX:
                    props.isImageSize.w -
                    props.drawArea.width -
                    props.drawArea.leftOffset -
                    maxW +
                    props.drawingExpandImg.expand / 2,
                });
              }}
            >
              <LuArrowRightToLine className="h-4 w-4" />
            </Button>
          </div>
          <div className="w-full flex justify-between mt-2 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                props.setDrawArea({
                  ...props.drawArea,
                  positionY:
                    props.isImageSize.h -
                    props.drawArea.height -
                    props.drawArea.topOffset -
                    maxH,
                  positionX: maxW - props.drawArea.leftOffset,
                });
              }}
              onDoubleClick={() => {
                props.setDrawArea({
                  ...props.drawArea,
                  positionY:
                    props.isImageSize.h -
                    props.drawArea.height -
                    props.drawArea.topOffset -
                    maxH +
                    props.drawingExpandImg.expand / 2,
                  positionX:
                    maxW -
                    props.drawArea.leftOffset -
                    props.drawingExpandImg.expand / 2,
                });
              }}
            >
              <LuArrowDownLeft className="h-4 w-4" />
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
                    props.drawArea.topOffset -
                    maxH,
                });
              }}
              onDoubleClick={() => {
                props.setDrawArea({
                  ...props.drawArea,
                  positionY:
                    props.isImageSize.h -
                    props.drawArea.height -
                    props.drawArea.topOffset -
                    maxH +
                    props.drawingExpandImg.expand / 2,
                });
              }}
            >
              <LuArrowDownToLine className="h-4 w-4" />
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
                    props.drawArea.topOffset -
                    maxH,
                  positionX:
                    props.isImageSize.w -
                    props.drawArea.width -
                    props.drawArea.leftOffset -
                    maxW,
                });
              }}
              onDoubleClick={() => {
                props.setDrawArea({
                  ...props.drawArea,
                  positionY:
                    props.isImageSize.h -
                    props.drawArea.height -
                    props.drawArea.topOffset -
                    maxH +
                    props.drawingExpandImg.expand / 2,
                  positionX:
                    props.isImageSize.w -
                    props.drawArea.width -
                    props.drawArea.leftOffset -
                    maxW +
                    props.drawingExpandImg.expand / 2,
                });
              }}
            >
              <LuArrowDownRight className="h-4 w-4" />
            </Button>
          </div>
          <Separator className="my-2" />
          <div className="w-full flex justify-start gap-2">
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
              <LuFoldHorizontal className="h-4 w-4" />
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
              <LuFoldVertical className="h-4 w-4" />
            </Button>
            <Separator className="h-[40px] w-[1px]" />
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                props.setDrawArea((prevState: any) => ({
                  ...prevState,
                  rotate: 0,
                }));
              }}
            >
              0°
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                props.setDrawArea((prevState: any) => ({
                  ...prevState,
                  rotate: 45,
                }));
              }}
            >
              45°
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                props.setDrawArea((prevState: any) => ({
                  ...prevState,
                  rotate: 90,
                }));
              }}
            >
              90°
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                props.setDrawArea((prevState: any) => ({
                  ...prevState,
                  rotate: 180,
                }));
              }}
            >
              180°
            </Button>
          </div>
          <Separator className="my-2" />
          <div className="grid grid-cols-2 gap-2 p-1 mt-4">
            <div className="border rounded flex items-center gap-2 p-1 h-[40px] overflow-hidden">
              <Input
                value={inputValue}
                min={0}
                onChange={handleChange}
                className="w-full h-[40px] border-none bg-inherit"
                type="number"
                placeholder="width"
              />
            </div>
            {props.itemOn && (
              <Button
                variant="outline"
                onClick={() => {
                  props.setLayers((prevLayers: LayerElement[]) => {
                    const updatedLayers = prevLayers.map((el: LayerElement) => {
                      if (
                        el.id === props.isImgOverlay.id ||
                        el.id === props.drawForm.id ||
                        el.id === props.drawText.id ||
                        el.id === props.drawSvg.id ||
                        el.id === props.drawSvgFull.id
                      ) {
                        // Si l'élément existe, mettre à jour l'image
                        return {
                          ...el,
                          overflowContainer:
                            el.overflowContainer === "expand"
                              ? "canvas"
                              : "expand",
                        };
                      }
                      return el;
                    });
                    return updatedLayers;
                  });
                }}
              >
                {props.itemOn.overflowContainer}
              </Button>
            )}
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-2 p-1">
            <div className="border rounded flex items-center gap-2 p-1 h-[40px] overflow-hidden">
              w:{" "}
              <Input
                value={props.drawArea.width.toFixed() || 0}
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
                onChange={() => {}}
                disabled
                className="w-full h-[40px] border-none bg-inherit"
                type="number"
                placeholder="height"
              />
            </div>
          </div>
          <Separator className="my-4" />
          <div>Rotate: {props.drawArea.rotate}</div>
          <Slider
            value={[props.drawArea.rotate]}
            max={360}
            min={0}
            step={1}
            onValueChange={(e) => {
              props.setDrawArea((prevState: any) => ({
                ...prevState,
                rotate: e[0],
              }));
            }}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AreaDirectionTools;
