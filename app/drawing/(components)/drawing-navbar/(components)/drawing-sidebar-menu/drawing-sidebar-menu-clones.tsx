import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  ColorsDrawing,
  ExpandShadowPresetExpand,
  ShadowPresetExpand,
} from "@/public/assets/data/data";
import { IsNewImage, SystemShadow } from "@/utils/interface";
import { MutableRefObject, useRef } from "react";
import {
  LuArrowUpRightSquare,
  LuBan,
  LuMoonStar,
  LuPaintBucket,
  LuRefreshCw,
} from "react-icons/lu";
import Image from "next/image";

interface DrawingSidebarMenuClonesProps {
  isMenuOpen: number;
  setMenuOpen: React.Dispatch<React.SetStateAction<any>>;
  systemShadow: SystemShadow;
  setSystemShadow: React.Dispatch<React.SetStateAction<any>>;
  isNewImage: IsNewImage;
  insetImgRef: MutableRefObject<HTMLDivElement | null>;
  insetExpandRef: MutableRefObject<HTMLDivElement | null>;
  colorOutsideImgRef: MutableRefObject<HTMLDivElement | null>;
}

const DrawingSidebarMenuClones: React.FC<DrawingSidebarMenuClonesProps> = (
  props
) => {
  const colorImgInputRef = useRef<HTMLInputElement | null>(null);
  const colorExpandInputRef = useRef<HTMLInputElement | null>(null);
  const outsideImgInputRef = useRef<HTMLInputElement | null>(null);

  const Reset = (
    dinamicValueKey1: string,
    dinamicValueKey2: string,
    dinamicValueKey3: string
  ) => {
    return (
      <Card
        className="relative overflow-hidden rounded-lg group cursor-pointer"
        onClick={() => {
          props.setSystemShadow((prevState: any) => ({
            ...prevState,
            type: {
              ...prevState.type,
              [dinamicValueKey1]: false,
            },
            opacity: {
              ...prevState.opacity,
              [dinamicValueKey2]: 0,
            },
            size: {
              ...prevState.size,
              [dinamicValueKey3]: 0,
            },
          }));
        }}
      >
        <CardContent className="p-0 flex justify-center items-center h-full w-full">
          <LuBan className="text-3xl transition-transform duration-300 ease-in-out group-hover:scale-105" />
        </CardContent>
      </Card>
    );
  };

  const handleButtonClickColor = (ref: HTMLInputElement | null) => {
    if (ref) {
      ref.click();
    }
  };

  if (props.isMenuOpen !== 6) return null;

  return (
    <>
      <Card className="border-none rounded-none bg-transparent">
        <CardContent className="grid grid-cols-1 gap-2 p-4">
          <div className="text-1xl flex justify-between">
            Shadow :<LuMoonStar className="h-4 w-4" />
          </div>
          <Separator className="my-2" />
          <div>Inside image :</div>
          <div className="p-4">
            <div className="grid grid-cols-5 gap-4">
              <Button
                className="rounded-full hue-background"
                variant={"outline"}
                size="icon"
                onClick={() => handleButtonClickColor(colorImgInputRef.current)}
                //style={{
                //  background: props.systemShadow.color.colorImg,
                //}}
                onBlur={() => {
                  if (colorImgInputRef?.current) {
                    let color = colorImgInputRef.current.value;
                    props.setSystemShadow((prevState: any) => ({
                      ...prevState,
                      color: {
                        ...prevState.color,
                        colorImg: color || "#000000",
                      },
                    }));
                  }
                }}
                disabled={!props.systemShadow.type.insetImg}
              >
                <input
                  ref={colorImgInputRef}
                  defaultValue={props.systemShadow.color.colorImg}
                  onChange={(e) => {
                    e.currentTarget.value = e.target.value;
                    if (props.insetImgRef?.current) {
                      props.insetImgRef.current.style.boxShadow = `${0}px ${0}px ${Math.min(
                        props.systemShadow.opacity.opacityImg,
                        4
                      )}px ${Math.min(props.systemShadow.size.sizeImg, 2)}px ${
                        e.target.value
                      },inset
                    ${0}px ${0}px ${0}px ${Math.min(
                        props.systemShadow.size.sizeImg / 2,
                        2
                      )}px ${e.target.value}
                    ,inset ${0}px ${0}px ${
                        props.systemShadow.opacity.opacityImg
                      }px ${props.systemShadow.size.sizeImg}px ${
                        e.target.value
                      }`;
                    }
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
                  className="rounded-full"
                  style={{ backgroundColor: color.value }}
                  size="icon"
                  disabled={!props.systemShadow.type.insetImg}
                  onClick={() => {
                    if (colorImgInputRef?.current) {
                      props.setSystemShadow((prevState: any) => ({
                        ...prevState,
                        color: {
                          ...prevState.color,
                          colorImg: color.value || "#000000",
                        },
                      }));
                    }
                  }}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 p-4">
            {Reset("insetImg", "opacityImg", "sizeImg")}
            {ShadowPresetExpand?.map((value, index: number) => (
              <div
                key={index}
                className="relative overflow-hidden group cursor-pointer w-full h-24 transition-transform duration-300 ease-in-out group-hover:scale-105 drawing-css-bg-main-tranparent"
                onClick={() => {
                  props.setSystemShadow((prevState: any) => ({
                    ...prevState,
                    type: {
                      ...prevState.type,
                      insetImg: true,
                    },
                    opacity: {
                      ...prevState.opacity,
                      opacityImg: value.opacity,
                    },
                    size: {
                      ...prevState.size,
                      sizeImg: value.size,
                    },
                  }));
                }}
              >
                <div
                  className="absolute inset-0 flex flex-col justify-end text-white"
                  style={{
                    boxShadow: `inset ${0}px ${0}px ${value.opacity / 4}px ${
                      value.size / 4
                    }px ${props.systemShadow.color.colorImg}`,
                  }}
                ></div>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div>Inside expand :</div>

          <div className="p-4">
            <div className="grid grid-cols-5 gap-4">
              <Button
                className="rounded-full hue-background"
                variant={"outline"}
                size="icon"
                onClick={() =>
                  handleButtonClickColor(colorExpandInputRef.current)
                }
                //style={{
                //  background: props.systemShadow.color.colorExpand,
                //}}
                disabled={!props.systemShadow.type.insetExpand}
                onBlur={() => {
                  if (colorExpandInputRef?.current) {
                    let color = colorExpandInputRef.current.value;
                    props.setSystemShadow((prevState: any) => ({
                      ...prevState,
                      color: {
                        ...prevState.color,
                        colorExpand: color || "#000000",
                      },
                    }));
                  }
                }}
              >
                <input
                  ref={colorExpandInputRef}
                  defaultValue={props.systemShadow.color.colorExpand}
                  onChange={(e) => {
                    if (props.insetExpandRef?.current) {
                      props.insetExpandRef.current.style.boxShadow = `${0}px ${0}px ${Math.min(
                        props.systemShadow.opacity.opacityExpand,
                        4
                      )}px ${Math.min(
                        props.systemShadow.size.sizeExpand,
                        2
                      )}px ${e.target.value},
                        inset
                        ${0}px ${0}px ${0}px ${Math.min(
                        props.systemShadow.size.sizeExpand / 2,
                        2
                      )}px ${e.target.value}
                        ,inset ${0}px ${0}px ${
                        props.systemShadow.opacity.opacityExpand
                      }px ${props.systemShadow.size.sizeExpand}px ${
                        e.target.value
                      }`;
                    }
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
                  className="rounded-full"
                  style={{ backgroundColor: color.value }}
                  size="icon"
                  disabled={!props.systemShadow.type.insetExpand}
                  onClick={() => {
                    if (colorExpandInputRef?.current) {
                      props.setSystemShadow((prevState: any) => ({
                        ...prevState,
                        color: {
                          ...prevState.color,
                          colorExpand: color.value || "#000000",
                        },
                      }));
                    }
                  }}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 p-4">
            {Reset("insetExpand", "opacityExpand", "sizeExpand")}
            {ShadowPresetExpand?.map((value, index: number) => (
              <div
                key={index}
                className="relative overflow-hidden group cursor-pointer w-full h-24 transition-transform duration-300 ease-in-out group-hover:scale-105 drawing-css-bg-main-tranparent"
                onClick={() => {
                  props.setSystemShadow((prevState: any) => ({
                    ...prevState,
                    type: {
                      ...prevState.type,
                      insetExpand: true,
                    },
                    opacity: {
                      ...prevState.opacity,
                      opacityExpand: value.opacity,
                    },
                    size: {
                      ...prevState.size,
                      sizeExpand: value.size,
                    },
                  }));
                }}
              >
                <div
                  className="absolute inset-0 flex flex-col justify-end text-white"
                  style={{
                    boxShadow: `inset ${0}px ${0}px ${value.opacity / 4}px ${
                      value.size / 4
                    }px ${props.systemShadow.color.colorExpand}`,
                  }}
                ></div>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div>Outside image:</div>
          <div
            className="flex items-center text-[13px] text-blue-500 hover:underline"
            onClick={() => {
              props.setMenuOpen(props.isMenuOpen === 10 ? 0 : 10);
            }}
          >
            You must apply Expande for this option{" "}
            <LuArrowUpRightSquare className="ml-2" />
          </div>
          <div className="p-4">
            <div className="grid grid-cols-5 gap-4">
              <Button
                className="rounded-full hue-background"
                variant="outline"
                size="icon"
                onClick={() =>
                  handleButtonClickColor(outsideImgInputRef.current)
                }
                //style={{
                //  background: props.systemShadow.color.colorOutsideImg,
                //}}
                disabled={!props.systemShadow.type.outsideImg}
                onBlur={() => {
                  if (outsideImgInputRef?.current) {
                    let color = outsideImgInputRef.current.value;
                    props.setSystemShadow((prevState: any) => ({
                      ...prevState,
                      color: {
                        ...prevState.color,
                        colorOutsideImg: color || "#000000",
                      },
                    }));
                  }
                }}
              >
                <input
                  ref={outsideImgInputRef}
                  defaultValue={props.systemShadow.color.colorOutsideImg}
                  onChange={(e) => {
                    if (props.colorOutsideImgRef?.current) {
                      props.colorOutsideImgRef.current.style.boxShadow = `${
                        props.systemShadow.width.OutsideImgWidth
                      }px ${
                        props.systemShadow.height.OutsideImgHeight
                      }px ${Math.min(
                        props.systemShadow.opacity.opacityOutsideImg,
                        4
                      )}px ${Math.min(
                        props.systemShadow.size.sizeOutsideImg,
                        2
                      )}px ${e.target.value},
                        ${props.systemShadow.width.OutsideImgWidth}px ${
                        props.systemShadow.height.OutsideImgHeight
                      }px ${0}px ${Math.min(
                        props.systemShadow.size.sizeOutsideImg / 2,
                        2
                      )}px ${e.target.value}
                        , ${props.systemShadow.width.OutsideImgWidth}px ${
                        props.systemShadow.height.OutsideImgHeight
                      }px ${props.systemShadow.opacity.opacityOutsideImg}px ${
                        props.systemShadow.size.sizeOutsideImg
                      }px ${e.target.value}`;
                    }
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
                  className="rounded-full"
                  style={{ backgroundColor: color.value }}
                  size="icon"
                  disabled={!props.systemShadow.type.outsideImg}
                  onClick={() => {
                    if (outsideImgInputRef?.current) {
                      props.setSystemShadow((prevState: any) => ({
                        ...prevState,
                        color: {
                          ...prevState.color,
                          colorOutsideImg: color.value || "#000000",
                        },
                      }));
                    }
                  }}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 p-6">
            {Reset("outsideImg", "opacityOutsideImg", "sizeOutsideImg")}
            {[...ShadowPresetExpand, ...ExpandShadowPresetExpand]?.map(
              (value, index: number) => (
                <div
                  key={index}
                  className="relative overflow-hidden group cursor-pointer w-full h-24 transition-transform duration-300 ease-in-out group-hover:scale-105 drawing-css-bg-main-tranparent"
                  onClick={() => {
                    props.setSystemShadow((prevState: any) => ({
                      ...prevState,
                      type: {
                        ...prevState.type,
                        outsideImg: true,
                      },
                      opacity: {
                        ...prevState.opacity,
                        opacityOutsideImg: value.opacity,
                      },
                      size: {
                        ...prevState.size,
                        sizeOutsideImg: value.size,
                      },
                      blur: {
                        ...prevState.blur,
                        OutsideImgBlur: value.blur,
                      },
                    }));
                  }}
                  style={{
                    boxShadow: `${0}px ${0}px ${value.opacity / 4}px ${
                      value.size / 4
                    }px ${props.systemShadow.color.colorOutsideImg}`,
                  }}
                ></div>
              )
            )}
          </div>
          <div className="p-4">
            <div className="text-1xl flex justify-between">
              position Y: {props.systemShadow.height.OutsideImgHeight}px
              <LuRefreshCw
                className="h-4 w-4 cursor-pointer hover:animate-spin"
                onClick={() => {
                  props.setSystemShadow((prevState: any) => ({
                    ...prevState,
                    height: {
                      ...prevState.height,
                      OutsideImgHeight: 0,
                    },
                  }));
                }}
              />
            </div>
            <Slider
              value={[props.systemShadow.height.OutsideImgHeight]}
              max={100}
              min={-100}
              step={1}
              onValueChange={(e) => {
                props.setSystemShadow((prevState: any) => ({
                  ...prevState,
                  height: {
                    ...prevState.height,
                    OutsideImgHeight: e[0],
                  },
                }));
              }}
            />
            <Separator className="my-4" />
            <div className="text-1xl flex justify-between">
              position X: {props.systemShadow.width.OutsideImgWidth}px
              <LuRefreshCw
                className="h-4 w-4 cursor-pointer hover:animate-spin"
                onClick={() => {
                  props.setSystemShadow((prevState: any) => ({
                    ...prevState,
                    width: {
                      ...prevState.width,
                      OutsideImgWidth: 0,
                    },
                  }));
                }}
              />
            </div>
            <Slider
              value={[props.systemShadow.width.OutsideImgWidth]}
              max={100}
              min={-100}
              step={1}
              onValueChange={(e) => {
                props.setSystemShadow((prevState: any) => ({
                  ...prevState,
                  width: {
                    ...prevState.width,
                    OutsideImgWidth: e[0],
                  },
                }));
              }}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DrawingSidebarMenuClones;
