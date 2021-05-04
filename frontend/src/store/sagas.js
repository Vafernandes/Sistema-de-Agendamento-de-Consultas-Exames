import { all } from 'redux-saga/effects';
import CadastroFinalForm from './cadastroFinalForm/saga'
import ServicoSaga from './Servicos/saga'

export default function* sagas() {
    return yield all([
        CadastroFinalForm,
        ServicoSaga
    ])
};