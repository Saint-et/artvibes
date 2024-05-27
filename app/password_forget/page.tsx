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
  email: z.string().min(2, {
    message: "Please enter a valid Email Example: user@gmail.com.",
  }),
});

export default function Password_forget() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
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
            Password forget to Artvibes
          </h1>
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

              <div className="flex flex-col">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:scale-110 transition"
                  type="submit"
                >
                  Reset Password
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

      <div className="flex justify-center items-center w-[100%] pb-[50px] pt-[80px]">
        <div>
        <h1 className="text-2xl font-bold">Read the steps carefully.</h1>
        <p>Dear user,</p>
        <p className="leading-4 [&:not(:first-child)]:mt-6">
          Enter your email address associated with your account in the field
          provided.
        </p>
        <p className="leading-4 [&:not(:first-child)]:mt-6">
          Click the (Reset Password) button.
        </p>
        <p className="leading-4 [&:not(:first-child)]:mt-6">
          In a few moments, you will receive an email to the address you
          provided. This message will contain a password reset link.
        </p>
        <p className="leading-4 [&:not(:first-child)]:mt-6">
          Go to your inbox and look for the password reset message. Also, be
          sure to check your junk folder in case the message is there.
        </p>
        <p className="leading-4 [&:not(:first-child)]:mt-6">
          Click the password reset link in the email. You will be redirected to
          a page where you can create a new secure password for your account.
        </p>
        <p className="leading-4 [&:not(:first-child)]:mt-6">
          Once you've created your new password, save it securely.
        </p>
        <p className="leading-4 [&:not(:first-child)]:mt-6">
          That's all! You now have a new password to access your account
          securely. If you have not requested this password reset, please ignore
          this email and take steps to protect the security of your account.
        </p>
        <p className="leading-4 [&:not(:first-child)]:mt-6">
          If you have any questions or encounters any problems, please feel free
          to contact us at
        </p>
        <p className="leading-4 [&:not(:first-child)]:mt-6">
          Kind regards
        </p>
        <p className="leading-4 [&:not(:first-child)]:mt-6">
          The Artvibes team
        </p>
        </div>
      </div>
    </>
  );
}
