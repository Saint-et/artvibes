import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShadowPreset } from "@/public/assets/data/data";
import { IsNewImage, SystemShadow } from "@/utils/interface";
import { useRef } from "react";
import { FaPalette } from "react-icons/fa6";
import { VscActivateBreakpoints } from "react-icons/vsc";

interface DrawingSidebarMenuClonesProps {
  isMenuOpen: number;
  systemShadow: SystemShadow;
  setSystemShadow: React.Dispatch<React.SetStateAction<any>>;
  isNewImage: IsNewImage;
}

const DrawingSidebarMenuClones: React.FC<DrawingSidebarMenuClonesProps> = (
  props
) => {
  const handleSliderChangeShadowOpacity = (newValue: number[]) => {
    const newOpacity = newValue[0];
    props.setSystemShadow({
      ...props.systemShadow,
      opacity: newOpacity,
    });
  };

  const handleSliderChangeShadowSize = (newValue: number[]) => {
    const newSize = newValue[0];
    props.setSystemShadow({
      ...props.systemShadow,
      size: newSize,
    });
  };

  const handleSliderChangeShadowX = (newValue: number[]) => {
    const newSize = newValue[0];
    props.setSystemShadow({
      ...props.systemShadow,
      x: newSize,
    });
  };

  const handleSliderChangeShadowY = (newValue: number[]) => {
    const newSize = newValue[0];
    props.setSystemShadow({
      ...props.systemShadow,
      y: newSize,
    });
  };

  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClickColor = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  if (props.isMenuOpen !== 6) return null;

  return (
    <>
      <Tabs className="mt-4" defaultValue="Preset">
        <TabsList className="bg-transparent">
          <TabsTrigger
            className="data-[state=active]:bg-[#4763eb]"
            value="Preset"
          >
            Preset
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-[#4763eb]"
            value="adjusteShadow"
          >
            Shadow
          </TabsTrigger>
        </TabsList>

        <Separator className="my-4" />

        <TabsContent value="Preset">
          <div className="text-1xl flex justify-between mx-4">
            Shadow :<VscActivateBreakpoints className="text-2xl" />
          </div>
          <div className="grid grid-cols-1 gap-2 p-4">
            <Button
              className="flex flex-col justify-center items-center h-full"
              variant={"outline"}
              onClick={handleButtonClickColor}
              style={{
                background: props.systemShadow.color,
              }}
            >
              <input
                ref={colorInputRef}
                value={props.systemShadow.color}
                onChange={(e) => {
                  props.setSystemShadow({
                    ...props.systemShadow,
                    color: e.target.value,
                  });
                }}
                className="appearance-none cursor-pointer"
                style={{ background: "none", opacity: 0, zIndex: -1 }}
                type="color"
                name=""
                id=""
              />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 p-4">
            {ShadowPreset?.map((value, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg group cursor-pointer"
                onClick={() => {
                  props.setSystemShadow({
                    ...value,
                    color: props.systemShadow.color,
                  });
                }}
              >
                <img
                  className="object-cover w-full h-20 transition-transform duration-300 ease-in-out group-hover:scale-105"
                  src={props.isNewImage.img}
                  alt="image"
                  onMouseDown={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-4 text-white"
                  style={{
                    boxShadow: `inset ${value.x / 4}px ${value.y / 4}px ${
                      value.opacity / 4
                    }px ${value.size / 4}px ${value.color}`,
                  }}
                ></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-8 p-6">
            {ShadowPreset?.map((value, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg group cursor-pointer"
                onClick={() => {
                  props.setSystemShadow({
                    ...value,
                    color: props.systemShadow.color,
                  });
                }}
                style={{
                  boxShadow: `${value.color} ${value.x / 4}px ${value.y / 4}px ${
                    value.opacity / 4
                  }px ${value.size / 4}px`,
                }}
              >
                <img
                  className="object-cover w-full h-20 transition-transform duration-300 ease-in-out group-hover:scale-105"
                  src={props.isNewImage.img}
                  alt="image"
                  onMouseDown={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="adjusteShadow">
          <Card className="border-none rounded-none mt-2 bg-transparent">
            <CardHeader>
              <CardTitle className="text-1xl flex justify-between">
                Shadow :<VscActivateBreakpoints className="text-2xl" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="border"
                style={{
                  width: "100%",
                  height: 200,
                  background: "grey",
                  boxShadow: `inset ${props.systemShadow.x / 4}px ${
                    props.systemShadow.y / 4
                  }px ${props.systemShadow.opacity / 4}px ${
                    props.systemShadow.size / 4
                  }px black`,
                  backgroundImage: `url(${props.isNewImage.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </CardContent>
            <CardContent>
              <div className="flex justify-between mb-2">
                Shadow color <FaPalette />
              </div>
              <div className="grid grid-cols-1 gap-2 p-1">
                <Button
                  className="flex flex-col justify-center items-center h-full"
                  variant={"outline"}
                  onClick={handleButtonClickColor}
                  style={{
                    background: props.systemShadow.color,
                  }}
                >
                  <input
                    ref={colorInputRef}
                    value={props.systemShadow.color}
                    onChange={(e) => {
                      props.setSystemShadow({
                        ...props.systemShadow,
                        color: e.target.value,
                      });
                    }}
                    className="appearance-none cursor-pointer"
                    style={{ background: "none", opacity: 0, zIndex: -1 }}
                    type="color"
                    name=""
                    id=""
                  />
                </Button>
              </div>
              <div className="flex justify-between mb-2">
                Shadow opacity <div>{props.systemShadow.opacity}px</div>
              </div>
              <Slider
                onValueChange={handleSliderChangeShadowOpacity}
                value={[props.systemShadow.opacity]}
                defaultValue={[props.systemShadow.opacity]}
                max={200}
                step={1}
              />
              <div className="flex justify-between mb-2 mt-4">
                Shadow size <div>{props.systemShadow.size}px</div>
              </div>
              <Slider
                onValueChange={handleSliderChangeShadowSize}
                value={[props.systemShadow.size]}
                defaultValue={[props.systemShadow.size]}
                max={200}
                step={1}
              />

              <div className="flex justify-between mb-2 mt-4">
                Position x <div>{props.systemShadow.x}px</div>
              </div>
              <Slider
                onValueChange={handleSliderChangeShadowX}
                value={[props.systemShadow.x]}
                defaultValue={[props.systemShadow.x]}
                max={props.systemShadow.size}
                min={-props.systemShadow.size}
                step={1}
              />

              <div className="flex justify-between mb-2 mt-4">
                Position y <div>{props.systemShadow.y}px</div>
              </div>
              <Slider
                onValueChange={handleSliderChangeShadowY}
                value={[props.systemShadow.y]}
                defaultValue={[props.systemShadow.y]}
                max={props.systemShadow.size}
                min={-props.systemShadow.size}
                step={1}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default DrawingSidebarMenuClones;
