import Link from 'next/link'
import { useRouter } from 'next/router'
import { api } from '../../service/api';
import styles from '../../components/CardServico/cardServico.module.scss'
import stylesTipoServico from './styles.module.scss'

export default function Classe(props) {
    const router = useRouter()

    const geraCardsTipoServico = () => {
        return props.servicos.map(servico => {
            return <div key={servico.id} className={`p-mr-5 ${stylesTipoServico.cardContainer}`} >
                <Link href={`/Agendamento/${servico.id}`}>
                    <a>
                        <div className={styles.cardTipoServico}>
                            <h3 className="p-m-0">{servico.nome}</h3>
                        
                            <p className="p-m-0">Preço: {servico.preco}</p>
                        </div>
                    </a>
                </Link>
            </div>
        })
    }

    return (
        <div className="p-d-flex p-jc-center p-flex-column">
            <div className={`p-d-flex p-jc-center ${stylesTipoServico.title}`}>
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