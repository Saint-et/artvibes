import { ScrollArea } from "@/components/ui/scroll-area";
import DrawingSidebarMenuCrop from "../drawing-navbar/(components)/drawing-sidebar-menu/drawing-sidebar-menu-Crop";
import {
  IsNewImage,
  IsNewCropImage,
  DrawArea,
  NewImageSize,
  SystemShadow,
} from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import CropArea from "../drawing-tools/crop/crop-area";
import CropPreArea from "../drawing-tools/crop/crop-pre-area";
import { FaDrawPolygon } from "react-icons/fa6";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { SystemCoverDrawing } from "@/public/assets/data/data";
import DrawingCropDisplay from "../drawing-tools/crop/drawing-crop-display";

interface DrawingWindowsProps {
  isMenuOpen: number;
  setMenuOpen: React.Dispatch<React.SetStateAction<any>>;
  //isNewImage: IsNewImage;
  //setNewImage: React.Dispatch<React.SetStateAction<any>>;
  setTextCanvasVisible: React.Dispatch<React.SetStateAction<any>>;
  imgCrop: IsNewCropImage[];
  isNewImageImport: IsNewImage[];
  setImgCrop: React.Dispatch<React.SetStateAction<any>>;
  textCanvasVisible: boolean;

  canvasCropRef: React.RefObject<HTMLCanvasElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setCanvasImage: React.Dispatch<React.SetStateAction<any>>;
  drawArea: DrawArea;
  isImageSize: NewImageSize;

  handleButtonClickImport: () => void;
  handleDeleteImport: (e: number) => void;
  isFileDialogOpenImport: boolean;
  setFileDialogOpenImport: React.Dispatch<React.SetStateAction<any>>;
  handleLastAdd: (e: IsNewImage) => void;
  handleSettDrawArea: (e: DrawArea) => void;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;

  isCanvasImage: string;

  isDraggingDrop: boolean;

  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  isResizing: ResizeDirection;
  handleCollectionImg: (id: number) => void;
  handleDeleteCropColection: (id: number) => void;
  isFreeAreaCrop: boolean;
  setFreeAreaCrop: React.Dispatch<React.SetStateAction<any>>;
  handleStartCrop: (e: boolean) => void;
  croppedImageUrl: string | null;
  setCroppedImageUrl: React.Dispatch<React.SetStateAction<any>>;
  sidebarRef: MutableRefObject<HTMLDivElement | null>;
  textCanvasContainerRef: MutableRefObject<HTMLDivElement | null>;
  textCanvasRef: MutableRefObject<HTMLDivElement | null>;
  systemShadow: SystemShadow;
  setSystemShadow: React.Dispatch<React.SetStateAction<any>>;
  isSliderLuminosity: number;
  zoom: number[];
}

const DrawingWindows: React.FC<DrawingWindowsProps> = (props) => {
  const canvasContainerWindowRef = useRef<HTMLDivElement | null>(null);
  const imageWindowRef = useRef<HTMLImageElement | null>(null);

  const [isNewWindowImage, setNewWindowImage] = useState<IsNewImage>({
    id: 1,
    fileName: "427525",
    img: SystemCoverDrawing.src,
  });
  const [isImageWindowSize, setImageWindowSize] = useState<NewImageSize>({
    w: 0,
    h: 0,
  });

  useEffect(() => {
    if (!isNewWindowImage.img) return;

    const img = new window.Image();
    img.src = isNewWindowImage.img;
    img.onload = () => {
      setImageWindowSize({
        w: img.width,
        h: img.height,
      });
    };
    img.onerror = () => {
      console.error("Failed to load the image.");
    };
  }, [isNewWindowImage]);

  

  return (
    <>
      <div
        className="flex flex-col h-screen overflow-hidden pt-[60px] pb-[60px]"
        style={{
          backgroundColor: `rgb(${props.isSliderLuminosity},${props.isSliderLuminosity},${props.isSliderLuminosity})`, // Set the background color separately
        }}
      >
        <div className="flex h-full w-full">
          <ScrollArea className="w-[100%] min-w-[300px] max-w-[300px] block bg-[#0d0d0d]">
            
            <DrawingCropDisplay isNewImage={isNewWindowImage} isLiveOn={false} {...props} />
          </ScrollArea>
          <div
            className="scrollbar-style w-full h-full flex justify-start items-center" //flex justify-center items-start
            style={{
              overflow: "scroll",
            }}
          >
            <div
              className="my-auto mx-auto"
              style={
                {
                  //transformOrigin: "left", //left
                  // height: isImageWindowSize.h * UseDrawing.zoom[0],
                  // width: isImageWindowSize.w * UseDrawing.zoom[0],
                }
              }
            >
              <div
                ref={canvasContainerWindowRef}
                style={{
                  //transform: `scale(${UseDrawing.zoom})`,
                  transformOrigin: "left top", //left
                  width: "max-content",
                  height: "max-content",
                  padding: 20,
                }}
              >
                {/*<div className="w-0 h-0">
              <CropArea {...UseDrawing} />
            </div>
            <CropPreArea {...UseDrawing} />*/}
                <div
                  style={{
                    border: "2px dashed transparent",
                  }}
                >
                  <div
                    className="z-20"
                    style={{
                      position: "absolute",
                      width: isImageWindowSize.w,
                      height: isImageWindowSize.h,
                      border: "2px dashed gold",
                      transition: "200ms",
                    }}
                  />
                  <img
                    ref={imageWindowRef}
                    src={isNewWindowImage?.img}
                    alt="logo"
                    style={{
                      transition: "200ms",
                    }}
                    //onMouseDown={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawingWindows;
