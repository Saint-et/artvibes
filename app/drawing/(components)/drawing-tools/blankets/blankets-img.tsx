import { Card, CardContent } from "@/components/ui/card";
import { DataBlanket } from "@/public/assets/data/data";
import Image from "next/image";
import { LuBan } from "react-icons/lu";

const DrawingBlanketImg = (props: any) => {
  const Reset = () => {
    return (
      <Card
        className="relative overflow-hidden rounded-lg group cursor-pointer"
        onClick={() => {
          props.setColor((prevState: any) => ({
            ...prevState,
            transparent1: true,
            transparent2: true,
          }));
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
      {DataBlanket?.map((el, index) => (
        <div
          key={index}
          className="relative overflow-hidden group cursor-pointer object-cover w-full h-20 transition-transform duration-300 ease-in-out hover:scale-105 drawing-css-bg-main-tranparent"
          onClick={() => {
            props.setColor((prevState: any) => ({
              ...prevState,
              color1: el.color1,
              color2: el.color2,
              transparent1: false,
              transparent2: false,
            }));
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 10,
              top: 0,
              left: 0,
              //boxShadow: "inset 0em 0em 1em 1em #290099",
              background: `linear-gradient(${el.color1 || "#00000000"}, ${
                el.color2 || "#00000000"
              })`,
              opacity: el.opacity,
              transform: "rotate(180deg)",
            }}
          />
        </div>
      ))}
    </>
  );
};

export default DrawingBlanketImg;
