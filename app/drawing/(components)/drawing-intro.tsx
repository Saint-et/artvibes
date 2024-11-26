import {
  DrawingLoadItems,
  DrawingName,
  DrawingVersion,
  SystemImg,
} from "@/public/assets/data/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  LuArrowDownToLine,
  LuArrowRight,
  LuBook,
  LuBrainCircuit,
  LuFolder,
  LuImage,
  LuInfo,
  LuLayoutDashboard,
  LuPen,
  LuPencilRuler,
  LuSearch,
  LuTrash,
} from "react-icons/lu";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { FileDialogOpen, IsNewImage, LoadedImage } from "@/utils/interface";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/provider/useAppContext";
import Credits from "@/app/(components)/credit/credits";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DrawingDrawingIntroProps {
  isNewImage: IsNewImage;
  setDrawingLoad: React.Dispatch<React.SetStateAction<any>>;
  isDrawingLoad: LoadedImage | undefined;
  setFileDialogOpen: React.Dispatch<React.SetStateAction<FileDialogOpen>>;
  isFileDialogOpen: FileDialogOpen;
  isDraggingDrop: boolean;
  setIsDraggingDrop: React.Dispatch<React.SetStateAction<any>>;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleButtonClickImport: () => void;
  setIsProfilMenuOpen: React.Dispatch<React.SetStateAction<any>>;
}

