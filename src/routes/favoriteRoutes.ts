import { Router } from "express";
import {
  getFavorites,
  createFavorite,
  updateFavorite,
  deleteFavorite,
} from "../controllers/favoriteController";

const router = Router();

router.get("/", getFavorites);
router.post("/", createFavorite);
router.put("/:id", updateFavorite);
router.delete("/:id", deleteFavorite);

export default router;