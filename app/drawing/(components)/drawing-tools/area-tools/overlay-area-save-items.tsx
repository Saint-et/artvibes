import {
  DrawArea,
  DrawDrawing,
  DrawForm,
  DrawingSetting,
  DrawNowInterface,
  DrawSvg,
  DrawSvgFull,
  DrawText,
  ExpandImg,
  IsNewImage,
  IsNewOverlay,
  IsNewOverlaySave,
  LayerElement,
  LoadedImage,
  NewImageSize,
  SystemSettings,
} from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";
import React, { MutableRefObject } from "react";
import OverlayAreaSaveItemsContent from "./overlay-area-save-items-content";
import SvgComponents from "./overlay/svg-file";
import SvgFullComponents from "./overlay/svg-file-full";
import Rich_text from "../rich_text/rich_text";

// Interface des propriétés du composant
interface TextEditDrawingImgProps {
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
  isImgOverlaySave: IsNewOverlaySave[];
  setImgOverlaySave: React.Dispatch<React.SetStateAction<any>>;
  setImgOverlay: React.Dispatch<React.SetStateAction<any>>;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  systemSetting: SystemSettings;
  isImageSize: NewImageSize;
  isLayers: LayerElement[];
  drawText: DrawText;
  isNewImage: IsNewImage;
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
  drawForm: DrawForm;
  overlayImgRef: MutableRefObject<HTMLDivElement | null>;
  overlayImgBgRef: MutableRefObject<HTMLDivElement | null>;
  isResizing: ResizeDirection;
  isFormCanvasVisible: string;
  formDrawRef: MutableRefObject<HTMLDivElement | null>;
  drawSvg: DrawSvg;
  strokePathRef: MutableRefObject<SVGPathElement | null>;
  strokeRectRef: MutableRefObject<SVGRectElement | null>;
  strokeRectBgRef: MutableRefObject<SVGRectElement | null>;
  isDrawingSetting: DrawingSetting;
  setDrawingSetting: React.Dispatch<React.SetStateAction<any>>;
  setDrawText: React.Dispatch<React.SetStateAction<any>>;
  isDrawingLoad: LoadedImage;
  drawSvgFull: DrawSvgFull;
  textCanvasVisible: boolean;
  editorState: any;
  setEditorState: React.Dispatch<React.SetStateAction<any>>;
}

