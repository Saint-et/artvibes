import {
  DrawArea,
  DrawDrawing,
  DrawNowInterface,
  ExpandImg,
  IsNewImage,
  NewImageSize,
} from "@/utils/interface";
import { DrawTypeNowCanvas, ResizeDirection } from "@/utils/type";
import React, { MutableRefObject, useEffect, useState } from "react";

// Interface des propriétés du composant
interface TextEditDrawingProps {
  isMenuOpen: number;
  textCanvasRef: React.RefObject<HTMLDivElement>;
  drawArea: DrawArea;
  textCanvasContainerRef: MutableRefObject<HTMLDivElement | null>;
  handleMouseDownResizing: (
    e: React.MouseEvent,
    direction: ResizeDirection
  ) => void;
  zoom: number[];
  isNewImage: IsNewImage;
  isImageSize: NewImageSize;
  drawingExpandImg: ExpandImg;
  isFreeAreaCrop: boolean;
  imageRef: MutableRefObject<HTMLDivElement | null>;
  drawDrawing: DrawDrawing;
  canvasDrawRef: MutableRefObject<HTMLCanvasElement | null>;

  isDrawingNowCanvas: DrawNowInterface;
  startDrawingNowCanvas: (e: React.MouseEvent) => void;
  drawNowCanvas: (e: React.MouseEvent, expand: number) => void;
  stopDrawingNowCanvas: () => void;
  DrawCanvasImg: () => void;
  RestartDrawingNowCanvas: (e: React.MouseEvent, expand: number) => void;
  BreakDrawingNowCanvas: () => void;
  zIndex: number | null;
  //alertStart: () => boolean;
  expand: number;
}

const DrawingArea: React.FC<TextEditDrawingProps> = (props) => {
  // State pour stocker la position de la souris
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorIn, setcursorIn] = useState<boolean>(false);

  // Fonction qui met à jour la position de la souris
  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!props.imageRef.current) return;
    // Supposons que vous ayez un élément DOM `element`
    const rect = props.imageRef.current.getBoundingClientRect();

    setPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const expand = props.expand;

  if (props.isMenuOpen === 5) return null;
  if (props.isMenuOpen !== 4) return null;
  if (props.isDrawingNowCanvas.id === null) return null;

  return (
    <>
      <div
        ref={props.textCanvasContainerRef}
        style={{
          zIndex: 1200,
          position: "absolute",
          left: (-expand / 2) + (props.drawingExpandImg.expand / 2),
          top: (-expand / 2) + (props.drawingExpandImg.expand / 2),
          width: `${props.isImageSize.w + expand}px`,
          height: `${props.isImageSize.h + expand}px`,
          cursor: "crosshair",
        }}
        onMouseEnter={(e) => {
          setcursorIn(true);
          props.RestartDrawingNowCanvas(e, expand);
        }}
        onMouseLeave={() => {
          setcursorIn(false);
        }}
        onMouseMove={(e) => {
          props.drawNowCanvas(e, expand);
          handleMouseMove(e);
        }}
      >
        <svg
          width="100%" // Ajusté à 100% pour s'adapter à la largeur du conteneur parent
          height="100%" // Ajusté à 100% pour s'adapter à la hauteur du conteneur parent
          viewBox={`0 0 ${props.isImageSize.w + expand} ${
            props.isImageSize.h + expand
          }`} // Le viewBox est ajusté pour correspondre aux dimensions de la zone de dessin
          style={{
            position: "absolute",
            //cursor: "none",
          }}
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
        {cursorIn && (
          <>
            {props.isDrawingNowCanvas.type && (
              <div
                className="flex justify-center items-center text-black"
                style={{
                  zIndex: 1200,
                  position: "fixed", // La position doit être fixe pour suivre la souris
                  top: `${
                    position.y / props.zoom[0] - props.drawDrawing.thickness / 2
                  }px`, // Ajuster pour centrer le cercle
                  left: `${
                    position.x / props.zoom[0] - props.drawDrawing.thickness / 2
                  }px`, // Ajuster pour centrer le cercle
                  width: props.drawDrawing.thickness,
                  height: props.drawDrawing.thickness,
                  backgroundColor:
                    props.isDrawingNowCanvas.type === "eraser"
                      ? "#ffffffcc"
                      : props.drawDrawing.color,
                  border:
                    props.isDrawingNowCanvas.type === "eraser"
                      ? "2px solid #000000"
                      : "none",
                  borderRadius: "50%",
                }}
              />
            )}
          </>
        )}
      </div>

      <canvas
        ref={props.canvasDrawRef}
        width={props.isImageSize.w + expand}
        height={props.isImageSize.h + expand}
        style={{
          zIndex: props.zIndex === null ? 900 : 50,
          position: "absolute",
          left: -(expand / 2) + (props.drawingExpandImg.expand / 2),
          top: -(expand / 2) + (props.drawingExpandImg.expand / 2),
        }}
      />
    </>
  );
};

export default DrawingArea;
