import React from 'react';
import Link from 'next/link'
import styles from './cardServico.module.scss'

export const CardDemo = (props) => (
    <Link href={`${props.url}`}>
        <a>
            <div className={styles.cardTipoServico}>
                {props.children}
            </div>
        </a>
    </Link>
)