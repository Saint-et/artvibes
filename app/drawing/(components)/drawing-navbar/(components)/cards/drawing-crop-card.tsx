import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SystemName } from "@/public/assets/data/data";
import { FaClock, FaDownload } from "react-icons/fa";
import {
  FaRegTrashCan,
  FaCropSimple,
  FaPenToSquare,
  FaImage,
} from "react-icons/fa6";
import Image from "next/image";
import {
  DrawArea,
  IsNewCropImage,
  IsNewImage,
  NewImageSize,
  SystemSettings,
} from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";

interface DrawingCropCardProps {
  //isMenuOpen: number;
  //canvasCropRef: React.RefObject<HTMLCanvasElement>;
  //canvasRef: React.RefObject<HTMLCanvasElement>;
  isNewImage: IsNewImage;
  imgCrop: IsNewCropImage[];
  //isCanvasImage: string;
  //drawArea: DrawArea;
  //isNewImageImport: IsNewImage[];
  //systemSetting: SystemSettings;
  //isImageSize: NewImageSize;

  //setImgCrop: React.Dispatch<React.SetStateAction<any>>;
  //setCanvasImage: React.Dispatch<React.SetStateAction<any>>;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  //setNewImage: React.Dispatch<React.SetStateAction<any>>;

  handleLastAdd: (e: IsNewImage) => void;
  handleSettDrawArea: (e: DrawArea) => void;
  //isResizing: ResizeDirection;
  handleCollectionImg: (id: number) => void;
  handleDeleteCropColection: (id: number) => void;
  //isFreeAreaCrop: boolean;
  //setFreeAreaCrop: React.Dispatch<React.SetStateAction<any>>;

  handleStartCrop: (el: boolean) => void;
}

const DrawingCropCard: React.FC<DrawingCropCardProps> = (props) => {
  if (props.imgCrop.length === 0)
    return (
      <>
        <Card className="border-none bg-transparent">
          <CardDescription>No results: no evidence was found</CardDescription>
        </Card>
      </>
    );

  return (
    <>
      {props.imgCrop?.map((blobUrl, index) => (
        <Carousel
          key={index}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {blobUrl.array?.map((array, index) => (
              <CarouselItem key={index}>
                <div
                  className="relative overflow-hidden rounded-lg group cursor-pointer"
                  onClick={() => {
                    if (props.isNewImage.img !== array.img) {
                      return props.handleLastAdd({
                        fileName: `crop-img-${SystemName}-${index + 1}`,
                        img: array.img,
                        id: index + 1,
                      });
                    }
                  }}
                >
                  <Image
                    className="object-cover w-full h-80 transition-transform duration-300 ease-in-out group-hover:scale-105"
                    src={array.img}
                    width={0}
                    height={0}
                    alt="logo"
                    onMouseDown={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 to-transparent p-4 text-white"
                    title={blobUrl.fileName}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-2xl">
                        {index === 0 ? "Last crop" : index + 1}
                      </span>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          variant="outline"
                          size="icon"
                        >
                          <FaDownload className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            props.handleSettDrawArea(array.area);
                            props.handleStartCrop(true);
                          }}
                          variant="outline"
                          size="icon"
                        >
                          <FaCropSimple className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          onDoubleClick={(e) => {
                            props.handleSettDrawArea(array.area);
                            props.handleCollectionImg(blobUrl.id);
                          }}
                          variant="activeBlue"
                          size="icon"
                        >
                          <FaImage className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          onDoubleClick={(e) => {
                            props.handleDeleteCropColection(blobUrl.id);
                          }}
                          variant={"destructive"}
                          size="icon"
                        >
                          <FaRegTrashCan className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ))}
    </>
  );
};

export default DrawingCropCard;
