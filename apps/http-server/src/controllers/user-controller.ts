import { Request, Response } from "express";
import { signJwt, verifyJwt } from "../utils/jwt.js";
import { SigninSchema, SignupSchema } from "@repo/shared/schema";
import { prisma } from "@repo/db";
import bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const parsed = SignupSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);

    const { name, email, password } = parsed.data;

    const existing = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existing)
      return res.status(400).json({ message: "Email already exists." });

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hash },
    });

    const token = signJwt(user.id);

    return res.status(200).json({ token, user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while signing up.", error });
    console.log(error);
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const parsed = SigninSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user)
      return res
        .status(404)
        .json({ message: "No user found with this email." });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Wrong pasword." });

    const token = signJwt(user.id);
    res.status(200).json({ message: "SignedIn successfully.", token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong while sigining in." });
  }
};
