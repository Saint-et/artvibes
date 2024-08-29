import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser, LoginInput } from "@/models/schema";
import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const prisma = new PrismaClient();

const findUserByUsername = async (username: string): Promise<IUser | null> => {
  return prisma.user.findUnique({ where: { username } });
};

const verifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

const generateToken = async (user: IUser): Promise<string> => {
  return jwt.sign({ id: user }, process.env.NEXT_PUBLIC_JWT_SECRET!);
};

export async function login(input: LoginInput) {
  const { username, password } = input;

  const user = await findUserByUsername(username);
  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Utilisateur non trouvé",
    });
  }

  const isPasswordMatched = await verifyPassword(password, user.password);
  if (!isPasswordMatched) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Identifiant ou mot de passe incorrect",
    });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastConnection: new Date() },
  });

  const token = await generateToken(user);
  return { token };
}