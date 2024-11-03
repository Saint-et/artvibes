"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  IsNewOverlay,
  IsNewOverlaySave,
  DrawArea,
  NewImageSize,
  LoadedImage,
  MenuLayer,
  IsNewImage,
  LayerElement,
} from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";
import { MutableRefObject, useState } from "react";
import {
  LuBan,
  LuCaseSensitive,
  LuEye,
  LuFolderCog,
  LuImage,
  LuImageOff,
  LuInfinity,
  LuLayers,
  LuLayoutDashboard,
  LuLoader2,
  LuLock,
  LuMoreVertical,
  LuPackage,
  LuPanelBottomClose,
  LuPencil,
  LuPenSquare,
  LuPlus,
  LuSquare,
  LuText,
  LuUnlock,
  LuX,
} from "react-icons/lu";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SvgComponents from "../../drawing-tools/area-tools/overlay/svg-file";
import SvgFullComponents from "../../drawing-tools/area-tools/overlay/svg-file-full";

interface DrawingSidebarToolsProps {
  isImgOverlay: IsNewOverlay;
  overlayContextRef: MutableRefObject<HTMLDivElement | null>;
  isResizing: ResizeDirection;
  setImgOverlaySave: React.Dispatch<React.SetStateAction<any>>;
  setImgOverlay: React.Dispatch<React.SetStateAction<any>>;
  isImgOverlaySave: IsNewOverlaySave[];
  drawArea: DrawArea;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  isImageSize: NewImageSize;
  startPosition: { x: number; y: number };
  overlayToolsRef: MutableRefObject<HTMLDivElement | null>;
  isDrawingLoad: LoadedImage;
  isMenuLayer: MenuLayer;
  setMenuLayer: React.Dispatch<React.SetStateAction<any>>;
  isLayers: LayerElement[];
  setLayers: React.Dispatch<React.SetStateAction<any>>;
  isNewImage: IsNewImage;
  drawingSidebarToolsRef: MutableRefObject<HTMLDivElement | null>;
  drawingSidebarToolsSettingRef: MutableRefObject<HTMLDivElement | null>;
}

