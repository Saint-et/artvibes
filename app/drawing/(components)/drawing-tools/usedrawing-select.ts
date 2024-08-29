import { useState } from "react";

type SelectCreativesHook = {
    handleMouseDown: (e: React.MouseEvent) => void;
    handleMouseMove: (e: React.MouseEvent) => void;
    handleMouseUp: () => void;
    startX: number | 0;
    startY: number | 0;
    endX: number | 0;
    endY: number | 0;
    selecting: boolean;
    setStartX: React.Dispatch<React.SetStateAction<number | 0>>;
    setStartY: React.Dispatch<React.SetStateAction<number | 0>>;
    setEndX: React.Dispatch<React.SetStateAction<number | 0>>;
    setEndY: React.Dispatch<React.SetStateAction<number | 0>>;
    setSelecting: React.Dispatch<React.SetStateAction<boolean>>;
    isSelectArea: boolean;
    setSelectArea: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function useSelectDrawing(): SelectCreativesHook {
    const [startX, setStartX] = useState<number | 0>(0);
    const [startY, setStartY] = useState<number | 0>(0);
    const [endX, setEndX] = useState<number | 0>(0);
    const [endY, setEndY] = useState<number | 0>(0);
    const [selecting, setSelecting] = useState<boolean>(false);
    const [isSelectArea, setSelectArea] = useState<boolean>(false);

    const handleMouseDown = (e: React.MouseEvent) => {
        setSelecting(true);
        setStartX(e.clientX);
        setStartY(e.clientY);
        setEndX(e.clientX);
        setEndY(e.clientY);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (selecting) {
            setEndX(e.clientX);
            setEndY(e.clientY);
        }
    };

    const handleMouseUp = () => {
        setSelecting(false);
        setSelectArea(false)
        setStartX(0);
        setStartY(0);
        setEndX(0);
        setEndY(0);
    };

    return {
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
    };
}
