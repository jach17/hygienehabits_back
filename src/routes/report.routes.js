import { Router } from "express";
import {
  addTutorFeedback,
  getFullReportByPlayer,
  getReports,
  getReportsByPlayerId,
  postReport,
} from "../controllers/report.controller.js";

const reportRouter = Router();

reportRouter.get("/list/reports", getReports);
reportRouter.post("/add/report", postReport);
reportRouter.get("/list/reports/player/:id", getReportsByPlayerId);
reportRouter.post("/add/feedback/report/:id", addTutorFeedback);
reportRouter.get("/list/fullreports/player/:id", getFullReportByPlayer);

export default reportRouter;
