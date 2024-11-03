import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Textarea } from "@/components/ui/textarea";
import AvatarSVG from "@/public/assets/images/avatar/svgTest";
import { useEffect, useState } from "react";

export default function Bot(props: any) {
  //const randomBoolean = Math.random() < 0.5;
  const [isAvatar, setIsAvatar] = useState<{
    load: boolean;
    mood: string;
    glasses: boolean;
    clothes: boolean;
    hair: boolean;
  }>({
    load: false,
    mood: "",
    glasses: false,
    clothes: false,
    hair: false,
  });

  useEffect(() => {
    setIsAvatar((prevState) => ({
      ...prevState,
      load: true,
      glasses: Math.random() < 0.5,
      clothes: Math.random() < 0.5,
      hair: Math.random() < 0.5,
    }));
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center group"
      onMouseEnter={() => {
        setIsAvatar((prevState) => ({
          ...prevState,
          //glasses: true,
          mood: "happy",
        }));
      }}
      onMouseLeave={() => {
        setIsAvatar((prevState) => ({
          ...prevState,
          //glasses: false,
          mood: "",
        }));
      }}
    >
      <div className="flex items-center h-full gap-4">
        <div className="flex items-center justify-center">
          <div className="mt-[-50px]">
            <div
              className="speech-bubble absolute h-20 scale-0 group-hover:scale-100"
              style={{
                transition: "250ms",
              }}
            >
              {false ? <div className="speech-bubble-text h-20">
                <div>Ask your</div>
                <div>questions</div>
              </div> :
              <div className="speech-bubble-text h-20">
              <div>Unavailable</div>
              <div>😴</div>
            </div>}
            </div>
            <div
              className="h-44 w-44 rounded-full overflow-hidden"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            >
              {isAvatar.load === true && (
                <AvatarSVG
                {...isAvatar}
                />
              )}
            </div>
          </div>
        </div>
        <div className="bg-black/75 p-2 rounded leading-7 [&:not(:first-child)]:mt-6 w-[100%] max-w-[1200px] text-center border">
          <TextGenerateEffect words={props.words} />
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="grid w-full max-w-sm gap-2">
          <Textarea
            className="h-[100px]"
            style={{ resize: "none" }}
            placeholder="Type your message here."
            disabled
          />
          <Button disabled>Send message</Button>
        </div>
      </div>
    </div>
  );
}
