import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { Field, Form } from 'react-final-form';
import Botoes from '../../components/Botoes';
import Tabela from '../../components/Tabela';
import styles from './styles.module.css'

export default function Medicos() {

    const [ativarCadastro, setAtivarCadastro] = useState(false)
    const [elementoSelecionado, setElementoSelecionado] = useState(null)

    const medicos = [
        { nome: 'Fulano', crm: '1234564' },
        { nome: 'Beltrano', crm: '1234564' },
        { nome: 'Ciclano', crm: '1234564' },
    ]

    return (
        <div style={{ padding: '10px 50px 50px 50px' }}>
            <h1>Cadastro de Médicos</h1>

            {
                ativarCadastro

                    ? <div className={styles.cadastroServicoContainer}>
                        <Card style={{ width: '60%' }}>
                            <Form
                                onSubmit={dados => console.log(dados)}
                                render={({ handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <h2>Dados pessoais</h2>

                                        <Field
                                            name="nomeMedico"
                                            render={({ input }) => (
                                                <span className="p-d-flex p-flex-column">
                                                    <label>Nome do Médico(a)</label>
                                                    <InputText {...input} />
                                                </span>
                                            )}
                                        />

                                        <Field
                                            name="crm"
                                            render={({ input }) => (
                                                <span className="p-d-flex p-flex-column">
                                                    <label>CRM</label>
                                                    <InputText {...input} />
                                                </span>
                                            )}
                                        />

                                        <h3>Horários de atendimento</h3>

                                        <Field
                                            name="dataHora"
                                            render={({ input }) => (
                                                <span className="p-d-flex p-flex-column">
                                                    <label>Hora</label>
                                                    <Calendar id="time24" showTime showSeconds {...input} />
                                                </span>
                                            )}
                                        />

                                        <Botoes botoes={[
                                            { nome: 'Cadastrar', tipo: 'success', icone: 'pi-check' }
                                        ]} />
                                    </form>
                                )}
                            />
                            <Botoes botoes={[
                                { nome: 'Voltar', tipo: 'outlined', icone: 'pi-arrow-left', func: () => setAtivarCadastro(false) }
                            ]} />
                        </Card>
                    </div>

                    : <>
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
                    </>
            }
        </div>
    )
}
