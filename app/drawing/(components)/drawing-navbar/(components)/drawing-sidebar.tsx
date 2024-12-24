"use client";

import DrawingSidebarMenuText from "./drawing-sidebar-menu/drawing-sidebar-menu-text";
import DrawingSidebarMenuFilters from "./drawing-sidebar-menu/drawing-sidebar-menu-filters";
import DrawingSidebarMenuForms from "./drawing-sidebar-menu/drawing-sidebar-menu-form";
import DrawingSidebarMenuCrop from "./drawing-sidebar-menu/drawing-sidebar-menu-Crop";
import DrawingSidebarMenuOverlay from "./drawing-sidebar-menu/drawing-sidebar-menu-overlay";
import DrawingSidebarMenuClones from "./drawing-sidebar-menu/drawing-sidebar-menu-clones";
import {
  AiQuality,
  Blanket,
  DrawArea,
  DrawDrawing,
  DrawFiligrane,
  DrawForm,
  DrawingSetting,
  DrawNowInterface,
  DrawSvg,
  DrawSvgFull,
  DrawText,
  ExpandImg,
  FileDialogOpen,
  IsNewImage,
  IsNewOverlay,
  IsNewOverlaySave,
  LayerElement,
  LoadedImage,
  MenuLayer,
  NewImageSize,
  SystemShadow,
} from "@/utils/interface";
import { CustomStyleMap, ResizeDirection } from "@/utils/type";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MutableRefObject } from "react";
import DrawingSidebarMenuAI from "./drawing-sidebar-menu/drawing-sidebar-menu-ai";
import DrawingSidebarMenuExpand from "./drawing-sidebar-menu/drawing-sidebar-menu-expand";
import DrawingSidebarMenuBlanket from "./drawing-sidebar-menu/drawing-sidebar-menu-blanket";
import DrawingSidebarMenuFiligrane from "./drawing-sidebar-menu/drawing-sidebar-menu-filigrane";

interface DrawingSidebarProps {
  isMenuOpen: number;
  setMenuOpen: React.Dispatch<React.SetStateAction<any>>;
  isNewImage: IsNewImage;
  setNewImage: React.Dispatch<React.SetStateAction<any>>;
  setTextCanvasVisible: React.Dispatch<React.SetStateAction<any>>;
  //imgCrop: IsNewCropImage[];
  isNewImageImport: IsNewImage[];
  //setImgCrop: React.Dispatch<React.SetStateAction<any>>;
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
  isFileDialogOpen: FileDialogOpen;
  setFileDialogOpen: React.Dispatch<React.SetStateAction<FileDialogOpen>>;
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
  dialogLastImportRef: MutableRefObject<HTMLDivElement | null>;
  isDrawingLoad: LoadedImage | undefined;
  handleSaveImgOverlay: (
    newImg?: string,
    form?: string,
    shadow?: number
  ) => void;
  handleResetImgOverlay: () => void;
  setDrawForm: React.Dispatch<React.SetStateAction<any>>;
  drawForm: DrawForm;
  isFormCanvasVisible: string;
  setFormCanvasVisible: React.Dispatch<React.SetStateAction<any>>;
  setNewImageImport: React.Dispatch<React.SetStateAction<any>>;
  insetImgRef: MutableRefObject<HTMLDivElement | null>;
  insetExpandRef: MutableRefObject<HTMLDivElement | null>;
  colorOutsideImgRef: MutableRefObject<HTMLDivElement | null>;
  expandDivRef: MutableRefObject<HTMLDivElement | null>;

  handleSaveForm: (form?: string) => void;

  handleResetForm: () => void;
  setMenuLayer: React.Dispatch<React.SetStateAction<any>>;
  isMenuLayer: MenuLayer;
  setBlanket: React.Dispatch<React.SetStateAction<any>>;
  isBlanket: Blanket;
  drawingExpandImg: ExpandImg;
  blanketRef: MutableRefObject<HTMLDivElement | null>;

  drawDrawing: DrawDrawing;
  setDrawDrawing: React.Dispatch<React.SetStateAction<any>>;
  isDrawingNowCanvas: DrawNowInterface;
  setIsDrawingNowCanvas: React.Dispatch<React.SetStateAction<DrawNowInterface>>;
  isLayers: LayerElement[];
  DrawCanvasImg: () => void;
  canvasDrawRef: MutableRefObject<HTMLCanvasElement | null>;
  setLayers: React.Dispatch<React.SetStateAction<any>>;
  HandleCanvas: (id: number, image: string) => void;
  handleSetBasicOverlay: () => void;
  setDrawText: React.Dispatch<React.SetStateAction<any>>;
  drawText: DrawText;
  handleResetSvg: () => void;
  setDrawSvg: React.Dispatch<React.SetStateAction<any>>;
  drawSvg: DrawSvg;
  handleSaveSvg: (newSvg?: string, img?: string) => void;
  isDrawingSetting: DrawingSetting;
  setDrawingSetting: React.Dispatch<React.SetStateAction<any>>;

  handleAiQuality: () => void;
  isAiQuality: AiQuality;
  setAiQuality: React.Dispatch<React.SetStateAction<AiQuality>>;

  drawSvgFull: DrawSvgFull;
  setDrawSvgFull: React.Dispatch<React.SetStateAction<DrawSvgFull>>;
  handleSaveSvgFull: (newSvg?: string) => void;
  handleResetSvgFull: () => void;
  textSizeRef: React.RefObject<HTMLInputElement>;
  handleSaveText: (newValue?: boolean) => void;
  editorState: any;
  setEditorState: React.Dispatch<React.SetStateAction<any>>;
  customStyleMap: CustomStyleMap;
  setCustomStyleMap: React.Dispatch<React.SetStateAction<any>>;
  setOutsideClickActive: React.Dispatch<React.SetStateAction<any>>;
  customStyleShadowMap: CustomStyleMap;
  setCustomStyleShadowMap: React.Dispatch<React.SetStateAction<any>>;
    drawFiligrane: DrawFiligrane;
    setDrawFiligrane: React.Dispatch<React.SetStateAction<any>>;
    handleNewMaxZoom: () => void;
}

const DrawingSidebar: React.FC<DrawingSidebarProps> = (props) => {
  // <DrawingSidebarMenu {...props} /> bg-[#0a0a0a] bg-[#0a0a0a]

  if (!props.isNewImage.img) return null;
  //if (props.isMenuOpen === 99) return null;
  if (props.isMenuOpen === 100) return null;
  if (props.isMenuOpen === 0) return null;

  return (
    <>
      <ScrollArea
        ref={props.sidebarRef}
        className="w-[100%] min-w-[300px] max-w-[300px] block bg-[#F5F5F7] dark:bg-[#0d0d0d]"
      >
        <DrawingSidebarMenuAI {...props} />

        <DrawingSidebarMenuText {...props} />

        <DrawingSidebarMenuFilters {...props} />

        <DrawingSidebarMenuBlanket {...props} />

        <DrawingSidebarMenuForms {...props} />

        <DrawingSidebarMenuCrop {...props} />

        <DrawingSidebarMenuOverlay {...props} />

        <DrawingSidebarMenuClones {...props} />

        <DrawingSidebarMenuExpand {...props} />

        <DrawingSidebarMenuFiligrane {...props} />

      </ScrollArea>
    </>
  );
};

export default DrawingSidebar;
