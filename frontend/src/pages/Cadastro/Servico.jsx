import { Form, Field } from 'react-final-form'
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { useState } from 'react';
import Botoes from '../../components/Botoes';
import Tabela from '../../components/Tabela';
import { Dialog } from 'primereact/dialog';
import { SelectButton } from 'primereact/selectbutton';
import styles from './styles.module.css'

export default function CadastroServico(props) {
    const [ativarCadastro, setAtivarCadastro] = useState(false)
    const [elementoSelecionado, setElementoSelecionado] = useState(null)

    const cities = [
        { name: 'Consultas', code: 'C' },
        { name: 'Exames', code: 'E' },
        { name: 'Teste Covid', code: 'TC' },
    ];

    const medicos = [
        { nome: 'Fulano', crm: '1234564' },
        { nome: 'Beltrano', crm: '1234564' },
        { nome: 'Ciclano', crm: '1234564' },
    ]


    const renderFooter = () => {
        return (
            <Botoes botoes={[
                { nome: 'Cancelar', tipo: 'text', icone: 'pi-times', func: () => { setAtivarCadastro(false) } },
            ]} />
        );
    }

    return (
        <div style={{ padding: '0 50px 50px 50px' }}>
            <h1>Cadastro de Serviço</h1>

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

            <Dialog header="Cadastro de serviços" visible={ativarCadastro} onHide={() => setAtivarCadastro(false)} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }} footer={renderFooter}>
                <div className={styles.cadastroServicoContainer}>
                    <div style={{ width: '100%' }}>
                        <Form
                            onSubmit={dados => console.log(dados)}
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
