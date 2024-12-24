import { filters } from "@/public/assets/data/data";
import { FaListUl } from "react-icons/fa";
import RandomFilters from "../../../drawing-tools/filters/random-filters";
import { Slider } from "@/components/ui/slider";
import { IsNewImage, IsNewOverlay, SystemSettings } from "@/utils/interface";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LuLayoutGrid, LuSliders } from "react-icons/lu";
import DrawingFilterSlider from "../../../drawing-tools/filters/filter-sliders";
import DrawingFilterImg from "../../../drawing-tools/filters/filter-img";
import { Card, CardContent } from "@/components/ui/card";

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

  if (props.isMenuOpen !== 3) return null;

  return (
    <>
      <Card className="border-none rounded-none bg-transparent">
        <CardContent className="grid grid-cols-1 gap-2 p-4 text-black dark:text-white">
          <div className="text-1xl flex justify-between">
            Filters :<LuSliders className="h-4 w-4" />
          </div>
          <Separator className="my-2" />
          <ScrollArea className="h-[200px] w-full">
            <div className="w-full grid grid-cols-3 gap-2 p-4">
              <DrawingFilterImg
                {...props}
                defaultImg={props.isNewImage.miniature}
              />
            </div>
          </ScrollArea>
          <Separator className="my-2" />
          <RandomFilters
            setSystemSetting={props.setSystemSetting}
            systemSetting={props.systemSetting}
            isNewImage={props.isNewImage.miniature}
            historical={historical}
            setHistorical={setHistorical}
          />
          <Separator className="my-2" />
          <ScrollArea className="h-[300px] w-full p-4">
            <DrawingFilterSlider {...props} />
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
};

export default DrawingSidebarMenuFilters;
