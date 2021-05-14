import { CADASTRAR_MEDICO_REQUEST, CADASTRAR_MEDICO_SUCCESS } from "./types";


export function cadastrarMedicoRequest(dadosCadastrais) {
    return {
        type: CADASTRAR_MEDICO_REQUEST,
        payload: { dadosCadastrais }
    }
}

export function cadastrarMedicoSuccess(dadosCadastrais) {
    return {
        type: CADASTRAR_MEDICO_SUCCESS,
        payload: { dadosCadastrais }
    }
}