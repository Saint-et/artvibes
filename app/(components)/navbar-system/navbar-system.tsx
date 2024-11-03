"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SystemNoImg } from "@/public/assets/data/data";
import { FaBell, FaFlag } from "react-icons/fa6";
import { LuHelpCircle, LuInfo, LuSettings, LuX } from "react-icons/lu";
import { useAppContext } from "../../provider/useAppContext";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import Bot from "../bot/bot";

export default function NavbarSystem() {
  const UseAppContext = useAppContext();
  const pagePathname = usePathname().split("/");

  useEffect(() => {
    if (pagePathname[1] === "") {
      UseAppContext.setDrawingLoad((prevState: any) => ({
        ...prevState,
        home: true,
      }));
    }
  }, [pagePathname[1]]);

  const words = `
  Bienvenue sur Drawing, un outil en ligne simple et
  intuitif pour effectuer des modifications d'images de
  manière rapide et efficace.`;

  if (!UseAppContext.isDrawingLoad?.home) return null;

  return (
    <>
      <Card
        className="fixed bottom-[20px] right-[20px] border-none"
        style={{
          zIndex: 200000,
        }}
      >
        <CardContent className="p-2">
          <div className="grid grid-cols-1 gap-2">
            <Avatar>
              <AvatarImage src={SystemNoImg.src} alt="@shadcn" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full"
                  size={"icon"}
                >
                  <span className="relative flex">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex">
                      <FaBell className="h-4 w-4" />
                    </span>
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                style={{
                  zIndex: 200100,
                }}
              >
                <Card className="w-full max-w-sm p-6 rounded-lg shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">New Notification</h3>
                    <Button variant="ghost" size="sm">
                      <LuX className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    You have a new message from Jane Doe. Click the button below
                    to view it.
                  </p>
                  <div className="flex justify-end">
                    <Button>View Message</Button>
                  </div>
                </Card>
              </PopoverContent>
            </Popover>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full group"
                  size={"icon"}
                >
                  <LuSettings className="h-4 w-4 group-hover:animate-spin" />
                </Button>
              </DialogTrigger>
              <DialogContent
                style={{
                  zIndex: 200100,
                }}
              >
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="activeBlue"
                  className="rounded-full"
                  size={"icon"}
                >
                  <LuHelpCircle className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent
                style={{
                  width: "100%",
                  maxWidth: 1200,
                  zIndex: 200100,
                }}
              >
                <DialogHeader>
                  <DialogTitle>Need help ?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex items-center justify-center">
                  <Bot words={words} />
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="rounded-full"
                  size={"icon"}
                >
                  <FaFlag className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent
                style={{
                  zIndex: 200100,
                }}
              >
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
