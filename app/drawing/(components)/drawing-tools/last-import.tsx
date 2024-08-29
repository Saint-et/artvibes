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
import { MutableRefObject, useState } from "react";
import {
  DrawArea,
  IsNewCropImage,
  IsNewImage,
  IsNewOverlay,
  NewImageSize,
} from "@/utils/interface";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { SystemName } from "@/public/assets/data/data";

interface LastImportProps {
  handleDeleteImport: (e: number) => void;
  setNewImage: React.Dispatch<React.SetStateAction<any>>;
  isFileDialogOpenImport: boolean;
  isNewImage: IsNewImage;
  setFileDialogOpenImport: React.Dispatch<React.SetStateAction<any>>;
  isNewImageImport: IsNewImage[];
  imgCrop: IsNewCropImage[];
  setImgCrop: React.Dispatch<React.SetStateAction<any>>;
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
}

const LastImport: React.FC<LastImportProps> = (props) => {
  const [isFilesOpen, setFilesOpen] = useState<number>(0);

  return (
    <>
      <Dialog
        open={props.isFileDialogOpenImport}
        onOpenChange={props.setFileDialogOpenImport}
      >
        <DialogContent
          className="h-[95vh] w-[98%] max-w-[1400px] p-2 drawing-css-bg"
          ref={props.dialogLastImportRef}
        >
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              <Card>
                <CardContent className="grid grid-cols-5 gap-4 p-4 p-4">
                  <Button
                    onClick={props.handleButtonClickImport}
                    className="flex flex-col h-max"
                    variant="activeBlue"
                  >
                    <FaPlus className="h-8 w-8 mb-2" />
                    Import image ...
                  </Button>
                  <Button
                    className="flex flex-col h-max"
                    variant="outline"
                    style={{
                      boxShadow:
                        isFilesOpen === 0 ? "#525252 0px 0px 0px 3px" : "",
                    }}
                    onClick={() => {
                      setFilesOpen(0);
                    }}
                  >
                    <FaClock className="h-8 w-8 mb-2" />
                    Impoted images
                  </Button>
                  <Button
                    className="flex flex-col h-max"
                    variant="outline"
                    style={{
                      boxShadow:
                        isFilesOpen === 3 ? "#525252 0px 0px 0px 3px" : "",
                    }}
                    onClick={() => {
                      setFilesOpen(3);
                    }}
                  >
                    <FaCropSimple className="h-8 w-8 mb-2" />
                    Cropped images
                  </Button>
                  <Button
                    className="flex flex-col h-max"
                    variant="outline"
                    style={{
                      boxShadow:
                        isFilesOpen === 1 ? "#525252 0px 0px 0px 3px" : "",
                    }}
                    onClick={() => {
                      setFilesOpen(1);
                    }}
                  >
                    <FaBoxArchive className="h-8 w-8 mb-2" />
                    Archived images
                  </Button>
                  <Button
                    className="flex flex-col h-max gradient5"
                    variant="outline"
                    style={{
                      boxShadow:
                        isFilesOpen === 2 ? "#525252 0px 0px 0px 3px" : "",
                    }}
                    onClick={() => {
                      setFilesOpen(2);
                    }}
                  >
                    <FaBrain className="h-8 w-8 mb-2" />
                    Ai generator
                  </Button>
                </CardContent>
              </Card>
            </DialogDescription>
          </DialogHeader>
          {isFilesOpen === 0 && (
            <ScrollArea className="h-full w-full p-4">
              <div className="grid grid-cols-5 gap-4">
                {props.isNewImageImport?.map((blobUrl, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg group cursor-pointer border"
                    style={{
                      borderColor:
                        props.isNewImage.id === blobUrl.id ? "#006eff" : "",
                    }}
                    onClick={() => {
                      if (props.isNewImage.id !== blobUrl.id) {
                        return props.handleLastAdd(blobUrl);
                      }
                      toast.error("This image is already in use.");
                    }}
                  >
                    <img
                      className="object-cover w-full h-80 transition-transform duration-300 ease-in-out group-hover:scale-105"
                      src={blobUrl.img}
                      alt="logo"
                      onMouseDown={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 to-transparent p-4 text-white">
                      <div className="flex flex-col items-center gap-2">
                        <span>id: {blobUrl.id}</span>
                        <div className="p-1 flex gap-2 m-2">
                          {props.isMenuOpen === 8 && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (props.isImgOverlay.form === "") {
                                  props.setDrawArea({
                                    width: 300,
                                    height: 300,
                                    leftOffset: 0,
                                    topOffset: 0,
                                    positionX: props.isImageSize.w / 2 - 150,
                                    positionY: props.isImageSize.h / 2 - 150,
                                  });
                                }
                                props.setImgOverlay({
                                  ...props.isImgOverlay,
                                  img: blobUrl.img,
                                  form:
                                    props.isImgOverlay.form === ""
                                      ? "square"
                                      : props.isImgOverlay.form,
                                  filter: {
                                    brightness: 100,
                                    contrast: 100,
                                    saturation: 100,
                                    hue: 0,
                                    blur: 0,
                                    sepia: 0,
                                    grayscale: 0,
                                    invert: 0,
                                  },
                                });
                                props.setFileDialogOpenImport(false);
                              }}
                              variant="outline"
                              size="icon"
                            >
                              <FaRegObjectGroup className="h-4 w-4" />
                            </Button>
                          )}
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
                ))}
              </div>
            </ScrollArea>
          )}
          {isFilesOpen === 1 && (
            <ScrollArea className="h-full w-full p-4">
              <div className="grid grid-cols-5 gap-4"></div>
            </ScrollArea>
          )}
          {isFilesOpen === 2 && (
            <ScrollArea className="h-full w-full p-4">
              <div className="grid grid-cols-5 gap-4"></div>
            </ScrollArea>
          )}
          {isFilesOpen === 3 && (
            <ScrollArea className="h-full w-full p-4">
              <div className="grid grid-cols-5 gap-4">
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
                                  fileName: `crop-img-${SystemName}-${
                                    index + 1
                                  }`,
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
                                  {props.isMenuOpen === 8 && (
                                    <Button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        props.handleResetImgOverlay();
                                        props.handleSettDrawArea(array.area);
                                        props.setFileDialogOpenImport(false);
                                      }}
                                      variant="outline"
                                      size="icon"
                                    >
                                      <FaRegObjectGroup className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      props.handleSettDrawArea(array.area);
                                      props.setFileDialogOpenImport(false);
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
                                    variant="outline"
                                    size="icon"
                                  >
                                    <FaDownload className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                    onDoubleClick={(e) => {
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
                                      props.handleDeleteCropColection(
                                        blobUrl.id
                                      );
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
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LastImport;
