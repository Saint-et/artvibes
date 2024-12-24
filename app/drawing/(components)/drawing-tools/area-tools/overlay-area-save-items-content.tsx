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
import { CustomStyleMap, ResizeDirection } from "@/utils/type";
import DrawingArea from "./draw/drawing-area";
import React, { MutableRefObject } from "react";
import SvgComponents from "./overlay/svg-file";
import SvgFullComponents from "./overlay/svg-file-full";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import {
  BoldDraftjsMap,
  ColorDraftjsMap,
  FontSizeDraftjsMap,
  ItalicDraftjsMap,
  PoliceMapDraftjsMap,
  UnderlineDraftjsMap,
} from "@/public/assets/data/data";

interface TextEditDrawingImgContentProps {
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
  el: LayerElement;
  expandDiv2: number;
  isDrawingLoad: LoadedImage;
  drawSvgFull: DrawSvgFull;
  editorState: any;
  setEditorState: React.Dispatch<React.SetStateAction<any>>;
  customStyleMap: CustomStyleMap;
  customStyleShadowMap: CustomStyleMap;
}

const OverlayAreaSaveItemsContent: React.FC<TextEditDrawingImgContentProps> = (
  props
) => {
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

  return (
    <>
      {!(
        props.isMenuOpen === 4 &&
        props.isDrawingSetting.paint.hideElCanvas &&
        props.isDrawingNowCanvas.id !== null
      ) && (
        <>
          {props.el.layerType === "overlay" && (
            <>
              {props.isImgOverlay.id !== props.el.id ? (
                <div
                  style={{
                    overflow: "clip",
                    zIndex: 50,
                    position: "absolute",
                    left: props.el.x + props.expandDiv2,
                    top: props.el.y + props.expandDiv2,
                    width: props.el.w,
                    height: props.el.h,
                    transform: `rotate(${props.el.rotate}deg)`,
                    ...handleStyleImg(props.el),
                    background:
                      props.el.form === "squareShadow" ||
                      props.el.form === "squareRoundedShadow" ||
                      props.el.form === "circleShadow"
                        ? props.el.borderColor
                        : "none",
                  }}
                >
                  <img
                    className="object-cover h-full w-full"
                    src={props.el.img}
                    alt=""
                    style={{
                      objectPosition: `${props.el.cropY}% ${props.el.cropY}%`,
                      opacity: props.el.opacity,
                      filter: `
                  brightness(${props.el.filter.brightness}%)
                  contrast(${props.el.filter.contrast}%)
                  saturate(${props.el.filter.saturation}%)
                  sepia(${props.el.filter.sepia}%)
                  hue-rotate(${props.el.filter.hue}deg)
                  blur(${props.el.filter.blur}px)
                  grayscale(${props.el.filter.grayscale}%)
                  invert(${props.el.filter.invert}%)
                `,
                    }}
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              ) : (
                <div
                  style={{
                    zIndex: 50,
                    position: "absolute",
                    left: props.drawArea.positionX + props.expandDiv2,
                    top: props.drawArea.positionY + props.expandDiv2,
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
                          src={props.isImgOverlay.img}
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
            </>
          )}
          {props.el.layerType === "form" && (
            <>
              {props.drawForm.id !== props.el.id ? (
                <div
                  style={{
                    zIndex: 50,
                    position: "absolute",
                    left: props.el.x + props.expandDiv2,
                    top: props.el.y + props.expandDiv2,
                    width: props.el.w,
                    height: props.el.h,
                    transform: `rotate(${props.el.rotate}deg)`,
                  }}
                >
                  <div
                    className="h-full w-full min-h-min"
                    style={{
                      overflow: "clip",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      className="h-full w-full"
                      style={{
                        ...handleStyleForm(props.el),
                        opacity: props.el.opacity,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    zIndex: 50,
                    position: "absolute",
                    left: props.drawArea.positionX + props.expandDiv2,
                    top: props.drawArea.positionY + props.expandDiv2,
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
                      className="h-full w-full"
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
              )}
            </>
          )}

          {props.el.layerType === "text" && (
            <>
              {props.drawText.id !== props.el.id && (
                <div
                  className="input_textareaCreative select-none"
                  style={{
                    zIndex: 50,
                    position: "absolute",
                    textAlign: props.el.textAlign,
                    //fontSize: props.el.fontSize,
                    //color: props.el.color,
                    left: props.el.x + props.expandDiv2,
                    top: props.el.y + props.expandDiv2,
                    width: props.el.w,
                    height: props.el.h,
                    transform: `rotate(${props.el.rotate}deg)`,
                    userSelect: "none",
                    cursor: "default",
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                >
                  <Editor
                    editorState={props.el.editorDraftjs}
                    customStyleMap={{
                      ...ColorDraftjsMap,
                      ...FontSizeDraftjsMap,
                      ...ItalicDraftjsMap,
                      ...UnderlineDraftjsMap,
                      ...BoldDraftjsMap,
                      ...props.customStyleMap,
                      ...PoliceMapDraftjsMap,
                      ...props.customStyleShadowMap
                    }}
                    readOnly={true}
                    onChange={() => {
                      return;
                    }}
                  />
                </div>
              )}
            </>
          )}

          {props.el.layerType === "overlay-svg" && (
            <>
              {props.drawSvg.id === props.el.id ? (
                <div
                  style={{
                    zIndex: 50,
                    position: "absolute",
                    left: props.drawArea.positionX + props.expandDiv2,
                    top: props.drawArea.positionY + props.expandDiv2,
                    width: props.drawArea.width,
                    height: props.drawArea.height,
                    transition: !props.isResizing ? "100ms" : "0ms",
                    transform: `rotate(${props.drawArea.rotate}deg)`,
                  }}
                >
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
              ) : (
                <div
                  style={{
                    zIndex: 50,
                    position: "absolute",
                    left: props.el.x + props.expandDiv2,
                    top: props.el.y + props.expandDiv2,
                    width: props.el.w,
                    height: props.el.h,
                    transform: `rotate(${props.el.rotate}deg)`,
                  }}
                >
                  <SvgComponents
                    drawSvg={{
                      img: props.el.svgImg,
                      svg: props.el.svg,
                      filter: props.el.filter,
                      crop: props.el.crop,
                      thickness: props.el.thickness,
                      borderColor: props.el.borderColor,
                      opacity: props.el.opacity,
                    }}
                    strokePathRef={null}
                    strokeRectRef={null}
                  />
                </div>
              )}
            </>
          )}
          {props.el.layerType === "overlay-svg-full" && (
            <>
              {props.drawSvgFull.id === props.el.id ? (
                <div
                  style={{
                    zIndex: 50,
                    position: "absolute",
                    left: props.drawArea.positionX + props.expandDiv2,
                    top: props.drawArea.positionY + props.expandDiv2,
                    width: props.drawArea.width,
                    height: props.drawArea.height,
                    transition: !props.isResizing ? "100ms" : "0ms",
                    transform: `rotate(${props.drawArea.rotate}deg)`,
                  }}
                >
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
              ) : (
                <div
                  style={{
                    zIndex: 50,
                    position: "absolute",
                    left: props.el.x + props.expandDiv2,
                    top: props.el.y + props.expandDiv2,
                    width: props.el.w,
                    height: props.el.h,
                    transform: `rotate(${props.el.rotate}deg)`,
                  }}
                >
                  <SvgFullComponents
                    drawSvgFull={{
                      svg: props.el.svg,
                      thickness: props.el.thickness,
                      borderColor: props.el.borderColor,
                      color: props.el.color,
                      opacity: props.el.opacity,
                    }}
                    strokeRectBgRef={null}
                    strokePathRef={null}
                    strokeRectRef={null}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
      {props.el.layerType === "draw" && (
        <>
          {props.isDrawingNowCanvas.id === props.el.id ? (
            <DrawingArea
              {...props}
              expand={props.el.expand}
              zIndex={props.isDrawingNowCanvas.id}
              //alertStart={props.handleAlertStart}
            />
          ) : (
            <>
              {!(
                props.isDrawingSetting.paint.showDrawSelected &&
                props.isDrawingNowCanvas.id !== null
              ) && (
                <div
                  style={{
                    zIndex: 50,
                    position: "absolute",
                    left:
                      -(props.el.expand / 2) +
                      props.drawingExpandImg.expand / 2, // Expansion calculée
                    top:
                      -(props.el.expand / 2) +
                      props.drawingExpandImg.expand / 2, // Expansion calculée
                    width: `${props.isImageSize.w + props.el.expand}px`, // Largeur agrandie
                    height: `${props.isImageSize.h + props.el.expand}px`, // Hauteur agrandie
                    opacity: !(
                      props.isDrawingSetting.paint.opacity &&
                      props.isDrawingNowCanvas.id !== null
                    )
                      ? 1
                      : 0.4,
                  }}
                >
                  <img
                    src={props.el.img}
                    alt=""
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default OverlayAreaSaveItemsContent;
