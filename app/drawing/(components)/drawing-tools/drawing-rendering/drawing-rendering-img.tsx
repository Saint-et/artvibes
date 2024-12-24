import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DrawingSetting,
  ExpandImg,
  IsNewImage,
  IsNewOverlaySave,
  LayerElement,
  LoadedImage,
  RenderingOption,
  SystemSettings,
  SystemShadow,
} from "@/utils/interface";
import {
  downloadImage,
  generateRandomId,
  resizeImageBase64,
} from "@/utils/utils";
import toast from "react-hot-toast";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  LuFolderPlus,
  LuGalleryHorizontalEnd,
  LuImage,
  LuInfo,
  LuVideo,
} from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
//import useUtilsDrawing from "../../utils/utilsDrawing";
import useDrawingRendering from "./drawing-rendering";
import { DrawingName } from "@/public/assets/data/data";

interface DrawingRenderingImgProps {
  resultImageUrl: string;
  handleSetBasicOverlay: () => void;
  isRenderingOpen: boolean;
  setResultImageUrl: React.Dispatch<React.SetStateAction<any>>;
  isMenuOpen: number;
  setMenuOpen: React.Dispatch<React.SetStateAction<any>>;
  isRenderingOption: RenderingOption;
  setIsRenderingOption: React.Dispatch<React.SetStateAction<any>>;
  isNewImage: IsNewImage;
  setNewImage: React.Dispatch<React.SetStateAction<any>>;
  isDrawingLoad: LoadedImage | undefined;
  setNewImageImport: React.Dispatch<React.SetStateAction<any>>;
  setDrawingSetting: React.Dispatch<React.SetStateAction<DrawingSetting>>;
  isDrawingSetting: DrawingSetting;
  isImgOverlaySave: IsNewOverlaySave[];
  drawingExpandImg: ExpandImg;
  systemShadow: SystemShadow;
  systemSetting: SystemSettings;
  handleRenderingToast: (isLayers: LayerElement[]) => Promise<string>;
  handleSvgConverter: () => Promise<LayerElement[]>;
}

const DrawingRenderingImg: React.FC<DrawingRenderingImgProps> = (props) => {
  //const UseUtilsDrawing = useUtilsDrawing();

  return (
    <>
      <Dialog
        open={props.isDrawingSetting.imgRendering}
        onOpenChange={(isOpen) => {
          props.setDrawingSetting((prevState: DrawingSetting) => ({
            ...prevState,
            imgRendering: isOpen,
          }));
        }}
      >
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogContent className="h-[75vh] p-2 z-[5000]">
          <ScrollArea className="h-[100%] w-[100%] border-none">
            <Card className="border-none bg-inherit">
              <CardHeader>
                <CardTitle>Image Viewer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center flex-col">
                  <div className="grid grid-cols-1 gap-6 max-w-max h-max">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="nameThisWork">Name your project</Label>
                      <Input
                        value={props.isNewImage.fileName}
                        onChange={(e) => {
                          props.setNewImage({
                            ...props.isNewImage,
                            fileName: e.target.value,
                          });
                        }}
                        type="text"
                        id="nameThisWork"
                        placeholder="..."
                      />
                    </div>
                    <div>Rendering option :</div>
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
                          This allows you to decide whether or not to keep the
                          new dimensions after the change.
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
                    <Separator className="my-1" />
                    <RadioGroup
                      className="grid grid-cols-3 gap-2"
                      value={props.isRenderingOption.format}
                      onValueChange={(e) => {
                        props.setIsRenderingOption({
                          ...props.isRenderingOption,
                          format: e, // Utilisation de `checked` qui est un booléen
                        });
                      }}
                    >
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="png" id="r1" />
                          <Label htmlFor="r1">.png</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This format is best if you want to maintain high image
                          quality.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="jpg/jpeg" id="r2" />
                          <Label htmlFor="r2">.jpg/.jpeg</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This format is best for sharing and the web.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pdf" id="r3" disabled />
                          <Label htmlFor="r3">.pdf</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This format is great for sharing content with embedded
                          links.
                        </p>
                      </div>
                    </RadioGroup>
                    <Separator className="my-1" />
                    <div className="w-full grid grid-cols-3 gap-2">
                      <Button
                        onClick={() => {
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
                                resizeImageBase64(
                                  result as string,
                                  300,
                                  async function (resizedBlob: any) {
                                    return props.setNewImageImport(
                                      (prevState: any) => [
                                        ...prevState,
                                        {
                                          id: generateRandomId(),
                                          fileName: `${DrawingName}-${Date.now()}`,
                                          img: result,
                                          miniature: resizedBlob,
                                        },
                                      ]
                                    );
                                  }
                                );
                                return "Add to Files: image.";
                              }),
                            {
                              loading: "Processing images and rendering...",
                              success: "Add to Files: image.",
                              error: "An error occurred during the process.",
                            }
                          );
                        }}
                        variant="outline"
                      >
                        <LuFolderPlus className="mr-2 h-4 w-4" />
                        Add to file
                      </Button>
                      <Button
                        variant={"activeBlue"}
                        onClick={() => {
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
                                downloadImage(
                                  result,
                                  props.isNewImage.fileName,
                                  props.isRenderingOption.format
                                );
                                return "The download can begin.";
                              }),
                            {
                              loading: "Processing images and rendering...",
                              success: "The download can begin.",
                              error: "An error occurred during the process.",
                            }
                          );
                        }}
                      >
                        <FaDownload className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DrawingRenderingImg;
