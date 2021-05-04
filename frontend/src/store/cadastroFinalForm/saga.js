import { all, takeLatest, put } from 'redux-saga/effects';
import { cadastrarSuccess } from './action';
import { CADASTRO_REQUEST } from './types';
import { api } from '../../service/api';
import { listarTodosRequest } from '../Servicos/action';

import {toastr} from 'react-redux-toastr'


function* cadastrar(action) {
  console.log(action.payload.dadosCadastrais)
  try {
    
    const { nome, preco, tipo_servico } = action.payload.dadosCadastrais;

    const servico = {
      nome, 
      preco, 
      tipo_servico: tipo_servico.name
    }

    yield api.post('/servicos', servico);
    yield put(cadastrarSuccess(servico));
    yield put(listarTodosRequest())

    toastr.success('Sucesso', 'Cadastro Realizado com sucesso!');

  } catch (error) {
    console.log(error.message)
    toastr.error('Erro', `${error.message}`);
  }
}

export default all([
  takeLatest(CADASTRO_REQUEST, cadastrar)
])