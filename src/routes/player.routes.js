import { Router } from "express";
import {getPlayerById, getPlayers, postPlayer} from "../controllers/player.controller.js";

const playerRouter = Router();

playerRouter.get('/list/players', getPlayers);
playerRouter.get('/list/player/:id', getPlayerById);
playerRouter.post('/add/player', postPlayer);


export default playerRouter;