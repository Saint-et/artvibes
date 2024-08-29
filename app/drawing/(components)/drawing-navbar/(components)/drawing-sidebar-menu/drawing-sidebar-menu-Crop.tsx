"use client";

import { Card, CardContent } from "@/components/ui/card";
import DrawingCropDisplay from "../../../drawing-tools/crop/drawing-crop-display";
import { Button } from "@/components/ui/button";
import { FaExpand, FaDownload } from "react-icons/fa";
import {
  FaCropSimple,
  FaBorderTopLeft,
  FaVectorSquare,
  FaCrop,
  FaBolt,
} from "react-icons/fa6";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  DrawArea,
  IsNewCropImage,
  IsNewImage,
  NewImageSize,
  SystemSettings,
} from "@/utils/interface";

import { ResizeDirection } from "@/utils/type";
import { downloadImage } from "@/utils/utils";
import DrawingCropCard from "../cards/drawing-crop-card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VscAccount } from "react-icons/vsc";
import { useAppContext } from "@/app/provider/useAppContext";
import { Input } from "@/components/ui/input";

interface DrawingSidebarMenuCropProps {
  canvasCropRef: React.RefObject<HTMLCanvasElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isNewImage: IsNewImage;
  imgCrop: IsNewCropImage[];
  isCanvasImage: string;
  drawArea: DrawArea;
  isNewImageImport: IsNewImage[];
  systemSetting: SystemSettings;
  isImageSize: NewImageSize;
  isMenuOpen: number;

  setImgCrop: React.Dispatch<React.SetStateAction<any>>;
  setCanvasImage: React.Dispatch<React.SetStateAction<any>>;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
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
  // [{ id: 1, fileName: '', array: [{img: '',area: {}}, {img: '',area: {}}] }, { id: 2, fileName: '', array: [{img: '',area: {}}, {img: '',area: {}}] }]

  //const handleCropImageVerification = () => {
  //  if (croppedImageUrl) {
  //    return croppedImageUrl.split(",")[1].length < 100;
  //  }
  //  return false;
  //};

  const UseAppContext = useAppContext();

  const handleSaveImageToast = async () => {
    //const canvas = props.canvasCropRef.current;
    if (!props.croppedImageUrl) return;

    return await new Promise(async (resolve, reject) => {
      try {
        // Ajouter le blobUrl à la liste imgCrop
        props.setImgCrop([props.croppedImageUrl, ...props.imgCrop]);

        // Chercher l'élément avec le même ID que l'image courante
        const findFile = props.imgCrop.find(
          (el) => el.id === props.isNewImage.id
        );

        const { w: imageWidth, h: imageHeight } = props.isImageSize;
        const {
          width: cropWidth,
          height: cropHeight,
          positionX,
          positionY,
          leftOffset,
          topOffset,
        } = props.drawArea;

        // Calculer les nouvelles coordonnées de recadrage en incluant les offsets
        const adjustedCropX = Math.max(
          Math.min(positionX + leftOffset, imageWidth - cropWidth),
          0
        );
        const adjustedCropY = Math.max(
          Math.min(positionY + topOffset, imageHeight - cropHeight),
          0
        );

        const adjustedWidth = Math.min(cropWidth, imageWidth);
        const adjustedHeight = Math.min(cropHeight, imageHeight);

        if (findFile) {
          resolve(true);

          // Mettre à jour l'élément existant dans imgCrop
          props.setImgCrop(
            props.imgCrop.map((el) =>
              el.id === props.isNewImage.id
                ? {
                    ...el,
                    array: [
                      {
                        img: props.croppedImageUrl,
                        area: {
                          ...props.drawArea,
                          positionX: adjustedCropX,
                          positionY: adjustedCropY,
                          width: adjustedWidth,
                          height: adjustedHeight,
                          leftOffset: 0,
                          topOffset: 0,
                        },
                      },
                      ...el.array.slice(0, 4),
                    ],
                  }
                : el
            )
          );
        } else {
          resolve(true);
          // Ajouter un nouvel élément à imgCrop
          props.setImgCrop([
            {
              id: props.isNewImage.id,
              fileName: props.isNewImage.fileName,
              array: [
                {
                  img: props.croppedImageUrl,
                  area: {
                    ...props.drawArea,
                    positionX: adjustedCropX,
                    positionY: adjustedCropY,
                    width: adjustedWidth,
                    height: adjustedHeight,
                    leftOffset: 0,
                    topOffset: 0,
                  },
                },
              ],
            },
            ...props.imgCrop,
          ]);
        }
      } catch {
        reject(new Error("Failed to save image"));
      }
    });
  };

  const handleDownload = () => {
    if (!props.croppedImageUrl) {
      return toast.error("Unable to download.");
    }

    // Exemple de dataURL générée par canvas.toDataURL()
    const dataURL = props.croppedImageUrl;

    // Nom du fichier pour le téléchargement
    const fileName = "cropped-image.png";

    // Appel de la fonction pour télécharger l'image
    downloadImage(dataURL, fileName);
  };

  //console.log(props.drawArea);

