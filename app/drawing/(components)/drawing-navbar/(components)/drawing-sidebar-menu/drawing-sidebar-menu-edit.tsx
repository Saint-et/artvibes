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
import {
  DrawingSetting,
  FileDialogOpen,
  IsNewImage,
  NewImageSize,
} from "@/utils/interface";
import {
  LuArrowUpRightSquare,
  LuLink2,
  LuPencilRuler,
  LuSettings2,
} from "react-icons/lu";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { DrawingName } from "@/public/assets/data/data";

interface DrawingSidebarMenuModelsProps {
  isMenuOpen: number;
  setDrawingSetting: React.Dispatch<React.SetStateAction<DrawingSetting>>;
  isDrawingSetting: DrawingSetting;
  isImageSize: NewImageSize;
  setFileDialogOpen: React.Dispatch<React.SetStateAction<FileDialogOpen>>;
  isFileDialogOpen: FileDialogOpen;
  setMenuOpen: React.Dispatch<React.SetStateAction<number>>;
  isNewImage: IsNewImage;
  setNewImage: React.Dispatch<React.SetStateAction<IsNewImage>>;
}

const DrawingSidebarMenuEdit: React.FC<DrawingSidebarMenuModelsProps> = (
  props
) => {
  if (props.isMenuOpen !== 1) return;

  return (
    <>
      <Card className="border-none rounded-none bg-transparent p-4">
        <CardHeader>
          <CardTitle className="text-1xl flex justify-between p-0">
            Edit :<LuPencilRuler className="text-1xl" />
          </CardTitle>
          <Separator className="my-4" />
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
          <Button
            variant="outline"
            onClick={() => {
              props.setFileDialogOpen((prevState: FileDialogOpen) => ({
                ...prevState,
                editNewPage: !prevState.editNewPage,
              }));
            }}
          >
            Create new page
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              props.setFileDialogOpen((prevState: FileDialogOpen) => ({
                ...prevState,
                lastImport: !prevState.lastImport,
              }));
            }}
          >
            Files
          </Button>
          <Separator className="my-4" />
          <div>Projet :</div>
          <Input
            type="text"
            onClick={(e: any) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onBlur={() => {
              if (props.isNewImage.fileName === "") {
                props.setNewImage({
                  ...props.isNewImage,
                  fileName: `${DrawingName}-${Date.now()}`,
                });
              }
            }}
            onChange={(e) => {
              props.setNewImage({
                ...props.isNewImage,
                fileName: e.target.value,
              });
            }}
            placeholder={props.isNewImage.fileName}
            value={props.isNewImage.fileName}
          />
          <Separator className="my-4" />
          <div>Resize :</div>
          <div
            className="flex items-center text-[13px] text-blue-500 hover:underline"
            onClick={() => {
              props.setMenuOpen(props.isMenuOpen === 9 ? 0 : 9);
            }}
          >
            Doubled the size by ai <LuArrowUpRightSquare className="ml-2" />
          </div>
          <div className="flex items-center justify-between gap-1">
            <Input
              value={props.isImageSize.w}
              onChange={() => {}}
              className="w-full h-[40px] bg-inherit"
              type="number"
              placeholder="width"
            />
            <LuLink2 className="w-[50px] cursor-pointer" />
            <Input
              value={props.isImageSize.h}
              onChange={() => {}}
              className="w-full h-[40px] bg-inherit"
              type="number"
              placeholder="height"
            />
          </div>
          <Button variant="activeBlue">Resize canvas</Button>
        </CardContent>
      </Card>
    </>
  );
};

export default DrawingSidebarMenuEdit;
