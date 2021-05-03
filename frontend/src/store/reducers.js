import { combineReducers } from "redux";
import cadastroFinalForm from './cadastroFinalForm/reducer'

const reducers = combineReducers({
    cadastroFinalForm: cadastroFinalForm
})

export { reducers }