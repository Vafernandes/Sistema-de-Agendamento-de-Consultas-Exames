import { combineReducers } from "redux";
import { reducer as toastrReducer } from 'react-redux-toastr'
import cadastroFinalForm from './cadastroFinalForm/reducer'
import servico from './Servicos/reducer'

const reducers = combineReducers({
    toastr: toastrReducer,
    cadastroFinalForm: cadastroFinalForm,
    servico: servico
})

export { reducers }