import { Router } from "express";
import { getSesions, postSesion, updateSesionDateEndById } from "../controllers/sesion.controller.js";

const sesionRouter = Router();

sesionRouter.get('/list/sesions', getSesions);
sesionRouter.post('/add/sesion', postSesion);
sesionRouter.post('/update/sesion/:id', updateSesionDateEndById);




export default sesionRouter;