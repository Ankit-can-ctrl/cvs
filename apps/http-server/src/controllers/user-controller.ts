import { Request, Response } from "express";
// import { signJwt, verifyJwt } from "../utils/jwt";
import { SignupSchema } from "@repo/shared/schema";
// import { prisma } from "@repo/db";
import bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response) => {
  try {
    const parsed = SignupSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);

    const { email, password } = parsed.data;

    // const existing = await prisma.user.findUnique({ where: { email } });
    // if (existing)
    //   return res.status(400).json({ message: "Email already exists." });

    // const hash = await bcrypt.hash(password, 10);
    // const user = await prisma.user.create({
    //   data: { email, password: hash },
    // });

    // // const token = signJwt(user.id);

    // return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while signing up." });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while siging in." });
  }
};
