import { Router } from "express";
import {
  authTutor,
  getTutorById,
  getTutorIdByNameAndPassword,
  getTutors,
  postTutor,
  updateTutorPassword,
} from "../controllers/tutor.controller.js";

const tutorRouter = Router();

tutorRouter.get("/list/tutors", getTutors);
tutorRouter.post("/add/tutor", postTutor);
tutorRouter.get("/list/tutor/:id", getTutorById);
tutorRouter.post("/auth/tutor", authTutor);
tutorRouter.post("/list/tutor/id", getTutorIdByNameAndPassword);
tutorRouter.post("/update/tutor/password/:id", updateTutorPassword);

export default tutorRouter;
