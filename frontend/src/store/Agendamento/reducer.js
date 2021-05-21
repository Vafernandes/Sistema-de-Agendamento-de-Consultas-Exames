import { CADASTRO_AGENDAMENTO_SUCCESS } from "./types"

const INITIAL_STATE = {
    agendamento: {}
}

export default function agendamentoReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CADASTRO_AGENDAMENTO_SUCCESS:
            return {
                ...state,
                agendamento: action.payload.dadosCadastrais,
            }
        default:
            return state
    }
}