import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

const DrawingFilterSlider = (props: any) => {
  const dynamicFilterKey = props.keyName || "filter";

  const handleSliderChangeBrightness = (newValue: number[]) => {
    const newBrightness = newValue[0];
    if (props.inSide) {
      return props.setSystemSetting((prevState: any) => ({
        ...prevState,
        [dynamicFilterKey]: {
          ...prevState[dynamicFilterKey],
          brightness: newBrightness,
        },
      }));
    }
    props.setSystemSetting({
      ...props.systemSetting,
      brightness: newBrightness,
    });
  };
  const handleSliderChangeContrast = (newValue: number[]) => {
    const newContrast = newValue[0];
    if (props.inSide) {
      return props.setSystemSetting((prevState: any) => ({
        ...prevState,
        [dynamicFilterKey]: {
          ...prevState[dynamicFilterKey],
          contrast: newContrast,
        },
      }));
    }
    props.setSystemSetting({ ...props.systemSetting, contrast: newContrast });
  };
  const handleSliderChangeSaturation = (newValue: number[]) => {
    const newSaturation = newValue[0];
    if (props.inSide) {
      return props.setSystemSetting((prevState: any) => ({
        ...prevState,
        [dynamicFilterKey]: {
          ...prevState[dynamicFilterKey],
          saturation: newSaturation,
        },
      }));
    }
    props.setSystemSetting({
      ...props.systemSetting,
      saturation: newSaturation,
    });
  };
  const handleSliderChangeHue = (newValue: number[]) => {
    const newHue = newValue[0];
    if (props.inSide) {
      return props.setSystemSetting((prevState: any) => ({
        ...prevState,
        [dynamicFilterKey]: {
          ...prevState[dynamicFilterKey],
          hue: newHue,
        },
      }));
    }
    props.setSystemSetting({ ...props.systemSetting, hue: newHue });
  };
  const handleSliderChangeBlur = (newValue: number[]) => {
    const newBlur = newValue[0];
    if (props.inSide) {
      return props.setSystemSetting((prevState: any) => ({
        ...prevState,
        [dynamicFilterKey]: {
          ...prevState[dynamicFilterKey],
          blur: newBlur,
        },
      }));
    }
    props.setSystemSetting({ ...props.systemSetting, blur: newBlur });
  };
  const handleSliderChangeSepia = (newValue: number[]) => {
    const newSepia = newValue[0];
    if (props.inSide) {
      return props.setSystemSetting((prevState: any) => ({
        ...prevState,
        [dynamicFilterKey]: {
          ...prevState[dynamicFilterKey],
          sepia: newSepia,
        },
      }));
    }
    props.setSystemSetting({ ...props.systemSetting, sepia: newSepia });
  };
  const handleSliderChangeGrayscale = (newValue: number[]) => {
    const newGrayscale = newValue[0];
    if (props.inSide) {
      return props.setSystemSetting((prevState: any) => ({
        ...prevState,
        [dynamicFilterKey]: {
          ...prevState[dynamicFilterKey],
          grayscale: newGrayscale,
        },
      }));
    }
    props.setSystemSetting({ ...props.systemSetting, grayscale: newGrayscale });
  };
  const handleSliderChangeInvert = (newValue: number[]) => {
    const newInvert = newValue[0];
    if (props.inSide) {
      return props.setSystemSetting((prevState: any) => ({
        ...prevState,
        [dynamicFilterKey]: {
          ...prevState[dynamicFilterKey],
          invert: newInvert,
        },
      }));
    }
    props.setSystemSetting({ ...props.systemSetting, invert: newInvert });
  };

  return (
    <>
      <div>
        <div className="flex justify-between">
          Brightness <div>{props.systemSetting?.brightness}%</div>
        </div>
        <Slider
          onValueChange={handleSliderChangeBrightness}
          value={[props.systemSetting?.brightness]}
          defaultValue={[props.systemSetting?.brightness]}
          max={200}
          step={1}
        />
        <Separator className="my-4" />
        <div className="flex justify-between">
          Contrast <div>{props.systemSetting?.contrast}%</div>
        </div>
        <Slider
          onValueChange={handleSliderChangeContrast}
          value={[props.systemSetting?.contrast]}
          defaultValue={[props.systemSetting?.contrast]}
          max={200}
          step={1}
        />
        <Separator className="my-4" />
        <div className="flex justify-between">
          Saturation <div>{props.systemSetting?.saturation}%</div>
        </div>
        <Slider
          onValueChange={handleSliderChangeSaturation}
          value={[props.systemSetting?.saturation]}
          defaultValue={[props.systemSetting?.saturation]}
          max={200}
          step={1}
        />
        <Separator className="my-4" />
        <div className="flex justify-between">
          Sepia <div>{props.systemSetting?.sepia}%</div>
        </div>
        <Slider
          onValueChange={handleSliderChangeSepia}
          value={[props.systemSetting?.sepia]}
          defaultValue={[props.systemSetting?.sepia]}
          max={100}
          step={1}
        />
        <Separator className="my-4" />
        <div className="flex justify-between">
          Grayscale <div>{props.systemSetting?.grayscale}%</div>
        </div>
        <Slider
          onValueChange={handleSliderChangeGrayscale}
          value={[props.systemSetting?.grayscale]}
          defaultValue={[props.systemSetting?.grayscale]}
          max={100}
          step={1}
        />
        <Separator className="my-4" />
        <div className="flex justify-between">
          Invert <div>{props.systemSetting?.invert}%</div>
        </div>
        <Slider
          onValueChange={handleSliderChangeInvert}
          value={[props.systemSetting?.invert]}
          defaultValue={[props.systemSetting?.invert]}
          max={100}
          step={1}
        />
        <Separator className="my-4" />
        <div className="flex justify-between">
          Hue <div>{props.systemSetting?.hue}%</div>
        </div>
        <Slider
          onValueChange={handleSliderChangeHue}
          value={[props.systemSetting?.hue]}
          defaultValue={[props.systemSetting?.hue]}
          max={350}
          step={1}
        />
        <Separator className="my-4" />
        <div className="flex justify-between">
          Blur <div>{props.systemSetting?.blur}%</div>
        </div>
        <Slider
          onValueChange={handleSliderChangeBlur}
          value={[props.systemSetting?.blur]}
          defaultValue={[props.systemSetting?.blur]}
          max={10}
          step={1}
        />
      </div>
    </>
  );
};

export default DrawingFilterSlider;
