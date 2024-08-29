import { FormSchemaLogin } from "@/models/schema";
import { login } from "@/server/api/auth-api";
import { publicProcedure, router } from "@/server/trpc";
import { z } from "zod";

export const authRouter = router({
  login: publicProcedure
    .input(FormSchemaLogin)
    .output(
      z.object({
        token: z.string(),
      }),
    )
    .mutation(async ({ input }) => login(input)),
});