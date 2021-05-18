import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import Botoes from '../../components/Botoes';
import Tabela from '../../components/Tabela';
import { SelectButton } from 'primereact/selectbutton';
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { cadastrarDatasHorariosRequest, cadastrarMedicoRequest, listarTodosMedicosRequest } from '../../store/Medicos/action';
import { useRouter } from 'next/router'
import { MultiSelect } from 'primereact/multiselect';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export default function Medicos() {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const [ativarCadastro, setAtivarCadastro] = useState(false)
    const [elementoSelecionado, setElementoSelecionado] = useState(null)
    const [horario, setHorario] = useState('');

    const [dadosTabelaDeHorarios, setDadosTabelaDeHorarios] = useState([])

    const router = useRouter()

    useEffect(() => {
        dispatch(listarTodosMedicosRequest())
    }, [])

    const editarExcluir = (linhaCorrente) => {
        return <Botoes botoes={[
            { tipo: 'secondary', icone: 'pi-eye', func: () => { router.push('/Cadastro/HorariosDatasMedicos') } },
            { tipo: 'info', icone: 'pi-pencil', func: () => { carregaInformacoesDaClinica(linhaCorrente) } },
            { tipo: 'danger', icone: 'pi-trash', func: () => { dispatch(deletarClinica(linhaCorrente.id)) } }
        ]} />
    }

    const horarios = [
         '07:30',
         '08:00',
         '08:30',
         '09:00',
         '09:30',
         '10:00',
         '10:30',
         '11:00',
         '11:30',
         '12:00',
         '12:30',
         '13:00',
         '13:30',
         '14:00',
         '14:30',
         '15:00',
         '15:30',
         '16:00',
         '16:30',
         '17:00',
         '17:30',
    ];
    
    const products = [
        { code: 1, name: 'prod 1', category: 'product category', quantity: 2},
        { code: 1, name: 'prod 1', category: 'product category', quantity: 2},
        { code: 1, name: 'prod 1', category: 'product category', quantity: 2},
        { code: 1, name: 'prod 1', category: 'product category', quantity: 2},
        { code: 1, name: 'prod 1', category: 'product category', quantity: 2},
        { code: 1, name: 'prod 1', category: 'product category', quantity: 2},
        { code: 1, name: 'prod 1', category: 'product category', quantity: 2},
        { code: 1, name: 'prod 1', category: 'product category', quantity: 2},
        { code: 1, name: 'prod 1', category: 'product category', quantity: 2},
        { code: 1, name: 'prod 1', category: 'product category', quantity: 2},
        { code: 1, name: 'prod 1', category: 'product category', quantity: 2},
        { code: 1, name: 'prod 1', category: 'product category', quantity: 2},
        { code: 1, name: 'prod 1', category: 'product category', quantity: 2},
        { code: 1, name: 'prod 1', category: 'product category', quantity: 2},
        { code: 1, name: 'prod 1', category: 'product category', quantity: 2},
        { code: 1, name: 'prod 1', category: 'product category', quantity: 2},
        { code: 1, name: 'prod 1', category: 'product category', quantity: 2},
        { code: 1, name: 'prod 1', category: 'product category', quantity: 2},
    ]

    function adicionarDataHoraNaTabela(dados) {
        const dataHorarioAdicionado = dados

        setDadosTabelaDeHorarios([...dadosTabelaDeHorarios, dataHorarioAdicionado])

        // dadosTabelaDeHorarios.map(obj => {
        //     console.log(obj)
        // })
    }

    // console.log(dadosTabelaDeHorarios.map(horariosData => {
    //     console.log(horariosData.data)
    // }))

    console.log(dadosTabelaDeHorarios)

    return (
        <div style={{ padding: '0 50px 50px 50px' }}>
            {
                ativarCadastro ?

                    <div className={styles.cadastroServicoContainer}>
                        <div className={styles.formulario}>
                            <Card style={{ margin: '0 0 30px 0' }}>
                                <Form
                                    onSubmit={adicionarDataHoraNaTabela}
                                    render={({ handleSubmit }) => (
                                        <form onSubmit={handleSubmit}>

                                            <h2>Cadastrar Horários</h2>
                                            <div className={styles.containerCadastroHorario}>
                                                <div className={styles.inputStyles}>
                                                    <Field
                                                        name="data"
                                                        render={({ input }) => (
                                                            <span className="p-d-flex p-flex-column">
                                                                <label>Data(s)</label>
                                                                <Calendar id="multiple" selectionMode="multiple" readOnlyInput {...input} />
                                                            </span>
                                                        )}
                                                    />
                                                </div>

                                                <div className={styles.inputStyles}>
                                                    <Field
                                                        name="hora"
                                                        render={({ input }) => (
                                                            <span className="p-d-flex p-flex-column">
                                                                <label>Horário(s)</label>
                                                                <MultiSelect value={horario} options={horarios} onChange={(e) => setHorario(e.value)} {...input} />
                                                            </span>
                                                        )}
                                                    />
                                                </div>

                                                <div className={styles.butaoFormulario}>
                                                    <Botoes botoes={[
                                                        { tipo: 'rounded p-button-success', icone: 'pi-plus', submit: 'submit' }
                                                    ]} />
                                                </div>
                                            </div>

                                        </form>
                                    )}
                                />
                            </Card>

                            <DataTable value={dadosTabelaDeHorarios} scrollable scrollHeight="200px">
                                <Column field="data" header="Data"></Column>
                                <Column field="hora" header="Hora"></Column>
                            </DataTable>

                            <Card>
                                <Form
                                    onSubmit={dadosCadastrais => dispatch(cadastrarMedicoRequest(dadosCadastrais))}
                                    render={({ handleSubmit }) => (
                                        <form onSubmit={handleSubmit}>

                                            <h2>Dados pessoais</h2>

                                            <div className={styles.inputStyles}>
                                                <Field
                                                    name="nome"
                                                    render={({ input }) => (
                                                        <span className="p-d-flex p-flex-column">
                                                            <label>Nome do Médico(a)</label>
                                                            <InputText {...input} />
                                                        </span>
                                                    )}
                                                />
                                            </div>

                                            <div className={styles.inputStyles}>
                                                <Field
                                                    name="crm"
                                                    render={({ input }) => (
                                                        <span className="p-d-flex p-flex-column">
                                                            <label>CRM</label>
                                                            <InputText {...input} />
                                                        </span>
                                                    )}
                                                />
                                            </div>

                                            <div className={styles.butaoFormulario}>
                                                <Botoes botoes={[
                                                    { nome: 'Cadastrar', tipo: 'success', icone: 'pi-check', submit: 'submit' }
                                                ]} />
                                            </div>

                                        </form>
                                    )}
                                />
                            </Card>
                            <Botoes botoes={[
                                { nome: 'Voltar', tipo: 'outlined', icone: 'pi-arrow-left', submit: 'submit', func: () => { setAtivarCadastro(false) } }
                            ]} />
                        </div>
                    </div>

                    :

                    <div>
                        <h1>Cadastro de Médicos</h1>

                        <Card style={{ marginBottom: '20px' }}>
                            <Botoes botoes={[
                                { nome: 'Novo', tipo: 'success', icone: 'pi-check', func: () => { setAtivarCadastro(true) } },
                                { nome: 'Editar', tipo: 'info', icone: 'pi-pencil', func: () => { setAtivarCadastro(true) } },
                                { nome: 'Excluir', tipo: 'danger', icone: 'pi-trash' }
                            ]} />
                        </Card>

                        <Card>
                            <Tabela
                                lista={state.medico.listaMedicos}
                                elementoSelecionado={elementoSelecionado}
                                setElementoSelecionado={(e) => setElementoSelecionado(e.value)}
                                id='nome'
                                colunas={[
                                    { coluna: 'nome', nomeColuna: 'Nome' },
                                    { coluna: 'crm', nomeColuna: 'CRM' },
                                    { acao: editarExcluir }
                                ]}
                            />
                        </Card>
                    </div>
            }

        </div >
    )
}
