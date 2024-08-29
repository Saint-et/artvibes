import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRef, useState } from "react";
import {
  FaCube,
  FaSlash,
  FaSquareFull,
  FaCircle,
  FaRegCircle,
} from "react-icons/fa";
import { FaRegSquareFull } from "react-icons/fa6";

interface DrawingSidebarMenuFormsProps {
  isMenuOpen: number;
}

const DrawingSidebarMenuForms: React.FC<DrawingSidebarMenuFormsProps> = (
  props
) => {
  const [isSystemColor, setSystemColor] = useState("#000000");
  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClickColor = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  return (
    <>
      {props.isMenuOpen === 4 && (
        <>
          <Tabs className="mt-4" defaultValue="edit">
            <TabsList className="bg-transparent">
              <TabsTrigger
                className="data-[state=active]:bg-[#4763eb]"
                value="edit"
              >
                Edit
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-[#4763eb]"
                value="historical"
              >
                Historical
              </TabsTrigger>
            </TabsList>

            <Separator className="my-4" />

            <TabsContent value="edit">
              <div className="text-1xl flex justify-between mx-4">
                Form :<FaCube className="text-1xl" />
              </div>
              <div className="grid grid-cols-1 gap-2 p-4">
                <div>straight line :</div>
                <div className="grid grid-cols-2 gap-2 p-1">
                  <Button
                    className="flex flex-col justify-center items-center h-full"
                    variant={"outline"}
                  >
                    <FaSlash className="text-1xl mb-2" />
                    <div>Line</div>
                  </Button>
                </div>
                <Separator className="my-4" />
                <div>Square :</div>
                <div className="grid grid-cols-2 gap-2 p-1">
                  <Button
                    className="flex flex-col justify-center items-center h-full"
                    variant={"outline"}
                  >
                    <FaSquareFull className="text-1xl mb-2" />
                    <div>Square full</div>
                  </Button>
                  <Button
                    className="flex flex-col justify-center items-center h-full"
                    variant={"outline"}
                  >
                    <FaRegSquareFull className="text-1xl mb-2" />
                    <div>Square empty</div>
                  </Button>
                </div>
                <Separator className="my-4" />
                <div>Circle :</div>
                <div className="grid grid-cols-2 gap-2 p-1">
                  <Button
                    className="flex flex-col justify-center items-center h-full"
                    variant={"outline"}
                  >
                    <FaCircle className="text-1xl mb-2" />
                    <div>Circle full</div>
                  </Button>
                  <Button
                    className="flex flex-col justify-center items-center h-full"
                    variant={"outline"}
                  >
                    <FaRegCircle className="text-1xl mb-2" />
                    <div>Circle empty</div>
                  </Button>
                </div>
                <Separator className="my-4" />
                <div>Color :</div>
                <div className="grid grid-cols-1 gap-2 p-1">
                  <Button
                    className="flex flex-col justify-center items-center h-full"
                    variant={"outline"}
                    onClick={handleButtonClickColor}
                    style={{
                      background: isSystemColor,
                    }}
                  >
                    <input
                      ref={colorInputRef}
                      value={isSystemColor}
                      onChange={(e) => {
                        setSystemColor(e.target.value);
                      }}
                      className="appearance-none cursor-pointer"
                      style={{ background: "none", opacity: 0, zIndex: -1 }}
                      type="color"
                      name=""
                      id=""
                    />
                  </Button>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between mb-2">
                  Opacity <div>{1}</div>
                </div>
                <Slider
                  //nValueChange={handleSliderChangeShadowOpacity}
                  //alue={[props.systemShadow.opacity]}
                  //efaultValue={[props.systemShadow.opacity]}
                  max={200}
                  step={1}
                />
              </div>
            </TabsContent>
            <TabsContent value="historical">
              <div>historical</div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </>
  );
};

export default DrawingSidebarMenuForms;
