import { CADASTRAR_MEDICO_SUCCESS } from "./types"

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
        default:
            return state
    }
}