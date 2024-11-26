import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ExpandImg, FileDialogOpen, IsNewImage } from "@/utils/interface";
import { useState, useRef, MutableRefObject } from "react";
import {
  LuArrowLeft,
  LuFolder,
  LuImagePlus,
  LuPaintBucket,
  LuScaling,
} from "react-icons/lu";
import DrawingFilterSlider from "../../../drawing-tools/filters/filter-sliders";
import DrawingFilterImg from "../../../drawing-tools/filters/filter-img";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorsDrawing } from "@/public/assets/data/data";

interface DrawingSidebarMenuExpandProps {
  isMenuOpen: number;
  isNewImage: IsNewImage;
  setNewImage: React.Dispatch<React.SetStateAction<any>>;
  setDrawingExpandImg: React.Dispatch<React.SetStateAction<any>>;
  handleButtonClickImport: () => void;
  drawingExpandImg: ExpandImg;
  isNewImageImport: IsNewImage[];
  expandDivRef: MutableRefObject<HTMLDivElement | null>;
  setFileDialogOpen: React.Dispatch<React.SetStateAction<any>>;
}

const DrawingSidebarMenuExpand: React.FC<DrawingSidebarMenuExpandProps> = (
  props
) => {
  const [isExpandMenu, setExpandMenu] = useState<string>("");

  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClickColor = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  const handleSliderExpand = (newValue: number[]) => {
    const newExpand = newValue[0];
    props.setDrawingExpandImg((prevState: any) => ({
      ...prevState,
      expand: newExpand,
    }));
  };

  if (props.isMenuOpen !== 10) return null;

  if (isExpandMenu === "filter") return <></>;

  if (isExpandMenu === "file")
    return (
      <Card className="border-none rounded-none bg-transparent p-4">
        <CardHeader>
          <CardTitle className="text-1xl flex justify-between">
            Expand file ...
            <LuFolder className="text-1xl" />
          </CardTitle>
          <div className="flex gap-1">
            <Button
              onClick={() => {
                setExpandMenu("");
              }}
              className="w-full"
              variant="outline"
            >
              <LuArrowLeft className="h-5 w-5 mr-2" /> cancel
            </Button>
            <Button
              className="w-full"
              variant="default"
              onClick={() => {
                props.setFileDialogOpen((prevState: FileDialogOpen) => ({
                  ...prevState,
                  lastImport: !prevState.lastImport,
                }));
              }}
            >
              <LuFolder className="h-5 w-5 mr-2" /> Files ...
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-1">
          {props.isNewImageImport?.map((blobUrl, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg group cursor-pointer p-2"
              style={{
                border:
                  props.drawingExpandImg.bgExpand === blobUrl.img
                    ? "3px solid #006eff"
                    : "3px solid transparent",
              }}
              onClick={() => {
                props.setDrawingExpandImg((prevState: ExpandImg) => ({
                  ...prevState,
                  bgExpand: blobUrl.img,
                  miniature: blobUrl.miniature,
                }));
              }}
            >
              <img
                className="object-cover w-full h-32 transition-transform duration-300 ease-in-out group-hover:scale-105"
                src={blobUrl.img}
                alt="logo"
                onMouseDown={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    );

  return (
    <>
      <Card className="border-none rounded-none bg-transparent">
        <CardContent className="grid grid-cols-1 gap-2 p-4">
          <div className="text-1xl flex justify-between">
            Expand :<LuScaling className="h-4 w-4" />
          </div>
          <Separator className="my-2" />
          <div>Expand range :</div>
          {/*<Slider
            defaultValue={[props.drawingExpandImg.expand]}
            value={[props.drawingExpandImg.expand]}
            onValueChange={handleSliderExpand}
            max={1000}
            min={0}
            step={2}
          />*/}

          <Select
            value={`${props.drawingExpandImg.expand}`}
            onValueChange={(e: string) => {
              props.setDrawingExpandImg((prevState: ExpandImg) => ({
                ...prevState,
                expand: parseInt(e),
              }));
            }}
          >
            <SelectTrigger className="w-full">
              <div>{props.drawingExpandImg.expand} px</div>
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 11 }, (_, index) => {
                const value = 100 * index; // Commence à 4 et incrémente par 2
                return (
                  <SelectItem key={value} value={`${value}`}>
                    {value} px
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Separator className="my-2" />
          <div>Choose your background:</div>
          <RadioGroup
            className="mt-4"
            defaultValue={props.drawingExpandImg.bgType}
            onValueChange={(value) => {
              props.setDrawingExpandImg((prevState: any) => ({
                ...prevState,
                bgType: value,
              }));
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bgTransparent" id="r2" />
              <Label htmlFor="r2">Background Transparent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bgActiveImage" id="r1" />
              <Label htmlFor="r1">Background Image</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bgActiveColor" id="r3" />
              <Label htmlFor="r3">Background Color</Label>
            </div>
          </RadioGroup>
          <Separator className="my-2" />
          {props.drawingExpandImg.bgType === "bgTransparent" && (
            <>
              <div className="text-slate-500 text-sm">
                Info: Select a type of wallpaper you want to display.
              </div>
            </>
          )}
          {props.drawingExpandImg.bgType === "bgActiveColor" && (
            <>
              <div>Background color:</div>

              <div className="grid grid-cols-5 gap-4">
                <Button
                  className="rounded-full hue-background"
                  variant="ghost"
                  size="icon"
                  onClick={handleButtonClickColor}
                  disabled={props.drawingExpandImg.bgType !== "bgActiveColor"}
                  onBlur={() => {
                    if (colorInputRef?.current) {
                      let color = colorInputRef.current.value;
                      props.setDrawingExpandImg((prevState: any) => ({
                        ...prevState,
                        bgColor: color || "#000000",
                      }));
                    }
                  }}
                >
                  <input
                    ref={colorInputRef}
                    defaultValue={props.drawingExpandImg.bgColor}
                    className="appearance-none cursor-pointer"
                    style={{
                      background: "none",
                      opacity: 0,
                      zIndex: -1,
                      width: 0,
                      height: 0,
                    }}
                    onChange={(e) => {
                      if (props.expandDivRef?.current) {
                        props.expandDivRef.current.style.background =
                          e.target.value;
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
                    className="rounded-full"
                    style={{ backgroundColor: color.value }}
                    size="icon"
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
                    onClick={() => {
                      props.setDrawingExpandImg((prevState: any) => ({
                        ...prevState,
                        bgColor: color.value,
                      }));
                    }}
                  />
                ))}
              </div>
            </>
          )}
          {props.drawingExpandImg.bgType === "bgActiveImage" && (
            <>
              <Button
                onClick={() => {
                  setExpandMenu("file");
                }}
                className="w-full"
                variant="outline"
                disabled={props.drawingExpandImg.bgType !== "bgActiveImage"}
              >
                <LuFolder className="h-5 w-5 mr-2" /> Files ...
              </Button>
              <ScrollArea className="h-[200px] w-full p-4">
                <div className="w-full grid grid-cols-3 gap-2">
                  <DrawingFilterImg
                    setSystemSetting={props.setDrawingExpandImg}
                    defaultImg={
                      props.drawingExpandImg.miniature
                        ? props.drawingExpandImg.miniature
                        : props.isNewImage.miniature
                    }
                    keyName={"expandFilter"}
                    inSide={true}
                  />
                </div>
              </ScrollArea>
              <ScrollArea className="h-[200px] w-full p-4">
                <DrawingFilterSlider
                  setSystemSetting={props.setDrawingExpandImg}
                  systemSetting={props.drawingExpandImg.expandFilter}
                  keyName={"expandFilter"}
                  inSide={true}
                />
              </ScrollArea>
            </>
          )}
          <Separator className="my-4" />
          <div className="text-neutral-500 text-sm">
            Note: The "expand" option must be set as of the start of the
            project. Any subsequent changes to this option may unintended
            consequences, such as displacement or the distortion of certain
            elements on the canvas. To guarantee a consistent layout and avoid
            any misalignment or alteration of proportions, it is strongly
            recommended to fix this value from the earliest stages.
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DrawingSidebarMenuExpand;
