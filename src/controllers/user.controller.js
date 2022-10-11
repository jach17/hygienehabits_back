import { pool } from "../db.js";

export const getPlayers = async(req, res)=>{
    const [result] = await pool.query("SELECT * FROM tb_player");
    res.json(result);
}

export const getTutors = async(req, res)=>{
    const[result] = await pool.query("SELECT * FROM tb_tutor");
    res.json(result)
}

export const insertTutor = async(req, res)=>{
    const {
        nameTutor, passwordTutor, ageTutor, authTokenTutor
    } = req.body;
    const [rows] = await pool.query(
        "INSERT INTO `tb_tutor`(`nameTutor`, `passwordTutor`, `ageTutor`, `authTokenTutor`) VALUES (?,?,?,?)", 
        [nameTutor, passwordTutor, ageTutor, authTokenTutor] );
    res.json({"row affected id": rows.insertId});
};


export const insertPlayer = async(req, res)=>{
   /* const {
        namePlayer ,  
        passwordPlayer ,  
        agePlayer ,  
        idTutorOwner , 
        authTokenTutor} = req.body;
    const [rows] = await pool.query(
        "INSERT INTO `tb_player` (`namePlayer`, `passwordPlayer`, `agePlayer`, `idTutorOwner`, `authTokenTutor`) VALUES (?,?,?,?,?)", 
        [ 
            namePlayer ,  
            passwordPlayer ,  
            agePlayer ,  
            idTutorOwner , 
            authTokenTutor] );
    res.json({"row affected id": rows.insertId});
    */
   console.log("Post wrks");
   res.json({"res":"ok"});
}
