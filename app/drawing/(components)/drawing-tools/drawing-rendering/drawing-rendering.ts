import { IsNewOverlaySave, RenderingOption } from "@/utils/interface";


type LoadedImage = {
    img: HTMLImageElement;
    el: IsNewOverlaySave;
};

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


    const drawOverlayImg = (ctx: CanvasRenderingContext2D, drawingExpandImg: number, images: LoadedImage[]) => {

        ctx.save();  // Sauvegarder l'état actuel du contexte

        images?.map(({ img, el }) => {
            ctx.save();  // Sauvegarder l'état actuel du contexte

            const smallImage = img;

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
            const cropX = (el.cropY / 100) * (sourceWidth - cropWidth);
            const cropY = (el.cropY / 100) * (sourceHeight - cropHeight);
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
        });
        ctx.restore();  // Restaurer l'état précédent du contexte
    }


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
        ctx.imageSmoothingEnabled = isRenderingOption.smoothImg;  // Activer le lissage
        ctx.imageSmoothingQuality = 'high';
        // Dessiner l'image redimensionnée
        ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

        // Retourner le résultat sous forme de DataURL si nécessaire
        return canvas.toDataURL('image/png');
    };

    return {
        isSignificantImage,
        drawOverlayImg,
        drawInsetShadow,
        drawOutsideShadow,
        applySharpenFilter,
        resizeImage
    }
}