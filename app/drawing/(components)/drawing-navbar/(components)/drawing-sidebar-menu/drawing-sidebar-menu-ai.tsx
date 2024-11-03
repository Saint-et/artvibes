import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { AiQuality, IsNewImage, NewImageSize } from "@/utils/interface";
import { LuAlertCircle, LuFrame, LuSparkles } from "react-icons/lu";
import Image from "next/image";

const noiseLevel = [
  { noise: "None", level: -1 },
  { noise: "Low", level: 0 },
  { noise: "Medium", level: 1 },
  { noise: "High", level: 2 },
  { noise: "Highest", level: 3 },
];
const Style = ["art", "photo"];

interface DrawingSidebarMenuModelsProps {
  isMenuOpen: number;
  handleAiQuality: () => void;
  isNewImage: IsNewImage;
  isAiQuality: AiQuality;
  setAiQuality: React.Dispatch<React.SetStateAction<AiQuality>>;
  isImageSize: NewImageSize;
}

const DrawingSidebarMenuAI: React.FC<DrawingSidebarMenuModelsProps> = (
  props
) => {
  if (props.isMenuOpen !== 9) return;

  return (
    <>
      <Card className="border-none rounded-none bg-transparent">
        <CardContent className="grid grid-cols-1 gap-2 p-4">
          <div className="text-1xl flex justify-between">
            AI :<LuSparkles className="h-4 w-4" />
          </div>
          <Separator className="my-2" />
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Reduce image noise or resize ?</AccordionTrigger>
              <AccordionContent>
                <CardContent className="grid grid-cols-1 gap-4">
                  <div className="flex w-full items-center justify-center">
                    <div className="grid w-full max-w-sm gap-4">
                      <div className="text-sm">Style</div>
                      <Select
                        onValueChange={(value) => {
                          props.setAiQuality((prevState: AiQuality) => ({
                            ...prevState,
                            style: value,
                          }));
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            defaultValue={props.isAiQuality?.style}
                            placeholder={props.isAiQuality?.style}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {Style?.map((el) => (
                            <SelectItem key={el} value={el}>
                              {el}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="text-sm">Noise</div>
                      <Select
                        onValueChange={(value) => {
                          props.setAiQuality((prevState: AiQuality) => ({
                            ...prevState,
                            noise: parseInt(value),
                          }));
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            defaultValue={`${props.isAiQuality?.noise}`}
                            placeholder={
                              noiseLevel[props.isAiQuality?.noise + 1].noise
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {noiseLevel?.map((el) => (
                            <SelectItem key={el.level} value={`${el.level}`}>
                              {el.noise}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="text-sm flex justify-between items-center w-full">
                        Image size: {props.isAiQuality?.scale}x{" "}
                        <LuAlertCircle />
                      </div>
                      <Slider
                        defaultValue={[1]}
                        min={1}
                        max={2}
                        step={1}
                        value={[props.isAiQuality?.scale]}
                        onValueChange={(e: any) => {
                          props.setAiQuality((prevState: AiQuality) => ({
                            ...prevState,
                            scale: e[0],
                          }));
                        }}
                      />

                      <Card className="bg-inherit border-none">
                        <CardContent className="flex items-center justify-center gap-1 p-1 h-[40px] overflow-hidden">
                          <LuFrame className="text-amber-400" />{" "}
                          <div className="w-[40px] h-[40px] flex items-center justify-center text-gray-500 text-[12px] font-bold">
                            {(
                              props.isAiQuality?.scale * props.isImageSize.w
                            ).toFixed()}
                          </div>
                          x{" "}
                          <div className="w-[40px] h-[40px] flex items-center justify-center text-gray-500 text-[12px] font-bold ">
                            {(
                              props.isAiQuality?.scale * props.isImageSize.h
                            ).toFixed()}
                          </div>
                        </CardContent>
                      </Card>
                      <div className="text-sm flex justify-between items-center w-full">
                        Test-Time Augmentation: {props.isAiQuality?.tta}{" "}
                        <LuAlertCircle />
                      </div>
                      <Slider
                        defaultValue={[1]}
                        min={1}
                        max={8}
                        step={1}
                        value={[props.isAiQuality?.tta]}
                        onValueChange={(e: any) => {
                          props.setAiQuality((prevState: AiQuality) => ({
                            ...prevState,
                            tta: e[0],
                          }));
                        }}
                      />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            className="gradient-animated5"
                            disabled={
                              props.isAiQuality?.noise === -1 &&
                              props.isAiQuality?.scale === 1
                            }
                          >
                            Improving quality by AI
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Improving quality by AI
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-neutral-500 text-sm">
                              Info : Seule l’image d’origine sera retravaillée
                              sans tenir compte des modifications afin
                              d’optimiser le rendu.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="flex justify-center">
                            <Card className="w-[90%] max-w-[300px]">
                              <CardContent className="p-1">
                                <Image
                                  className="w-[100%] rounded-md"
                                  src={props.isNewImage.img}
                                  width={200}
                                  height={200}
                                  alt="logo"
                                  onMouseDown={(e) => e.preventDefault()}
                                  onContextMenu={(e) => e.preventDefault()}
                                />
                              </CardContent>
                            </Card>
                          </div>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="gradient-animated5"
                              onClick={() => {
                                props.handleAiQuality();
                              }}
                            >
                              Start process ...
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <div className="text-neutral-500 text-sm">
                    Info : Seule l’image d’origine sera retravaillée sans tenir
                    compte des modifications afin d’optimiser le rendu.
                  </div>
                </CardContent>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Remove background ?{" "}
                <Badge variant="destructive">Unavailable</Badge>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="grid grid-cols-1 gap-4">
                  <Button className="gradient-animated5" disabled>
                    Remove background
                  </Button>
                </CardContent>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Retouch the image ?{" "}
                <Badge variant="destructive">Unavailable</Badge>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="grid grid-cols-1 gap-4">
                  <div className="flex w-full items-center justify-center">
                    <div className="grid w-full max-w-sm gap-2">
                      <Textarea
                        className="h-[100px]"
                        style={{ resize: "none" }}
                        placeholder="Type your request here."
                        disabled
                      />
                      <Button className="gradient-animated5" disabled>
                        Send your request
                      </Button>
                    </div>
                  </div>
                  <div className="text-neutral-500 text-sm">
                    Attention : L'utilisation de cette fonctionnalité
                    d'intelligence artificielle nécessitera des gems. Veuillez
                    vous assurer que vous avez suffisamment de gems disponibles
                    avant de continuer.
                  </div>
                </CardContent>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </>
  );
};

export default DrawingSidebarMenuAI;
