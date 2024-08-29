import { IsNewOverlay, SystemSettings } from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { RemoveScroll } from "react-remove-scroll";

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
  isImgOverlay: IsNewOverlay;
  setImgOverlay: React.Dispatch<React.SetStateAction<any>>;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  systemSetting: SystemSettings;
  cropOnWheel: (event: React.WheelEvent<HTMLDivElement>) => void;
  isdisabledScroll: boolean;
  setDisabledScroll: React.Dispatch<React.SetStateAction<any>>;
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

    const delayInMilliseconds = 2000; // 2 secondes

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

  const handleStyleHiddenForm = (form: string) => {
    if (!props.isImgOverlay.img) return;

    if (form === "square" || form === "squareShadow") {
      return {
        borderRadius: 0,
      };
    } else if (form === "squareRounded" || form === "squareRoundedShadow") {
      return {
        borderRadius: Math.min(props.drawArea.width, props.drawArea.height) / 6,
      };
    } else if (form === "circle" || form === "circleShadow") {
      return {
        borderRadius: Math.min(props.drawArea.width, props.drawArea.height) / 2,
      };
    }
  };

  const handleStyleForm = (form: string) => {
    if (!props.isImgOverlay.img) return;

    if (form === "square") {
      return {
        borderRadius: 0,
      };
    } else if (form === "squareRounded") {
      return {
        borderRadius: Math.min(props.drawArea.width, props.drawArea.height) / 6,
      };
    } else if (form === "circle") {
      return {
        borderRadius: Math.min(props.drawArea.width, props.drawArea.height) / 2,
      };
    } else if (form === "squareShadow") {
      return {
        borderRadius: 0,
        boxShadow: `${props.isImgOverlay.borderColor} 0px 0px 15px 8px`,
      };
    } else if (form === "squareRoundedShadow") {
      return {
        borderRadius: Math.min(props.drawArea.width, props.drawArea.height) / 6,
        boxShadow: `${props.isImgOverlay.borderColor} 0px 0px 15px 8px`,
      };
    } else if (form === "circleShadow") {
      return {
        borderRadius: Math.min(props.drawArea.width, props.drawArea.height) / 2,
        boxShadow: `${props.isImgOverlay.borderColor} 0px 0px 15px 8px`,
      };
    }
  };

  if (props.isMenuOpen === 5) return null;

  if (!props.isImgOverlay.img) return null;

  return (
    <div className="w-0 h-0">
      <div
        ref={props.textCanvasContainerRef}
        style={{
          zIndex: 700,
          position: "absolute",
          left: props.drawArea.positionX,
          top: props.drawArea.positionY,
          width: `${props.drawArea.width}px`,
          height: `${props.drawArea.height}px`,
          transform: `translate(${props.drawArea.leftOffset}px, ${props.drawArea.topOffset}px)`,
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
            style={{
              zIndex: 600,
              position: "absolute",
              width: `${props.drawArea.width}px`,
              height: `${props.drawArea.height}px`,
              border: `${Math.max(3 / props.zoom[0], 2)}px dashed #006aff`,
              ...handleStyleForm(props.isImgOverlay.form),
              cursor: "move",
            }}
            onMouseDown={(e) => {
              props.handleMouseDownResizing(e, "top-move");
            }}
            onWheel={(e) => {
              props.cropOnWheel(e);
            }}
          />
        </RemoveScroll>
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
            onMouseDown={(e) =>
              props.handleMouseDownResizing(e, "right-bottom")
            }
            style={{
              transform: `scale(${Math.max(1 / props.zoom[0], 1)})`,
            }}
          />
        </>
        <div
          className="input_textareaCreative"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="h-full w-full min-h-min"
            style={{
              zIndex: 20,
              ...handleStyleHiddenForm(props.isImgOverlay.form),
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                props.isImgOverlay.form === "squareShadow" ||
                props.isImgOverlay.form === "squareRoundedShadow" ||
                props.isImgOverlay.form === "circleShadow"
                  ? props.isImgOverlay.borderColor
                  : "none",
            }}
          >
            <div
              className="absolute rounded p-2 bg-black/75 text-white"
              style={{
                opacity: !isHiddenValueY ? 0 : 1,
                zIndex: 10,
                fontSize: 40,
                fontWeight: "bolder",
                transition: "300ms",
              }}
            >
              {props.isImgOverlay.cropY}%
            </div>
            <img
              className="object-cover h-full w-full"
              src={props.isImgOverlay.img}
              style={{
                opacity: props.isImgOverlay.opacity,
                objectPosition: `${props.isImgOverlay.cropY}% ${props.isImgOverlay.cropY}%`,
                filter: `
                   brightness(${props.isImgOverlay.filter.brightness}%)
                   contrast(${props.isImgOverlay.filter.contrast}%)
                   saturate(${props.isImgOverlay.filter.saturation}%)
                   sepia(${props.isImgOverlay.filter.sepia}%)
                   hue-rotate(${props.isImgOverlay.filter.hue}deg)
                   blur(${props.isImgOverlay.filter.blur}px)
                   grayscale(${props.isImgOverlay.filter.grayscale}%)
                   invert(${props.isImgOverlay.filter.invert}%)
                 `,
                transition: "200ms",
              }}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlayArea;
