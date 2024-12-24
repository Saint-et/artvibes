import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import {
  Blanket,
  DrawArea,
  ExpandImg,
  IsNewImage,
  IsNewOverlay,
  MenuLayer,
  NewImageSize,
} from "@/utils/interface";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  LuArrowUpRightSquare,
  LuFolderCog,
  LuInfo,
  LuLayers,
  LuLayoutGrid,
  LuPaintBucket,
  LuPalmtree,
  LuPanelBottomClose,
  LuPencil,
  LuPersonStanding,
  LuPlus,
  LuRefreshCw,
  LuSlidersHorizontal,
} from "react-icons/lu";
import DrawingBlanketImg from "../../../drawing-tools/blankets/blankets-img";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { SystemCover } from "@/public/assets/data/data";

interface DrawingSidebarMenuTextProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isMenuOpen: number;
  textCanvasVisible: boolean;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  setTextCanvasVisible: React.Dispatch<React.SetStateAction<any>>;
  isImageSize: NewImageSize;
  sidebarRef: MutableRefObject<HTMLDivElement | null>;
  textCanvasContainerRef: MutableRefObject<HTMLDivElement | null>;
  textCanvasRef: MutableRefObject<HTMLDivElement | null>;
  isImgOverlay: IsNewOverlay;
  handleResetImgOverlay: () => void;
  handleSaveImgOverlay: () => void;
  isNewImage: IsNewImage;
  setMenuLayer: React.Dispatch<React.SetStateAction<any>>;
  isMenuLayer: MenuLayer;
  setNewImage: React.Dispatch<React.SetStateAction<any>>;
  setBlanket: React.Dispatch<React.SetStateAction<any>>;
  isBlanket: Blanket;
  blanketRef: MutableRefObject<HTMLDivElement | null>;
  setMenuOpen: React.Dispatch<React.SetStateAction<any>>;
}

