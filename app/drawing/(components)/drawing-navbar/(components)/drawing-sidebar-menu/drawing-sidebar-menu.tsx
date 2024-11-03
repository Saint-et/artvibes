import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  SystemDrawingVideoToGif,
  SystemPixelImg,
} from "@/public/assets/data/data";
import {
  DrawArea,
  DrawNowInterface,
  IsNewImage,
  IsNewOverlay,
  NewImageSize,
} from "@/utils/interface";
import { MutableRefObject } from "react";
import {
  LuArrowDownToLine,
  LuCircle,
  LuCrop,
  LuGalleryHorizontalEnd,
  LuMoonStar,
  LuPanelBottomClose,
  LuPencil,
  LuPencilRuler,
  LuPictureInPicture,
  LuScaling,
  LuSettings2,
  LuSliders,
  LuSparkles,
  LuSquareStack,
  LuTextCursorInput,
} from "react-icons/lu";

interface DrawingSidebarMenuProps {
  isMenuOpen: number;
  setMenuOpen: React.Dispatch<React.SetStateAction<any>>;
  isNewImage: IsNewImage;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  isImageSize: NewImageSize;
  zoom: number[];
  isSelectArea: boolean;
  setSelectArea: React.Dispatch<React.SetStateAction<any>>;
  captureElement: () => void;
  resultImageUrl: string;
  mainSidebarRef: MutableRefObject<HTMLDivElement | null>;
  handleSetBasicOverlay: () => void;
  isImgOverlay: IsNewOverlay;
  DrawCanvasImg: () => void;
  isDrawingNowCanvas: DrawNowInterface;
}

const DrawingSidebarMenu: React.FC<DrawingSidebarMenuProps> = (props) => {
  const sizePositionOverlerlay =
    props.isImageSize.w < props.isImageSize.h
      ? props.isImageSize.w
      : props.isImageSize.h;

  if (!props.isNewImage.img) return null;

  return (
    <>
      <ScrollArea
        ref={props.mainSidebarRef}
        className="pr-2 w-[100%] min-w-[100px] max-w-[100px] block bg-[#0d0d0d]"
        onClick={() => {
          if (props.isMenuOpen !== 4 && props.isDrawingNowCanvas.id !== null) {
            props.DrawCanvasImg;
          }
        }}
      >
        <Card className="border-none rounded-none min-w-[110px] mt-5 h-full bg-transparent">
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              <Button
                className="flex flex-col justify-center items-center h-full"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 7 ? 0 : 7);
                }}
                variant={props.isMenuOpen === 7 ? "activeBlue" : "ghost"}
              >
                <LuSettings2 className="text-2xl mb-2" />
                <div>Params</div>
              </Button>
              <Separator className="my-0" />
              <Button
                className="flex flex-col justify-center items-center h-full gradient-animated5"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 9 ? 0 : 9);
                }}
                variant={"ghost"}
              >
                <LuSparkles className="text-2xl mb-2" />
                <div>AI</div>
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 1 ? 0 : 1);
                }}
                variant={props.isMenuOpen === 1 ? "activeBlue" : "ghost"}
              >
                <LuPencilRuler className="text-2xl mb-2" />
                <div>Edit</div>
              </Button>
              <Separator className="my-0" />
              <Button
                className="flex flex-col justify-center items-center h-full"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 5 ? 0 : 5);
                  if (props.isImgOverlay.img) {
                    props.handleSetBasicOverlay();
                  }
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
                variant={props.isMenuOpen === 5 ? "activeBlue" : "ghost"}
              >
                <LuCrop className="h-5 w-5 mb-2" />
                <div>Crop</div>
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 10 ? 0 : 10);
                }}
                variant={props.isMenuOpen === 10 ? "activeBlue" : "ghost"}
              >
                <LuScaling className="h-5 w-5 mb-2" />
                <div>Expand</div>
              </Button>
              <Separator className="my-0" />
              <Button
                className="flex flex-col justify-center items-center h-full"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 3 ? 0 : 3);
                }}
                variant={props.isMenuOpen === 3 ? "activeBlue" : "ghost"}
              >
                <LuSliders className="h-5 w-5 mb-2" />
                <div>Filter</div>
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 11 ? 0 : 11);
                  if (props.isImgOverlay.img) {
                    props.handleSetBasicOverlay();
                  }
                  //props.setDrawArea({
                  //  ...props.faceApi.value,
                  //  //width: props.isImageSize.w / 2,
                  //  //height: props.isImageSize.h / 2,
                  //  //rotate: 0,
                  //  //leftOffset: 0,
                  //  //topOffset: 0,
                  //  //positionX: props.isImageSize.w / 4,
                  //  //positionY: props.isImageSize.h / 4,
                  //});
                }}
                variant={props.isMenuOpen === 11 ? "activeBlue" : "ghost"}
              >
                <LuPanelBottomClose className="h-5 w-5 mb-2" />
                <div>Blanket</div>
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 6 ? 0 : 6);
                }}
                variant={props.isMenuOpen === 6 ? "activeBlue" : "ghost"}
              >
                <LuMoonStar className="h-6 w-6 mb-2" />
                <div>Shadow</div>
              </Button>
              <Separator className="my-0" />
              <Button
                className="flex flex-col justify-center items-center h-full"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 2 ? 0 : 2);
                }}
                variant={props.isMenuOpen === 2 ? "activeBlue" : "ghost"}
              >
                <LuTextCursorInput className="h-5 w-5 mb-2" />
                <div>Text</div>
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 4 ? 0 : 4);
                }}
                variant={props.isMenuOpen === 4 ? "activeBlue" : "ghost"}
              >
                <LuPencil className="h-5 w-5 mb-2" />
                <div>Draw</div>
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 8 ? 0 : 8);
                }}
                variant={props.isMenuOpen === 8 ? "activeBlue" : "ghost"}
              >
                <LuCircle className="h-5 w-5 mb-2" />
                <div>Overlay</div>
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="flex flex-col justify-center items-center h-full"
                    variant={"destructive"}
                  >
                    <LuSquareStack className="h-6 w-6 mb-2" />
                    <div>Pixel</div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <img className="w-full" src={SystemPixelImg.src} alt="" />
                  The Pixel option is currently unavailable at this time.
                </PopoverContent>
              </Popover>
              <Separator className="my-0" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="flex flex-col justify-center items-center h-full"
                    variant={"destructive"}
                  >
                    <LuGalleryHorizontalEnd className="h-6 w-6 mb-2" />
                    <div>Frame</div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <img
                    className="w-full"
                    src={SystemDrawingVideoToGif.src}
                    alt=""
                  />
                  The Frame option is currently unavailable at this time.
                </PopoverContent>
              </Popover>
              <Separator className="my-0" />
              <Button
                variant="ghost"
                className="flex flex-col justify-center items-center h-full gradient-animated1 w-full"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 99 ? 0 : 99);
                  //props.captureElement();
                }}
              >
                <LuArrowDownToLine className="h-5 w-5 mb-2" />
                <div>Finish</div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </ScrollArea>
    </>
  );
};

export default DrawingSidebarMenu;
