export default function useUtilsComponents() {
  const handleBorder = (
    c: string,
    condition: any,
    w: number,
    h: number,
    z: number,
    ex: number
  ) => {
    if (condition) {
      return (
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          style={{
            zIndex: 150,
            position: "absolute",
            left: ex,
            top: ex,
          }}
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke={c}
            strokeWidth={2 / z}
            strokeDasharray={`${Math.max(5 / z, 5)} ${Math.max(5 / z, 5)}`}
          ></rect>
        </svg>
      );
    }
  };

  return {
    handleBorder,
  };
}
