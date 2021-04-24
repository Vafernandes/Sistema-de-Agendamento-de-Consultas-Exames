import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Tabela(props) {

    const gerarColunas = () => {
        return props.colunas.map((coluna, index) => {
            return <Column
                key={index}
                field={coluna.coluna ? coluna.coluna : ''} 
                header={coluna.nomeColuna ? coluna.nomeColuna : ''} 
                body={typeof coluna.acao === 'function' ? coluna.acao : null}  
            />
        })
    }

    return (
        <DataTable value={props.lista} selection={props.elementoSelecionado} onSelectionChange={props.setElementoSelecionado}
            dataKey={props.id} paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
            globalFilter={props.filtroGlobal}
            paginatorPosition='both'
            header={props.cabecalho}>

            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            {gerarColunas()}
        </DataTable>
    )
}
