import { LISTAR_TODOS_REQUEST, LISTAR_TODOS_SUCCESS, LISTAR_TODOS_ERROR } from "./types";

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

