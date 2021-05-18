import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import Botoes from '../../components/Botoes';
import Tabela from '../../components/Tabela';
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { cadastrarMedicoRequest, deletarMedicoRequest, listarTodosMedicosRequest } from '../../store/Medicos/action';
import { MultiSelect } from 'primereact/multiselect';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { listarClinicaPorIdAgendamento, listarTodosRequest } from '../../store/Servicos/action';
import { Dropdown } from 'primereact/dropdown';


export default function Medicos() {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const [ativarCadastro, setAtivarCadastro] = useState(false)
    const [elementoSelecionado, setElementoSelecionado] = useState(null)
    const [horario, setHorario] = useState('');

    const [dadosTabelaDeHorarios, setDadosTabelaDeHorarios] = useState([])
    const [dataHoraSelecionados, setDataHoraSelecionados] = useState('')
    const [incluirHorarioForm, setIncluirHorarioForm] = useState(false)
    const [selecionaClinica, setSelecionaClinica] = useState(null);
    const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState({})

    useEffect(() => {
        dispatch(listarTodosMedicosRequest())
        dispatch(listarTodosRequest())
    }, [])

    useEffect(() => {
        dispatch(listarClinicaPorIdAgendamento(especialidadeSelecionada.id))
    }, [especialidadeSelecionada])

    const editarExcluir = (linhaCorrente) => {
        return <Botoes botoes={[
            { tipo: 'secondary', icone: 'pi-eye', func: () => { } },
            { tipo: 'info', icone: 'pi-pencil', func: () => { carregaInformacoesDaClinica(linhaCorrente) } },
            { tipo: 'danger', icone: 'pi-trash', func: () => { dispatch(deletarMedicoRequest(linhaCorrente.id)) } }
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

    function adicionarDataHoraNaTabela(dados) {

        dados.data.setDate(dados.data.getDate());

        const dataHorarioAdicionado = {
            data: dados.data.toLocaleDateString(),
            hora: dados.hora.join()
        }

        console.log(dataHorarioAdicionado.data)

        setDadosTabelaDeHorarios([...dadosTabelaDeHorarios, dataHorarioAdicionado])

        setIncluirHorarioForm(false)

    }

    function cadastrarMedico(dadosCadastrais) {
        dispatch(cadastrarMedicoRequest(dadosCadastrais, dataHoraSelecionados))

        setAtivarCadastro(false)

        setDadosTabelaDeHorarios([])
    }

    return (
        <div style={{ padding: '0 50px 50px 50px' }}>
            {
                ativarCadastro ?

                    <div className={styles.cadastroServicoContainer}>
                        <div className={styles.formulario}>

                            <Card style={{ margin: '0 0 30px 0' }}>
                                <h2 style={{ marginBottom: '15px' }}>Cadastrar horários</h2>

                                <Botoes botoes={[
                                    {
                                        nome: 'Incluir horários',
                                        tipo: 'rounded p-button-secondary',
                                        icone: 'pi-plus',
                                        func: () => { setIncluirHorarioForm(true) }
                                    }
                                ]} />

                                <DataTable
                                    value={dadosTabelaDeHorarios}
                                    scrollable scrollHeight="200px"
                                    selection={dataHoraSelecionados} onSelectionChange={e => setDataHoraSelecionados(e.value)}
                                >
                                    <Column selectionMode="multiple" style={{ width: '3em' }} />
                                    <Column field="data" header="Data" />
                                    <Column field="hora" header="Hora" />
                                </DataTable>
                            </Card>

                            <Card>
                                <Form
                                    onSubmit={cadastrarMedico}
                                    render={({ handleSubmit }) => (
                                        <form onSubmit={handleSubmit}>

                                            <h2>Dados pessoais</h2>

                                            <div className={styles.inputStyles}>
                                                <Field
                                                    name="especialidade"
                                                    render={({ input }) => (
                                                        <span className="p-d-flex p-flex-column">
                                                            <label>Selecione a especialidade do médico</label>
                                                            <Dropdown
                                                                options={state.servico.listaDeServicos}
                                                                optionLabel="nome"
                                                                onChange={setEspecialidadeSelecionada(input.value)}
                                                                placeholder="Selecione a especialidade"
                                                                {...input}
                                                            />
                                                        </span>
                                                    )}
                                                />
                                            </div>

                                            <div className={styles.inputStyles}>
                                                <Field
                                                    name="clinicaMedico"
                                                    render={({ input }) => (
                                                        <span className="p-d-flex p-flex-column">
                                                            <label>Selecione a Clínica</label>
                                                            <Dropdown
                                                                options={state.servico.clinicasEnderecos}
                                                                optionLabel="nome"
                                                                placeholder="Selecione a(s) clínica(s)"
                                                                {...input}
                                                            />
                                                        </span>
                                                    )}
                                                />
                                            </div>


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

            <Dialog header="Cadastrar Horários" visible={incluirHorarioForm} style={{ width: '50vw' }} onHide={() => setIncluirHorarioForm(false)}>

                <Form
                    onSubmit={adicionarDataHoraNaTabela}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>

                            <div className={styles.containerCadastroHorario}>
                                <div className={styles.inputStyles}>
                                    <Field
                                        name="data"
                                        render={({ input }) => (
                                            <span className="p-d-flex p-flex-column">
                                                <label>Data(s)</label>
                                                <Calendar dateFormat="dd/mm/yy" readOnlyInput {...input} />
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

            </Dialog>

        </div >
    )
}
