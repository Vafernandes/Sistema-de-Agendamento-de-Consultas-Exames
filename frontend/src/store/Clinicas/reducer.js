import {
    CADASTRO_CLINICA_SUCCESS,
    LISTAR_TODAS_CLINICAS_SUCCESS,
    LISTAR_CLINICAS_POR_ID_SUCCESS,
    ATUALIZA_CLINICA_SUCCESS,
    LIMPAR_DADOS_DA_CLINICA,
    LISTAR_MEDICOS_DE_UMA_CLINICA_POR_ID_CLINICA_SUCCESS
} from "./types";

const INITIAL_STATE = {
    dadosCadastrais: {},
    clinica: {
        id: '',
        nome: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cep: ''
    },
    listaDeClinicas: [],
    medicosDeUmaClinica: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CADASTRO_CLINICA_SUCCESS:
            return {
                ...state,
                dadosCadastrais: action.payload.dadosCadastrais,
            }
        case LISTAR_TODAS_CLINICAS_SUCCESS:
            return {
                ...state,
                listaDeClinicas: action.payload.listaDeClinicas,
            }
        case LISTAR_CLINICAS_POR_ID_SUCCESS:
            console.log(action.payload.obj)
            return {
                ...state,
                clinica: {
                    id: action.payload.obj.id,
                    nome: action.payload.obj.nome,
                    logradouro: action.payload.obj.endereco.logradouro,
                    numero: action.payload.obj.endereco.numero,
                    complemento: action.payload.obj.endereco.complemento,
                    bairro: action.payload.obj.endereco.bairro,
                    cep: action.payload.obj.endereco.cep
                }
            }
        case ATUALIZA_CLINICA_SUCCESS:
            return {
                ...state
            }
        case LIMPAR_DADOS_DA_CLINICA:
            return {
                ...state,
                clinica: {
                    id: '',
                    nome: '',
                    logradouro: '',
                    numero: '',
                    complemento: '',
                    bairro: '',
                    cep: ''
                }
            }
        case LISTAR_MEDICOS_DE_UMA_CLINICA_POR_ID_CLINICA_SUCCESS:
            return {
                ...state,
                medicosDeUmaClinica: action.payload.listaDeMedicos
            }
        default:
            return state
    }
}