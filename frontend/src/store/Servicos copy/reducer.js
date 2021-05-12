import { CADASTRO_SUCCESS, CADASTRO_ERROR } from "./types";

const INITIAL_STATE = {
    dadosCadastrais: {},
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CADASTRO_SUCCESS:
            return {
                ...state,
                dadosCadastrais: action.payload.dadosCadastrais,
            }
        case CADASTRO_ERROR:
            return {
                ...state
            }
        default:
            return state
    }
}