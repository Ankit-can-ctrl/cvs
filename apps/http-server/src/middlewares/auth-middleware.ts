// import { NextFunction, Request, Response } from "express";
// import { verifyJwt } from "../utils/jwt";

// export const authMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "No token provided." });

//     const decoded = verifyJwt(token);
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token!" });
//   }
// };
