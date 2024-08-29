
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const FormSchema = z.object({
  pseudo: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  email: z.string().min(2, {
    message: "Please enter a valid Email Example: user@gmail.com.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
  passwordv: z.string().min(5, {
    message: "Password-verification must be same then password.",
  }),
});

export default function Signup() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pseudo: "",
      email: "",
      password: "",
      passwordv: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form data:", data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-2/3 mt-3 hover:scale-95 transition">Sign'up</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md backdrop-blur bg-[#00000080] h-screen max-h-[90%] z-[30000]">
        <DialogHeader>
          <DialogTitle>Sign'up to Artvibes.</DialogTitle>
          <DialogDescription>Create a new account.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="p-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="pseudo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pseudo*</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-transparent"
                        placeholder="pseudo"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Write your pseudo.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <Button
                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:scale-95 transition"
                type="submit"
              >
                Create account
              </Button>
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              variant="destructive"
              type="button"
              className="hover:scale-95 transition"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