const DrawingSidebarTools: React.FC<DrawingSidebarToolsProps> = (props) => {
  //const handleLayerRemoval = (id: number) => {
  //  // Filtrer les calques pour exclure le calque à supprimer
  //  const filteredLayers = props.isLayers.filter((e) => e?.LayerId !== id);
  //
  //  // Trouver l'index du calque à supprimer
  //  const removeIndex = props.isLayers.findIndex((e) => e?.LayerId === id);
  //
  //  // Trouver l'identifiant du calque précédent
  //  const previousLayerId =
  //    removeIndex > 0
  //      ? props.isLayers[removeIndex - 1]?.LayerId
  //      : props.isLayers[removeIndex + 1]?.LayerId;
  //
  //  // Mettre à jour l'état des calques
  //  props.setLayers(filteredLayers);
  //
  //  if (id === props.isMenuLayer.on) {
  //    // Mettre à jour le menu avec l'identifiant du calque précédent
  //    props.setMenuLayer((prevState: any) => ({
  //      ...prevState,
  //      on: previousLayerId,
  //    }));
  //  }
  //};

  //const [isFocused, setIsFocused] = useState<{ id: number; text: string }>({
  //  id: 0,
  //  text: "",
  //});

  //const handleType = (e: string) => {
  //  if (e === "image") return <LuImage className="text-[50px]" />;
  //  else if (e === "font") return <LuCaseSensitive className="text-[50px]" />;
  //  else if (e === "draw") return <LuPencil className="text-[50px]" />;
  //  else if (e === "form") return <LuSquare className="text-[50px]" />;
  //  return <LuInfinity className="text-[50px]" />;
  //};
  //const handleTypeUpdate = (newLayerType: string, layerIdToUpdate: number) => {
  //  const updatedLayers = props.isLayers.map((layer) => {
  //    // Vérifier si le LayerId correspond à celui que tu veux modifier
  //    if (layer.LayerId === layerIdToUpdate) {
  //      // Retourner une copie du layer avec le LayerType modifié
  //      return {
  //        ...layer,
  //        LayerType: newLayerType,
  //      };
  //    }
  //    // Retourner les autres layers sans modification
  //    return layer;
  //  });
  //  props.setLayers(updatedLayers);
  //};

  //const handleNameUpdate = () => {
  //  const updatedLayers = props.isLayers.map((layer) => {
  //    // Vérifier si le LayerId correspond à celui que tu veux modifier
  //    if (layer.LayerId === isFocused.id) {
  //      // Retourner une copie du layer avec le LayerName modifié
  //      return {
  //        ...layer,
  //        LayerName: isFocused.text,
  //      };
  //    }
  //    // Retourner les autres layers sans modification
  //    return layer;
  //  });
  //  props.setLayers(updatedLayers);
  //  setIsFocused({ id: 0, text: "" });
  //};

  const handleStyleForm = (el: any) => {
    if (el.formType === "line")
      return { background: el.color, borderRadius: 0 };
    else if (el.formType === "squareFull")
      return { background: el.color, borderRadius: 0 };
    else if (el.formType === "squareEmpty")
      return {
        boxShadow: `inset 0px 0px 0px ${el.thickness}px ${el.color}`,
        borderRadius: 0,
      };
    else if (el.formType === "squareRoundedFull")
      return { background: el.color, borderRadius: Math.min(el.w, el.h) / 6 };
    else if (el.formType === "squareRoundedEmpty")
      return {
        boxShadow: `inset 0px 0px 0px ${el.thickness}px ${el.color}`,
        borderRadius: Math.min(el.w, el.h) / 6,
      };
    else if (el.formType === "circleFull")
      return { background: el.color, borderRadius: Math.min(el.w, el.h) / 2 };
    else if (el.formType === "circleEmpty")
      return {
        boxShadow: `inset 0px 0px 0px ${el.thickness}px ${el.color}`,
        borderRadius: Math.min(el.w, el.h) / 2,
      };
  };

  const handleIconLock = (el: number) => {
    return props.setMenuLayer((prevState: MenuLayer) => ({
      ...prevState,
      blockOverlay: (prevState.blockOverlay as number[]).includes(el)
        ? prevState.blockOverlay.filter((blockId) => blockId !== el)
        : [...prevState.blockOverlay, el],
    }));
  };

  if (!props.isMenuLayer.menu) return null;

  return (
    <>
      <ScrollArea
        ref={props.drawingSidebarToolsRef}
        className="w-[20%] min-w-[150px] max-w-[150px] block bg-[#0d0d0d]"
      >
        <Card className="border-none rounded-none bg-inherit mb-5 p-2">
          <CardHeader className="p-1">
            <CardTitle className="text-[14px] flex justify-between items-center">
              Elements :{" "}
              <LuX
                onClick={() => {
                  props.setMenuLayer((prevState: any) => ({
                    ...prevState,
                    menu: false,
                  }));
                }}
                className="text-[16px] hover:cursor-pointer"
              />
            </CardTitle>
            {/*<Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">all items</SelectItem>
                <SelectItem value="font">text</SelectItem>
                <SelectItem value="draw">draw</SelectItem>
                <SelectItem value="image">image</SelectItem>
                <SelectItem value="form">form</SelectItem>
              </SelectContent>
            </Select>*/}
          </CardHeader>
          <Separator className="my-2" />
          <CardContent className="grid grid-cols-1 gap-4 p-0">
            {props.isLayers?.map((el: LayerElement, index: number) => {
              const IconComponent = (
                props.isMenuLayer.blockOverlay as number[]
              ).includes(el.id)
                ? {
                    icon: LuLock,
                    color: "#ff0000",
                  }
                : {
                    icon: LuUnlock,
                    color: "#ffd500",
                  };

              return (
                <Card
                  key={index}
                  onMouseEnter={() => {
                    props.setMenuLayer((prevState: any) => ({
                      ...prevState,
                      uniqueOverlaySelectPreview: el.id,
                    }));
                  }}
                  onMouseLeave={() => {
                    props.setMenuLayer((prevState: any) => ({
                      ...prevState,
                      uniqueOverlaySelectPreview: -1,
                    }));
                  }}
                >
                  <CardHeader className="p-1 border-b">
                    <CardTitle className="text-[14px] flex justify-between items-center">
                      {el.layerType}
                      <span className="flex gap-1">
                        <LuEye className="text-[16px] cursor-pointer" />
                        {el.layerType !== "draw" && (
                          <IconComponent.icon
                            className="text-[14px] cursor-pointer"
                            style={{
                              color: IconComponent.color,
                            }}
                            onClick={() => {
                              handleIconLock(el.id);
                            }}
                          />
                        )}
                        <LuX
                          className="text-[14px] cursor-pointer"
                          onClick={() => {
                            props.setLayers((prevLayers: LayerElement[]) =>
                              prevLayers.filter((layer) => layer.id !== el.id)
                            );
                            props.setMenuLayer((prevState: MenuLayer) => ({
                              ...prevState,
                              blockOverlay: prevState.blockOverlay.filter(
                                (blockId) => blockId !== el
                              ),
                            }));
                          }}
                        />
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent
                    className="flex justify-center items-center p-4 cursor-pointer drawing-css-bg-main-tranparent"
                    onClick={() => {
                      //props.setMenuLayer((prevState: any) => ({
                      //  ...prevState,
                      //  on: el.LayerId,
                      //}));
                    }}
                  >
                    {el.layerType === "overlay" && (
                      <>
                        {el.miniature ? (
                          <img
                            className="hover:scale-95 h-20"
                            src={el.miniature}
                            alt=""
                          />
                        ) : (
                          <div className="hover:scale-95 h-20 w-full flex items-center justify-center">
                            <LuImageOff className="text-6xl text-[#bf4040]" />
                          </div>
                        )}
                      </>
                    )}
                    {el.layerType === "draw" && (
                      <>
                        {el.img ? (
                          <img
                            className="hover:scale-95 h-20"
                            src={el.img}
                            alt=""
                          />
                        ) : (
                          <div className="hover:scale-95 h-20 w-full flex items-center justify-center">
                            <LuImageOff className="text-6xl text-[#bf4040]" />
                          </div>
                        )}
                      </>
                    )}
                    {el.layerType === "form" && (
                      <div
                        className="h-20 w-20 hover:scale-95"
                        style={{
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          className="h-full w-full hover:scale-95"
                          style={{
                            ...handleStyleForm(el),
                            opacity: el.opacity,
                          }}
                        />
                      </div>
                    )}

                    {el.layerType === "text" && (
                      <div
                        className="input_textareaCreative"
                        style={{
                          userSelect: "none",
                          fontSize: el.fontSize,
                          color: el.color,
                          textAlign: el.textAlign,
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                        }}
                        onDragStart={(e) => {
                          e.preventDefault();
                        }}
                        {...(el.text && {
                          dangerouslySetInnerHTML: { __html: el.text },
                        })}
                        //contentEditable={false}
                      />
                    )}
                    {el.layerType === "overlay-svg" && (
                      <div className="hover:scale-95">
                        <SvgComponents
                          drawSvg={{
                            img: el.svgImg,
                            svg: el.svg,
                            filter: el.filter,
                            crop: el.crop,
                            thickness: el.thickness,
                            borderColor: el.borderColor,
                          }}
                          strokePathRef={null}
                          strokeRectRef={null}
                        />
                      </div>
                    )}
                    {el.layerType === "overlay-svg-full" && (
                      <div className="hover:scale-95">
                        <SvgFullComponents
                          drawSvgFull={{
                            svg: el.svg,
                            thickness: el.thickness,
                            borderColor: el.borderColor,
                            color: el.color,
                          }}
                          strokeRectBgRef={null}
                          strokePathRef={null}
                          strokeRectRef={null}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      </ScrollArea>
    </>
  );
};

export default DrawingSidebarTools;
