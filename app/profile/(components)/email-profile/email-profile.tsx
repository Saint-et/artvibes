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
import { FormSchemaLogin } from "@/models/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function EmailProfile() {
  const form = useForm<z.infer<typeof FormSchemaLogin>>({
    resolver: zodResolver(FormSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmitForm1(data: z.infer<typeof FormSchemaLogin>) {
    console.log("Form data:", data);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Email</CardTitle>
          <CardDescription>
            Make changes to your email here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
        <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitForm1)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Write your email address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Write down your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col">
            <Button
              className="hover:scale-95 transition"
              type="submit"
            >
              save change
            </Button>
          </div>
        </form>
      </Form>
        </CardContent>
      </Card>
    </>
  );
}
