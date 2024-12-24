import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DrawArea,
  DrawDrawing,
  DrawForm,
  DrawingSetting,
  DrawNowInterface,
  ExpandImg,
  IsNewOverlay,
  LayerElement,
  LoadedImage,
  MenuLayer,
  NewImageSize,
} from "@/utils/interface";
import { MutableRefObject, useRef } from "react";
import {
  LuBrush,
  LuEraser,
  LuImageOff,
  LuMoveHorizontal,
  LuMoveVertical,
  LuPaintBucket,
  LuPencil,
  LuPencilRuler,
  LuPlus,
  LuRefreshCw,
  LuSettings2,
  LuX,
} from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ColorsDrawing } from "@/public/assets/data/data";

interface DrawingSidebarMenuFormsProps {
  isMenuOpen: number;
  isImageSize: NewImageSize;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  setDrawForm: React.Dispatch<React.SetStateAction<any>>;
  drawArea: DrawArea;
  drawForm: DrawForm;
  isFormCanvasVisible: string;
  setFormCanvasVisible: React.Dispatch<React.SetStateAction<any>>;
  sidebarRef: MutableRefObject<HTMLDivElement | null>;
  textCanvasContainerRef: MutableRefObject<HTMLDivElement | null>;
  textCanvasRef: MutableRefObject<HTMLDivElement | null>;
  isImgOverlay: IsNewOverlay;
  handleResetImgOverlay: () => void;
  handleSaveImgOverlay: () => void;
  setMenuLayer: React.Dispatch<React.SetStateAction<any>>;
  isMenuLayer: MenuLayer;
  drawDrawing: DrawDrawing;
  setDrawDrawing: React.Dispatch<React.SetStateAction<any>>;
  isDrawingNowCanvas: DrawNowInterface;
  setIsDrawingNowCanvas: React.Dispatch<React.SetStateAction<DrawNowInterface>>;
  isLayers: LayerElement[];
  DrawCanvasImg: () => void;
  canvasDrawRef: MutableRefObject<HTMLCanvasElement | null>;
  setLayers: React.Dispatch<React.SetStateAction<any>>;
  HandleCanvas: (id: number, image: string) => void;
  drawingExpandImg: ExpandImg;
  isDrawingLoad: LoadedImage | undefined;
  handleSetBasicOverlay: () => void;
  isDrawingSetting: DrawingSetting;
  setDrawingSetting: React.Dispatch<React.SetStateAction<any>>;
}

