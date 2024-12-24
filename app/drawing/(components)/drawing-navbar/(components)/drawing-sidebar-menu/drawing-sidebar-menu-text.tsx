import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  arrayFontSizeDraftjsMap,
  BoldDraftjsMap,
  ColorDraftjsMap,
  ColorsDrawing,
  DrawingName,
  FontSizeDraftjsMap,
  ItalicDraftjsMap,
  PoliceMap,
  PoliceMapDraftjsMap,
  ShadowTextDrawing,
  UnderlineDraftjsMap,
} from "@/public/assets/data/data";
import { DrawText, IsNewOverlay, NewImageSize } from "@/utils/interface";
import { CustomStyleMap } from "@/utils/type";
import {
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  SelectionState,
} from "draft-js";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  FaAlignLeft,
  FaAlignCenter,
  FaAlignJustify,
  FaAlignRight,
  FaBold,
  FaUnderline,
  FaItalic,
} from "react-icons/fa";
import {
  LuMoonStar,
  LuPlus,
  LuSparkles,
  LuTextCursorInput,
} from "react-icons/lu";

interface DrawingSidebarMenuTextProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  textSizeRef: React.RefObject<HTMLInputElement>;
  isMenuOpen: number;
  textCanvasVisible: boolean;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  setDrawText: React.Dispatch<React.SetStateAction<any>>;
  setTextCanvasVisible: React.Dispatch<React.SetStateAction<any>>;
  isImageSize: NewImageSize;
  sidebarRef: MutableRefObject<HTMLDivElement | null>;
  textCanvasContainerRef: MutableRefObject<HTMLDivElement | null>;
  textCanvasRef: MutableRefObject<HTMLDivElement | null>;
  isImgOverlay: IsNewOverlay;
  handleResetImgOverlay: () => void;
  handleSaveImgOverlay: () => void;
  drawText: DrawText;
  handleSaveText: (newValue?: boolean) => void;
  editorState: any;
  setEditorState: React.Dispatch<React.SetStateAction<any>>;
  customStyleMap: CustomStyleMap;
  setCustomStyleMap: React.Dispatch<React.SetStateAction<any>>;
  setOutsideClickActive: React.Dispatch<React.SetStateAction<any>>;
  customStyleShadowMap: CustomStyleMap;
  setCustomStyleShadowMap: React.Dispatch<React.SetStateAction<any>>;
}

