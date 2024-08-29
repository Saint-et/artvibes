import { z } from "zod";


import Illustration from "@/public/assets/images/2151134332.jpg";
import Illustration2 from "@/public/assets/images/anime-style-character-space.jpg";
import Illustration3 from "@/public/assets/images/2151134176.jpg";
import Illustration4 from "@/public/assets/images/2151134327.jpg";
import Illustration5 from "@/public/assets/images/2151134257.jpg";
import Illustration6 from "@/public/assets/images/2151134064.jpg";

import mascotte from "@/public/assets/images/artvibes.jpg";

export const mascotteArtvibes = mascotte;

export const imagesIllustration = [
  Illustration,
  Illustration2,
  Illustration3,
  Illustration4,
  Illustration5,
  Illustration6,
];
export const FormSchemaSearch = z.object({
  search: z.string().min(0, {
    message: "",
  })
});
export const FormSchemaText = z.object({
  text: z.string().min(0, {
    message: "",
  })
});

export const FormSchemaAccount = z.object({
  pseudo: z.string().min(2, {
    message: "Please enter a valid Email Example: user@gmail.com.",
  })
});

export const FormSchemaLogin = z.object({
    email: z.string().min(2, {
      message: "Please enter a valid Email Example: user@gmail.com.",
    }),
    password: z.string().min(2, {
      message: "Password must be at least 5 characters.",
    }),
  });

  
export const FormSchemaNewPassword = z.object({
  password: z.string().min(2, {
    message: "Password must be at least 5 characters.",
  }),
  newPassword: z.string().min(2, {
    message: "Password must be at least 5 characters.",
  }),
});
