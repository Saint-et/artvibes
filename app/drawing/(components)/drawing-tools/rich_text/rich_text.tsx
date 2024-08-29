import { DrawText } from "@/utils/interface";
import { useEffect, useState } from "react";

interface Props {
  drawText: DrawText;
  setDrawText: React.Dispatch<React.SetStateAction<DrawText>>;
  textCanvasRef: React.RefObject<HTMLDivElement>;
}

const Rich_text: React.FC<Props> = (props) => {
  return (
    <>
      <div
        ref={props.textCanvasRef}
        className="input_textareaCreative"
        style={{
          userSelect: "none",
          fontSize: props.drawText.fontSize,
          color: props.drawText.color,
          textAlign: props.drawText.textAlign,
        }}
        //onInput={handleInputChange}
        onMouseDown={(e) => {
          e.stopPropagation();
          //getColorAtCursor();
        }}
        onDragStart={(e) => {
          e.preventDefault();
        }}
        {...(props.drawText.value && {
          dangerouslySetInnerHTML: { __html: props.drawText.value },
        })}
        contentEditable={true}
      />
    </>
  );
};

export default Rich_text;
