import { Form, Field } from 'react-final-form'
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';

import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import Botoes from '../../components/Botoes';
import Tabela from '../../components/Tabela';
import styles from './styles.module.scss';

import { useDispatch, useSelector } from 'react-redux'
import { 
    atualizaClinicaRequest, 
    cadastrarRequestClinica, 
    deletarClinica, 
    listaClinicaPorId,
    listarTodosClinicaRequest
} from '../../store/Clinicas/action';

function CadastroClinicas(props) {

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const [ativarCadastro, setAtivarCadastro] = useState(false)
    const [elementoSelecionado, setElementoSelecionado] = useState(null)

    useEffect(() => {
        dispatch(listarTodosClinicaRequest());
    }, [])

    const carregaInformacoesDaClinica = (id) => {
        dispatch(listaClinicaPorId(id));

        setAtivarCadastro(true);
    }

    const editarExcluir = (linhaCorrente) => {
        return <Botoes botoes={[
            { tipo: 'info', icone: 'pi-pencil', func: () => { carregaInformacoesDaClinica(linhaCorrente) } },
            { tipo: 'danger', icone: 'pi-trash', func: () => { dispatch(deletarClinica(linhaCorrente.id)) } }
        ]} />
    }

    const criaClinica = (obj) => {
        dispatch(cadastrarRequestClinica(obj));

        setAtivarCadastro(false);
    }

    const atualizarClinica = (obj) => {
        dispatch(atualizaClinicaRequest(obj));

        setAtivarCadastro(false);
    }

    return (
        <div style={{ padding: '0 50px 50px 50px' }}>

            {
                ativarCadastro ?

                    <div className={styles.cadastroServicoContainer}>
                        <div className={styles.formulario}>
                            <Form
                                onSubmit={state.clinica.clinica.id !== "" ? atualizarClinica : criaClinica}
                                initialValues={state.clinica.clinica}
                                render={({ handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <h2>Dados da clínica</h2>

                                            <div className={styles.inputStyles}>
                                                <Field
                                                    name="nome"
                                                    render={({ input }) => (
                                                        <span className="p-d-flex p-flex-column">
                                                            <label>Nome/Local</label>
                                                            <InputText {...input} />
                                                        </span>
                                                    )}
                                                />
                                            </div>

                                            <div className={styles.inputStyles}>
                                                <Field
                                                    name="logradouro"
                                                    render={({ input }) => (
                                                        <span className="p-d-flex p-flex-column">
                                                            <label>Logradouro</label>
                                                            <InputText  {...input} />
                                                        </span>
                                                    )}
                                                />
                                            </div>

                                            <div className={styles.inputStyles}>
                                                <Field
                                                    name="numero"
                                                    render={({ input }) => (
                                                        <span className="p-d-flex p-flex-column">
                                                            <label>Número</label>
                                                            <InputText {...input} />
                                                        </span>
                                                    )}
                                                />
                                            </div>

                                            <div className={styles.inputStyles}>
                                                <Field
                                                    name="complemento"
                                                    render={({ input }) => (
                                                        <span className="p-d-flex p-flex-column">
                                                            <label>Complemento</label>
                                                            <InputText  {...input} />
                                                        </span>
                                                    )}
                                                />
                                            </div>

                                            <div className={styles.inputStyles}>
                                                <Field
                                                    name="bairro"
                                                    render={({ input }) => (
                                                        <span className="p-d-flex p-flex-column">
                                                            <label>Bairro</label>
                                                            <InputText  {...input} />
                                                        </span>
                                                    )}
                                                />
                                            </div>

                                            <div className={styles.inputStyles}>
                                                <Field
                                                    name="cep"
                                                    render={({ input }) => (
                                                        <span className="p-d-flex p-flex-column">
                                                            <label>CEP</label>
                                                            <InputMask mask="99999-999" {...input}/>
                                                        </span>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.butaoFormulario}>
                                            <Botoes botoes={[
                                                { nome: 'Cadastrar', tipo: 'success', icone: 'pi-check', submit: 'submit' }
                                            ]} />
                                        </div>


                                    </form>
                                )}
                            />

                            <Botoes botoes={[
                                { nome: 'Voltar', tipo: 'outlined', icone: 'pi-arrow-left', submit: 'submit', func: () => { setAtivarCadastro(false) } }
                            ]} />

                        </div>
                    </div>

                    :
                    <div>

                        <h1 style={{ margin: '2rem 0 2rem 0' }}>Cadastro de Clínicas</h1>

                        <Card style={{ marginBottom: '20px' }}>
                            <Botoes botoes={[
                                { nome: 'Novo', tipo: 'success', icone: 'pi-check', func: () => { setAtivarCadastro(true) } },
                            ]} />
                        </Card>

                        <Card>
                            <Tabela
                                lista={state.clinica.listaDeClinicas}
                                elementoSelecionado={elementoSelecionado}
                                setElementoSelecionado={(e) => setElementoSelecionado(e.value)}
                                id='id'
                                colunas={[
                                    { coluna: 'id', nomeColuna: 'ID' },
                                    { coluna: 'nome', nomeColuna: 'Nome/Local' },
                                    { coluna: 'endereco.logradouro', nomeColuna: 'Logradouro' },
                                    { coluna: 'endereco.numero', nomeColuna: 'Número' },
                                    { coluna: 'endereco.complemento', nomeColuna: 'Complemento' },
                                    { coluna: 'endereco.bairro', nomeColuna: 'Bairro' },
                                    { coluna: 'endereco.cep', nomeColuna: 'CEP' },
                                    { acao: editarExcluir }
                                ]}
                            />
                        </Card>
                    </div>
            }
        </div>

    )
}

export default CadastroClinicas;