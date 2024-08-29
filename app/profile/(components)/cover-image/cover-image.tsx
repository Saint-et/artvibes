import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { SystemCoverImg } from "@/public/assets/data/data";

export default function CoverImage() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Cover image</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div
            className="CoverImage FlexEmbed FlexEmbed--2by1 max-w-[800px]"
            style={{
              backgroundImage: `url(${SystemCoverImg.src})`,
              backgroundPosition: `50% ${0}%`,
            }}
          />

          <Slider className="mt-10" defaultValue={[33]} max={100} step={1} />

          <Button className="mt-10">Save changes</Button>
        </CardContent>
      </Card>
    </>
  );
}
