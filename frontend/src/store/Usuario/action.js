import { AUTENTICAR_USUARIO_REQUEST, AUTENTICAR_USUARIO_SUCCESS, CADASTRO_USUARIO_REQUEST, CADASTRO_USUARIO_SUCCESS, LOGOUT_USUARIO_REQUEST, LOGOUT_USUARIO_SUCCESS } from "./types"


export function cadastroUsuarioRequest(dadosCadastrais) {
    return {
        type: CADASTRO_USUARIO_REQUEST,
        payload: { dadosCadastrais }
    }
}

export function cadastroUsuarioSuccess(dadosCadastrais) {
    return {
        type: CADASTRO_USUARIO_SUCCESS,
        payload: { dadosCadastrais }
    }
}

export function autenticarUsuario(dadosLogin) {
    return {
        type: AUTENTICAR_USUARIO_REQUEST,
        payload: { dadosLogin }
    }
}

export function autenticarSuccess(dadosLogin) {
    return {
        type: AUTENTICAR_USUARIO_SUCCESS,
        payload: { dadosLogin }
    }
}

export function logoutUsuarioRequest() {
    return {
        type: LOGOUT_USUARIO_REQUEST,
    }
}

export function logoutUsuarioSuccess() {
    return {
        type: LOGOUT_USUARIO_SUCCESS,
    }
}
