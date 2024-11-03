import { DrawText } from "@/utils/interface";
import { useEffect } from "react";

interface Props {
  drawText: DrawText;
  setDrawText: React.Dispatch<React.SetStateAction<DrawText>>;
  textCanvasRef: React.RefObject<HTMLDivElement>;
}

const Rich_text: React.FC<Props> = (props) => {
  const handleInputChangeText = (e: any) => {
    props.setDrawText((prevState: DrawText) => ({
      ...prevState,
      value: e,
    }));
  };

  useEffect(() => {
    if (props.textCanvasRef.current) {
      props.textCanvasRef.current.innerHTML = props.drawText.value;
    }
  }, []);

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
          position: "absolute",
          top: "0px",
          left: "0px",
          cursor: "text",
        }}
        onDoubleClick={() => {
          if (props.textCanvasRef.current) {
            props.textCanvasRef.current.innerHTML = props.drawText.value;
          }
        }}
        onInput={(e) => {
          handleInputChangeText(e.currentTarget.innerHTML);
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        onDragStart={(e) => {
          e.preventDefault();
        }}
        contentEditable={true}
      />
    </>
  );
};

export default Rich_text;
