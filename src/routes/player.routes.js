import { Router } from "express";
import {authPlayer, getPlayerById, getPlayers, postPlayer, enableStatusLevelPlayer} from "../controllers/player.controller.js";

const playerRouter = Router();

playerRouter.get('/list/players', getPlayers);
playerRouter.get('/list/player/:id', getPlayerById);
playerRouter.post('/add/player', postPlayer);
playerRouter.post('/auth/player', authPlayer);
playerRouter.post('/enable/level/:idLevel/player/:idPlayer', enableStatusLevelPlayer);


export default playerRouter;