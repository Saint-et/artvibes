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

interface DrawingSidebarMenuModelsProps {
  isMenuOpen: number;
  setDrawingSetting: React.Dispatch<React.SetStateAction<DrawingSetting>>;
  isDrawingSetting: DrawingSetting;
  isImageSize: NewImageSize;
  setFileDialogOpen: React.Dispatch<React.SetStateAction<FileDialogOpen>>;
  isFileDialogOpen: FileDialogOpen;
  setMenuOpen: React.Dispatch<React.SetStateAction<number>>;
}

const DrawingSidebarMenuParams: React.FC<DrawingSidebarMenuModelsProps> = (
  props
) => {
  const maxZoom = [2, 4, 7, 10];
  const overflow = ["clip", "visible"];
  const overflowDelete = ["yes", "no"];

  if (props.isMenuOpen !== 7) return;

  return (
    <>
      <Card className="border-none rounded-none bg-transparent p-4">
        <CardHeader>
          <CardTitle className="text-1xl flex justify-between p-0">
            Params :<LuSettings2 className="text-1xl" />
          </CardTitle>
          <Separator className="my-4" />
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
          <div>Zoom max :</div>
          <div className="flex justify-between items-center text-sm">
            Zoom max:{" "}
            <Select
              onValueChange={(value) => {
                props.setDrawingSetting((prevState: DrawingSetting) => ({
                  ...prevState,
                  maxZoom: parseInt(value),
                }));
              }}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue
                  placeholder={`${props.isDrawingSetting.maxZoom}x`}
                />
              </SelectTrigger>
              <SelectContent>
                {maxZoom?.map((el) => (
                  <SelectItem key={el} value={`${el}`}>
                    {el}x
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Separator className="my-4" />
          <div>Canvas :</div>
          <div className="flex justify-between items-center text-sm">
            Optimisation:{" "}
            <Select>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder={`performance`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={`performance`}>performance</SelectItem>
                <SelectItem value={`resolution`}>resolution</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-neutral-500 text-sm">
            Info : ( performance ) Les images seront de mauvaise qualité pour
            Allégez la charge du rendu direct.
          </div>
          <div className="text-neutral-500 text-sm">
            Info : Cette option n’aura aucun impacte lors du rendu.
          </div>
          <Separator className="my-4" />
          <div>Overflow Overview :</div>
          <div className="flex justify-between items-center text-sm">
            Overflow expand:{" "}
            <Select
              onValueChange={(value) => {
                props.setDrawingSetting((prevState: DrawingSetting) => ({
                  ...prevState,
                  overflowExpand: value,
                }));
              }}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue
                  placeholder={`${props.isDrawingSetting.overflowExpand}`}
                />
              </SelectTrigger>
              <SelectContent>
                {overflow?.map((el) => (
                  <SelectItem key={el} value={`${el}`}>
                    {el}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between items-center text-sm">
            Overflow canvas:{" "}
            <Select
              onValueChange={(value) => {
                props.setDrawingSetting((prevState: DrawingSetting) => ({
                  ...prevState,
                  overflowCanvas: value,
                }));
              }}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue
                  placeholder={`${props.isDrawingSetting.overflowCanvas}`}
                />
              </SelectTrigger>
              <SelectContent>
                {overflow?.map((el) => (
                  <SelectItem key={el} value={`${el}`}>
                    {el}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-neutral-500 text-sm">
            Info : Cette option n’aura aucun impacte lors du rendu.
          </div>
          <div className="flex justify-between items-center text-sm">
            Delete Overflow:{" "}
            <Select
              onValueChange={(value) => {
                props.setDrawingSetting((prevState: DrawingSetting) => ({
                  ...prevState,
                  deleteOutsideOverlay: value,
                }));
              }}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue
                  placeholder={`${props.isDrawingSetting.deleteOutsideOverlay}`}
                />
              </SelectTrigger>
              <SelectContent>
                {overflowDelete?.map((el) => (
                  <SelectItem key={el} value={`${el}`}>
                    {el}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-neutral-500 text-sm">
            Info : Les éléments déjà à l’extérieur seront conservés.
          </div>
          <Separator className="my-4" />
          <div>System :</div>
          <div className="flex justify-between items-center text-sm">
            Langage:{" "}
            <Select>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder={`english`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={`english`}>English</SelectItem>
                <SelectItem value={`french`}>French</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DrawingSidebarMenuParams;
