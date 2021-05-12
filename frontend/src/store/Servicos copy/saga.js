import { all, takeLatest, put } from 'redux-saga/effects';
import { cadastrarSuccess } from './action';
import { CADASTRO_REQUEST } from './types';
import { api } from '../../service/api';

import {toastr} from 'react-redux-toastr'


function* cadastrar(action) {

  try {
    
    const { nome, logradouro, numero, complemento, bairro, cep } = action.payload.dadosCadastrais;

    const clinica = {
      nome, 
      logradouro,
      numero,
      complemento,
      bairro,
      cep: cep.replace(/(\d*)-(\d*)/, '$1$2')
    }

    console.log(clinica)

    yield api.post('/clinicas', clinica);
    yield put(cadastrarSuccess(clinica));

    toastr.success('Sucesso', 'Cadastro Realizado com sucesso!');

  } catch (error) {
    console.log(error.message)
    toastr.error('Erro', `${error.message}`);
  }
}

export default all([
  takeLatest(CADASTRO_REQUEST, cadastrar)
])