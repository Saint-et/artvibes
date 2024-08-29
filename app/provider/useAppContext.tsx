"use client";

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Définissez le type de votre contexte
type AppContextType = {
  // Définissez les propriétés de votre contexte ici
  //image: string | undefined;
  handleViewImage?: (src: string) => void;
  setSrcImg: Dispatch<SetStateAction<string | undefined>>;
  srcImg: string | undefined;
  systemDetectMobile: boolean | false;
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
    //console.log('ukiufhjk');
  };

  useEffect(() => {
    const isMobileDevice = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // Utilisation de la fonction
    if (isMobileDevice()) {
        setSystemDetectMobile(true)
    } else {
        setSystemDetectMobile(false)
    }
}, [])

  return (
    <AppContext.Provider
      value={{
        handleViewImage,
        setSrcImg,
        srcImg,
        systemDetectMobile
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
