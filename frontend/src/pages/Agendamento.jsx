import { CardDemo } from "../components/CardServico";
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { useState } from "react";


export default function Agendamento() {
    const [date15, setDate15] = useState(null);


    return (
        <div className="p-d-flex p-flex-column" >

            <div className="p-d-flex p-as-center p-flex-column" style={{ padding: '10px' }}>
                <div className="p-mr-2 p-as-center">
                    <h1>Nome do serviço</h1>
                </div>
            </div>
            <div className="p-d-flex p-jc-center p-flex-row p-flex-wrap">
                <div className="p-mr-6">
                    <h4>Escolha a clínica</h4>

                    <Card title="Clina RioMar - Fortaleza" style={{ width: '20rem', marginBottom: '2em' }}>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Rua Desembargador, 500</p>
                    </Card>
                </div>
                <div className="p-mr-6" >
                    <h4>Escolha uma data</h4>

                    <Calendar  value={date15} onChange={(e) => setDate15(e.value)} inline showWeek />
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