import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { useState } from "react";
import { addLocale } from 'primereact/api';
import { api } from '../../service/api';
import { SelectButton } from 'primereact/selectbutton';
import EnderecosCards from '../../components/EnderecosCards';
import { ListBox } from 'primereact/listbox';
import { useRouter } from 'next/router'
import Botoes from '../../components/Botoes';


export default function Agendamento(props) {
    const [dataAgendamento, setDataAgendamento] = useState(null);
    const [selectedGroupedCity, setSelectedGroupedCity] = useState(null);
    const nextRouter = useRouter()

    const handleAgendamento = (e) => {
        e.preventDefault()
        const agendamento = {
            id_servico: nextRouter.query.id_servico,
            data: dataAgendamento
        }

        console.log(agendamento)

        api.post('agendamentos', agendamento)

    }

    const groupedItemTemplate = (option) => {
        return (
            <div className="p-d-flex p-ai-center country-item">
                <img alt={option.name} src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} />
                <div>{option.label}</div>
            </div>
        );
    }

    const groupedCities = [
        {
            label: 'Germany', code: 'DE',
            items: [
                { label: 'Berlin', value: 'Berlin' },
                { label: 'Frankfurt', value: 'Frankfurt' },
                { label: 'Hamburg', value: 'Hamburg' },
                { label: 'Munich', value: 'Munich' }
            ]
        },
        {
            label: 'USA', code: 'US',
            items: [
                { label: 'Chicago', value: 'Chicago' },
                { label: 'Los Angeles', value: 'Los Angeles' },
                { label: 'New York', value: 'New York' },
                { label: 'San Francisco', value: 'San Francisco' }
            ]
        },
        {
            label: 'Japan', code: 'JP',
            items: [
                { label: 'Kyoto', value: 'Kyoto' },
                { label: 'Osaka', value: 'Osaka' },
                { label: 'Tokyo', value: 'Tokyo' },
                { label: 'Yokohama', value: 'Yokohama' }
            ]
        }
    ];

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
            <form onSubmit={handleAgendamento}>
                <div className="p-d-flex p-jc-center p-flex-row p-flex-wrap">
                    <div className="p-mr-6">
                        <h4>Escolha a clínica</h4>

                        <EnderecosCards enderecosCards={[
                            { local: 'Clina RioMar - Fortaleza', rua: 'Rua Desembargador', numero: '500' },
                        ]} />

                        <ListBox value={selectedGroupedCity} options={groupedCities} onChange={(e) => setSelectedGroupedCity(e.value)} optionLabel="label" optionGroupLabel="label" optionGroupChildren="items"
                            optionGroupTemplate={groupedItemTemplate} style={{ width: '20rem' }} listStyle={{ maxHeight: '250px' }} />

                    </div>
                    <div className="p-mr-6">
                        <h4>Escolha uma data</h4>
                        <Calendar inline dateFormat="dd/mm/yy" showTime  value={dataAgendamento} onChange={(e) => setDataAgendamento(e.value)} locale="pt" dateFormat="dd/mm/yy" />
                    </div>
                    <div className="p-mr-6">
                        <h4>Escolha um horário</h4>

                        <Card title="10:00 - 11:00" style={{ height: '60px', width: '15rem', marginBottom: '2em' }} />
                        <Card title="10:00 - 11:00" style={{ height: '60px', width: '15rem', marginBottom: '2em' }} />
                        <Card title="10:00 - 11:00" style={{ height: '60px', width: '15rem', marginBottom: '2em' }} />
                        <Card title="10:00 - 11:00" style={{ height: '60px', width: '15rem', marginBottom: '2em' }} />

                    </div>
                </div>
                <Botoes botoes={[
                    { nome: 'Agendar', tipo: 'success', icone: 'pi-check', func: () => { }, submit: 'submit' }
                ]} />
            </form>
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