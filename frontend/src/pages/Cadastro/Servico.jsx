import { Form, Field } from 'react-final-form'
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import Botoes from '../../components/Botoes';
import Tabela from '../../components/Tabela';
import styles from './styles.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { cadastrarRequest, deletar, listaPorId, listarTodosRequest } from '../../store/Servicos/action';
import { listarTodosClinicaRequest } from '../../store/Clinicas/action';

function CadastroServico(props) {

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const [ativarCadastro, setAtivarCadastro] = useState(false)
    const [elementoSelecionado, setElementoSelecionado] = useState(null)

    useEffect(() => {
        dispatch(listarTodosRequest());
        dispatch(listarTodosClinicaRequest())
    }, [])

    const cities = [
        { name: 'Consulta', code: 'C' },
        { name: 'Exame', code: 'E' },
        { name: 'Teste Covid', code: 'TC' },
    ];

    const carregaInformacoesDoServico = (id) => {
        dispatch(listaPorId(id));

        setAtivarCadastro(true);
    }

    const editarExcluir = (linhaCorrente) => {
        return <Botoes botoes={[
            { tipo: 'info', icone: 'pi-pencil', func: () => { carregaInformacoesDoServico(linhaCorrente) } },
            { tipo: 'danger', icone: 'pi-trash', func: () => { dispatch(deletar(linhaCorrente.id)) } }
        ]} />
    }

    const criarServico = (obj) => {
        dispatch(cadastrarRequest(obj));

        setAtivarCadastro(false);
    }

    return (
        <div style={{ padding: '0 50px 50px 50px' }}>

            {
                ativarCadastro ?

                    <div className={styles.cadastroServicoContainer}>
                        <div className={styles.formulario}>
                            <Card>
                                <Form
                                    onSubmit={criarServico}
                                    initialValues={state.servico.servico}
                                    render={({ handleSubmit }) => (
                                        <form onSubmit={handleSubmit}>
                                            <div>
                                                <h2>Dados do serviço</h2>

                                                <div className={styles.inputStyles}>
                                                    <Field
                                                        name="id_clinica"
                                                        render={({ input }) => (
                                                            <span className="p-d-flex p-flex-column">
                                                                <label>Selecione a Clínica para adicionar o serviço</label>
                                                                <Dropdown options={state.clinica.listaDeClinicas} optionLabel="nome" placeholder="Selecione a clínica" {...input} />
                                                            </span>
                                                        )}
                                                    />
                                                </div>

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
                            </Card>
                        </div>
                    </div>

                    :
                    <div>

                        <h1 style={{ margin: '2rem 0 2rem 0' }}>Cadastro de Serviço</h1>

                        <Card style={{ marginBottom: '20px' }}>
                            <Botoes botoes={[
                                { nome: 'Novo', tipo: 'success', icone: 'pi-check', func: () => { setAtivarCadastro(true) } },
                                { nome: 'Excluir', tipo: 'danger', icone: 'pi-trash' }
                            ]} />
                        </Card>

                        <Card>
                            <Tabela
                                lista={state.servico.listaDeServicos}
                                elementoSelecionado={elementoSelecionado}
                                setElementoSelecionado={(e) => setElementoSelecionado(e.value)}
                                id='id'
                                colunas={[
                                    { coluna: 'id', nomeColuna: 'ID' },
                                    { coluna: 'tipo_servico', nomeColuna: 'Tipo de serviço' },
                                    { coluna: 'nome', nomeColuna: 'Nome' },
                                    { coluna: 'preco', nomeColuna: 'Preço' },
                                    { coluna: 'id_clinica', nomeColuna: 'Codigo clínica' },
                                    { acao: editarExcluir }
                                ]}
                            />
                        </Card>
                    </div>
            }
        </div>

    )
}

export default CadastroServico;