import { all, takeLatest, put, call } from 'redux-saga/effects';
import {
    CADASTRAR_DATAS_HORARIOS_REQUEST,
    CADASTRAR_MEDICO_REQUEST, LISTAR_TODOS_MEDICOS_REQUEST,
} from './types';
import { api } from '../../service/api';
import { toastr } from 'react-redux-toastr';
import { cadastrarMedicoSuccess, listarTodosMedicosSuccess } from './action';

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
        const { nome, crm } = action.payload.dadosCadastrais;

        const medico = {
            nome,
            crm,
            datasHorasCadastradas: action.payload.datasHorarios
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




export default all([
    takeLatest(CADASTRAR_MEDICO_REQUEST, cadastrar),
    takeLatest(LISTAR_TODOS_MEDICOS_REQUEST, listarTodosMedicos),
    takeLatest(CADASTRAR_DATAS_HORARIOS_REQUEST, cadastrarDatasHorarios)
])