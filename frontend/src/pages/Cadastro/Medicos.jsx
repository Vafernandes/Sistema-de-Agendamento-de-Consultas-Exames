import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { Field, Form } from 'react-final-form';
import Botoes from '../../components/Botoes';
import Tabela from '../../components/Tabela';
import { Dialog } from 'primereact/dialog';
import { SelectButton } from 'primereact/selectbutton';
import styles from './styles.module.css'

export default function Medicos() {

    const [ativarCadastro, setAtivarCadastro] = useState(false)
    const [elementoSelecionado, setElementoSelecionado] = useState(null)

    const medicos = [
        { nome: 'Fulano', crm: '1234564' },
        { nome: 'Beltrano', crm: '1234564' },
        { nome: 'Ciclano', crm: '1234564' },
    ]

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
                    lista={medicos}
                    elementoSelecionado={elementoSelecionado}
                    setElementoSelecionado={(e) => setElementoSelecionado(e.value)}
                    id='nome'
                    colunas={[
                        { coluna: 'nome', nomeColuna: 'Nome' },
                        { coluna: 'crm', nomeColuna: 'CRM' }
                    ]}
                />
            </Card>

            <Dialog header="Cadastro de médicos" visible={ativarCadastro} onHide={() => setAtivarCadastro(false)} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }} footer={renderFooter}>
                <div className={styles.cadastroServicoContainer}>
                    <div style={{ width: '100%' }}>
                        <Form
                            onSubmit={dados => console.log(dados)}
                            render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                    <h2>Dados pessoais</h2>

                                    <div className={styles.inputStyles}>
                                        <Field
                                            name="nomeMedico"
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
                                            name="hora"
                                            render={({ input }) => (
                                                <span className="p-d-flex p-flex-column">
                                                    <SelectButton options={paymentOptions} optionLabel="name" multiple {...input} />
                                                </span>
                                            )}
                                        />
                                    </div>
                                    <div className={styles.inputStyles}>
                                        <Field
                                            name="dataHora"
                                            render={({ input }) => (
                                                <span className="p-d-flex p-flex-column">
                                                    <label>Datas de atendimento</label>
                                                    <Calendar {...input} />
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
        </div >
    )
}
