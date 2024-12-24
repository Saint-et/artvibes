// Définir la fonction canvasToBlob avec les types TypeScript
//export function CanvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
//  return new Promise((resolve, reject) => {
//    canvas.toBlob((blob) => {
//      if (blob) {
//        resolve(blob);
//      } else {
//        reject(new Error('Canvas to Blob conversion failed.'));
//      }
//    });
//  });
//}

import { EditorState, SelectionState } from "draft-js";
import { LayerElement, NewImageSize } from "./interface";
import { ArrayExpand } from "@/public/assets/data/data";

// Fonction pour télécharger une image à partir d'une dataURL
export function downloadImage(dataURL: string, fileName: string, format: string) {
  if (format === 'jpg/jpeg') {
    // Créer une nouvelle image
    const image = new Image();
    image.src = dataURL;
    image.onload = async () => {

      // Convertir l'image en JPEG via le canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) return

      // Dessiner l'image dans le canvas pour la convertir en JPEG
      canvas.width = image.width;
      canvas.height = image.height;

      context.fillStyle = '#000000';
      context.fillRect(0, 0, image.width, image.height);

      context.drawImage(image, 0, 0);

      // Convertir le canvas en JPEG
      const imageURL = canvas.toDataURL('image/jpeg');

      // Créer un lien de téléchargement pour l'image JPEG
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = fileName;
      // Ajouter le lien au document
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  if (format === 'png') {
    // Créer un lien <a> temporaire
    const link = document.createElement('a');

    // Définir l'URL du lien comme le dataURL de l'image
    link.href = dataURL;

    // Définir le nom du fichier téléchargé
    link.download = fileName;

    // Ajouter le lien au document
    document.body.appendChild(link);

    // Simuler un clic sur le lien pour déclencher le téléchargement
    link.click();

    // Retirer le lien du document après le téléchargement
    document.body.removeChild(link);
  }
}

export function hexToRgba(hex: string, alpha: number): string {
  // Supprimer le symbole '#' si présent
  hex = hex.replace(/^#/, '');

  // Convertir les valeurs hex en décimal
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Retourner le format RGBA
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function rgbToHex(rgb: any) {
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


export function extractBoxShadowColor(boxShadow: any) {
  // Utiliser une expression régulière pour capturer la couleur RGB ou RGBA
  const colorMatch = boxShadow.match(/rgba?\(\d+, \d+, \d+(, \d+)?\)/);
  return colorMatch ? rgbToHex(colorMatch[0]) : null;
}


export const generateRandomId = () => {
  return Math.floor(Math.random() * 1000000) + Date.now();
};

const handleFindOneElement = (array: any[], id: any, idName: string, symbole: string) => {
  let layerFind
  if (symbole === '===') {
    layerFind = array.find((el: any) => el[idName] === id);
  } else {
    layerFind = array.find((el: any) => el[idName] !== id);
  }
  return layerFind;
};

// Calculer le ratio d'aspect pour maintenir les proportions
export function resizeImageBase64(base64Image: string, targetWidth = 200, callback: (resizedBase64: string | null) => void) {
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

export function resizeNewImageBase64(base64Image: string, targetWidth = 200, targetHeight = 200, callback: (resizedBase64: string | null) => void) {
  const img = new Image();
  img.src = base64Image;  // Charger l'image en base64

  img.onload = () => {

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


export function loadImageToCanvas(imageSrc: string, callback: (canvas: HTMLCanvasElement) => void) {
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

export function hasTransparency(image: HTMLImageElement): Promise<boolean> {
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

// Fonction pour récupérer les valeurs CSS des styles appliqués au curseur
export const getStylesValuesAtCursor = (editorState: EditorState, customStyleSelectionMap: any): Record<string, string | undefined> | undefined => {
  const selectionState: SelectionState = editorState.getSelection();

  // Vérifiez que le curseur est bien placé sans texte sélectionné
  if (!selectionState.isCollapsed()) {
    //console.warn("Le curseur n'est pas placé à un seul endroit.");
    return undefined;
  }

  //const contentState: ContentState = editorState.getCurrentContent();
  //const blockKey = selectionState.getStartKey();
  //const block = contentState.getBlockForKey(blockKey);
  //const offset = selectionState.getStartOffset();

  // Récupérer les styles actifs à la position du curseur
  const currentInlineStyle = editorState.getCurrentInlineStyle();

  // Convertir les styles en valeurs CSS
  const stylesValues = currentInlineStyle.reduce<Record<string, string | undefined>>(
    (acc: any, style: any) => {
      const styleValue = customStyleSelectionMap[style as keyof typeof customStyleSelectionMap];
      if (styleValue) {
        Object.assign(acc, styleValue);
      }
      return acc;
    },
    {}
  );

  return stylesValues;
};

//  const handleDownload = async (e: string) => {
//    // Hide any UI elements related to the download process
//    //setIsVisible(false);
//
//
//    try {
//        // Download the image data from the URL
//        const response = await fetch(e);
//        const imageBlob = await response.blob();
//
//        // Create a URL for the blob
//        const imageUrl = window.URL.createObjectURL(imageBlob);
//
//        // Extract filename from the URL
//        const filename1 = e.split(`${REACT_APP_URL}`)[1];
//        const filename2 = filename1.split('/')[0];
//        const filename = e.split(`/${filename2}/`)[1];
//
//        // Create a link element for downloading the image
//        const link = document.createElement('a');
//        link.href = imageUrl; // Set the URL to the blob
//        link.download = filename; // Set the filename for the downloaded file
//        document.body.appendChild(link); // Append the link to the document body
//        link.click(); // Simulate a click on the link to initiate download
//        document.body.removeChild(link); // Remove the link from the document body after download
//        addErrorMessage(`L'image à bien été téléchagé.`, 5000, '#396afc')
//    } catch (error) {
//        // Handle any errors that occur during the download process
//        console.error('Error while downloading the image:', error);
//    }
//};
