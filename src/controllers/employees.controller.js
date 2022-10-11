import { pool } from "../db.js";

export const getEmployees = async(req, res)=>{
    const [result] = await pool.query('SELECT * FROM employee');
    res.json(result);
};

export const init = (req, res)=>{
    res.send("Hola ");
}

export const getEmployeeById = async(req, res)=>{
    //TRy catch para manejar errores
    const [result] = await pool.query('SELECT * FROM employee WHERE id=?', [req.params.id]);
    if(result.length<=0){
        res.status(404).json({
            "message":"Employee not found"
        });
        
    }
    res.send(result[0]);
    
};



export const createEmployee = async(req, res)=> {
    const {name, salary} = req.body;
    const [rows] = await pool.query('INSERT INTO employee(name, salary) VALUES (?,?)', [name, salary]);
    res.send({
        id:rows.insertId,
        name,
        salary
    });
};