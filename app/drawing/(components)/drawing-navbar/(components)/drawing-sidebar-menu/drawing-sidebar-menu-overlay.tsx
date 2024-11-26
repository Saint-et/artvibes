import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverlayForm, StyleForm } from "@/public/assets/data/data";
import {
  DrawArea,
  DrawForm,
  DrawSvg,
  DrawSvgFull,
  ExpandImg,
  FileDialogOpen,
  IsNewOverlay,
  IsNewOverlaySave,
  LoadedImage,
  NewImageSize,
} from "@/utils/interface";
import { MutableRefObject, useRef } from "react";
import { FaRegObjectGroup } from "react-icons/fa6";
import SvgComponents from "../../../drawing-tools/area-tools/overlay/svg-file";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LuCircle, LuRefreshCw } from "react-icons/lu";
import SvgFullComponents from "../../../drawing-tools/area-tools/overlay/svg-file-full";

interface DrawingSidebarMenuOverlayProps {
  isMenuOpen: number;
  textCanvasRef: MutableRefObject<HTMLDivElement | null>;
  drawArea: DrawArea;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  isImageSize: NewImageSize;
  isImgOverlaySave: IsNewOverlaySave[];
  setImgOverlaySave: React.Dispatch<React.SetStateAction<any>>;
  isImgOverlay: IsNewOverlay;
  setImgOverlay: React.Dispatch<React.SetStateAction<any>>;
  setDrawingExpandImg: React.Dispatch<React.SetStateAction<any>>;
  drawingExpandImg: ExpandImg;
  dialogLastImportRef: MutableRefObject<HTMLDivElement | null>;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  isDrawingLoad: LoadedImage | undefined;
  setFormCanvasVisible: React.Dispatch<React.SetStateAction<any>>;
  isFormCanvasVisible: string;
  handleSaveImgOverlay: (
    newImg?: string,
    form?: string,
    shadow?: number
  ) => void;
  handleSaveForm: (form?: string) => void;

  handleResetForm: () => void;
  handleResetImgOverlay: () => void;
  handleResetSvg: () => void;
  handleSaveSvg: (newSvg?: string, img?: string) => void;
  setDrawSvg: React.Dispatch<React.SetStateAction<any>>;
  drawSvg: DrawSvg;
  drawSvgFull: DrawSvgFull;
  setDrawSvgFull: React.Dispatch<React.SetStateAction<DrawSvgFull>>;
  handleSaveSvgFull: (newSvg?: string) => void;
  handleResetSvgFull: () => void;
}

