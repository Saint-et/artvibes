"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import logo from "../public/assets/images/artvibes.jpg";

export default function Navbar() {
  return (
    <>
      <div className="flex justify-center fixed w-full h-[50px] border-b-stone-800 border-b-[1px] backdrop-blur top-0 bg-[#000000e6] z-[20000]">
        <div className="flex justify-between items-center w-[90%]">
          <div className="flex items-center">
            <Image
              className="w-[30px] h-[30px] mr-3 rounded-full"
              src={logo}
              alt="logo"
              onMouseDown={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              priority
            />
            <h1 className="text-2xl font-bold w-max">
              Artvibes
            </h1>
          </div>

          <Avatar>
            <AvatarImage
              className="cursor-pointer"
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              onMouseDown={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
            />
          </Avatar>
        </div>
      </div>
    </>
  );
}
