import {
  DrawArea,
  DrawSvg,
  DrawSvgFull,
  DrawText,
  IsNewOverlay,
  LoadedImage,
  SystemSettings,
} from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { RemoveScroll } from "react-remove-scroll";
import useUtilsDrawing from "../../../utils/utilsDrawing";
import Rich_text from "../../rich_text/rich_text";
import { Editor } from "draft-js";

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
  isImgOverlay: IsNewOverlay;
  setImgOverlay: React.Dispatch<React.SetStateAction<any>>;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  systemSetting: SystemSettings;
  cropOnWheel: (event: React.WheelEvent<HTMLDivElement>) => void;
  isdisabledScroll: boolean;
  setDisabledScroll: React.Dispatch<React.SetStateAction<any>>;
  isResizing: ResizeDirection;
  isDrawingLoad: LoadedImage;
  //overlayImgRef: MutableRefObject<HTMLDivElement | null>;
  overlayImgBgRef: MutableRefObject<HTMLDivElement | null>;
  isFormCanvasVisible: string;
  drawSvg: DrawSvg;
  drawSvgFull: DrawSvgFull;
  textCanvasVisible: boolean;
  drawText: DrawText;
  setDrawText: React.Dispatch<React.SetStateAction<any>>;
  contentRichText: any;
  setContentRichText: React.Dispatch<React.SetStateAction<any>>;
  contentRichTextSave: any;
  setContentRichTextSave: React.Dispatch<React.SetStateAction<any>>;
  editorRef: React.RefObject<Editor>;
  editorState: any;
  setEditorState: React.Dispatch<React.SetStateAction<any>>;
}