const DrawingSidebarMenuBlanket: React.FC<DrawingSidebarMenuTextProps> = (
  props
) => {
  const color1InputRef = useRef<HTMLInputElement | null>(null);
  const color2InputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClickColor = (ref: HTMLInputElement | null) => {
    if (ref) {
      ref.click();
    }
  };

  if (props.isMenuOpen !== 11) return null;

  return (
    <>
      <Card className="border-none rounded-none bg-transparent">
        <CardContent className="grid grid-cols-1 gap-2 p-4 text-black dark:text-white">
          <div className="text-1xl flex justify-between">
            Blanket :<LuPanelBottomClose className="h-4 w-4" />
          </div>
          <Separator className="my-2" />
          <ScrollArea className="h-[200px] w-full">
            <div className="w-full grid grid-cols-3 gap-2 p-4">
              <DrawingBlanketImg
                img={props.isNewImage.miniature}
                setColor={props.setBlanket}
                blanketRef={props.blanketRef}
                isBlanket={props.isBlanket}
              />
            </div>
          </ScrollArea>
          <Separator className="my-2" />
          <div className="w-full grid grid-cols-2 gap-2">
            <div className="flex flex-col justify-center items-center">
              <div className="text-sm">Color 1</div>
              <Button
                className={
                  !props.isBlanket.color1
                    ? "flex w-full justify-center items-center hue-background"
                    : "flex w-full justify-center items-center"
                }
                variant="outline"
                onClick={() => {
                  handleButtonClickColor(color1InputRef?.current);
                }}
                style={{
                  background: props.isBlanket.color1,
                }}
                disabled={props.isBlanket.transparent1}
                onBlur={() => {
                  if (color1InputRef?.current) {
                    let color = color1InputRef.current.value;
                    props.setBlanket((prevState: any) => ({
                      ...prevState,
                      color1: color || "#000000",
                    }));
                  }
                }}
              >
                <input
                  ref={color1InputRef}
                  defaultValue={props.isBlanket.color1 || "#000000"}
                  className="appearance-none cursor-pointer"
                  style={{
                    background: "none",
                    opacity: 0,
                    zIndex: -1,
                    width: 0,
                    height: 0,
                  }}
                  onChange={(e) => {
                    if (props.blanketRef?.current) {
                      props.blanketRef.current.style.background = `linear-gradient(${
                        props.isBlanket.rotate
                      }deg, ${e.target.value}, ${
                        props.isBlanket.transparent2
                          ? "#00000000"
                          : props.isBlanket.color2 || "#00000000"
                      } ${props.isBlanket.size}%)`;
                    }
                  }}
                  type="color"
                  name=""
                  id=""
                />
              </Button>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="color1"
                  checked={props.isBlanket.transparent1}
                  onCheckedChange={(checked) => {
                    props.setBlanket((prevState: any) => ({
                      ...prevState,
                      transparent1: checked,
                    }));
                  }}
                />
                <label
                  htmlFor="color1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Transparent 1
                </label>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="text-sm">Color 2</div>
              <Button
                className={
                  !props.isBlanket.color2
                    ? "flex w-full justify-center items-center hue-background"
                    : "flex w-full justify-center items-center"
                }
                variant="outline"
                onClick={() => {
                  handleButtonClickColor(color2InputRef?.current);
                }}
                style={{
                  background: props.isBlanket.color2,
                }}
                disabled={props.isBlanket.transparent2}
                onBlur={() => {
                  if (color2InputRef?.current) {
                    let color = color2InputRef.current.value;
                    props.setBlanket((prevState: any) => ({
                      ...prevState,
                      color2: color || "#000000",
                    }));
                  }
                }}
              >
                <input
                  ref={color2InputRef}
                  defaultValue={props.isBlanket.color2 || "#000000"}
                  className="appearance-none cursor-pointer"
                  style={{
                    background: "none",
                    opacity: 0,
                    zIndex: -1,
                    width: 0,
                    height: 0,
                  }}
                  onChange={(e) => {
                    if (props.blanketRef?.current) {
                      props.blanketRef.current.style.background = `linear-gradient(${
                        props.isBlanket.rotate
                      }deg, ${
                        props.isBlanket.transparent1
                          ? "#00000000"
                          : props.isBlanket.color1
                      }, ${e.target.value || "#00000000"} ${
                        props.isBlanket.size
                      }%)`;
                    }
                  }}
                  type="color"
                  name=""
                  id=""
                />
              </Button>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="color2"
                  checked={props.isBlanket.transparent2}
                  onCheckedChange={(checked) => {
                    props.setBlanket((prevState: any) => ({
                      ...prevState,
                      transparent2: checked,
                    }));
                  }}
                />
                <label
                  htmlFor="color2"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Transparent 2
                </label>
              </div>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="text-1xl flex justify-between items-center">
            opacity : {props.isBlanket.opacity * 100}%
            <LuRefreshCw
              className="h-4 w-4 cursor-pointer hover:animate-spin"
              onClick={() => {
                props.setBlanket((prevState: any) => ({
                  ...prevState,
                  opacity: 0.1,
                }));
              }}
            />
          </div>
          <Slider
            className="rounded-full border"
            value={[props.isBlanket.opacity]}
            max={1}
            min={0}
            step={0.1}
            onValueChange={(e) => {
              props.setBlanket((prevState: any) => ({
                ...prevState,
                opacity: e[0],
              }));
            }}
          />
          <Separator className="my-2" />
          <div className="text-1xl flex justify-between items-center">
            rotate : {props.isBlanket.rotate}°{" "}
            <LuRefreshCw
              className="h-4 w-4 cursor-pointer hover:animate-spin"
              onClick={() => {
                props.setBlanket((prevState: any) => ({
                  ...prevState,
                  rotate: 0,
                }));
              }}
            />
          </div>
          <Slider
            className="rounded-full border"
            value={[props.isBlanket.rotate]}
            max={360}
            min={0}
            step={1}
            onValueChange={(e) => {
              props.setBlanket((prevState: any) => ({
                ...prevState,
                rotate: e[0],
              }));
            }}
          />
          <Separator className="my-2" />
          <div className="text-1xl flex justify-between items-center">
            size : {props.isBlanket.size}%
            <LuRefreshCw
              className="h-4 w-4 cursor-pointer hover:animate-spin"
              onClick={() => {
                props.setBlanket((prevState: any) => ({
                  ...prevState,
                  size: 100,
                }));
              }}
            />
          </div>
          <Slider
            className="rounded-full border"
            value={[props.isBlanket.size]}
            max={200}
            min={0}
            step={1}
            onValueChange={(e) => {
              props.setBlanket((prevState: any) => ({
                ...prevState,
                size: e[0],
              }));
            }}
          />
          <Separator className="my-2" />
          <div
            className="flex items-center text-[13px] text-blue-500 hover:underline"
            onClick={() => {
              props.setMenuOpen(props.isMenuOpen === 10 ? 0 : 10);
            }}
          >
            You must apply Expande for this option{" "}
            <LuArrowUpRightSquare className="ml-2" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={props.isBlanket.expand}
              onCheckedChange={(checked) => {
                props.setBlanket((prevState: any) => ({
                  ...prevState,
                  expand: checked,
                }));
              }}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Cover Expand
            </label>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DrawingSidebarMenuBlanket;
