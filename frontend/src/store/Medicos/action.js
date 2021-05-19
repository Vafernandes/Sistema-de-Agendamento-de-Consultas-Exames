import { 
    CADASTRAR_DATAS_HORARIOS_REQUEST,
    CADASTRAR_DATAS_HORARIOS_SUCCESS,
    CADASTRAR_MEDICO_REQUEST, 
    CADASTRAR_MEDICO_SUCCESS, 
    DELETAR_MEDICO_REQUEST, 
    DELETAR_MEDICO_SUCCESS, 
    LISTAR_HORA_DATA_DE_UM_MEDICO_POR_ID_MEDICO_REQUEST, 
    LISTAR_HORA_DATA_DE_UM_MEDICO_POR_ID_MEDICO_SUCCESS, 
    LISTAR_TODOS_MEDICOS_REQUEST, 
    LISTAR_TODOS_MEDICOS_SUCCESS 
} from "./types";


export function cadastrarMedicoRequest(dadosCadastrais, datasHorarios) {
    return {
        type: CADASTRAR_MEDICO_REQUEST,
        payload: { dadosCadastrais, datasHorarios }
    }
}

export function cadastrarMedicoSuccess(dadosCadastrais) {
    return {
        type: CADASTRAR_MEDICO_SUCCESS,
        payload: { dadosCadastrais }
    }
}

export function listarTodosMedicosRequest() {
    return {
        type: LISTAR_TODOS_MEDICOS_REQUEST
    }
}

export function listarTodosMedicosSuccess(listaMedicos) {
    return {
        type: LISTAR_TODOS_MEDICOS_SUCCESS,
        payload: { listaMedicos }
    }
}

export function cadastrarDatasHorariosRequest(dadosCadastrais) {
    return {
        type: CADASTRAR_DATAS_HORARIOS_REQUEST,
        payload: { dadosCadastrais }
    }
}

export function cadastrarDatasHorariosSuccess(dadosCadastrais) {
    return {
        type: CADASTRAR_DATAS_HORARIOS_SUCCESS,
        payload: { dadosCadastrais }
    }
}

export function deletarMedicoRequest(id) {
    return {
        type: DELETAR_MEDICO_REQUEST,
        payload: { id }
    }
}

export function deletarMedicoSuccess() {
    return {
        type: DELETAR_MEDICO_SUCCESS
    }
}

export function listarHorarioDataDeUmMedicoPorIdMedicoRequest(id) {
    return {
        type: LISTAR_HORA_DATA_DE_UM_MEDICO_POR_ID_MEDICO_REQUEST,
        payload: { id }
    }
}

export function listarHorarioDataDeUmMedicoPorIdMedicoSuccess(listaDeHorarios) {
    return {
        type: LISTAR_HORA_DATA_DE_UM_MEDICO_POR_ID_MEDICO_SUCCESS,
        payload: { listaDeHorarios }
    }
}