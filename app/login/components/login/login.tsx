"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import Link from "next/link";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Please enter a valid Email Example: user@gmail.com.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 5 characters.",
  }),
});

export default function Login() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmitForm1(data: z.infer<typeof FormSchema>) {
    console.log("Form data:", data);
  }

  return (
    <>
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
                    className="bg-transparent"
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
                    className="bg-transparent"
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
              className="bg-gradient-to-r from-blue-600 to-violet-600 hover:scale-110 transition"
              type="submit"
            >
              Login to your account
            </Button>

            <div className="flex justify-center">
              <Link href={"/password_forget"}>
                <Button type="button" className="text-white" variant="link">
                  Forget Password
                </Button>
              </Link>
              <Button type="button" className="text-white" variant="link">
                Language
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
