"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { FormSchemaNewPassword } from "@/models/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function NewPassword() {
  const form = useForm<z.infer<typeof FormSchemaNewPassword>>({
    resolver: zodResolver(FormSchemaNewPassword),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchemaNewPassword>) {
    console.log("Form data:", data);
  }

  return (
    <>
      <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current password*</FormLabel>
                    <FormControl className="space-y-1">
                      <Input
                        id="password"
                        type="password"
                        autoComplete="new-password"
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
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password*</FormLabel>
                    <FormControl className="space-y-1">
                      <Input
                        id="newPassword"
                        type="password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Write your email address.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save password</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