const OverlayAreaSaveItems: React.FC<TextEditDrawingImgProps> = (props) => {
  const handleStyleOverlayImg = (form: string) => {
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
        boxShadow: `${
          props.isImgOverlay.borderColor || "#000000"
        } 0px 0px 15px 8px`,
      };
    } else if (form === "squareRoundedShadow") {
      return {
        borderRadius: Math.min(props.drawArea.width, props.drawArea.height) / 6,
        boxShadow: `${
          props.isImgOverlay.borderColor || "#000000"
        } 0px 0px 15px 8px`,
      };
    } else if (form === "circleShadow") {
      return {
        borderRadius: Math.min(props.drawArea.width, props.drawArea.height) / 2,
        boxShadow: `${
          props.isImgOverlay.borderColor || "#000000"
        } 0px 0px 15px 8px`,
      };
    }
  };

  const handleStyleImg = (el: IsNewOverlaySave) => {
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

  const handleStyleForm = (el: any) => {
    if (el.formType === "squareFull")
      return { background: el.color, borderRadius: 0 };
    else if (el.formType === "squareEmpty")
      return {
        boxShadow: `inset 0px 0px 0px ${el.thickness}px ${el.color}`,
        borderRadius: 0,
      };
    else if (el.formType === "squareRoundedFull")
      return { background: el.color, borderRadius: Math.min(el.w, el.h) / 6 };
    else if (el.formType === "squareRoundedEmpty")
      return {
        boxShadow: `inset 0px 0px 0px ${el.thickness}px ${el.color}`,
        borderRadius: Math.min(el.w, el.h) / 6,
      };
    else if (el.formType === "circleFull")
      return { background: el.color, borderRadius: Math.min(el.w, el.h) / 2 };
    else if (el.formType === "circleEmpty")
      return {
        boxShadow: `inset 0px 0px 0px ${el.thickness}px ${el.color}`,
        borderRadius: Math.min(el.w, el.h) / 2,
      };
  };

  //if (props.isMenuOpen === 11) return null;
  if (props.isMenuOpen === 5) return null;

  return (
    <>
      {props.isLayers?.map((el: LayerElement, index: number) => (
        <div
          key={index}
          style={{
            position: "absolute",
            width: `${props.isImageSize.w + props.drawingExpandImg.expand}px`,
            height: `${props.isImageSize.h + props.drawingExpandImg.expand}px`,
            left: -props.drawingExpandImg.expand / 2,
            top: -props.drawingExpandImg.expand / 2,
            overflow:
              props.isDrawingSetting.overflowExpand === "visible"
                ? "visible"
                : el.overflowContainer === "expand"
                ? "clip"
                : "visible",
          }}
        >
          {el.overflowContainer === "canvas" ? (
            <div
              style={{
                position: "absolute",
                width: `${props.isImageSize.w}px`,
                height: `${props.isImageSize.h}px`,
                left: props.drawingExpandImg.expand / 2,
                top: props.drawingExpandImg.expand / 2,
                overflow:
                  props.isDrawingSetting.overflowCanvas === "visible"
                    ? "visible"
                    : el.overflowContainer === "canvas"
                    ? "clip"
                    : "visible",
              }}
            >
              {props.isImgOverlay.id === 0 && props.isImgOverlay.img && (
                <div
                  className="bounce-open"
                  style={{
                    zIndex: 100,
                    position: "absolute",
                    left: props.drawArea.positionX,
                    top: props.drawArea.positionY,
                    width: props.drawArea.width,
                    height: props.drawArea.height,
                    //transition: !props.isResizing ? "100ms" : "0ms",
                    transform: `rotate(${props.drawArea.rotate}deg)`,
                  }}
                >
                  <div
                    ref={props.overlayImgRef}
                    style={{
                      zIndex: 30,
                      position: "absolute",
                      width: props.drawArea.width,
                      height: props.drawArea.height,
                      ...handleStyleOverlayImg(props.isImgOverlay.form),
                    }}
                  >
                    <div
                      ref={props.overlayImgBgRef}
                      style={{
                        zIndex: 0,
                        position: "absolute",
                        width: props.drawArea.width,
                        height: props.drawArea.height,
                        borderRadius: handleStyleOverlayImg(
                          props.isImgOverlay.form
                        )?.borderRadius,
                        background:
                          props.isImgOverlay.form === "squareShadow" ||
                          props.isImgOverlay.form === "squareRoundedShadow" ||
                          props.isImgOverlay.form === "circleShadow"
                            ? props.isImgOverlay.borderColor
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          zIndex: 50,
                          overflow: "clip",
                          position: "absolute",
                          width: props.drawArea.width,
                          height: props.drawArea.height,
                          borderRadius: handleStyleOverlayImg(
                            props.isImgOverlay.form
                          )?.borderRadius,
                        }}
                      >
                        <img
                          className="object-cover h-full w-full"
                          src={
                            props.isImgOverlay.img ??
                            props.isDrawingLoad.defaultImage
                          }
                          alt=""
                          style={{
                            objectPosition: `${props.isImgOverlay.cropY}% ${props.isImgOverlay.cropY}%`,
                            opacity: props.isImgOverlay.opacity,
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
                            transition: "300ms",
                          }}
                          onDragStart={(e) => e.preventDefault()}
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {props.drawForm.id === 0 && props.isFormCanvasVisible && (
                <>
                  <div
                    style={{
                      zIndex: 100,
                      position: "absolute",
                      left: props.drawArea.positionX,
                      top: props.drawArea.positionY,
                      width: props.drawArea.width,
                      height: props.drawArea.height,
                      transform: `rotate(${props.drawArea.rotate}deg)`,
                    }}
                  >
                    <div
                      className="h-full w-full min-h-min"
                      style={{
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        ref={props.formDrawRef}
                        className="h-full w-full bounce-open"
                        style={{
                          ...handleStyleForm({
                            ...props.drawForm,
                            formType: props.isFormCanvasVisible,
                            w: props.drawArea.width,
                            h: props.drawArea.height,
                          }),
                          opacity: props.drawForm.opacity,
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
              {props.drawSvg.id === 0 && props.drawSvg.img && (
                <div
                  style={{
                    zIndex: 100,
                    position: "absolute",
                    left: props.drawArea.positionX,
                    top: props.drawArea.positionY,
                    width: props.drawArea.width,
                    height: props.drawArea.height,
                    transition: !props.isResizing ? "100ms" : "0ms",
                    transform: `rotate(${props.drawArea.rotate}deg)`,
                  }}
                >
                  <div className="bounce-open">
                    <SvgComponents
                      drawSvg={{
                        img: props.drawSvg.img,
                        svg: props.drawSvg.svg,
                        filter: props.drawSvg.filter,
                        crop: props.drawSvg.crop,
                        thickness: props.drawSvg.thickness,
                        borderColor: props.drawSvg.borderColor,
                        opacity: props.drawSvg.opacity,
                      }}
                      strokeRectRef={props.strokeRectRef}
                      strokePathRef={props.strokePathRef}
                    />
                  </div>
                </div>
              )}
              {props.drawSvgFull.id === 0 && (
                <div
                  style={{
                    zIndex: 100,
                    position: "absolute",
                    left: props.drawArea.positionX,
                    top: props.drawArea.positionY,
                    width: props.drawArea.width,
                    height: props.drawArea.height,
                    transition: !props.isResizing ? "100ms" : "0ms",
                    transform: `rotate(${props.drawArea.rotate}deg)`,
                  }}
                >
                  <div className="bounce-open">
                    <SvgFullComponents
                      drawSvgFull={{
                        svg: props.drawSvgFull.svg,
                        thickness: props.drawSvgFull.thickness,
                        borderColor: props.drawSvgFull.borderColor,
                        color: props.drawSvgFull.color,
                        opacity: props.drawSvgFull.opacity,
                      }}
                      strokeRectBgRef={props.strokeRectBgRef}
                      strokeRectRef={props.strokeRectRef}
                      strokePathRef={props.strokePathRef}
                    />
                  </div>
                </div>
              )}
              {/*props.textCanvasVisible && (
                <div
                  style={{
                    zIndex: 100,
                    position: "absolute",
                    left: props.drawArea.positionX,
                    top: props.drawArea.positionY,
                    width: props.drawArea.width,
                    height: props.drawArea.height,
                    transition: !props.isResizing ? "100ms" : "0ms",
                    transform: `rotate(${props.drawArea.rotate}deg)`,
                    //background: "#ff0000",
                  }}
                >
                  <Rich_text
                    textCanvasRef={props.textCanvasRef}
                    drawText={props.drawText}
                    setDrawText={props.setDrawText}
                  />
                </div>
              )*/}
              <OverlayAreaSaveItemsContent {...props} el={el} expandDiv2={0} />
            </div>
          ) : (
            <>
              {props.isImgOverlay.id === 0 && props.isImgOverlay.img && (
                <div
                  className="bounce-open"
                  style={{
                    zIndex: 100,
                    position: "absolute",
                    left:
                      props.drawArea.positionX +
                      props.drawingExpandImg.expand / 2,
                    top:
                      props.drawArea.positionY +
                      props.drawingExpandImg.expand / 2,
                    width: props.drawArea.width,
                    height: props.drawArea.height,
                    //transition: !props.isResizing ? "100ms" : "0ms",
                    transform: `rotate(${props.drawArea.rotate}deg)`,
                  }}
                >
                  <div
                    ref={props.overlayImgRef}
                    style={{
                      zIndex: 30,
                      position: "absolute",
                      width: props.drawArea.width,
                      height: props.drawArea.height,
                      ...handleStyleOverlayImg(props.isImgOverlay.form),
                    }}
                  >
                    <div
                      ref={props.overlayImgBgRef}
                      style={{
                        zIndex: 0,
                        position: "absolute",
                        width: props.drawArea.width,
                        height: props.drawArea.height,
                        borderRadius: handleStyleOverlayImg(
                          props.isImgOverlay.form
                        )?.borderRadius,
                        background:
                          props.isImgOverlay.form === "squareShadow" ||
                          props.isImgOverlay.form === "squareRoundedShadow" ||
                          props.isImgOverlay.form === "circleShadow"
                            ? props.isImgOverlay.borderColor
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          zIndex: 50,
                          overflow: "clip",
                          position: "absolute",
                          width: props.drawArea.width,
                          height: props.drawArea.height,
                          borderRadius: handleStyleOverlayImg(
                            props.isImgOverlay.form
                          )?.borderRadius,
                        }}
                      >
                        <img
                          className="object-cover h-full w-full"
                          src={
                            props.isImgOverlay.img ??
                            props.isDrawingLoad.defaultImage
                          }
                          alt=""
                          style={{
                            objectPosition: `${props.isImgOverlay.cropY}% ${props.isImgOverlay.cropY}%`,
                            opacity: props.isImgOverlay.opacity,
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
                            transition: "300ms",
                          }}
                          onDragStart={(e) => e.preventDefault()}
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {props.drawForm.id === 0 && props.isFormCanvasVisible && (
                <>
                  <div
                    style={{
                      zIndex: 100,
                      position: "absolute",
                      left:
                        props.drawArea.positionX +
                        props.drawingExpandImg.expand / 2,
                      top:
                        props.drawArea.positionY +
                        props.drawingExpandImg.expand / 2,
                      width: props.drawArea.width,
                      height: props.drawArea.height,
                      transform: `rotate(${props.drawArea.rotate}deg)`,
                    }}
                  >
                    <div
                      className="h-full w-full min-h-min"
                      style={{
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        ref={props.formDrawRef}
                        className="h-full w-full bounce-open"
                        style={{
                          ...handleStyleForm({
                            ...props.drawForm,
                            formType: props.isFormCanvasVisible,
                            w: props.drawArea.width,
                            h: props.drawArea.height,
                          }),
                          opacity: props.drawForm.opacity,
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
              {props.drawSvg.id === 0 && props.drawSvg.img && (
                <div
                  style={{
                    zIndex: 100,
                    position: "absolute",
                    left:
                      props.drawArea.positionX +
                      props.drawingExpandImg.expand / 2,
                    top:
                      props.drawArea.positionY +
                      props.drawingExpandImg.expand / 2,
                    width: props.drawArea.width,
                    height: props.drawArea.height,
                    transition: !props.isResizing ? "100ms" : "0ms",
                    transform: `rotate(${props.drawArea.rotate}deg)`,
                  }}
                >
                  <div className="bounce-open">
                    <SvgComponents
                      drawSvg={{
                        img: props.drawSvg.img,
                        svg: props.drawSvg.svg,
                        filter: props.drawSvg.filter,
                        crop: props.drawSvg.crop,
                        thickness: props.drawSvg.thickness,
                        borderColor: props.drawSvg.borderColor,
                        opacity: props.drawSvg.opacity,
                      }}
                      strokeRectRef={props.strokeRectRef}
                      strokePathRef={props.strokePathRef}
                    />
                  </div>
                </div>
              )}
              {props.drawSvgFull.id === 0 && (
                <div
                  style={{
                    zIndex: 100,
                    position: "absolute",
                    left: props.drawArea.positionX,
                    top: props.drawArea.positionY,
                    width: props.drawArea.width,
                    height: props.drawArea.height,
                    transition: !props.isResizing ? "100ms" : "0ms",
                    transform: `rotate(${props.drawArea.rotate}deg)`,
                  }}
                >
                  <div className="bounce-open">
                    <SvgFullComponents
                      drawSvgFull={{
                        svg: props.drawSvgFull.svg,
                        thickness: props.drawSvgFull.thickness,
                        borderColor: props.drawSvgFull.borderColor,
                        color: props.drawSvgFull.color,
                        opacity: props.drawSvgFull.opacity,
                      }}
                      strokeRectBgRef={props.strokeRectBgRef}
                      strokeRectRef={props.strokeRectRef}
                      strokePathRef={props.strokePathRef}
                    />
                  </div>
                </div>
              )}
              {/*props.textCanvasVisible && (
                <div
                  style={{
                    zIndex: 100,
                    position: "absolute",
                    left: props.drawArea.positionX,
                    top: props.drawArea.positionY,
                    width: props.drawArea.width,
                    height: props.drawArea.height,
                    transition: !props.isResizing ? "100ms" : "0ms",
                    transform: `rotate(${props.drawArea.rotate}deg)`,
                    //background: "#ff0000",
                  }}
                >
                  <Rich_text
                    textCanvasRef={props.textCanvasRef}
                    drawText={props.drawText}
                    setDrawText={props.setDrawText}
                  />
                </div>
              )*/}
              <OverlayAreaSaveItemsContent
                {...props}
                el={el}
                expandDiv2={props.drawingExpandImg.expand / 2}
              />
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default OverlayAreaSaveItems;
