"use client";

import DrawingSidebarMenuText from "./drawing-sidebar-menu/drawing-sidebar-menu-text";
import DrawingSidebarMenuFilters from "./drawing-sidebar-menu/drawing-sidebar-menu-filters";
import DrawingSidebarMenuForms from "./drawing-sidebar-menu/drawing-sidebar-menu-form";
import DrawingSidebarMenuCrop from "./drawing-sidebar-menu/drawing-sidebar-menu-Crop";
import DrawingSidebarMenuOverlay from "./drawing-sidebar-menu/drawing-sidebar-menu-overlay";
import DrawingSidebarMenuClones from "./drawing-sidebar-menu/drawing-sidebar-menu-clones";
import DrawingSidebarMenuTemplates from "./drawing-sidebar-menu/drawing-sidebar-menu-models";
import {
  DrawArea,
  IsNewCropImage,
  IsNewImage,
  IsNewOverlay,
  IsNewOverlaySave,
  NewImageSize,
  SystemShadow,
} from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MutableRefObject } from "react";
import DrawingSidebarMenuAI from "./drawing-sidebar-menu/drawing-sidebar-menu-ai";

interface DrawingSidebarProps {
  isMenuOpen: number;
  setMenuOpen: React.Dispatch<React.SetStateAction<any>>;
  isNewImage: IsNewImage;
  setNewImage: React.Dispatch<React.SetStateAction<any>>;
  setTextCanvasVisible: React.Dispatch<React.SetStateAction<any>>;
  imgCrop: IsNewCropImage[];
  isNewImageImport: IsNewImage[];
  setImgCrop: React.Dispatch<React.SetStateAction<any>>;
  textCanvasVisible: boolean;
  systemSetting: {
    brightness: number;
    contrast: number;
    saturation: number;
    sepia: number;
    grayscale: number;
    invert: number;
    hue: number;
    blur: number;
  };
  setSystemSetting: React.Dispatch<React.SetStateAction<any>>;

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
  overlayAreaRef: MutableRefObject<HTMLDivElement | null>;
  textCanvasRef: MutableRefObject<HTMLDivElement | null>;
  systemShadow: SystemShadow;
  setSystemShadow: React.Dispatch<React.SetStateAction<any>>;
  setImgOverlay: React.Dispatch<React.SetStateAction<any>>;
  zoom: number[];
  isImgOverlaySave: IsNewOverlaySave[];
  setImgOverlaySave: React.Dispatch<React.SetStateAction<any>>;
  isImgOverlay: IsNewOverlay;
  setDrawingExpandImg: React.Dispatch<React.SetStateAction<any>>;
  drawingExpandImg: number;
  dialogLastImportRef: MutableRefObject<HTMLDivElement | null>;
}

const DrawingSidebar: React.FC<DrawingSidebarProps> = (props) => {
  // <DrawingSidebarMenu {...props} /> bg-[#0a0a0a] bg-[#0a0a0a]

  if (!props.isNewImage.img) return null;

  if (props.isMenuOpen === 0) return null;

  return (
    <>
      <ScrollArea
        ref={props.sidebarRef}
        className="w-[100%] min-w-[300px] max-w-[300px] block bg-[#0d0d0d]"
      >
        <DrawingSidebarMenuAI {...props} />

        <DrawingSidebarMenuText {...props} />

        <DrawingSidebarMenuFilters {...props} />

        <DrawingSidebarMenuForms {...props} />

        <DrawingSidebarMenuCrop {...props} />

        <DrawingSidebarMenuOverlay {...props} />

        <DrawingSidebarMenuClones {...props} />

        <DrawingSidebarMenuTemplates {...props} />
      </ScrollArea>
    </>
  );
};

export default DrawingSidebar;
