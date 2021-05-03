import { CardDemo } from '../components/CardServico'

export default function SidebarDemo() {

    return (
        <div className="p-d-flex p-flex-column" >

            <div className="p-d-flex p-as-center p-flex-column" style={{
                marginTop: '50px', marginBottom: '30px', padding: '30px'
            }}>
                <div className="p-mr-2 p-as-center">
                    <h1>Faça seu agendmanento agora!</h1>
                </div>
                <div className="p-mr-2 p-as-center">
                    <h4>Escolha abaixo o atendimento que você precisa para começar seu agendamento</h4>
                </div>
            </div>

            <div className="p-d-flex p-jc-center p-flex-row p-flex-wrap">
                <div className="p-mr-5">
                    <CardDemo url="/Consultas">
                        <p>Consultas</p>
                    </CardDemo>
                </div>
                <div className="p-mr-5">
                    <CardDemo url="/Exames">
                        <p>Exames</p>
                    </CardDemo>
                </div>
                <div className="p-mr-5">
                    <CardDemo url="/Testes">
                        <p>Testes de covid</p>
                    </CardDemo>
                </div>
            </div>
        </div>
    )
}