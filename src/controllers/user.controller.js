import { pool } from "../db.js";

export const getPlayers = async(req, res)=>{
    const [result] = await pool.query("SELECT * FROM tb_player");
    res.json(result);
}
