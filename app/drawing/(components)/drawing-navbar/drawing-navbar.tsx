import {
  DrawingSetting,
  FileDialogOpen,
  IsNewImage,
  NewImageSize,
} from "@/utils/interface";
import { Card, CardContent } from "@/components/ui/card";
import {
  LuArrowDownToLine,
  LuArrowUpRightSquare,
  LuDatabase,
  LuFilePlus2,
  LuFolder,
  LuGalleryHorizontalEnd,
  LuGauge,
  LuImage,
  LuLanguages,
  LuLayoutDashboard,
  LuLink2,
  LuPackageX,
  LuSave,
  LuSearchCode,
  LuVideo,
} from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Input } from "@/components/ui/input";
import { DrawingName } from "@/public/assets/data/data";
import toast from "react-hot-toast";
import { FaQuestion } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";

interface DrawingNavbarProps {
  setNewImage: React.Dispatch<React.SetStateAction<any>>;
  setDrawingSetting: React.Dispatch<React.SetStateAction<any>>;
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
  isNewImage: IsNewImage;
  captureElement: () => void;
}

const overflow = ["clip", "visible"];
const yesNo = ["no", "yes"];
const language = ["English", "French"];
const optimization = ["resolution", "performance"];

const DrawingNavbar: React.FC<DrawingNavbarProps> = (props) => {
  const toolItems = [
    {
      title: "Picture",
      icon: LuImage,
      click: () => {
        props.setDrawingSetting((prevState: DrawingSetting) => ({
          ...prevState,
          imgRendering: true,
        }));
        props.captureElement();
      },
    },
    {
      title: "Gif",
      icon: LuGalleryHorizontalEnd,
      click: () => {
        toast.error("Unavailable at the moment.");
      },
    },
    {
      title: "Video",
      icon: LuVideo,
      click: () => {
        toast.error("Unavailable at the moment.");
      },
    },
    {
      title: "Create models",
      icon: LuLayoutDashboard,
      click: () => {
        toast.error("Unavailable at the moment.");
      },
    },
  ];
  return (
    <>
      <Menubar className="border-none ml-2">
        <MenubarMenu>
          <MenubarTrigger className="gradient-animated1">
            Finish
            <LuArrowDownToLine className="ml-2" />
          </MenubarTrigger>
          <MenubarContent style={{ zIndex: 3100 }}>
            {toolItems?.map((el, index) => (
              <MenubarItem key={index} onClick={el.click}>
                {el.title}
                <MenubarShortcut>
                  <el.icon />
                </MenubarShortcut>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent style={{ zIndex: 3100 }}>
            <div className="mb-1 text-center text-gray-500 text-[12px] font-bold">
              Files
            </div>
            <MenubarItem
              onClick={() => {
                props.setFileDialogOpen((prevState: FileDialogOpen) => ({
                  ...prevState,
                  editNewPage: !prevState.editNewPage,
                }));
              }}
            >
              Create new page
              <MenubarShortcut>
                <LuFilePlus2 />
              </MenubarShortcut>
            </MenubarItem>
            <MenubarItem
              onClick={() => {
                props.setFileDialogOpen((prevState: FileDialogOpen) => ({
                  ...prevState,
                  lastImport: !prevState.lastImport,
                }));
              }}
            >
              Files
              <MenubarShortcut>
                <LuFolder />
              </MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled={props.isDrawingSetting.storage === "no"}>
              Save projet{" "}
              {props.isDrawingSetting.storage === "no" && (
                <Badge className="ml-2" variant={"destructive"}>
                  storage
                </Badge>
              )}
              <MenubarShortcut>
                <LuSave />
              </MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator className="my-1" />
            <div className="mb-1 text-center text-gray-500 text-[12px] font-bold">
              Project
            </div>
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
            <MenubarSeparator className="my-1" />
            <MenubarItem
              className="flex items-center text-[13px] text-blue-500 hover:underline"
              onClick={() => {
                props.setMenuOpen(props.isMenuOpen === 9 ? 0 : 9);
              }}
            >
              Doubled the size by ai <LuArrowUpRightSquare className="ml-2" />
            </MenubarItem>
            <MenubarItem
              className="flex items-center text-[13px] text-blue-500 hover:underline"
              onClick={() => {
                props.setMenuOpen(props.isMenuOpen === 10 ? 0 : 10);
              }}
            >
              Change background ( Expand ){" "}
              <LuArrowUpRightSquare className="ml-2" />
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Option</MenubarTrigger>
          <MenubarContent style={{ zIndex: 3100 }}>
            <div className="mb-1 text-center text-gray-500 text-[12px] font-bold">
              Canvas
            </div>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Zoom max</MenubarSubTrigger>
              <MenubarSubContent>
                {Array.from({ length: 5 }, (_, index) => {
                  const value = (index + 1) * 2; // Commence à 4 et incrémente par 2
                  return (
                    <MenubarCheckboxItem
                      key={value}
                      onClick={() => {
                        props.setDrawingSetting(
                          (prevState: DrawingSetting) => ({
                            ...prevState,
                            maxZoom: value,
                          })
                        );
                      }}
                      checked={value === props.isDrawingSetting.maxZoom}
                    >
                      {value}x
                    </MenubarCheckboxItem>
                  );
                })}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Overflow expand</MenubarSubTrigger>
              <MenubarSubContent>
                {overflow?.map((el) => (
                  <MenubarCheckboxItem
                    checked={el === props.isDrawingSetting.overflowExpand}
                    key={el}
                    onClick={() => {
                      props.setDrawingSetting((prevState: DrawingSetting) => ({
                        ...prevState,
                        overflowExpand: el,
                      }));
                    }}
                  >
                    {el}
                  </MenubarCheckboxItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Overflow canvas</MenubarSubTrigger>
              <MenubarSubContent>
                {overflow?.map((el) => (
                  <MenubarCheckboxItem
                    checked={el === props.isDrawingSetting.overflowCanvas}
                    key={el}
                    onClick={() => {
                      props.setDrawingSetting((prevState: DrawingSetting) => ({
                        ...prevState,
                        overflowCanvas: el,
                      }));
                    }}
                  >
                    {el}
                  </MenubarCheckboxItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Delete Overflow</MenubarSubTrigger>
              <MenubarSubContent>
                {yesNo?.map((el) => (
                  <MenubarCheckboxItem
                    checked={el === props.isDrawingSetting.deleteOutsideOverlay}
                    key={el}
                    onClick={() => {
                      props.setDrawingSetting((prevState: DrawingSetting) => ({
                        ...prevState,
                        deleteOutsideOverlay: el,
                      }));
                    }}
                  >
                    {el}
                  </MenubarCheckboxItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <div className="mb-1 text-center text-gray-500 text-[12px] font-bold">
              System
            </div>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Langage</MenubarSubTrigger>
              <MenubarSubContent>
                {language?.map((el) => (
                  <MenubarCheckboxItem
                    checked={el === props.isDrawingSetting.language}
                    key={el}
                    onClick={() => {
                      props.setDrawingSetting((prevState: DrawingSetting) => ({
                        ...prevState,
                        language: el,
                      }));
                    }}
                  >
                    {el}
                  </MenubarCheckboxItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>background</MenubarSubTrigger>
              <MenubarSubContent>
                {yesNo?.map((el) => (
                  <MenubarCheckboxItem
                    checked={el === props.isDrawingSetting.background}
                    key={el}
                    onClick={() => {
                      props.setDrawingSetting((prevState: DrawingSetting) => ({
                        ...prevState,
                        background: el,
                      }));
                    }}
                  >
                    {el}
                  </MenubarCheckboxItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Optimization</MenubarSubTrigger>
              <MenubarSubContent>
                {optimization?.map((el) => (
                  <MenubarCheckboxItem
                    checked={el === props.isDrawingSetting.optimization}
                    key={el}
                    onClick={() => {
                      props.setDrawingSetting((prevState: DrawingSetting) => ({
                        ...prevState,
                        optimization: el,
                      }));
                    }}
                  >
                    {el}
                  </MenubarCheckboxItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Storage</MenubarSubTrigger>
              <MenubarSubContent>
                {yesNo?.map((el) => (
                  <MenubarCheckboxItem
                    checked={el === props.isDrawingSetting.storage}
                    key={el}
                    onClick={() => {
                      props.setDrawingSetting((prevState: DrawingSetting) => ({
                        ...prevState,
                        storage: el,
                      }));
                    }}
                  >
                    {el}
                  </MenubarCheckboxItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem
              onClick={() => {
                props.setFileDialogOpen((prevState: FileDialogOpen) => ({
                  ...prevState,
                  help: true,
                }));
              }}
            >
              Help
              <MenubarShortcut>
                <FaQuestion />
              </MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};

export default DrawingNavbar;
