import { Request, Response } from "express";
import { signJwt, verifyJwt } from "../utils/jwt";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, pasword } = req.body;

    // existing
    // =============

    const token = signJwt({ name, email });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while signing up." });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while siging in." });
  }
};
