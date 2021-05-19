import { CADASTRAR_MEDICO_SUCCESS, DELETAR_MEDICO_SUCCESS, LISTAR_HORA_DATA_DE_UM_MEDICO_POR_ID_MEDICO_SUCCESS, LISTAR_TODOS_MEDICOS_SUCCESS } from "./types"

const INITIAL_STATE = {
    medico: {},
    listaMedicos: [],
    dataHorarios: []
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
        case DELETAR_MEDICO_SUCCESS:
            return {
                ...state
            }
        case LISTAR_HORA_DATA_DE_UM_MEDICO_POR_ID_MEDICO_SUCCESS:
            return {
                ...state,
                dataHorarios: action.payload.listaDeHorarios
            }
        default:
            return state
    }
}