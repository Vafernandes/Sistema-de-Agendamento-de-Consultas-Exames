import { LISTAR_TODOS_SUCCESS, LISTAR_TODOS_ERROR } from "./types";

const INITIAL_STATE = {
    listaDeServicos: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LISTAR_TODOS_SUCCESS:
            return {
                ...state,
                listaDeServicos: action.payload.listaDeServicos,
            }
        case LISTAR_TODOS_ERROR:
            return {
                ...state
            }
        default:
            return state
    }
}