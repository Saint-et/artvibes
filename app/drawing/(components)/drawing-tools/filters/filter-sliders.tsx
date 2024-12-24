import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

const DrawingFilterSlider = (props: any) => {
  const dynamicFilterKey = props.keyName || "filter";

  const handleSliderChange = (key: string, newValue: number[]) => {
    if (props.inSide) {
      return props.setSystemSetting((prevState: any) => ({
        ...prevState,
        [dynamicFilterKey]: {
          ...prevState[dynamicFilterKey],
          [key]: newValue,
        },
      }));
    }
    props.setSystemSetting({
      ...props.systemSetting,
      [key]: newValue,
    });
  };

  const SlidersValue = [
    {
      title: "Brightness",
      value: props.systemSetting?.brightness,
      function: (e: any) => handleSliderChange("brightness", e[0]),
      max: 200,
      step: 1,
    },
    {
      title: "Contrast",
      value: props.systemSetting?.contrast,
      function: (e: any) => handleSliderChange("contrast", e[0]),
      max: 200,
      step: 1,
    },
    {
      title: "Saturation",
      value: props.systemSetting?.saturation,
      function: (e: any) => handleSliderChange("saturation", e[0]),
      max: 200,
      step: 1,
    },
    {
      title: "Sepia",
      value: props.systemSetting?.sepia,
      function: (e: any) => handleSliderChange("sepia", e[0]),
      max: 100,
      step: 1,
    },
    {
      title: "Grayscale",
      value: props.systemSetting?.grayscale,
      function: (e: any) => handleSliderChange("grayscale", e[0]),
      max: 100,
      step: 1,
    },
    {
      title: "Invert",
      value: props.systemSetting?.invert,
      function: (e: any) => handleSliderChange("invert", e[0]),
      max: 100,
      step: 1,
    },
    {
      title: "Hue",
      value: props.systemSetting?.hue,
      function: (e: any) => handleSliderChange("hue", e[0]),
      max: 350,
      step: 1,
    },
    {
      title: "Blur",
      value: props.systemSetting?.blur,
      function: (e: any) => handleSliderChange("blur", e[0]),
      max: 10,
      step: 1,
    },
  ];

  return (
    <>
      <div>
        {SlidersValue?.map((el, index) => (
          <div key={index}>
            <div className="flex justify-between">
              {el.title} <div>{el.value}%</div>
            </div>
            <Slider
              className="rounded-full border"
              onValueChange={el.function}
              value={[el.value]}
              defaultValue={[el.value]}
              max={el.max}
              step={el.step}
            />
            {index + 1 !== SlidersValue.length && <Separator className="my-4" />}
          </div>
        ))}
      </div>
    </>
  );
};

export default DrawingFilterSlider;
