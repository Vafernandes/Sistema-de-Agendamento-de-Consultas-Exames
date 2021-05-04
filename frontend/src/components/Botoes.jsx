import { Button } from "primereact/button"

const Botoes = (props) => {
    const gerarBotoes = () => {
        return props.botoes.map((botao, index) => {
            return <Button
                key={index}
                style={{ marginRight: '10px' }} 
                label={botao.nome ? botao.nome : ''} 
                className={`p-button-${botao.tipo}`} 
                icon={`pi ${botao.icone}`} 
                onClick={typeof botao.func === 'function' ? botao.func : () => {}}
                style={{ margin: '5px' }}
            />
        })
    }
    return gerarBotoes()
}

export default Botoes