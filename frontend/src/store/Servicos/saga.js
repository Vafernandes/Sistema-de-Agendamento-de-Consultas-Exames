import { all, takeLatest, put, call } from 'redux-saga/effects';
import { listarTodosSuccess } from './action';
import { DELETAR_REQUEST, LISTAR_TODOS_REQUEST } from './types';
import { api } from '../../service/api';
import { toastr } from 'react-redux-toastr';

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

export default all([
  takeLatest(LISTAR_TODOS_REQUEST, listarTodos),
  takeLatest(DELETAR_REQUEST, deletar)
])