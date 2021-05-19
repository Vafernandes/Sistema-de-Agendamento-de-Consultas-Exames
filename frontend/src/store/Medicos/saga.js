import { all, takeLatest, put, call } from 'redux-saga/effects';
import {
    CADASTRAR_DATAS_HORARIOS_REQUEST,
    CADASTRAR_MEDICO_REQUEST, DELETAR_MEDICO_REQUEST, LISTAR_HORA_DATA_DE_UM_MEDICO_POR_ID_MEDICO_REQUEST, LISTAR_TODOS_MEDICOS_REQUEST,
} from './types';
import { api } from '../../service/api';
import { toastr } from 'react-redux-toastr';
import { cadastrarMedicoSuccess, deletarMedicoSuccess, listarHorarioDataDeUmMedicoPorIdMedicoSuccess, listarTodosMedicosSuccess } from './action';

function* cadastrarDatasHorarios(action) {
    console.log(action.payload.dadosCadastrais)
    console.log(action.payload.datasHorarios)

    try {
        const { hora, data } = action.payload.dadosCadastrais;

        const dataHora = {
            hora,
            data
        }

        yield api.post('/dataHora', dataHora);

        toastr.success('Sucesso', 'Cadastro Realizado com sucesso!');

    } catch (error) {
        toastr.error('Erro', `${error.message}`);
    }
}

function* cadastrar(action) {

    console.log(action.payload.dadosCadastrais)
    console.log(action.payload.datasHorarios)

    try {
        const { nome, crm, clinicaMedico, especialidade } = action.payload.dadosCadastrais;

        const medico = {
            nome,
            crm,
            datasHorasCadastradas: action.payload.datasHorarios,
            id_servico: especialidade.id,
            id_clinica: clinicaMedico.id
        }

        console.log(medico)

        yield api.post('/medicos', medico);

        yield put(cadastrarMedicoSuccess(medico))
        yield call(listarTodosMedicos)

        toastr.success('Sucesso', 'Cadastro Realizado com sucesso!');

    } catch (error) {
        toastr.error('Erro', `${error.message}`);
    }
}

function* listarTodosMedicos() {
    try {

        const response = yield api.get('/medicos');

        yield put(listarTodosMedicosSuccess(response.data))

    } catch (error) {
        toastr.error('Erro', `${error.message}`);
    }
}

function* deletarMedico(action) {

    try {
        const id = action.payload.id;
    
        yield api.delete(`medicos/deletarMedico/${id}`);
        yield put(deletarMedicoSuccess());
        yield call(listarTodosMedicos)

        toastr.success('Sucesso', 'Deletado com sucesso!');

    } catch (error) {
        toastr.error('Erro', `${error.message}`);
    }
}

function* listarHorarioDataDeUmMedicoPorIdMedico(action) {

    try {
      const id = action.payload.id;
  
      const response = yield api.get(`/medicos/listar/horarios/${id}`);
  
      yield put(listarHorarioDataDeUmMedicoPorIdMedicoSuccess(response.data))
  
    } catch (error) {
      toastr.error('Erro', `${error.message}`);
    }
  }

export default all([
    takeLatest(CADASTRAR_MEDICO_REQUEST, cadastrar),
    takeLatest(LISTAR_TODOS_MEDICOS_REQUEST, listarTodosMedicos),
    takeLatest(CADASTRAR_DATAS_HORARIOS_REQUEST, cadastrarDatasHorarios),
    takeLatest(DELETAR_MEDICO_REQUEST, deletarMedico),
    takeLatest(LISTAR_HORA_DATA_DE_UM_MEDICO_POR_ID_MEDICO_REQUEST, listarHorarioDataDeUmMedicoPorIdMedico)
])