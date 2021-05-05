import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

import Link from 'next/link'

export default function TopMenu() {
    const [visibilidadeMenu, setVisibilidadeMenu] = useState(false);
    const [estadoSelecionado, setEstadoSelecionado] = useState(null);

    const items = [
        { label: 'Início', icon: 'pi pi-fw pi-home', to: '/' },
        { label: 'Cadastro de serviço', icon: 'pi pi-fw pi-plus', to: '/Cadastro/Servico' },
        { label: 'Cadastro de médicos', icon: 'pi pi-fw pi-plus', to: '/Cadastro/Medicos' },

    ];

    const redirect = items.map((item) => (
        <li key={item.label} >
            <i className={`${item.icon} p-mr-2`} />
            <Link href={`${item.to}`}>
                <a>
                    {item.label}
                </a>
            </Link>
        </li>)
    )

    return (
        <div className="card">
            <Sidebar visible={visibilidadeMenu} baseZIndex={1000000} onHide={() => setVisibilidadeMenu(false)}>
                <h1 style={{ fontWeight: 'normal' }}>Menu</h1>

                <ul>
                    {redirect}
                </ul>
            </Sidebar>

            <div className="card p-d-flex p-p-3" style={{ backgroundColor: '#fff' }}>
                <Button icon="pi pi-bars" className="p-mr-2 p-button-rounded p-button-text" onClick={() => setVisibilidadeMenu(true)} />

                <Button label="Entrar" className="p-ml-auto p-button-success" />

            </div>
        </div>
    )
}