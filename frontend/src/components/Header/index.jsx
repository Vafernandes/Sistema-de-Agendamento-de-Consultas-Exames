import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

import styles from './styles.module.scss';

import Link from 'next/link'

export default function TopMenu() {
    const [visibilidadeMenu, setVisibilidadeMenu] = useState(false);

    const items = [
        { label: 'Início', icon: 'pi pi-fw pi-home', to: '/' },
        { label: 'Cadastro de serviço', icon: 'pi pi-fw pi-plus', to: '/Cadastro/Servico' },
        { label: 'Cadastro de clinica', icon: 'pi pi-fw pi-plus', to: '/Cadastro/Clinica' },
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
        <>
            <Sidebar visible={visibilidadeMenu} onHide={() => setVisibilidadeMenu(false)}>
                <h1 style={{ fontWeight: 'normal' }}>Menu</h1>

                <ul>
                    {redirect}
                </ul>
            </Sidebar>

            <div className={styles.headerContainer}>
                <Button className="p-mr-2 p-button-rounded p-button-text" onClick={() => setVisibilidadeMenu(true)}>
                    <i className="pi pi-bars" style={{ 'fontSize': '2em', color: 'var(--gray-800)' }}></i>
                </Button>

                <Link href="/Login">
                    <a>
                    <Button label="Entrar" className="p-ml-auto p-button-success" />
                    </a>
                </Link>
                
            </div>
        </>
    )
}