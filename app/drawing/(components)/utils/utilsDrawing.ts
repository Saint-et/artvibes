import { DrawingName } from "@/public/assets/data/data";
import { LayerElement } from "@/utils/interface";




export default function useUtilsDrawing() {

  function hexToRgba(hex: string, alpha: number): string {
    // Supprimer le symbole '#' si présent
    hex = hex.replace(/^#/, '');

    // Convertir les valeurs hex en décimal
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Retourner le format RGBA
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function rgbToHex(rgb: any) {
    // Extraire les valeurs RGB de la chaîne
    const rgbArray = rgb.match(/\d+/g).map(Number);

    // Convertir chaque composant en hex et s'assurer qu'il a 2 chiffres
    return (
      "#" +
      ((1 << 24) + (rgbArray[0] << 16) + (rgbArray[1] << 8) + rgbArray[2])
        .toString(16)
        .slice(1)
        .toUpperCase()
    );
  }
  

  function extractBoxShadowColor(boxShadow: any) {
    // Utiliser une expression régulière pour capturer la couleur RGB ou RGBA
    const colorMatch = boxShadow.match(/rgba?\(\d+, \d+, \d+(, \d+)?\)/);
    return colorMatch ? rgbToHex(colorMatch[0]) : null;
  }


  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000) + Date.now();
  };


  const SetNewImport = async (img: string) => {
    return {
      id: generateRandomId(),
      fileName: `${DrawingName}-${Date.now()}`,
      img: img,
      bgColor: "#000000",
      bgType: 'bgTransparent',
      bgExpand: img,
      expandFilter: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hue: 0,
        blur: 0,
        sepia: 0,
        grayscale: 0,
        invert: 0
      },
    }
  }

  const handleFindOneElement = (array: any[], id: any, idName: string, symbole: string) => {
    let layerFind
    if (symbole === '===') {
      layerFind = array.find((el: any) => el[idName] === id);
    } else {
      layerFind = array.find((el: any) => el[idName] !== id);
    }
    return layerFind;
  };

  //  // Calculer le ratio d'aspect pour maintenir les proportions
  //

  function resizeImageBase64(base64Image: string, targetWidth = 200, callback: (resizedBase64: string | null) => void) {
    const img = new Image();
    img.src = base64Image;  // Charger l'image en base64

    img.onload = () => {
      // Calculer le ratio d'aspect pour maintenir les proportions
      const aspectRatio = img.height / img.width;
      const targetHeight = targetWidth * aspectRatio;

      // Créer un canvas avec les nouvelles dimensions
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) return;

      // Ajuster les dimensions du canvas
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Dessiner l'image redimensionnée dans le canvas
      context.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Obtenir l'image redimensionnée sous forme de base64
      const resizedBase64 = canvas.toDataURL('image/png'); // Retourner l'image au format PNG
      callback(resizedBase64);
    };

    img.onerror = () => {
      callback(null);  // Gérer l'erreur de chargement d'image
    };
  }

  // Fonction pour supprimer un élément de LayerElement[] dans un Layer spécifique par LayerId et ElementId
  function removeElementFromLayerInLayers(layers: LayerElement[], elementId: number) {
    // Filtrer les éléments pour supprimer celui avec le ElementId donné
    const updatedElements = layers.filter(element => element.id !== elementId);

    // Si ce n'est pas le Layer recherché, le retourner tel quel
    return updatedElements;
  }

  function loadImageToCanvas(imageSrc: string, callback: (canvas: HTMLCanvasElement) => void) {
    if (imageSrc === '') return;
    // Créer un nouvel objet image
    const img = new Image();
    img.src = imageSrc; // L'image source (URL ou base64)

    img.onload = () => {
      // Créer un canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        console.error("Le contexte du canvas n'a pas pu être récupéré.");
        return;
      }

      // Définir les dimensions du canvas en fonction de l'image
      canvas.width = img.width;
      canvas.height = img.height;

      // Dessiner l'image sur le canvas
      context.drawImage(img, 0, 0);

      // Appeler le callback avec le canvas une fois l'image dessinée
      callback(canvas);
    };

    img.onerror = () => {
      console.error("L'image n'a pas pu être chargée.");
    };
  }

  function hasTransparency(image: HTMLImageElement): Promise<boolean> {
    return new Promise((resolve) => {
        // Crée un canvas temporaire
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            resolve(false);
            return;
        }

        // Ajuste la taille du canvas à celle de l'image
        canvas.width = image.width;
        canvas.height = image.height;

        // Dessine l'image sur le canvas
        ctx.drawImage(image, 0, 0);

        // Récupère les données des pixels
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        // Vérifie les valeurs du canal alpha
        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] < 255) {
                // Si le canal alpha est inférieur à 255, l'image a de la transparence
                resolve(true);
                return;
            }
        }

        // Si aucune transparence n'est trouvée
        resolve(false);
    });
}

  return {
    hexToRgba,
    rgbToHex,
    extractBoxShadowColor,
    SetNewImport,
    handleFindOneElement,
    resizeImageBase64,
    removeElementFromLayerInLayers,
    loadImageToCanvas,
    generateRandomId,
    hasTransparency

  }

}