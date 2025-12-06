import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "@repo/common-backend/config";
const JWT_SECRET = process.env.JWT_SECRET || "123456";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}

const SECRET = JWT_SECRET; // TypeScript now knows this is definitely a string

export const signJwt = (userId: string) => {
  return jwt.sign({ userId }, SECRET, { expiresIn: "1d" });
};

export const verifyJwt = (token: string) => {
  return jwt.verify(token, SECRET);
};
