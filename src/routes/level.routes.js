import { Router } from "express";
import { getLevels } from "../controllers/level.controller.js";

const levelRouter = Router();

levelRouter.get('/list/levels', getLevels);


export default levelRouter;