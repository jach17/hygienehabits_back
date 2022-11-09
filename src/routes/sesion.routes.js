import { Router } from "express";
import { getSesions, getSesionsByPlayerId, postSesion, updateSesionDateEndById } from "../controllers/sesion.controller.js";

const sesionRouter = Router();

sesionRouter.get('/list/sesions', getSesions);
sesionRouter.get('/list/sesions/player/:id', getSesionsByPlayerId);
sesionRouter.post('/add/sesion', postSesion);
sesionRouter.post('/update/sesion/:id', updateSesionDateEndById);




export default sesionRouter;