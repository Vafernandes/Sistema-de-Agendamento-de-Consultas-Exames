import { CADASTRO_ERROR, CADASTRO_REQUEST, CADASTRO_SUCCESS } from "./types";

export function cadastrarRequest(dadosCadastrais) {
    console.log(dadosCadastrais)
    return {
        type: CADASTRO_REQUEST,
        payload: { dadosCadastrais }
    }
}

export function cadastrarSuccess(dadosCadastrais) {
    console.log(dadosCadastrais)
    return {
        type: CADASTRO_SUCCESS,
        payload: { dadosCadastrais }
    }
}


export function cadastrarError() {
    return {
        type: CADASTRO_ERROR,
    }
}