const DrawingSidebarMenuText: React.FC<DrawingSidebarMenuTextProps> = (
  props
) => {
  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const colorInput2Ref = useRef<HTMLInputElement | null>(null);
  const handleButtonClickColor = (ref: HTMLInputElement | null) => {
    if (ref) {
      ref.click();
    }
  };

  const [isColorShadowText, setColorShadowText] = useState<string>("#ff0000");

  const justifyText = [
    { justify: "start", icon: FaAlignLeft, click: null },
    { justify: "center", icon: FaAlignCenter, click: null },
    { justify: "justify", icon: FaAlignJustify, click: null },
    { justify: "end", icon: FaAlignRight, click: null },
  ];

  const toggleStyleDraft = (toggledStyle: string, styleMap?: any) => {
    const selection = props.editorState.getSelection();

    // Supprimer toutes les couleurs actives
    const nextContentState = Object.keys(styleMap).reduce(
      (contentState, value) => {
        return Modifier.removeInlineStyle(contentState, selection, value);
      },
      props.editorState.getCurrentContent()
    );

    // Créer un nouvel état
    let nextEditorState = EditorState.push(
      props.editorState,
      nextContentState,
      "change-inline-style"
    );

    const currentStyle = props.editorState.getCurrentInlineStyle();

    // Si la sélection est vide, retirer les styles actuels
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state: any, value: any) => {
        return RichUtils.toggleInlineStyle(state, value);
      }, nextEditorState);
    }

    // Ajouter la nouvelle couleur si elle n'est pas déjà active
    if (!currentStyle.has(toggledStyle)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledStyle
      );
    }

    // Mettre à jour l'état de l'éditeur
    props.setEditorState(nextEditorState);
  };

  const textParams = [
    {
      icon: FaBold,
      on: props.drawText.fontWeight,
      click: () => {
        toggleStyleDraft(`BOLD_bold`, BoldDraftjsMap);
        props.setDrawText((prev: DrawText) => ({
          ...prev,
          fontWeight:
            props.drawText.fontWeight === "bolder" ? "normal" : "bolder",
        }));
      },
    },
    {
      icon: FaUnderline,
      on: props.drawText.textDecoration,
      click: () => {
        props.setDrawText((prev: DrawText) => ({
          ...prev,
          textDecoration:
            props.drawText.textDecoration === "underline"
              ? "none"
              : "underline",
        }));
        toggleStyleDraft(`UNDERLINE_underline`, UnderlineDraftjsMap);
      },
    },
    {
      icon: FaItalic,
      on: props.drawText.fontStyle,
      click: () => {
        //props.setDrawText((prev: DrawText) => ({
        //  ...prev,
        //  fontStyle:
        //    props.drawText.fontStyle === "normal" ? "italic" : "normal",
        //}));
        toggleStyleDraft(`ITALIC_italic`, ItalicDraftjsMap);
      },
    },
  ];

  //console.log(props.drawText);

  if (props.isMenuOpen !== 2) return null;

  return (
    <>
      <Card className="border-none rounded-none bg-transparent">
        <CardContent className="grid grid-cols-1 gap-2 p-4 text-black dark:text-white">
          <div className="text-1xl flex justify-between">
            Text :<LuTextCursorInput className="h-4 w-4" />
          </div>
          <Separator className="my-2" />
          <div className="grid grid-cols-4 gap-2 p-1">
            {justifyText?.map((el, index) => (
              <Button
                key={index}
                className="flex flex-col justify-center items-center h-full"
                variant={
                  props.drawText.textAlign === el.justify
                    ? "activeBlue"
                    : "ghost"
                }
                onClick={() => {
                  props.setDrawText((prevState: DrawText) => ({
                    ...prevState,
                    textAlign: el.justify,
                  }));
                }}
              >
                <el.icon className="text-1xl" />
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 p-1">
            {textParams?.map((el, index) => (
              <Button
                key={index}
                className="flex flex-col justify-center items-center h-full"
                variant={
                  el.on === "underline"
                    ? "activeBlue"
                    : el.on === "italic"
                    ? "activeBlue"
                    : el.on === "bolder"
                    ? "activeBlue"
                    : "ghost"
                }
                onClick={(e) => {
                  e.preventDefault();
                  if (el.click) {
                    el.click(); // Appel de la fonction `click` si elle existe
                  }
                }}
              >
                <el.icon className="text-1xl" />
              </Button>
            ))}
          </div>
          <Separator className="my-2" />
          <div className="grid grid-cols-5 gap-4">
            <Button
              className="rounded-full hue-background"
              variant="ghost"
              size="icon"
              onBlur={() => {
                let color = colorInputRef.current?.value;
                if (!color) return;
                if (!props.customStyleMap[`COLOR_${color}`]) {
                  props.setCustomStyleMap((prev: CustomStyleMap) => ({
                    ...prev,
                    [`COLOR_${color}`]: { color },
                  }));
                }
                toggleStyleDraft(`COLOR_${color}`, props.customStyleMap);
              }}
              onClick={() => {
                props.setOutsideClickActive(false);
                handleButtonClickColor(colorInputRef.current);
              }}
            >
              <input
                ref={colorInputRef}
                //defaultValue={isSystemColor}
                onChange={(e) => {
                  e.currentTarget.value = e.target.value;
                }}
                className="appearance-none cursor-pointer"
                style={{
                  background: "none",
                  opacity: 0,
                  zIndex: -1,
                  width: 0,
                  height: 0,
                }}
                type="color"
                name=""
                id=""
              />
            </Button>
            {ColorsDrawing.map((color: any) => (
              <Button
                key={color.name}
                className="rounded-full border"
                style={{ backgroundColor: color.value }}
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  toggleStyleDraft(`COLOR_${color.name}`, ColorDraftjsMap);
                }}
              />
            ))}
          </div>
          <Separator className="my-2" />
          <Select
            value={`${""}`}
            onValueChange={(e) => {
              toggleStyleDraft(`FONTFAMILY_${e}`, PoliceMapDraftjsMap);
            }}
          >
            <SelectTrigger className="w-full mb-2 text-white">
              <div className={PoliceMap[0]?.value}>{PoliceMap[0]?.name}</div>
            </SelectTrigger>
            <SelectContent ref={props.textSizeRef}>
              {PoliceMap?.map((value, index) => (
                <SelectItem
                  key={index}
                  value={`${value.name}`}
                  className={value.name}
                  style={{
                    marginBottom: 10,
                    marginTop: 10,
                  }}
                >
                  {value.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="grid grid-cols-2 gap-2 p-1">
            <Button
              className="flex flex-col justify-center items-center h-full border text-white"
              onClick={() => {
                props.handleSaveText(true);
              }}
              variant={props.textCanvasVisible ? "activeBlue" : "outline"}
            >
              <LuTextCursorInput className="text-2xl" />
            </Button>

            <Select
              value={`${props.drawText.fontSize}`}
              onValueChange={(e) => {
                toggleStyleDraft(e, FontSizeDraftjsMap);
              }}
            >
              <SelectTrigger
                className="w-full mb-2 text-white"
                //tabIndex={-1}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
              >
                <div>{props.drawText.fontSize} px</div>
              </SelectTrigger>
              <SelectContent
                ref={props.textSizeRef}
                //tabIndex={-1}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
              >
                {arrayFontSizeDraftjsMap?.map((value: number, index) => (
                  <SelectItem key={index} value={`FONT_SIZE_${value}`}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <Separator className="my-2" />
        <CardHeader>
          <CardTitle className="text-1xl flex justify-between text-black dark:text-white">
            Shadow :<LuMoonStar className="text-1xl" />
          </CardTitle>
        </CardHeader>

        <div className="grid grid-cols-5 gap-4 p-4">
          <Button
            className="rounded-full hue-background"
            variant="ghost"
            size="icon"
            onBlur={() => {
              let color = colorInput2Ref.current?.value;
              if (!color) return;
              setColorShadowText(color);
            }}
            onClick={() => {
              props.setOutsideClickActive(false);
              handleButtonClickColor(colorInput2Ref.current);
            }}
          >
            <input
              ref={colorInput2Ref}
              //defaultValue={isSystemColor}
              onChange={(e) => {
                e.currentTarget.value = e.target.value;
              }}
              className="appearance-none cursor-pointer"
              style={{
                background: "none",
                opacity: 0,
                zIndex: -1,
                width: 0,
                height: 0,
              }}
              type="color"
              name=""
              id=""
            />
          </Button>
          {ColorsDrawing.map((color: any) => (
            <Button
              key={color.name}
              className="rounded-full border"
              style={{ backgroundColor: color.value }}
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                setColorShadowText(color.value);
              }}
            />
          ))}
        </div>
        <div className="w-full grid grid-cols-1 gap-2 p-4">
          {ShadowTextDrawing?.map((el, index) => (
            <Button
              key={index}
              variant="outline"
              style={{
                fontSize: 20,
                textShadow: el.value + isColorShadowText,
              }}
              onClick={() => {
                if (
                  !props.customStyleShadowMap[
                    `SHADOW_${el.name}$-{isColorShadowText}`
                  ]
                ) {
                  props.setCustomStyleShadowMap((prev: CustomStyleMap) => ({
                    ...prev,
                    [`SHADOW_${el.name}-${isColorShadowText}`]: {
                      textShadow: `${el.value} ${isColorShadowText}`,
                    },
                  }));
                }
                toggleStyleDraft(
                  `SHADOW_${el.name}-${isColorShadowText}`,
                  props.customStyleShadowMap
                );
              }}
            >
              {DrawingName}
            </Button>
          ))}
        </div>
        <Separator className="my-2" />
        <CardHeader>
          <CardTitle className="text-1xl flex justify-between">
            Text generator :<LuSparkles className="text-1xl" />
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div className="flex w-full items-center justify-center">
            <div className="grid w-full max-w-sm gap-2">
              <Textarea
                className="h-[100px]"
                style={{ resize: "none" }}
                placeholder="Type your text here."
                disabled
              />
              <Button className="gradient-animated5" disabled>
                Edit text
              </Button>
            </div>
          </div>
          <Separator className="my-4" />
          <Card className="bg-transparent transition cursor-pointer text-neutral-400 hover:scale-105 hover:text-white">
            <CardContent className="p-2 h-20 text-sm text-ellipsis overflow-hidden">
              <div className="w-full flex justify-end">
                <LuSparkles className="text-1xl" />
              </div>
              <p>This feature is not available at this time.</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
};

export default DrawingSidebarMenuText;
