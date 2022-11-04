import { Router } from "express";
import { getReports, postReport } from "../controllers/report.controller.js";

const reportRouter = Router();

reportRouter.get('/list/reports', getReports);
reportRouter.post('/add/report', postReport);



export default reportRouter;