  function handleSaveImage() {
    // Utiliser toast.promise pour gérer la promesse
    toast.promise(handleSaveImageToast(), {
      loading: "Processing in progress...",
      success: (result) => {
        if (result) {
          return <b>Successfully complete.</b>;
        } else {
          throw new Error("Failed to save");
        }
      },
      error: <b>Could not save.</b>,
    });
  }

  //const handleStartCrop = (el?: boolean) => {
  //  if (!el) {
  //    props.setDrawArea({
  //      width: 300,
  //      height: 200,
  //      leftOffset: 0,
  //      topOffset: 0,
  //      positionX: props.isImageSize.w / 2 - 152,
  //      positionY: props.isImageSize.h / 2 - 102,
  //    });
  //  }
  //};
  //const handleStopCrop = () => {
  //  props.setCanvasImage("");
  //};

  const handleCropHistoricalPreview = () => {
    if (props.imgCrop.length === 0) {
      return props.imgCrop;
    }
    if (props.imgCrop[0].id === props.isNewImage.id) {
      return [props.imgCrop[0]];
    }
    return [];
  };
  const handleCropHistorical = () => {
    // Si le tableau imgCrop est vide, retourner tel quel
    if (props.imgCrop.length === 0) {
      return props.imgCrop;
    }

    // Si la première image a le même ID que la nouvelle image, retourner une copie du tableau sans le premier élément
    if (props.imgCrop[0].id === props.isNewImage.id) {
      return props.imgCrop.slice(1); // Utilise slice pour éviter de modifier l'original
    }

    // Sinon, retourner le tableau original
    return props.imgCrop;
  };

  //console.log(props.imgCrop);

  if (props.isMenuOpen !== 5) return null;

  return (
    <>
      <Tabs className="mt-4" defaultValue="crop">
        <TabsList className="bg-transparent">
          <TabsTrigger
            className="data-[state=active]:bg-[#4763eb]"
            value="crop"
          >
            Crop
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-[#4763eb]"
            value="historical"
          >
            Historical
          </TabsTrigger>
        </TabsList>

        <Separator className="my-4" />

        <TabsContent value="crop">
          <div className="text-1xl flex justify-between mx-4">
            Crop area :<FaCropSimple className="text-1xl" />
          </div>
          <div className="p-1">
            <div className="relative w-full h-80 overflow-hidden rounded-lg group cursor-pointer drawing-css-bg">
              <DrawingCropDisplay {...props} />
              <div
                className="absolute inset-0 flex flex-col justify-end p-4 text-white"
                onClick={() => {
                  UseAppContext.setSrcImg(props.croppedImageUrl || undefined);
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        props.setDrawArea({
                          width: props.isImageSize.w,
                          height: props.isImageSize.h,
                          leftOffset: 0,
                          topOffset: 0,
                          positionX: 0,
                          positionY: 0,
                        });
                      }}
                      className="w-full mt-1"
                      variant="outline"
                    >
                      <FaExpand className="h-4 w-4" />
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
                        handleDownload();
                      }}
                      className="w-full mt-1"
                      variant={"outline"}
                      style={{
                        filter: !props.croppedImageUrl
                          ? "grayscale(100%)"
                          : "grayscale(0%)",
                        cursor: !props.croppedImageUrl
                          ? "not-allowed"
                          : "pointer",
                      }}
                    >
                      <FaDownload className="text-1xl" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-1">
              <Button
                className="flex flex-col justify-center items-center h-full"
                onClick={() => {
                  props.setFreeAreaCrop(true);
                }}
                variant={props.isFreeAreaCrop ? "activeBlue" : "outline"}
              >
                <FaBorderTopLeft className="text-1xl" />
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full"
                onClick={() => {
                  props.setFreeAreaCrop(false);
                }}
                variant={!props.isFreeAreaCrop ? "activeBlue" : "outline"}
              >
                <FaVectorSquare className="text-1xl" />
              </Button>
            </div>
            <Card className="bg-inherit border-none">
              <CardContent className="flex p-1 gap-4">
                <div className="border rounded flex items-center gap-2 p-1 h-[40px] overflow-hidden">
                  w:{" "}
                  <Input
                    value={props.drawArea.width.toFixed()}
                    disabled
                    className="w-full h-[40px] border-none"
                    type="number"
                    placeholder="width"
                  />
                </div>
                <div className="border rounded flex items-center gap-2 p-1 h-[40px] overflow-hidden">
                  h:{" "}
                  <Input
                    value={props.drawArea.height.toFixed()}
                    disabled
                    className="w-full h-[40px] border-none"
                    type="number"
                    placeholder="height"
                  />
                </div>
              </CardContent>
            </Card>
            <Separator className="my-4" />
            <div className="mt-4">
              <DrawingCropCard
                {...props}
                imgCrop={handleCropHistoricalPreview()}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="historical">
          <div className="text-1xl flex justify-between mx-4">
            Crop historical :<FaCropSimple className="text-1xl" />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <DrawingCropCard
              {...props}
              imgCrop={handleCropHistoricalPreview()}
            />
            <Separator className="my-4" />
            <DrawingCropCard
              {...props}
              imgCrop={handleCropHistorical()}
              handleStartCrop={props.handleStartCrop}
            />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default DrawingSidebarMenuCrop;
