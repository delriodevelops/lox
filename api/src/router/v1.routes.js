import { Router } from "express";
import { preguntas } from "../controllers/preguntas.controller.js";
import { rooms } from "../controllers/rooms.controller.js";
const router = Router();

router.get("/preguntas/:tabla", preguntas.get);

router.get("/rooms/:room_id", rooms.get);



router.post("/preguntas/:tabla", preguntas.post);

router.post("/rooms", rooms.create);

export default router;
