import { IsNewImage } from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";
import React, { MutableRefObject } from "react";
import { FaBan } from "react-icons/fa6";
import { GiConvergenceTarget } from "react-icons/gi";

// Interface des propriétés du composant
interface TextEditDrawingProps {
  isMenuOpen: number;
  textCanvasRef: React.RefObject<HTMLDivElement>;
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
  croppedImageUrl: string | null;
  zoom: number[];
  isNewImage: IsNewImage;
}

const CropArea: React.FC<TextEditDrawingProps> = (props) => {
  const padding = {
    value: -20,
    max: -100,
  };

  const length = {
    value: 20,
  };

  const height = {
    value: 10,
  };

  if (props.isMenuOpen !== 5) return null;

  return (
    <div
      ref={props.textCanvasContainerRef}
      style={{
        zIndex: 1000,
        position: "absolute",
        left: props.drawArea.positionX,
        top: props.drawArea.positionY,
        width: `${props.drawArea.width}px`,
        height: `${props.drawArea.height}px`,
        transform: `translate(${props.drawArea.leftOffset}px, ${props.drawArea.topOffset}px)`,
        border: `${Math.max(3 / props.zoom[0], 2)}px dashed #006aff`,
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* Handles for resizing */}

      <>
        <div
          className="drag-handle-side drag-handle-side-top"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "top")}
          style={{
            //transform: `scale(${Math.max(1 / props.zoom[0], 1)})`,
            top: Math.max(
              Math.min(padding.value / props.zoom[0], padding.value),
              padding.max
            ),
            height: Math.max(height.value / props.zoom[0], height.value),
            width: Math.max(length.value / props.zoom[0], length.value),
          }}
        />
        <div
          className="drag-handle-side drag-handle-side-bottom"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "bottom")}
          style={{
            //transform: `scale(${Math.max(1 / props.zoom[0], 1)})`,
            bottom: Math.max(
              Math.min(padding.value / props.zoom[0], padding.value),
              padding.max
            ),
            height: Math.max(height.value / props.zoom[0], height.value),
            width: Math.max(length.value / props.zoom[0], length.value),
          }}
        />
        <div
          className="drag-handle-side drag-handle-side-left"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "left")}
          style={{
            //transform: `scale(${Math.max(1 / props.zoom[0], 1)})`,
            left: Math.max(
              Math.min(padding.value / props.zoom[0], padding.value),
              padding.max
            ),
            height: Math.max(length.value / props.zoom[0], length.value),
            width: Math.max(height.value / props.zoom[0], height.value),
          }}
        />
        <div
          className="drag-handle-side drag-handle-side-right"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "right")}
          style={{
            //transform: `scale(${Math.max(1 / props.zoom[0], 1)})`,
            right: Math.max(
              Math.min(padding.value / props.zoom[0], padding.value),
              padding.max
            ),
            height: Math.max(length.value / props.zoom[0], length.value),
            width: Math.max(height.value / props.zoom[0], height.value),
          }}
        />
      </>

      <>
        <div
          className="drag-handle drag-handle-top-left"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "left-top")}
          style={{
            transform: `scale(${Math.max(1 / props.zoom[0], 1)})`,
          }}
        />
        <div
          className="drag-handle drag-handle-top-right"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "right-top")}
          style={{
            transform: `scale(${Math.max(1 / props.zoom[0], 1)})`,
          }}
        />
        <div
          className="drag-handle drag-handle-bottom-left"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "left-bottom")}
          style={{
            transform: `scale(${Math.max(1 / props.zoom[0], 1)})`,
          }}
        />
        <div
          className="drag-handle drag-handle-bottom-right"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "right-bottom")}
          style={{
            transform: `scale(${Math.max(1 / props.zoom[0], 1)})`,
          }}
        />
      </>
      <div
        className="input_textareaCreative"
        style={{
          cursor: "move",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseDown={(e) => {
          props.handleMouseDownResizing(e, "top-move");
        }}
      >
        {props.croppedImageUrl ? (
          <GiConvergenceTarget style={{ color: "#006aff", fontSize: 35 }} />
        ) : (
          <FaBan style={{ color: "red", fontSize: 35 }} />
        )}
      </div>
    </div>
  );
};

export default CropArea;
