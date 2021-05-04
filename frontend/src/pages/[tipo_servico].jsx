import { Card } from 'primereact/card';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { api } from '../service/api';
import styles from '../components/CardServico/cardServico.module.css'

export default function Classe(props) {
    const router = useRouter()

    const geraCardsTipoServico = () => {
        return props.servicos.map(servico => {
            return <div key={servico.id} className="p-mr-5">
                <Link href="/Agendamento">
                    <a>
                        <Card className={styles.cardTipoServico} title={servico.nome}>
                            <p className="p-m-0" style={{ lineHeight: '1.5' }}>Preço: {servico.preco}</p>
                            <p className="p-m-0" style={{ lineHeight: '1.5' }}>Tipo de servicço: {servico.tipo_servico}</p>
                            <p className="p-m-0" style={{ lineHeight: '1.5' }}>Endereço: </p>
                        </Card>
                    </a>
                </Link>
            </div>
        })
    }

    return (
        <div className="p-d-flex p-jc-center p-flex-column">
            <div className="p-d-flex p-jc-center">
                <h1>{router.query.tipo_servico}</h1>
            </div>

            <div className="p-d-flex p-jc-center p-flex-row p-flex-wrap">
                {geraCardsTipoServico()}
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const parametro = context.params.tipo_servico

    const parametroFormatado = parametro.replace(/(\w*)s/, '$1')

    const response = await api.get(`servicos/${parametroFormatado}`)

    const servicos = response.data

    return {
        props: {
            servicos
        }
    }

}