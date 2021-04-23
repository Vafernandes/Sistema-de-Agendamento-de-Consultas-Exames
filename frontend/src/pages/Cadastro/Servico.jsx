import { Form, Field } from 'react-final-form'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

export default function CadastroServico(props) {
    const cities = [
        { name: 'Consultas', code: 'C' },
        { name: 'Exames', code: 'E' },
        { name: 'Teste Covid', code: 'TC' },
    ];

    return (
        <div>
            <Form
                onSubmit={dados => console.log(dados)}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <h2>Cadastro de Serviço</h2>

                        <Field
                            name="servico"
                            render={({ input }) => (
                                <span className="p-float-label">
                                    <Dropdown options={cities} optionLabel="name" placeholder="Selecione o serviço" {...input} />
                                </span>
                            )}
                        />

                        <Field
                            name="nome"
                            render={({ input }) => (
                                <span className="p-float-label">
                                    <InputText {...input} />
                                    <label>Nome</label>
                                </span>
                            )}
                        />

                        <Field
                            name="preco"
                            render={({ input }) => (
                                <span className="p-float-label">
                                    <InputText {...input} />
                                    <label>Preço</label>
                                </span>
                            )}
                        />

                        <h2>Lista de Médicos</h2>

                        <Field
                            name="nomeMedico"
                            render={({ input }) => (
                                <span className="p-float-label">
                                    <InputText {...input} />
                                    <label>Nome do Médico(A)</label>
                                </span>
                            )}
                        />

                        <Field
                            name="crm"
                            render={({ input }) => (
                                <span className="p-float-label">
                                    <InputText {...input} />
                                    <label>CRM</label>
                                </span>
                            )}
                        />

                        <h3>Horários disponíveis</h3>

                        <Field
                            name="dataHora"
                            render={({ input }) => (
                                <span className="p-float-label">
                                    <Calendar id="time24" showTime showSeconds {...input}/>
                                    <label>Hora</label>
                                </span>
                            )}
                        />

                        <h2>Lista de Endereços</h2>

                        <Field
                            name="local"
                            render={({ input }) => (
                                <span className="p-float-label">
                                    <InputText {...input} />
                                    <label>Local</label>
                                </span>
                            )}
                        />

                        <Field
                            name="endereco"
                            render={({ input }) => (
                                <span className="p-float-label">
                                    <InputText {...input} />
                                    <label>Endereço</label>
                                </span>
                            )}
                        />

                        <Field
                            name="numero"
                            render={({ input }) => (
                                <span className="p-float-label">
                                    <InputText {...input} />
                                    <label>Número</label>
                                </span>
                            )}
                        />

                        <Button label="Success" className="p-button-success" />
                    </form>
                )}
            />
        </div>
    )
}
