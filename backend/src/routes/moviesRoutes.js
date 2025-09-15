import express from 'express';
import { createMovies, deleteMovies, getAllMovies, updateMovies } from '../controllers.js/moviesControllers.js';

const router = express.Router();
router.get("/", getAllMovies);

router.post("/",createMovies);

router.put("/:id", updateMovies);

router.delete("/:id", deleteMovies);

export default router;