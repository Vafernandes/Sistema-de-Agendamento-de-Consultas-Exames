import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { useState } from "react";
import { addLocale } from 'primereact/api';
import { api } from '../../service/api';
import { SelectButton } from 'primereact/selectbutton';
import EnderecosCards from '../../components/EnderecosCards';

export default function Agendamento(props) {
    const [date15, setDate15] = useState(null);
    const [value2, setValue2] = useState(null);


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

    return (
        <div className="p-d-flex p-flex-column" >

            <div className="p-d-flex p-as-center p-flex-column" style={{ padding: '10px' }}>
                <div className="p-mr-2 p-as-center">
                    <h1>{props.servico.nome}</h1>
                </div>
            </div>
            <div className="p-d-flex p-jc-center p-flex-row p-flex-wrap">
                <div className="p-mr-6">
                    <h4>Escolha a clínica</h4>

                    <EnderecosCards enderecosCards={[
                        { local: 'Clina RioMar - Fortaleza', rua: 'Rua Desembargador', numero: '500' },
                    ]} />

                </div>
                <div className="p-mr-6">
                    <h4>Escolha uma data</h4>
                    <Calendar inline dateFormat="dd/mm/yy" value={date15} onChange={(e) => setDate15(e.value)} locale="pt" dateFormat="dd/mm/yy" />
                </div>
                <div className="p-mr-6">
                    <h4>Escolha um horário</h4>

                    <Card title="10:00 - 11:00" style={{ height: '60px', width: '15rem', marginBottom: '2em' }} />
                    <Card title="10:00 - 11:00" style={{ height: '60px', width: '15rem', marginBottom: '2em' }} />
                    <Card title="10:00 - 11:00" style={{ height: '60px', width: '15rem', marginBottom: '2em' }} />
                    <Card title="10:00 - 11:00" style={{ height: '60px', width: '15rem', marginBottom: '2em' }} />

                </div>
            </div>
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