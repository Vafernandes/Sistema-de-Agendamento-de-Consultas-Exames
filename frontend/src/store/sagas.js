import { all } from 'redux-saga/effects';

import ServicoSaga from './Servicos/saga';
import ClinicaSaga from './Clinicas/saga';

export default function* sagas() {
    return yield all([
        ServicoSaga,
        ClinicaSaga
    ])
};