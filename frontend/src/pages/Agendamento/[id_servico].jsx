import { Calendar } from 'primereact/calendar';
import { useEffect, useState } from "react";
import { api } from '../../service/api';
import EnderecosCards from '../../components/EnderecosCards';
import { useRouter } from 'next/router'
import Botoes from '../../components/Botoes';
import { useDispatch, useSelector } from 'react-redux';
import { listarClinicaPorIdAgendamento } from '../../store/Servicos/action';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { listarMedicosDeUmaClinicaPorIdClinicaRequest } from '../../store/Clinicas/action';
import { listarHorarioDataDeUmMedicoPorIdMedicoRequest } from '../../store/Medicos/action';
import { cadastroAgendamentoRequest } from '../../store/Agendamento/action';

export default function Agendamento(props) {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const [dataAgendamento, setDataAgendamento] = useState(null);
    const nextRouter = useRouter()

    const [horario, setHorario] = useState('');
    const [endereco, setEndereco] = useState('');
    const [medico, setMedico] = useState('');

    const [displayResponsive, setDisplayResponsive] = useState(false);

    const [horariosDeUmaClinica, setHorariosDeUmaClinica] = useState([])

    useEffect(() => {
        dispatch(listarClinicaPorIdAgendamento(props.servico.id))
    }, []);

    useEffect(() => {
        dispatch(listarMedicosDeUmaClinicaPorIdClinicaRequest(endereco.id))
    }, [endereco])

    useEffect(() => {
        dispatch(listarHorarioDataDeUmMedicoPorIdMedicoRequest(medico.id))
    }, [medico])

    useEffect(() => {
        state.medico.dataHorarios.map(hora => {
            if (dataAgendamento !== null && dataAgendamento.toString() === hora.data) {
                setHorariosDeUmaClinica(hora.hora.split(','))
            }

        })
    }, [dataAgendamento])


    const handleAgendamento = (e) => {
        e.preventDefault()
        const agendamento = {
            id_servico: nextRouter.query.id_servico,
            data: dataAgendamento,
            id_medico: medico.id,
            id_clinica: endereco.id,
            hora: horario,
            id_usuario: state.usuario.dadosAutenticacao.usuario.id
        }

        dispatch(cadastroAgendamentoRequest(agendamento))

        setDisplayResponsive(false)
    }

    let datasMedicoStateConvertidas = []
    state.medico.dataHorarios.map(data => {
        datasMedicoStateConvertidas.push(new Date(data.data))
    })

    let datasQueDevemAparecerNoAgendamento = []
    for (const data of datasMedicoStateConvertidas) {
        datasQueDevemAparecerNoAgendamento.push(data.getDate())
    }

    let date = new Date();
    let ultimoDiaDoMesCorrente = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let diasDoMes = []
    for (let i = 1; i <= ultimoDiaDoMesCorrente.getDate(); i++) {
        diasDoMes.push(i)
    }

    datasQueDevemAparecerNoAgendamento.map(data => {
        const indexDia = diasDoMes.findIndex(dia => dia === data)
        //removo as datas disponíveis do médico dos dias do mês corrente
        diasDoMes.splice(indexDia, 1)
    })

    let dataNova = new Date();
    let datasDesabilitadasParaConulta = []
    diasDoMes.map(diaDoMesIsolado => {
        datasDesabilitadasParaConulta.push(new Date(dataNova.getFullYear(), dataNova.getMonth(), diaDoMesIsolado));
    })

    return (
        <div className="p-d-flex p-flex-column" >

            <div className="p-d-flex p-as-center p-flex-column" style={{ padding: '10px' }}>
                <div className="p-mr-2 p-as-center">
                    <h1 style={{ margin: '15px 0 15px' }}>{props.servico.nome}</h1>
                </div>
            </div>

            <div className="p-d-flex p-jc-center p-flex-row p-flex-wrap">

                <div className="p-d-flex p-flex-column p-mr-6" style={{ width: '20rem' }}>
                    <h4>Selecione uma clínica</h4>

                    <Dropdown
                        style={{ margin: '20px 0 20px' }}
                        value={endereco}
                        options={state.servico.clinicasEnderecos}
                        onChange={e => setEndereco(e.target.value)}
                        optionLabel="nome"
                        placeholder="Clínicas"
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
                        value={horario} options={horariosDeUmaClinica}
                        onChange={e => setHorario(e.target.value)}
                        placeholder="Horários"
                    />
                </div>
                <div className="p-mr-6">
                    <h4>Selecione uma data</h4>
                    <Calendar value={dataAgendamento} onChange={(e) => setDataAgendamento(e.value)} disabledDates={datasDesabilitadasParaConulta} readOnlyInput inline />
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
                <p>Médico: {medico.nome}</p>
                <p>CRM: {medico.crm}</p>
                <p>Endereço: {endereco.endereco !== undefined ? endereco.endereco.logradouro : ''}, {endereco.endereco !== undefined ? endereco.endereco.numero : ''}</p>
                <p>Bairro: {endereco.endereco !== undefined ? endereco.endereco.bairro : ''}</p>
                <form onSubmit={handleAgendamento}>

                    <div className="p-d-flex p-flex-column p-mr-6">
                        <div className="p-d-flex p-flex-column p-mr-6">
                            <label style={{ padding: '10px 0 10px' }}>Clínica</label>
                            <InputText value={endereco.nome} readOnly />
                        </div>
                    </div>

                    <div className="p-d-flex p-mr-6">
                        <div className="p-d-flex p-flex-column p-mr-6">
                            <label style={{ padding: '10px 0 10px' }}>Data</label>
                            <Calendar value={dataAgendamento} dateFormat="dd/mm/yy" readOnly showIcon />
                        </div>
                        <div className="p-d-flex p-flex-column p-mr-6">
                            <label style={{ padding: '10px 0 10px' }}>Hora</label>
                            <InputMask mask="99:99" value={horario} readOnly />
                        </div>
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