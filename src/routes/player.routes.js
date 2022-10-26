import { Router } from "express";
import {authPlayer, getPlayerById, getPlayers, postPlayer} from "../controllers/player.controller.js";

const playerRouter = Router();

playerRouter.get('/list/players', getPlayers);
playerRouter.get('/list/player/:id', getPlayerById);
playerRouter.post('/add/player', postPlayer);
playerRouter.post('/auth/player', authPlayer);


export default playerRouter;