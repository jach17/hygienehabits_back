export const isJSONempty = (json) => {
    console.log(json);
    if(json.length==0){
        return true;
    }else{
        return false;
    }
}

export const jsonResponse = (result_code, jsonObjResponse, status_code) =>{
    let response = []
    if(result_code==0){
        response = [{"Error":jsonObjResponse}];
    }else{
        response=jsonObjResponse;
    }
    return {
        "result":result_code,
        "message":
        {
            "response":response
        },
        "code":status_code
    }


}


export const RESULT_CODE_ERROR = "0";
export const RESULT_CODE_SUCCESS = "1";
export const STATUS_CODE_SUCCESS = "200";
export const STATUS_CODE_ERROR = "500";
export const STATUS_CODE_NOT_FOUND = "404";



