import {
  IsNewOverlay,
  IsNewOverlaySave,
  NewImageSize,
  SystemSettings,
} from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";
import React, { MutableRefObject } from "react";
import { FaTrashCan } from "react-icons/fa6";

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
  isImgOverlaySave: IsNewOverlaySave[];
  setImgOverlaySave: React.Dispatch<React.SetStateAction<any>>;
  setImgOverlay: React.Dispatch<React.SetStateAction<any>>;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  systemSetting: SystemSettings;
  isImageSize: NewImageSize;
  drawingExpandImg: number;
}

const OverlayAreaSave: React.FC<TextEditDrawingProps> = (props) => {
  const handleStyleForm = (el: IsNewOverlaySave) => {
    if (el.form === "square") {
      return {
        borderRadius: 0,
      };
    } else if (el.form === "squareRounded") {
      return {
        borderRadius: Math.min(el.w, el.h) / 6,
      };
    } else if (el.form === "circle") {
      return {
        borderRadius: Math.min(el.w, el.h) / 2,
      };
    } else if (el.form === "squareShadow") {
      return {
        borderRadius: 0,
        boxShadow: `${el.borderColor} 0px 0px 15px 8px`,
      };
    } else if (el.form === "squareRoundedShadow") {
      return {
        borderRadius: Math.min(el.w, el.h) / 6,
        boxShadow: `${el.borderColor} 0px 0px 15px 8px`,
      };
    } else if (el.form === "circleShadow") {
      return {
        borderRadius: Math.min(el.w, el.h) / 2,
        boxShadow: `${el.borderColor} 0px 0px 15px 8px`,
      };
    }
  };

  const handleStyleHiddenForm = (el: IsNewOverlaySave) => {
    if (el.form === "square" || el.form === "squareShadow") {
      return {
        borderRadius: 0,
      };
    } else if (
      el.form === "squareRounded" ||
      el.form === "squareRoundedShadow"
    ) {
      return {
        borderRadius: Math.min(el.w, el.h) / 6,
      };
    } else if (el.form === "circle" || el.form === "circleShadow") {
      return {
        borderRadius: Math.min(el.w, el.h) / 2,
      };
    }
  };

  const handleoutside = (el: IsNewOverlaySave) => {
    if (el.x < 0 - el.w + props.drawingExpandImg || el.x > props.isImageSize.w + props.drawingExpandImg) {
      return "transition border-4 border-dashed border-[#ff0000] cursor-pointer animationFlashing";
    }
    if (el.y < 0 - el.h + props.drawingExpandImg || el.y > props.isImageSize.h + props.drawingExpandImg) {
      return "transition border-4 border-dashed border-[#ff0000] cursor-pointer animationFlashing";
    }
    return "transition hover:border-4 border-dashed border-[#006aff]";
  };

  if (props.isImgOverlaySave.length === 0) return null;

  return (
    <div className="w-0 h-0">
      {props.isImgOverlaySave?.map((el, index) => (
        <div
          key={index}
          style={{
            zIndex: props.isMenuOpen === 8 ? 600 : 400,
            position: "absolute",
            left: el.x,
            top: el.y,
            width: el.w,
            height: el.h,
            cursor: props.isMenuOpen === 8 ? "pointer" : "default",
            // transform: `translate(${props.drawArea.leftOffset}px, ${props.drawArea.topOffset}px)`,
            //border: `${Math.max(3 / props.zoom[0], 2)}px dashed #006aff`,
          }}
          onClick={(e) => {
            e.stopPropagation();
            //if (props.isMenuOpen !== 8 && props.isMenuOpen !== 3) return;
            if (props.isMenuOpen === 5) return;
            props.setImgOverlay({
              id: el.id,
              form: el.form,
              img: el.img,
              cropY: el.cropY,
              opacity: el.opacity,
              shadow: el.shadow,
              borderColor: el.borderColor,
              filter: {
                brightness: el.filter.brightness,
                contrast: el.filter.contrast,
                saturation: el.filter.saturation,
                hue: el.filter.hue,
                blur: el.filter.blur,
                sepia: el.filter.sepia,
                grayscale: el.filter.grayscale,
                invert: el.filter.invert,
              },
            });
            props.setDrawArea({
              width: el.w,
              height: el.h,
              leftOffset: 0,
              topOffset: 0,
              positionX: el.x, // 22
              positionY: el.y, // 22
            });
            props.setImgOverlaySave(
              props.isImgOverlaySave.filter((element) => element.id !== el.id)
            );
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
          }}
        >
          {props.isMenuOpen !== 5 && (
            <div
              className={handleoutside(el)}
              style={{
                zIndex: 600,
                position: "absolute",
                width: `${el.w}px`,
                height: `${el.h}px`,
                ...handleStyleHiddenForm(el),
              }}
            />
          )}
          <div
            className="h-full w-full min-h-min"
            style={{
              ...handleStyleForm(el),
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                el.form === "squareShadow" ||
                el.form === "squareRoundedShadow" ||
                el.form === "circleShadow"
                  ? el.borderColor
                  : "none",
            }}
          >
            <img
              className="object-cover h-full w-full"
              src={el.img}
              alt=""
              style={{
                objectPosition: `${el.cropY}% ${el.cropY}%`,
                opacity: el.opacity,
                filter: `
                  brightness(${el.filter.brightness}%)
                  contrast(${el.filter.contrast}%)
                  saturate(${el.filter.saturation}%)
                  sepia(${el.filter.sepia}%)
                  hue-rotate(${el.filter.hue}deg)
                  blur(${el.filter.blur}px)
                  grayscale(${el.filter.grayscale}%)
                  invert(${el.filter.invert}%)
                `,
              }}
              onDragStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverlayAreaSave;
