import { combineReducers } from "redux";
import { reducer as toastrReducer } from 'react-redux-toastr';

import servico from './Servicos/reducer';
import clinica from './Clinicas/reducer';
import medico from './Medicos/reducer';

const reducers = combineReducers({
    toastr: toastrReducer,
    servico: servico,
    clinica: clinica,
    medico: medico
})

export { reducers }