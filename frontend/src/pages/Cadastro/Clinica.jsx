import { Form, Field } from 'react-final-form'
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import Botoes from '../../components/Botoes';
import Tabela from '../../components/Tabela';
import { InputMask } from 'primereact/inputmask';
import styles from './styles.module.scss'

import { connect } from 'react-redux'
import { cadastrarRequest } from '../../store/cadastroFinalForm/action';
import { deletar, listaPorId, listarTodosRequest } from '../../store/Servicos/action';

function CadastroClinica(props) {
    const [ativarCadastro, setAtivarCadastro] = useState(false)
    const [elementoSelecionado, setElementoSelecionado] = useState(null)

    useEffect(() => {
        props.listarTodosRequest()
    }, [])

    const cities = [
        { name: 'Consulta', code: 'C' },
        { name: 'Exame', code: 'E' },
        { name: 'Teste Covid', code: 'TC' },
    ];

    const renderFooter = () => {
        return (
            <Botoes botoes={[
                { nome: 'Cancelar', tipo: 'text', icone: 'pi-times', func: () => { setAtivarCadastro(false) } },
            ]} />
        );
    }

    const carregaInformacoesDoServico = (id) => {
        props.listaPorId(id)

        setAtivarCadastro(true)
    }

    const editarExcluir = (linhaCorrente) => {
        return <Botoes botoes={[
            { tipo: 'info', icone: 'pi-pencil', func: () => { carregaInformacoesDoServico(linhaCorrente) } },
            { tipo: 'danger', icone: 'pi-trash', func: () => { props.deletar(linhaCorrente.id) } }
        ]} />
    }

    const criarServico = (obj) => {
        props.cadastrarRequest(obj);

        setAtivarCadastro(false);
    }

    console.log(props.servico.listaDeServicos)

    return (
        <div style={{ padding: '0 50px 50px 50px' }}>

            {
                ativarCadastro ?

                    <div className={styles.cadastroServicoContainer}>
                        <div className={styles.formulario}>
                            <Form
                                onSubmit={criarServico}
                                initialValues={props.servico.servico}
                                render={({ handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <h2>Dados do serviço</h2>

                                            <div className={styles.inputStyles}>
                                                <Field
                                                    name="tipo_servico"
                                                    render={({ input }) => (
                                                        <span className="p-d-flex p-flex-column">
                                                            <label>Tipos de serviço</label>
                                                            <Dropdown options={cities} optionLabel="name" placeholder="Selecione o serviço" {...input} />
                                                        </span>
                                                    )}
                                                />
                                            </div>

                                            <div className={styles.inputStyles}>
                                                <Field
                                                    name="nome"
                                                    render={({ input }) => (
                                                        <span className="p-d-flex p-flex-column">
                                                            <label>Nome</label>
                                                            <InputText placeholder="Ex: João da Silva" {...input} />
                                                        </span>
                                                    )}
                                                />
                                            </div>

                                            <div className={styles.inputStyles}>
                                                <Field
                                                    name="preco"
                                                    render={({ input }) => (
                                                        <span className="p-d-flex p-flex-column">
                                                            <label>Preço</label>
                                                            <InputText placeholder="Ex: 100.00" {...input} />
                                                        </span>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <h2>Dados do endereço</h2>

                                            <div className={styles.inputStyles}>
                                                <Field
                                                    name="logradouro"
                                                    render={({ input }) => (
                                                        <span className="p-d-flex p-flex-column">
                                                            <label>Logradouro</label>
                                                            <InputText placeholder="Ex: Rua Graciliano Ramos" {...input} />
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
                                                            <InputText placeholder="Ex: 560" {...input} />
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
                                                            <InputText placeholder="Ex: Próximo ao mercado" {...input} />
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
                                                            <InputText placeholder="Ex: Centro" {...input} />
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
                                                            <InputMask mask="99999-999" placeholder="00000-000" {...input}/>
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

                        <h1 style={{ margin: '2rem 0 2rem 0' }}>Cadastro de Clinica</h1>

                        <Card style={{ marginBottom: '20px' }}>
                            <Botoes botoes={[
                                { nome: 'Novo', tipo: 'success', icone: 'pi-check', func: () => { setAtivarCadastro(true) } },
                                { nome: 'Excluir', tipo: 'danger', icone: 'pi-trash' }
                            ]} />
                        </Card>

                        <Card>
                            <Tabela
                                lista={props.servico.listaDeServicos}
                                elementoSelecionado={elementoSelecionado}
                                setElementoSelecionado={(e) => setElementoSelecionado(e.value)}
                                id='id'
                                colunas={[
                                    { coluna: 'id', nomeColuna: 'ID' },
                                    { coluna: 'tipo_servico', nomeColuna: 'Tipo de serviço' },
                                    { coluna: 'nome', nomeColuna: 'Nome' },
                                    { coluna: 'preco', nomeColuna: 'Preço' },
                                    { coluna: 'endereco.logradouro', nomeColuna: 'Logradouro' },
                                    { coluna: 'endereco.numero', nomeColuna: 'Número' },
                                    { coluna: 'endereco.complemento', nomeColuna: 'Complemento' },
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

function mapStateToProps(state) {
    return {
        servico: state.servico
    }
}

function mapDispatchToProps(dispatch) {
    return {
        cadastrarRequest(dadosCadastrais) {
            const action = cadastrarRequest(dadosCadastrais)
            dispatch(action)
        },
        listarTodosRequest() {
            const action = listarTodosRequest()
            dispatch(action)
        },
        deletar(id) {
            const action = deletar(id)
            dispatch(action)
        },
        listaPorId(id) {
            const action = listaPorId(id)
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CadastroClinica)