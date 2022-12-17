import { Router } from "express";
import {
  addTutorFeedback,
  getFullReportByPlayer,
  getReports,
  getReportsByPlayerId,
  getSessionsWithReportsByPlayerId,
  postReport,
} from "../controllers/report.controller.js";

const reportRouter = Router();

reportRouter.get("/list/reports", getReports);
reportRouter.post("/add/report", postReport);
reportRouter.get("/list/reports/player/:id", getReportsByPlayerId);
reportRouter.post("/add/feedback/report/:id", addTutorFeedback);
reportRouter.get("/list/fullreports/player/:id", getFullReportByPlayer);
reportRouter.get(
  "/list/reports/sessions/player/:id",
  getSessionsWithReportsByPlayerId
);

export default reportRouter;
