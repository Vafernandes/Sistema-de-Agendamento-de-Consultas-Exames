import { all } from 'redux-saga/effects';
import CadastroFinalForm from './cadastroFinalForm/saga'

export default function* sagas() {
    return yield all([
        CadastroFinalForm
    ])
};