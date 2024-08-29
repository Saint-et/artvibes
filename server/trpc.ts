import { initTRPC } from "@trpc/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import superjson from "superjson";

const trpc = initTRPC.create({
  transformer: superjson,
});

export const router = trpc.router;
export const publicProcedure = trpc.procedure;

const isAuth = trpc.middleware(({ ctx, next }) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("session_token")?.value;
  if (!token) {
    redirect("/login");
  }

  return next();
});

export const privateProcedure = trpc.procedure.use(isAuth);