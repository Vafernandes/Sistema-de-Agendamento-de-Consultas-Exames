import { Card } from 'primereact/card';

const EnderecosCards = (props) => {
    const gerarEnderecosCards = () => {
        return props.enderecosCards.map((endereco, index) => {
            return <Card key={index}
                title={endereco.local ? endereco.local : ''}
                style={{ width: '20rem', marginBottom: '2em' }}>
                <p className="p-m-0" style={{ lineHeight: '1.5' }}>
                    {endereco.rua ? endereco.rua : ''}, {endereco.numero ? endereco.numero : ''}
                </p>
            </Card>
        })
    }
    return gerarEnderecosCards()
}

export default EnderecosCards