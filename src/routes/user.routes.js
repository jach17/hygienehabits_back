import { Router } from "express";
import { getPlayers, getTutors, insertPlayer, insertTutor } from "../controllers/user.controller.js";


const router = Router();

router.get('/get/players', getPlayers);
router.get('/get/tutors', getTutors);

router.post('/add/player', insertPlayer);
router.post('/add/tutor', insertTutor);


export default router;