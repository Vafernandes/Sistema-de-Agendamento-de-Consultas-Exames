import { 
    CADASTRO_AGENDAMENTO_REQUEST,
    CADASTRO_AGENDAMENTO_SUCCESS,
} from "./types";

export function cadastroAgendamentoRequest(dadosCadastrais) {
    return {
        type: CADASTRO_AGENDAMENTO_REQUEST,
        payload: { dadosCadastrais }
    }
}

export function cadastroAgendamentoSuccess(dadosCadastrais) {
    return {
        type: CADASTRO_AGENDAMENTO_SUCCESS,
        payload: { dadosCadastrais }
    }
}
