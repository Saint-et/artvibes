import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  SystemCoverDrawing,
  SystemDefaultDrawing,
} from "@/public/assets/data/data";
import {
  DrawArea,
  IsNewOverlay,
  IsNewOverlaySave,
  NewImageSize,
} from "@/utils/interface";
import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  useEffect,
  useRef,
} from "react";
import {
  FaCircle,
  FaClone,
  FaExpand,
  FaFolder,
  FaGears,
  FaRegObjectGroup,
  FaSquare,
  FaSquareFull,
  FaTrashCan,
} from "react-icons/fa6";

interface DrawingSidebarMenuOverlayProps {
  isMenuOpen: number;
  isFileDialogOpenImport: boolean;
  setFileDialogOpenImport: React.Dispatch<React.SetStateAction<any>>;
  textCanvasRef: MutableRefObject<HTMLDivElement | null>;
  drawArea: DrawArea;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  isImageSize: NewImageSize;
  isImgOverlaySave: IsNewOverlaySave[];
  setImgOverlaySave: React.Dispatch<React.SetStateAction<any>>;
  isImgOverlay: IsNewOverlay;
  setImgOverlay: React.Dispatch<React.SetStateAction<any>>;
  setDrawingExpandImg: React.Dispatch<React.SetStateAction<any>>;
  drawingExpandImg: number;
  dialogLastImportRef: MutableRefObject<HTMLDivElement | null>;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
}

