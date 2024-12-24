import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  FaBoxArchive,
  FaBrain,
  FaClock,
  FaCropSimple,
  FaDownload,
  FaImage,
  FaPenToSquare,
  FaPlus,
  FaRegObjectGroup,
  FaRegTrashCan,
} from "react-icons/fa6";
import { MutableRefObject, useRef, useState } from "react";
import {
  DrawArea,
  DrawingSetting,
  ExpandImg,
  FileDialogOpen,
  IsNewCropImage,
  IsNewImage,
  IsNewOverlay,
  LayerElement,
  NewImageSize,
  RenderingOption,
  ResizeInterface,
} from "@/utils/interface";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  DrawingName,
  SystemBackgroungAbstractImg,
  SystemBackgroungCommercialImg,
  SystemBackgroungWallpaperImg,
} from "@/public/assets/data/data";
import {
  LuArrowLeft,
  LuFolder,
  LuLink2,
  LuPictureInPicture,
  LuScaling,
} from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { number } from "zod";
import { useAppContext } from "@/app/provider/useAppContext";
import { resizeImageBase64, resizeNewImageBase64 } from "@/utils/utils";

interface LastImportProps {
  handleDeleteImport: (e: number) => void;
  setNewImage: React.Dispatch<React.SetStateAction<any>>;
  isFileDialogOpen: FileDialogOpen;
  isNewImage: IsNewImage;
  setFileDialogOpen: React.Dispatch<React.SetStateAction<FileDialogOpen>>;
  isNewImageImport: IsNewImage[];
  handleLastAdd: (e: IsNewImage) => void;
  handleButtonClickImport: () => void;
  handleCollectionImg: (id: number) => void;
  handleDeleteCropColection: (id: number) => void;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  handleSettDrawArea: (e: DrawArea) => void;
  handleStartCrop: (e: boolean) => void;
  isMenuOpen: number;
  setImgOverlay: React.Dispatch<React.SetStateAction<any>>;
  isImgOverlay: IsNewOverlay;
  dialogLastImportRef: MutableRefObject<HTMLDivElement | null>;
  isImageSize: NewImageSize;
  handleResetImgOverlay: () => void;
  setImgBorderOn: React.Dispatch<React.SetStateAction<any>>;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  isDraggingDrop: boolean;
  setDrawingExpandImg: React.Dispatch<React.SetStateAction<any>>;
  drawingExpandImg: ExpandImg;
  isDrawingSetting: DrawingSetting;
  setDrawingSetting: React.Dispatch<React.SetStateAction<DrawingSetting>>;
  handleSaveImgOverlay: (
    newImg?: string,
    form?: string,
    shadow?: number,
    miniature?: string
  ) => void;
  isSystemResize: ResizeInterface;
  setSystemResize: React.Dispatch<React.SetStateAction<ResizeInterface>>;
  isRenderingOption: RenderingOption;
  setIsRenderingOption: React.Dispatch<React.SetStateAction<any>>;
  handleRenderingToast: (isLayers: LayerElement[]) => Promise<string>;
  handleSvgConverter: () => Promise<LayerElement[]>;
}

type LastImportTabsType = "background" | "models" | "import";
type LastSubMenuBgType = "Abstract" | "Wallpaper" | "Commercial" | null;

