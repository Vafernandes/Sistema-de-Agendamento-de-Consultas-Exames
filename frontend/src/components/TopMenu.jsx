import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

import Link from 'next/link'

export default function TopMenu() {
    const [visibilidadeMenu, setVisibilidadeMenu] = useState(false);
    const [estadoSelecionado, setEstadoSelecionado] = useState(null);

    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const items = [
        { label: 'Início', icon: 'pi pi-fw pi-home', to: '/' },
    ];

    const redirect = items.map((item) => (
        <li key={item.label}>
            <Link href={`${item.to}`}>
                <a >
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

            <div className="p-d-flex p-p-3 card">
                <Button icon="pi pi-bars" className="p-mr-2 p-button-rounded p-button-text" onClick={() => setVisibilidadeMenu(true)} />
                <Dropdown value={estadoSelecionado} options={cities} onChange={e => setEstadoSelecionado(e.value)} optionLabel="name" placeholder="Estado" />

                <Button label="Entrar" className="p-ml-auto p-button-success" />

            </div>
        </div>
    )
}