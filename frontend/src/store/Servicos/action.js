import { 
    LISTAR_TODOS_REQUEST, 
    LISTAR_TODOS_SUCCESS, 
    LISTAR_TODOS_ERROR, 
    DELETAR_REQUEST,
    LISTAR_POR_ID_REQUEST,
    LISTAR_POR_ID_SUCCESS,
    CADASTRO_REQUEST,
    CADASTRO_SUCCESS
} from "./types";

export function cadastrarRequest(dadosCadastrais) {
    return {
        type: CADASTRO_REQUEST,
        payload: { dadosCadastrais }
    }
}

export function cadastrarSuccess(dadosCadastrais) {
    return {
        type: CADASTRO_SUCCESS,
        payload: { dadosCadastrais }
    }
}

export function listarTodosRequest() {
    return {
        type: LISTAR_TODOS_REQUEST
    }
}

export function listarTodosSuccess(listaDeServicos) {
    return {
        type: LISTAR_TODOS_SUCCESS,
        payload: { listaDeServicos }
    }
}


export function listarTodosError() {
    return {
        type: LISTAR_TODOS_ERROR,
    }
}

export function deletar(id) {
    return {
        type: DELETAR_REQUEST,
        payload: { id }
    }
}

export function listaPorId(id) {
    return {
        type: LISTAR_POR_ID_REQUEST,
        payload: { id }
    }
}

export function listaPorIdSuccess(obj) {
    return {
        type: LISTAR_POR_ID_SUCCESS,
        payload: { obj }
    }
}