import { all, takeLatest, put, call } from 'redux-saga/effects';
import { cadastrarSuccess, listaPorIdSuccess, listarTodosSuccess } from './action';
import { CADASTRO_REQUEST, DELETAR_REQUEST, LISTAR_POR_ID_REQUEST, LISTAR_TODOS_REQUEST } from './types';
import { api } from '../../service/api';
import { toastr } from 'react-redux-toastr';


function* cadastrar(action) {

  try {
    
    const { nome, preco, tipo_servico } = action.payload.dadosCadastrais;

    const servico = {
      nome, 
      preco, 
      tipo_servico: tipo_servico.name,
    }

    yield api.post('/servicos', servico);

    yield put(cadastrarSuccess(servico));
    yield call(listarTodos);

    toastr.success('Sucesso', 'Cadastro Realizado com sucesso!');

  } catch (error) {
    toastr.error('Erro', `${error.message}`);
  }
}

function* listarTodos() {
  try {
    const response = yield api.get('/servicos');

    yield put(listarTodosSuccess(response.data));

  } catch (error) {
    console.log(error.message)
  }
}

function* deletar(action) {
  console.log(action.payload.id)
  try {
    const id  = action.payload.id;

    yield api.delete(`/servicos/deletarServico/${id}`)

    yield call(listarTodos)
    toastr.success('Sucesso', 'Serviço deletado com sucesso!');
  } catch (error) {
    toastr.error('Erro', `${error.message}`);  }
}

function* carregarInformacoes(action) {
  
  try {
    const servico = action.payload.id;

    yield put(listaPorIdSuccess(servico))
  } catch (error) {
    toastr.error('Erro', `${error.message}`); 
  }
}

export default all([
  takeLatest(CADASTRO_REQUEST, cadastrar),
  takeLatest(LISTAR_TODOS_REQUEST, listarTodos),
  takeLatest(DELETAR_REQUEST, deletar),
  takeLatest(LISTAR_POR_ID_REQUEST, carregarInformacoes)
])