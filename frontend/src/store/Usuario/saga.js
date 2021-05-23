import { all, takeLatest, put, call } from 'redux-saga/effects';
import {  
  autenticarSuccess,
  cadastroUsuarioSuccess, 
  logoutUsuarioSuccess
} from './action';
import {
  AUTENTICAR_USUARIO_REQUEST,
    CADASTRO_USUARIO_REQUEST,
    LOGOUT_USUARIO_REQUEST
} from './types';
import { api } from '../../service/api';
import { toastr } from 'react-redux-toastr';

import { setCookie, destroyCookie } from 'nookies';

import Router from 'next/router';


function* cadastrarUsuario(action) {

  try {

    const { nome, email, dataNascimento, cpf, contato, senha } = action.payload.dadosCadastrais;

    const usuario = {
      nome, 
      email, 
      dataNascimento, 
      cpf: cpf.replace(/(\w*).(\w*).(\w*)-(\w*)/, '$1$2$3$4'), 
      contato, 
      senha
    }

    const response = yield api.post('/usuarios', usuario)

    yield put(cadastroUsuarioSuccess(response.data))

    toastr.success('Sucesso', 'Cadastro realizado com sucesso!');

    Router.push('/Login')
  } catch (error) {
    toastr.error('Erro', `${error.message}`);
  }
}

function* autenticar(action) {
  try {
    const { cpf, senha } = action.payload.dadosLogin;

    const login = {
      cpf, 
      senha
    }

    const response = yield api.post('/autenticacao', login);

    yield put(autenticarSuccess(response.data));

    setCookie(undefined, 'clinica.token', response.data.token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/'
    })

    toastr.success('Sucesso', 'Login realizado com sucesso!');

    Router.push('/')
  } catch (error) {
    toastr.error('Erro', `${error.message}`);
  }
}

function* logout() {
  destroyCookie(undefined, 'clinica.token')

  yield put(logoutUsuarioSuccess())

  Router.push('/')

  toastr.warning('Sucesso', 'Logout realizado com sucesso!');
}

export default all([
  takeLatest(CADASTRO_USUARIO_REQUEST, cadastrarUsuario),
  takeLatest(AUTENTICAR_USUARIO_REQUEST, autenticar),
  takeLatest(LOGOUT_USUARIO_REQUEST, logout)
])