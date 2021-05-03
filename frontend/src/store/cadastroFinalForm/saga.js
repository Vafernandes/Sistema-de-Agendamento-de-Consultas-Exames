import { all, takeLatest, put } from 'redux-saga/effects';
import { cadastrarSuccess } from './action';
import { CADASTRO_REQUEST } from './types';
import { api } from '../../service/api';

function* cadastrar(action) {
  console.log(action.payload.dadosCadastrais)
  try {
    
    const { nome, preco, tipo_servico } = action.payload.dadosCadastrais;

    const servico = {
      nome, 
      preco, 
      tipo_servico: tipo_servico.name
    }

    console.log(servico)

    yield api.post('/servicos', servico);

    yield put(cadastrarSuccess(servico));

  } catch (error) {
    console.log(error.message)
  }
}

export default all([
  takeLatest(CADASTRO_REQUEST, cadastrar)
])