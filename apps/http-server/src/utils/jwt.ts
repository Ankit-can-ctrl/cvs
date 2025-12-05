import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "12345";

export const signJwt = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

export const verifyJwt = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
