import { ElementRef, MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import UseAreaDrawCreative from "./rich_text/useArea-drawing";
import toast from "react-hot-toast";
import { DrawArea, DrawText, IsNewCropImage, IsNewImage, IsNewOverlay, IsNewOverlaySave, SystemSettings, SystemShadow } from "@/utils/interface";
import html2canvas from "html2canvas";
import { Canvg } from 'canvg';
import { SystemLogo, SystemNoImg } from "@/public/assets/data/data";
import useSelectDrawing from "./usedrawing-select";


export default function useDrawing() {


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

        //handleDefaultDrawText,
        setDrawArea,
        drawArea,
        handleSettDrawArea,
        startPosition,
        isResizing,
        isImageSize, setImageSize
    } = UseAreaDrawCreative()

    const [isFileDialogOpenNewImgAlert, setFileDialogOpenNewImgAlert] = useState<boolean>(false);
    const [isFileDialogOpenNewImgAlertElement, setFileDialogOpenNewImgAlertElement] = useState<IsNewImage>({
        id: 0,
        fileName: '',
        img: '',
    });

    const imageRef = useRef<HTMLImageElement | null>(null);
    const canvasContainerRef = useRef<HTMLDivElement | null>(null);
    const captureRef = useRef<HTMLDivElement | null>(null);
    const canvasCropRef = useRef<HTMLCanvasElement | null>(null);
    const overlayContextRef = useRef<HTMLDivElement | null>(null);
    const overlayToolsRef = useRef<HTMLDivElement | null>(null);
    const overlayFiltersRef = useRef<HTMLDivElement | null>(null);
    const overlayContextPropoverRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const textCanvasRef = useRef<HTMLDivElement | null>(null);
    const mainSidebarRef = useRef<HTMLDivElement | null>(null);
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const dialogLastImportRef = useRef<HTMLDivElement | null>(null);
    const [cropVisible, setCropVisible] = useState<boolean>(false);
    const [imgCrop, setImgCrop] = useState<IsNewCropImage[]>([])
    const [isFileDialogOpenImport, setFileDialogOpenImport] = useState<boolean>(false);
    const [isFreeAreaCrop, setFreeAreaCrop] = useState<boolean>(true);
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
    const [resultImageUrl, setResultImageUrl] = useState<string>("");
    const [isImgSeparator, setImgSeparator] = useState<string>("none");
    const [isImgBorderOn, setImgBorderOn] = useState<boolean>(false);
    const [drawingExpandImg, setDrawingExpandImg] = useState<number>(0);

    const [isMenuOpen, setMenuOpen] = useState<number | 0>(0);
    const [isWindowOpen, setWindowOpen] = useState<number | 0>(0);

    const [isNewImageImport, setNewImageImport] = useState<IsNewImage[]>([])
    const [isNewImage, setNewImage] = useState<IsNewImage>({
        id: 0,
        fileName: '',
        img: ''
    });
    const [isCanvasImage, setCanvasImage] = useState<string | ''>('');
    const [isImgOverlaySave, setImgOverlaySave] = useState<IsNewOverlaySave[]>([]);
    const [isImgOverlay, setImgOverlay] = useState<IsNewOverlay>({
        id: 0,
        form: "",
        img: "",
        cropY: 50,
        opacity: 1.0,
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


    const [drawText, setDrawText] = useState<DrawText>({
        value: "",
        color: "#ffffff",
        fontSize: 24,
        underline: "none",
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
    });

    const handleChange = (newValue: number[]) => {
        setZoom(newValue);
    };

    const [systemSetting, setSystemSetting] = useState<SystemSettings>({
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hue: 0,
        blur: 0,
        sepia: 0,
        grayscale: 0,
        invert: 0
    });
    const [systemShadow, setSystemShadow] = useState<SystemShadow>({
        opacity: 0,
        size: 0,
        x: 0,
        y: 0,
        color: '#000000',
    });

    const CreateMainCanvas = () => {
        // Créer un canvas virtuel
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 800;

        // Obtenir le contexte 2D
        const context = canvas.getContext('2d');

        if (context) {
            // Dessiner un fond blanc
            context.fillStyle = 'white';
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Récupérer l'image en tant que Data URL (base64)
            const dataURL = canvas.toDataURL('image/png');
            setNewImage({
                id: Date.now(),
                fileName: `artvibes-${Date.now()}`,
                img: dataURL
            })
        } else {
            console.error('Impossible d\'obtenir le contexte 2D.');
        }
    }

    const handleButtonClickImport = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const generateRandomId = () => {
        return Math.floor(Math.random() * 1000000) + Date.now();
    };

    const handleFileChangeImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files || [];
        if (files) {
            const updatedImages = Array.from(files).map(file => {

                const reader = new FileReader();
                reader.readAsDataURL(file);

                return new Promise((resolve, reject) => {
                    reader.onloadend = () => {
                        resolve({
                            id: generateRandomId(),
                            fileName: file.name,
                            img: reader.result as string  // Cast reader.result to string
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
                    if (!isNewImage.img) {
                        setNewImage(typedImages[0]);
                    }
                    if (isNewImage.img && typedImages.length === 1) {
                        setFileDialogOpenNewImgAlertElement(typedImages[0]);
                        if (isMenuOpen === 8) return;
                        setFileDialogOpenNewImgAlert(true);
                    }
                    if (typedImages.length > 1) {
                        if (isMenuOpen === 8) return;
                        setFileDialogOpenImport(true);
                    }
                })
                .catch(error => {
                    console.error('Error reading file:', error);
                    // Handle error state if necessary
                });
        }

    };

    const handleLastAdd = (blobUrl: IsNewImage) => {
        const itemToMove = imgCrop.find((el) => el.id === blobUrl.id);

        if (itemToMove) {
            // Filtrer les éléments restants et ajouter l'élément trouvé en tête de liste
            const updatedImgCrop = [
                itemToMove,
                ...imgCrop.filter((el) => el.id !== blobUrl.id),
            ];

            // Mettre à jour l'état avec la nouvelle liste
            setImgCrop(updatedImgCrop);
        }

        setFileDialogOpenNewImgAlertElement(blobUrl)
        setFileDialogOpenNewImgAlert(true)
        setCanvasImage("");
        setCropVisible(false);
    };
    const handleNewPictureAdd = () => {
        setFileDialogOpenImport(false);
        setNewImage(isFileDialogOpenNewImgAlertElement);
        setFileDialogOpenNewImgAlertElement({
            id: 0,
            fileName: '',
            img: '',
        })
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

                const addNewPicture = () => {
                    const updatedImages = Array.from(files).map(file => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);

                        return new Promise((resolve, reject) => {
                            reader.onloadend = () => {
                                resolve({
                                    img: reader.result as string  // Cast reader.result to string
                                });
                            };
                            reader.onerror = reject;  // Handle errors
                        });
                    });

                    // Resolve all promises and update the state
                    Promise.all(updatedImages)
                        .then(images => {
                            setTimeout(() => {
                                const typedImages: IsNewOverlay[] = images as IsNewOverlay[];  // Assurez-vous que images est de type IsNewOverlay[]

                                if (!isImgOverlay.img) {
                                    setImgOverlay({
                                        ...isImgOverlay,
                                        img: typedImages[0].img,
                                        form: "square",
                                    });
                                    setDrawArea({
                                        width: 300,
                                        height: 300,
                                        leftOffset: 0,
                                        topOffset: 0,
                                        positionX: isImageSize.w / 2 - 150,
                                        positionY: isImageSize.h / 2 - 100,
                                    });
                                } else {
                                    setImgOverlay({
                                        ...isImgOverlay,
                                        img: typedImages[0].img,
                                    });
                                }
                                return resolve(true)
                            }, 1000)
                        })
                        .catch(() => {
                            return reject(new Error("An error occurred"));
                            // Handle error state if necessary
                        });
                }
                //if (isMenuOpen === 8) {
                //    return addNewPicture()
                //}
                if (isNewImage.img) {
                    return addNewPicture()
                }

                const updatedImages = Array.from(files).map(file => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);

                    return new Promise((resolve, reject) => {
                        reader.onloadend = () => {
                            resolve({
                                id: generateRandomId(),
                                fileName: file.name,
                                img: reader.result as string  // Cast reader.result to string
                            });
                        };
                        reader.onerror = reject;  // Handle errors
                    });
                });

                // Resolve all promises and update the state
                Promise.all(updatedImages)
                    .then(images => {
                        setTimeout(() => {
                            const typedImages: IsNewImage[] = images as IsNewImage[];  // Assurez-vous que images est de type IsNewImage[]

                            setNewImageImport(prevImages => [...typedImages, ...prevImages]);


                            if (!isNewImage.img) {
                                setNewImage(typedImages[0]);
                            }
                            if (isNewImage.img && typedImages.length === 1) {
                                setFileDialogOpenNewImgAlertElement(typedImages[0]);
                                if (isMenuOpen === 8) return;
                                setFileDialogOpenNewImgAlert(true);
                            }
                            if (typedImages.length > 1) {
                                if (isMenuOpen === 8) return;
                                setFileDialogOpenImport(true);
                            }
                            return resolve(true)
                        }, 1000)
                    })
                    .catch(() => {
                        return reject(new Error("An error occurred"));
                        // Handle error state if necessary
                    });

            }
        })
    }, [isNewImage, isMenuOpen, isImgOverlay, isImageSize]);

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
            const itemToMove = imgCrop.find((el) => el.id === id);

            if (itemToMove) {
                // Filtrer les éléments restants et ajouter l'élément trouvé en tête de liste
                const updatedImgCrop = [
                    itemToMove,
                    ...imgCrop.filter((el) => el.id !== id),
                ];

                // Mettre à jour l'état avec la nouvelle liste
                setImgCrop(updatedImgCrop);
            }
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
        const filtered = imgCrop.filter((el) => el.id !== id);
        setImgCrop(filtered);
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
            });
        }
    };

    function hexToRgba(hex: string, alpha: number = 1): string {
        // Supprimer le symbole '#' si présent
        hex = hex.replace(/^#/, '');

        // Convertir les valeurs hex en décimal
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        // Retourner le format RGBA
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    const captureElementToast = async () => {
        // Récupérer l'élément à capturer via useRef
        //const elementToCapture = canvasContainerRef.current;

        setResultImageUrl("");

        return await new Promise(async (resolve, reject) => {

            try {

                if (!imageRef.current) return;

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');


                if (!ctx) {
                    return reject(new Error("An error occurred"));
                }


                if (!SystemLogo.src) {
                    return reject(new Error("An error occurred"));
                }

                const image = imageRef.current;


                canvas.width = image.width + drawingExpandImg;
                canvas.height = image.height + drawingExpandImg;



                // Appliquer des transformations
                ctx.filter = `
                    brightness(${systemSetting.brightness}%)
                    contrast(${systemSetting.contrast}%)
                    saturate(${systemSetting.saturation}%)
                    sepia(${systemSetting.sepia}%)
                    hue-rotate(${systemSetting.hue}deg)
                    blur(${systemSetting.blur}px)
                    grayscale(${systemSetting.grayscale}%)
                    invert(${systemSetting.invert}%)
                  `;


                ctx.drawImage(image, drawingExpandImg / 2, drawingExpandImg / 2);



                //ctx.save(); // Sauvegarder l'état actuel du contexte

                // Ombre en haut
                //let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.2);
                //gradient.addColorStop(0, rgbaColor);
                //gradient.addColorStop(0.5, rgbaColor);
                //gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                //ctx.fillStyle = gradient;
                //ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Ombre à gauche
                //gradient = ctx.createLinearGradient(0, 0, canvas.width * 0.2, 0);
                //gradient.addColorStop(0, rgbaColor);
                //gradient.addColorStop(0.5, rgbaColor);
                //gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                //ctx.fillStyle = gradient;
                //ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Ombre en bas
                //gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height * 0.8);
                //gradient.addColorStop(0, rgbaColor);
                //gradient.addColorStop(0.5, rgbaColor);
                //gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                //ctx.fillStyle = gradient;
                //ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Ombre à droite
                //gradient = ctx.createLinearGradient(canvas.width, 0, canvas.width * 0.8, 0);
                //gradient.addColorStop(0, rgbaColor);
                //gradient.addColorStop(0.5, rgbaColor);
                //gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                //ctx.fillStyle = gradient;
                //ctx.fillRect(0, 0, canvas.width, canvas.height);


                // Appliquer une autre ombre pour le côté gauche et droit (horizontal)
                //ctx.shadowColor = 'rgba(0, 0, 0, 1)';
                //ctx.shadowBlur = 100;
                //ctx.shadowOffsetX = 0;
                //ctx.shadowOffsetY = 50;
                //ctx.fillRect(-100, -50, canvas.width + 200, canvas.height + 100);

                //ctx.restore();

                // Réinitialiser le filtre pour ne pas affecter les images overlay
                ctx.filter = 'none';

                isImgOverlaySave?.forEach((el) => {
                    const smallImage = new Image();
                    smallImage.src = el.img;
                    smallImage.onload = () => {
                        ctx.save();  // Sauvegarder l'état actuel du contexte

                        const frameWidth = el.w;
                        const frameHeight = el.h;
                        const positionX = el.x + drawingExpandImg / 2;
                        const positionY = el.y + drawingExpandImg / 2;
                        const opacity = el.opacity;
                        const filters = el.filter;

                        const shadowWidth = el.shadow || 0; // Largeur du bord
                        const borderColor = el.borderColor; // Couleur du bord


                        const sourceWidth = smallImage.width;
                        const sourceHeight = smallImage.height;

                        // Calculer l'échelle pour que l'image source soit contenue dans l'encadrement
                        const scale = Math.max(frameWidth / sourceWidth, frameHeight / sourceHeight);

                        // Calculer les dimensions recadrées
                        const cropWidth = frameWidth / scale;
                        const cropHeight = frameHeight / scale;

                        // Calculer la position pour centrer l'image recadrée
                        const cropX = frameWidth <= frameHeight ? (el.cropY / 100) * (sourceWidth - cropWidth) : (sourceWidth - cropWidth) / 2;
                        const cropY = frameWidth >= frameHeight ? (el.cropY / 100) * (sourceHeight - cropHeight) : (sourceHeight - cropHeight) / 2;
                        //const cropY = (sourceHeight - cropHeight) / 2;

                        const handleForm = (form: string, frameWidth: number, frameHeight: number) => {
                            if (form === "square" || form === "squareShadow") {
                                return 0;
                            } else if (form === "squareRounded" || form === "squareRoundedShadow") {
                                return Math.min(frameWidth, frameHeight) / 6;
                                //return 20;
                            } else if (form === "circle" || form === "circleShadow") {
                                return Math.min(frameWidth, frameHeight) / 2;
                            }
                            return 0;
                        };

                        // Supposons que `el` contient les informations sur la forme et le contexte de canvas `ctx`
                        const borderRadius = handleForm(el.form, frameWidth, frameHeight);

                        // Dessiner la bordure arrondie
                        ctx.beginPath();
                        ctx.moveTo(positionX + borderRadius, positionY);
                        ctx.lineTo(positionX + frameWidth - borderRadius, positionY);
                        ctx.quadraticCurveTo(positionX + frameWidth, positionY, positionX + frameWidth, positionY + borderRadius);
                        ctx.lineTo(positionX + frameWidth, positionY + frameHeight - borderRadius);
                        ctx.quadraticCurveTo(positionX + frameWidth, positionY + frameHeight, positionX + frameWidth - borderRadius, positionY + frameHeight);
                        ctx.lineTo(positionX + borderRadius, positionY + frameHeight);
                        ctx.quadraticCurveTo(positionX, positionY + frameHeight, positionX, positionY + frameHeight - borderRadius);
                        ctx.lineTo(positionX, positionY + borderRadius);
                        ctx.quadraticCurveTo(positionX, positionY, positionX + borderRadius, positionY);
                        ctx.closePath();

                        if (el.form === "squareShadow" || el.form === "squareRoundedShadow" || el.form === "circleShadow") {
                            // Remplir la bordure
                            ctx.fillStyle = borderColor;
                            // Appliquer un effet de flou en utilisant un rectangle plus petit à l'intérieur pour simuler un flou "inset"
                            ctx.filter = `blur(${shadowWidth}px)`;
                            ctx.fillStyle = borderColor;
                            ctx.fill();

                        }

                        //// Clip pour l'intérieur du rectangle arrondi
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(positionX + borderRadius + shadowWidth, positionY + shadowWidth);
                        ctx.lineTo(positionX + frameWidth - borderRadius - shadowWidth, positionY + shadowWidth);
                        ctx.quadraticCurveTo(positionX + frameWidth - shadowWidth, positionY + shadowWidth, positionX + frameWidth - shadowWidth, positionY + borderRadius + shadowWidth);
                        ctx.lineTo(positionX + frameWidth - shadowWidth, positionY + frameHeight - borderRadius - shadowWidth);
                        ctx.quadraticCurveTo(positionX + frameWidth - shadowWidth, positionY + frameHeight - shadowWidth, positionX + frameWidth - borderRadius - shadowWidth, positionY + frameHeight - shadowWidth);
                        ctx.lineTo(positionX + borderRadius + shadowWidth, positionY + frameHeight - shadowWidth);
                        ctx.quadraticCurveTo(positionX + shadowWidth, positionY + frameHeight - shadowWidth, positionX + shadowWidth, positionY + frameHeight - borderRadius - shadowWidth);
                        ctx.lineTo(positionX + shadowWidth, positionY + borderRadius + shadowWidth);
                        ctx.quadraticCurveTo(positionX + shadowWidth, positionY + shadowWidth, positionX + borderRadius + shadowWidth, positionY + shadowWidth);
                        ctx.closePath();
                        ctx.clip();

                        ctx.globalAlpha = opacity;


                        // Appliquer des transformations
                        ctx.filter = `
                          brightness(${filters.brightness}%)
                          contrast(${filters.contrast}%)
                          saturate(${filters.saturation}%)
                          sepia(${filters.sepia}%)
                          hue-rotate(${filters.hue}deg)
                          blur(${filters.blur}px)
                          grayscale(${filters.grayscale}%)
                          invert(${filters.invert}%)
                        `;

                        // Dessiner l'image recadrée et redimensionnée sur le canvas, en laissant de la place pour la bordure
                        ctx.drawImage(
                            smallImage,
                            cropX,
                            cropY,
                            cropWidth,
                            cropHeight,
                            positionX,   // Décaler l'image pour laisser la place de la bordure
                            positionY,   // Décaler l'image pour laisser la place de la bordure
                            frameWidth,  // Redimensionner l'image pour compenser la taille de la bordure
                            frameHeight // Redimensionner l'image pour compenser la taille de la bordure
                        );


                        ctx.restore();  // Restaurer l'état précédent du contexte

                    };
                });

                const filigraneImage = new Image();
                filigraneImage.src = SystemLogo.src || '';
                filigraneImage.onload = () => {
                    ctx.save();

                    // Désactiver les filtres précédemment appliqués
                    ctx.filter = 'none';

                    // Calculer la nouvelle taille du filigrane pour qu'il représente 20 % de la taille de l'image principale
                    const scaleFactor = 0.2; // 20%
                    const watermarkWidth = image.width * scaleFactor;
                    const watermarkHeight = filigraneImage.height * (watermarkWidth / filigraneImage.width);

                    // Calculer la position pour afficher le filigrane en bas à droite
                    const x = image.width - watermarkWidth - 10 + drawingExpandImg;
                    const y = image.height - watermarkHeight - 10 + drawingExpandImg;

                    // Dessiner le filigrane redimensionné sur le canvas principal
                    ctx.drawImage(filigraneImage, x, y, watermarkWidth, watermarkHeight);

                    ctx.restore();
                }


                // Attendre que canvg termine le rendu avant d'extraire l'image
                setTimeout(() => {
                    // Obtenir l'image en base64
                    const imgData = canvas.toDataURL('image/png');

                    function isSignificantImage(canvas: HTMLCanvasElement) {
                        const context = canvas.getContext("2d");
                        if (!context) return false;

                        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                        const data = imageData.data;

                        // Parcourir tous les pixels
                        for (let i = 0; i < data.length; i += 4) {
                            const red = data[i];
                            const green = data[i + 1];
                            const blue = data[i + 2];
                            const alpha = data[i + 3];

                            // Vérifier si le pixel n'est pas totalement transparent
                            if (alpha !== 0) {
                                // Vérifier si le pixel est différent de la transparence totale (0,0,0,0)
                                // Ici, on vérifie si au moins un canal de couleur est non nul
                                if (red !== 0 || green !== 0 || blue !== 0) {
                                    return true;
                                }
                            }
                        }

                        return false; // Tous les pixels sont soit totalement transparents, soit noirs avec alpha 0
                    }
                    if (isSignificantImage(canvas)) {
                        resolve(true);
                        setResultImageUrl(imgData);
                    } else {
                        reject()
                    }
                }, 1000);
            } catch (error) {
                reject()
            }
        })
    };



    function captureElement() {
        // Utiliser toast.promise pour gérer la promesse
        toast.promise(captureElementToast(), {
            loading: "Rendering in progress...",
            success: (result) => {
                if (result) {
                    return "Successfully completed rendering.";
                } else {
                    throw new Error("An error occurred");
                }
            },
            error: "An error occurred",
        });
    }

    const handleResetImgOverlay = () => {
        setImgOverlay({
            id: 0,
            form: "",
            img: "",
            cropY: 50,
            opacity: 1.0,
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

    const [isdisabledScroll, setDisabledScroll] = useState<boolean>(false);
    const handleSetBasicOverlay = () => {
        if (isImgOverlay.img) {
            setDisabledScroll(false)
            setImgOverlaySave([
                ...isImgOverlaySave,
                {
                    id: Date.now(),
                    form: isImgOverlay.form,
                    img: isImgOverlay.img,
                    cropY: isImgOverlay.cropY,
                    opacity: isImgOverlay.opacity,
                    shadow: isImgOverlay.shadow,
                    borderColor: isImgOverlay.borderColor,
                    h: drawArea.height,
                    w: drawArea.width,
                    x: drawArea.positionX + drawArea.leftOffset,
                    y: drawArea.positionY + drawArea.topOffset,
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
                },
            ]);
        }
        handleResetImgOverlay()
    }

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutside = (event: MouseEvent) => {
            if (!isImgOverlay.img) return;

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
                    overlayToolsRef.current &&
                    overlayToolsRef.current.contains(event.target as Node) ||
                    overlayFiltersRef.current &&
                    overlayFiltersRef.current.contains(event.target as Node)
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
        drawArea,
        sidebarRef,
        dialogLastImportRef,
        overlayContextRef,
        handleSetBasicOverlay
    ]);


    const cropOnWheel = async (event: React.WheelEvent<HTMLDivElement>) => {
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

        if (isImgOverlay.img) {
            return setImgOverlay({
                ...isImgOverlay,
                cropY: value
            })
        }
        //setResizeOnWheel(value);
    };



    return {
        CreateMainCanvas,
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
        captureElement,
        handleSetBasicOverlay,
        cropOnWheel,
        setDisabledScroll,
        isdisabledScroll,

        imageRef,
        textCanvasRef,
        overlayAreaRef,
        overlayToolsRef,
        textCanvasContainerRef,
        canvasCropRef,
        isFileDialogOpenImport, setFileDialogOpenImport,
        isImgOverlay, setImgOverlay,
        isImgOverlaySave,
        setImgOverlaySave,
        drawingExpandImg, setDrawingExpandImg,

        isMenuOpen, setMenuOpen,
        canvasContainerRef,
        handleChange,
        systemSetting, setSystemSetting,
        systemShadow, setSystemShadow,
        canvasRef,
        isNewImage, setNewImage,
        isNewImageImport, setNewImageImport,
        cropVisible, setCropVisible,
        fileInputRef, handleButtonClickImport,
        handleFileChangeImport,
        handleDeleteImport,

        textCanvasVisible, setTextCanvasVisible,
        imgCrop, setImgCrop,
        isCanvasImage, setCanvasImage,
        isImageSize, setImageSize,
        handleStartCrop,
        croppedImageUrl,
        setCroppedImageUrl,


        handleMouseDownResizing,
        handleMouseUpResizing,
        handleMouseMoveResizing,
        handleResetImgOverlay,

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
        isImgSeparator, setImgSeparator,
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

    }
}