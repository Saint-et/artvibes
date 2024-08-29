import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mascotteArtvibes } from "@/models/schema";
import { SystemName, SystemNoImg } from "@/public/assets/data/data";
import { User } from "lucide-react";
import Link from "next/link";
import { FiAlertOctagon, FiAward, FiFileText, FiFolder, FiGrid, FiTrello } from "react-icons/fi";

export default function NavDashboard() {
  return (
    <>
      <Sheet key={"left"}>
        <SheetTrigger asChild>
          <Avatar className="mr-1">
            <AvatarImage
              className="min-w-[40px] min-h-[40px] w-[40px] h-[40px] cursor-pointer hover:scale-95 transition"
              src={mascotteArtvibes.src}
              alt="@shadcn"
              onMouseDown={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
            />
          </Avatar>
        </SheetTrigger>
        <SheetContent side={"left"} className="z-[50000]">
          <SheetHeader>
            <SheetTitle className="text-1xl">Menu</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-full w-full p-5">
          <div className="grid gap-4 py-4">
            <div className="w-full flex items-center justify-center flex-col p-3">
            <Link href={"/profile/1"}>
              <Avatar className="w-[100px] h-[100px] cursor-pointer hover:scale-95 transition">
                <AvatarImage
                  src={SystemNoImg.src}
                  alt="@shadcn"
                  onMouseDown={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Avatar>
            </Link>
              <div className="font-bold z-10">ArtVibes</div>
            </div>

            {/*<Card>
              <CardHeader>
                <CardTitle className="text-1xl">Home</CardTitle>
                <CardDescription>Display preference</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="images">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="images" id="r2" />
                    <Label htmlFor="r2">Images</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manga" id="r3" />
                    <Label htmlFor="r3">Manga</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>*/}

            <Card>
              <CardHeader>
                <CardTitle className="text-1xl">Workspace</CardTitle>
                <CardDescription>Display preference</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-2">
                  <FiGrid className="mr-2 h-4 w-4" />
                  Projects
                </Button>
                <Button className="w-full mb-2">
                  <FiFolder className="mr-2 h-4 w-4" />
                  Library
                </Button>
                <Button className="w-full mb-2">
                  <FiTrello className="mr-2 h-4 w-4" />
                  Statistical
                </Button>
                <Button className="w-full">
                  <FiAlertOctagon className="mr-2 h-4 w-4" />
                  Known issue
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-1xl">Moderation</CardTitle>
                <CardDescription>Display preference</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-2">
                  <FiAward className="mr-2 h-4 w-4" />
                  Admin
                </Button>
                <Button className="w-full">
                  <FiAward className="mr-2 h-4 w-4" />
                  Master
                </Button>
              </CardContent>
            </Card>

            <Card className="mb-10">
              <CardHeader>
                <CardTitle className="text-1xl">{SystemName}</CardTitle>
                <CardDescription>Display preference</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-2">
                  <FiFileText className="mr-2 h-4 w-4" />
                  Update {SystemName}
                </Button>

                <Button className="w-full">
                  <FiFileText className="mr-2 h-4 w-4" />
                  Terms of use
                </Button>
              </CardContent>
            </Card>
          </div>
          </ScrollArea>
          <SheetFooter>
            <SheetClose asChild></SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
