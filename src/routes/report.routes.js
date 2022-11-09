import { Router } from "express";
import { getReports, getReportsByPlayerId, postReport } from "../controllers/report.controller.js";

const reportRouter = Router();

reportRouter.get('/list/reports', getReports);
reportRouter.post('/add/report', postReport);
reportRouter.get('/list/reports/player/:id', getReportsByPlayerId);



export default reportRouter;