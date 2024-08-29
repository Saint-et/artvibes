import React, { MutableRefObject } from "react";
import Rich_text from "./rich_text";
import { ResizeDirection } from "@/utils/type";
import { DrawText } from "@/utils/interface";
  

// Interface des propriétés du composant
interface TextEditDrawingProps {
  textCanvasVisible: boolean;
  setDrawText: React.Dispatch<React.SetStateAction<any>>;
  textCanvasRef: React.RefObject<HTMLDivElement>;
  drawText: DrawText;
  drawArea: {
    positionX: number;
    positionY: number;
    width: number;
    height: number;
    leftOffset: number;
    topOffset: number;
  };
  textCanvasContainerRef: MutableRefObject<HTMLDivElement | null>;
  handleMouseDownResizing: (
    e: React.MouseEvent,
    direction: ResizeDirection
  ) => void;
}

const TextEditDrawing: React.FC<TextEditDrawingProps> = (props) => {
  if (!props.textCanvasVisible) return null;

  return (
    <div
      ref={props.textCanvasContainerRef}
      style={{
        zIndex: 1000,
        position: "absolute",
        left: props.drawArea.positionX,
        top: props.drawArea.positionY,
        width: "auto",
        height: "auto",
      }}
    >
      <div
        className="resizable-box"
        style={{
          width: `${props.drawArea.width}px`,
          height: `${props.drawArea.height}px`,
          transform: `translate(${props.drawArea.leftOffset}px, ${props.drawArea.topOffset}px)`,
          border: "2px solid #006aff",
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Handles for resizing */}
        <div
          className="drag-handle-side drag-handle-side-top"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "top")}
        />
        <div
          className="drag-handle-side drag-handle-side-bottom"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "bottom")}
        />
        <div
          className="drag-handle-side drag-handle-side-left"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "left")}
        />
        <div
          className="drag-handle-side drag-handle-side-right"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "right")}
        />

        <div
          className="drag-handle drag-handle-top-left"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "left-top")}
        />
        <div
          className="drag-handle drag-handle-top-right"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "right-top")}
        />
        <div
          className="drag-handle drag-handle-bottom-left"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "left-bottom")}
        />
        <div
          className="drag-handle drag-handle-bottom-right"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "right-bottom")}
        />

        {/* Handles for moving */}
        <div
          className="drag-handle-content drag-handle-content-right"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "top-move")}
        />
        <div
          className="drag-handle-content drag-handle-content-bottom"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "top-move")}
        />
        <div
          className="drag-handle-content drag-handle-content-left"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "top-move")}
        />
        <div
          className="drag-handle-content drag-handle-content-top"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "top-move")}
        />

        {/* Si vous avez un composant Rich_text, vous pouvez l'ajouter ici */}
        <Rich_text
          textCanvasRef={props.textCanvasRef}
          drawText={props.drawText}
          setDrawText={props.setDrawText}
        />
      </div>
    </div>
  );
};

export default TextEditDrawing;
