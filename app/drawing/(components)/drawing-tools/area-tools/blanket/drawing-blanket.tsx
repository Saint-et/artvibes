import {
  Blanket,
  DrawArea,
  DrawDrawing,
  ExpandImg,
  IsNewImage,
  NewImageSize,
} from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";

// Interface des propriétés du composant
interface TextEditDrawingProps {
  isMenuOpen: number;
  drawArea: DrawArea;
  blanketRef: MutableRefObject<HTMLDivElement | null>;
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
  isBlanket: Blanket;
  textCanvasContainerRef: MutableRefObject<HTMLDivElement | null>;
  isResizing: ResizeDirection;
}

const DrawingBlanket: React.FC<TextEditDrawingProps> = (props) => {
  //if (props.isMenuOpen !== 11) return null;

  const size =
    props.isImageSize.w < props.isImageSize.h
      ? props.isImageSize.w
      : props.isImageSize.h;

  const length = {
    value: 10,
    min: 5,
  };
  const height = {
    value: 10,
    min: 5,
  };
  const paddingRotate = {
    value: 0,
    max: 0,
  };
  const lengthRotate = {
    value: 15,
    min: 10,
  };
  const heightRotate = {
    value: 15,
    min: 10,
  };

  if (props.isMenuOpen === 5) return null;

  if (props.isBlanket.transparent1 && props.isBlanket.transparent2) return null;

  return (
    <>
      <div
        ref={props.blanketRef}
        className="bounce-open"
        style={{
          zIndex: 5,
          position: "absolute",
          left: props.isBlanket.expand
            ? (-props.drawingExpandImg.expand + -1) / 2
            : 0,
          top: props.isBlanket.expand
            ? (-props.drawingExpandImg.expand + -1) / 2
            : 0,
          width: `${
            props.isImageSize.w +
            (props.isBlanket.expand ? props.drawingExpandImg.expand + 2 : 0)
          }px`,
          height: `${
            props.isImageSize.h +
            (props.isBlanket.expand ? props.drawingExpandImg.expand + 2 : 0)
          }px`,
          //transform: `rotate(${props.drawArea.rotate}deg)`,
          //border: `${Math.max(3 / props.zoom[0], 2)}px dashed #006aff`,
          transition: "250ms",
          background: `linear-gradient(${props.isBlanket.rotate}deg, ${
            props.isBlanket.transparent1
              ? "#00000000"
              : props.isBlanket.color1 || "#00000000"
          }, ${
            props.isBlanket.transparent2
              ? "#00000000"
              : props.isBlanket.color2 || "#00000000"
          } ${props.isBlanket.size}%)`,
          opacity: props.isBlanket.opacity,
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
        }}
      />
      {props.isMenuOpen === 11 && (
        <div
          className="rounded-full"
          style={{
            zIndex: 500,
            position: "absolute",
            border: "2px solid #006aff",
            transformOrigin: "center center",
            left: props.isImageSize.w / 2 - size / 4,
            top: props.isImageSize.h / 2 - size / 4,
            width: size / 2,
            height: size / 2,
            transform: `rotate(${props.isBlanket.rotate}deg)`,
          }}
        >
          <div
            //ref={props.textCanvasContainerRef}
            className="drag-handle-side drag-handle-side-rotate border rounded-full border-[#006aff]"
            onMouseDown={(e) =>
              props.handleMouseDownResizing(e, "rotate-blanket")
            }
            style={{
              //transform: `scale(${Math.max(1 / props.zoom[0], 1)})`,
              top: -(
                Math.max(lengthRotate.value / props.zoom[0], lengthRotate.min) /
                2
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
            className="input_textareaCreative"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="absolute rounded p-2 bg-black/75 text-white"
              style={{
                zIndex: 10,
                fontSize: 20,
                fontWeight: "bolder",
                transform: `scale(${1 / props.zoom[0]}) rotate(${-props
                  .isBlanket.rotate}deg)`,
              }}
            >
              {props.isBlanket.rotate}°
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DrawingBlanket;
