import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaBluesky, FaClockRotateLeft } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { z } from "zod";
import Image from "next/image";
import { SystemSettings } from "@/utils/interface";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { LuDroplets, LuSettings2 } from "react-icons/lu";

interface Props {
  setSystemSetting: (settings: SystemSettings) => void;
  systemSetting: SystemSettings;
  isNewImage: string;
  historical: SystemSettings[];
  setHistorical: (settings: SystemSettings[]) => void;
}

const FormSchema = z.object({
  random: z.boolean().default(false).optional(),
  brightness: z.boolean().default(false).optional(),
  contrast: z.boolean().default(true).optional(),
  saturation: z.boolean().default(true).optional(),
  sepia: z.boolean().default(false).optional(),
  grayscale: z.boolean().default(false).optional(),
  invert: z.boolean().default(false).optional(),
  hue: z.boolean().default(false).optional(),
  blur: z.boolean().default(false).optional(),
});

export default function RandomFilters(props: Props) {
  //const [historical, setHistorical] = useState<SystemSettings[]>([]);

  // Fonction utilitaire pour générer un nombre aléatoire entre min et max
  const getRandomNumberInRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      random: false,
      brightness: false,
      contrast: true,
      saturation: true,
      sepia: false,
      grayscale: false,
      invert: false,
      hue: false,
      blur: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Compute the settings object
    const settings = {
      brightness: data.brightness
        ? getRandomNumberInRange(100, data.random ? 200 : 150)
        : 100,
      contrast: data.contrast
        ? getRandomNumberInRange(100, data.random ? 200 : 150)
        : 100,
      saturation: data.saturation
        ? getRandomNumberInRange(100, data.random ? 200 : 150)
        : 100,
      hue: data.hue ? getRandomNumberInRange(0, 350) : 0,
      sepia: data.sepia ? getRandomNumberInRange(0, data.random ? 100 : 50) : 0,
      grayscale: data.grayscale
        ? getRandomNumberInRange(0, data.random ? 100 : 50)
        : 0,
      invert: data.invert ? 100 : 0,
      blur: data.blur ? getRandomNumberInRange(0, data.random ? 10 : 5) : 0,
    };

    // Update system settings with the computed values
    props.setSystemSetting(settings);

    // Update historical settings with the same values
    props.setHistorical([settings, ...props.historical].slice(0, 10));
  }

  return (
    <Card className="border-none rounded-none bg-transparent p-4">
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-1xl flex justify-between p-0">
          Random :<LuDroplets className="h-4 w-4" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4"
          >
            <Button
              type="submit"
              className="gradient-animated1"
              variant="outline"
            >
              Start random
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" type="button" variant="default">
                  Filters
                  <LuSettings2 className="ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="p-0 w-full max-w-md mx-auto">
                  <DialogTitle className="text-2xl">
                    Setting random filters.
                  </DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="w-full max-w-md mx-auto">
                  <div className="text-1xl font-bold mb-6">Préférences</div>
                  <FormField
                    control={form.control}
                    name="random"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 drawing-css-bg">
                        <FormControl>
                          <Checkbox
                            className="bg-[#0d0d0d]"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Intensify changes.</FormLabel>
                          <FormDescription>
                            This means that changes are no longer limited.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <Separator className="my-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="brightness"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Brightness ?</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contrast"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Contrast ?</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="saturation"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Saturation ?</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sepia"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Sepia ?</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="grayscale"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Grayscale ?</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="invert"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Invert ?</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="hue"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Hue ?</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="blur"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Add Blur ?</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Separator className="my-4" />
                <div>Randoms filters :</div>
                <ScrollArea className="max-h-[150px] w-full">
                  <div className="w-full grid grid-cols-4 gap-2">
                    {props.historical?.map((promise, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden rounded-lg group cursor-pointer"
                        onClick={() => {
                          props.setSystemSetting(promise);
                        }}
                      >
                        <Image
                          className="object-cover w-full h-25 transition-transform duration-300 ease-in-out group-hover:scale-105"
                          src={props.isNewImage}
                          alt="image"
                          width={100}
                          height={100}
                          style={{
                            filter: `
            brightness(${promise.brightness}%)
            contrast(${promise.contrast}%)
            saturate(${promise.saturation}%)
            sepia(${promise.sepia}%)
            hue-rotate(${promise.hue}deg)
            blur(${promise.blur}px)
            grayscale(${promise.grayscale}%)
            invert(${promise.invert}%)`,
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
