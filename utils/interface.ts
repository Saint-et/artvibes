export interface DrawArea {
  width: number;
  height: number;
  leftOffset: number;
  topOffset: number;
  positionX: number;
  positionY: number;
}

type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';
export interface DrawText {
  value: string;
  color: string;
  fontSize: number;
  underline: string;
  fontStyle: string;
  fontWeight: string;
  textAlign: TextAlign;
}

export interface IsNewImage {
  id: number;
  fileName: string;
  img: string;
}

export interface IsNewCropImage {
  id: number;
  fileName: string;
  array: {
    img: string;
    area: DrawArea;
  }[];
}
export interface IsNewOverlay {
  id: number;
  form: string;
  img: string;
  cropY: number;
  opacity: number;
  shadow: number;
  borderColor: string;
  filter: {
    brightness: number;
    contrast: number;
    saturation: number;
    hue: number;
    blur: number;
    sepia: number;
    grayscale: number;
    invert: number;
  }
}
export interface IsNewOverlaySave {
  id: number;
  form: string;
  img: string;
  cropY: number;
  opacity: number;
  shadow: number;
  borderColor: string;
  h: number;
  w: number;
  x: number;
  y: number;
  filter: {
    brightness: number;
    contrast: number;
    saturation: number;
    hue: number;
    blur: number;
    sepia: number;
    grayscale: number;
    invert: number;
  }
}

export interface SystemSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
  blur: number;
  sepia: number;
  grayscale: number;
  invert: number;
}
export interface SystemShadow {
  opacity: number;
  size: number;
  color: string;
  x: number;
  y: number;
}
export interface NewImageSize {
  w: number;
  h: number;
}

export interface ImgBorderOn {
  border: boolean;
  user: boolean;
}