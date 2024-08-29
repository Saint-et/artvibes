import { DrawArea, NewImageSize } from "@/utils/interface";
import { ResizeDirection } from "@/utils/type";

interface DrawingBenchmarkProps {
  drawArea: DrawArea;
  setDrawArea: React.Dispatch<React.SetStateAction<any>>;
  isImageSize: NewImageSize;
  isResizing: ResizeDirection;
}

const Benchmark: React.FC<DrawingBenchmarkProps> = (props) => {
  const handleCenterHeight = () => {
    if (
      Math.round(props.drawArea.positionX) ===
      Math.round(props.isImageSize.w / 2)
    ) {
      return true;
    }
    if (
      Math.round(props.drawArea.positionX) ===
      Math.round(props.isImageSize.w / 2 - props.drawArea.width)
    ) {
      return true;
    }
    if (
      Math.round(props.drawArea.positionX) ===
      Math.round(props.isImageSize.w / 2 - props.drawArea.width / 2)
    ) {
      return true;
    }
  };

  const handleCenterWidth = () => {
    if (
      Math.round(props.drawArea.positionY) ===
      Math.round(props.isImageSize.h / 2)
    ) {
      return true;
    }
    if (
      Math.round(props.drawArea.positionY) ===
      Math.round(props.isImageSize.h / 2 - props.drawArea.height)
    ) {
      return true;
    }
    if (
      Math.round(props.drawArea.positionY) ===
      Math.round(props.isImageSize.h / 2 - props.drawArea.height / 2)
    ) {
      return true;
    }
  };

  const handleLeftHeight = () => {
    if (Math.round(props.drawArea.positionX) === 0) {
      return true;
    }
    if (
      Math.round(props.drawArea.positionX) ===
      Math.round(0 - props.drawArea.width)
    ) {
      return true;
    }
    if (
      Math.round(props.drawArea.positionX) ===
      Math.round(0 - props.drawArea.width / 2)
    ) {
      return true;
    }
  };

  if (!props.isResizing) return null;

  return (
    <>
      {handleLeftHeight() && (
        <div
          className="border border-[#c300ff] absolute left-[0%] z-50"
          style={{
            zIndex: 1000,
            height: props.isImageSize.h,
            transition: "200ms",
          }}
        />
      )}
      {Math.round(props.drawArea.positionX) ===
        Math.round(props.isImageSize.w - props.drawArea.width) && (
        <div
          className="border border-[#c300ff] absolute left-[100%] z-50"
          style={{
            zIndex: 1000,
            height: props.isImageSize.h,
            transition: "200ms",
          }}
        />
      )}
      {Math.round(props.drawArea.positionY) === 0 && (
        <div
          className="border border-[#c300ff] absolute top-[0%] z-50"
          style={{
            zIndex: 1000,
            width: props.isImageSize.w,
            transition: "200ms",
          }}
        />
      )}
      {Math.round(props.drawArea.positionY) ===
        Math.round(props.isImageSize.h - props.drawArea.height) && (
        <div
          className="border border-[#c300ff] absolute top-[100%] z-50"
          style={{
            zIndex: 1000,
            width: props.isImageSize.w,
            transition: "200ms",
          }}
        />
      )}
      {handleCenterWidth() && (
        <div
          className="border border-[#c300ff] absolute top-[50%] z-50"
          style={{
            zIndex: 1000,
            width: props.isImageSize.w,
            transition: "200ms",
          }}
        />
      )}
      {handleCenterHeight() && (
        <div
          className="border border-[#c300ff] absolute left-[50%] z-50"
          style={{
            zIndex: 1000,
            height: props.isImageSize.h,
            transition: "200ms",
          }}
        />
      )}
    </>
  );
};

export default Benchmark;