const DrawingIntro: React.FC<DrawingDrawingIntroProps> = (props) => {
  const router = useRouter();
  const UseAppContext = useAppContext();

  if (!UseAppContext.isDrawingLoad?.home) return null;

  return (
    <>
      <div
        className="h-screen w-screen fixed bg-black/40 backdrop-blur-sm"
        onDragOver={props.handleDragOver}
        style={{
          zIndex: 100000,
        }}
      >
        <div className="flex flex-col items-center justify-center h-screen w-screen">
          <div className="w-full h-full overflow-hidden flex items-center justify-center">
            <div className="h-[100%] w-[90%] max-w-[1200px]">
              <ScrollArea className="h-[100%] w-[100%] border-none">
                <Card className="p-4 w-[100%] h-[100%] bg-inherit border-none open-element-page-melted">
                  <CardHeader className="bg-black/90 rounded mb-4 border">
                    <CardTitle className="flex items-center justify-start">
                      {DrawingName}{" "}
                      <Avatar className="ml-4">
                        <AvatarImage src={SystemImg.src} />
                        <AvatarFallback>KS</AvatarFallback>
                      </Avatar>
                    </CardTitle>
                    <CardDescription>Version: {DrawingVersion}</CardDescription>
                  </CardHeader>

                  <CardContent className="grid grid-cols-1 gap-4 border-none">
                    <Separator className="my-4" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 items-start">
                      {props.isNewImage.img ? (
                        <>
                          <div
                            className="bg-primary rounded-lg shadow-lg p-6 main-bg-animated group cursor-pointer hover:scale-105 transition-transform"
                            style={{
                              backgroundImage: `url(${props.isNewImage.img})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              //backgroundPosition: `${50}% ${50}%`,
                              transition: "300ms",
                            }}
                            onClick={() => {
                              props.setDrawingLoad({
                                ...props.isDrawingLoad,
                                home: false,
                              });
                            }}
                          >
                            <div className="absolute" />
                            <div className="drawing-css-bg text-white rounded-full p-4 inline-block mb-4 group-hover:animate-bounce shadow-md">
                              <LuImage className="w-8 h-8" />
                            </div>
                            <h3
                              className="text-lg font-semibold mb-2 group-hover:underline decoration-solid decoration-2 underline-offset-4 transition-colors duration-300"
                              style={{ textShadow: "#000000 1px 0 10px" }}
                            >
                              <Input
                                type="text"
                                onClick={(e: any) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                }}
                                onBlur={() => {
                                  if (
                                    UseAppContext.isNewImage.fileName === ""
                                  ) {
                                    UseAppContext.setNewImage({
                                      ...UseAppContext.isNewImage,
                                      fileName: `${DrawingName}-${Date.now()}`,
                                    });
                                  }
                                }}
                                onChange={(e) => {
                                  UseAppContext.setNewImage({
                                    ...UseAppContext.isNewImage,
                                    fileName: e.target.value,
                                  });
                                }}
                                placeholder={UseAppContext.isNewImage.fileName}
                                value={UseAppContext.isNewImage.fileName}
                              />
                            </h3>
                            <div className="flex gap-2 opacity-30 group-hover:opacity-100">
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  props.setFileDialogOpen(
                                    (prevState: FileDialogOpen) => ({
                                      ...prevState,
                                      lastImport: !prevState.lastImport,
                                    })
                                  );
                                }}
                                variant="outline"
                              >
                                <LuFolder className="w-5 h-5 mr-2" /> Files ...
                              </Button>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                onDoubleClick={() => {
                                  UseAppContext.handleResetWorksDrawing();
                                }}
                                variant="outline"
                              >
                                <LuTrash className="w-5 h-5 mr-2" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div
                          className="bg-primary overflow-hidden rounded-lg p-6 shadow-lg group cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => {
                            props.setFileDialogOpen(
                              (prevState: FileDialogOpen) => ({
                                ...prevState,
                                editNewPage: !prevState.editNewPage,
                              })
                            );
                          }}
                          style={{
                            backgroundImage: `url(${props.isDrawingLoad?.newProject})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: `${50}% ${50}%`,
                          }}
                        >
                          <div className="drawing-css-bg text-white rounded-full p-4 inline-block mb-4 group-hover:animate-bounce shadow-md">
                            <LuPen className="w-8 h-8" />
                          </div>
                          <h3
                            className="text-lg font-semibold mb-2 group-hover:underline decoration-solid decoration-2 underline-offset-4 transition-colors duration-300"
                            style={{ textShadow: "#000000 1px 0 10px" }}
                          >
                            New project
                          </h3>
                          <div className="flex gap-2 opacity-30 group-hover:opacity-100">
                            <Button variant="outline">
                              <LuPencilRuler className="w-5 h-5 mr-2" />
                              Edit
                            </Button>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                props.setFileDialogOpen(
                                  (prevState: FileDialogOpen) => ({
                                    ...prevState,
                                    lastImport: !prevState.lastImport,
                                  })
                                );
                              }}
                              variant="outline"
                            >
                              <LuFolder className="w-5 h-5 mr-2" /> Files ...
                            </Button>
                          </div>
                        </div>
                      )}
                      <div
                        className="bg-secondary-foreground rounded-lg shadow-lg p-6 group cursor-pointer hover:scale-105 transition-transform duration-300"
                        style={{
                          backgroundImage: `url(${props.isDrawingLoad?.IAImage})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: `${50}% ${50}%`,
                        }}
                      >
                        <div className="drawing-css-bg text-white rounded-full p-4 inline-block mb-4 group-hover:animate-bounce shadow-md">
                          <LuBrainCircuit className="w-8 h-8" />
                        </div>
                        <h3
                          className="text-lg font-semibold mb-2 group-hover:underline decoration-solid decoration-2 underline-offset-4 transition-colors duration-300"
                          style={{ textShadow: "#000000 1px 0 10px" }}
                        >
                          IA in {DrawingName}
                        </h3>
                        <Button
                          variant="outline"
                          className="opacity-30 group-hover:opacity-100"
                        >
                          <LuArrowRight className="w-5 h-5 mr-2" /> Know more
                          ...
                        </Button>
                      </div>
                      <div
                        className="bg-secondary p-6 overflow-hidden rounded-lg shadow-lg group cursor-pointer hover:scale-105 transition-transform duration-300"
                        style={{
                          backgroundImage: `url(${props.isDrawingLoad?.aboutDrawing})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: `${50}% ${50}%`,
                        }}
                      >
                        <div className="drawing-css-bg rounded-full p-4 inline-block mb-4 group-hover:animate-bounce shadow-md">
                          <LuInfo className="w-8 h-8" />
                        </div>
                        <h3
                          className="text-lg font-semibold group-hover:underline decoration-solid decoration-2 underline-offset-4 mb-2 transition-colors duration-300"
                          style={{ textShadow: "#000000 1px 0 10px" }}
                        >
                          About {DrawingName} ...
                        </h3>
                        <Button
                          variant="outline"
                          className="opacity-30 group-hover:opacity-100"
                        >
                          <LuArrowRight className="w-5 h-5 mr-2" /> Know more
                        </Button>
                      </div>

                      {/*<div
                        className="bg-primary overflow-hidden rounded-lg p-6 shadow-lg group cursor-pointer hover:scale-105 transition-transform duration-300"
                        style={{
                          backgroundImage: `url(${SystemCover.src})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: `${50}% ${50}%`,
                        }}
                        onClick={() => {
                          router.push("/");
                        }}
                      >
                        <div className="drawing-css-bg text-white rounded-full p-4 inline-block mb-4 group-hover:animate-bounce shadow-md">
                          <LuGlobe className="w-8 h-8" />
                        </div>
                        <h3
                          className="text-lg font-semibold mb-2 group-hover:underline decoration-solid decoration-2 underline-offset-4 transition-colors duration-300"
                          style={{ textShadow: "#000000 1px 0 10px" }}
                        >
                          {SystemName}
                        </h3>
                      </div>*/}
                    </div>
                    <Separator className="my-4" />
                    <Credits />
                    <Separator className="my-4" />
                    <BentoGrid className="h-max md:auto-rows-max my-10">
                      {DrawingLoadItems.map((item, i) => (
                        <BentoGridItem
                          key={i}
                          //header={item.header}
                          title={item.title}
                          description={item.description}
                          //icon={item.icon}
                          className={"h-max bg-black/90"}
                        />
                      ))}
                    </BentoGrid>
                  </CardContent>
                </Card>
              </ScrollArea>
            </div>
          </div>
        </div>
        {props.isDraggingDrop && !props.isFileDialogOpen.lastImport && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/90"
            style={{ transition: "500ms" }}
          >
            <div
              className="fixed inset-0 z-50 flex items-center justify-center"
              onDragOver={props.handleDragOver}
              onDragLeave={props.handleDragLeave}
              onDrop={props.handleDrop}
              onClick={() => {
                props.setIsDraggingDrop(false);
              }}
              style={{ zIndex: 20000 }}
            />
            <div className="relative w-full max-w-5xl">
              <div className="h-[80vh] w-full rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-[90%] w-[90%] max-h-[400px] max-w-[800px] flex-col items-center justify-center rounded-lg text-white">
                    <LuArrowDownToLine className="h-10 w-10 mb-2" />
                    <p className="text-2xl font-bold">
                      Glissez-déposez vos images ici
                    </p>
                    <div className="flex text-slate-400 gap-1">
                      Ceux-ci seront importés dans la collection, vous les
                      trouverez dans{" "}
                      <span className="flex items-center gap-1 text-sky-500">
                        [ fichier
                        <LuFolder />]
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DrawingIntro;
