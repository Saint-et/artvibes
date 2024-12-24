import { ArrayExpand } from "@/public/assets/data/data";
import { Blanket, DrawFiligrane, ExpandImg, LayerElement, NewImageSize, RenderingOption, SystemSettings, SystemShadow } from "@/utils/interface";
import { hexToRgba } from "@/utils/utils";

export default function useDrawingRendering() {

    function isSignificantImage(canvas: HTMLCanvasElement): boolean {
        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context) return false;

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Vérifier tous les pixels
        for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3];

            // Si l'alpha n'est pas transparent (0), l'image est significative
            if (alpha !== 0) {
                return true;
            }
        }

        return false; // Tous les pixels sont complètement transparents
    }


    const drawOverlayImg = async (ctx: CanvasRenderingContext2D, drawingExpandImg: number, overlay: LayerElement) => {


        return new Promise<void>((resolve, reject) => {
            ctx.save();  // Sauvegarder l'état actuel du contexte
            const smallImage = new window.Image();
            smallImage.src = overlay.img;

            smallImage.onload = () => {

                const frameWidth = overlay.w;
                const frameHeight = overlay.h;
                const positionX = overlay.x + drawingExpandImg / 2;
                const positionY = overlay.y + drawingExpandImg / 2;
                const opacity = overlay.opacity;
                const filters = overlay.filter;

                const shadowWidth = overlay.shadow || 0; // Largeur du bord
                const borderColor = overlay.borderColor; // Couleur du bord


                const sourceWidth = smallImage.width;
                const sourceHeight = smallImage.height;

                // Calculer l'échelle pour que l'image source soit contenue dans l'encadrement
                const scale = Math.max(frameWidth / sourceWidth, frameHeight / sourceHeight);

                // Calculer les dimensions recadrées
                const cropWidth = frameWidth / scale;
                const cropHeight = frameHeight / scale;

                // Calculer la position pour centrer l'image recadrée
                const cropX = (overlay.cropY / 100) * (sourceWidth - cropWidth);
                const cropY = (overlay.cropY / 100) * (sourceHeight - cropHeight);
                //const cropY = (sourceHeight - cropHeight) / 2;

                const handleForm = (form: string, frameWidth: number, frameHeight: number) => {
                    if (form === "square" || form === "squareShadow") {
                        return 0;
                    } else if (form === "squareRounded" || form === "squareRoundedShadow") {
                        return Math.min(frameWidth, frameHeight) / 6;
                    } else if (form === "circle" || form === "circleShadow") {
                        return Math.min(frameWidth, frameHeight) / 2;
                    }
                    return 0;
                };

                const borderRadius = handleForm(overlay.form, frameWidth, frameHeight);

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

                if (overlay.form === "squareShadow" || overlay.form === "squareRoundedShadow" || overlay.form === "circleShadow") {
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
                ctx.restore(); // Restaurer l'état précédent du contexte
                resolve(); // Indiquer que l'opération est terminée
            }
            smallImage.onerror = (err) => {
                console.error("Erreur lors du chargement de l'image :", err);
                ctx.restore(); // Restaurer l'état précédent du contexte
                reject(err); // Rejeter la promesse en cas d'erreur
            };
        });
    }


    const drawOverlayImgSvg = async (ctx: CanvasRenderingContext2D, drawingExpandImg: number, overlay: LayerElement) => {
        return new Promise<void>((resolve, reject) => {
            ctx.save(); // Sauvegarder l'état actuel du contexte
            const smallImage = new window.Image();
            smallImage.src = overlay.stringSvgImgRendering;

            smallImage.onload = () => {
                const positionX = overlay.x + drawingExpandImg / 2;
                const positionY = overlay.y + drawingExpandImg / 2;

                // Dessiner l'image sur le canvas
                ctx.drawImage(smallImage, positionX, positionY);
                ctx.restore(); // Restaurer l'état précédent du contexte
                resolve(); // Indiquer que l'opération est terminée
            };

            smallImage.onerror = (err) => {
                console.error("Erreur lors du chargement de l'image :", err);
                ctx.restore(); // Restaurer l'état précédent du contexte
                reject(err); // Rejeter la promesse en cas d'erreur
            };
        });
    };


    const drawOverlayDrawing = async (ctx: CanvasRenderingContext2D, img: HTMLImageElement, drawingExpandImg: number, overlay: LayerElement) => {
        return new Promise<void>((resolve, reject) => {
            ctx.save(); // Sauvegarder l'état actuel du contexte
            const smallImage = new window.Image();
            smallImage.src = overlay.img;

            smallImage.onload = () => {

                const positionX = (img.width + drawingExpandImg - smallImage.width) / 2;
                const positionY = (img.height + drawingExpandImg - smallImage.height) / 2;


                //ctx.globalAlpha = drawFiligrane.opacity;
                // Dessiner l'image sur le canvas
                ctx.drawImage(smallImage, positionX, positionY);
                ctx.restore(); // Restaurer l'état précédent du contexte
                resolve(); // Indiquer que l'opération est terminée
            };

            smallImage.onerror = (err) => {
                console.error("Erreur lors du chargement de l'image :", err);
                ctx.restore(); // Restaurer l'état précédent du contexte
                reject(err); // Rejeter la promesse en cas d'erreur
            };
        });
    };



    const drawInsetShadow = (
        ctx: CanvasRenderingContext2D,
        imgX: number, // Position X de l'image principale
        imgY: number, // Position Y de l'image principale
        imgWidth: number, // Largeur de l'image principale
        imgHeight: number, // Hauteur de l'image principale
        shadowSize: number,
        shadowColor: string,
        shadowColorTransparent: string
    ) => {
        ctx.save();

        // Dimensions du canvas d'ombre
        const shadowCanvasWidth = imgWidth + 2 * shadowSize;
        const shadowCanvasHeight = imgHeight + 2 * shadowSize;

        const canvas = document.createElement("canvas");
        canvas.width = shadowCanvasWidth;
        canvas.height = shadowCanvasHeight;

        const context = canvas.getContext("2d")!;
        if (!context) return;

        // Coordonnées ajustées pour centrer l'ombre autour de l'image principale
        const shadowX = shadowSize;
        const shadowY = shadowSize;

        // Ombre en haut
        let gradient = context.createLinearGradient(0, shadowY, 0, shadowY + shadowSize);
        gradient.addColorStop(0, shadowColor);
        gradient.addColorStop(0.5, shadowColor);
        gradient.addColorStop(1, shadowColorTransparent);
        context.fillStyle = gradient;
        context.fillRect(shadowX, shadowY, imgWidth, shadowSize);

        // Ombre à gauche
        gradient = context.createLinearGradient(shadowX, 0, shadowX + shadowSize, 0);
        gradient.addColorStop(0, shadowColor);
        gradient.addColorStop(0.5, shadowColor);
        gradient.addColorStop(1, shadowColorTransparent);
        context.fillStyle = gradient;
        context.fillRect(shadowX, shadowY, shadowSize, imgHeight);

        // Ombre en bas
        gradient = context.createLinearGradient(0, shadowY + imgHeight - shadowSize, 0, shadowY + imgHeight);
        gradient.addColorStop(0, shadowColorTransparent);
        gradient.addColorStop(0.5, shadowColor);
        gradient.addColorStop(1, shadowColor);
        context.fillStyle = gradient;
        context.fillRect(shadowX, shadowY + imgHeight - shadowSize, imgWidth, shadowSize);

        // Ombre à droite
        gradient = context.createLinearGradient(shadowX + imgWidth - shadowSize, 0, shadowX + imgWidth, 0);
        gradient.addColorStop(0, shadowColorTransparent);
        gradient.addColorStop(0.5, shadowColor);
        gradient.addColorStop(1, shadowColor);
        context.fillStyle = gradient;
        context.fillRect(shadowX + imgWidth - shadowSize, shadowY, shadowSize, imgHeight);

        // Dessiner l'ombre sur le canvas principal, en tenant compte du décalage
        ctx.drawImage(canvas, imgX - shadowSize, imgY - shadowSize);

        ctx.restore();
    };

    const drawOutsideShadow = (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        shadowSize: number,
        shadowColor: string
    ) => {
        ctx.save();

        // Dessiner un rectangle de base pour le cadre
        ctx.fillStyle = "rgba(255, 255, 255, 0)"; // transparent
        ctx.fillRect(x, y, width, height);

        // Configurer l'ombre
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = shadowSize;
        ctx.shadowColor = shadowColor;

        // Dessiner un rectangle pour l'ombre extérieure
        ctx.fillStyle = "rgba(255, 255, 255, 0)"; // la couleur de fond peut être ajustée
        ctx.fillRect(x - shadowSize, y - shadowSize, width + shadowSize * 2, height + shadowSize * 2);

        ctx.restore();
    };

    // Noyau pour le filtre de netteté
    const sharpenKernel = [
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0],
    ];

    // Fonction pour appliquer le filtre de netteté
    const applySharpenFilter = (imageData: ImageData) => {


        const { data, width, height } = imageData;
        const output = new Uint8ClampedArray(data); // Nouveau tableau pour stocker les modifications

        // Fonction pour obtenir la valeur d'un pixel avec gestion des bords
        const getPixel = (x: number, y: number, i: number) => {
            const pos = ((y * width) + x) * 4 + i;
            return data[pos] || 0;
        };

        // Appliquer la convolution
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                for (let i = 0; i < 3; i++) { // Boucle pour chaque canal (R, G, B)
                    let sum = 0;
                    for (let ky = -1; ky <= 1; ky++) {
                        for (let kx = -1; kx <= 1; kx++) {
                            const pixelValue = getPixel(x + kx, y + ky, i);
                            sum += pixelValue * sharpenKernel[ky + 1][kx + 1];
                        }
                    }
                    const pos = (y * width + x) * 4 + i;
                    output[pos] = Math.min(Math.max(sum, 0), 255); // Clamp entre 0 et 255
                }
            }
        }

        return new ImageData(output, width, height);
    };

    const resizeImage = (image: HTMLImageElement, drawingExpandImg: number, isRenderingOption: RenderingOption) => {

        const canvas = document.createElement("canvas");
        const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

        const originalWidth = image.width;
        const originalHeight = image.height;

        // Calculer le ratio original
        const ratio = originalWidth / originalHeight;

        // Calculer les nouvelles dimensions
        let targetWidth = originalWidth - drawingExpandImg;
        let targetHeight = originalHeight - drawingExpandImg;

        // Ajuster la taille tout en conservant les proportions
        if (targetWidth / targetHeight > ratio) {
            targetWidth = targetHeight * ratio;
        } else {
            targetHeight = targetWidth / ratio;
        }

        // S'assurer que les dimensions ne sont pas négatives ou trop petites
        targetWidth = Math.max(targetWidth, 1);
        targetHeight = Math.max(targetHeight, 1);

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        if (!ctx) return;
        // Dessiner l'image redimensionnée
        ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

        // Retourner le résultat sous forme de DataURL si nécessaire
        return canvas.toDataURL('image/png');
    };

    const CreateWatermarkedText = (
        text: string,
        isImageSize: NewImageSize,
        color = 'rgb(255, 255, 255)',
        fontSize = 40,
        callback: (watermarkedText: string | null) => void
    ) => {
        // Dimensions de l'image
        const canvasWidth = isImageSize.w + ArrayExpand[ArrayExpand.length - 1];
        const canvasHeight = isImageSize.h + ArrayExpand[ArrayExpand.length - 1];

        // Créez un élément canvas
        const canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            console.error("Impossible d'obtenir le contexte de rendu pour le canvas.");
            return callback(null);
        }

        // Définir le style du texte
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Mesurez la largeur du texte
        const textWidth = ctx.measureText(text).width;
        const margin = textWidth; // Assurez-vous que l'espacement est suffisant

        // Angle de rotation
        const angle = -Math.PI / 4;

        // Dessiner les filigranes à plusieurs positions
        for (let y = fontSize; y < canvas.height + margin; y += margin) {
            for (let x = textWidth / 2; x < canvas.width + margin; x += margin) {
                ctx.save(); // Sauvegarder l'état du contexte
                ctx.translate(x, y); // Déplacer le point de référence au centre du texte
                ctx.rotate(angle); // Appliquer la rotation
                ctx.fillText(text, 0, 0); // Dessiner le texte
                ctx.restore(); // Restaurer l'état précédent du contexte
            }
        }

        // Convertir le canvas en une image PNG
        const dataURL = canvas.toDataURL('image/png');
        callback(dataURL);
    };

    function createRotatedGradient(ctx: CanvasRenderingContext2D, width: number, height: number, angle: number, colorStart: string, colorEnd: string) {
        // Convertir l'angle en radians
        const radians = -angle * Math.PI / 180;

        // Calculer les coordonnées du point final après rotation
        const centerX = width / 2;
        const centerY = height / 2;
        const halfDiagonal = Math.sqrt((width * width) + (height * height)) / 2;

        const startX = centerX - Math.sin(radians) * halfDiagonal;
        const startY = centerY - Math.cos(radians) * halfDiagonal;

        const endX = centerX + Math.sin(radians) * halfDiagonal;
        const endY = centerY + Math.cos(radians) * halfDiagonal;

        // Créer un dégradé linéaire avec les nouvelles coordonnées
        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, colorStart);
        gradient.addColorStop(1, colorEnd);

        return gradient;
    }

    const RenderingPicture = async (
        isNewImage: string,
        isRenderingOption: RenderingOption,
        isLayers: LayerElement[],
        drawingExpandImg: ExpandImg,
        systemShadow: SystemShadow,
        isBlanket: Blanket,
        systemSetting: SystemSettings,
        drawFiligrane: DrawFiligrane,
        callback: (img: string | null) => void
    ) => {

        try {
            const img = await new window.Image();
            img.src = isNewImage;
            img.onload = async () => {

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d', { willReadFrequently: true });

                if (!ctx) {
                    console.error("An error occurred");
                    return callback(null);
                }


                const image = { width: img.width, height: img.height };


                canvas.width = image.width + drawingExpandImg.expand;
                canvas.height = image.height + drawingExpandImg.expand;


                if (drawingExpandImg.bgType === 'bgActiveColor') {
                    ctx.fillStyle = drawingExpandImg.bgColor;
                    ctx.fillRect(0, 0, image.width + drawingExpandImg.expand, image.height + drawingExpandImg.expand);
                }


                //// Taille de l'élément
                const shadowX = 0;
                const shadowY = 0;
                const shadowWidth = image.width + drawingExpandImg.expand;
                const shadowHeight = image.height + drawingExpandImg.expand;
                const shadowSize = systemShadow.size;
                const shadowColorImg = hexToRgba(systemShadow.color.colorImg, 1);
                const shadowColorExpand = hexToRgba(systemShadow.color.colorExpand, 1);
                const shadowColorOutsideImg = hexToRgba(systemShadow.color.colorOutsideImg, 1);

                const shadowColorTransparentImg = hexToRgba(systemShadow.color.colorImg, 0);
                const shadowColorTransparentExpand = hexToRgba(systemShadow.color.colorExpand, 0);
                //const shadowColorTransparentOutsideImg = hexToRgba(systemShadow.color.colorOutsideImg, 0);




                if (drawingExpandImg.bgType === 'bgActiveImage') {

                    const bgImage = new Image();
                    bgImage.src = drawingExpandImg.bgExpand;


                    const canvasWidthExpanded = image.width + drawingExpandImg.expand;
                    const canvasHeightExpanded = image.height + drawingExpandImg.expand;
                    // Dimensions de l'image de fond
                    const imageWidth = bgImage.width;
                    const imageHeight = bgImage.height;

                    // Calculer les ratios pour ajuster l'image au canevas
                    const canvasAspect = canvasWidthExpanded / canvasHeightExpanded;
                    const imageAspect = imageWidth / imageHeight;

                    let drawWidth, drawHeight, offsetX, offsetY;

                    if (canvasAspect < imageAspect) {
                        // La largeur du canevas est plus grande proportionnellement que la hauteur
                        drawHeight = canvasHeightExpanded;
                        drawWidth = drawHeight * imageAspect;
                        offsetX = (canvasWidthExpanded - drawWidth) / 2;
                        offsetY = 0;
                    } else {
                        // La hauteur du canevas est plus grande proportionnellement que la largeur
                        drawWidth = canvasWidthExpanded;
                        drawHeight = drawWidth / imageAspect;
                        offsetX = 0;
                        offsetY = (canvasHeightExpanded - drawHeight) / 2;
                    }

                    // Application des filtres
                    ctx.filter = `
                            brightness(${drawingExpandImg.expandFilter.brightness}%)
                            contrast(${drawingExpandImg.expandFilter.contrast}%)
                            saturate(${drawingExpandImg.expandFilter.saturation}%)
                            sepia(${drawingExpandImg.expandFilter.sepia}%)
                            hue-rotate(${drawingExpandImg.expandFilter.hue}deg)
                            blur(${drawingExpandImg.expandFilter.blur}px)
                            grayscale(${drawingExpandImg.expandFilter.grayscale}%)
                            invert(${drawingExpandImg.expandFilter.invert}%)
                        `;

                    // Choix de l'image à dessiner
                    const imageToDraw = bgImage || image;

                    // Dessiner l'image sur le canevas
                    ctx.drawImage(imageToDraw, offsetX, offsetY, drawWidth, drawHeight);
                }

                if (isBlanket.expand) {
                    if (!isBlanket.transparent1 || !isBlanket.transparent2) {
                        ctx.save();
                        const gradient = createRotatedGradient(
                            ctx,
                            image.width + drawingExpandImg.expand,
                            image.height + drawingExpandImg.expand,
                            isBlanket.rotate, // Angle de rotation en degrés
                            !isBlanket.transparent2 ? isBlanket.color2 : 'transparent',
                            !isBlanket.transparent1 ? isBlanket.color1 : 'transparent'
                        );

                        //const position = !isBlanket.expand ? (ArrayExpand[ArrayExpand.length - 1] - drawingExpandImg.expand) / 2 : 0;


                        ctx.fillStyle = gradient; // Appliquer le dégradé comme style de remplissage
                        ctx.globalAlpha = isBlanket.opacity;
                        ctx.fillRect(0, 0, image.width + drawingExpandImg.expand, image.height + drawingExpandImg.expand);
                        ctx.restore();
                    }
                }

                if (systemShadow.type.outsideImg) {
                    ctx.save();
                    ctx.filter = 'none';
                    ctx.fillStyle = shadowColorOutsideImg;
                    ctx.filter = `blur(${systemShadow.blur.OutsideImgBlur ? shadowSize.sizeOutsideImg / 2 : 0}px)`;
                    ctx.fillRect((drawingExpandImg.expand - shadowSize.sizeOutsideImg * 2) / 2 + systemShadow.width.OutsideImgWidth, (drawingExpandImg.expand - shadowSize.sizeOutsideImg * 2) / 2 + systemShadow.height.OutsideImgHeight, image.width + (shadowSize.sizeOutsideImg * 2), image.height + (shadowSize.sizeOutsideImg * 2));
                    ctx.restore();
                }


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

                ctx.drawImage(img, drawingExpandImg.expand / 2, drawingExpandImg.expand / 2);

                // Réinitialiser le filtre pour ne pas affecter les images overlay
                ctx.filter = 'none';


                if (!isBlanket.transparent1 || !isBlanket.transparent2) {
                    ctx.save();
                    const expand = isBlanket.expand ? drawingExpandImg.expand : 0
                    const gradient = createRotatedGradient(
                        ctx,
                        image.width + expand,
                        image.height + expand,
                        isBlanket.rotate, // Angle de rotation en degrés
                        !isBlanket.transparent2 ? isBlanket.color2 : 'transparent',
                        !isBlanket.transparent1 ? isBlanket.color1 : 'transparent'
                    );


                    //const expandSize = isBlanket.expand ? drawingExpandImg.expand : 0

                    const position = (ArrayExpand[ArrayExpand.length - 1] - drawingExpandImg.expand) / 2;


                    ctx.fillStyle = gradient; // Appliquer le dégradé comme style de remplissage
                    ctx.globalAlpha = isBlanket.opacity;
                    ctx.fillRect(position, position, image.width, image.height);
                    ctx.restore();
                }


                if (systemShadow.type.insetImg) {
                    // Main image shadow
                    drawInsetShadow(ctx, drawingExpandImg.expand / 2, drawingExpandImg.expand / 2, image.width, image.height, shadowSize.sizeImg, shadowColorImg, shadowColorTransparentImg);
                }

                // Dessiner chaque élément de manière asynchrone
                await Promise.all(
                    isLayers?.map(async (el) => {
                        ctx.save(); // Sauvegarder l'état actuel du contexte

                        if (el.layerType === "overlay") {
                            await drawOverlayImg(ctx, drawingExpandImg.expand, el);
                        }

                        if (el.layerType === "overlay-svg") {
                            await drawOverlayImgSvg(ctx, drawingExpandImg.expand, el);
                        }

                        if (el.layerType === "draw") {
                            await drawOverlayDrawing(ctx, img, drawingExpandImg.expand, el);
                        }

                        ctx.restore(); // Restaurer l'état précédent du contexte
                    }) || []
                );

                if (systemShadow.type.insetExpand) {
                    // Main image shadow
                    drawInsetShadow(ctx, shadowX, shadowY, shadowWidth, shadowHeight, shadowSize.sizeExpand, shadowColorExpand, shadowColorTransparentExpand);
                }

                // Applique le filtre de netteté
                if (ctx && isRenderingOption.sharpenImg) {
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const sharpenedData = applySharpenFilter(imageData);
                    ctx.putImageData(sharpenedData, 0, 0);
                }

                if (drawFiligrane.img) {
                    const image = new Image();
                    image.src = drawFiligrane.img;

                    const position = (ArrayExpand[ArrayExpand.length - 1] - drawingExpandImg.expand) / 2;

                    ctx.globalAlpha = drawFiligrane.opacity;
                    // Dessiner l'image sur le canvas
                    ctx.drawImage(image, -position, -position);
                }

                ctx.restore();

                ctx.imageSmoothingEnabled = isRenderingOption.smoothImg;  // Activer le lissage
                ctx.imageSmoothingQuality = 'high';

                // Obtenir l'image en base64 après que le filigrane soit ajouté
                const imgData = canvas.toDataURL('image/png');


                // Vérifier si l'image est significative et effectuer un redimensionnement si nécessaire
                if (isSignificantImage(canvas)) {


                    if (isRenderingOption.reziseImg) {
                        const image = new Image();
                        image.src = imgData;
                        image.onload = async () => {
                            const resizedImage = resizeImage(image, drawingExpandImg.expand, isRenderingOption);
                            return callback(resizedImage || "");
                        };
                    } else {
                        return callback(imgData || "");
                    }
                } else {
                    console.error("An error occurred");
                    return callback(null);
                }
            }
        } catch (err) {
            console.error("An error occurred");
            return callback(null);
        }
    };

    return {
        isSignificantImage,
        drawOverlayImg,
        drawInsetShadow,
        drawOutsideShadow,
        applySharpenFilter,
        resizeImage,
        RenderingPicture,
        CreateWatermarkedText
    }
}