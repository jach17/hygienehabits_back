import { Router } from "express";
import { authTutor, getTutorById, getTutors, postTutor } from "../controllers/tutor.controller.js";

const tutorRouter = Router();

tutorRouter.get('/list/tutors', getTutors);
tutorRouter.post('/add/tutor', postTutor);
tutorRouter.get('/list/tutor/:id', getTutorById);
tutorRouter.post('/auth/tutor', authTutor);

export default tutorRouter;