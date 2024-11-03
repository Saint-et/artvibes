import {
  DrawForm,
  DrawingSetting,
  DrawNowInterface,
  DrawSvg,
  DrawSvgFull,
  DrawText,
  ExpandImg,
  IsNewOverlay,
  IsNewOverlaySave,
  LayerElement,
  MenuLayer,
  NewImageSize,
  SystemSettings,
} from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";
import React, { MutableRefObject } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { LuAlertTriangle } from "react-icons/lu";

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
  setImgOverlay: React.Dispatch<React.SetStateAction<IsNewOverlay>>;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  setDrawText: React.Dispatch<React.SetStateAction<any>>;
  systemSetting: SystemSettings;
  isImageSize: NewImageSize;
  drawingExpandImg: ExpandImg;
  isLayers: LayerElement[];
  setLayers: React.Dispatch<React.SetStateAction<any>>;
  isMenuLayer: MenuLayer;
  setMenuLayer: React.Dispatch<React.SetStateAction<any>>;
  setFormCanvasVisible: React.Dispatch<React.SetStateAction<any>>;
  setTextCanvasVisible: React.Dispatch<React.SetStateAction<any>>;
  setDrawForm: React.Dispatch<React.SetStateAction<any>>;
  setElementIndex: React.Dispatch<React.SetStateAction<any>>;
  drawForm: DrawForm;
  isDrawingNowCanvas: DrawNowInterface;
  textCanvasVisible: boolean;
  drawText: DrawText;
  drawSvg: DrawSvg;
  setDrawSvg: React.Dispatch<React.SetStateAction<any>>;
  isDrawingSetting: DrawingSetting;
  setDrawingSetting: React.Dispatch<React.SetStateAction<any>>;
  setDrawSvgFull: React.Dispatch<React.SetStateAction<any>>;
  drawSvgFull: DrawSvgFull;
}

