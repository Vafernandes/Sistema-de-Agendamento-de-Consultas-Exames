import { LISTAR_TODOS_SUCCESS, LISTAR_TODOS_ERROR, LISTAR_POR_ID_SUCCESS, CADASTRO_SUCCESS } from "./types";

const INITIAL_STATE = {
    dadosCadastrais: {},
    servico: {},
    listaDeServicos: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CADASTRO_SUCCESS:
            return {
                ...state,
                dadosCadastrais: action.payload.dadosCadastrais,
            }
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
            return {
                ...state,
                servico: action.payload.obj
            }
        default:
            return state
    }
}