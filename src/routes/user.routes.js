import { Router } from "express";
import { getPlayers } from "../controllers/user.controller.js";


const router = Router();

router.get('/players', getPlayers);


export default router;