const DrawingSidebarMenuOverlay: React.FC<DrawingSidebarMenuOverlayProps> = (
  props
) => {
  const formBtnImg = props.isDrawingLoad?.defaultImage;

  const handleStyleForm = (el: string) => {
    if (el === "squareFull") return { background: "#ffffff", borderRadius: 0 };
    if (el === "squareEmpty")
      return {
        boxShadow: `inset 0px 0px 0px ${2}px ${"#ffffff"}`,
        borderRadius: 0,
      };

    if (el === "squareRoundedFull")
      return { background: "#ffffff", borderRadius: 10 };
    if (el === "squareRoundedEmpty")
      return {
        boxShadow: `inset 0px 0px 0px ${2}px ${"#ffffff"}`,
        borderRadius: 10,
      };

    if (el === "circleFull")
      return { background: "#ffffff", borderRadius: 9999 };
    if (el === "circleEmpty")
      return {
        boxShadow: `inset 0px 0px 0px ${2}px ${"#ffffff"}`,
        borderRadius: 9999,
      };
  };

  /*

  const svgRef = useRef(null);

  const handlesvgtoimg = () => {
    const svgElement = svgRef.current; // Sélectionnez votre élément SVG

    if (!svgElement) return;

    // Convertir l'élément SVG en une chaîne de texte
    const svgData = new XMLSerializer().serializeToString(svgElement);

    // Encoder le SVG en base64
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = function () {
      // Créer un élément canvas
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      // Dessiner l'image SVG dans le canvas
      const context = canvas.getContext("2d");
      if (!context) return;
      context.drawImage(img, 0, 0);

      // Convertir le canvas en une image PNG
      const pngImage = canvas.toDataURL("image/png");

      // Créer un lien de téléchargement pour l'image PNG
      const link = document.createElement("a");
      link.href = pngImage;
      link.download = "converted-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Libérer l'URL blob
      URL.revokeObjectURL(url);
    };

    // Charger l'image SVG dans l'objet Image
    img.src = url;
  };

  */
  /*
  onClick={() => {
    if (props.isFormCanvasVisible !== "") {
      props.handleSaveForm();
      props.handleResetForm();
    }
    if (props.isImgOverlay.img) {
      props.handleSaveImgOverlay();
      props.handleResetImgOverlay();
    }
    props.setDrawSvg((prevState: DrawSvg) => ({
      ...prevState,
      id: 0,
      svg: "cloud",
      img: props.drawSvg.img ? props.drawSvg.img : formBtnImg,
    }));
    if (!props.drawSvg.img) {
      const size =
        props.isImageSize.w < props.isImageSize.h
          ? props.isImageSize.w
          : props.isImageSize.h;
      props.setDrawArea({
        width: size / 2,
        height: size / 2,
        leftOffset: 0,
        topOffset: 0,
        positionX: props.isImageSize.w / 2 - size / 4,
        positionY: props.isImageSize.h / 2 - size / 4,
        rotate: 0,
      });
    }
  }}
*/

  const svgList = [
    {
      img: formBtnImg,
      svg: "square",
      backgroundColor: "#000000",
      crop: {
        x: 0,
        y: 0,
        size: 24,
      },
    },
    {
      img: formBtnImg,
      svg: "circle",
      backgroundColor: "#000000",
      crop: {
        x: 0,
        y: 0,
        size: 24,
      },
    },
    {
      img: formBtnImg,
      svg: "triangle",
      backgroundColor: "#000000",
      crop: {
        x: 0,
        y: 0,
        size: 24,
      },
    },
    {
      img: formBtnImg,
      svg: "cloud",
      backgroundColor: "#000000",
      crop: {
        x: 0,
        y: 0,
        size: 24,
      },
    },
    {
      img: formBtnImg,
      svg: "ticket",
      backgroundColor: "#000000",
      crop: {
        x: 0,
        y: 0,
        size: 24,
      },
    },
    {
      img: formBtnImg,
      svg: "droplet",
      backgroundColor: "#000000",
      crop: {
        x: 0,
        y: 0,
        size: 24,
      },
    },
    {
      img: formBtnImg,
      svg: "star",
      backgroundColor: "#000000",
      crop: {
        x: 0,
        y: 0,
        size: 24,
      },
    },
    {
      img: formBtnImg,
      svg: "heart",
      backgroundColor: "#000000",
      crop: {
        x: 0,
        y: 0,
        size: 24,
      },
    },
    {
      img: formBtnImg,
      svg: "hexagon",
      backgroundColor: "#000000",
      crop: {
        x: 0,
        y: 0,
        size: 24,
      },
    },
  ];

  const svgFullList = [
    {
      svg: "square-full",
      backgroundColor: "#ffffff",
      color: "#ffffff",
    },
    {
      svg: "circle-full",
      backgroundColor: "#ffffff",
      color: "#ffffff",
    },
    {
      svg: "triangle-full",
      backgroundColor: "#ffffff",
      color: "#ffffff",
    },
    {
      svg: "cloud-full",
      backgroundColor: "#ffffff",
      color: "#ffffff",
    },
    {
      svg: "ticket-full",
      backgroundColor: "#ffffff",
      color: "#ffffff",
    },
    {
      svg: "droplet-full",
      backgroundColor: "#ffffff",
      color: "#ffffff",
    },
    {
      svg: "star-full",
      backgroundColor: "#ffffff",
      color: "#ffffff",
    },
    {
      svg: "heart-full",
      backgroundColor: "#ffffff",
      color: "#ffffff",
    },
    {
      svg: "hexagon-full",
      backgroundColor: "#ffffff",
      color: "#ffffff",
    },
  ];
  return (
    <>
      {props.isMenuOpen === 8 && (
        <>
          <Card className="border-none rounded-none bg-transparent">
            <CardContent className="grid grid-cols-1 gap-2 p-4">
              <div className="text-1xl flex justify-between">
                Shape :<LuCircle className="h-4 w-4" />
              </div>
              <Separator className="my-2" />
              <div className="mt-4">Image Shape :</div>
              <div className="grid grid-cols-3 gap-2 p-1">
                {OverlayForm?.map((el, index) => (
                  <Button
                    key={index}
                    className="flex flex-col justify-center items-center h-full"
                    variant={
                      props.isImgOverlay.form === el.form
                        ? "secondary"
                        : "ghost"
                    }
                    onClick={async () => {
                      //if (props.isFormCanvasVisible !== "") {
                      //  props.handleSaveForm();
                      //  props.handleResetForm();
                      //}
                      //if (props.drawSvg.svg) {
                      //  props.handleSaveSvg();
                      //  props.handleResetSvg();
                      //}
                      if (props.isImgOverlay.img) {
                        props.setImgOverlay({
                          ...props.isImgOverlay,
                          opacity: props.isImgOverlay.opacity,
                          form: el.form,
                          shadow: el.shadow,
                          img: props.isImgOverlay.img
                            ? props.isImgOverlay.img
                            : formBtnImg,
                          miniature: props.isImgOverlay.img
                            ? props.isImgOverlay.img
                            : formBtnImg,
                        });
                      } else {
                        props.handleSaveImgOverlay(
                          props.isImgOverlay.img
                            ? props.isImgOverlay.img
                            : formBtnImg,
                          el.form,
                          el.shadow
                        );
                      }
                    }}
                  >
                    <img
                      className="w-[40px] h-[40px] transition hover:scale-95"
                      style={el.imgStyle}
                      src={formBtnImg}
                      alt=""
                    />
                  </Button>
                ))}
              </div>
            </CardContent>
            <Separator className="my-4" />
            <CardContent className="p-1">
              <div className="mt-4">Custom image shape :</div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="w-full p-4">
                  <AccordionTrigger>Image Adjustment</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-1xl flex justify-between items-center">
                      border: {props.drawSvg.thickness * 100}%
                      <LuRefreshCw
                        className="h-4 w-4 cursor-pointer hover:animate-spin"
                        onClick={() => {
                          props.setDrawSvg((prevState: DrawSvg) => ({
                            ...prevState,
                            crop: {
                              ...prevState.crop,
                              thickness: 0,
                            },
                          }));
                        }}
                      />
                    </div>
                    <Slider
                      onValueChange={(e: any) => {
                        props.setDrawSvg((prevState: DrawSvg) => ({
                          ...prevState,
                          thickness: e[0],
                        }));
                      }}
                      disabled={!props.drawSvg.img}
                      value={[props.drawSvg.thickness]}
                      min={0}
                      max={1}
                      step={0.1}
                    />
                    <Separator className="my-4" />
                    <div className="text-1xl flex justify-between items-center">
                      position y: {props.drawSvg.crop.y}%
                      <LuRefreshCw
                        className="h-4 w-4 cursor-pointer hover:animate-spin"
                        onClick={() => {
                          props.setDrawSvg((prevState: DrawSvg) => ({
                            ...prevState,
                            crop: {
                              ...prevState.crop,
                              y: 0,
                            },
                          }));
                        }}
                      />
                    </div>
                    <Slider
                      onValueChange={(e: any) => {
                        props.setDrawSvg((prevState: DrawSvg) => ({
                          ...prevState,
                          crop: {
                            ...prevState.crop,
                            y: e[0],
                          },
                        }));
                      }}
                      disabled={!props.drawSvg.img}
                      value={[props.drawSvg.crop.y]}
                      max={props.drawSvg.crop.size}
                      min={-props.drawSvg.crop.size}
                      step={1}
                    />
                    <Separator className="my-4" />
                    <div className="text-1xl flex justify-between items-center">
                      position x: {props.drawSvg.crop.x}%
                      <LuRefreshCw
                        className="h-4 w-4 cursor-pointer hover:animate-spin"
                        onClick={() => {
                          props.setDrawSvg((prevState: DrawSvg) => ({
                            ...prevState,
                            crop: {
                              ...prevState.crop,
                              x: 0,
                            },
                          }));
                        }}
                      />
                    </div>
                    <Slider
                      onValueChange={(e: any) => {
                        props.setDrawSvg((prevState: DrawSvg) => ({
                          ...prevState,
                          crop: {
                            ...prevState.crop,
                            x: e[0],
                          },
                        }));
                      }}
                      disabled={!props.drawSvg.img}
                      value={[props.drawSvg.crop.x]}
                      max={props.drawSvg.crop.size}
                      min={-props.drawSvg.crop.size}
                      step={1}
                    />
                    <Separator className="my-4" />
                    <div className="text-1xl flex justify-between items-center">
                      Size: {props.drawSvg.crop.size}%
                      <LuRefreshCw
                        className="h-4 w-4 cursor-pointer hover:animate-spin"
                        onClick={() => {
                          props.setDrawSvg((prevState: DrawSvg) => ({
                            ...prevState,
                            crop: {
                              ...prevState.crop,
                              size: 24,
                            },
                          }));
                        }}
                      />
                    </div>
                    <Slider
                      onValueChange={(e: any) => {
                        props.setDrawSvg((prevState: DrawSvg) => ({
                          ...prevState,
                          crop: {
                            ...prevState.crop,
                            size: e[0],
                          },
                        }));
                      }}
                      disabled={!props.drawSvg.img}
                      value={[props.drawSvg.crop.size]}
                      max={100}
                      step={1}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="grid grid-cols-3 gap-2 p-1">
                {svgList?.map((el, index) => (
                  <Button
                    key={index}
                    className="flex flex-col justify-center items-center h-full"
                    onClick={() => {
                      const img = props.drawSvg.img
                        ? props.drawSvg.img
                        : formBtnImg;
                      if (!props.drawSvg.img) {
                        props.handleSaveSvg(el.svg, img);
                      } else {
                        props.setDrawSvg((prevState: DrawSvg) => ({
                          ...prevState,
                          svg: el.svg,
                          img: img,
                        }));
                      }
                    }}
                    variant={
                      props.drawSvg.svg === el.svg ? "secondary" : "ghost"
                    }
                  >
                    <SvgComponents
                      drawSvg={el}
                      strokePathRef={null}
                      strokeRectRef={null}
                    />
                  </Button>
                ))}
              </div>
            </CardContent>
            <Separator className="my-4" />
            <CardContent className="p-1">
              <div className="mt-4">Basic Shape :</div>
              <div className="grid grid-cols-3 gap-2 p-1">
                {StyleForm?.map((el, index) => (
                  <Button
                    key={index}
                    className="flex flex-col justify-center items-center h-full"
                    variant={
                      props.isFormCanvasVisible === el.form
                        ? "secondary"
                        : "ghost"
                    }
                    onClick={() => {
                      //if (props.isImgOverlay.img) {
                      //  props.handleSaveImgOverlay();
                      //  props.handleResetImgOverlay();
                      //}
                      //if (props.drawSvg.svg) {
                      //  props.handleSaveSvg();
                      //  props.handleResetSvg();
                      //}
                      if (!props.isFormCanvasVisible) {
                        props.handleSaveForm(el.form);
                      } else {
                        props.setFormCanvasVisible(el.form);
                      }
                    }}
                  >
                    <div
                      style={{
                        ...handleStyleForm(el.form),
                        width: el.w,
                        height: el.h,
                        borderRadius: el.borderRadius,
                      }}
                    />
                  </Button>
                ))}
              </div>
            </CardContent>
            <Separator className="my-4" />
            <CardContent className="p-1">
              <div className="mt-4">Custom shape :</div>
              <div className="grid grid-cols-3 gap-2 p-1">
                {svgFullList?.map((el, index) => (
                  <Button
                    key={index}
                    className="flex flex-col justify-center items-center h-full"
                    variant={
                      props.drawSvgFull.svg === el.svg ? "secondary" : "ghost"
                    }
                    onClick={() => {
                      //if (props.isFormCanvasVisible !== "") {
                      //  props.handleSaveForm();
                      //  props.handleResetForm();
                      //}
                      //if (props.isImgOverlay.img) {
                      //  props.handleSaveImgOverlay();
                      //  props.handleResetImgOverlay();
                      //}
                      //if (props.isFormCanvasVisible !== "") {
                      //  props.handleSaveForm();
                      //  props.handleResetForm();
                      //}
                      //if (props.drawSvg.svg) {
                      //  props.handleSaveSvg();
                      //  props.handleResetSvg();
                      //}
                      if (props.drawSvgFull.svg) {
                        props.setDrawSvgFull((prevState: DrawSvgFull) => ({
                          ...prevState,
                          svg: el.svg,
                        }));
                      } else {
                        props.handleSaveSvgFull(el.svg);
                      }
                    }}
                  >
                    <SvgFullComponents
                      drawSvgFull={el}
                      strokeRectBgRef={null}
                      strokePathRef={null}
                      strokeRectRef={null}
                    />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

export default DrawingSidebarMenuOverlay;
