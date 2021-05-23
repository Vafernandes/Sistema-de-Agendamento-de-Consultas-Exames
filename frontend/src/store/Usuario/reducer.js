import { AUTENTICAR_USUARIO_SUCCESS, CADASTRO_USUARIO_SUCCESS, LOGOUT_USUARIO_SUCCESS } from "./types"

const INITIAL_STATE = {
    usuario: {},
    dadosAutenticacao: {}
}

export default function usuarioReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CADASTRO_USUARIO_SUCCESS:
            return {
                ...state,
                usuario: action.payload.dadosCadastrais,
            }
        case AUTENTICAR_USUARIO_SUCCESS:
            return {
                ...state,
                dadosAutenticacao: action.payload.dadosLogin
            }
        case LOGOUT_USUARIO_SUCCESS: 
            return {
                ...state,
                dadosAutenticacao: {}
            }
        default:
            return state
    }
}