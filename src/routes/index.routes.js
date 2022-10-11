import {Router} from "express";
import {pool} from '../db.js';

const router =Router();

router.get('/', async(req, res) => {
    const [result] = await pool.query("SELECT 1+1 As result");
    res.json(result[0]);
});

export default router;