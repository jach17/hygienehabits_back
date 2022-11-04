import { Router } from "express";
import { getSesions, postSesion } from "../controllers/sesion.controller.js";

const sesionRouter = Router();

sesionRouter.get('/list/sesions', getSesions);
sesionRouter.post('/add/sesion', postSesion);



export default sesionRouter;