import { Router } from "express";
import { testGetRoute, testGetRouteParams, testNoDBRoute, testPostRoute } from "../controllers/test.controller.js";

const testRouter = Router();

//Rutas para probar coneccion de base de datos
testRouter.get('/server/ping', testNoDBRoute);
testRouter.get('/db/ping', testGetRoute);
testRouter.get('/db/ping/:id', testGetRouteParams);
testRouter.post('/db/ping', testPostRoute);



export default testRouter;