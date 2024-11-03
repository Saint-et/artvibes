import { SystemCoverDrawing, SystemDefaultDrawing, SystemDefaultDrawingIA, SystemDefaultDrawingLearn, SystemDrawingAboutDrawing, SystemDrawingDiscoverModel, SystemDrawingVideoToGif, SystemNewProjectDrawing } from "@/public/assets/data/data";
import { LoadedImage } from "@/utils/interface";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";




export default function useDrawingLoading() {

    const arrayToLoad: StaticImageData[] = [SystemCoverDrawing, SystemDefaultDrawing, SystemDefaultDrawingIA, SystemDefaultDrawingLearn, SystemNewProjectDrawing, SystemDrawingDiscoverModel, SystemDrawingAboutDrawing, SystemDrawingVideoToGif]

    const [isDrawingLoad, setDrawingLoad] = useState<LoadedImage>({
        load: false,
        home: true,
        stateLoad: '',
        bgHome: '',
        bgHomeNegative: '',
        defaultImage: '',
        IAImage: '',
        LearnImage: '',
        newProject: '',
        discoverModel: '',
        aboutDrawing: '',
        videoToGif: '',
    });


    const loadImage = (el: StaticImageData): Promise<StaticImageData> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = el.src; // Accéder au chemin de l'image
            img.onload = () => resolve(el); // Résoudre la promesse avec l'objet `el`
        });
    };


    useEffect(() => {
        const images = Promise.all(
            arrayToLoad.map(el => loadImage(el))
        );
        //console.log('start')
        setDrawingLoad((prevState) => ({
            ...prevState,
            stateLoad: 'start',
        }));

        images.then((loadedImages: StaticImageData[]) => {
            // Première mise à jour après 3 secondes
            setDrawingLoad((prevState) => ({
                ...prevState,
                stateLoad: 'initializing',
                bgHome: loadedImages[0].src,
                defaultImage: loadedImages[1].src,
                IAImage: loadedImages[2].src,
                LearnImage: loadedImages[3].src,
                newProject: loadedImages[4].src,
                discoverModel: loadedImages[5].src,
                aboutDrawing: loadedImages[6].src,
                videoToGif: loadedImages[7].src,
            }));
            //console.log('initializing');
            // Deuxième mise à jour après 5 secondes
            setTimeout(() => {
                //console.log('ready');

                setDrawingLoad((prevState) => ({
                    ...prevState,
                    stateLoad: 'ready',
                    load: true,
                    home: true,
                }));
            }, 1000); // 5000
        }).catch(error => {
            console.error('Erreur lors du chargement des images:', error);
        });
    }, [])


    return {
        setDrawingLoad,
        isDrawingLoad
    }

}