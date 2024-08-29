import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Separator } from "@/components/ui/separator";
import {
  SystemCoverDrawin3,
  SystemCoverDrawing,
  SystemNoImg,
} from "@/public/assets/data/data";
import { IsNewImage, IsNewOverlay, NewImageSize } from "@/utils/interface";
import { downloadImage } from "@/utils/utils";
import { MutableRefObject } from "react";
import toast from "react-hot-toast";
import { FaCube, FaClone, FaLayerGroup } from "react-icons/fa";
import {
  FaT,
  FaCropSimple,
  FaRegObjectGroup,
  FaPlus,
  FaArrowPointer,
  FaRegWindowRestore,
  FaDownload,
  FaDownLong,
  FaArrowsRotate,
  FaBrain,
  FaCrown,
} from "react-icons/fa6";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { VscActivateBreakpoints } from "react-icons/vsc";

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
}

const DrawingSidebarMenu: React.FC<DrawingSidebarMenuProps> = (props) => {
  const handleDownload = () => {
    if (!props.resultImageUrl) {
      return toast.error("Unable to download.");
    }

    // Exemple de dataURL générée par canvas.toDataURL()
    const dataURL = props.resultImageUrl;

    // Nom du fichier pour le téléchargement
    const fileName = "cropped-image.png";

    // Appel de la fonction pour télécharger l'image
    downloadImage(dataURL, fileName);
  };

  if (!props.isNewImage.img) return null;

  return (
    <>
      <ScrollArea
        ref={props.mainSidebarRef}
        className="pr-2 w-[100%] min-w-[100px] max-w-[100px] block bg-[#0d0d0d]"
      >
        <Card className="border-none rounded-none min-w-[110px] mt-5 h-full bg-transparent">
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                className="flex flex-col justify-center items-center h-full border border-yellow-500 text-yellow-500 hover:text-yellow-500"
              >
                <FaCrown className="text-1xl mb-2" />
                <div>Drawing</div>
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full border gradient-animated5"
                variant="outline"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 9 ? 0 : 9);
                }}
              >
                <FaBrain className="text-1xl mb-2" />
                <div>AI</div>
              </Button>
              <Separator className="my-1" />
              <Button
                className="flex flex-col justify-center items-center h-full border"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 2 ? 0 : 2);
                }}
                variant={props.isMenuOpen === 2 ? "activeBlue" : "outline"}
              >
                <FaT className="text-1xl mb-2" />
                <div>text</div>
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full border"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 3 ? 0 : 3);
                }}
                variant={props.isMenuOpen === 3 ? "activeBlue" : "outline"}
              >
                <HiAdjustmentsHorizontal className="text-[20px] mb-2" />
                <div>Filter</div>
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full border"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 6 ? 0 : 6);
                }}
                variant={props.isMenuOpen === 6 ? "activeBlue" : "outline"}
              >
                <VscActivateBreakpoints className="text-2xl mb-2" />
                <div>Shadow</div>
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full border"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 4 ? 0 : 4);
                }}
                variant={props.isMenuOpen === 4 ? "activeBlue" : "outline"}
              >
                <FaCube className="text-1xl mb-2" />
                <div>Forms</div>
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full border"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 5 ? 0 : 5);
                  if (props.isImgOverlay.img) {
                    props.handleSetBasicOverlay();
                  }
                  props.setDrawArea({
                    width: props.isImageSize.w,
                    height: props.isImageSize.h,
                    leftOffset: 0,
                    topOffset: 0,
                    positionX: 0, // 22
                    positionY: 0, // 22
                  });
                }}
                variant={props.isMenuOpen === 5 ? "activeBlue" : "outline"}
              >
                <FaCropSimple className="text-1xl mb-2" />
                <div>Crop</div>
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full border"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 8 ? 0 : 8);
                }}
                variant={props.isMenuOpen === 8 ? "activeBlue" : "outline"}
              >
                <FaRegObjectGroup className="text-2xl" />
                <div>Overlay</div>
              </Button>
              <Button
                className="flex flex-col justify-center items-center h-full border"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 7 ? 0 : 7);
                }}
                variant={props.isMenuOpen === 7 ? "activeBlue" : "outline"}
              >
                <FaLayerGroup className="text-1xl mb-2" />
                <div>Models</div>
              </Button>
              <Separator className="my-1" />
              <Dialog>
                <DialogTrigger>
                  <Button
                    variant="outline"
                    className="flex flex-col justify-center items-center h-full gradient-animated1 w-full border"
                    onClick={() => {
                      props.captureElement();
                    }}
                  >
                    <FaDownLong className="text-1xl mb-2" />
                    <div>Finish</div>
                  </Button>
                </DialogTrigger>
                <DialogHeader className="hidden">
                  <DialogTitle></DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <DialogContent className="h-[95vh] w-[98%] max-w-[1400px] p-2">
                  <ScrollArea className="h-[100%] w-[100%] border-none">
                    <Card className="border-none bg-inherit">
                      <CardHeader>
                        <CardTitle>Image Viewer</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col items-center gap-4">
                          <img
                            src={props.resultImageUrl || SystemCoverDrawing.src}
                            alt="Placeholder Image"
                            width={600}
                            height={400}
                            className="w-full max-w-[500px] h-[500px] object-contain"
                            onDragStart={(e) => e.preventDefault()}
                            onContextMenu={(e) => e.preventDefault()}
                          />
                          <div className="w-full max-w-[500px] grid grid-cols-2 gap-2">
                            <Button
                              onClick={() => {
                                props.captureElement();
                              }}
                              className="w-full"
                            >
                              <FaArrowsRotate className="mr-2 h-4 w-4" />
                              Refresh
                            </Button>
                            <Button
                              className="w-full"
                              variant={"activeBlue"}
                              onClick={() => handleDownload()}
                            >
                              <FaDownload className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </ScrollArea>
    </>
  );
};

export default DrawingSidebarMenu;
