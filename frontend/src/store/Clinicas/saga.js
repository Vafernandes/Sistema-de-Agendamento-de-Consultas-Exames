import { all, takeLatest, put, call } from 'redux-saga/effects';
import { cadastrarSuccessClinica, listaPorIdSuccess, listarTodosSuccess } from './action';
import { 
  CADASTRO_CLINICA_REQUEST, 
  DELETAR_CLINICAS_REQUEST, 
  LISTAR_CLINICAS_POR_ID_REQUEST, 
  LISTAR_TODAS_CLINICAS_REQUEST 
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

    console.log(clinica)

    yield api.post('/clinicas', clinica);

    yield put(cadastrarSuccessClinica(clinica));
    yield call(listarTodos);

    toastr.success('Sucesso', 'Cadastro Realizado com sucesso!');

  } catch (error) {
    console.log(error.message)
    toastr.error('Erro', `${error.message}`);
  }
}

function* listarTodos() {
  try {
    const response = yield api.get('/clinicas');

    yield put(listarTodosSuccess(response.data));

  } catch (error) {
    console.log(error.message)
  }
}

function* deletar(action) {
  try {
    const id  = action.payload.id;

    yield api.delete(`/clinicas/deletarClinica/${id}`)

    yield call(listarTodos)
    toastr.success('Sucesso', 'Deletado com sucesso!');
  } catch (error) {
    toastr.error('Erro', `${error.message}`);  }
}

function* carregarInformacoes(action) {
  try {
    const clinica = action.payload.id;

    yield put(listaPorIdSuccess(clinica))
  } catch (error) {
    toastr.error('Erro', `${error.message}`); 
  }
}

export default all([
  takeLatest(CADASTRO_CLINICA_REQUEST, cadastrar),
  takeLatest(LISTAR_TODAS_CLINICAS_REQUEST, listarTodos),
  takeLatest(DELETAR_CLINICAS_REQUEST, deletar),
  takeLatest(LISTAR_CLINICAS_POR_ID_REQUEST, carregarInformacoes)
])