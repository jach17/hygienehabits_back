import { Router } from "express";
import { getReports } from "../controllers/report.controller.js";

const reportRouter = Router();

reportRouter.get('/list/reports', getReports);


export default reportRouter;