const DrawingSidebarMenuOverlay: React.FC<DrawingSidebarMenuOverlayProps> = (
  props
) => {
  const formBtnImg = SystemDefaultDrawing.src;

  return (
    <>
      {props.isMenuOpen === 8 && (
        <>
          <Card className="border-none rounded-none bg-transparent">
            <CardHeader>
              <CardTitle className="text-1xl flex justify-between">
                Overlay : <FaRegObjectGroup className="text-2xl" />
              </CardTitle>
            </CardHeader>
            <Separator className="my-4" />
            <div>Basic form :</div>
            <CardContent className="grid grid-cols-2 gap-2 p-1">
              <Button
                className="flex flex-col justify-center items-center h-full"
                variant={
                  props.isImgOverlay.form === "square" ? "secondary" : "outline"
                }
                onClick={() => {
                  //props.setFileDialogOpenImport(!props.isFileDialogOpenImport);
                  props.setImgOverlay({
                    ...props.isImgOverlay,
                    opacity: props.isImgOverlay.opacity,
                    form: "square",
                    shadow: 0,
                    img: props.isImgOverlay.img
                      ? props.isImgOverlay.img
                      : formBtnImg,
                  });
                  if (!props.isImgOverlay.img) {
                    props.setDrawArea({
                      width: 300,
                      height: 300,
                      leftOffset: 0,
                      topOffset: 0,
                      positionX: props.isImageSize.w / 2 - 150,
                      positionY: props.isImageSize.h / 2 - 150,
                    });
                  }
                }}
              >
                <img
                  className="w-full h-full transition hover:scale-95"
                  src={formBtnImg}
                  alt=""
                />
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full"
                variant={
                  props.isImgOverlay.form === "squareRounded"
                    ? "secondary"
                    : "outline"
                }
                onClick={() => {
                  //props.setFileDialogOpenImport(!props.isFileDialogOpenImport);
                  props.setImgOverlay({
                    ...props.isImgOverlay,
                    opacity: props.isImgOverlay.opacity,
                    form: "squareRounded",
                    shadow: 0,
                    img: props.isImgOverlay.img
                      ? props.isImgOverlay.img
                      : formBtnImg,
                  });
                  if (!props.isImgOverlay.img) {
                    props.setDrawArea({
                      width: 300,
                      height: 300,
                      leftOffset: 0,
                      topOffset: 0,
                      positionX: props.isImageSize.w / 2 - 150,
                      positionY: props.isImageSize.h / 2 - 150,
                    });
                  }
                }}
              >
                <img
                  className="w-full h-full rounded-[20px] transition hover:scale-95"
                  src={formBtnImg}
                  alt=""
                />
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full"
                variant={
                  props.isImgOverlay.form === "circle" ? "secondary" : "outline"
                }
                onClick={() => {
                  //props.setFileDialogOpenImport(!props.isFileDialogOpenImport);
                  props.setImgOverlay({
                    ...props.isImgOverlay,
                    opacity: props.isImgOverlay.opacity,
                    form: "circle",
                    shadow: 0,
                    img: props.isImgOverlay.img
                      ? props.isImgOverlay.img
                      : formBtnImg,
                  });
                  if (!props.isImgOverlay.img) {
                    props.setDrawArea({
                      width: 300,
                      height: 300,
                      leftOffset: 0,
                      topOffset: 0,
                      positionX: props.isImageSize.w / 2 - 150,
                      positionY: props.isImageSize.h / 2 - 150,
                    });
                  }
                }}
              >
                <img
                  className="w-full h-full rounded-full transition hover:scale-95"
                  src={formBtnImg}
                  alt=""
                />
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full"
                variant={
                  props.isImgOverlay.form === "squareShadow"
                    ? "secondary"
                    : "outline"
                }
                onClick={() => {
                  //props.setFileDialogOpenImport(!props.isFileDialogOpenImport);
                  props.setImgOverlay({
                    ...props.isImgOverlay,
                    opacity: props.isImgOverlay.opacity,
                    form: "squareShadow",
                    shadow: 10,
                    img: props.isImgOverlay.img
                      ? props.isImgOverlay.img
                      : formBtnImg,
                  });
                  if (!props.isImgOverlay.img) {
                    props.setDrawArea({
                      width: 300,
                      height: 300,
                      leftOffset: 0,
                      topOffset: 0,
                      positionX: props.isImageSize.w / 2 - 150,
                      positionY: props.isImageSize.h / 2 - 150,
                    });
                  }
                }}
              >
                <img
                  className="w-full h-full shadow-[0px_0px_4px_2px_white] transition hover:scale-95"
                  src={formBtnImg}
                  alt=""
                />
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full"
                variant={
                  props.isImgOverlay.form === "squareRoundedShadow"
                    ? "secondary"
                    : "outline"
                }
                onClick={() => {
                  //props.setFileDialogOpenImport(!props.isFileDialogOpenImport);
                  props.setImgOverlay({
                    ...props.isImgOverlay,
                    opacity: props.isImgOverlay.opacity,
                    form: "squareRoundedShadow",
                    shadow: 10,
                    img: props.isImgOverlay.img
                      ? props.isImgOverlay.img
                      : formBtnImg,
                  });
                  if (!props.isImgOverlay.img) {
                    props.setDrawArea({
                      width: 300,
                      height: 300,
                      leftOffset: 0,
                      topOffset: 0,
                      positionX: props.isImageSize.w / 2 - 150,
                      positionY: props.isImageSize.h / 2 - 150,
                    });
                  }
                }}
              >
                <img
                  className="w-full h-full shadow-[0px_0px_4px_2px_white] rounded-[20px] transition hover:scale-95"
                  src={formBtnImg}
                  alt=""
                />
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full"
                variant={
                  props.isImgOverlay.form === "circleShadow"
                    ? "secondary"
                    : "outline"
                }
                onClick={() => {
                  props.setImgOverlay({
                    ...props.isImgOverlay,
                    opacity: props.isImgOverlay.opacity,
                    form: "circleShadow",
                    shadow: 10,
                    img: props.isImgOverlay.img
                      ? props.isImgOverlay.img
                      : formBtnImg,
                  });
                  if (!props.isImgOverlay.img) {
                    props.setDrawArea({
                      width: 300,
                      height: 300,
                      leftOffset: 0,
                      topOffset: 0,
                      positionX: props.isImageSize.w / 2 - 150,
                      positionY: props.isImageSize.h / 2 - 150,
                    });
                  }
                }}
              >
                <img
                  className="w-full h-ful shadow-[0px_0px_4px_2px_white] rounded-full transition hover:scale-95"
                  src={formBtnImg}
                  alt=""
                />
              </Button>
            </CardContent>
            <Separator className="my-4" />
          </Card>
        </>
      )}
    </>
  );
};

export default DrawingSidebarMenuOverlay;
