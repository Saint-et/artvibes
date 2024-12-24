import {
  BoldDraftjsMap,
  ColorDraftjsMap,
  FontSizeDraftjsMap,
  ItalicDraftjsMap,
  PoliceMapDraftjsMap,
  UnderlineDraftjsMap,
} from "@/public/assets/data/data";
import { DrawText } from "@/utils/interface";
import { CustomStyleMap } from "@/utils/type";
import { getStylesValuesAtCursor } from "@/utils/utils";
import { ContentState, Editor, EditorState, SelectionState } from "draft-js";
import { useEffect } from "react";
//import "draft-js/dist/Draft.css";

interface RichTextProps {
  //updateContent: (newContent: RichTextItem[]) => void;
  //textCanvasRef: React.RefObject<Editor | null>;
  drawText: DrawText;
  setDrawText: React.Dispatch<React.SetStateAction<any>>;
  editorState: any;
  setEditorState: React.Dispatch<React.SetStateAction<any>>;
  editorRef: React.RefObject<Editor>;
  customStyleMap: CustomStyleMap;
  customStyleShadowMap: CustomStyleMap;
  setCustomStyleMap: React.Dispatch<React.SetStateAction<any>>;
}

const RichTextChild: React.FC<RichTextProps> = (props) => {
  const handleEditorChange = (newState: EditorState) => {
    props.setEditorState(newState);
  };

  const blockStyleFn = (contentBlock: any) => {
    const textAlign = contentBlock.getData().get("textAlign");
    if (textAlign) {
      return "text-center"; // Retourne une classe CSS
    }
    return "";
  };

  const customStyleSelectionMap = {
    ...ColorDraftjsMap,
    ...FontSizeDraftjsMap,
    ...ItalicDraftjsMap,
    ...UnderlineDraftjsMap,
    ...BoldDraftjsMap,
    ...props.customStyleMap,
    ...props.customStyleShadowMap,
    ...PoliceMapDraftjsMap,
  };

  const handleGetStyleDraftJs = () => {
    if (!props.editorRef.current) return;
    const cursorData = getStylesValuesAtCursor(
      props.editorState,
      customStyleSelectionMap
    );
    if (!cursorData) return;
    
    props.setDrawText((prev: DrawText) => ({
      ...prev,
      fontSize: cursorData.fontSize,
      textDecoration: cursorData.textDecoration,
      textShadow: cursorData.textShadow,
      fontStyle: cursorData.fontStyle,
      fontWeight: cursorData.fontWeight,
    }));
  };

  useEffect(() => {
    handleGetStyleDraftJs();
  }, [props.editorRef.current]);

  return (
    <div
      className="input_textareaCreative"
      style={{
        zIndex: 200,
        userSelect: "none",
        textAlign: props.drawText.textAlign,
        //fontSize: props.drawText.fontSize, blockStyleFn={blockStyleFn}
        position: "absolute",
        top: "0px",
        left: "0px",
        cursor: "text",
        width: "100%",
        height: "100%",
      }}
      onClick={() => {
        handleGetStyleDraftJs();
      }}
    >
      <Editor
        ref={props.editorRef}
        customStyleMap={{
          ...ColorDraftjsMap,
          ...FontSizeDraftjsMap,
          ...ItalicDraftjsMap,
          ...UnderlineDraftjsMap,
          ...BoldDraftjsMap,
          ...props.customStyleMap,
          ...props.customStyleShadowMap,
          ...PoliceMapDraftjsMap,
        }}
        blockStyleFn={blockStyleFn}
        editorState={props.editorState}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default RichTextChild;
