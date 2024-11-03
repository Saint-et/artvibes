

export const DrawAreaDefault = {
    width: 300,
    height: 200,
    leftOffset: 0,
    topOffset: 0,
    positionX: 0,
    positionY: 0,
    rotate: 0,
}

export const NewImgDefault = {
    id: 0,
    fileName: "",
    img: "",
    miniature: "",
};

export const DrawingLoadDefault = {
    load: false,
    home: true,
    stateLoad: "",
    bgHome: "",
    bgHomeNegative: "",
    defaultImage: "",
    IAImage: "",
    LearnImage: "",
    newProject: "",
    discoverModel: "",
    aboutDrawing: "",
    videoToGif: "",
}

export const BlanketDefault = {
    color1: "",
    color2: "",
    transparent1: true,
    transparent2: true,
    expand: false,
    opacity: 0.1,
    rotate: 0,
    size: 100,
}
export const ExpandDefault = {
    bgColor: "#000000",
    bgType: "bgTransparent",
    bgExpand: "",
    miniature: "",
    expand: 0,
    expandFilter: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hue: 0,
        blur: 0,
        sepia: 0,
        grayscale: 0,
        invert: 0,
    }
}
export const DrawingFilterDefault = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    blur: 0,
    sepia: 0,
    grayscale: 0,
    invert: 0,
}
export const LayersDefault = []

export const SystemShadowDefault = {
    type: {
        insetImg: false,
        insetExpand: false,
        outsideImg: false,
    },
    size: {
        sizeImg: 0,
        sizeExpand: 0,
        sizeOutsideImg: 0,
    },
    opacity: {
        opacityImg: 0,
        opacityExpand: 0,
        opacityOutsideImg: 0,
    },
    color: {
        colorImg: "#000000",
        colorExpand: "#000000",
        colorOutsideImg: "#000000",
    },
    blur: {
        OutsideImgBlur: true,
    },
    height: {
        OutsideImgHeight: 0,
    },
    width: {
        OutsideImgWidth: 0,
    }
}

export const ColorsDrawing = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Red", value: "#EF4444" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Blue dark", value: "#3F48CC" },
    { name: "Green", value: "#10B981" },
    { name: "Yellow", value: "#F59E0B" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Pink", value: "#EC4899" },
];


export const WaifuProcessDefault = {
    startProcess: false,
    bar: 0,
    openMenuEnd: false,
    scaleImg: 1,
    params: {
        style: '',
        size: '',
        sizeAfterScale: '',
        noise: '',
        tta: '',
        time: '',
        img: ''
    }
};