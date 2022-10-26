/***
 [
    {
      "result":"0",
      "message": 
      {
        "response": [
          {
            "error":"La ruta especificada no se encuentra"
          }
        ]
      },
      "code":"404"
    },
    {
      "result":"1",
      "message":
      {
          "response":[
                {
                    "idPlayer": 1,
                    "namePlayer": "Player1",
                    "passwordPlayer": "123",
                    "agePlayer": "12",
                    "idTutorOwner": 1,
                    "authTokenTutor": "123abc"
                },
                {
                    "idPlayer": 2,
                    "namePlayer": "Player2",
                    "passwordPlayer": "123",
                    "agePlayer": "11",
                    "idTutorOwner": 1,
                    "authTokenTutor": "123abc"
                }
          ]
      },
      "code":"200"
    },
    {
      "result": number, //Number should be a string
      "message": 
      {
        "response": [
            //Error description o response array
          {
            "error":"La ruta especificada no se encuentra"
          }
        ]
      },
      "code":code //Code should be string 404,200,500 etc
    },
  ]

  */