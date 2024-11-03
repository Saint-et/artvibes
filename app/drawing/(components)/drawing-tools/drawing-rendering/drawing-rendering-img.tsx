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
import { IsNewImage, LoadedImage, RenderingOption } from "@/utils/interface";
import { downloadImage } from "@/utils/utils";
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
import useUtilsDrawing from "../../utils/utilsDrawing";

interface DrawingRenderingImgProps {
  captureElement: () => void;
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
}

const DrawingRenderingImg: React.FC<DrawingRenderingImgProps> = (props) => {
  const UseUtilsDrawing = useUtilsDrawing();

  const handleDownload = () => {
    if (!props.resultImageUrl) {
      return toast.error("Unable to download.");
    }

    // Exemple de dataURL générée par canvas.toDataURL()
    const dataURL = props.resultImageUrl;

    // Nom du fichier pour le téléchargement
    const fileName = props.isNewImage.fileName;

    // Appel de la fonction pour télécharger l'image "jpg/jpeg"
    downloadImage(dataURL, fileName, "png");
  };

  const handleImageLoad = (e: any) => {
    if (!e) return;
    const { naturalWidth, naturalHeight } = e.target;
    props.setIsRenderingOption({
      ...props.isRenderingOption,
      width: naturalWidth,
      height: naturalHeight,
    });
  };

  const handleClick = async () => {
    try {
      const newImage = await UseUtilsDrawing.SetNewImport(props.resultImageUrl);
      props.setNewImageImport((prevState: any) => [...prevState, newImage]);
      toast.success(`Add to Files: image`);
    } catch (error) {
      toast.error("Error setting new import");
      //console.error("Error setting new import:", error);
    }
  };

  const toolItems = [
    {
      title: "Picture",
      icon: LuImage,
      img: props.isDrawingLoad?.newProject,
      click: () => {
        props.setMenuOpen(props.isMenuOpen === 100 ? 0 : 100);
        props.captureElement();
      },
    },
    {
      title: "Gif",
      icon: LuGalleryHorizontalEnd,
      img: props.isDrawingLoad?.videoToGif,
      click: () => {
        toast.error("Unavailable at the moment.");
      },
    },
    {
      title: "Video",
      icon: LuVideo,
      img: props.isDrawingLoad?.discoverModel,
      click: () => {
        toast.error("Unavailable at the moment.");
      },
    },
  ];

  if (props.isMenuOpen === 99)
    return (
      <>
        <Dialog
          open={props.isMenuOpen === 99}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              props.setMenuOpen(0);
              props.setResultImageUrl("");
            }
          }}
        >
          <DialogContent className="h-max w-[98%] max-w-[1000px] flex flex-col justify-start p-4">
            <DialogHeader>
              <DialogTitle>Select the type of rendering you want.</DialogTitle>
              <DialogDescription>
                Warning: Some rendering types require specific settings set when
                the project is created.
              </DialogDescription>
            </DialogHeader>
            <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 items-start">
              {toolItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-secondary p-6 overflow-hidden rounded-lg shadow-lg group cursor-pointer hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage: item.img ? `url(${item.img})` : "none",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: `${50}% ${50}%`,
                  }}
                  onClick={item.click}
                >
                  <div className="drawing-css-bg rounded-full p-4 inline-block mb-4 group-hover:animate-bounce shadow-md">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3
                    className="text-lg font-semibold group-hover:underline decoration-solid decoration-2 underline-offset-4 mb-2 transition-colors duration-300"
                    style={{ textShadow: "#000000 1px 0 10px" }}
                  >
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </>
    );

  return (
    <>
      <Dialog
        open={props.isMenuOpen === 100}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            props.setMenuOpen(0);
            props.setResultImageUrl("");
          }
        }}
      >
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogContent className="h-[80vh] w-[98%] max-w-[1400px] p-2 z-[5000] bg-[#000000]">
          <ScrollArea className="h-[100%] w-[100%] border-none">
            <Card className="border-none bg-inherit">
              <CardHeader>
                <CardTitle>Image Viewer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center flex-col">
                  <div className="flex justify-center items-center gap-6 max-w-max h-max flex-col md:flex-row">
                    <div className="flex justify-start items-center flex-col w-[90%] max-w-[500px] p-3">
                      <div className="h-max w-max drawing-css-bg-main-tranparent border">
                        <Image
                          src={
                            props.resultImageUrl ||
                            props.isDrawingLoad?.defaultImage ||
                            ""
                          }
                          alt="Placeholder Image"
                          width={600}
                          height={400}
                          className="w-full h-full max-h-[450px] object-contain"
                          onDragStart={(e) => e.preventDefault()}
                          onContextMenu={(e) => e.preventDefault()}
                          onLoad={handleImageLoad}
                        />
                      </div>
                    </div>
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
                      <Card className="bg-inherit border-none">
                        <CardContent className="flex p-1 gap-4">
                          <div className="border rounded flex items-center gap-2 p-1 h-[40px] overflow-hidden">
                            w:{" "}
                            <Input
                              value={props.isRenderingOption.width}
                              disabled
                              className="w-[80px] h-[40px] border-none"
                              type="number"
                              placeholder="width"
                            />
                          </div>
                          <div className="border rounded flex items-center gap-2 p-1 h-[40px] overflow-hidden">
                            h:{" "}
                            <Input
                              value={props.isRenderingOption.height}
                              disabled
                              className="w-[80px] h-[40px] border-none"
                              type="number"
                              placeholder="height"
                            />
                          </div>
                        </CardContent>
                      </Card>
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
                      <Button variant="outline" disabled>
                        Add a watermark
                      </Button>
                      <Separator className="my-4" />
                      <RadioGroup
                        className="grid grid-cols-3 gap-2"
                        defaultValue="png"
                      >
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="png" id="r1" />
                            <Label htmlFor="r1">.png</Label>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            This format is best if you want to maintain high
                            image quality.
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
                            This format is great for sharing content with
                            embedded links.
                          </p>
                        </div>
                      </RadioGroup>
                      <div className="w-full grid grid-cols-3 gap-2">
                        <Button
                          onClick={() => {
                            props.captureElement();
                          }}
                          variant="outline"
                          disabled={!props.resultImageUrl}
                        >
                          <LuImage className="mr-2 h-4 w-4" />
                          Apply change ...
                        </Button>
                        <Button
                          onClick={handleClick}
                          variant="outline"
                          disabled={!props.resultImageUrl}
                        >
                          <LuFolderPlus className="mr-2 h-4 w-4" />
                          Add to file
                        </Button>
                        <Button
                          variant={"activeBlue"}
                          disabled={!props.resultImageUrl}
                          onClick={() => handleDownload()}
                        >
                          <FaDownload className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
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
