import { Form, Field } from 'react-final-form'
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import {Checkbox} from 'primereact/checkbox';
import { MultiSelect } from 'primereact/multiselect';

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

    const [selecionaClinica, setSelecionaClinica] = useState(null);
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
                                                <h2>Dados do servi??o</h2>

                                                <div className={styles.inputStyles}>
                                                    <Field
                                                        name="clinicas"
                                                        render={({ input }) => (
                                                            <span className="p-d-flex p-flex-column">
                                                                <label>Selecione a Cl??nica para adicionar o servi??o</label>
                                                                <MultiSelect 
                                                                    value={selecionaClinica} 
                                                                    options={state.clinica.listaDeClinicas} 
                                                                    onChange={(e) => setSelecionaClinica(e.value)} 
                                                                    optionLabel="nome" 
                                                                    placeholder="Selecione a(s) cl??nica(s)" 
                                                                    {...input}
                                                                />                                                               
                                                            </span>
                                                        )}
                                                    />
                                                </div>

                                                <div className={styles.inputStyles}>
                                                    <Field
                                                        name="tipo_servico"
                                                        render={({ input }) => (
                                                            <span className="p-d-flex p-flex-column">
                                                                <label>Tipos de servi??o</label>
                                                                <Dropdown options={cities} optionLabel="name" placeholder="Selecione o servi??o" {...input} />
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
                                                                <InputText placeholder="Ex: Jo??o da Silva" {...input} />
                                                            </span>
                                                        )}
                                                    />
                                                </div>

                                                <div className={styles.inputStyles}>
                                                    <Field
                                                        name="preco"
                                                        render={({ input }) => (
                                                            <span className="p-d-flex p-flex-column">
                                                                <label>Pre??o</label>
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

                        <h1 style={{ margin: '2rem 0 2rem 0' }}>Cadastro de Servi??o</h1>

                        <Card style={{ marginBottom: '20px' }}>
                            <Botoes botoes={[
                                { nome: 'Novo', tipo: 'success', icone: 'pi-check', func: () => { setAtivarCadastro(true) } },
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
                                    { coluna: 'tipo_servico', nomeColuna: 'Tipo de servi??o' },
                                    { coluna: 'nome', nomeColuna: 'Nome' },
                                    { coluna: 'preco', nomeColuna: 'Pre??o' },
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