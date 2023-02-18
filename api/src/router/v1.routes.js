import { Router } from "express";
import {
	getPreguntas,
	postPregunta
} from "../controllers/preguntas.controller.js";
import { rooms } from "../controllers/rooms.controller.js";
const router = Router();

router.get("/preguntas/:tabla", getPreguntas);

router.post("/preguntas/:tabla", postPregunta);
router.post("/rooms", rooms.create);

export default router;
