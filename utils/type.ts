export type ResizeDirection =
  | "right-bottom"
  | "left-bottom"
  | "left-top"
  | "right-top"
  | "right"
  | "bottom"
  | "left"
  | "top"
  | "top-move"
  | "right-crop"
  | "bottom-crop"
  | "left-crop"
  | "top-crop"
  | "left-top-single"
  | "right-top-single"
  | "left-bottom-single"
  | "right-bottom-single"
  | "rotate"
  | "rotate-blanket"
  | null;

export type DrawTypeNowCanvas =
  | "pen"
  | "eraser"
  | "brush"
  | "highlight";

  
  export type CustomStyleMap = {
  [key: string]: { value: string };
};