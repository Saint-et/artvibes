import { Card, CardContent } from "@/components/ui/card";
import { filters } from "@/public/assets/data/data";
import { DrawingFilterDefault } from "@/public/assets/data/defaultValue-drawing";
import { LuBan } from "react-icons/lu";
import Image from "next/image";

const DrawingFilterImg = (props: any) => {
  const dynamicImg = props.defaultImg;
  const dynamicFilterKey = props.keyName || "filter";

  const Reset = () => {
    return (
      <Card
        className="relative overflow-hidden rounded-lg group cursor-pointer"
        onClick={() => {
          if (props.inSide) {
            return props.setSystemSetting((prevState: any) => ({
              ...prevState,
              [dynamicFilterKey]: {
                ...DrawingFilterDefault,
              },
            }));
          }
          return props.setSystemSetting(DrawingFilterDefault);
        }}
      >
        <CardContent className="p-0 flex justify-center items-center h-full w-full">
          <LuBan className="text-3xl transition-transform duration-300 ease-in-out group-hover:scale-105" />
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      {Reset()}
      {filters?.map((promise, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg group cursor-pointer"
          onClick={() => {
            if (props.inSide) {
              return props.setSystemSetting((prevState: any) => ({
                ...prevState,
                [dynamicFilterKey]: {
                  ...promise.filter,
                },
              }));
            }
            return props.setSystemSetting(promise.filter);
          }}
          title={promise.name}
        >
          <Image
            className="object-cover w-full h-20 transition-transform duration-300 ease-in-out group-hover:scale-105"
            src={dynamicImg}
            alt="image"
            width={100}
            height={100}
            style={{
              filter: `
                    brightness(${promise.filter.brightness}%)
                    contrast(${promise.filter.contrast}%)
                    saturate(${promise.filter.saturation}%)
                    sepia(${promise.filter.sepia}%)
                    hue-rotate(${promise.filter.hue}deg)
                    blur(${promise.filter.blur}px)
                    grayscale(${promise.filter.grayscale}%)
                    invert(${promise.filter.invert}%)
                    `,
            }}
            onMouseDown={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      ))}
    </>
  );
};

export default DrawingFilterImg;
