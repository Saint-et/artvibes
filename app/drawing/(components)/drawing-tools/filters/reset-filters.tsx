import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaArrowsRotate } from "react-icons/fa6";

interface ResetFiltersProps {
  systemSetting: {
    brightness: number;
    contrast: number;
    saturation: number;
    sepia: number;
    grayscale: number;
    invert: number;
    hue: number;
    blur: number;
  };
  setSystemSetting: React.Dispatch<React.SetStateAction<any>>;
}

const ResetFilters: React.FC<ResetFiltersProps> = (props) => {
  //if (
  //  props.systemSetting?.brightness === 100 &&
  //  props.systemSetting?.contrast === 100 &&
  //  props.systemSetting?.saturation === 100 &&
  //  props.systemSetting?.sepia === 0 &&
  //  props.systemSetting?.grayscale === 0 &&
  //  props.systemSetting?.invert === 0 &&
  //  props.systemSetting?.hue === 0 &&
  //  props.systemSetting?.blur === 0
  //)
  //  return <div>No changes were detected.</div>;

  return (
    <>
      <Card className="border-none rounded-none bg-inherit">
        <CardHeader>
          <CardTitle className="text-1xl">Reset filtes :</CardTitle>
          <CardDescription>Reset filters here.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
          {props.systemSetting?.brightness !== 100 && (
            <Button
              onClick={() => {
                props.setSystemSetting({
                  ...props.systemSetting,
                  brightness: 100,
                });
              }}
              variant="outline"
              className="flex justify-between"
              style={{
                color: "#7088ff",
              }}
            >
              brightness ({props.systemSetting?.brightness}%)
              <FaArrowsRotate />
            </Button>
          )}
          {props.systemSetting?.contrast !== 100 && (
            <Button
              onClick={() => {
                props.setSystemSetting({
                  ...props.systemSetting,
                  contrast: 100,
                });
              }}
              variant="outline"
              className="flex justify-between"
              style={{
                color: "#7088ff",
              }}
            >
              contrast ({props.systemSetting?.contrast}%)
              <FaArrowsRotate />
            </Button>
          )}
          {props.systemSetting?.saturation !== 100 && (
            <Button
              onClick={() => {
                props.setSystemSetting({
                  ...props.systemSetting,
                  saturation: 100,
                });
              }}
              variant="outline"
              className="flex justify-between"
              style={{
                color: "#7088ff",
              }}
            >
              saturate ({props.systemSetting?.saturation}%)
              <FaArrowsRotate />
            </Button>
          )}
          {props.systemSetting?.sepia !== 0 && (
            <Button
              onClick={() => {
                props.setSystemSetting({
                  ...props.systemSetting,
                  sepia: 0,
                });
              }}
              variant="outline"
              className="flex justify-between"
              style={{
                color: "#7088ff",
              }}
            >
              sepia ({props.systemSetting?.sepia}%)
              <FaArrowsRotate />
            </Button>
          )}
          {props.systemSetting?.grayscale !== 0 && (
            <Button
              onClick={() => {
                props.setSystemSetting({
                  ...props.systemSetting,
                  grayscale: 0,
                });
              }}
              variant="outline"
              className="flex justify-between"
              style={{
                color: "#7088ff",
              }}
            >
              grayscale ({props.systemSetting?.grayscale}%)
              <FaArrowsRotate />
            </Button>
          )}
          {props.systemSetting?.invert !== 0 && (
            <Button
              onClick={() => {
                props.setSystemSetting({
                  ...props.systemSetting,
                  invert: 0,
                });
              }}
              variant="outline"
              className="flex justify-between"
              style={{
                color: "#7088ff",
              }}
            >
              invert ({props.systemSetting?.invert}%)
              <FaArrowsRotate />
            </Button>
          )}
          {props.systemSetting?.hue !== 0 && (
            <Button
              onClick={() => {
                props.setSystemSetting({
                  ...props.systemSetting,
                  hue: 0,
                });
              }}
              variant="outline"
              className="flex justify-between"
              style={{
                color: "#7088ff",
              }}
            >
              hue ({props.systemSetting?.hue}%)
              <FaArrowsRotate />
            </Button>
          )}
          {props.systemSetting?.blur !== 0 && (
            <Button
              onClick={() => {
                props.setSystemSetting({
                  ...props.systemSetting,
                  blur: 0,
                });
              }}
              variant="outline"
              className="flex justify-between"
              style={{
                color: "#7088ff",
              }}
            >
              blur ({props.systemSetting?.blur}%)
              <FaArrowsRotate />
            </Button>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ResetFilters;
