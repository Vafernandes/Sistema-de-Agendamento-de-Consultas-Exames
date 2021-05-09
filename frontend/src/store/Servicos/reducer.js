import { LISTAR_TODOS_SUCCESS, LISTAR_TODOS_ERROR, LISTAR_POR_ID_SUCCESS } from "./types";

const INITIAL_STATE = {
    servico: {},
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
        case LISTAR_POR_ID_SUCCESS:
            console.log(action.payload.obj)
            return {
                ...state,
                servico: action.payload.obj
            }
        default:
            return state
    }
}