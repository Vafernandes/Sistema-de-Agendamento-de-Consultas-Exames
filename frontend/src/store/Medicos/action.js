import { 
    CADASTRAR_DATAS_HORARIOS_REQUEST,
    CADASTRAR_DATAS_HORARIOS_SUCCESS,
    CADASTRAR_MEDICO_REQUEST, 
    CADASTRAR_MEDICO_SUCCESS, 
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