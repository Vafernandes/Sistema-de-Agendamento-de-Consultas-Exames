import { all, takeLatest, put, call } from 'redux-saga/effects';
import { 
  atualizaClinicaSuccess, 
  cadastrarSuccessClinica, 
  limparDadosDaClinica, 
  listaClinicaPorIdSuccess, 
  listarMedicosDeUmaClinicaPorIdClinicaSuccess, 
  listarTodosClinicaSuccess 
} from './action';
import {
  ATUALIZA_CLINICA_REQUEST,
  CADASTRO_CLINICA_REQUEST,
  DELETAR_CLINICAS_REQUEST,
  LISTAR_CLINICAS_POR_ID_REQUEST,
  LISTAR_MEDICOS_DE_UMA_CLINICA_POR_ID_CLINICA_REQUEST,
  LISTAR_TODAS_CLINICAS_REQUEST,
  LISTA_CLINICA_POR_ID_AGENDAMENTO
} from './types';
import { api } from '../../service/api';
import { toastr } from 'react-redux-toastr';


function* cadastrar(action) {
  console.log(action.payload)

  try {

    const { nome, logradouro, numero, complemento, bairro, cep } = action.payload.dadosCadastrais;

    const clinica = {
      nome,
      logradouro,
      numero,
      complemento,
      bairro,
      cep: cep.replace(/(\w*)-(\w*)/, '$1$2')
    }

    yield api.post('/clinicas', clinica);

    yield put(cadastrarSuccessClinica(clinica));
    yield call(listarTodasClinicas);

    toastr.success('Sucesso', 'Cadastro Realizado com sucesso!');

  } catch (error) {
    console.log(error.message)
    toastr.error('Erro', `${error.message}`);
  }
}

function* listarTodasClinicas() {
  try {
    const response = yield api.get('/clinicas');

    yield put(listarTodosClinicaSuccess(response.data));

  } catch (error) {
    console.log(error.message)
  }
}

function* deletar(action) {
  try {
    const id = action.payload.id;

    yield api.delete(`/clinicas/deletarClinica/${id}`)

    yield call(listarTodasClinicas)
    toastr.success('Sucesso', 'Deletado com sucesso!');
  } catch (error) {
    toastr.error('Erro', `${error.message}`);
  }
}

function* carregarInformacoes(action) {
  try {
    const clinica = action.payload.id;
    
    yield put(listaClinicaPorIdSuccess(clinica))
  } catch (error) {
    toastr.error('Erro', `${error.message}`);
  }
}

function* atualizarClinica(action) {
  console.log(action.payload.obj)
  try {
    const {
      id,
      nome,
      logradouro,
      numero,
      complemento,
      bairro,
      cep
    } = action.payload.obj

    const clinicaAtualizada = {
      nome,
      logradouro,
      numero,
      complemento,
      bairro,
      cep
    }

    yield api.put(`/clinicas/atualizarClinica/${id}`, clinicaAtualizada);
    
    yield put(atualizaClinicaSuccess());
    yield call(listarTodasClinicas);

    yield put(limparDadosDaClinica());
    
    toastr.success('Sucesso', 'Atualizado com sucesso!');

  } catch (error) {
    toastr.error('Erro', `${error.message}`);
  }
}

function* listarMedicosDeUmaClinicaPorIdClinica(action) {
  console.log(action.payload.id)
  try {
    const id = action.payload.id;

    const response = yield api.get(`/clinicas/medicos/clinicas/${id}`);

    yield put(listarMedicosDeUmaClinicaPorIdClinicaSuccess(response.data))

  } catch (error) {
    toastr.error('Erro', `${error.message}`);
  }
}

export default all([
  takeLatest(CADASTRO_CLINICA_REQUEST, cadastrar),
  takeLatest(LISTAR_TODAS_CLINICAS_REQUEST, listarTodasClinicas),
  takeLatest(DELETAR_CLINICAS_REQUEST, deletar),
  takeLatest(LISTAR_CLINICAS_POR_ID_REQUEST, carregarInformacoes),
  takeLatest(ATUALIZA_CLINICA_REQUEST, atualizarClinica),
  takeLatest(LISTAR_MEDICOS_DE_UMA_CLINICA_POR_ID_CLINICA_REQUEST, listarMedicosDeUmaClinicaPorIdClinica)
])