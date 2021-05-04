import { all, takeLatest, put } from 'redux-saga/effects';
import { listarTodosSuccess } from './action';
import { LISTAR_TODOS_REQUEST } from './types';
import { api } from '../../service/api';

function* listarTodos() {
  try {
    const response = yield api.get('/servicos');

    yield put(listarTodosSuccess(response.data));

  } catch (error) {
    console.log(error.message)
  }
}

export default all([
  takeLatest(LISTAR_TODOS_REQUEST, listarTodos)
])