const OverlayAreaSave: React.FC<TextEditDrawingProps> = (props) => {
  const handleStyleHiddenForm = (el: any) => {
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
    } else if (el.formType === "squareFull") return { borderRadius: 0 };
    else if (el.formType === "squareEmpty")
      return {
        borderRadius: 0,
      };
    else if (el.formType === "squareRoundedFull")
      return { borderRadius: Math.min(el.w, el.h) / 6 };
    else if (el.formType === "squareRoundedEmpty")
      return {
        borderRadius: Math.min(el.w, el.h) / 6,
      };
    else if (el.formType === "circleFull")
      return { borderRadius: Math.min(el.w, el.h) / 2 };
    else if (el.formType === "circleEmpty")
      return {
        borderRadius: Math.min(el.w, el.h) / 2,
      };
  };

  const handleoutside = (el: LayerElement) => {
    //console.log(el.overflowContainer);
    
    if (
      el.overflowContainer === "canvas" 
      && el.x + el.w < 0 ||
      el.x > props.isImageSize.w ||
      el.y + el.h < 0 ||
      el.y > props.isImageSize.h
    ) {
      return "cursor-pointer drawing-css-bg-negatif";
    }
    if (
      el.overflowContainer === "expand" &&
      el.x + el.w < 0 - props.drawingExpandImg.expand / 2 ||
      el.x > props.isImageSize.w + props.drawingExpandImg.expand / 2 ||
      el.y + el.h < 0 - props.drawingExpandImg.expand / 2 ||
      el.y > props.isImageSize.h + props.drawingExpandImg.expand / 2
    ) {
      return "cursor-pointer drawing-css-bg-negatif";
    }
    if (props.isMenuLayer.uniqueOverlaySelect) {
      return;
    }
    return `border-none`; //transition border-solid border-[#006aff]
  };

  if (
    props.isDrawingSetting.paint.hideElCanvas &&
    props.isMenuOpen === 4 &&
    props.isDrawingNowCanvas.id !== null
  )
    return null;
  //if (props.isMenuOpen === 11) return null;
  if (props.isMenuOpen === 5) return null;
  if (props.isDrawingNowCanvas.id !== null) return null;

  return (
    <>
      {props.isLayers?.map((el: LayerElement, index: number) => (
        <div key={index}>
          {el.layerType !== "draw" && (
            <>
              {props.isImgOverlay.id !== el.id &&
                props.drawForm.id !== el.id &&
                props.drawText.id !== el.id &&
                props.drawSvg.id !== el.id &&
                props.drawSvgFull.id !== el.id &&
                !props.isMenuLayer.blockOverlay.find((id) => id === el.id) && (
                  <>
                    <div
                      style={{
                        zIndex: props.isMenuOpen === 8 ? 600 : 400,
                        position: "absolute",
                        left: el.x,
                        top: el.y,
                        width: el.w,
                        height: el.h,
                        cursor: props.isMenuOpen === 8 ? "pointer" : "default",
                        transform: `rotate(${el.rotate}deg)`,
                      }}
                      onMouseEnter={() => {
                        props.setMenuLayer((prevState: any) => ({
                          ...prevState,
                          uniqueOverlaySelectPreview: el.id,
                        }));
                      }}
                      onMouseLeave={() => {
                        props.setMenuLayer((prevState: any) => ({
                          ...prevState,
                          uniqueOverlaySelectPreview: -1,
                        }));
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        props.setMenuLayer((prevState: any) => ({
                          ...prevState,
                          uniqueOverlaySelectPreview: -1,
                        }));
                        if (props.isMenuOpen === 5) return;
                        if (el.layerType === "overlay") {
                          props.setImgOverlay({
                            id: el.id,
                            form: el.form,
                            img: el.img,
                            miniature: el.miniature,
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
                        }
                        if (el.layerType === "form") {
                          props.setFormCanvasVisible(el.formType);
                          props.setDrawForm({
                            id: el.id,
                            color: el.color,
                            thickness: el.thickness,
                            opacity: el.opacity,
                          });
                        }
                        if (el.layerType === "text") {
                          props.setTextCanvasVisible(true);
                          props.setDrawText({
                            id: el.id,
                            color: el.color,
                            value: el.text,
                            fontSize: el.fontSize,
                            underline: el.underline,
                            fontStyle: el.fontStyle,
                            fontWeight: el.fontWeight,
                            textAlign: el.textAlign,
                            opacity: el.opacity,
                          });
                        }
                        if (el.layerType === "overlay-svg") {
                          props.setDrawSvg((prevState: DrawSvg) => ({
                            ...prevState,
                            id: el.id,
                            thickness: el.thickness,
                            svg: el.svg,
                            img: el.svgImg,
                            crop: el.crop,
                            filter: el.filter,
                            borderColor: el.borderColor,
                            opacity: el.opacity,
                          }));
                        }
                        if (el.layerType === "overlay-svg-full") {
                          props.setDrawSvgFull((prevState: DrawSvgFull) => ({
                            ...prevState,
                            id: el.id,
                            thickness: el.thickness,
                            svg: el.svg,
                            borderColor: el.borderColor,
                            color: el.color,
                            opacity: el.opacity,
                          }));
                        }
                        props.setDrawArea({
                          width: el.w,
                          height: el.h,
                          leftOffset: 0,
                          topOffset: 0,
                          positionX: el.x, // 22
                          positionY: el.y, // 22
                          rotate: el.rotate, // 22
                        });
                        props.setElementIndex(index);
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
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            ...handleStyleHiddenForm(el),
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderWidth = `${
                              1 / props.zoom[0]
                            }px`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderWidth = `${0}px`;
                          }}
                        >
                          {props.isMenuLayer.uniqueOverlaySelectPreview ===
                            el.id && (
                            <svg
                              width="100%" // Ajusté à 100% pour s'adapter à la largeur du conteneur parent
                              height="100%" // Ajusté à 100% pour s'adapter à la hauteur du conteneur parent
                              viewBox={`0 0 ${el.w} ${el.h}`}
                            >
                              <rect
                                x="0"
                                y="0"
                                width="100%" // Le rect couvre 100% du SVG en largeur
                                height="100%" // Le rect couvre 100% du SVG en hauteur
                                fill="none"
                                stroke="black"
                                strokeWidth={3 / props.zoom[0]}
                                strokeDasharray={`${Math.max(
                                  5 / props.zoom[0],
                                  5
                                )} ${Math.max(5 / props.zoom[0], 5)}`}
                                rx={handleStyleHiddenForm(el)?.borderRadius} // Rayon horizontal des coins arrondis
                                ry={handleStyleHiddenForm(el)?.borderRadius} // Rayon vertical des coins arrondis
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
                                  dur={`${Math.max(
                                    250 / props.zoom[0],
                                    250
                                  )}ms`}
                                  repeatCount="indefinite"
                                />
                              </rect>
                            </svg>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default OverlayAreaSave;
