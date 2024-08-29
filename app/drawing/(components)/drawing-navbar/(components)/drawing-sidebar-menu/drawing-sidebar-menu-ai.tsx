import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FaClone, FaLayerGroup } from "react-icons/fa";
import { FaBrain } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";

interface DrawingSidebarMenuModelsProps {
  isMenuOpen: number;
}

const DrawingSidebarMenuAI: React.FC<DrawingSidebarMenuModelsProps> = (
  props
) => {
  return (
    <>
      {props.isMenuOpen === 9 && (
        <Card className="border-none rounded-none bg-transparent">
          <CardHeader>
            <CardTitle className="text-1xl flex justify-between">
              AI :<FaBrain className="text-1xl" />
            </CardTitle>
            <Separator className="my-4" />
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            <Separator className="my-4" />
            <div>Other :</div>
            <Button
              className="transition rounded-full hover:scale-95"
              variant={"outline"}
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                <span>Other</span>
                <div className="h-6 w-6 animate-[sparkle_1s_ease-in-out_infinite]">
                  <FaBrain className="h-full w-full text-white" />
                </div>
              </div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
            </Button>
            <Separator className="my-4" />
            <div>Info :</div>
            <Button
              className="transition rounded-full hover:scale-95"
              variant={"outline"}
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                <span>Crop: get face</span>
                <div className="h-6 w-6 animate-[sparkle_1s_ease-in-out_infinite]">
                  <VscAccount className="h-full w-full text-white" />
                </div>
              </div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default DrawingSidebarMenuAI;
