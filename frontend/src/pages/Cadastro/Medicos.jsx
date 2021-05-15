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
import { cadastrarMedicoRequest, listarTodosMedicosRequest } from '../../store/Medicos/action';

export default function Medicos() {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const [ativarCadastro, setAtivarCadastro] = useState(false)
    const [elementoSelecionado, setElementoSelecionado] = useState(null)

    useEffect(() => {
        dispatch(listarTodosMedicosRequest())
    }, [])

    console.log(state.medico)

    const paymentOptions = [
        { name: '07:30', value: 1 },
        { name: '08:00', value: 2 },
        { name: '08:30', value: 3 },
        { name: '08:30', value: 4 },
        { name: '09:00', value: 5 },
        { name: '09:30', value: 6 },
        { name: '10:00', value: 7 },
        { name: '10:30', value: 8 },
        { name: '11:00', value: 9 },
        { name: '11:30', value: 10 },
        { name: '13:00', value: 11 },
        { name: '13:30', value: 12 },
        { name: '14:00', value: 13 },
        { name: '14:30', value: 14 },
        { name: '15:00', value: 15 },
        { name: '15:30', value: 16 },
        { name: '16:00', value: 17 },
        { name: '16:30', value: 18 },
        { name: '17:00', value: 19 },
    ];

    const renderFooter = () => {
        return (
            <Botoes botoes={[
                { nome: 'Cancelar', tipo: 'text', icone: 'pi-times', func: () => { setAtivarCadastro(false) } },
            ]} />
        );
    }

    return (
        <div style={{ padding: '0 50px 50px 50px' }}>
            {
                ativarCadastro ?

                    <div className={styles.cadastroServicoContainer}>
                        <div className={styles.formulario}>
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


                                        <h3>Horários de atendimento</h3>

                                        <div className={styles.inputStyles}>
                                            <Field
                                                name="horarios_atendimento"
                                                render={({ input }) => (
                                                    <span className="p-d-flex p-flex-column">
                                                        <SelectButton options={paymentOptions} optionLabel="name" multiple {...input} />
                                                    </span>
                                                )}
                                            />
                                        </div>
                                        <div className={styles.inputStyles}>
                                            <Field
                                                name="datas_atendimento"
                                                render={({ input }) => (
                                                    <span className="p-d-flex p-flex-column">
                                                        <label>Datas de atendimento</label>
                                                        <Calendar dateFormat="dd/mm/yy" selectionMode="multiple" {...input} />
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
                                    { coluna: 'crm', nomeColuna: 'CRM' }
                                ]}
                            />
                        </Card>
                    </div>
            }

        </div >
    )
}
