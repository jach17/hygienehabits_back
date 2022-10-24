import { Router } from "express";
import { testGetRoute, testGetRouteParams, testNoDBRoute, testPostRoute } from "../controllers/player.controller.js";

const router = Router();

//Rutas para probar coneccion de base de datos
router.get('/testsindb', testNoDBRoute);
router.get('/ping', testGetRoute);
router.get('/ping/:id', testGetRouteParams);
router.post('/ping', testPostRoute);



export default router;