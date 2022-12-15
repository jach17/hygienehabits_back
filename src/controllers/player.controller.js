import { pool } from "../db.js";
import {
  jsonResponse,
  isJSONempty,
  RESULT_CODE_ERROR,
  STATUS_CODE_ERROR,
  RESULT_CODE_SUCCESS,
  STATUS_CODE_SUCCESS,
} from "./component.js";

/**  Routes for player services */

export const authPlayer = async (req, res) => {
  try {
    const query =
      "SELECT * FROM tb_player WHERE namePlayer=? AND passwordPlayer=?";
    const { namePlayer, passwordPlayer } = req.body;
    const [dbResponse] = await pool.query(query, [namePlayer, passwordPlayer]);
    const isRegistred = !isJSONempty(dbResponse);
    const idPlayer = dbResponse[0].idPlayer;
    res.status(200).json(
      jsonResponse(
        RESULT_CODE_SUCCESS,
        [
          {
            isRegistred: isRegistred,
            idPlayer: idPlayer,
          },
        ],
        STATUS_CODE_SUCCESS
      )
    );
  } catch (e) {
    res.status(500).json(jsonResponse(RESULT_CODE_ERROR, e, STATUS_CODE_ERROR));
  }
};

export const getPlayerById = async (req, res) => {
  try {
    const idToFind = req.params.id;
    const query = "SELECT * FROM tb_player WHERE idPlayer=?";
    let [result] = await pool.query(query, idToFind);
    if (isJSONempty(result)) {
      result = [{ Error: "El id solicitado no se encuentra registrado" }];
    }
    res
      .status(200)
      .json(jsonResponse(RESULT_CODE_SUCCESS, result, STATUS_CODE_SUCCESS));
  } catch (e) {
    return res
      .status(500)
      .json(jsonResponse(RESULT_CODE_ERROR, e, STATUS_CODE_ERROR));
  }
};

export const getPlayerByTutorId = async (req, res) => {
  try {
    const idToFind = req.params.id;
    const query = "SELECT * FROM tb_player WHERE idTutorOwner=?";
    let [result] = await pool.query(query, idToFind);
    if (isJSONempty(result)) {
      result = [{ Error: "El id solicitado no se encuentra registrado" }];
    }
    res
      .status(200)
      .json(jsonResponse(RESULT_CODE_SUCCESS, result, STATUS_CODE_SUCCESS));
  } catch (e) {
    return res
      .status(500)
      .json(jsonResponse(RESULT_CODE_ERROR, e, STATUS_CODE_ERROR));
  }
};

export const enableStatusLevelPlayer = async (req, res) => {
  try {
    const playerToUpdate = req.params.idPlayer;
    const level = req.params.idLevel;
    let query = "";
    switch (level) {
      case "1":
        query = "UPDATE tb_player SET statusLevel1=1 WHERE idPlayer=?";
        break;
      case "2":
        query = "UPDATE tb_player SET statusLevel2=1 WHERE idPlayer=?";
        break;
      case "3":
        query = "UPDATE tb_player SET statusLevel3=1 WHERE idPlayer=?";
        break;
      case "4":
        query = "UPDATE tb_player SET statusLevel4=1 WHERE idPlayer=?";
        break;
      case "5":
        query = "UPDATE tb_player SET statusLevel5=1 WHERE idPlayer=?";
        break;
    }
    const [row] = await pool.query(query, playerToUpdate);
    let response = "";
    if (row.affectedRows != 0) {
      response = [
        { "level enabled": "true", "id player affected": playerToUpdate },
      ];
    } else {
      response = [{ "level enabled": "false", Error: "Algo salió mal" }];
    }

    res
      .status(200)
      .json(jsonResponse(RESULT_CODE_SUCCESS, response, STATUS_CODE_SUCCESS));
  } catch (e) {
    return res
      .status(500)
      .json(jsonResponse(RESULT_CODE_ERROR, e, STATUS_CODE_ERROR));
  }
};

export const postPlayer = async (req, res) => {
  try {
    const { namePlayer, passwordPlayer, agePlayer, authTokenTutor } = req.body;
    const authTokenTutorWithIdTutor =
      "SELECT * FROM tb_tutor WHERE authTokenTutor=?";
    const [authTokenTutorWithIdResult] = await pool.query(
      authTokenTutorWithIdTutor,
      [authTokenTutor]
    );
    let response = [];
    if (!isJSONempty(authTokenTutorWithIdResult)) {
      const tutorIdQuery =
        "SELECT idTutor FROM tb_tutor WHERE authTokenTutor=?";
      const [tutorIdResponse] = await pool.query(tutorIdQuery, [
        authTokenTutor,
      ]);
      const yaRegistrado = "SELECT * FROM tb_player WHERE namePlayer = ?";
      const [result] = await pool.query(yaRegistrado, namePlayer);
      if (isJSONempty(result)) {
        const query =
          "INSERT INTO tb_player (namePlayer, passwordPlayer, agePlayer, idTutorOwner, authTokenTutor, statusLevel1, statusLevel2, statusLevel3, statusLevel4, statusLevel5) VALUES (?,?,?,?,?,1,0,0,0,0)";
        const [row] = await pool.query(query, [
          namePlayer,
          passwordPlayer,
          agePlayer,
          tutorIdResponse[0].idTutor,
          authTokenTutor,
        ]);
        response = [{ inserted: "true", insertedId: row.insertId }];
      } else {
        response = [
          { inserted: "false", Error: "Ese nombre ya se encuentra registrado" },
        ];
      }
    } else {
      response = [
        {
          inserted: "true",
          Error: "Ocurrió un error al verificar la información del tutor",
        },
      ];
    }
    res
      .status(200)
      .json(jsonResponse(RESULT_CODE_SUCCESS, response, STATUS_CODE_SUCCESS));
  } catch (e) {
    return res
      .status(500)
      .json(jsonResponse(RESULT_CODE_ERROR, e, STATUS_CODE_ERROR));
  }
};

export const getPlayers = async (req, res) => {
  try {
    const query = "SELECT * FROM tb_player";
    let [result] = await pool.query(query);
    if (isJSONempty(result)) {
      result = [{ Error: "No hay jugadores registrados" }];
    }
    res
      .status(200)
      .json(jsonResponse(RESULT_CODE_SUCCESS, result, STATUS_CODE_SUCCESS));
  } catch (e) {
    return res
      .status(500)
      .json(jsonResponse(RESULT_CODE_ERROR, e, STATUS_CODE_ERROR));
  }
};
