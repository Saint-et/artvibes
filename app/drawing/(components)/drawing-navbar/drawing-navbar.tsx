import { DrawingSetting, FileDialogOpen, IsNewImage } from "@/utils/interface";
import { Card, CardContent } from "@/components/ui/card";
import {
  LuArrowUpRightSquare,
  LuDatabase,
  LuGauge,
  LuLanguages,
  LuPackageX,
  LuSearchCode,
} from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface DrawingNavbarProps {
  setNewImage: React.Dispatch<React.SetStateAction<any>>;
  handleButtonClickImport: () => void;
  handleFileChangeImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteImport: (e: number) => void;
  isNewImageImport: IsNewImage[];
  fileInputRef: React.RefObject<HTMLInputElement>;
  isFileDialogOpen: FileDialogOpen;
  setFileDialogOpen: React.Dispatch<React.SetStateAction<FileDialogOpen>>;
  isDrawingSetting: DrawingSetting;
  setMenuOpen: React.Dispatch<React.SetStateAction<any>>;
  isMenuOpen: number;
}

const DrawingNavbar: React.FC<DrawingNavbarProps> = (props) => {
  return (
    <>
      <Card className="bg-inherit border-none">
        <CardContent className="flex items-center gap-1 p-1 h-[40px] overflow-hidden">
          <Separator className="mx-4" orientation="vertical" />
          <HoverCard>
            <HoverCardTrigger className="flex items-center justify-center">
              <LuGauge className="text-green-500" />
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="text-[13px]">Optimization: ...</div>
              <div
                className="flex items-center text-[12px] text-blue-500 hover:underline"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 7 ? 0 : 7);
                }}
              >
                Change the app optimization as needed in params{" "}
                <LuArrowUpRightSquare className="ml-2" />
              </div>
            </HoverCardContent>
          </HoverCard>
          <Separator className="mx-4" orientation="vertical" />
          <HoverCard>
            <HoverCardTrigger className="flex items-center justify-center">
              <LuLanguages />
              <div className="w-[20px] h-[40px] flex items-center justify-center text-gray-500 text-[14px] font-bold">
                En
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="text-[13px]">language: English.</div>
              <div
                className="flex items-center text-[12px] text-blue-500 hover:underline"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 7 ? 0 : 7);
                }}
              >
                Change the language in params{" "}
                <LuArrowUpRightSquare className="ml-2" />
              </div>
            </HoverCardContent>
          </HoverCard>
          <Separator className="mx-4" orientation="vertical" />
          <HoverCard>
            <HoverCardTrigger className="flex items-center justify-center">
              <LuSearchCode />
              <div className="w-[20px] h-[40px] flex items-center justify-center text-gray-500 text-[14px] font-bold">
                {props.isDrawingSetting.maxZoom}x
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="text-[13px]">Maximum: ...</div>
              <div
                className="flex items-center text-[12px] text-blue-500 hover:underline"
                onClick={() => {
                  props.setMenuOpen(props.isMenuOpen === 7 ? 0 : 7);
                }}
              >
                Change the maximum zoom in params{" "}
                <LuArrowUpRightSquare className="ml-2" />
              </div>
            </HoverCardContent>
          </HoverCard>
        </CardContent>
      </Card>
    </>
  );
};

export default DrawingNavbar;
