import {
  DrawFiligrane,
  IsNewImage,
  IsNewOverlay,
  NewImageSize,
  SystemSettings,
} from "@/utils/interface";
import { Separator } from "@/components/ui/separator";
import { LuShield } from "react-icons/lu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useRef } from "react";
import {
  arrayFontSizeDraftjsMap,
  arrayFontSizeDraftjsMapMin,
  ColorsDrawing,
  FontSizeDraftjsMap,
} from "@/public/assets/data/data";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import useDrawingRendering from "../../../drawing-tools/drawing-rendering/drawing-rendering";

interface DrawingSidebarMenuFiligraneProps {
  isMenuOpen: number;
  systemSetting: SystemSettings;
  isNewImage: IsNewImage;
  setSystemSetting: React.Dispatch<React.SetStateAction<any>>;
  setImgOverlay: React.Dispatch<React.SetStateAction<any>>;
  isImgOverlay: IsNewOverlay;
  drawFiligrane: DrawFiligrane;
  isImageSize: NewImageSize;
  setDrawFiligrane: React.Dispatch<React.SetStateAction<any>>;
}

const DrawingSidebarMenuFiligrane: React.FC<
  DrawingSidebarMenuFiligraneProps
> = (props) => {
  const UseDrawingRendering = useDrawingRendering();

  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClickColor = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  if (props.isMenuOpen !== 7) return null;

  return (
    <>
      <Card className="border-none rounded-none bg-transparent shadow-none">
        <CardContent className="grid grid-cols-1 gap-2 p-4 text-black dark:text-white">
          <div className="text-1xl flex justify-between">
            Filigrane :<LuShield className="h-4 w-4" />
          </div>
          <Separator className="my-2" />

          <>
            <div>Select filigrane color:</div>

            <div className="grid grid-cols-5 gap-4">
              <Button
                className="rounded-full hue-background"
                variant="ghost"
                size="icon"
                onClick={handleButtonClickColor}
                onBlur={() => {
                  if (colorInputRef?.current) {
                    let color = colorInputRef.current.value;
                    console.log(color);

                    props.setDrawFiligrane((prevState: DrawFiligrane) => ({
                      ...prevState,
                      color: color,
                    }));
                  }
                }}
              >
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
                  onChange={(e) => {
                    if (colorInputRef?.current) {
                      colorInputRef.current.style.background = e.target.value;
                    }
                  }}
                  type="color"
                  name=""
                  id=""
                />
              </Button>
              {ColorsDrawing.map((color: any) => (
                <Button
                  key={color.name}
                  className="rounded-full border"
                  style={{
                    backgroundColor: color.value,
                    border:
                      props.drawFiligrane.color === color.value
                        ? "3px solid #006eff"
                        : "1px solid #000000",
                  }}
                  size="icon"
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => {
                    props.setDrawFiligrane((prevState: DrawFiligrane) => ({
                      ...prevState,
                      color: color.value,
                    }));
                  }}
                />
              ))}
            </div>
          </>

          <Separator className="my-2" />

          <div>Select filigrane opacity:</div>
          <Slider
            className="border rounded-full"
            value={[props.drawFiligrane.opacity]}
            max={1}
            min={0.1}
            step={0.1}
            onValueChange={(e) => {
              props.setDrawFiligrane((prevState: DrawFiligrane) => ({
                ...prevState,
                opacity: e[0],
              }));
            }}
          />

          <Separator className="my-2" />

          <div>Filigrane text:</div>
          <Input
            type="text"
            id="filigraneInput"
            className="text-white"
            placeholder="Filigrane name ..."
            value={props.drawFiligrane.text}
            onChange={(e) => {
              props.setDrawFiligrane((prevState: DrawFiligrane) => ({
                ...prevState,
                text: e.target.value,
              }));
            }}
          />

          <Separator className="my-2" />

          <Select
            value={`${props.drawFiligrane.fontSize}`}
            onValueChange={(e) => {
              props.setDrawFiligrane((prevState: DrawFiligrane) => ({
                ...prevState,
                fontSize: parseInt(e),
              }));
            }}
          >
            <SelectTrigger
              className="w-full text-white"
              //tabIndex={-1}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
            >
              <div>{props.drawFiligrane.fontSize} px</div>
            </SelectTrigger>
            <SelectContent
              onMouseDown={(e) => {
                e.preventDefault();
              }}
            >
              {arrayFontSizeDraftjsMapMin?.map((value: number, index) => (
                <SelectItem key={index} value={`${value}`}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Separator className="my-2" />

          <Button
            className="w-full"
            variant="activeBlue"
            disabled={props.drawFiligrane.text.length === 0}
            onClick={() => {
              UseDrawingRendering.CreateWatermarkedText(
                props.drawFiligrane.text,
                props.isImageSize,
                props.drawFiligrane.color,
                props.drawFiligrane.fontSize,
                function (imgBlob: any) {
                  props.setDrawFiligrane((prevState: DrawFiligrane) => ({
                    ...prevState,
                    img: imgBlob,
                  }));
                }
              );
            }}
          >
            New filigrane
          </Button>

          <Separator className="my-4" />
          <Button
            className="w-full"
            variant="destructive"
            disabled={!props.drawFiligrane.img}
            onClick={() => {
              props.setDrawFiligrane((prevState: DrawFiligrane) => ({
                ...prevState,
                img: "",
              }));
            }}
          >
            Reset filigrane
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default DrawingSidebarMenuFiligrane;
