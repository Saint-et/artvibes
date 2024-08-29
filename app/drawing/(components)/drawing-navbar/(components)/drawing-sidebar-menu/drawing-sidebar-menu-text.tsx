import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewImageSize } from "@/utils/interface";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  FaAlignLeft,
  FaAlignCenter,
  FaAlignJustify,
  FaAlignRight,
  FaPenFancy,
  FaBold,
  FaUnderline,
  FaItalic,
} from "react-icons/fa";
import { FaT, FaArrowsUpDown, FaCubes, FaPalette } from "react-icons/fa6";

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
}

const DrawingSidebarMenuText: React.FC<DrawingSidebarMenuTextProps> = (
  props
) => {
  const useTextCanvasRef = (
    textCanvasContainerRef: MutableRefObject<HTMLDivElement | null>,
    sidebarRef: MutableRefObject<HTMLDivElement | null>,
    isMenuOpen: number,
    textCanvasRef: MutableRefObject<HTMLDivElement | null>
  ) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      const handleClickOutside = (event: MouseEvent) => {
        if (
          textCanvasContainerRef.current &&
          !textCanvasContainerRef.current.contains(event.target as Node) &&
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target as Node)
        ) {
          //console.log(54545);
          const text = textCanvasRef.current
            ? textCanvasRef.current.innerHTML
            : null;

          props.setTextCanvasVisible(false);
        }
      };
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [textCanvasContainerRef, isMenuOpen, textCanvasRef]);
  };

  useTextCanvasRef(
    props.textCanvasContainerRef,
    props.sidebarRef,
    props.isMenuOpen,
    props.textCanvasRef
  );

  const [isSystemColor, setSystemColor] = useState("#000000");

  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClickColor = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  useEffect(() => {
    if (props.isMenuOpen === 2) return;
    props.setTextCanvasVisible(false);
  }, [props.isMenuOpen]);

  if (props.isMenuOpen !== 2) return null;

  return (
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
            Text :<FaT className="text-1xl" />
          </div>
          <div className="p-4">
            <div>Alignment :</div>
            <div className="grid grid-cols-4 gap-2 p-1">
              <Button
                className="flex flex-col justify-center items-center h-full"
                variant={"outline"}
              >
                <FaAlignLeft className="text-1xl" />
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full"
                variant={"outline"}
              >
                <FaAlignCenter className="text-1xl" />
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full"
                variant={"outline"}
              >
                <FaAlignJustify className="text-1xl" />
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full"
                variant={"outline"}
              >
                <FaAlignRight className="text-1xl" />
              </Button>
            </div>

            <Separator className="my-4" />

            <div>Style :</div>
            <div className="grid grid-cols-3 gap-2 p-1">
              <Button
                className="flex flex-col justify-center items-center h-full"
                variant={"outline"}
              >
                <FaBold className="text-1xl" />
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full"
                variant={"outline"}
              >
                <FaUnderline className="text-1xl" />
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full"
                variant={"outline"}
              >
                <FaItalic className="text-1xl" />
              </Button>
            </div>

            <Separator className="my-4" />

            <div>Editor & color :</div>
            <div className="grid grid-cols-2 gap-2 p-1">
              <Button
                className="flex flex-col justify-center items-center h-full"
                onClick={() => {
                  props.setDrawArea({
                    width: 300,
                    height: 200,
                    leftOffset: 0,
                    topOffset: 0,
                    positionX: props.isImageSize.w / 2 - 152,
                    positionY: props.isImageSize.h / 2 - 102,
                  });
                  props.setTextCanvasVisible(!props.textCanvasVisible);
                }}
                variant={props.textCanvasVisible ? "activeBlue" : "outline"}
              >
                <FaPenFancy className="text-1xl" />
              </Button>
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

            <div className="flex justify-between mt-5">
              Size:{" "}
              <span className="flex items-center">
                {14}
                <FaArrowsUpDown className="text-1xl" />
              </span>
            </div>
            <Slider
              defaultValue={[14]}
              max={78}
              step={1}
              aria-label="input-slider"
            />
          </div>
          <Separator className="my-4" />
          <Card className="border-none rounded-none bg-transparent">
            <CardHeader>
              <CardTitle className="text-1xl flex justify-between">
                Model :<FaCubes className="text-1xl" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="historical">
          <div>historical</div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default DrawingSidebarMenuText;
