/*

import { ArrayExpand, DrawingName } from "@/public/assets/data/data";
import { LayerElement, NewImageSize } from "@/utils/interface";
import { ContentState, EditorState, SelectionState } from "draft-js";




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

  function resizeNewImageBase64(base64Image: string, targetWidth = 200, targetHeight = 200, callback: (resizedBase64: string | null) => void) {
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

  // Fonction pour récupérer les valeurs CSS des styles appliqués au curseur
  const getStylesValuesAtCursor = (editorState: EditorState, customStyleSelectionMap: any): Record<string, string | undefined> | undefined => {
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

  return {
    hexToRgba,
    rgbToHex,
    extractBoxShadowColor,
    //SetNewImport,
    handleFindOneElement,
    resizeImageBase64,
    resizeNewImageBase64,
    removeElementFromLayerInLayers,
    loadImageToCanvas,
    generateRandomId,
    hasTransparency,
    getStylesValuesAtCursor,
    CreateWatermarkedText

  }

}
  */