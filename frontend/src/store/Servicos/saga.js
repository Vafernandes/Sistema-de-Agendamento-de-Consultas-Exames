import { all, takeLatest, put, call } from 'redux-saga/effects';
import { cadastrarSuccess, limparDadosServico, listaPorIdSuccess, listarTodosSuccess } from './action';
import { CADASTRO_REQUEST, DELETAR_REQUEST, LISTAR_POR_ID_REQUEST, LISTAR_TODOS_REQUEST, LISTA_CLINICA_POR_ID_AGENDAMENTO } from './types';
import { api } from '../../service/api';
import { toastr } from 'react-redux-toastr';


function* cadastrar(action) {
  try {
    
    const { nome, preco, tipo_servico, clinicas } = action.payload.dadosCadastrais;

    const servico = {
      nome, 
      preco, 
      tipo_servico: tipo_servico.name,
      clinicas
    }

    yield api.post('/servicos', servico);

    yield put(cadastrarSuccess(servico));
    yield call(listarTodos);
    yield put(limparDadosServico())

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
  console.log(action.payload.id)
  
  try {
    const servico = action.payload.id;

    yield put(listaPorIdSuccess(servico))
  } catch (error) {
    toastr.error('Erro', `${error.message}`); 
  }
}

function* listarPorIdAgendamento(action) {
  console.log(action.payload.id)
  try {
    const id = action.payload.id;

    const response = yield api.get(`/servicos/listar/clinicasServico/${id}`);

    yield put(listaClinicaPorIdSuccess(response.data))
  } catch (error) {
    toastr.error('Erro', `${error.message}`);
  }
}


export default all([
  takeLatest(CADASTRO_REQUEST, cadastrar),
  takeLatest(LISTAR_TODOS_REQUEST, listarTodos),
  takeLatest(DELETAR_REQUEST, deletar),
  takeLatest(LISTAR_POR_ID_REQUEST, carregarInformacoes),
  takeLatest(LISTA_CLINICA_POR_ID_AGENDAMENTO, listarPorIdAgendamento)
])