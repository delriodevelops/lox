import { Router } from "express";
import { getPreguntas, postPregunta } from "../controllers/preguntas.controller.js";
const router = Router()

router.get('/preguntas/:tabla',getPreguntas)

router.post('/preguntas/:tabla',postPregunta)

export default router