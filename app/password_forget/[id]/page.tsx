"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
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

const FormSchema = z.object({
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
  passwordv: z.string().min(5, {
    message: "Password-verification must be same then password.",
  }),
});

export default function Reset_password() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      passwordv: "",
    },
  });

  function onSubmitForm1(data: z.infer<typeof FormSchema>) {
    console.log("Form data:", data);
  }

  return (
    <>
      <div className="flex items-center pt-[100px] flex-col">
        <div className="flex justify-center items-center max-w-max h-max flex-col">
          <h1 className="text-6xl font-bold text-center pb-20 bg-gradient-to-tr from-blue-700 via-purple-500 to-pink-600 bg-clip-text text-transparent">
            Reset password to Artvibes
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitForm1)}
              className="w-2/3 space-y-6"
            >
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
              <FormField
                control={form.control}
                name="passwordv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password-verification*</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-transparent"
                        placeholder="Password-verification"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Write down your password a 2nd time.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:scale-110 transition"
                  type="submit"
                >
                  Reset your Artvibes password
                </Button>

                <div className="flex justify-center">
                  <Link href={"/login"}>
                    <Button type="button" className="text-white" variant="link">
                      Login
                    </Button>
                  </Link>
                  <Button type="button" className="text-white" variant="link">
                    Language
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
