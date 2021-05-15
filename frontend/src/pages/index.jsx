import { CardDemo } from '../components/CardServico'

export default function SidebarDemo() {

    return (
        <div className="p-d-flex p-flex-column" >

            <div className="p-d-flex p-as-center p-flex-column" style={{
                marginTop: '50px', marginBottom: '30px', padding: '30px'
            }}>
                <div className="p-mr-2 p-as-center">
                    <h1>Faça seu agendamento agora!</h1>
                </div>
                <div className="p-mr-2 p-as-center">
                    <h4>Escolha abaixo o atendimento que você precisa para começar seu agendamento</h4>
                </div>
            </div>

            <div className="p-d-flex p-jc-center p-flex-row p-flex-wrap">
                <div className="p-mr-5" >
                    <CardDemo url="/Servico/Consultas">
                        <h2>Consultas</h2>
                    </CardDemo>
                </div>
                <div className="p-mr-5">
                    <CardDemo url="/Servico/Exames">
                        <h2>Exames</h2>
                    </CardDemo>
                </div>
                <div className="p-mr-5">
                    <CardDemo url="/Servico/Testes">
                        <h2>Testes de covid</h2>
                    </CardDemo>
                </div>
            </div>
        </div>
    )
}