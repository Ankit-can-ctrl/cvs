import { prisma } from "@repo/db";
import { CreateRoomSchema } from "@repo/shared/schema";
import { Request, Response } from "express";

export const createRoom = async (req: Request, res: Response) => {
  const parsed = CreateRoomSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: "Incorrect inputs." });

  const userId = req.userId;
  if (!userId) return res.status(400).json({ message: "Not authenticated." });

  try {
    const room = await prisma.room.create({
      data: {
        name: parsed.data.name,
        createdById: userId,
      },
    });

    res.status(200).json({ roomId: room.id });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong while creating room." });
  }
};
