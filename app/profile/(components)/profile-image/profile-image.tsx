import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SystemNoImg } from "@/public/assets/data/data";

export default function ProfileImage() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Profile image</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="w-full flex justify-center">
            <Avatar className="w-[150px] h-[150px]">
              <AvatarImage
                src={SystemNoImg.src}
                alt="@shadcn"
                onMouseDown={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
              />
            </Avatar>
          </div>

          <Button className="mt-10">Save changes</Button>
        </CardContent>
      </Card>
    </>
  );
}
