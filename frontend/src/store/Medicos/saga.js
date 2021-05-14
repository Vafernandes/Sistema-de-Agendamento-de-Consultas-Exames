import { all, takeLatest, put, call } from 'redux-saga/effects';
import {
    CADASTRAR_MEDICO_REQUEST,
} from './types';
import { api } from '../../service/api';
import { toastr } from 'react-redux-toastr';
import { cadastrarMedicoSuccess } from './action';


function* cadastrar(action) {
    
    try {
        const { nome, crm, horarios_atendimento, datas_atendimento } = action.payload.dadosCadastrais;

        const horasParaString = horarios_atendimento.toString();
        const datasParaString = datas_atendimento.toString();

        const medico = {
            nome, 
            crm, 
            horarios_atendimento: horasParaString, 
            datas_atendimento: datasParaString
        }

        yield api.post('/medicos', medico);

        yield put(cadastrarMedicoSuccess(medico))

        toastr.success('Sucesso', 'Cadastro Realizado com sucesso!');

    } catch (error) {
        toastr.error('Erro', `${error.message}`);
    }
}


export default all([
    takeLatest(CADASTRAR_MEDICO_REQUEST, cadastrar),
])