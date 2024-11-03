import React, { MutableRefObject } from "react";
import Rich_text from "./rich_text";
import { ResizeDirection } from "@/utils/type";
import { DrawArea, DrawText } from "@/utils/interface";

// Interface des propriétés du composant
interface TextEditDrawingProps {
  textCanvasVisible: boolean;
  setDrawText: React.Dispatch<React.SetStateAction<any>>;
  textCanvasRef: React.RefObject<HTMLDivElement>;
  drawText: DrawText;
  drawArea: DrawArea;
  textCanvasContainerRef: MutableRefObject<HTMLDivElement | null>;
  handleMouseDownResizing: (
    e: React.MouseEvent,
    direction: ResizeDirection
  ) => void;
  zoom: number[];
  isResizing: ResizeDirection;
}

const TextEditDrawing: React.FC<TextEditDrawingProps> = (props) => {
  const padding = {
    value: 0,
    max: 0,
  };

  const length = {
    value: 10,
  };

  const height = {
    value: 10,
  };
  const paddingRotate = {
    value: -30,
    max: -300,
  };

  const lengthRotate = {
    value: 15,
  };

  const heightRotate = {
    value: 15,
  };

  if (!props.textCanvasVisible) return null;

  return (
    <div
      ref={props.textCanvasContainerRef}
      className="resizable-box"
      style={{
        zIndex: 700,
        position: "absolute",
        left: props.drawArea.positionX,
        top: props.drawArea.positionY,
        width: `${props.drawArea.width}px`,
        height: `${props.drawArea.height}px`,
        transform: `rotate(${props.drawArea.rotate}deg)`,
        transformOrigin: "center center",
        transition: !props.isResizing ? "100ms" : "0ms",
        //border: "2px solid #006aff",
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        style={{
          zIndex: 600,
          position: "absolute",
          width: `${props.drawArea.width}px`,
          height: `${props.drawArea.height}px`,
        }}
      >
        <svg
          width="100%" // Ajusté à 100% pour s'adapter à la largeur du conteneur parent
          height="100%" // Ajusté à 100% pour s'adapter à la hauteur du conteneur parent
          viewBox={`0 0 ${props.drawArea.width} ${props.drawArea.height}`}
        >
          <rect
            x="0"
            y="0"
            width="100%" // Le rect couvre 100% du SVG en largeur
            height="100%" // Le rect couvre 100% du SVG en hauteur
            fill="none"
            stroke="black"
            strokeWidth={2 / props.zoom[0]}
            strokeDasharray={`${Math.max(5 / props.zoom[0], 5)} ${Math.max(
              5 / props.zoom[0],
              5
            )}`}
          >
            <animate
              attributeName="stroke"
              values="#006aff;white;#006aff"
              dur="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to={Math.max(10 / props.zoom[0], 10)}
              dur={`${Math.max(250 / props.zoom[0], 250)}ms`}
              repeatCount="indefinite"
            />
          </rect>
        </svg>
        {/* Si vous avez un composant Rich_text, vous pouvez l'ajouter ici */}
        <Rich_text
          textCanvasRef={props.textCanvasRef}
          drawText={props.drawText}
          setDrawText={props.setDrawText}
        />
      </div>
      {/* Handles for resizing */}
      <>
        <div
          className="drag-handle-side drag-handle-side-rotate border rounded-full border-[#006aff]"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "rotate")}
          style={{
            //transform: `scale(${Math.max(1 / props.zoom[0], 1)})`,
            top: Math.max(
              Math.min(
                paddingRotate.value / props.zoom[0],
                paddingRotate.value
              ),
              paddingRotate.max
            ),
            height: Math.max(
              heightRotate.value / props.zoom[0],
              heightRotate.value
            ),
            width: Math.max(
              lengthRotate.value / props.zoom[0],
              lengthRotate.value
            ),
          }}
        />
      </>
      <>
        <div
          className="drag-handle-side drag-handle-side-top border border-[#006aff]"
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
          className="drag-handle-side drag-handle-side-bottom border border-[#006aff]"
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
          className="drag-handle-side drag-handle-side-right border border-[#006aff]"
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

      <div
        className="drag-handle-side drag-handle-side-left border border-[#006aff]"
        onMouseDown={(e) => props.handleMouseDownResizing(e, "left")}
        style={{
          //transform: `scale(${Math.max(1 / props.zoom[0], 1)})`,
          left: Math.max(
            Math.min(padding.value / props.zoom[0], padding.value),
            padding.max
          ),
          height: Math.max(length.value / props.zoom[0], length.value),
          width: Math.max(height.value / props.zoom[0], height.value),
          //transform: `rotate(${props.drawArea.rotate}deg)`
        }}
      />
      <>
        <div
          className="drag-handle drag-handle-top-left border border-[#006aff]"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "left-top")}
          style={{
            transform: `scale(${Math.max(1 / props.zoom[0], 1)})`,
          }}
        />
        <div
          className="drag-handle drag-handle-top-right border border-[#006aff]"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "right-top")}
          style={{
            transform: `scale(${Math.max(1 / props.zoom[0], 1)})`,
          }}
        />
        <div
          className="drag-handle drag-handle-bottom-left border border-[#006aff]"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "left-bottom")}
          style={{
            transform: `scale(${Math.max(1 / props.zoom[0], 1)})`,
          }}
        />
        <div
          className="drag-handle drag-handle-bottom-right border border-[#006aff]"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "right-bottom")}
          style={{
            transform: `scale(${Math.max(1 / props.zoom[0], 1)})`,
          }}
        />

        <div
          className="drag-handle-content"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "top-move")}
          style={{
            width: `${props.drawArea.width + 30}px`,
            height: `${props.drawArea.height + 30}px`,
            marginLeft: -15,
            marginTop: -15

          }}
        />
      </>
      <div
        className="absolute rounded p-2 bg-black/75 text-white"
        style={{
          opacity: props.isResizing === "rotate" ? 1 : 0,
          zIndex: 10,
          fontSize: 20,
          fontWeight: "bolder",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${
            1 / props.zoom[0]
          }) rotate(${-props.drawArea.rotate}deg)`,
        }}
      >
        {props.drawArea.rotate}°
      </div>
    </div>
  );
};

export default TextEditDrawing;
