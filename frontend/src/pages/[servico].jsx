import { Card } from 'primereact/card';
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Classe() {
    const router = useRouter()

    return (
        <div className="p-d-flex p-jc-center p-flex-column"> 
            <div className="p-d-flex p-jc-center">
                <h1>{router.query.servico}</h1>
            </div>

            <div className="p-d-flex p-jc-center p-flex-row p-flex-wrap">
                <div className="p-mr-5">
                    <Link href="/Agendamento"> 
                        <a>
                            <Card title="Alergia e Imunologia Pediátrica" style={{ width: '20rem', marginBottom: '2em' }}>
                                <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                                <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                                <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                            </Card>
                        </a>
                    </Link>

                </div>
                <div className="p-mr-5">
                    <Card title="Alergia e Imunologia Pediátrica" style={{ width: '20rem', marginBottom: '2em' }}>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                    </Card>
                </div>
                <div className="p-mr-5">
                    <Card title="Alergia e Imunologia Pediátrica" style={{ width: '20rem', marginBottom: '2em' }}>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                    </Card>
                </div>
                <div className="p-mr-5">
                    <Card title="Alergia e Imunologia Pediátrica" style={{ width: '20rem', marginBottom: '2em' }}>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                    </Card>
                </div>
                <div className="p-mr-5">
                    <Card title="Alergia e Imunologia Pediátrica" style={{ width: '20rem', marginBottom: '2em' }}>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                    </Card>
                </div>
                <div className="p-mr-5">
                    <Card title="Alergia e Imunologia Pediátrica" style={{ width: '20rem', marginBottom: '2em' }}>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                    </Card>
                </div>
                <div className="p-mr-5">
                    <Card title="Alergia e Imunologia Pediátrica" style={{ width: '20rem', marginBottom: '2em' }}>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                    </Card>
                </div>
                <div className="p-mr-5">
                    <Card title="Alergia e Imunologia Pediátrica" style={{ width: '20rem', marginBottom: '2em' }}>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                    </Card>
                </div>
                <div className="p-mr-5">
                    <Card title="Alergia e Imunologia Pediátrica" style={{ width: '20rem', marginBottom: '2em' }}>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>Lorem ipsum dolor sit amet</p>
                    </Card>
                </div>
                
            </div>
        </div>
    )
}
