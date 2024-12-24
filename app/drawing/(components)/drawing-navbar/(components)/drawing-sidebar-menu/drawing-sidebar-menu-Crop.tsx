"use client";

import { Card, CardContent } from "@/components/ui/card";
import DrawingCropDisplay from "../../../drawing-tools/area-tools/crop/drawing-crop-display";
import { Button } from "@/components/ui/button";
import { FaCropSimple, FaBorderTopLeft, FaVectorSquare } from "react-icons/fa6";
import toast from "react-hot-toast";
import {
  DrawArea,
  IsNewImage,
  NewImageSize,
  SystemSettings,
} from "@/utils/interface";

import { ResizeDirection } from "@/utils/type";
import { Separator } from "@/components/ui/separator";
import { LuCrop, LuLink2, LuMaximize, LuMinimize } from "react-icons/lu";
//import useUtilsDrawing from "../../../utils/utilsDrawing";
import { DrawingName } from "@/public/assets/data/data";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRef } from "react";
import { generateRandomId, resizeImageBase64 } from "@/utils/utils";

interface DrawingSidebarMenuCropProps {
  canvasCropRef: React.RefObject<HTMLCanvasElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isNewImage: IsNewImage;
  isCanvasImage: string;
  drawArea: DrawArea;
  isNewImageImport: IsNewImage[];
  systemSetting: SystemSettings;
  isImageSize: NewImageSize;
  isMenuOpen: number;

  setCanvasImage: React.Dispatch<React.SetStateAction<any>>;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  setNewImageImport: React.Dispatch<React.SetStateAction<any>>;
  //setNewImage: React.Dispatch<React.SetStateAction<any>>;

  handleLastAdd: (e: IsNewImage) => void;
  handleSettDrawArea: (e: DrawArea) => void;
  isResizing: ResizeDirection;
  handleCollectionImg: (id: number) => void;
  handleDeleteCropColection: (id: number) => void;
  isFreeAreaCrop: boolean;
  setFreeAreaCrop: React.Dispatch<React.SetStateAction<any>>;
  handleStartCrop: (e: boolean) => void;
  croppedImageUrl: string | null;
  setCroppedImageUrl: React.Dispatch<React.SetStateAction<any>>;
  zoom: number[];
}

const DrawingSidebarMenuCrop: React.FC<DrawingSidebarMenuCropProps> = (
  props
) => {
  //const UseUtilsDrawing = useUtilsDrawing();

  const addCropPicture = () => {
    return new Promise((resolve, reject) => {
      try {
        if (!props.croppedImageUrl) {
          return reject(new Error("Failed to save image"));
        }
        resizeImageBase64(
          props.croppedImageUrl,
          300,
          function (resizedBlob: any) {
            if (!props.croppedImageUrl) {
              return reject(new Error("Failed to save image"));
            }
            const imgValue: IsNewImage = {
              id: generateRandomId(),
              fileName: `${DrawingName}-${Date.now()}`,
              img: props.croppedImageUrl,
              miniature: resizedBlob || "",
            };
            resolve(imgValue);
          }
        );
      } catch {
        reject(new Error("Failed to save image"));
      }
    });
  };

  function handleSaveImage() {
    toast.promise(
      addCropPicture().then((result) => {
        const newImage = result as IsNewImage; // Convertir `result` au type `IsNewImage`
        props.setNewImageImport((prevState: IsNewImage[]) => [
          ...prevState,
          newImage,
        ]);
        props.handleLastAdd(newImage);
        //props.setDrawArea({
        //  width: props.drawArea.width,
        //  height: props.drawArea.height,
        //  rotate: 0,
        //  leftOffset: 0,
        //  topOffset: 0,
        //  positionX: 0,
        //  positionY: 0,
        //});
        return true;
      }),
      {
        loading: "Processing in progress...",
        success: (result) => {
          if (result) {
            return <b>Successfully complete.</b>;
          } else {
            throw new Error("Failed to save");
          }
        },
        error: <b>Could not save.</b>,
      }
    );
  }

  const sizePositionOverlerlay =
    props.isImageSize.w < props.isImageSize.h
      ? props.isImageSize.w
      : props.isImageSize.h;

  if (props.isMenuOpen !== 5) return null;

  return (
    <>
      <Card className="border-none rounded-none bg-transparent">
        <CardContent className="grid grid-cols-1 gap-2 p-4 text-black dark:text-white">
          <div className="text-1xl flex justify-between">
            Crop :<LuCrop className="h-4 w-4" />
          </div>
          <Separator className="my-2" />
          <div className="relative w-full h-80 overflow-hidden rounded-lg group cursor-pointer">
            <DrawingCropDisplay {...props} isRendering={true} />
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      props.setDrawArea({
                        width: props.isImageSize.w,
                        height: props.isImageSize.h,
                        rotate: 0,
                        leftOffset: 0,
                        topOffset: 0,
                        positionX: 0,
                        positionY: 0,
                      });
                    }}
                    className="w-full mt-1"
                    variant="outline"
                  >
                    <LuMaximize className="h-4 w-4" />
                  </Button>
                  <Button
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!props.croppedImageUrl) {
                        return toast("⚠️ No images to crop. ⚠️", {
                          duration: 3000,
                          style: {
                            borderColor: "#ffcc00",
                            color: "#ffcc00",
                          },
                        });
                      }
                      handleSaveImage();
                    }}
                    variant={"activeBlue"}
                    disabled={!props.croppedImageUrl}
                  >
                    <FaCropSimple className="text-1xl" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      props.setDrawArea({
                        rotate: 0,
                        width: sizePositionOverlerlay / 2,
                        height: sizePositionOverlerlay / 2,
                        leftOffset: 0,
                        topOffset: 0,
                        positionX:
                          props.isImageSize.w / 2 - sizePositionOverlerlay / 4,
                        positionY:
                          props.isImageSize.h / 2 - sizePositionOverlerlay / 4,
                      });
                    }}
                    className="w-full mt-1"
                    variant="outline"
                  >
                    <LuMinimize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-1 mt-4">
            <Input
              value={props.drawArea.width.toFixed()}
              onChange={(e) => {
                props.setDrawArea((prevState: DrawArea) => ({
                  ...prevState,
                  width: e,
                }));
              }}
              className="w-full h-[40px] bg-inherit"
              type="number"
              placeholder="width"
            />
            <LuLink2 className="w-[50px] cursor-pointer" />
            <Input
              value={props.drawArea.height.toFixed()}
              onChange={(e) => {
                props.setDrawArea((prevState: DrawArea) => ({
                  ...prevState,
                  height: e,
                }));
              }}
              className="w-full h-[40px] bg-inherit"
              type="number"
              placeholder="height"
            />
          </div>
          <Separator className="my-4" />
          <div>Resizing preference:</div>
          <div className="grid grid-cols-2 gap-2 p-1">
            <Button
              className="flex flex-col justify-center items-center h-full"
              onClick={() => {
                props.setFreeAreaCrop(true);
              }}
              variant={props.isFreeAreaCrop ? "default" : "ghost"}
            >
              <FaBorderTopLeft className="text-1xl" />
            </Button>
            <Button
              className="flex flex-col justify-center items-center h-full"
              onClick={() => {
                props.setFreeAreaCrop(false);
              }}
              variant={!props.isFreeAreaCrop ? "default" : "ghost"}
            >
              <FaVectorSquare className="text-1xl" />
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="text-neutral-500 text-sm">
            Note: The "cropping" option must be set as of the start of the
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

export default DrawingSidebarMenuCrop;
