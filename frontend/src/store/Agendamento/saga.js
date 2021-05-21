import { all, takeLatest, put, call } from 'redux-saga/effects';
import {  
  cadastrarSuccessClinica, cadastroAgendamentoSuccess 
} from './action';
import {
    CADASTRO_AGENDAMENTO_REQUEST
} from './types';
import { api } from '../../service/api';
import { toastr } from 'react-redux-toastr';


function* cadastrarAgendamento(action) {

  try {

    const agendamento = action.payload.dadosCadastrais;

    const response = yield api.post('/agendamentos', agendamento)
    
    console.log(response.data)

    yield put(cadastroAgendamentoSuccess(response.data))

    toastr.success('Sucesso', 'Agendamento realizado com sucesso!');

  } catch (error) {
    toastr.error('Erro', `${error.message}`);
  }
}

export default all([
  takeLatest(CADASTRO_AGENDAMENTO_REQUEST, cadastrarAgendamento)
])