const OverlayArea: React.FC<TextEditDrawingProps> = (props) => {
  const [isHiddenValueY, setHiddenValueY] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Utiliser useRef pour stocker le timer

  useEffect(() => {
    // Réinitialiser le timer si déjà défini
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setHiddenValueY(true);

    const delayInMilliseconds = 500; // 2 secondes

    // Définir un nouveau timer
    timeoutRef.current = setTimeout(() => {
      setHiddenValueY(false);
    }, delayInMilliseconds);

    // Nettoyage pour éviter les fuites de mémoire
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [props.isImgOverlay.cropY]);

  const length = {
    value: 10,
    min: 5,
  };
  const height = {
    value: 10,
    min: 5,
  };
  const paddingRotate = {
    value: -30,
    max: -300,
  };
  const lengthRotate = {
    value: 15,
    min: 10,
  };
  const heightRotate = {
    value: 15,
    min: 10,
  };

  const handleStyleForm = (form: string) => {
    //if (!props.isImgOverlay.img) return;

    if (form === "square" || form === "squareFull" || form === "squareEmpty") {
      return {
        borderRadius: 0,
      };
    } else if (
      form === "squareRounded" ||
      form === "squareRoundedFull" ||
      form === "squareRoundedEmpty"
    ) {
      return {
        borderRadius: Math.min(props.drawArea.width, props.drawArea.height) / 6,
      };
    } else if (
      form === "circle" ||
      form === "circleFull" ||
      form === "circleEmpty"
    ) {
      return {
        borderRadius: Math.min(props.drawArea.width, props.drawArea.height) / 2,
      };
    } else if (form === "squareShadow") {
      return {
        borderRadius: 0,
        ...(props.isImgOverlay.id === 0 && {
          boxShadow: `${
            props.isImgOverlay.borderColor || "#000000"
          } 0px 0px 15px 8px`,
        }),
      };
    } else if (form === "squareRoundedShadow") {
      return {
        borderRadius: Math.min(props.drawArea.width, props.drawArea.height) / 6,
        ...(props.isImgOverlay.id === 0 && {
          boxShadow: `${
            props.isImgOverlay.borderColor || "#000000"
          } 0px 0px 15px 8px`,
        }),
      };
    } else if (form === "circleShadow") {
      return {
        borderRadius: Math.min(props.drawArea.width, props.drawArea.height) / 2,
        ...(props.isImgOverlay.id === 0 && {
          boxShadow: `${
            props.isImgOverlay.borderColor || "#000000"
          } 0px 0px 15px 8px`,
        }),
      };
    }
  };

  if (props.isMenuOpen === 5) return null;
  if (
    !props.isImgOverlay.img &&
    !props.isFormCanvasVisible &&
    !props.drawSvg.svg &&
    !props.drawSvgFull.svg &&
    !props.textCanvasVisible
  )
    return null;

  return (
    <div
      ref={props.textCanvasContainerRef}
      style={{
        zIndex: 700,
        position: "absolute",
        left: props.drawArea.positionX,
        top: props.drawArea.positionY,
        width: `${props.drawArea.width}px`,
        height: `${props.drawArea.height}px`,
        transform: `rotate(${props.drawArea.rotate}deg)`,
        transformOrigin: "center center",
        //transition: !props.isResizing ? "250ms" : "0ms",
        //...handleStyleForm(props.isImgOverlay.form),
        //border: `${Math.max(3 / props.zoom[0], 2)}px dashed #006aff`,
      }}
      onMouseEnter={() => {
        props.setDisabledScroll(true);
      }}
      onMouseLeave={() => {
        props.setDisabledScroll(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
      }}
    >
      <RemoveScroll enabled={props.isdisabledScroll} removeScrollBar={false}>
        <div
          //ref={props.isImgOverlay.id === 0 ? props.overlayImgRef : null}
          style={{
            zIndex: 600,
            position: "absolute",
            width: `${props.drawArea.width}px`,
            height: `${props.drawArea.height}px`,
            //border: `${Math.max(1 / props.zoom[0], 2)}px solid #006aff`,
            ...handleStyleForm(props.isImgOverlay.form),
            cursor: props.isResizing === "top-move" ? "move" : "default",
          }}
          onMouseDown={(e) => {
            if (props.textCanvasVisible) return;
            props.handleMouseDownResizing(e, "top-move");
          }}
          onWheel={(e) => {
            props.cropOnWheel(e);
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
              strokeWidth={3 / props.zoom[0]}
              strokeDasharray={`${Math.max(5 / props.zoom[0], 5)} ${Math.max(
                5 / props.zoom[0],
                5
              )}`}
              rx={
                handleStyleForm(
                  props.isImgOverlay.form || props.isFormCanvasVisible
                )?.borderRadius
              } // Rayon horizontal des coins arrondis
              ry={
                handleStyleForm(
                  props.isImgOverlay.form || props.isFormCanvasVisible
                )?.borderRadius
              } // Rayon vertical des coins arrondis
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
          {props.textCanvasVisible && (
            <Rich_text {...props} />
          )}
        </div>
      </RemoveScroll>
      {/* Handles for resizing */}
      {!props.isResizing && (
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
                heightRotate.min
              ),
              width: Math.max(
                lengthRotate.value / props.zoom[0],
                heightRotate.min
              ),
            }}
          />

          <div
            className="drag-handle-side drag-handle-side-top border border-[#006aff] rounded-full"
            onMouseDown={(e) => props.handleMouseDownResizing(e, "top")}
            style={{
              top: -(Math.max(length.value / props.zoom[0], length.min) / 2),
              height: Math.max(height.value / props.zoom[0], height.min),
              width: Math.max(length.value / props.zoom[0], length.min),
            }}
          />
          <div
            className="drag-handle-side drag-handle-side-bottom border border-[#006aff] rounded-full"
            onMouseDown={(e) => props.handleMouseDownResizing(e, "bottom")}
            style={{
              bottom: -(Math.max(length.value / props.zoom[0], length.min) / 2),
              height: Math.max(height.value / props.zoom[0], height.min),
              width: Math.max(length.value / props.zoom[0], length.min),
            }}
          />
          <div
            className="drag-handle-side drag-handle-side-right border border-[#006aff] rounded-full"
            onMouseDown={(e) => props.handleMouseDownResizing(e, "right")}
            style={{
              right: -(Math.max(height.value / props.zoom[0], height.min) / 2),
              height: Math.max(length.value / props.zoom[0], length.min),
              width: Math.max(height.value / props.zoom[0], height.min),
            }}
          />

          <div
            className="drag-handle-side drag-handle-side-left border border-[#006aff] rounded-full"
            onMouseDown={(e) => props.handleMouseDownResizing(e, "left")}
            style={{
              left: -(Math.max(height.value / props.zoom[0], height.min) / 2),
              height: Math.max(length.value / props.zoom[0], length.min),
              width: Math.max(height.value / props.zoom[0], height.min),
            }}
          />
          <div
            className="drag-handle drag-handle-top-left border border-[#006aff] rounded-full"
            onMouseDown={(e) => props.handleMouseDownResizing(e, "left-top")}
            style={{
              top: -(Math.max(length.value / props.zoom[0], length.min) / 2),
              left: -(Math.max(height.value / props.zoom[0], height.min) / 2),
              height: Math.max(length.value / props.zoom[0], length.min),
              width: Math.max(height.value / props.zoom[0], height.min),
            }}
          />
          <div
            className="drag-handle drag-handle-top-right border border-[#006aff] rounded-full"
            onMouseDown={(e) => props.handleMouseDownResizing(e, "right-top")}
            style={{
              top: -(Math.max(length.value / props.zoom[0], length.min) / 2),
              right: -(Math.max(height.value / props.zoom[0], height.min) / 2),
              height: Math.max(length.value / props.zoom[0], length.min),
              width: Math.max(height.value / props.zoom[0], height.min),
            }}
          />
          <div
            className="drag-handle drag-handle-bottom-left border border-[#006aff] rounded-full"
            onMouseDown={(e) => props.handleMouseDownResizing(e, "left-bottom")}
            style={{
              left: -(Math.max(height.value / props.zoom[0], height.min) / 2),
              bottom: -(Math.max(length.value / props.zoom[0], length.min) / 2),
              height: Math.max(length.value / props.zoom[0], length.min),
              width: Math.max(height.value / props.zoom[0], height.min),
            }}
          />
          <div
            className="drag-handle drag-handle-bottom-right border border-[#006aff] rounded-full"
            onMouseDown={(e) =>
              props.handleMouseDownResizing(e, "right-bottom")
            }
            style={{
              bottom: -(Math.max(length.value / props.zoom[0], length.min) / 2),
              right: -(Math.max(height.value / props.zoom[0], height.min) / 2),
              height: Math.max(length.value / props.zoom[0], length.min),
              width: Math.max(height.value / props.zoom[0], height.min),
            }}
          />
        </>
      )}
      {props.textCanvasVisible && (
        <div
          className="drag-handle-content"
          onMouseDown={(e) => props.handleMouseDownResizing(e, "top-move")}
          style={{
            width: `${props.drawArea.width + 30}px`,
            height: `${props.drawArea.height + 30}px`,
            marginLeft: -15,
            marginTop: -15,
          }}
        />
      )}
      <div
        className="input_textareaCreative"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          ref={props.isImgOverlay.id === 0 ? props.overlayImgBgRef : null}
          className="h-full w-full min-h-min"
          style={{
            zIndex: 20,
            //borderRadius: handleStyleForm(props.isImgOverlay.form)
            //  ?.borderRadius,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            //...(props.isImgOverlay.id === 0 && {
            //  background:
            //    props.isImgOverlay.form === "squareShadow" ||
            //    props.isImgOverlay.form === "squareRoundedShadow" ||
            //    props.isImgOverlay.form === "circleShadow"
            //      ? props.isImgOverlay.borderColor
            //      : "none",
            //}),
          }}
        >
          <div
            className="absolute rounded p-2 bg-black/75 text-white"
            style={{
              opacity: !isHiddenValueY ? 0 : 1,
              zIndex: 10,
              fontSize: 20,
              fontWeight: "bolder",
              transform: `scale(${1 / props.zoom[0]}) rotate(${-props.drawArea
                .rotate}deg)`,
            }}
          >
            {props.isImgOverlay.cropY}%
          </div>
          <div
            className="absolute rounded p-2 bg-black/75 text-white"
            style={{
              opacity: props.isResizing === "rotate" ? 1 : 0,
              zIndex: 10,
              fontSize: 20,
              fontWeight: "bolder",
              transform: `scale(${1 / props.zoom[0]}) rotate(${-props.drawArea
                .rotate}deg)`,
            }}
          >
            {props.drawArea.rotate}°
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlayArea;
