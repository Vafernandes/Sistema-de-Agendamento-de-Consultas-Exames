import { CADASTRAR_DATAS_HORARIOS_SUCCESS, CADASTRAR_MEDICO_SUCCESS, LISTAR_TODOS_MEDICOS_SUCCESS } from "./types"

const INITIAL_STATE = {
    medico: {},
    listaMedicos: [],
}

export default function medico(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CADASTRAR_MEDICO_SUCCESS:
            return {
                ...state,
                medico: action.payload.dadosCadastrais,
            }
        case LISTAR_TODOS_MEDICOS_SUCCESS:
            return {
                ...state,
                listaMedicos: action.payload.listaMedicos
            }
        default:
            return state
    }
}