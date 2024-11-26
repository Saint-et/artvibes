import {
  BoldDraftjsMap,
  ColorDraftjsMap,
  FontSizeDraftjsMap,
  ItalicDraftjsMap,
  UnderlineDraftjsMap,
} from "@/public/assets/data/data";
import { DrawText, LayerElement } from "@/utils/interface";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import { useRef } from "react";
//import "draft-js/dist/Draft.css";

interface RichTextItem {
  text: string;
  style: Record<string, string>;
}

interface RichTextProps {
  //updateContent: (newContent: RichTextItem[]) => void;
  //textCanvasRef: React.RefObject<Editor | null>;
  drawText: DrawText;
  //setDrawText: React.Dispatch<React.SetStateAction<any>>;
  //contentRichText: RichTextItem[];
  //setContentRichText: React.Dispatch<React.SetStateAction<any>>;
  //contentRichTextSave: RichTextItem[];
  //setContentRichTextSave: React.Dispatch<React.SetStateAction<any>>;
  editorState: any;
  setEditorState: React.Dispatch<React.SetStateAction<any>>;
  editorRef: React.RefObject<Editor>;
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
    >
      <Editor
        ref={props.editorRef}
        customStyleMap={{
          ...ColorDraftjsMap,
          ...FontSizeDraftjsMap,
          ...ItalicDraftjsMap,
          ...UnderlineDraftjsMap,
          ...BoldDraftjsMap,
        }}
        blockStyleFn={blockStyleFn}
        editorState={props.editorState}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default RichTextChild;
