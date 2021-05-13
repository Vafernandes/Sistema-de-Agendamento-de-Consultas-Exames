import { 
    CADASTRO_CLINICA_REQUEST,
    CADASTRO_CLINICA_SUCCESS,
    DELETAR_CLINICAS_REQUEST,
    LISTAR_CLINICAS_POR_ID_REQUEST,
    LISTAR_CLINICAS_POR_ID_SUCCESS,
    LISTAR_TODAS_CLINICAS_REQUEST,
    LISTAR_TODAS_CLINICAS_SUCCESS
} from "./types";

export function cadastrarRequestClinica(dadosCadastrais) {
    return {
        type: CADASTRO_CLINICA_REQUEST,
        payload: { dadosCadastrais }
    }
}

export function cadastrarSuccessClinica(dadosCadastrais) {
    return {
        type: CADASTRO_CLINICA_SUCCESS,
        payload: { dadosCadastrais }
    }
}

export function listarTodosRequest() {
    return {
        type: LISTAR_TODAS_CLINICAS_REQUEST
    }
}

export function listarTodosSuccess(listaDeClinicas) {
    return {
        type: LISTAR_TODAS_CLINICAS_SUCCESS,
        payload: { listaDeClinicas }
    }
}

export function deletarClinica(id) {
    return {
        type: DELETAR_CLINICAS_REQUEST,
        payload: { id }
    }
}

export function listaPorId(id) {
    return {
        type: LISTAR_CLINICAS_POR_ID_REQUEST,
        payload: { id }
    }
}

export function listaPorIdSuccess(obj) {
    return {
        type: LISTAR_CLINICAS_POR_ID_SUCCESS,
        payload: { obj }
    }
}