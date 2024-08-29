import { DrawArea, NewImageSize } from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";
import { useEffect, useRef, useState } from "react";





export default function UseAreaDrawCreative() {
  const [zoom, setZoom] = useState<number[]>([0.5]);
  const [isResizing, setIsResizing] = useState<ResizeDirection>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textCanvasContainerRef = useRef<HTMLDivElement | null>(null);
  const overlayAreaRef = useRef<HTMLDivElement | null>(null);
  const [isImageSize, setImageSize] = useState<NewImageSize>({
    w: 0,
    h: 0,
  });

  // Text
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [leftOffset, setLeftOffset] = useState(0);
  const [topOffset, setTopOffset] = useState(0);

  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const [drawArea, setDrawArea] = useState<DrawArea>({
    width: 300,
    height: 200,
    leftOffset: 0,
    topOffset: 0,
    positionX: 0,
    positionY: 0,

  });


  //props.setDrawArea({
  //  width: props.isImageSize.w,
  //  height: props.isImageSize.h,
  //  leftOffset: 0,
  //  topOffset: 0,
  //  positionX: 22,
  //  positionY: 22,
  //});

  const handleSettDrawArea = (el: DrawArea) => {

    setDrawArea({
      width: el.width,
      height: el.height,
      leftOffset: el.leftOffset,
      topOffset: el.topOffset,
      positionX: el.positionX,
      positionY: el.positionY
    })
  }

  const handleMouseDownResizing = (
    e: React.MouseEvent,
    direction: ResizeDirection
  ) => {
    e.preventDefault();
    setIsResizing(direction);
    setStartPosition({
      x: e.clientX,
      y: e.clientY,
    });

  };

  const handleMouseUpResizing = () => {
    setIsResizing(null);
  };

  const handleMouseMoveResizing = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isResizing) return;


    const minSize = 30;

    const dx = e.clientX - startPosition.x;
    const dy = e.clientY - startPosition.y;

    const deltaX = dx / zoom[0];
    const deltaY = dy / zoom[0];


    switch (isResizing) {
      case "right-bottom":
        const newBottomR = Math.max(drawArea.height + deltaY, minSize);
        const newRightB = Math.max(drawArea.width + deltaX, minSize);
        if (newRightB > minSize && newBottomR > minSize) {
          setDrawArea({
            ...drawArea,
            width: newRightB,
            height: newBottomR,
          });
        }
        break;
      case "left-bottom":
        const newBottomL = Math.max(drawArea.height + deltaY, minSize);
        const newLeftB = Math.max(drawArea.width - deltaX, minSize);
        if (newLeftB > minSize && newBottomL > minSize) {
          setDrawArea({
            ...drawArea,
            width: newLeftB,
            height: newBottomL,
            leftOffset: drawArea.leftOffset + deltaX,
          });
        }
        break;
      case "left-top":
        const newLeftT = Math.max(drawArea.width - deltaX, minSize);
        const newTopL = Math.max(drawArea.height - deltaY, minSize);
        if (newTopL > minSize && newLeftT > minSize) {
          setDrawArea({
            ...drawArea,
            height: newTopL,
            width: newLeftT,
            topOffset: drawArea.topOffset + deltaY,
            leftOffset: drawArea.leftOffset + deltaX,
          });
        }
        break;
      case "right-top":
        const newRightT = Math.max(drawArea.width + deltaX, minSize);
        const newTopR = Math.max(drawArea.height - deltaY, minSize);
        if (newTopR > minSize && newRightT > minSize) {
          setDrawArea({
            ...drawArea,
            height: newTopR,
            width: newRightT,
            topOffset: drawArea.topOffset + deltaY,
          });
        }
        break;
      case "right":
        const newRight = Math.max(drawArea.width + deltaX, minSize);
        if (newRight > minSize) {
          setDrawArea({
            ...drawArea,
            width: newRight,
          });
        }
        break;
      case "bottom":
        const newBottom = Math.max(drawArea.height + deltaY, minSize);
        if (newBottom > minSize) {
          setDrawArea({
            ...drawArea,
            height: newBottom,
          });
        }
        break;
      case "left":
        const newLeft = Math.max(drawArea.width - deltaX, minSize);
        if (newLeft > minSize) {
          setDrawArea({
            ...drawArea,
            width: newLeft,
            leftOffset: drawArea.leftOffset + deltaX,
          });
        }
        break;
      case "top":
        const newTop = Math.max(drawArea.height - deltaY, minSize);
        if (newTop > minSize) {

          setDrawArea({
            ...drawArea,
            height: newTop,
            topOffset: drawArea.topOffset + deltaY,
          });
        }
        break;
      case "top-move":
        setDrawArea({
          ...drawArea,
          positionX: drawArea.positionX + deltaX,
          positionY: drawArea.positionY + deltaY,
        });
        break;
      default:
        break;
    }

    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  //console.log(drawArea);



  return {
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

    setDrawArea,
    drawArea,
    handleSettDrawArea,
    startPosition,
    isResizing,
    isImageSize, setImageSize

  };
}