const LastImport: React.FC<LastImportProps> = (props) => {
  const { handleViewImage } = useAppContext();

  const [lastImportTabs, setLastImportTabs] = useState<{
    menu: LastImportTabsType;
    subMenuBg: LastSubMenuBgType;
  }>({ menu: "import", subMenuBg: null });

  const overlayActive = () => {
    if (props.isMenuOpen === 4 || props.isMenuOpen === 5) {
      return true;
    }
  };

  const [isSystemColor, setSystemColor] = useState<string>("#ffffff");
  const [isTransparent, setIsTransparent] = useState<boolean>(false);
  const [isSystemSize, setSystemSize] = useState<NewImageSize>({
    w: 1200,
    h: 800,
  });

  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClickColor = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  function isSignificantImage(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    if (!context) return false;

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Parcourir tous les pixels
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      const alpha = data[i + 3];

      // Vérifier si le pixel n'est pas totalement transparent
      if (alpha !== 0) {
        // Vérifier si le pixel est différent de la transparence totale (0,0,0,0)
        // Ici, on vérifie si au moins un canal de couleur est non nul
        if (red !== 0 || green !== 0 || blue !== 0) {
          return true;
        }
      }
    }

    return false; // Tous les pixels sont soit totalement transparents, soit noirs avec alpha 0
  }

  const CreateMainCanvasToast = async () => {
    return await new Promise(async (resolve, reject) => {
      // Créer un canvas virtuel
      const canvas = document.createElement("canvas");
      const canvasMiniature = document.createElement("canvas");
      canvas.width = isSystemSize.w;
      canvas.height = isSystemSize.h;
      canvasMiniature.width = 100;
      canvasMiniature.height = 100;

      // Obtenir le contexte 2D
      const context = canvas.getContext("2d");
      const contextcanvasMiniature = canvasMiniature.getContext("2d");

      if (context && contextcanvasMiniature) {
        // Dessiner un fond sur le grand canvas
        context.fillStyle = isTransparent ? "rgba(0,0,0,0)" : isSystemColor;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Dessiner un fond sur le canvas miniature
        contextcanvasMiniature.fillStyle = isTransparent
          ? "rgba(0,0,0,0)"
          : isSystemColor;
        contextcanvasMiniature.fillRect(
          0,
          0,
          canvasMiniature.width,
          canvasMiniature.height
        );

        // Dessiner l'image redimensionnée du grand canvas sur la miniature
        contextcanvasMiniature.drawImage(
          canvas,
          0,
          0,
          canvas.width,
          canvas.height,
          0,
          0,
          canvasMiniature.width,
          canvasMiniature.height
        );

        if (!isSignificantImage(canvas)) {
          props.setImgBorderOn(true);
        }

        // Récupérer l'image en tant que Data URL (base64)
        const dataURL = canvas.toDataURL("image/png");
        const dataURLMiniature = canvasMiniature.toDataURL("image/png");

        props.setNewImage({
          id: Date.now(),
          fileName: `artvibes-${Date.now()}`,
          img: dataURL,
          miniature: dataURLMiniature,
        });
        resolve(true);
      } else {
        reject();
      }
    });
  };

  function CreateMainCanvas() {
    // Utiliser toast.promise pour gérer la promesse
    toast.promise(CreateMainCanvasToast(), {
      loading: "Rendering in progress...",
      success: (result) => {
        if (result) {
          props.setFileDialogOpen((prevState: FileDialogOpen) => ({
            ...prevState,
            editNewPage: false,
          }));
          return "Successfully completed rendering.";
        } else {
          throw new Error("An error occurred");
        }
      },
      error: "An error occurred",
    });
  }

  // Fonction pour gérer le changement de valeur
  const handleInputChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10); // Convertir la valeur en nombre
    setSystemSize({ ...isSystemSize, w: newValue });
  };

  // Fonction pour gérer le changement de valeur
  const handleInputChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10); // Convertir la valeur en nombre
    setSystemSize({ ...isSystemSize, h: newValue });
  };

  const handleCreateImg = (
    imgSrc: string
  ): Promise<{ img: string; miniature: any }> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.src = imgSrc;

      img.onload = () => {
        // Créer un canvas pour transformer l'image en base64
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          // Dessiner l'image sur le canvas
          ctx.drawImage(img, 0, 0);
          // Convertir le canvas en une chaîne base64
          const base64Image = canvas.toDataURL("image/png");

          // Appel à resizeImageBase64 pour créer la miniature
          resizeImageBase64(imgSrc, 300, (resizedBlob: any) => {
            resolve({
              img: base64Image,
              miniature: resizedBlob,
            });
          });
        } else {
          reject(new Error("Impossible d'obtenir le contexte du canvas"));
        }
      };

      img.onerror = () => reject(new Error("Erreur de chargement de l'image"));
    });
  };

  const folders = [
    {
      name: "Abstract",
      img: SystemBackgroungAbstractImg,
    },
    {
      name: "Wallpaper",
      img: SystemBackgroungWallpaperImg,
    },
    {
      name: "Commercial",
      img: SystemBackgroungCommercialImg,
    },
  ];

  const helps = [
    {
      title: "Canvas",
      subOption: [
        {
          title: "Change background",
          click: null,
        },
        {
          title: "Resize image",
          click: null,
        },
        {
          title: "droubled the size by Ai",
          click: null,
        },
        {
          title: "Zoom (min-max)",
          click: null,
        },
        {
          title: "overflow",
          click: null,
        },
      ],
    },
    {
      title: "System",
      subOption: [
        {
          title: "Optimisation",
          click: null,
        },
        {
          title: "Language",
          click: null,
        },
        {
          title: "Historical",
          click: null,
        },
        {
          title: "Storage",
          click: null,
        },
      ],
    },
  ];

  const [screenType, setScreenType] = useState<number>(0);

  const paperSizesScreen = [
    { name: "A0", format: { screen: [2384, 3370], printer: [9933, 14043] } },
    { name: "A1", format: { screen: [1684, 2384], printer: [7016, 9933] } },
    { name: "A2", format: { screen: [1191, 1684], printer: [4961, 7016] } },
    { name: "A3", format: { screen: [842, 1191], printer: [3508, 4961] } },
    { name: "A4", format: { screen: [595, 842], printer: [2480, 3508] } },
    { name: "A5", format: { screen: [420, 595], printer: [1748, 2480] } },
    { name: "A6", format: { screen: [298, 420], printer: [1240, 1748] } },
    { name: "B0", format: { screen: [2835, 4008], printer: [11811, 16732] } },
    { name: "B1", format: { screen: [2004, 2835], printer: [8350, 11811] } },
    { name: "B2", format: { screen: [1417, 2004], printer: [5906, 8350] } },
    { name: "B3", format: { screen: [1000, 1417], printer: [4195, 5906] } },
    { name: "B4", format: { screen: [709, 1000], printer: [2953, 4195] } },
    { name: "Letter", format: { screen: [612, 792], printer: [2550, 3300] } },
    { name: "Legal", format: { screen: [612, 1008], printer: [2550, 4200] } },
    {
      name: "Tabloid",
      format: { screen: [792, 1224], printer: [3300, 5100] },
    },
  ];
  const Orientationpaper = ["vertical", "horizontal"];
  const [orientationpaper, setOrientationpaper] = useState<string>(
    Orientationpaper[0]
  );

  const setVal =
    orientationpaper === "vertical"
      ? {
          wScreen: Math.min(
            paperSizesScreen[screenType]?.format.screen[0],
            paperSizesScreen[screenType]?.format.screen[1]
          ), // La largeur devient la plus petite dimension
          hScreen: Math.max(
            paperSizesScreen[screenType]?.format.screen[0],
            paperSizesScreen[screenType]?.format.screen[1]
          ), // La hauteur devient la plus grande dimension
          wPrinter: Math.min(
            paperSizesScreen[screenType]?.format.printer[0],
            paperSizesScreen[screenType]?.format.printer[1]
          ), // La largeur devient la plus petite dimension
          hPrinter: Math.max(
            paperSizesScreen[screenType]?.format.printer[0],
            paperSizesScreen[screenType]?.format.printer[1]
          ), // La hauteur devient la plus grande dimension
        }
      : {
          wScreen: Math.max(
            paperSizesScreen[screenType]?.format.screen[0],
            paperSizesScreen[screenType]?.format.screen[1]
          ), // La largeur devient la plus grande dimension
          hScreen: Math.min(
            paperSizesScreen[screenType]?.format.screen[0],
            paperSizesScreen[screenType]?.format.screen[1]
          ), // La hauteur devient la plus petite dimension
          wPrinter: Math.max(
            paperSizesScreen[screenType]?.format.printer[0],
            paperSizesScreen[screenType]?.format.printer[1]
          ), // La largeur devient la plus grande dimension
          hPrinter: Math.min(
            paperSizesScreen[screenType]?.format.printer[0],
            paperSizesScreen[screenType]?.format.printer[1]
          ), // La hauteur devient la plus petite dimension
        };

  const val =
    orientationpaper === "vertical"
      ? {
          w: Math.min(isSystemSize.w, isSystemSize.h), // La largeur devient la plus petite dimension
          h: Math.max(isSystemSize.w, isSystemSize.h), // La hauteur devient la plus grande dimension
        }
      : {
          w: Math.max(isSystemSize.w, isSystemSize.h), // La largeur devient la plus grande dimension
          h: Math.min(isSystemSize.w, isSystemSize.h), // La hauteur devient la plus petite dimension
        };

  if (props.isFileDialogOpen.backgroundAdvanced)
    return (
      <>
        <Card
          className="open-element-page-melted border-blue-500"
          style={{
            zIndex: 50,
            position: "absolute",
            left: "50%",
            width: 500,
            height: "max-content",
            transform: "translateX(-50%)",
            bottom: "80px",
            transition: "500ms",
          }}
        >
          <CardContent className="flex flex-col items-center justify-center p-1 gap-2">
            <div className="mb-1 text-center text-gray-500 text-[14px] font-bold">
              Glissez-déposez l'image ici
            </div>
            <Slider
              className="py-2"
              defaultValue={[props.isDrawingSetting.backgroundHeight]}
              max={100}
              step={1}
              onValueChange={(e: number[]) => {
                props.setDrawingSetting((prevState: DrawingSetting) => ({
                  ...prevState,
                  backgroundHeight: e[0],
                }));
              }}
            />
            <Separator className="my-2" />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="backgroundAdvanced"
                checked={props.isDrawingSetting.backgroundAnimated}
                onCheckedChange={(e: boolean) => {
                  props.setDrawingSetting((prevState: DrawingSetting) => ({
                    ...prevState,
                    backgroundAnimated: e,
                  }));
                }}
              />
              <label
                htmlFor="backgroundAdvanced"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Animated image ?
              </label>
            </div>
            <Separator className="my-2" />
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                onClick={() => {
                  props.setFileDialogOpen((prevState: FileDialogOpen) => ({
                    ...prevState,
                    backgroundAdvanced: !prevState.backgroundAdvanced,
                  }));
                  props.setDrawingSetting((prevState: DrawingSetting) => ({
                    ...prevState,
                    backgroundImg: "",
                  }));
                }}
              >
                Delete
              </Button>
              <Button variant="ghost">Add new image</Button>
              <Button
                variant="activeBlue"
                onClick={() => {
                  props.setFileDialogOpen((prevState: FileDialogOpen) => ({
                    ...prevState,
                    backgroundAdvanced: !prevState.backgroundAdvanced,
                  }));
                }}
              >
                Save background
              </Button>
            </div>
          </CardContent>
        </Card>
      </>
    );

  return (
    <>
      <Dialog
        open={props.isFileDialogOpen.lastImport}
        onOpenChange={(e: boolean) => {
          props.setFileDialogOpen((prevState: FileDialogOpen) => ({
            ...prevState,
            lastImport: e,
          }));
        }}
      >
        <DialogContent
          className="h-[85vh] w-[98%] max-w-[1400px] flex flex-col justify-start p-2 overflow-clip"
          ref={props.dialogLastImportRef}
          onDragOver={props.handleDragOver}
          style={{
            zIndex: 100100,
            border: props.isDraggingDrop
              ? "1px solid #006aff"
              : "1px solid transparent",
          }}
        >
          {props.isDraggingDrop && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
              style={{ transition: "500ms" }}
            >
              <div
                className="fixed inset-0 z-50 flex items-center justify-center"
                onDrop={props.handleDrop}
                onDragOver={props.handleDragOver}
                onDragLeave={props.handleDragLeave}
                //onClick={() => {
                //  UseDrawing.setIsDraggingDrop(false);
                //}}
                style={{ zIndex: 20000 }}
              />
              <div className="relative w-full max-w-5xl">
                <div className="h-[80vh] w-full rounded-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-[90%] w-[90%] max-h-[400px] max-w-[800px] flex-col items-center justify-center rounded-lg text-white">
                      <div className="spinner mb-4">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <p className="text-2xl font-bold bg-gradient-to-tr from-indigo-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
                        Glissez-déposez vos images ici
                      </p>
                      <div className="flex text-slate-400 gap-1">
                        Ceux-ci seront importés dans la collection, vous les
                        trouverez dans{" "}
                        <span className="flex items-center gap-1 text-sky-500">
                          [ fichier
                          <LuFolder />]
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogHeader>
            <DialogTitle>Galerie Multimédia</DialogTitle>
            <DialogDescription>
              Toutes les images importé, en mémoire sont ici mais toutes fois
              elle ne sont pas permanente.
            </DialogDescription>
            <Card className="border-none">
              <CardContent className="flex items-center gap-1 mx-1 p-1 h-[40px]">
                <Button
                  className="w-full h-[30px] p-1"
                  variant={
                    lastImportTabs.menu === "import" ? "activeBlue" : "ghost"
                  }
                  onClick={() => {
                    setLastImportTabs((prevState: any) => ({
                      ...prevState,
                      menu: "import",
                    }));
                  }}
                >
                  Imports
                </Button>
                <Button
                  className="w-full h-[30px] p-1"
                  variant={
                    lastImportTabs.menu === "background"
                      ? lastImportTabs.subMenuBg
                        ? "destructive"
                        : "activeBlue"
                      : "ghost"
                  }
                  onClick={() => {
                    setLastImportTabs((prevState: any) => ({
                      ...prevState,
                      menu: "background",
                      subMenuBg:
                        prevState.menu === "background"
                          ? null
                          : prevState.subMenuBg,
                    }));
                  }}
                >
                  {lastImportTabs.menu === "background" ? (
                    lastImportTabs.subMenuBg ? (
                      <LuArrowLeft />
                    ) : (
                      "Galerie"
                    )
                  ) : (
                    "Galerie"
                  )}
                </Button>
                <Button
                  className="w-full h-[30px] p-1"
                  variant={
                    lastImportTabs.menu === "models" ? "activeBlue" : "ghost"
                  }
                  onClick={() => {
                    setLastImportTabs((prevState: any) => ({
                      ...prevState,
                      menu: "models",
                    }));
                  }}
                >
                  Models
                </Button>
              </CardContent>
            </Card>
          </DialogHeader>
          <div className="h-full w-full overflow-hidden">
            {lastImportTabs.menu === "import" && (
              <ScrollArea className="h-full w-full p-4 open-element-page-melted">
                <Card className="h-full w-full pb-[50px] bg-transparent border-none">
                  <CardContent className="grid grid-cols-5 gap-4">
                    <Card className="h-80">
                      <CardHeader>
                        <CardTitle className="text-2xl">Galerie ...</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 w-full grid grid-cols-1 gap-4">
                        <Button
                          className="p-0 w-full"
                          variant="default"
                          onClick={props.handleButtonClickImport}
                        >
                          Import
                        </Button>
                        <div>
                          Drop image here ...
                          <div className="drawing-css-bg h-16 rounded"></div>
                        </div>
                        <Button className="p-0 w-full" variant="default">
                          Delete all
                        </Button>
                      </CardContent>
                    </Card>
                    {props.isNewImageImport?.map(
                      (blobUrl: IsNewImage, index) => (
                        <div
                          key={index}
                          className="relative overflow-hidden rounded-lg group cursor-pointer"
                          onClick={() => {
                            return props.handleLastAdd(blobUrl);
                          }}
                        >
                          <img
                            className="object-cover w-full h-80 transition-transform duration-300 ease-in-out group-hover:scale-105"
                            src={blobUrl.miniature}
                            alt="logo"
                            loading="lazy"
                            onMouseDown={(e) => e.preventDefault()}
                            onContextMenu={(e) => e.preventDefault()}
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 to-transparent p-4 text-white">
                            <div className="flex flex-col items-center gap-2">
                              {blobUrl.id === props.isNewImage.id && (
                                <div className="spinner">
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                </div>
                              )}
                              <div className="p-1 flex gap-2 m-2 opacity-30 group-hover:opacity-100">
                                <Button
                                  disabled={overlayActive()}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    props.handleSaveImgOverlay(
                                      blobUrl.img,
                                      undefined,
                                      undefined,
                                      blobUrl.miniature
                                    );
                                    props.setFileDialogOpen(
                                      (prevState: FileDialogOpen) => ({
                                        ...prevState,
                                        lastImport: false,
                                      })
                                    );
                                  }}
                                  variant="outline"
                                  size="icon"
                                >
                                  <LuPictureInPicture className="h-4 w-4" />
                                </Button>
                                <Button
                                  className="ml-auto"
                                  variant="outline"
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    props.setDrawingExpandImg(
                                      (prevState: ExpandImg) => ({
                                        ...prevState,
                                        bgExpand: blobUrl.img,
                                        miniature: blobUrl.miniature,
                                      })
                                    );
                                  }}
                                >
                                  <LuScaling className="h-4 w-4" />
                                </Button>
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    props.handleDeleteImport(blobUrl.id);
                                  }}
                                  className="ml-auto"
                                  variant="destructive"
                                  size="icon"
                                >
                                  <FaRegTrashCan className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
              </ScrollArea>
            )}
            {lastImportTabs.menu === "background" && (
              <ScrollArea className="h-full w-full p-4 open-element-page-melted">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-[20px]">
                  {lastImportTabs.subMenuBg === null && (
                    <>
                      {folders.map((folder, index) => (
                        <Card
                          key={index}
                          className="overflow-hidden transition hover:scale-105 cursor-pointer"
                          onClick={() => {
                            setLastImportTabs((prevState: any) => ({
                              ...prevState,
                              subMenuBg: folder.name,
                            }));
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <LuFolder className="h-8 w-8 text-blue-500" />
                              <span className="text-sm text-gray-500">
                                {folder.img.length} images
                              </span>
                            </div>
                            <h2 className="font-semibold">{folder.name}</h2>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                              {folder.img.slice(0, 4).map((img, index) => (
                                <div
                                  key={index}
                                  className="bg-neutral-900 rounded-md p-1 flex items-center justify-center"
                                >
                                  <Image
                                    className="object-cover w-full h-20"
                                    src={img.src}
                                    width={200}
                                    height={200}
                                    alt={img.src}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onDragStart={(e) => e.preventDefault()}
                                    onContextMenu={(e) => e.preventDefault()}
                                  />
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </>
                  )}

                  {folders
                    .find((el) => el.name === lastImportTabs.subMenuBg)
                    ?.img?.map((url: any, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden rounded-lg group cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCreateImg(url.src).then((el) => {
                            props.handleLastAdd({
                              id: Date.now(),
                              fileName: `${DrawingName}-${Date.now()}`,
                              img: el.img,
                              miniature: el.miniature,
                            });
                          });
                        }}
                      >
                        <Image
                          className="object-cover w-full h-80 transition-transform duration-300 ease-in-out group-hover:scale-105"
                          src={url.src}
                          width={300}
                          height={300}
                          alt={url.src}
                          onMouseDown={(e) => e.preventDefault()}
                          onDragStart={(e) => e.preventDefault()}
                          onContextMenu={(e) => e.preventDefault()}
                        />
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 to-transparent p-4 text-white">
                          <div className="flex flex-col items-center gap-2">
                            <div className="p-1 flex gap-2 m-2 opacity-30 group-hover:opacity-100">
                              <Button
                                disabled={overlayActive()}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCreateImg(url.src).then((el) => {
                                    props.handleSaveImgOverlay(
                                      el.img,
                                      undefined,
                                      undefined,
                                      el.miniature
                                    );
                                    props.setFileDialogOpen(
                                      (prevState: FileDialogOpen) => ({
                                        ...prevState,
                                        lastImport: false,
                                      })
                                    );
                                  });
                                }}
                                variant="outline"
                                size="icon"
                              >
                                <LuPictureInPicture className="h-4 w-4" />
                              </Button>
                              <Button
                                className="ml-auto"
                                variant="outline"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCreateImg(url.src).then((el) => {
                                    props.setDrawingExpandImg(
                                      (prevState: ExpandImg) => ({
                                        ...prevState,
                                        bgExpand: el.img, // Maintenant en base64
                                        miniature: el.miniature,
                                      })
                                    );
                                  });
                                }}
                              >
                                <LuScaling className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={props.isFileDialogOpen.editNewPage}
        onOpenChange={(e: boolean) => {
          props.setFileDialogOpen((prevState: FileDialogOpen) => ({
            ...prevState,
            editNewPage: e,
          }));
        }}
      >
        <DialogContent
          style={{ zIndex: 100100 }}
          className="h-max w-[98%] max-w-[1000px] flex flex-col justify-start overflow-clip"
        >
          <DialogHeader>
            <DialogTitle>Edit new project.</DialogTitle>
            <DialogDescription>
              Start a new project with a page of the desired color.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center flex-col">
            <div className="flex justify-center items-center gap-6 max-w-max h-max flex-col md:flex-row">
              <div className="flex justify-start items-center flex-col w-[90%] max-w-[500px] p-3">
                <div
                  style={{
                    background: isTransparent ? "none" : isSystemColor,
                    width: (() => {
                      if (isSystemSize.w === isSystemSize.h) return 200;
                      return val.h > val.w ? 160 : 280;
                    })(),
                    height: 200,
                    border: isTransparent ? "2px solid #006aff" : "none",
                    transition: "250ms",
                  }}
                />
                <Separator className="my-4" />
                <div className="w-full">Select the desired preset :</div>

                <Select
                  value={`${screenType}`}
                  onValueChange={(e: string) => {
                    setScreenType(parseInt(e));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <div>{paperSizesScreen[screenType]?.name}</div>
                  </SelectTrigger>
                  <SelectContent style={{ zIndex: 100200 }}>
                    {paperSizesScreen.map((value, index) => (
                      <SelectItem key={index} value={`${index}`}>
                        {`${value.name}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="w-full">Orientation :</div>
                <Select
                  value={`${orientationpaper}`}
                  onValueChange={(e: string) => {
                    setOrientationpaper(e);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <div>{orientationpaper}</div>
                  </SelectTrigger>
                  <SelectContent style={{ zIndex: 100200 }}>
                    {Orientationpaper.map((value, index) => (
                      <SelectItem key={index} value={`${value}`}>
                        {`${value}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Separator className="my-4" />
                <div className="flex gap-4 w-full">
                  <div className="w-full">
                    <div>Type : screen</div>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => {
                        setSystemSize({
                          w: setVal.wScreen,
                          h: setVal.hScreen,
                        });
                      }}
                    >
                      {`${setVal.wScreen} x ${setVal.hScreen}`}
                    </Button>
                  </div>
                  <div className="w-full">
                    <div>Type : printer</div>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => {
                        setSystemSize({
                          w: setVal.wPrinter,
                          h: setVal.hPrinter,
                        });
                      }}
                    >
                      {`${setVal.wPrinter} x ${setVal.hPrinter}`}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-start items-center flex-col w-[90%] max-w-[500px] p-3 gap-4">
                <div>Select the desired height and width :</div>
                <Card className="bg-inherit border-none">
                  <CardContent className="flex p-1 gap-4">
                    <div className="border rounded flex items-center gap-2 p-1 h-[40px] overflow-hidden">
                      width:{" "}
                      <Input
                        value={isSystemSize.w}
                        //defaultValue={isSystemSize.w || 0}
                        className="w-[80px] h-[40px] border-none"
                        type="number"
                        placeholder="width"
                        min={0}
                        onChange={handleInputChangeWidth}
                      />
                    </div>
                    <div className="border rounded flex items-center gap-2 p-1 h-[40px] overflow-hidden">
                      height:{" "}
                      <Input
                        value={isSystemSize.h}
                        //defaultValue={isSystemSize.h || 0}
                        className="w-[80px] h-[40px] border-none"
                        type="number"
                        placeholder="height"
                        min={0}
                        onChange={handleInputChangeHeight}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Separator className="my-4" />
                <div>Select the desired color :</div>
                <Button
                  className="flex flex-col justify-center items-center"
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
                    style={{
                      background: "none",
                      opacity: 0,
                      zIndex: -1,
                    }}
                    type="color"
                    name=""
                    id=""
                  />
                </Button>
                <Separator className="my-4" />
                <div>Rendering option :</div>
                <div className="items-top flex space-x-2">
                  <Checkbox
                    checked={isTransparent}
                    onCheckedChange={(checked: boolean) => {
                      setIsTransparent(checked);
                    }}
                    id="terms0"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms0"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Enable Transparency
                    </label>
                    <p className="text-slate-500 text-sm">
                      Info : Edges in the app will be automatically enabled if
                      the image is transparent.
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <Button variant="activeBlue" onClick={CreateMainCanvas}>
                  Create new page
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={props.isFileDialogOpen.help}
        onOpenChange={(e: boolean) => {
          props.setFileDialogOpen((prevState: FileDialogOpen) => ({
            ...prevState,
            help: e,
          }));
        }}
      >
        <DialogContent
          className="h-[85vh] w-[98%] max-w-[1400px] flex flex-col justify-start p-2"
          ref={props.dialogLastImportRef}
          style={{ zIndex: 100100 }}
        >
          <DialogHeader>
            <DialogTitle>Help</DialogTitle>
            <DialogDescription>
              Retrouvez toutes les fonctionnalités ici.
            </DialogDescription>
          </DialogHeader>
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList className="max-h-full">
              <CommandEmpty>No results found.</CommandEmpty>
              {helps?.map((el, index) => (
                <div key={index}>
                  <CommandGroup heading={el.title}>
                    {el.subOption?.map((elSub, index) => (
                      <CommandItem key={index}>{elSub.title}</CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                </div>
              ))}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>

      <Dialog
        open={props.isFileDialogOpen.resizeImage}
        onOpenChange={(e: boolean) => {
          props.setFileDialogOpen((prevState: FileDialogOpen) => ({
            ...prevState,
            resizeImage: e,
          }));
          props.setSystemResize({
            ...props.isSystemResize,
            w: props.isImageSize.w,
            h: props.isImageSize.h,
          });
        }}
      >
        <DialogContent
          className="h-max w-[98%] max-w-[500px] flex flex-col justify-start p-2"
          style={{ zIndex: 100100 }}
        >
          <DialogHeader>
            <DialogTitle>Resize image</DialogTitle>
            <DialogDescription>
              Retrouvez toutes les fonctionnalités ici.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center justify-between gap-2 w-[98%] max-w-[400px]">
              <div className="flex flex-col items-start justify-center">
                Width:
                <Input
                  min={0}
                  value={Math.round(props.isSystemResize.w)}
                  onChange={(e) => {
                    const newValue = Number(e.target.value); // Convertir la valeur en un nombre
                    if (props.isSystemResize.link) {
                      if (!isNaN(newValue) && newValue > 0) {
                        const aspectRatio =
                          props.isImageSize.h / props.isImageSize.w;
                        const targetHeight = newValue * aspectRatio;
                        props.setSystemResize({
                          ...props.isSystemResize,
                          w: newValue,
                          h: targetHeight,
                        });
                      } else {
                        console.error("Veuillez entrer une largeur valide.");
                      }
                    } else {
                      props.setSystemResize((prev: ResizeInterface) => ({
                        ...prev,
                        w: newValue, // Utiliser la valeur convertie
                      }));
                    }
                  }}
                  className="w-full h-[40px] bg-inherit"
                  type="number"
                  placeholder="width"
                />
              </div>
              <Button
                className="mb-[-25px]"
                variant={props.isSystemResize.link ? "activeBlue" : "outline"}
                size="icon"
                onClick={() => {
                  props.setSystemResize((prev: ResizeInterface) => ({
                    ...prev,
                    link: !prev.link, // Utiliser la valeur convertie
                  }));
                }}
              >
                <LuLink2 />
              </Button>
              <div className="flex flex-col items-start justify-center">
                Height:
                <Input
                  min={0}
                  value={Math.round(props.isSystemResize.h)}
                  onChange={(e) => {
                    const newValue = Number(e.target.value); // Convertir la valeur en un nombre
                    if (props.isSystemResize.link) {
                      if (!isNaN(newValue) && newValue > 0) {
                        const aspectRatio =
                          props.isImageSize.w / props.isImageSize.h;
                        const targetWidth = newValue * aspectRatio;
                        props.setSystemResize({
                          ...props.isSystemResize,
                          w: targetWidth,
                          h: newValue,
                        });
                      } else {
                        console.error("Veuillez entrer une largeur valide.");
                      }
                    } else {
                      props.setSystemResize((prev: ResizeInterface) => ({
                        ...prev,
                        h: newValue, // Utiliser la valeur convertie
                      }));
                    }
                  }}
                  className="w-full h-[40px] bg-inherit"
                  type="number"
                  placeholder="height"
                />
              </div>
            </div>
            <Button
              className="w-full max-w-[300px]"
              variant="activeBlue"
              onClick={() => {
                resizeNewImageBase64(
                  props.isNewImage.img as string,
                  props.isSystemResize.w,
                  props.isSystemResize.h,
                  function (resizedBlob: any) {
                    props.setNewImage((prev: IsNewImage) => ({
                      ...prev,
                      img: resizedBlob,
                    }));
                    props.setFileDialogOpen((prevState: FileDialogOpen) => ({
                      ...prevState,
                      resizeImage: false,
                    }));
                  }
                );
              }}
            >
              Resize
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={props.isFileDialogOpen.preview}
        onOpenChange={(e: boolean) => {
          props.setFileDialogOpen((prevState: FileDialogOpen) => ({
            ...prevState,
            preview: e,
          }));
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview option</DialogTitle>
            <DialogDescription>
              Make sure to adjust the preview according to the desired options
              for downloading. The settings you apply will be automatically
              saved for the final rendering.
            </DialogDescription>
          </DialogHeader>
          <div className="mb-4">Rendering option :</div>
          <div className="items-top flex space-x-2">
            <Checkbox
              checked={props.isRenderingOption.reziseImg}
              onCheckedChange={(checked: boolean) => {
                props.setIsRenderingOption({
                  ...props.isRenderingOption,
                  reziseImg: checked, // Utilisation de `checked` qui est un booléen
                });
              }}
              id="terms0"
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms0"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Resize the image.
              </label>
              <p className="text-sm text-muted-foreground">
                This allows you to decide whether or not to keep the new
                dimensions after the change.
              </p>
            </div>
          </div>
          <div className="items-top flex space-x-2">
            <Checkbox
              checked={props.isRenderingOption.smoothImg}
              onCheckedChange={(checked: boolean) => {
                props.setIsRenderingOption({
                  ...props.isRenderingOption,
                  smoothImg: checked, // Utilisation de `checked` qui est un booléen
                });
              }}
              id="terms1"
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Smooth the image to make it less pixelated.
              </label>
              <p className="text-sm text-muted-foreground">
                If this option behaves unexpectedly, turn off the.
              </p>
            </div>
          </div>
          <div className="items-top flex space-x-2">
            <Checkbox
              checked={props.isRenderingOption.sharpenImg}
              onCheckedChange={(checked: boolean) => {
                props.setIsRenderingOption({
                  ...props.isRenderingOption,
                  sharpenImg: checked, // Utilisation de `checked` qui est un booléen
                });
              }}
              id="terms2"
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms2"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Increased the sharpness of the image.
              </label>
              <p className="text-sm text-muted-foreground">
                If this option behaves unexpectedly, turn off the.
              </p>
            </div>
          </div>
          <Button
            className="w-full mt-4"
            variant="activeBlue"
            onClick={() => {
              props.setFileDialogOpen((prevState: FileDialogOpen) => ({
                ...prevState,
                preview: false,
              }));
              if (props.isNewImage.img === "") return;
              toast.promise(
                props
                  .handleSvgConverter()
                  .then((layers) => {
                    if (!layers) {
                      throw new Error("Layer conversion failed");
                    }
                    return props.handleRenderingToast(layers);
                  })
                  .then((result) => {
                    if (!result) {
                      throw new Error("Rendering failed");
                    }
                    if (handleViewImage) {
                      handleViewImage(result as string);
                    }
                    return "Successfully completed rendering.";
                  }),
                {
                  loading: "Processing images and rendering...",
                  success: "All steps completed successfully.",
                  error: "An error occurred during the process.",
                }
              );
            }}
          >
            Show overview
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LastImport;
