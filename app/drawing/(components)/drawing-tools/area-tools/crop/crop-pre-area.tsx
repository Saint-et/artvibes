import { NewImageSize } from "@/utils/interface";
import React from "react";
import { GiConvergenceTarget } from "react-icons/gi";

// Interface des propriétés du composant
interface CropPreAreaProps {
  isMenuOpen: number;
  isFreeAreaCrop: boolean;
  isImageSize: NewImageSize;
  drawArea: {
    positionX: number;
    positionY: number;
    width: number;
    height: number;
    leftOffset: number;
    topOffset: number;
  };
  zoom: number[];
}

const CropPreArea: React.FC<CropPreAreaProps> = (props) => {
  if (props.isMenuOpen !== 5) return null;

  if (props.isFreeAreaCrop) return null;

  return (
    <div
      style={{
        zIndex: 50,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left:
          Math.max(
            Math.min(
              props.drawArea.positionX + props.drawArea.leftOffset,
              props.isImageSize.w - props.drawArea.width
            ),
            0
          ),
        top:
          Math.max(
            Math.min(
              props.drawArea.positionY + props.drawArea.topOffset,
              props.isImageSize.h - props.drawArea.height
            ),
            0
          ),
        height: `${Math.min(props.drawArea.height, props.isImageSize.h)}px`,
        width: `${Math.min(props.drawArea.width, props.isImageSize.w)}px`,
        border: "2px solid #ffdd00",
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/*<GiConvergenceTarget style={{color: '#ffdd00', fontSize: 35}} />*/}
    </div>
  );
};

export default CropPreArea;
