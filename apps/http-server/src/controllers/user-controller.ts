import { Request, Response } from "express";
import { signJwt, verifyJwt } from "../utils/jwt.js";
import { SigninSchema, SignupSchema } from "@repo/shared/schema";
// import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response) => {
  try {
    console.log("working....");
    // const parsed = SignupSchema.safeParse(req.body);
    // if (!parsed.success) return res.status(400).json(parsed.error);

    // const { email, password } = parsed.data;

    // const existing = await prismaClient.user.findUnique({
    //   where: { email: email },
    // });
    // if (existing)
    //   return res.status(400).json({ message: "Email already exists." });

    // const hash = await bcrypt.hash(password, 10);
    // const user = await prismaClient.user.create({
    //   data: { email, password: hash },
    // });

    // const token = signJwt(user.id);

    // return res.status(200).json({ token, user });
    return res.status(200).json({ message: "It worked fine." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while signing up.", error });
    console.log(error);
  }
};

//   try {
//     const parsed = SigninSchema.safeParse(req.body);
//     if (!parsed.success) return res.status(400).json(parsed.error);

//     const { email, password } = parsed.data;

//     const user = await prismaClient.user.findUnique({ where: { email } });
//     if (!user)
//       return res.status(400).json({ message: "No account with this email." });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match)
//       return res.status(400).json({ message: "Invalid credentials." });

//     const token = signJwt(user.id);

//     res.status(200).json({ token, message: "LoggedIn successfully." });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong while siging in." });
//   }
// };