const DrawingSidebarMenuForms: React.FC<DrawingSidebarMenuFormsProps> = (
  props
) => {
  const inputColorRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClickColor = (ref: HTMLInputElement | null) => {
    if (ref) {
      ref.click();
    }
  };

  const handleResetDraw = async () => {
    const canvas = props.canvasDrawRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    await context.clearRect(0, 0, canvas.width, canvas.height);

    props.DrawCanvasImg();
  };

  const imgFrameOpacity = [
    { img: props.isDrawingLoad?.LearnImage, opacity: 1 },
    { img: props.isDrawingLoad?.aboutDrawing, opacity: 1 },
    { img: props.isDrawingLoad?.bgHome, opacity: 1 },
    { img: props.isDrawingLoad?.newProject, opacity: 1 },
  ];

  if (props.isMenuOpen !== 4) return null;
  return (
    <>
      <Card className="border-none rounded-none bg-transparent">
        <CardContent className="grid grid-cols-1 gap-2 p-4 text-black dark:text-white">
          <div className="text-1xl flex justify-between">
            Drawing :<LuPencil className="h-4 w-4" />
          </div>
          <Separator className="my-2" />
          <Card>
            <CardContent className="p-0 drawing-css-bg-main-tranparent rounded">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 400 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 50 Q 50 0, 100 50 T 200 50 T 300 50 T 400 50"
                  stroke={props.drawDrawing.color}
                  strokeWidth={props.drawDrawing.thickness / 2}
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray="0 0"
                />
              </svg>
            </CardContent>
          </Card>
          <div className="grid grid-cols-4 gap-2">
            <Button
              variant={
                props.isDrawingNowCanvas?.type === "pen"
                  ? "activeBlue"
                  : "ghost"
              }
              onClick={() => {
                props.setIsDrawingNowCanvas((prevState: DrawNowInterface) => ({
                  ...prevState,
                  type: "pen",
                }));
              }}
            >
              <LuPencil className="text-2xl" />
            </Button>

            <Button
              variant={
                props.isDrawingNowCanvas?.type === "highlight"
                  ? "activeBlue"
                  : "ghost"
              }
              onClick={() => {
                if (props.isDrawingNowCanvas?.type === "highlight") {
                  return props.setIsDrawingNowCanvas(
                    (prevState: DrawNowInterface) => ({
                      ...prevState,
                      direction:
                        prevState.direction === "horizontal"
                          ? "vertical"
                          : prevState.direction === "vertical"
                          ? "horizontal"
                          : prevState.direction,
                    })
                  );
                }
                props.setIsDrawingNowCanvas((prevState: DrawNowInterface) => ({
                  ...prevState,
                  type: "highlight",
                }));
              }}
            >
              {props.isDrawingNowCanvas?.type !== "highlight" && (
                <LuPencilRuler className="text-2xl" />
              )}
              {props.isDrawingNowCanvas?.type === "highlight" && (
                <>
                  {props.isDrawingNowCanvas?.direction === "horizontal" && (
                    <LuMoveHorizontal className="text-2xl" />
                  )}
                  {props.isDrawingNowCanvas?.direction === "vertical" && (
                    <LuMoveVertical className="text-2xl" />
                  )}
                </>
              )}
            </Button>
            <Button
              variant={
                props.isDrawingNowCanvas?.type === "brush"
                  ? "activeBlue"
                  : "ghost"
              }
              onClick={() => {
                props.setIsDrawingNowCanvas((prevState: DrawNowInterface) => ({
                  ...prevState,
                  type: "brush",
                }));
              }}
            >
              <LuBrush className="text-2xl" />
            </Button>
            <Button
              variant={
                props.isDrawingNowCanvas?.type === "eraser"
                  ? "destructive"
                  : "ghost"
              }
              onClick={() => {
                props.setIsDrawingNowCanvas((prevState: DrawNowInterface) => ({
                  ...prevState,
                  type: "eraser",
                }));
              }}
            >
              <LuEraser className="text-2xl" />
            </Button>
          </div>
          <Separator className="my-4" />
          <div>thickness : {props.drawDrawing.thickness}px</div>
          <Slider
            className="rounded-full border"
            value={[props.drawDrawing.thickness]}
            onValueChange={(e) =>
              props.setDrawDrawing((prevState: any) => ({
                ...prevState,
                thickness: e[0],
              }))
            }
            min={1}
            max={200}
            step={1}
          />
          <Separator className="my-4" />
          <div>Color :</div>
          <div className="grid grid-cols-5 gap-4">
            <Button
              className="rounded-full hue-background"
              variant={"outline"}
              size="icon"
              onClick={() => handleButtonClickColor(inputColorRef.current)}
              onBlur={() => {
                let color = inputColorRef.current?.value;
                props.setDrawDrawing((prevState: any) => ({
                  ...prevState,
                  color: color,
                }));
              }}
            >
              <input
                ref={inputColorRef}
                onChange={(e) => {
                  e.currentTarget.value = e.target.value;
                }}
                className="appearance-none cursor-pointer"
                style={{
                  background: "none",
                  opacity: 0,
                  zIndex: -1,
                  width: 0,
                  height: 0,
                }}
                type="color"
                name=""
                id=""
              />
            </Button>
            {ColorsDrawing.map((color: any) => (
              <Button
                key={color.name}
                onClick={() =>
                  props.setDrawDrawing((prevState: any) => ({
                    ...prevState,
                    color: color.value,
                  }))
                }
                className="rounded-full border"
                style={{ backgroundColor: color.value }}
                size="icon"
              />
            ))}
          </div>
        </CardContent>
        <Separator className="my-4" />
        <CardContent className="grid grid-cols-1 gap-2 p-4">
          <Button
            className="rounded-full"
            variant={"activeBlue"}
            onClick={async () => {
              props.handleSetBasicOverlay();
              const time = Date.now();

              const canvas = document.createElement("canvas");
              canvas.width =
                props.isImageSize.w + props.drawingExpandImg.expand;
              canvas.height =
                props.isImageSize.h + props.drawingExpandImg.expand;

              // Récupérer l'image en tant que Data URL (base64)
              const dataURL = await canvas.toDataURL("image/png");

              props.setLayers((prevLayers: any) => [
                ...prevLayers,
                {
                  layerType: "draw",
                  id: time,
                  img: dataURL,
                  expand: props.drawingExpandImg.expand,
                },
              ]);
              props.setIsDrawingNowCanvas((prevState: DrawNowInterface) => ({
                ...prevState,
                id: time,
              }));
            }}
          >
            New Draw <LuPlus className="ml-2" />
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button
              className="p-1 rounded-full h-6"
              variant="default"
              onClick={handleResetDraw}
            >
              Clear <LuRefreshCw className="mx-2 text-red-500" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="p-1 rounded-full h-6" variant="default">
                  Setting <LuSettings2 className="mx-2 text-amber-500" />
                </Button>
              </DialogTrigger>
              <DialogContent className="h-[70vh] w-[98%] max-w-[1000px] flex flex-col justify-start p-4">
                <DialogHeader>
                  <DialogTitle>Setting draw</DialogTitle>
                  <DialogDescription>
                    Adjust the display of content on the screen more Adapted.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-full">
                  <Tabs defaultValue="canvas">
                    <TabsList className="grid w-full grid-cols-2 bg-black gap-1 p-0">
                      <TabsTrigger value="canvas" className="h-[30px] mx-1">
                        Canvas
                      </TabsTrigger>
                      <TabsTrigger value="frame" className="h-[30px] mx-1">
                        Frame{" "}
                        <Badge variant="destructive" className="ml-2">
                          Unavailable
                        </Badge>
                      </TabsTrigger>
                    </TabsList>
                    <Separator className="my-4" />
                    <TabsContent value="canvas">
                      <>
                        <DialogHeader>
                          <DialogTitle>Canvas</DialogTitle>
                        </DialogHeader>
                        <Separator className="my-4" />
                        <div className="items-top flex space-x-2">
                          <Checkbox
                            id="hideAllElement1"
                            checked={props.isDrawingSetting.paint.hideElCanvas}
                            onCheckedChange={(value) => {
                              props.setDrawingSetting(
                                (prevState: DrawingSetting) => ({
                                  ...prevState,
                                  paint: {
                                    ...props.isDrawingSetting.paint,
                                    hideElCanvas: value,
                                  },
                                })
                              );
                            }}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor="hideAllElement1"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Hide all other elements of the canvas?
                            </label>
                            <p className="text-sm text-muted-foreground">
                              Hides all other items that are not relevant
                              drawing.
                            </p>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="items-top flex space-x-2">
                          <Checkbox
                            id="hideCanvas1"
                            checked={
                              props.isDrawingSetting.paint.showDrawSelected
                            }
                            onCheckedChange={(value) => {
                              props.setDrawingSetting(
                                (prevState: DrawingSetting) => ({
                                  ...prevState,
                                  paint: {
                                    ...props.isDrawingSetting.paint,
                                    showDrawSelected: value,
                                  },
                                })
                              );
                            }}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor="hideCanvas1"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Displayed only the selected drawing?
                            </label>
                            <p className="text-sm text-muted-foreground">
                              Hide the other drawing for Displayed only on
                              drawing select.
                            </p>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div
                          className="items-top flex space-x-2"
                          style={{
                            opacity: props.isDrawingSetting.paint
                              .showDrawSelected
                              ? 0.5
                              : 1,
                          }}
                        >
                          <Checkbox
                            id="opacityAllCanvas1"
                            checked={props.isDrawingSetting.paint.opacity}
                            disabled={
                              props.isDrawingSetting.paint.showDrawSelected
                            }
                            onCheckedChange={(value) => {
                              props.setDrawingSetting(
                                (prevState: DrawingSetting) => ({
                                  ...prevState,
                                  paint: {
                                    ...props.isDrawingSetting.paint,
                                    opacity: value,
                                  },
                                })
                              );
                            }}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor="opacityAllCanvas1"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Decreased the opacity of the other drawings?
                            </label>
                            <p className="text-sm text-muted-foreground">
                              Only decreases the opacity of other drawings.
                            </p>
                          </div>
                        </div>
                      </>
                    </TabsContent>
                    <TabsContent value="frame">
                      <>
                        <DialogHeader>
                          <DialogTitle>Frame</DialogTitle>
                        </DialogHeader>
                        <Separator className="my-4" />
                        <div className="items-top flex space-x-2">
                          <Checkbox id="HideAllElement2" />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor="HideAllElement2"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Hide all other elements of the canvas?
                            </label>
                            <p className="text-sm text-muted-foreground">
                              Hides all other items that are not relevant
                              drawing.
                            </p>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="text-sm">
                          Number of frames displayed.
                        </div>

                        <RadioGroup
                          defaultValue="1"
                          className="grid grid-cols-4 gap-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1" id="rf1" />
                            <Label htmlFor="rf1">1 frames</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="2" id="rf2" />
                            <Label htmlFor="rf2">2 frames</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="3" id="rf3" />
                            <Label htmlFor="rf3">3 frames</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="4" id="rf4" />
                            <Label htmlFor="rf4">4 frames</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="5" id="rf5" />
                            <Label htmlFor="rf5">5 frames</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="6" id="rf6" />
                            <Label htmlFor="rf6">6 frames</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="8" id="rf8" />
                            <Label htmlFor="rf8">8 frames</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="10" id="rf10" />
                            <Label htmlFor="rf10">10 frames</Label>
                          </div>
                        </RadioGroup>
                        <Separator className="my-4" />
                        <div className="text-sm">Adjusting the frames.</div>
                        <div className="items-top flex space-x-2 my-4">
                          <Checkbox id="B&W2" />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor="B&W2"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Show other drawings in black and white?
                            </label>
                            <p className="text-sm text-muted-foreground">
                              Displays the other black and white drawings for
                              Have better visibility.
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 my-4">
                          {imgFrameOpacity?.map((el, index) => (
                            <img
                              key={index}
                              className="w-full h-20 rounded-full object-cover"
                              src={el.img}
                              alt=""
                            />
                          ))}
                        </div>
                        <div className="text-sm">Frame opacity.</div>
                        <Slider defaultValue={[33]} max={100} step={1} />
                      </>
                    </TabsContent>
                  </Tabs>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
        <ScrollArea className="h-[290px] mx-4">
          <CardContent className="flex flex-col-reverse p-4">
            {props.isLayers?.map((el: any, index: number) => (
              <div key={index}>
                {el.layerType === "draw" && (
                  <>
                    <Card
                      className="rounded cursor-pointer p-0 mt-4 bg-transparent"
                      style={{
                        padding: 5,
                        border:
                          props.isDrawingNowCanvas.id === el.id
                            ? "3px solid #006aff"
                            : "3px solid transparent",
                      }}
                      onClick={() => {
                        props.handleSetBasicOverlay();
                        if (
                          props.isDrawingNowCanvas.id === null ||
                          props.isDrawingNowCanvas.id !== el.id
                        ) {
                          props.HandleCanvas(el.id, el.img);
                        } else {
                          props.setIsDrawingNowCanvas((prevState: any) => ({
                            ...prevState,
                            id: null,
                          }));
                        }
                      }}
                    >
                      <CardContent className="drawing-css-bg-main-tranparent p-0 relative">
                        {el.img ? (
                          <img
                            src={el.img}
                            alt="Image du layer"
                            className="w-full h-[100px] object-contain"
                          />
                        ) : (
                          <div className="hover:scale-95 h-20 w-full flex items-center justify-center">
                            <LuImageOff className="text-6xl text-[#bf4040]" />
                          </div>
                        )}
                        <Button
                          className="w-[20px] h-[20px] p-1 absolute right-1 top-1"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            props.setIsDrawingNowCanvas((prevState: any) => ({
                              ...prevState,
                              id: null,
                            }));
                            props.setLayers((prevLayers: any) =>
                              prevLayers.filter(
                                (element: any) => element.id !== el.id
                              )
                            );
                            const updatedElements = props.isLayers.filter(
                              (element) => element.id !== el.id
                            );
                            props.setLayers(updatedElements);
                          }}
                        >
                          <LuX />
                        </Button>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>
    </>
  );
};

export default DrawingSidebarMenuForms;
