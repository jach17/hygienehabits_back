import { Router } from "express";
import { testGetRoute, testGetRouteParams, testPostRoute } from "../controllers/player.controller.js";

const router = Router();

//Rutas para probar coneccion de base de datos
router.get('/ping', testGetRoute);
router.get('/ping/:id', testGetRouteParams);
router.post('/ping', testPostRoute);



export default router;