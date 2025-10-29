import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { favoriteSchema } from "../validators/favoriteSchema";

export const getFavorites = async (req: Request, res: Response) => {
  const skip = Number(req.query.skip) || 0;
  const take = Number(req.query.take) || 10;

  const favorites = await prisma.favorite.findMany({
    skip,
    take,
    orderBy: { id: "desc" },
  });

  res.json(favorites);
};

export const createFavorite = async (req: Request, res: Response) => {
  const parsed = favoriteSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.issues); // ✅ changed
  }

  const favorite = await prisma.favorite.create({
    data: parsed.data,
  });
  res.json(favorite);
};

export const updateFavorite = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const parsed = favoriteSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.issues); // ✅ changed
  }

  const favorite = await prisma.favorite.update({
    where: { id },
    data: parsed.data,
  });
  res.json(favorite);
};

export const deleteFavorite = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.favorite.delete({ where: { id } });
  res.json({ message: "Deleted successfully" });
};
