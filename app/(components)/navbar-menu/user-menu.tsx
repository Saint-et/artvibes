"use client";

import { Mail, MessageSquare, User, Users } from "lucide-react";

import {
  FiAlertTriangle,
  FiCheck,
  FiList,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { mascotteArtvibes } from "@/models/schema";
import {
  SystemCoverImg,
  SystemNoImg,
  languages,
} from "@/public/assets/data/data";
import { useRouter } from "next/navigation";
import { FaCoins } from "react-icons/fa";
import { HiMiniLanguage } from "react-icons/hi2";
import { FaXmarksLines } from "react-icons/fa6";

export function UserMenu() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            className="cursor-pointer hover:scale-95 transition"
            src={SystemNoImg.src}
            alt="@shadcn"
            onMouseDown={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
          />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 text-white z-[30000]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div
          onClick={() => router.push("/profile/1")}
          className="CoverImage FlexEmbed FlexEmbed--2by1 max-w-[800px] cursor-pointer"
          style={{
            backgroundImage: `url(${SystemCoverImg.src})`,
            backgroundPosition: `50% ${0}%`,
          }}
        />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push("/profile/1")}
            className="cursor-pointer"
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut className="opacity-100">
              <Avatar>
                <AvatarImage
                  src={SystemNoImg.src}
                  alt="@shadcn"
                  onMouseDown={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Avatar>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer">
            <FaCoins className="mr-2 h-4 w-4 text-yellow-400" />
              <span>Credits {1000}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="backdrop-blur bg-[#00000080] text-white z-[31000]">
                <DropdownMenuItem className="cursor-pointer">
                <FaCoins className="mr-2 h-4 w-4 text-yellow-400" />
                  <span>Buy Credits</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <FaXmarksLines className="mr-2 h-4 w-4" />
                  <span>Coupon</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Users className="mr-2 h-4 w-4" />
            <span>Assistance</span>
            <DropdownMenuShortcut className="opacity-100">
              <Avatar>
                <AvatarImage
                  src={mascotteArtvibes.src}
                  alt="@shadcn"
                  onMouseDown={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Avatar>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer">
              <HiMiniLanguage className="mr-2 h-4 w-4" />
              <span>Language</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="backdrop-blur bg-[#00000080] text-white z-[31000]">
                {languages?.map((language, index) => (
                  <DropdownMenuItem key={index} className="cursor-pointer">
                    <FiCheck className="mr-2 h-4 w-4" />
                    <span>{language}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer">
              <FiAlertTriangle className="mr-2 h-4 w-4" />
              <span>Report a problem</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="backdrop-blur bg-[#00000080] text-white z-[31000]">
                <DropdownMenuItem className="cursor-pointer">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Artvibes</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <FiSettings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <FiLogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
