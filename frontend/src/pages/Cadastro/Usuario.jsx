import { Form, Field } from 'react-final-form'
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';

import { Card } from 'primereact/card';
import Botoes from '../../components/Botoes';
import styles from './styles.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { cadastroUsuarioRequest } from '../../store/Usuario/action';
import Router from 'next/router';

function Usuario(props) {

    const state = useSelector(state => state);
    const dispatch = useDispatch();


    function cadastroUsuario(dadosCadastro) {
        dispatch(cadastroUsuarioRequest(dadosCadastro))

        
    }

    return (
        <div style={{ padding: '0 50px 50px 50px' }}>
            <div className={styles.cadastroServicoContainer}>
                <div className={styles.formulario}>
                    <Card>
                        <Form
                            onSubmit={cadastroUsuario}
                            initialValues={state.servico.servico}
                            render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <h2>Criar conta</h2>

                                        <div className={styles.inputStyles}>
                                            <Field
                                                name="nome"
                                                render={({ input }) => (
                                                    <span className="p-d-flex p-flex-column">
                                                        <label>Nome completo</label>
                                                        <InputText {...input} />
                                                    </span>
                                                )}
                                            />
                                        </div>

                                        <div className={styles.inputStyles}>
                                            <Field
                                                name="dataNascimento"
                                                render={({ input }) => (
                                                    <span className="p-d-flex p-flex-column">
                                                        <label>Data nascimento</label>
                                                        <Calendar dateFormat="dd/mm/yy" monthNavigator yearNavigator yearRange="1920:2021" {...input} />
                                                    </span>
                                                )}
                                            />
                                        </div>

                                        <div className={styles.inputStyles}>
                                            <Field
                                                name="cpf"
                                                render={({ input }) => (
                                                    <span className="p-d-flex p-flex-column">
                                                        <label>CPF</label>
                                                        <InputMask mask="999.999.999-99" {...input}/>

                                                    </span>
                                                )}
                                            />
                                        </div>

                                        <div className={styles.inputStyles}>
                                            <Field
                                                name="email"
                                                render={({ input }) => (
                                                    <span className="p-d-flex p-flex-column">
                                                        <label>Email</label>
                                                        <InputText {...input} />
                                                    </span>
                                                )}
                                            />
                                        </div>

                                        <div className={styles.inputStyles}>
                                            <Field
                                                name="contato"
                                                render={({ input }) => (
                                                    <span className="p-d-flex p-flex-column">
                                                        <label>Contato</label>
                                                        <InputMask mask="(99) 99999-9999" {...input}/>

                                                    </span>
                                                )}
                                            />
                                        </div>
                                        <div className={styles.inputStyles}>
                                            <Field
                                                name="senha"
                                                render={({ input }) => (
                                                    <span className="p-d-flex p-flex-column">
                                                        <label>Senha</label>
                                                        <Password {...input} />
                                                    </span>
                                                )}
                                            />
                                        </div>
                                        
                                    </div>

                                    <div className={styles.butaoFormulario}>
                                        <Botoes botoes={[
                                            { nome: 'Realizar Cadastro', tipo: 'success', icone: 'pi-check', submit: 'submit' }
                                        ]} />
                                    </div>


                                </form>
                            )}
                        />
                    </Card>
                </div>
            </div>
        </div>

    )
}

export default Usuario;