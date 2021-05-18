import { Calendar } from 'primereact/calendar';
import { useEffect, useState } from "react";
import { addLocale } from 'primereact/api';
import { api } from '../../service/api';
import EnderecosCards from '../../components/EnderecosCards';
import { useRouter } from 'next/router'
import Botoes from '../../components/Botoes';
import { useDispatch, useSelector } from 'react-redux';
import { listarClinicaPorIdAgendamento } from '../../store/Servicos/action';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { listarMedicosDeUmaClinicaPorIdClinicaRequest } from '../../store/Clinicas/action';



export default function Agendamento(props) {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const [dataAgendamento, setDataAgendamento] = useState(null);
    const nextRouter = useRouter()

    const [horario, setHorario] = useState('');
    const [endereco, setEndereco] = useState('');
    const [medico, setMedico] = useState('');

    const [displayResponsive, setDisplayResponsive] = useState(false);

    useEffect(() => {
        dispatch(listarClinicaPorIdAgendamento(props.servico.id))
    }, []);

    useEffect(() => {
        dispatch(listarMedicosDeUmaClinicaPorIdClinicaRequest(endereco.id))
    }, [endereco])

    const handleAgendamento = (e) => {
        e.preventDefault()
        const agendamento = {
            id_servico: nextRouter.query.id_servico,
            data: dataAgendamento
        }

        console.log(agendamento)

        api.post('agendamentos', agendamento)

    }

    addLocale('pt', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'sgunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
        dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        monthNames: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
        monthNamesShort: ['jan', 'feb', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
        today: 'Hoje',
        clear: 'Claro'
    });

    const cities = [
        { name: '08:30', code: '1' },
        { name: '10:00', code: '2' },
        { name: '11:30', code: '3' },
        { name: '13:00', code: '4' },
        { name: '14:00', code: '5' }
    ];

    return (
        <div className="p-d-flex p-flex-column" >

            <div className="p-d-flex p-as-center p-flex-column" style={{ padding: '10px' }}>
                <div className="p-mr-2 p-as-center">
                    <h1 style={{ margin: '15px 0 15px' }}>{props.servico.nome}</h1>
                </div>
            </div>

            <div className="p-d-flex p-jc-center p-flex-row p-flex-wrap">

                <div className="p-d-flex p-flex-column p-mr-6" style={{ width: '20rem' }}>
                    <h4>Selecione um endereço</h4>

                    <Dropdown 
                        style={{ margin: '20px 0 20px' }} 
                        value={endereco} 
                        options={state.servico.clinicasEnderecos} 
                        onChange={e => setEndereco(e.target.value)} 
                        optionLabel="nome" 
                        placeholder="Endereços" 
                    />

                    <h4>Selecione um médico</h4>

                    <Dropdown 
                        style={{ margin: '20px 0 20px' }} 
                        value={medico} 
                        options={state.clinica.medicosDeUmaClinica} 
                        onChange={e => setMedico(e.target.value)} 
                        optionLabel="nome" 
                        placeholder="Medicos" 
                    />

                    <h4>Selecione um horário</h4>

                    <Dropdown 
                        style={{ margin: '20px 0 20px' }} 
                        value={horario} options={cities} 
                        onChange={e => setHorario(e.target.value)} 
                        optionLabel="name" 
                        placeholder="Horários" 
                    />
                </div>
                <div className="p-mr-6">
                    <h4>Selecione uma data</h4>
                    <Calendar
                        style={{ margin: '20px 0 20px' }}
                        id="disableddays"
                        inline dateFormat="dd/mm/yy"
                        value={dataAgendamento}
                        onChange={(e) => setDataAgendamento(e.value)}
                        locale="pt"
                        dateFormat="dd/mm/yy"
                        disabledDays={[1, 0]}
                        readOnlyInput
                    />
                </div>
                {/* <div className="p-mr-6">
                        <h4>Clínicas disponíveis</h4>

                        <EnderecosCards enderecosCards={[
                            { local: `${state.clinica.clinica.nome}`, rua: `${state.clinica.clinica.logradouro}`, numero: `${state.clinica.clinica.numero}` },
                        ]} />

                    </div> */}
            </div>
            <div className="p-d-flex p-as-center p-flex-column" style={{ padding: '10px' }}>
                <div className="p-mr-2 p-as-center">
                    <Botoes botoes={[
                        { nome: 'Continuar', tipo: 'info', func: () => { setDisplayResponsive(true) }, submit: 'submit' }
                    ]} />
                </div>
            </div>

            <Dialog header="Confirmar agendamento" visible={displayResponsive} onHide={() => setDisplayResponsive(false)} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }}>
                <form>

                    <div className="p-d-flex p-flex-column p-mr-6">
                        <Calendar value={dataAgendamento} dateFormat="dd/mm/yy" readOnly showIcon />
                        <InputMask mask="99:99" value={horario.name} readOnly />
                    </div>

                    <div className="p-d-flex p-flex-column p-mr-6">

                        <InputText value={endereco.nome} readOnly />
                    </div>

                    <div>
                        <Botoes botoes={[
                            { nome: 'Confirmar Agendamento', tipo: 'submit', func: () => { }, submit: 'submit' }
                        ]} />
                    </div>
                </form>
            </Dialog>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const idServico = context.params.id_servico;

    const response = await api.get(`servicos/buscaId/${idServico}`);

    const servico = response.data;

    return {
        props: {
            servico
        }
    }
}