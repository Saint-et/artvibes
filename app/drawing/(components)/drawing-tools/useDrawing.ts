
import { useCallback, useEffect, useRef, useState } from "react";
import UseAreaDrawCreative from "./useArea-drawing";
import toast from "react-hot-toast";
import { AiQuality, DrawFiligrane, DrawForm, DrawingSetting, DrawSvg, DrawSvgFull, DrawText, FileDialogOpen, IsNewImage, IsNewOverlay, IsNewOverlaySave, LayerElement, MenuLayer, RenderingOption, ResizeInterface } from "@/utils/interface";
import { ArrayExpand, DrawingName, SystemLogo } from "@/public/assets/data/data";
import useSelectDrawing from "./usedrawing-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useDrawingRendering from "./drawing-rendering/drawing-rendering";
//import useUtilsDrawing from "../utils/utilsDrawing";
import { useAppContext } from "@/app/provider/useAppContext";
import { DrawingLoadDefault, NewImgDefault } from "@/public/assets/data/defaultValue-drawing";
import GrabScrollComponent from "../drawing-navbar/(components)/grab-to-scroll";
import useWaifu2xTfjs from "../utils/waifu2x-tfjs/waifu2x-tfjs";
import { EditorState, convertFromRaw, RawDraftContentState, Editor } from "draft-js";
import { CustomStyleMap } from "@/utils/type";
import { extractBoxShadowColor, generateRandomId, loadImageToCanvas, resizeImageBase64, rgbToHex } from "@/utils/utils";

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

