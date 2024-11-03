"use client";

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  SystemCoverDrawing,
  SystemDefaultDrawing,
  SystemDefaultDrawingIA,
  SystemDefaultDrawingLearn,
  SystemDrawingAboutDrawing,
  SystemDrawingDiscoverModel,
  SystemDrawingVideoToGif,
  SystemNewProjectDrawing,
} from "@/public/assets/data/data";
import { StaticImageData } from "next/image";
import {
  Blanket,
  ExpandImg,
  IsNewImage,
  LayerElement,
  LoadedImage,
  SystemSettings,
  SystemShadow,
} from "@/utils/interface";
import {
  BlanketDefault,
  DrawingFilterDefault,
  DrawingLoadDefault,
  ExpandDefault,
  LayersDefault,
  NewImgDefault,
  SystemShadowDefault,
} from "@/public/assets/data/defaultValue-drawing";

// Définissez le type de votre contexte
type AppContextType = {
  // Définissez les propriétés de votre contexte ici
  //image: string | undefined;
  handleViewImage?: (src: string) => void;
  setSrcImg: Dispatch<SetStateAction<string | undefined>>;
  srcImg: string | undefined;
  systemDetectMobile: boolean | false;
  isDrawingLoad?: LoadedImage;
  setDrawingLoad: React.Dispatch<React.SetStateAction<LoadedImage>>;
  isNewImageImport: IsNewImage[];
  setNewImageImport: React.Dispatch<React.SetStateAction<IsNewImage[]>>;
  isNewImage: IsNewImage;
  setNewImage: React.Dispatch<React.SetStateAction<IsNewImage>>;
  handleResetDrawing: () => void;
  handleResetWorksDrawing: () => void;
  isLayers: LayerElement[];
  setLayers: React.Dispatch<React.SetStateAction<LayerElement[]>>;
  systemSetting: SystemSettings;
  setSystemSetting: React.Dispatch<React.SetStateAction<SystemSettings>>;
  systemShadow: SystemShadow;
  setSystemShadow: React.Dispatch<React.SetStateAction<SystemShadow>>;
  isBlanket: Blanket;
  setBlanket: React.Dispatch<React.SetStateAction<Blanket>>;
  drawingExpandImg: ExpandImg;
  setDrawingExpandImg: React.Dispatch<React.SetStateAction<ExpandImg>>;
};

// Créez votre contexte avec une valeur initiale nulle
export const AppContext = createContext<AppContextType | null>(null);

