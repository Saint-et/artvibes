import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { filters } from "@/public/assets/data/data";
import { FaListUl } from "react-icons/fa";
import { FaArrowsRotate, FaPalette } from "react-icons/fa6";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import RandomFilters from "../../../drawing-tools/filters/random-filters";
import ResetFilters from "../../../drawing-tools/filters/reset-filters";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { IsNewImage, IsNewOverlay, SystemSettings } from "@/utils/interface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DrawingSidebarMenuFiltersProps {
  isMenuOpen: number;
  systemSetting: SystemSettings;
  isNewImage: IsNewImage;
  setSystemSetting: React.Dispatch<React.SetStateAction<any>>;
  setImgOverlay: React.Dispatch<React.SetStateAction<any>>;
  isImgOverlay: IsNewOverlay;
}

const DrawingSidebarMenuFilters: React.FC<DrawingSidebarMenuFiltersProps> = (
  props
) => {
  const [historical, setHistorical] = useState<SystemSettings[]>([]);

  const handleSliderChangeBrightness = (newValue: number[]) => {
    const newBrightness = newValue[0];
    props.setSystemSetting({
      ...props.systemSetting,
      brightness: newBrightness,
    });
  };
  const handleSliderChangeContrast = (newValue: number[]) => {
    const newContrast = newValue[0];
    props.setSystemSetting({ ...props.systemSetting, contrast: newContrast });
  };
  const handleSliderChangeSaturation = (newValue: number[]) => {
    const newSaturation = newValue[0];
    props.setSystemSetting({
      ...props.systemSetting,
      saturation: newSaturation,
    });
  };
  const handleSliderChangeHue = (newValue: number[]) => {
    const newHue = newValue[0];
    props.setSystemSetting({ ...props.systemSetting, hue: newHue });
  };
  const handleSliderChangeBlur = (newValue: number[]) => {
    const newBlur = newValue[0];
    props.setSystemSetting({ ...props.systemSetting, blur: newBlur });
  };
  const handleSliderChangeSepia = (newValue: number[]) => {
    const newSepia = newValue[0];
    props.setSystemSetting({ ...props.systemSetting, sepia: newSepia });
  };
  const handleSliderChangeGrayscale = (newValue: number[]) => {
    const newGrayscale = newValue[0];
    props.setSystemSetting({ ...props.systemSetting, grayscale: newGrayscale });
  };
  const handleSliderChangeInvert = (newValue: number[]) => {
    const newInvert = newValue[0];
    props.setSystemSetting({ ...props.systemSetting, invert: newInvert });
  };

  if (props.isMenuOpen !== 3) return null;

  return (
    <>
      <div className="mt-4">
        <div className="text-1xl flex justify-between mx-4">
          Preset :<FaListUl className="text-1xl" />
        </div>
        <ScrollArea className="h-[200px] w-full">
          <div className="w-full grid grid-cols-3 gap-2 p-4">
            {filters?.map((promise, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg group cursor-pointer"
                onClick={() => {
                  props.setSystemSetting(promise.filter);
                }}
              >
                <img
                  className="object-cover w-full h-25 transition-transform duration-300 ease-in-out group-hover:scale-105"
                  src={props.isNewImage.img}
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
        </ScrollArea>
        <Separator className="my-4" />
        <RandomFilters
          setSystemSetting={props.setSystemSetting}
          systemSetting={props.systemSetting}
          isNewImage={props.isNewImage.img}
          historical={historical}
          setHistorical={setHistorical}
        />
        <Separator className="my-4" />
        <ScrollArea className="h-[300px] w-full p-4">
          <div>
            <div className="flex justify-between">
              Brightness <div>{props.systemSetting.brightness}%</div>
            </div>
            <Slider
              onValueChange={handleSliderChangeBrightness}
              value={[props.systemSetting.brightness]}
              defaultValue={[props.systemSetting.brightness]}
              max={200}
              step={1}
            />
            <Separator className="my-4" />
            <div className="flex justify-between">
              Contrast <div>{props.systemSetting.contrast}%</div>
            </div>
            <Slider
              onValueChange={handleSliderChangeContrast}
              value={[props.systemSetting.contrast]}
              defaultValue={[props.systemSetting.contrast]}
              max={200}
              step={1}
            />
            <Separator className="my-4" />
            <div className="flex justify-between">
              Saturation <div>{props.systemSetting.saturation}%</div>
            </div>
            <Slider
              onValueChange={handleSliderChangeSaturation}
              value={[props.systemSetting.saturation]}
              defaultValue={[props.systemSetting.saturation]}
              max={200}
              step={1}
            />
            <Separator className="my-4" />
            <div className="flex justify-between">
              Sepia <div>{props.systemSetting.sepia}%</div>
            </div>
            <Slider
              onValueChange={handleSliderChangeSepia}
              value={[props.systemSetting.sepia]}
              defaultValue={[props.systemSetting.sepia]}
              max={100}
              step={1}
            />
            <Separator className="my-4" />
            <div className="flex justify-between">
              Grayscale <div>{props.systemSetting.grayscale}%</div>
            </div>
            <Slider
              onValueChange={handleSliderChangeGrayscale}
              value={[props.systemSetting.grayscale]}
              defaultValue={[props.systemSetting.grayscale]}
              max={100}
              step={1}
            />
            <Separator className="my-4" />
            <div className="flex justify-between">
              Invert <div>{props.systemSetting.invert}%</div>
            </div>
            <Slider
              onValueChange={handleSliderChangeInvert}
              value={[props.systemSetting.invert]}
              defaultValue={[props.systemSetting.invert]}
              max={100}
              step={1}
            />
            <Separator className="my-4" />
            <div className="flex justify-between">
              Hue <div>{props.systemSetting.hue}%</div>
            </div>
            <Slider
              onValueChange={handleSliderChangeHue}
              value={[props.systemSetting.hue]}
              defaultValue={[props.systemSetting.hue]}
              max={350}
              step={1}
            />
            <Separator className="my-4" />
            <div className="flex justify-between">
              Blur <div>{props.systemSetting.blur}%</div>
            </div>
            <Slider
              onValueChange={handleSliderChangeBlur}
              value={[props.systemSetting.blur]}
              defaultValue={[props.systemSetting.blur]}
              max={10}
              step={1}
            />
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default DrawingSidebarMenuFilters;
