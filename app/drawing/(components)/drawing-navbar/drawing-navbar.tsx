import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  FiCheck,
  FiDownload,
  FiFolder,
  FiHelpCircle,
  FiImage,
  FiPlus,
  FiSave,
  FiSidebar,
  FiTable,
} from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FaRegWindowRestore } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { IsNewImage } from "@/utils/interface";

interface DrawingNavbarProps {
  setNewImage: React.Dispatch<React.SetStateAction<any>>;
  handleButtonClickImport: () => void;
  handleFileChangeImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteImport: (e: number) => void;
  isNewImageImport: IsNewImage[];
  fileInputRef: React.RefObject<HTMLInputElement>;
  isFileDialogOpenImport: boolean;
  setFileDialogOpenImport: React.Dispatch<React.SetStateAction<any>>;
}

const DrawingNavbar: React.FC<DrawingNavbarProps> = (props) => {
  const [isSaveProjetDialogOpen, setSaveProjetDialogOpen] =
    useState<boolean>(false);

  return (
    <>
      <Menubar className="border-none bg-transparent">
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer hover:bg-zinc-900">
            File
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              onClick={() => {
                window.open("/drawing", "_blank", "noopener,noreferrer");
              }}
              className="cursor-pointer"
            >
              New Tab
              <MenubarShortcut>
                <FaRegWindowRestore />
              </MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem className="cursor-pointer">
              Open projet
              <MenubarShortcut>
                <FiFolder />
              </MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem
              onClick={() =>
                props.setFileDialogOpenImport(!props.isFileDialogOpenImport)
              }
              className="cursor-pointer"
            >
              Import image ...
              <MenubarShortcut>
                <FiImage />
              </MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem
              className="cursor-pointer"
              onClick={() => setSaveProjetDialogOpen(true)}
            >
              Save projet
              <MenubarShortcut>
                <FiSave />
              </MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem className="cursor-pointer">
              Download
              <MenubarShortcut>
                <FiDownload />
              </MenubarShortcut>
            </MenubarItem>
            <MenubarItem className="cursor-pointer">
              Download as ...
              <MenubarShortcut>
                <FiFolder />
              </MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer hover:bg-zinc-900">
            Edit
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Page</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem
                  onClick={() => {
                    props.setNewImage("");
                  }}
                >
                  Blank page
                </MenubarItem>
                <MenubarItem>Transparent page</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer hover:bg-zinc-900">
            System
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>Sidebar icons title</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>
                  <FiCheck className="mr-2 h-4 w-4" />
                  Default
                </MenubarItem>
                <MenubarItem>
                  <FiCheck className="mr-2 h-4 w-4" />
                  hidden
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Sidebar size</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>
                  <FiCheck className="mr-2 h-4 w-4" />
                  hidden
                </MenubarItem>
                <MenubarItem>
                  <FiCheck className="mr-2 h-4 w-4" />
                  Default
                </MenubarItem>
                <MenubarItem>
                  <FiCheck className="mr-2 h-4 w-4" />
                  400px
                </MenubarItem>
                <MenubarItem>
                  <FiCheck className="mr-2 h-4 w-4" />
                  500px
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              Appearance
              <MenubarShortcut>
                <FiTable />
              </MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Remove animated background</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>
                  <FiCheck className="mr-2 h-4 w-4" />
                  Activate
                </MenubarItem>
                <MenubarItem>
                  <FiCheck className="mr-2 h-4 w-4" />
                  Disable
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer hover:bg-zinc-900">
            Help
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              About Drawing ...
              <MenubarShortcut>
                <FiHelpCircle />
              </MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Dialog
        open={isSaveProjetDialogOpen}
        onOpenChange={setSaveProjetDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Input
        id="picture"
        type="file"
        multiple={true}
        ref={props.fileInputRef}
        style={{ display: "none" }}
        onChange={props.handleFileChangeImport}
      />
    </>
  );
};

export default DrawingNavbar;
