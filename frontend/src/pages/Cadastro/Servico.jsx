import { Form, Field } from 'react-final-form'
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import Botoes from '../../components/Botoes';
import Tabela from '../../components/Tabela';
import { Dialog } from 'primereact/dialog';
import styles from './styles.module.css'

import { connect } from 'react-redux'
import { cadastrarRequest } from '../../store/cadastroFinalForm/action';
import { listarTodosRequest } from '../../store/Servicos/action';

function CadastroServico(props) {
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

    const editarExcluir = (linhaCorrente) => {
        return <Botoes botoes={[
            { tipo: 'info', icone: 'pi-pencil', func: () => { setAtivarCadastro(true) } },
            { tipo: 'danger', icone: 'pi-trash' }
        ]} />
    }

    return (
        <div style={{ padding: '0 50px 50px 50px' }}>
            <h1>Cadastro de Serviço</h1>

            <Card style={{ marginBottom: '20px' }}>
                <Botoes botoes={[
                    { nome: 'Novo', tipo: 'success', icone: 'pi-check', func: () => { setAtivarCadastro(true) } },
                    { nome: 'Excluir', tipo: 'danger', icone: 'pi-trash' }
                ]} />
            </Card>

            <Card>
                <Tabela
                    lista={props.servico}
                    elementoSelecionado={elementoSelecionado}
                    setElementoSelecionado={(e) => setElementoSelecionado(e.value)}
                    id='id'
                    colunas={[
                        { coluna: 'id', nomeColuna: 'ID' },
                        { coluna: 'tipo_servico', nomeColuna: 'Tipo de serviço' },
                        { coluna: 'nome', nomeColuna: 'Nome' },
                        { coluna: 'preco', nomeColuna: 'Preço' },
                        { acao: editarExcluir }
                    ]}
                />
            </Card>

            <Dialog header="Cadastro de serviços" visible={ativarCadastro} onHide={() => setAtivarCadastro(false)} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }} footer={renderFooter}>
                <div className={styles.cadastroServicoContainer}>
                    <div style={{ width: '100%' }}>
                        <Form
                            onSubmit={props.cadastrarRequest}
                            render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
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
                                                    <InputText {...input} />
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
                                                    <InputText {...input} />
                                                </span>
                                            )}
                                        />
                                    </div>

                                    <Botoes botoes={[
                                        { nome: 'Cadastrar', tipo: 'success', icone: 'pi-check' }
                                    ]} />
                                </form>
                            )}
                        />

                    </div>
                </div>
            </Dialog>
        </div>

    )
}

function mapStateToProps(state) {
    return {
        servico: state.servico.listaDeServicos
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CadastroServico)