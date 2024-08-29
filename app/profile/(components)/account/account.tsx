"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSchemaAccount } from "@/models/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Account() {
  const form = useForm<z.infer<typeof FormSchemaAccount>>({
    resolver: zodResolver(FormSchemaAccount),
    defaultValues: {
      pseudo: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchemaAccount>) {
    console.log("Form data:", data);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <FormField
                control={form.control}
                name="pseudo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pseudo*</FormLabel>
                    <FormControl className="space-y-1">
                      <Input
                        id="pseudo"
                        type="text"
                        placeholder="pseudo"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Write your new pseudo.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save changes</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
