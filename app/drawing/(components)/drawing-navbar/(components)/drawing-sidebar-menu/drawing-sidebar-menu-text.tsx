import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { DataSizeText } from "@/public/assets/data/data";
import { ColorsDrawing } from "@/public/assets/data/defaultValue-drawing";
import { DrawText, IsNewOverlay, NewImageSize } from "@/utils/interface";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  FaAlignLeft,
  FaAlignCenter,
  FaAlignJustify,
  FaAlignRight,
  FaBold,
  FaUnderline,
  FaItalic,
} from "react-icons/fa";
import { FaArrowsUpDown } from "react-icons/fa6";
import { LuPaintBucket, LuSparkles, LuTextCursorInput } from "react-icons/lu";

interface DrawingSidebarMenuTextProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isMenuOpen: number;
  textCanvasVisible: boolean;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  setDrawText: React.Dispatch<React.SetStateAction<any>>;
  setTextCanvasVisible: React.Dispatch<React.SetStateAction<any>>;
  isImageSize: NewImageSize;
  sidebarRef: MutableRefObject<HTMLDivElement | null>;
  textCanvasContainerRef: MutableRefObject<HTMLDivElement | null>;
  textCanvasRef: MutableRefObject<HTMLDivElement | null>;
  isImgOverlay: IsNewOverlay;
  handleResetImgOverlay: () => void;
  handleSaveImgOverlay: () => void;
  drawText: DrawText;
}

const DrawingSidebarMenuText: React.FC<DrawingSidebarMenuTextProps> = (
  props
) => {
  const [isSystemColor, setSystemColor] = useState("#000000");

  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClickColor = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  //useEffect(() => {
  //  if (props.isMenuOpen === 2) return;
  //  props.setTextCanvasVisible(false);
  //}, [props.isMenuOpen]);

  if (props.isMenuOpen !== 2) return null;

  return (
    <>
      <Card className="border-none rounded-none bg-transparent">
        <CardContent className="grid grid-cols-1 gap-2 p-4">
          <div className="text-1xl flex justify-between">
            Text :<LuTextCursorInput className="h-4 w-4" />
          </div>
          <Separator className="my-2" />
          <div className="grid grid-cols-4 gap-2 p-1">
            <Button
              className="flex flex-col justify-center items-center h-full"
              variant={
                props.drawText.textAlign === "start" ? "activeBlue" : "ghost"
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
                props.drawText.textAlign === "center" ? "activeBlue" : "ghost"
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
                props.drawText.textAlign === "justify" ? "activeBlue" : "ghost"
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
                props.drawText.textAlign === "end" ? "activeBlue" : "ghost"
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
              variant="ghost"
            >
              <FaBold className="text-1xl" />
            </Button>
            <Button
              className="flex flex-col justify-center items-center h-full"
              variant="ghost"
            >
              <FaUnderline className="text-1xl" />
            </Button>
            <Button
              className="flex flex-col justify-center items-center h-full"
              variant="ghost"
            >
              <FaItalic className="text-1xl" />
            </Button>
          </div>
          <Separator className="my-2" />
          <div className="grid grid-cols-5 gap-4">
            <Button
              className="rounded-full hue-background"
              variant="ghost"
              size="icon"
              onClick={handleButtonClickColor}
            >
              <input
                ref={colorInputRef}
                value={isSystemColor}
                onChange={(e) => {
                  setSystemColor(e.target.value);
                }}
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
            {ColorsDrawing.map((color: any) => (
              <Button
                key={color.name}
                className="rounded-full"
                style={{ backgroundColor: color.value }}
                size="icon"
              />
            ))}
          </div>
          <Separator className="my-2" />
          <div className="grid grid-cols-2 gap-2 p-1">
            <Button
              className="flex flex-col justify-center items-center h-full border"
              onClick={() => {
                if (props.isImgOverlay.img) {
                  props.handleResetImgOverlay();
                  props.handleSaveImgOverlay();
                }
                props.setDrawText((prevState: DrawText) => ({
                  ...prevState,
                  id: 0,
                  value: "",
                  color: "#ffffff",
                  fontSize: 24,
                  underline: "none",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  textAlign: "center",
                }));
                props.setDrawArea({
                  width: 300,
                  height: 300,
                  leftOffset: 0,
                  topOffset: 0,
                  positionX: props.isImageSize.w / 2 - 150,
                  positionY: props.isImageSize.h / 2 - 150,
                  rotate: 0,
                });
                props.setTextCanvasVisible(!props.textCanvasVisible);
              }}
              variant={props.textCanvasVisible ? "activeBlue" : "outline"}
            >
              <LuTextCursorInput className="text-2xl" />
            </Button>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                {DataSizeText?.map((el, index) => (
                  <SelectItem key={index} value={`${el}`}>
                    {el}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <Separator className="my-2" />
        <CardHeader>
          <CardTitle className="text-1xl flex justify-between">
            Text generator :<LuSparkles className="text-1xl" />
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div className="flex w-full items-center justify-center">
            <div className="grid w-full max-w-sm gap-2">
              <Textarea
                className="h-[100px]"
                style={{ resize: "none" }}
                placeholder="Type your text here."
                disabled
              />
              <Button className="gradient-animated5" disabled>
                Edit text
              </Button>
            </div>
          </div>
          <Separator className="my-4" />
          <Card className="bg-transparent transition cursor-pointer text-neutral-400 hover:scale-105 hover:text-white">
            <CardContent className="p-2 h-20 text-sm text-ellipsis overflow-hidden">
              <div className="w-full flex justify-end">
                <LuSparkles className="text-1xl" />
              </div>
              <p>
                Bien que notre application soit gratuite pour tous, nous offrons
                des fonctionnalités supplémentaires et une suppression des
                limites de temps pour nos utilisateurs enregistrés. Créez votre
                compte aujourd'hui pour découvrir l'ensemble complet des
                possibilités qu'offre Drawing.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
};

export default DrawingSidebarMenuText;
