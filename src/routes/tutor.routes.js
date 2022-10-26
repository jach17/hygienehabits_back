import { Router } from "express";
import { getTutors, postTutor } from "../controllers/tutor.controller.js";

const tutorRouter = Router();

tutorRouter.get('/list/tutors', getTutors);
tutorRouter.post('/add/tutor', postTutor);

export default tutorRouter;