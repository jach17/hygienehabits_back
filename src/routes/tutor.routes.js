import { Router } from "express";
import { getTutorById, getTutors, postTutor } from "../controllers/tutor.controller.js";

const tutorRouter = Router();

tutorRouter.get('/list/tutors', getTutors);
tutorRouter.post('/add/tutor', postTutor);
tutorRouter.get('/list/tutor/:id', getTutorById);

export default tutorRouter;