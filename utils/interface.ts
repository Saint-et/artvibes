import { RawDraftContentState } from "draft-js";
import { DrawTypeNowCanvas } from "./type";

export interface LoadedImage {
  load: boolean;
  home: boolean;
  stateLoad: string;
  bgHome: string;
  bgHomeNegative: string;
  defaultImage: string;
  IAImage: string;
  LearnImage: string;
  newProject: string;
  discoverModel: string;
  aboutDrawing: string;
  videoToGif: string;
}

export interface DrawArea {
  width: number;
  height: number;
  leftOffset: number;
  topOffset: number;
  positionX: number;
  positionY: number;
  rotate: number;
}

type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';
export interface DrawText {
  id: number;
  value: string;
  color: string;
  fontSize: number;
  underline: string;
  fontStyle: string;
  fontWeight: string;
  textAlign: TextAlign;
  opacity: number;
}

export interface IsNewImage {
  id: number;
  fileName: string;
  img: string;
  miniature: string;
}

export interface ExpandImg {
  bgColor: string;
  bgType: string;
  bgExpand: string,
  miniature: string;
  expand: number;
  expandFilter: {
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

export interface Blanket {
  color1: string;
  color2: string;
  transparent1: boolean;
  transparent2: boolean;
  expand: boolean;
  opacity: number;
  rotate: number;
  size: number;
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
  miniature: string;
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
  type: {
    insetImg: boolean;
    insetExpand: boolean;
    outsideImg: boolean;
  },
  size: {
    sizeImg: number;
    sizeExpand: number;
    sizeOutsideImg: number;
  },
  opacity: {
    opacityImg: number;
    opacityExpand: number;
    opacityOutsideImg: number;
  },
  color: {
    colorImg: string;
    colorExpand: string;
    colorOutsideImg: string;
  }
  blur: {
    OutsideImgBlur: boolean;
  },
  height: {
    OutsideImgHeight: number;
  },
  width: {
    OutsideImgWidth: number;
  }
}
export interface NewImageSize {
  w: number;
  h: number;
}

export interface ImgBorderOn {
  border: boolean;
  user: boolean;
}

export interface RenderingOption {
  reziseImg: true;
  sharpenImg: boolean;
  smoothImg: true;
  width: number;
  height: number;
}

export interface DrawForm {
  id: number;
  color: string;
  thickness: number;
  opacity: number;
}
export interface DrawDrawing {
  id: number;
  color: string;
  thickness: number;
}
export interface DrawSvg {
  id: number;
  img: string;
  svg: string;
  thickness: number;
  borderColor: string;
  opacity: number;
  crop: {
    x: number;
    y: number;
    size: number;
  };
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
export interface DrawSvgFull {
  id: number;
  svg: string;
  thickness: number;
  borderColor: string;
  color: string;
  opacity: number;
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
  rotate: number;
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
export interface MenuLayer {
  menu: boolean;
  on: number;
  auto: boolean;
  uniqueOverlaySelect: boolean;
  uniqueOverlaySelectPreview: number;
  blockOverlay: []
}
type DrawingSeparatorBorderType =
  | '3x3'
  | '2x2'
  | 'none';
type DrawingSettingYNType =
  | 'no'
  | 'yes';
type DrawingSettingLanguageType =
  | 'French'
  | 'English';
type DrawingSettingOptimizationType =
  | 'resolution'
  | 'performance';
export interface DrawingSetting {
  separatorBorder: DrawingSeparatorBorderType;
  transparence: boolean;
  maxZoom: number;
  overflowCanvas: string;
  overflowExpand: string;
  deleteOutsideOverlay: DrawingSettingYNType;
  language: DrawingSettingLanguageType;
  optimization: DrawingSettingOptimizationType;
  storage: DrawingSettingYNType;
  paint: {
    hideElCanvas: boolean;
    showDrawSelected: boolean;
    opacity: boolean;
  },
  imgRendering: boolean,
  background: DrawingSettingYNType,
}
export interface LayerDrawForm {
  layerType: 'form';
  id: number;
  formType: string;
  color: string;
  thickness: number;
  opacity: number;
  rotate: number;
  h: number;
  w: number;
  x: number;
  y: number;
}
type LayerElementType =
  | 'overlay'
  | 'overlay-svg'
  | 'form'
  | 'draw'
  | 'text'
  | 'overlay-svg-full'
  | null;
type LayerElementTextAlign =
  | 'center'
  | 'justify'
  | 'end'
  | 'start';

type IsNewOverlayLayerElementType =
  | 'expand'
  | 'canvas';
export interface LayerElement {
  layerType: LayerElementType;
  id: number;
  form: string;
  img: string;
  miniature: string;
  overflowContainer: IsNewOverlayLayerElementType;
  editorDraftjs: any;
  text: string;
  svgImg: string;
  svg: string;
  fontSize: number;
  underline: string;
  fontStyle: string;
  fontWeight: string;
  textAlign: LayerElementTextAlign;
  cropY: number;
  opacity: number;
  shadow: number;
  borderColor: string;
  expand: number;
  color: string;
  thickness: number;
  formType: string;
  h: number;
  w: number;
  x: number;
  y: number;
  rotate: number;
  filter: {
    brightness: number;
    contrast: number;
    saturation: number;
    hue: number;
    blur: number;
    sepia: number;
    grayscale: number;
    invert: number;
  };
  crop: {
    x: number;
    y: number;
    size: number;
  },
}

type DrawNowDirectionInterface =
  | 'horizontal'
  | 'vertical';
export interface DrawNowInterface {
  type: DrawTypeNowCanvas;
  id: number | null;
  active: boolean;
  isMouseDown: boolean;
  direction: DrawNowDirectionInterface;
}
export interface AiQuality {
  style: string;
  noise: number;
  scale: number;
  tta: number;
}
export interface WaifuProcess {
  startProcess: boolean;
  bar: number;
  openMenuEnd: boolean;
  scaleImg: number;
  params: {
    style: string;
    size: string;
    sizeAfterScale: string;
    noise: string;
    tta: string;
    time: string;
    img: string;
  }
}
export interface FileDialogOpen {
  lastImport: boolean;
  editNewPage: boolean;
  help: boolean;
}