// Créez votre composant fournisseur qui enveloppe l'application
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Définissez vos états et vos effets ici
  // Par exemple :
  // const [state, setState] = useState<YourStateType>(initialState);
  const [srcImg, setSrcImg] = useState<string | undefined>(undefined);
  const [systemDetectMobile, setSystemDetectMobile] = useState<boolean>(false);

  // Retournez le fournisseur de contexte avec la valeur fournie

  const handleViewImage = (src: string) => {
    setSrcImg(src);
  };

  const [isLayers, setLayers] = useState<LayerElement[]>(LayersDefault);

  const [systemSetting, setSystemSetting] =
    useState<SystemSettings>(DrawingFilterDefault);
  const [systemShadow, setSystemShadow] =
    useState<SystemShadow>(SystemShadowDefault);

  const [isNewImageImport, setNewImageImport] = useState<IsNewImage[]>([]);
  const [isNewImage, setNewImage] = useState<IsNewImage>(NewImgDefault);
  const [isBlanket, setBlanket] = useState<Blanket>(BlanketDefault);
  const [drawingExpandImg, setDrawingExpandImg] =
    useState<ExpandImg>(ExpandDefault);

  const handleResetDrawing = () => {
    setSystemShadow(SystemShadowDefault);
    setSystemSetting(DrawingFilterDefault);
    setBlanket(BlanketDefault);
    setDrawingExpandImg(ExpandDefault);
    setLayers(LayersDefault);
    setNewImageImport([]);
    setNewImage(NewImgDefault);
  };
  const handleResetWorksDrawing = () => {
    setSystemShadow(SystemShadowDefault);
    setSystemSetting(DrawingFilterDefault);
    setBlanket(BlanketDefault);
    setDrawingExpandImg(ExpandDefault);
    setLayers(LayersDefault);
    setNewImage(NewImgDefault);
  };
  useEffect(() => {
    const isMobileDevice = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    };

    // Utilisation de la fonction
    if (isMobileDevice()) {
      setSystemDetectMobile(true);
    } else {
      setSystemDetectMobile(false);
    }
  }, []);

  const arrayToLoad: StaticImageData[] = [
    SystemCoverDrawing,
    SystemDefaultDrawing,
    SystemDefaultDrawingIA,
    SystemDefaultDrawingLearn,
    SystemNewProjectDrawing,
    SystemDrawingDiscoverModel,
    SystemDrawingAboutDrawing,
    SystemDrawingVideoToGif,
  ];

  const [isDrawingLoad, setDrawingLoad] =
    useState<LoadedImage>(DrawingLoadDefault);

  const loadImage = (el: StaticImageData): Promise<StaticImageData> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = el.src; // Accéder au chemin de l'image
      img.onload = () => resolve(el); // Résoudre la promesse avec l'objet `el`
    });
  };

  useEffect(() => {
    const images = Promise.all(arrayToLoad.map((el) => loadImage(el)));
    //console.log("start");
    setDrawingLoad((prevState) => ({
      ...prevState,
      stateLoad: "initializing",
    }));

    // Fonction utilitaire pour convertir un URL d'image en base64
    const toBase64FromUrl = (url: string): Promise<string> => {
      return fetch(url)
        .then((response) => response.blob())
        .then(
          (blob) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve(reader.result as string); // Résultat en base64
              };
              reader.onerror = (error) => {
                reject(error);
              };
              reader.readAsDataURL(blob); // Convertit le blob en base64
            })
        );
    };

    images
      .then(async (loadedImages: StaticImageData[]) => {
        // Convertir toutes les images en base64 via leurs URLs
        const base64Images = await Promise.all(
          loadedImages.map((img) => toBase64FromUrl(img.src))
        );

        // Première mise à jour après la conversion
        setDrawingLoad((prevState) => ({
          ...prevState,
          stateLoad: "ready",
          bgHome: base64Images[0],
          defaultImage: base64Images[1],
          IAImage: base64Images[2],
          LearnImage: base64Images[3],
          newProject: base64Images[4],
          discoverModel: base64Images[5],
          aboutDrawing: base64Images[6],
          videoToGif: base64Images[7],
        }));

        //console.log("initializing");

        // Deuxième mise à jour après 1 seconde
        setTimeout(() => {
          //console.log("ready");

          setDrawingLoad((prevState) => ({
            ...prevState,
            load: true,
            home: true,
          }));
        }, 1000); // Peut être changé à 5000 si besoin
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des images:", error);
      });
  }, []);

  return (
    <AppContext.Provider
      value={{
        handleViewImage,
        handleResetDrawing,
        setSrcImg,
        srcImg,
        systemDetectMobile,

        isDrawingLoad,
        setDrawingLoad,
        isNewImageImport,
        setNewImageImport,
        isNewImage,
        setNewImage,
        isLayers,
        setLayers,
        systemSetting,
        setSystemSetting,
        systemShadow,
        setSystemShadow,
        handleResetWorksDrawing,
        isBlanket,
        setBlanket,
        drawingExpandImg,
        setDrawingExpandImg,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Créez votre crochet personnalisé pour accéder au contexte
export const useAppContext = (): AppContextType => {
  // Utilisez useContext pour accéder au contexte
  const context = useContext(AppContext);

  // Vérifiez si le contexte est nul
  if (!context) {
    throw new Error(
      "useAppContext doit être utilisé à l'intérieur d'un AppProvider"
    );
  }

  // Retournez le contexte
  return context;
};