export default function useDrawing() {

    //const searchParams = useSearchParams();
    //const imgUrl = searchParams.get("img");



    const UseAppContext = useAppContext()
    const {
        startWaifu,
        prepareImageWaifu,
        processWaifu,
        setWaifuProcess,
        isWaifuProcess, } = useWaifu2xTfjs()
    const {
        scrollGrabScrollRef,
        handleMouseDownGrabScroll,
        handleMouseUpGrabScroll,
        handleMouseMoveGrabScroll,
        isDraggingGrabScroll
    } = GrabScrollComponent();

    //const { extractBoxShadowColor, rgbToHex, resizeImageBase64, hasTransparency } = useUtilsDrawing();

    const {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        startX,
        startY,
        endX,
        endY,
        selecting,
        isSelectArea,
        setSelectArea,
        setStartX,
        setStartY,
        setEndX,
        setEndY,
        setSelecting
    } = useSelectDrawing();



    const {
        canvasRef,
        canvasDrawRef,
        overlayAreaRef,
        textCanvasContainerRef,
        handleMouseDownResizing,
        handleMouseUpResizing,
        handleMouseMoveResizing,

        leftOffset,
        width,
        height,
        topOffset,
        zoom,
        setZoom,

        setWidth,
        setHeight,
        setLeftOffset,
        setTopOffset,

        setDrawArea,
        drawArea,
        handleSettDrawArea,
        startPosition,
        isResizing,
        isImageSize, setImageSize,
        imageRef,

        startDrawingNowCanvas,
        drawNowCanvas,
        stopDrawingNowCanvas,
        setIsDrawingNowCanvas,
        BreakDrawingNowCanvas,
        isDrawingNowCanvas,
        drawDrawing, setDrawDrawing,
        RestartDrawingNowCanvas,
    } = UseAreaDrawCreative()


    const UseDrawingRendering = useDrawingRendering()
    //const UseUtilsDrawing = useUtilsDrawing()

    const setDrawingLoad = UseAppContext.setDrawingLoad;
    const isDrawingLoad = UseAppContext.isDrawingLoad || DrawingLoadDefault;


    const [isDrawingSetting, setDrawingSetting] = useState<DrawingSetting>({
        separatorBorder: 'none',
        transparence: false,
        maxZoom: 4,
        maxZoomAuto: true,
        overflowCanvas: 'clip',
        overflowExpand: 'clip',
        deleteOutsideOverlay: 'no',
        storage: 'no',
        background: 'default',
        backgroundImg: '',
        backgroundAnimated: true,
        backgroundHeight: 50,
        language: 'French',
        optimization: 'resolution',
        theme: 'light',
        paint: {
            hideElCanvas: false,
            showDrawSelected: false,
            opacity: false,
        },
        imgRendering: false,
    });

    const [isFileDialogOpenNewImgAlert, setFileDialogOpenNewImgAlert] = useState<boolean>(false);
    const [isFileDialogOpenNewImgAlertElement, setFileDialogOpenNewImgAlertElement] = useState<IsNewImage>(NewImgDefault);

    const captureRef = useRef<HTMLDivElement | null>(null);
    const canvasContainerRef = useRef<HTMLDivElement | null>(null);
    const formDrawRef = useRef<HTMLDivElement | null>(null);
    const drawingSidebarToolsRef = useRef<HTMLDivElement | null>(null);
    const drawingSidebarToolsSettingRef = useRef<HTMLDivElement | null>(null);
    const overlayImgRef = useRef<HTMLDivElement | null>(null);
    const overlayImgBgRef = useRef<HTMLDivElement | null>(null);
    const expandDivRef = useRef<HTMLDivElement | null>(null);
    const blanketRef = useRef<HTMLDivElement | null>(null);
    const textSizeRef = useRef<HTMLInputElement | null>(null);

    const insetImgRef = useRef<HTMLDivElement | null>(null);
    const insetExpandRef = useRef<HTMLDivElement | null>(null);
    const colorOutsideImgRef = useRef<HTMLDivElement | null>(null);

    const strokePathRef = useRef<SVGPathElement | null>(null);
    const strokeRectRef = useRef<SVGRectElement | null>(null);
    const strokeRectBgRef = useRef<SVGRectElement | null>(null);

    const drawingSidebarToolsButtonRef = useRef<HTMLDivElement | null>(null);
    const canvasCropRef = useRef<HTMLCanvasElement | null>(null);
    const overlayContextRef = useRef<HTMLDivElement | null>(null);
    const overlayToolsRef = useRef<HTMLDivElement | null>(null);
    const overlayFiltersRef = useRef<HTMLDivElement | null>(null);
    const overlayContextPropoverRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const fileInputRef2 = useRef<HTMLInputElement | null>(null);
    const textCanvasRef = useRef<HTMLDivElement | null>(null);
    const mainSidebarRef = useRef<HTMLDivElement | null>(null);
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const dialogLastImportRef = useRef<HTMLDivElement | null>(null);
    const editorRef = useRef<Editor>(null);
    const [cropVisible, setCropVisible] = useState<boolean>(false);
    const [isFileDialogOpen, setFileDialogOpen] = useState<FileDialogOpen>(
        {
            resizeImage: false,
            preview: false,
            lastImport: false,
            editNewPage: false,
            help: false,
            backgroundAdvanced: false,
        }
    );
    const [isFreeAreaCrop, setFreeAreaCrop] = useState<boolean>(true);
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
    const [resultImageUrl, setResultImageUrl] = useState<string>("");
    const [isImgBorderOn, setImgBorderOn] = useState<boolean>(false);
    const [isProfilMenuOpen, setIsProfilMenuOpen] = useState<boolean>(false);
    const [isRenderingOpen, setIsRenderingOpen] = useState<boolean>(false);

    const [isMenuOpen, setMenuOpen] = useState<number | 0>(0);
    const [isWindowOpen, setWindowOpen] = useState<number | 0>(0);
    const [isMenuLayer, setMenuLayer] = useState<MenuLayer>({
        menu: true,
        auto: true,
        uniqueOverlaySelect: false,
        uniqueOverlaySelectPreview: -1,
        on: 0,
        blockOverlay: []
    });

    const isLayers = UseAppContext.isLayers;
    const setLayers = UseAppContext.setLayers;
    const [isRenderingOption, setIsRenderingOption] = useState<RenderingOption>({
        reziseImg: true,
        sharpenImg: false,
        smoothImg: true,
        format: 'png',
        width: 0,
        height: 0,
    });

    const drawingExpandImg = UseAppContext.drawingExpandImg;
    const setDrawingExpandImg = UseAppContext.setDrawingExpandImg;
    const isBlanket = UseAppContext.isBlanket;
    const setBlanket = UseAppContext.setBlanket;
    const isNewImageImport = UseAppContext.isNewImageImport;
    const setNewImageImport = UseAppContext.setNewImageImport;
    const isNewImage = UseAppContext.isNewImage;
    const setNewImage = UseAppContext.setNewImage;

    const [outsideClickActive, setOutsideClickActive] = useState<boolean>(true);
    const [isCanvasImage, setCanvasImage] = useState<string | ''>('');
    const [isImgOverlaySave, setImgOverlaySave] = useState<IsNewOverlaySave[]>([]);
    const [isImgOverlay, setImgOverlay] = useState<IsNewOverlay>({
        id: 0,
        form: "",
        img: "",
        miniature: "",
        cropY: 50,
        opacity: 1,
        shadow: 0,
        borderColor: "#000000",
        filter: {
            brightness: 100,
            contrast: 100,
            saturation: 100,
            hue: 0,
            blur: 0,
            sepia: 0,
            grayscale: 0,
            invert: 0
        },
    });
    const [textCanvasVisible, setTextCanvasVisible] = useState<boolean>(false);
    const [isFormCanvasVisible, setFormCanvasVisible] = useState<string>('');
    const [elementIndex, setElementIndex] = useState<number>(0);
    const [drawSvg, setDrawSvg] = useState<DrawSvg>({
        id: 0,
        img: '',
        svg: '',
        thickness: 0,
        borderColor: "#000000",
        opacity: 1,
        crop: {
            x: 0,
            y: 0,
            size: 24,
        },
        filter: {
            brightness: 100,
            contrast: 100,
            saturation: 100,
            hue: 0,
            blur: 0,
            sepia: 0,
            grayscale: 0,
            invert: 0,
        }
    });

    const [drawSvgFull, setDrawSvgFull] = useState<DrawSvgFull>({
        id: 0,
        svg: '',
        thickness: 0,
        borderColor: "#000000",
        color: "#000000",
        opacity: 1,
    });

    const [drawFiligrane, setDrawFiligrane] = useState<DrawFiligrane>({
        fontSize: 40,
        color: '#FFFFFF',
        text: '',
        img: '',
        opacity: 0.5,
    });

    const [drawForm, setDrawForm] = useState<DrawForm>({
        id: 0,
        color: "#000000",
        thickness: 10,
        opacity: 1,
    });
    const [drawText, setDrawText] = useState<DrawText>({
        id: 0,
        value: "",
        colorDraftjs: '#000000',
        fontSize: 24,
        textShadow: '0px 0px 0px #000000',
        textDecoration: "none",
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
        opacity: 1,
    });
    const [isAiQuality, setAiQuality] = useState<AiQuality>({
        style: "art",
        noise: -1,
        scale: 1,
        tta: 1,
    });

    const [isSystemResize, setSystemResize] = useState<ResizeInterface>({
        link: false,
        w: isImageSize.w,
        h: isImageSize.h,
    });

    const rawContent: RawDraftContentState = {
        blocks: [
            {
                key: "1",
                text: DrawingName,
                type: "unstyled",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
            },
        ],
        entityMap: {},
    };

    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(convertFromRaw(rawContent))
    );

    const [customStyleMap, setCustomStyleMap] = useState<CustomStyleMap>({});
    const [customStyleShadowMap, setCustomStyleShadowMap] = useState<CustomStyleMap>({});


    const handleChange = async (newValue: number[]) => {
        // Update the zoom level
        setZoom(newValue);
    };


    const systemSetting = UseAppContext.systemSetting;
    const setSystemSetting = UseAppContext.setSystemSetting;
    const systemShadow = UseAppContext.systemShadow;
    const setSystemShadow = UseAppContext.setSystemShadow;

    const formCode = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })


    const sizePositionOverlerlay =
        isImageSize.w < isImageSize.h
            ? isImageSize.w
            : isImageSize.h;


    const defaultSize = (sizePositionOverlerlay / 2) + (drawingExpandImg.expand / 2);
    const defaultPositionW = (isImageSize.w / 2) - (sizePositionOverlerlay / 4 + drawingExpandImg.expand / 4);
    const defaultPositionH = (isImageSize.h / 2) - (sizePositionOverlerlay / 4 + drawingExpandImg.expand / 4);


    const handleButtonClickImport = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
        if (fileInputRef2.current) {
            fileInputRef2.current.click();
        }
    };

    const handleFileChangeImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files || [];
        if (files) {
            const updatedImages = await Array.from(files).map(file => {

                const reader = new FileReader();
                reader.readAsDataURL(file);

                return new Promise((resolve, reject) => {
                    reader.onloadend = () => {
                        resizeImageBase64(reader.result as string, 300, function (resizedBlob: any) {
                            resolve({
                                id: generateRandomId(),
                                fileName: `${DrawingName}-${Date.now()}`,
                                img: reader.result as string,
                                miniature: resizedBlob || ''
                            });

                        });
                    };
                    reader.onerror = reject;  // Handle errors
                });
            });

            // Resolve all promises and update the state
            await Promise.all(updatedImages)
                .then(images => {
                    const typedImages: IsNewImage[] = images as IsNewImage[];  // Assurez-vous que images est de type IsNewImage[]

                    setNewImageImport(prevImages => [...typedImages, ...prevImages]);
                    if (isFileDialogOpen.lastImport) return;
                    if (!isNewImage.img) {
                        setNewImage(typedImages[0]);
                        setDrawingExpandImg({
                            ...drawingExpandImg,
                            bgExpand: typedImages[0].img,
                            miniature: typedImages[0].miniature
                        })
                    }
                })
                .catch(error => {
                    console.error('Error reading file:', error);
                    // Handle error state if necessary
                });
        }
    };


    const handleLastAdd = (blobUrl: IsNewImage) => {
        setFileDialogOpenNewImgAlertElement(blobUrl)
        setFileDialogOpenNewImgAlert(true)
        setCanvasImage("");
        setCropVisible(false);
    };
    const handleNewPictureAdd = () => {
        //setFileDialogOpen((prevState: FileDialogOpen) => ({
        //    ...prevState,
        //    lastImport: false
        //}));
        setNewImage(isFileDialogOpenNewImgAlertElement);
        setDrawingExpandImg((prevState) => ({
            ...prevState,
            bgExpand: isFileDialogOpenNewImgAlertElement.img,
            miniature: isFileDialogOpenNewImgAlertElement.miniature
        }))
        setFileDialogOpenNewImgAlertElement(NewImgDefault)
    };


    const handleDeleteImport = (id: number) => {
        const filteredImages = isNewImageImport.filter(el => el.id !== id);
        setNewImageImport(filteredImages)
    }

    const [isDraggingDrop, setIsDraggingDrop] = useState(false);

    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggingDrop(true);
    }, []);

    const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event?.stopPropagation();
        setIsDraggingDrop(false);
    }, []);

    const DropGetPicture = useCallback(async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggingDrop(false);

        return await new Promise(async (resolve, reject) => {

            const files = event.dataTransfer.files || [];

            if (files) {


                const addNewBackgroundSystem = () => {
                    const updatedImages = Array.from(files).map(file => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);

                        return new Promise((resolve, reject) => {
                            reader.onloadend = () => {
                                resolve({
                                    img: reader.result as string,  // Cast reader.result to string
                                });
                            };
                            reader.onerror = reject;  // Handle errors
                        });
                    });

                    Promise.all(updatedImages)
                        .then(images => {
                            const typedImages: IsNewOverlay[] = images as IsNewOverlay[];

                            setDrawingSetting((prevState: DrawingSetting) => ({
                                ...prevState,
                                backgroundImg: typedImages[0].img,
                            }))
                            return resolve(true)
                        })
                        .catch(() => {
                            return reject(new Error("An error occurred"));
                            // Handle error state if necessary
                        });
                }


                if (isFileDialogOpen.backgroundAdvanced && !isDrawingLoad.home && !isFileDialogOpen.lastImport) {
                    return addNewBackgroundSystem()
                }


                const addNewPicture = () => {
                    const updatedImages = Array.from(files).map(file => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);

                        return new Promise((resolve, reject) => {
                            reader.onloadend = () => {
                                resizeImageBase64(reader.result as string, 300, function (resizedBlob: any) {
                                    resolve({
                                        img: reader.result as string,  // Cast reader.result to string
                                        miniature: resizedBlob,
                                    });
                                })
                            };
                            reader.onerror = reject;  // Handle errors
                        });
                    });

                    // Resolve all promises and update the state
                    Promise.all(updatedImages)
                        .then(images => {
                            if (isFormCanvasVisible !== "" || isMenuOpen === 5 || drawSvgFull.svg !== "") return reject()
                            setIsDrawingNowCanvas((prevState) => ({ ...prevState, active: false, isMouseDown: false, id: null }))
                            const typedImages: IsNewOverlay[] = images as IsNewOverlay[];

                            if (drawSvg.svg !== "") {
                                setDrawSvg({
                                    ...drawSvg,
                                    img: typedImages[0].img
                                })
                                return resolve(true)
                            }
                            if (!isImgOverlay.img) {
                                typedImages?.map((e, index) => {
                                    const newElement = {
                                        layerType: 'overlay',
                                        id: Date.now() + index,
                                        img: e.img,
                                        miniature: e.miniature,
                                        overflowContainer: 'expand',
                                        form: "square",
                                        cropY: isImgOverlay.cropY,
                                        opacity: isImgOverlay.opacity,
                                        shadow: isImgOverlay.shadow,
                                        borderColor: extractBoxShadowColor(
                                            overlayImgRef?.current ? overlayImgRef.current.style.boxShadow : '#000000'
                                        ),
                                        h: defaultSize,
                                        w: defaultSize,
                                        x: defaultPositionW,
                                        y: defaultPositionH,
                                        rotate: 0,
                                        filter: {
                                            brightness: isImgOverlay.filter.brightness,
                                            contrast: isImgOverlay.filter.contrast,
                                            saturation: isImgOverlay.filter.saturation,
                                            hue: isImgOverlay.filter.hue,
                                            blur: isImgOverlay.filter.blur,
                                            sepia: isImgOverlay.filter.sepia,
                                            grayscale: isImgOverlay.filter.grayscale,
                                            invert: isImgOverlay.filter.invert,
                                        },
                                    };
                                    setLayers((prevLayers: any) => {
                                        const updatedLayers = prevLayers.map((el: any) => {
                                            if (el.id === isImgOverlay.id) {
                                                // Si l'élément existe, mettre à jour l'image
                                                return { ...newElement, id: el.id };
                                            }
                                            return el;
                                        });

                                        // Vérifier si l'élément avec l'ID donné existe, sinon l'ajouter
                                        const elementExists = prevLayers.some((el: any) => el.id === isImgOverlay.id);
                                        if (!elementExists) {
                                            updatedLayers.push(newElement);
                                        }

                                        return updatedLayers;
                                    });
                                })

                                //setImgOverlay({
                                //    ...isImgOverlay,
                                //    img: typedImages[0].img,
                                //    form: "square",
                                //});
                                //setDrawArea({
                                //    width: size / 2,
                                //    height: size / 2,
                                //    leftOffset: 0,
                                //    topOffset: 0,
                                //    positionX:
                                //        isImageSize.w / 2 - (size / 4),
                                //    positionY:
                                //        isImageSize.h / 2 - (size / 4),
                                //    rotate: 0,
                                //});
                            } else {
                                setImgOverlay({
                                    ...isImgOverlay,
                                    img: typedImages[0].img,
                                    miniature: typedImages[0].miniature,
                                });
                            }
                            return resolve(true)
                        })
                        .catch(() => {
                            return reject(new Error("An error occurred"));
                            // Handle error state if necessary
                        });
                }

                if (isNewImage.img && !isDrawingLoad.home && !isFileDialogOpen.lastImport) {
                    return addNewPicture()
                }

                const updatedImages = Array.from(files).map(file => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);

                    return new Promise((resolve, reject) => {
                        reader.onloadend = () => {
                            resizeImageBase64(reader.result as string, 300, function (resizedBlob: any) {
                                resolve({
                                    id: generateRandomId(),
                                    fileName: `${DrawingName}-${Date.now()}`,
                                    img: reader.result as string,
                                    miniature: resizedBlob || ''
                                });

                            });
                        };
                        reader.onerror = reject;  // Handle errors
                    });
                });

                // Resolve all promises and update the state
                Promise.all(updatedImages)
                    .then(images => {
                        const typedImages: IsNewImage[] = images as IsNewImage[];  // Assurez-vous que images est de type IsNewImage[]

                        setNewImageImport(prevImages => [...typedImages, ...prevImages]);

                        if (!isNewImage.img || !isDrawingLoad?.home) {
                            if (isFileDialogOpen.lastImport) return resolve(true);
                            setNewImage(typedImages[0]);
                            setDrawingExpandImg({
                                ...drawingExpandImg,
                                bgExpand: typedImages[0].img,
                                miniature: typedImages[0].miniature
                            })
                        }
                        if (isNewImage.img && typedImages.length === 1) {
                            setFileDialogOpenNewImgAlertElement(typedImages[0]);
                            if (isMenuOpen === 8) return;
                            setFileDialogOpenNewImgAlert(true);
                        }
                        if (typedImages.length > 1) {
                            if (isMenuOpen === 8) return;
                            setFileDialogOpen((prevState: FileDialogOpen) => ({
                                ...prevState,
                                lastImport: true
                            }));
                        }
                        return resolve(true)
                    })
                    .catch(() => {
                        return reject(new Error("An error occurred"));
                        // Handle error state if necessary
                    });

            }
        })
    }, [isNewImage, isMenuOpen, isImgOverlay, isImageSize, isDrawingLoad, isFormCanvasVisible, drawSvg, isFileDialogOpen, drawSvgFull]);

    function handleDrop(event: React.DragEvent<HTMLDivElement>) {
        // Utiliser toast.promise pour gérer la promesse
        toast.promise(DropGetPicture(event), {
            loading: "Processing in progress...",
            success: (result) => {
                if (result) {
                    return "Successfully completed.";
                } else {
                    throw new Error("An error occurred");
                }
            },
            error: "An error occurred",
        });
    }


    const handleCollectionImg = (id: number) => {
        const filtered = isNewImageImport.filter((el) => el.id === id);
        if (filtered.length === 1) {
            setNewImage(filtered[0]);
        } else {
            toast("⚠️ No pictures were found. ⚠️", {
                duration: 3000,
                style: {
                    borderColor: "#ffcc00",
                    color: "#ffcc00",
                },
            });
        }
    };

    const handleDeleteCropColection = (id: number) => {
        toast(`The collection has been deleted: id-${isNewImage.id}.`, {
            duration: 3000,
        });
    };

    const handleStartCrop = (el?: boolean) => {
        if (!el) {
            setDrawArea({
                width: 300,
                height: 200,
                leftOffset: 0,
                topOffset: 0,
                positionX: isImageSize.w / 2 - 152,
                positionY: isImageSize.h / 2 - 102,
                rotate: 0,
            });
        }
    };




    const handleResetImgOverlay = () => {
        setImgOverlay({
            id: 0,
            form: "",
            img: "",
            miniature: "",
            cropY: 50,
            opacity: 1,
            shadow: 0,
            borderColor: "#000000",
            filter: {
                brightness: 100,
                contrast: 100,
                saturation: 100,
                hue: 0,
                blur: 0,
                sepia: 0,
                grayscale: 0,
                invert: 0,
            },
        });
    }
    const handleResetForm = () => {
        setDrawForm({
            id: 0,
            color: "#000000",
            thickness: 10,
            opacity: 1,
        });
        setFormCanvasVisible("")
    }
    const handleResetText = () => {
        if (editorRef.current) {
            editorRef.current?.blur();
        }
        setDrawText((prev: DrawText) => ({
            ...prev,
            id: 0,
            value: "",
            //colorDraftjs: '#000000',
            //fontSize: 24,
            //textShadow: '0px 0px 0px #000000',
            //textDecoration: "none",
            //fontStyle: "normal",
            //fontWeight: "normal",
            textAlign: "center",
            opacity: 1.0,
        }));
        setTextCanvasVisible(false)
        setEditorState(EditorState.createWithContent(convertFromRaw(rawContent)))
    }
    const handleResetSvg = () => {
        setDrawSvg({
            id: 0,
            img: '',
            svg: '',
            thickness: 0,
            borderColor: "#000000",
            opacity: 1.0,
            crop: {
                x: 0,
                y: 0,
                size: 24,
            },
            filter: {
                brightness: 100,
                contrast: 100,
                saturation: 100,
                hue: 0,
                blur: 0,
                sepia: 0,
                grayscale: 0,
                invert: 0,
            }
        });
    }
    const handleResetSvgFull = () => {
        setDrawSvgFull({
            id: 0,
            svg: '',
            thickness: 0,
            borderColor: "#000000",
            color: "#000000",
            opacity: 1.0,
        });
    }


    const handleSaveImgOverlay = async (newImg?: string, form?: string, shadow?: number, miniature?: string) => {
        const newElement = {
            layerType: 'overlay',
            id: Date.now(),
            form: form ? form : isImgOverlay.form,
            img: newImg || isImgOverlay.img,
            miniature: miniature || newImg || isImgOverlay.miniature,
            overflowContainer: "expand",
            cropY: isImgOverlay.cropY,
            opacity: isImgOverlay.opacity,
            shadow: shadow ? shadow : isImgOverlay.shadow,
            borderColor: shadow ? '#000000' : extractBoxShadowColor(
                overlayImgRef?.current ? overlayImgRef.current.style.boxShadow : '#000000'
            ),
            h: newImg ? defaultSize : drawArea.height,
            w: newImg ? defaultSize : drawArea.width,
            x: newImg ? defaultPositionW : drawArea.positionX + drawArea.leftOffset,
            y: newImg ? defaultPositionH : drawArea.positionY + drawArea.topOffset,
            rotate: newImg ? 0 : drawArea.rotate,
            filter: {
                brightness: isImgOverlay.filter.brightness,
                contrast: isImgOverlay.filter.contrast,
                saturation: isImgOverlay.filter.saturation,
                hue: isImgOverlay.filter.hue,
                blur: isImgOverlay.filter.blur,
                sepia: isImgOverlay.filter.sepia,
                grayscale: isImgOverlay.filter.grayscale,
                invert: isImgOverlay.filter.invert,
            },
        };
        setLayers((prevLayers: any) => {
            const updatedLayers = prevLayers.map((el: any) => {
                if (el.id === isImgOverlay.id) {
                    // Si l'élément existe, mettre à jour l'image
                    return { ...newElement, overflowContainer: el.overflowContainer, id: el.id };
                }
                return el;
            });

            // Vérifier si l'élément avec l'ID donné existe, sinon l'ajouter
            const elementExists = prevLayers.some((el: any) => el.id === isImgOverlay.id);
            if (!elementExists) {
                updatedLayers.push(newElement);
            }

            return updatedLayers;
        });
    };



    const handleSaveForm = (form?: string) => {
        const boxShadowColor = formDrawRef?.current?.style.boxShadow
            ? extractBoxShadowColor(formDrawRef.current.style.boxShadow)
            : rgbToHex(formDrawRef?.current?.style.background || "rgb(0,0,0)");

        const newElement = {
            layerType: 'form',
            id: Date.now(),
            formType: form ? form : isFormCanvasVisible,
            overflowContainer: "expand",
            color: boxShadowColor,
            thickness: drawForm.thickness,
            opacity: drawForm.opacity,
            h: form ? defaultSize : drawArea.height,
            w: form ? defaultSize : drawArea.width,
            x: form ? defaultPositionW : drawArea.positionX + drawArea.leftOffset,
            y: form ? defaultPositionH : drawArea.positionY + drawArea.topOffset,
            rotate: form ? 0 : drawArea.rotate,
        }

        setLayers((prevLayers: any) => {
            const updatedLayers = prevLayers.map((el: any) => {
                if (el.id === drawForm.id) {
                    // Si l'élément existe, mettre à jour l'image
                    return { ...newElement, overflowContainer: el.overflowContainer, id: el.id };
                }
                return el;
            });

            // Vérifier si l'élément avec l'ID donné existe, sinon l'ajouter
            const elementExists = prevLayers.some((el: any) => el.id === drawForm.id);
            if (!elementExists) {
                updatedLayers.push(newElement);
            }

            return updatedLayers;
        });
    }


    const handleSaveText = async (newValue?: boolean) => {
        //const editorStateToRaw = convertToRaw(editorState.getCurrentContent());

        const selection = editorState.getSelection();
        //const contentState = props.editorState.getCurrentContent();

        // Créer une nouvelle sélection vide
        const clearedSelection = selection.merge({
            anchorOffset: selection.getStartOffset(),
            focusOffset: selection.getStartOffset(),
            isBackward: false,
        });

        // Forcer la nouvelle sélection dans l'état
        const newEditorState = EditorState.forceSelection(editorState, clearedSelection);

        const newElement = {
            layerType: 'text',
            id: Date.now(),
            editorDraftjs: newEditorState,
            //color: drawText.color,
            overflowContainer: "expand",
            //fontSize: drawText.fontSize,
            //fontSize: newValue === true ? 30 : drawText.fontSize,
            //underline: drawText.underline,
            //fontStyle: drawText.fontStyle,
            //fontWeight: drawText.fontWeight,
            textAlign: drawText.textAlign,
            //opacity: drawText.opacity,
            h: newValue ? defaultSize : drawArea.height,
            w: newValue ? defaultSize : drawArea.width,
            x: newValue ? defaultPositionW : drawArea.positionX + drawArea.leftOffset,
            y: newValue ? defaultPositionH : drawArea.positionY + drawArea.topOffset,
            rotate: newValue ? 0 : drawArea.rotate,
        };
        setLayers((prevLayers: any) => {
            const updatedLayers = prevLayers.map((el: any) => {
                if (el.id === drawText.id) {
                    // Si l'élément existe, mettre à jour l'image
                    return { ...newElement, overflowContainer: el.overflowContainer, id: el.id };
                }
                return el;
            });

            // Vérifier si l'élément avec l'ID donné existe, sinon l'ajouter
            const elementExists = prevLayers.some((el: any) => el.id === drawText.id);
            if (!elementExists) {
                updatedLayers.push(newElement);
            }

            return updatedLayers;
        });
    }

    //console.log(strokePathRef.current?.style.stroke, strokeRectRef.current?.style.stroke);


    const handleSaveSvg = (newSvg?: string, img?: string) => {

        let color
        if (strokePathRef.current) {
            color = strokePathRef.current.style.stroke
        } else if (strokeRectRef.current) {
            color = strokeRectRef.current.style.stroke
        }
        if (color) {
            color = rgbToHex(color)
        }

        const newElement = {
            layerType: 'overlay-svg',
            id: Date.now(),
            svgImg: img ? img : drawSvg.img,
            thickness: drawSvg.thickness,
            overflowContainer: "expand",
            borderColor: color || "#000000",
            opacity: drawSvg.opacity,
            svg: newSvg ? newSvg : drawSvg.svg,
            h: newSvg ? defaultSize : drawArea.height,
            w: newSvg ? defaultSize : drawArea.width,
            x: newSvg ? defaultPositionW : drawArea.positionX + drawArea.leftOffset,
            y: newSvg ? defaultPositionH : drawArea.positionY + drawArea.topOffset,
            rotate: newSvg ? 0 : drawArea.rotate,
            filter: {
                brightness: drawSvg.filter.brightness,
                contrast: drawSvg.filter.contrast,
                saturation: drawSvg.filter.saturation,
                hue: drawSvg.filter.hue,
                blur: drawSvg.filter.blur,
                sepia: drawSvg.filter.sepia,
                grayscale: drawSvg.filter.grayscale,
                invert: drawSvg.filter.invert,
            },
            crop: {
                x: drawSvg.crop.x,
                y: drawSvg.crop.y,
                size: drawSvg.crop.size,
            },
        }

        setLayers((prevLayers: any) => {
            const updatedLayers = prevLayers.map((el: any) => {
                if (el.id === drawSvg.id) {
                    // Si l'élément existe, mettre à jour l'image
                    return { ...newElement, overflowContainer: el.overflowContainer, id: el.id };
                }
                return el;
            });

            // Vérifier si l'élément avec l'ID donné existe, sinon l'ajouter
            const elementExists = prevLayers.some((el: any) => el.id === drawSvg.id);
            if (!elementExists) {
                updatedLayers.push(newElement);
            }

            return updatedLayers;
        });
    }

    const handleSaveSvgFull = (newSvg?: string) => {

        let color
        if (strokePathRef.current) {
            color = strokePathRef.current.style.stroke
        } else if (strokeRectRef.current) {
            color = strokeRectRef.current.style.stroke
        }
        if (color) {
            color = rgbToHex(color)
        }

        let colorBg
        if (strokeRectBgRef.current) {
            colorBg = strokeRectBgRef.current.style.fill
        }
        if (colorBg) {
            colorBg = rgbToHex(colorBg)
        }

        const newElement = {
            layerType: 'overlay-svg-full',
            id: Date.now(),
            thickness: drawSvgFull.thickness,
            overflowContainer: "expand",
            borderColor: color || "#000000",
            color: colorBg || "#000000",
            opacity: drawSvgFull.opacity,
            svg: newSvg ? newSvg : drawSvgFull.svg,
            h: newSvg ? defaultSize : drawArea.height,
            w: newSvg ? defaultSize : drawArea.width,
            x: newSvg ? defaultPositionW : drawArea.positionX + drawArea.leftOffset,
            y: newSvg ? defaultPositionH : drawArea.positionY + drawArea.topOffset,
            rotate: newSvg ? 0 : drawArea.rotate,
        }

        setLayers((prevLayers: any) => {
            const updatedLayers = prevLayers.map((el: any) => {
                if (el.id === drawSvgFull.id) {
                    // Si l'élément existe, mettre à jour l'image
                    return { ...newElement, overflowContainer: el.overflowContainer, id: el.id };
                }
                return el;
            });

            // Vérifier si l'élément avec l'ID donné existe, sinon l'ajouter
            const elementExists = prevLayers.some((el: any) => el.id === drawSvgFull.id);
            if (!elementExists) {
                updatedLayers.push(newElement);
            }

            return updatedLayers;
        });
    }

    const [isdisabledScroll, setDisabledScroll] = useState<boolean>(false);
    const handleSetBasicOverlay = () => {
        if (isDrawingSetting.deleteOutsideOverlay === "yes") {
            if (
                drawArea.positionX + drawArea.width < 0 - drawingExpandImg.expand / 2 ||
                drawArea.positionX > isImageSize.w + drawingExpandImg.expand / 2 ||
                drawArea.positionY + drawArea.height < 0 - drawingExpandImg.expand / 2 ||
                drawArea.positionY > isImageSize.h + drawingExpandImg.expand / 2
            ) {
                setLayers((prevLayers: any) =>
                    prevLayers.filter((element: any) =>
                        element.id !== isImgOverlay.id &&
                        element.id !== drawForm.id &&
                        element.id !== drawText.id &&
                        element.id !== drawSvg.id &&
                        element.id !== drawSvgFull.id
                    )
                );

                handleResetSvgFull();
                handleResetSvg();
                handleResetForm();
                handleResetImgOverlay();
                handleResetText();

                return;
            }
        }
        if (isImgOverlay.img) {
            setDisabledScroll(false)
            handleSaveImgOverlay()
            setElementIndex(0)
        } else if (isFormCanvasVisible) {
            handleSaveForm()
        }
        else if (textCanvasVisible) {
            handleSaveText()
        }
        else if (drawSvg.img) {
            handleSaveSvg()
        }
        else if (drawSvgFull.svg) {
            handleSaveSvgFull()
        }
        handleResetSvgFull();
        handleResetSvg()
        handleResetForm()
        handleResetImgOverlay()
        handleResetText()
    }

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutside = (event: MouseEvent) => {
            if (!outsideClickActive) {
                return setOutsideClickActive(true)
            }

            if (!isImgOverlay.img && !isFormCanvasVisible && !textCanvasVisible && !drawSvg.img && !drawSvgFull.svg) return;

            if (
                textCanvasContainerRef.current &&
                !textCanvasContainerRef.current.contains(event.target as Node)
            ) {
                if (
                    mainSidebarRef.current &&
                    mainSidebarRef.current.contains(event.target as Node) ||
                    sidebarRef.current &&
                    sidebarRef.current.contains(event.target as Node) ||
                    dialogLastImportRef.current &&
                    dialogLastImportRef.current.contains(event.target as Node) ||
                    overlayContextRef.current &&
                    overlayContextRef.current.contains(event.target as Node) ||
                    overlayContextPropoverRef.current &&
                    overlayContextPropoverRef.current.contains(event.target as Node) ||
                    drawingSidebarToolsRef.current &&
                    drawingSidebarToolsRef.current.contains(event.target as Node) ||
                    drawingSidebarToolsButtonRef.current &&
                    drawingSidebarToolsButtonRef.current.contains(event.target as Node) ||
                    overlayToolsRef.current &&
                    overlayToolsRef.current.contains(event.target as Node) ||
                    overlayFiltersRef.current &&
                    overlayFiltersRef.current.contains(event.target as Node) ||
                    drawingSidebarToolsSettingRef.current &&
                    drawingSidebarToolsSettingRef.current.contains(event.target as Node) ||
                    textSizeRef.current &&
                    textSizeRef.current.contains(event.target as Node)
                ) {
                    return;
                }
                return handleSetBasicOverlay()
            }
        };
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [
        textCanvasContainerRef,
        isMenuOpen,
        isImgOverlay,
        isFormCanvasVisible,
        drawArea,
        sidebarRef,
        dialogLastImportRef,
        overlayContextRef,
        textCanvasVisible,
        drawSvg,
        drawSvgFull,
        handleSetBasicOverlay,
        outsideClickActive
    ]);


    const cropOnWheel = async (event: React.WheelEvent<HTMLDivElement>) => {

        if (isImgOverlay.img) {
            const min = 0;
            const max = 100;
            const y = event.deltaY;


            let newSize: number;


            if (y > 0) {
                newSize = isImgOverlay.cropY + 10;
            } else {
                newSize = isImgOverlay.cropY - 10;
            }

            const value = Math.max(min, Math.min(max, newSize));

            return setImgOverlay({
                ...isImgOverlay,
                cropY: value
            })
        }
    };

    const HandleCanvas = (id: number, image: string) => {
        setIsDrawingNowCanvas((prevState: any) => ({
            ...prevState,
            id: id,
        }));

        // Charger une image et dessiner sur un canvas temporaire
        loadImageToCanvas(image, (sourceCanvas) => {
            const targetCanvas = canvasDrawRef.current; // Référence du canvas cible
            if (!targetCanvas) return;

            const targetContext = targetCanvas.getContext("2d", {
                willReadFrequently: true,
            });
            const sourceContext = sourceCanvas.getContext("2d", {
                willReadFrequently: true,
            });

            if (targetContext && sourceContext) {
                // Définir les dimensions du canvas cible en fonction de l'image
                targetCanvas.width = sourceCanvas.width;
                targetCanvas.height = sourceCanvas.height;

                // Dessiner le contenu du premier canvas sur le second via drawImage
                targetContext.drawImage(sourceCanvas, 0, 0);
            }
        });
    };

    const DrawCanvasImg = () => {
        try {
            const canvas = canvasDrawRef.current;
            if (!canvas) return;
            const context = canvas.getContext('2d', { willReadFrequently: true });
            if (!context) return;
            const imgData = canvas.toDataURL('image/png');

            const time = Date.now();
            setLayers((prevLayers: any) => {
                const updatedLayers = prevLayers.map((layer: any) => {
                    if (layer.id === isDrawingNowCanvas.id) {
                        // Si l'élément existe, mettre à jour l'image
                        return { ...layer, img: imgData };
                    }
                    return layer;
                });

                // Vérifier si l'élément avec l'ID donné existe, sinon l'ajouter
                const elementExists = prevLayers.some((layer: any) => layer.id === isDrawingNowCanvas.id);
                if (!elementExists) {
                    // Ajouter un nouvel élément à updatedLayers
                    updatedLayers.push({
                        layerType: 'draw',
                        id: time,
                        img: imgData,
                        expand: drawingExpandImg.expand,
                    });
                    HandleCanvas(time, imgData);
                }
                return updatedLayers;
            });
        } catch (error) {
            console.log('error save draw');

        }
    };

    const base64ToImage = (base64: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = base64;
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
        });
    };

    const handleAiQuality = async () => {
        if (!isNewImage.img) return;
        try {

            const { style, noise, scale, tta, image } = { ...isAiQuality, image: isNewImage.img }


            const img = await base64ToImage(image);

            if (!img) {
                console.error("La convertion de l'image a échoué !");
                return;
            }

            const config: any = {
                'image': img || null,
                'style': style || 'art', // Remplacez 'default' par la valeur par défaut souhaitée
                'scale': scale || 1, // Par exemple, 1 pour pas de mise à l'échelle
                'noise': noise || 0, // Niveau de bruit par défaut
                'tta': tta || 1, // Niveau TTA par défaut
            };

            if (!config['image']) {
                console.error("L'image n'est pas défini !");
                return;
            }

            const newConfig = await startWaifu(config)

            if (!newConfig['model']) {
                console.error("Le modèle n'est pas défini !");
                return;
            }

            const result = await prepareImageWaifu(newConfig)

            if (!result) {
                console.error("La préparation de l'image a échoué !");
                return;
            }

            const { tasks, config: updatedConfigPrepare } = result;

            await processWaifu(tasks, updatedConfigPrepare, 0)

        } catch (error) {
            console.error('Erreur waifu2x-tfjs:', error); // Journaliser l'erreur
        }
    }

    const handleRenderingToast = async (isLayers: LayerElement[]) => {
        //const loadImage = (el: IsNewOverlaySave): Promise<LoadedImage> => {
        //    return new Promise((resolve) => {
        //        const img = new Image();
        //        img.src = el.img;
        //        img.onload = () => resolve({ img, el });
        //    });
        //};
        //const allOverlay = await Promise.all(
        //    isLayers.map(el => loadImage(el))
        //);
        // console.log(isLayers);


        return await new Promise<string>(async (resolve, reject) => {
            UseDrawingRendering.RenderingPicture(
                isNewImage.img,
                isRenderingOption,
                isLayers,
                drawingExpandImg,
                systemShadow,
                isBlanket,
                systemSetting,
                drawFiligrane,
                (img) => {
                    if (!img) {
                        return reject();
                    }
                    resolve(img);
                }
            );
        });
    };


    useEffect(() => {
        if (isMenuOpen !== 4) {
            setIsDrawingNowCanvas((prevState) => ({ ...prevState, active: false, isMouseDown: false, id: null }))
        }
    }, [isMenuOpen])

    return {
        isDrawingSetting,
        setDrawingSetting,
        isDrawingLoad,
        setDrawingLoad,
        setResultImageUrl,
        drawingSidebarToolsRef,
        drawingSidebarToolsSettingRef,
        drawingSidebarToolsButtonRef,
        isRenderingOption, setIsRenderingOption,
        formDrawRef,
        overlayImgRef,
        overlayImgBgRef,
        insetImgRef,
        insetExpandRef,
        colorOutsideImgRef,
        expandDivRef,
        blanketRef,
        canvasDrawRef,
        textSizeRef,
        editorRef,

        elementIndex, setElementIndex,
        isRenderingOpen, setIsRenderingOpen,
        formCode,
        isProfilMenuOpen, setIsProfilMenuOpen,
        overlayContextRef,
        overlayContextPropoverRef,
        overlayFiltersRef,
        captureRef,
        mainSidebarRef,
        sidebarRef,
        dialogLastImportRef,
        handleDrop,
        handleDragLeave,
        handleDragOver,
        isDraggingDrop,
        setIsDraggingDrop,
        resultImageUrl,
        handleSetBasicOverlay,
        cropOnWheel,
        setDisabledScroll,
        isdisabledScroll,
        handleResetForm,
        handleResetText,
        handleSaveText,
        handleResetSvg,
        handleSaveSvg,
        handleResetSvgFull,
        handleSaveSvgFull,
        isAiQuality,
        setAiQuality,
        setWaifuProcess,
        isWaifuProcess,

        imageRef,
        textCanvasRef,
        overlayAreaRef,
        overlayToolsRef,
        textCanvasContainerRef,
        canvasCropRef,
        isFileDialogOpen, setFileDialogOpen,
        isImgOverlay, setImgOverlay,
        isImgOverlaySave,
        setImgOverlaySave,
        drawingExpandImg, setDrawingExpandImg,
        drawForm, setDrawForm,

        isMenuOpen, setMenuOpen,
        canvasContainerRef,
        handleChange,
        systemSetting, setSystemSetting,
        systemShadow, setSystemShadow,
        canvasRef,
        isNewImage, setNewImage,
        isNewImageImport, setNewImageImport,
        cropVisible, setCropVisible,
        fileInputRef,
        fileInputRef2,
        handleButtonClickImport,
        handleFileChangeImport,
        handleDeleteImport,

        textCanvasVisible, setTextCanvasVisible,
        isFormCanvasVisible, setFormCanvasVisible,
        isCanvasImage, setCanvasImage,
        isImageSize, setImageSize,
        handleStartCrop,
        croppedImageUrl,
        setCroppedImageUrl,


        handleMouseDownResizing,
        handleMouseUpResizing,
        handleMouseMoveResizing,
        handleResetImgOverlay,
        handleSaveImgOverlay,
        handleSaveForm,

        leftOffset,
        width,
        height,
        topOffset,
        zoom,
        setZoom,

        setWidth,
        setHeight,
        setLeftOffset,
        setTopOffset,

        //handleDefaultDrawText,
        setDrawArea,
        drawArea,
        drawText,
        setDrawText,
        isFileDialogOpenNewImgAlert,
        isFileDialogOpenNewImgAlertElement,
        setFileDialogOpenNewImgAlert,
        handleLastAdd,
        handleNewPictureAdd,
        handleSettDrawArea,
        startPosition,
        isResizing,
        handleCollectionImg,
        handleDeleteCropColection,
        isFreeAreaCrop, setFreeAreaCrop,
        isImgBorderOn, setImgBorderOn,
        isWindowOpen, setWindowOpen,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        startX,
        startY,
        endX,
        endY,
        selecting,
        isSelectArea,
        setSelectArea,
        setStartX,
        setStartY,
        setEndX,
        setEndY,
        setSelecting,
        isMenuLayer, setMenuLayer,
        isLayers, setLayers,
        drawDrawing, setDrawDrawing,
        setBlanket,
        isBlanket,

        startDrawingNowCanvas,
        drawNowCanvas,
        stopDrawingNowCanvas,
        setIsDrawingNowCanvas,
        BreakDrawingNowCanvas,
        isDrawingNowCanvas,
        DrawCanvasImg,
        RestartDrawingNowCanvas,
        HandleCanvas,


        scrollGrabScrollRef,
        handleMouseDownGrabScroll,
        handleMouseUpGrabScroll,
        handleMouseMoveGrabScroll,
        isDraggingGrabScroll,

        drawSvg, setDrawSvg,
        drawSvgFull, setDrawSvgFull,
        strokePathRef,
        strokeRectRef,
        strokeRectBgRef,
        handleAiQuality,

        defaultSize,
        defaultPositionW,
        defaultPositionH,
        editorState, setEditorState,
        customStyleMap, setCustomStyleMap,
        outsideClickActive, setOutsideClickActive,
        customStyleShadowMap, setCustomStyleShadowMap,
        isSystemResize, setSystemResize,
        drawFiligrane, setDrawFiligrane,
        handleRenderingToast

    }
}