import { all, takeLatest, put } from 'redux-saga/effects';
import { cadastrarSuccess } from './action';
import { CADASTRO_REQUEST } from './types';
import { api } from '../../service/api';
import { listarTodosRequest } from '../Servicos/action';

import {toastr} from 'react-redux-toastr'


function* cadastrar(action) {

  try {
    
    const { nome, preco, tipo_servico, logradouro, numero, complemento, bairro, cep } = action.payload.dadosCadastrais;

    const servico = {
      nome, 
      preco, 
      tipo_servico: tipo_servico.name,
      logradouro,
      numero,
      complemento,
      bairro,
      cep: cep.replace(/(\d*)-(\d*)/, '$1$2')
    }

    console.log(servico)

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