import {
  DrawArea,
  ExpandImg,
  IsNewImage,
  NewImageSize,
} from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";
import React, { MutableRefObject } from "react";
import { FaBan } from "react-icons/fa6";
import { GiConvergenceTarget } from "react-icons/gi";

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
  croppedImageUrl: string | null;
  zoom: number[];
  isNewImage: IsNewImage;
  isImageSize: NewImageSize;
  drawingExpandImg: ExpandImg;
  isFreeAreaCrop: boolean;
  isResizing: ResizeDirection;
}

const CropArea: React.FC<TextEditDrawingProps> = (props) => {
  const padding = {
    value: 0,
    max: 0,
  };
  const length = {
    value: 10,
    min: 5,
  };
  const height = {
    value: 10,
    min: 5,
  };

  if (props.isMenuOpen !== 5) return null;

  return (
    <>
      <div
        ref={props.textCanvasContainerRef}
        className="bounce-open"
        style={{
          zIndex: 1000,
          position: "absolute",
          left: props.drawArea.positionX,
          top: props.drawArea.positionY,
          width: `${props.drawArea.width}px`,
          height: `${props.drawArea.height}px`,
          transition: props.isResizing ? "0ms" : "300ms"
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
        }}
      >
        {props.isResizing === null && (
          <>
            {/* Handles for resizing */}
            <>
              <div
                className="drag-handle-side drag-handle-side-top border border-[#006aff] rounded-full"
                onMouseDown={(e) => props.handleMouseDownResizing(e, "top")}
                style={{
                  top: -(
                    Math.max(length.value / props.zoom[0], length.min) / 2
                  ),
                  height: Math.max(height.value / props.zoom[0], height.min),
                  width: Math.max(length.value / props.zoom[0], length.min),
                }}
              />
              <div
                className="drag-handle-side drag-handle-side-bottom border border-[#006aff] rounded-full"
                onMouseDown={(e) => props.handleMouseDownResizing(e, "bottom")}
                style={{
                  bottom: -(
                    Math.max(length.value / props.zoom[0], length.min) / 2
                  ),
                  height: Math.max(height.value / props.zoom[0], height.min),
                  width: Math.max(length.value / props.zoom[0], length.min),
                }}
              />
              <div
                className="drag-handle-side drag-handle-side-right border border-[#006aff] rounded-full"
                onMouseDown={(e) => props.handleMouseDownResizing(e, "right")}
                style={{
                  right: -(
                    Math.max(height.value / props.zoom[0], height.min) / 2
                  ),
                  height: Math.max(length.value / props.zoom[0], length.min),
                  width: Math.max(height.value / props.zoom[0], height.min),
                }}
              />

              <div
                className="drag-handle-side drag-handle-side-left border border-[#006aff] rounded-full"
                onMouseDown={(e) => props.handleMouseDownResizing(e, "left")}
                style={{
                  left: -(
                    Math.max(height.value / props.zoom[0], height.min) / 2
                  ),
                  height: Math.max(length.value / props.zoom[0], length.min),
                  width: Math.max(height.value / props.zoom[0], height.min),
                }}
              />
              <div
                className="drag-handle drag-handle-top-left border border-[#006aff] rounded-full"
                onMouseDown={(e) =>
                  props.handleMouseDownResizing(e, "left-top")
                }
                style={{
                  top: -(
                    Math.max(length.value / props.zoom[0], length.min) / 2
                  ),
                  left: -(
                    Math.max(height.value / props.zoom[0], height.min) / 2
                  ),
                  height: Math.max(length.value / props.zoom[0], length.min),
                  width: Math.max(height.value / props.zoom[0], height.min),
                }}
              />
              <div
                className="drag-handle drag-handle-top-right border border-[#006aff] rounded-full"
                onMouseDown={(e) =>
                  props.handleMouseDownResizing(e, "right-top")
                }
                style={{
                  top: -(
                    Math.max(length.value / props.zoom[0], length.min) / 2
                  ),
                  right: -(
                    Math.max(height.value / props.zoom[0], height.min) / 2
                  ),
                  height: Math.max(length.value / props.zoom[0], length.min),
                  width: Math.max(height.value / props.zoom[0], height.min),
                }}
              />
              <div
                className="drag-handle drag-handle-bottom-left border border-[#006aff] rounded-full"
                onMouseDown={(e) =>
                  props.handleMouseDownResizing(e, "left-bottom")
                }
                style={{
                  left: -(
                    Math.max(height.value / props.zoom[0], height.min) / 2
                  ),
                  bottom: -(
                    Math.max(length.value / props.zoom[0], length.min) / 2
                  ),
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
                  bottom: -(
                    Math.max(length.value / props.zoom[0], length.min) / 2
                  ),
                  right: -(
                    Math.max(height.value / props.zoom[0], height.min) / 2
                  ),
                  height: Math.max(length.value / props.zoom[0], length.min),
                  width: Math.max(height.value / props.zoom[0], height.min),
                }}
              />
            </>
          </>
        )}

        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${props.drawArea.width} ${props.drawArea.height}`}
          style={{
            position: "absolute",
            cursor: props.isResizing === "top-move" ? "move" : "default",
          }}
          onMouseDown={(e) => {
            props.handleMouseDownResizing(e, "top-move");
          }}
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="black"
            strokeWidth={3 / props.zoom[0]}
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
      </div>

      <svg
        width={props.isImageSize.w + props.drawingExpandImg.expand}
        height={props.isImageSize.h + props.drawingExpandImg.expand}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          zIndex: 900,
          left: -(props.drawingExpandImg.expand / 2),
          top: -(props.drawingExpandImg.expand / 2),
        }}
      >
        {!props.isFreeAreaCrop ? (
          <mask
            id="mask"
            stroke="black"
            strokeWidth={4}
            //strokeDasharray="5 5"
          >
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={
                Math.max(
                  Math.min(
                    props.drawArea.positionX + props.drawArea.leftOffset,
                    props.isImageSize.w - props.drawArea.width
                  ),
                  0
                ) +
                props.drawingExpandImg.expand / 2
              }
              y={
                Math.max(
                  Math.min(
                    props.drawArea.positionY + props.drawArea.topOffset,
                    props.isImageSize.h - props.drawArea.height
                  ),
                  0
                ) +
                props.drawingExpandImg.expand / 2
              }
              width={Math.min(props.drawArea.width, props.isImageSize.w)}
              height={Math.min(props.drawArea.height, props.isImageSize.h)}
              fill="black"
            />
          </mask>
        ) : (
          <mask id="mask">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={props.drawArea.positionX + props.drawingExpandImg.expand / 2}
              y={props.drawArea.positionY + props.drawingExpandImg.expand / 2}
              width={props.drawArea.width}
              height={props.drawArea.height}
              fill="black"
            />
          </mask>
        )}
        <rect
          width={props.isImageSize.w + props.drawingExpandImg.expand}
          height={props.isImageSize.h + props.drawingExpandImg.expand}
          fill="#00000079"
          mask="url(#mask)"
        />
      </svg>
    </>
  );
};

export default CropArea;
