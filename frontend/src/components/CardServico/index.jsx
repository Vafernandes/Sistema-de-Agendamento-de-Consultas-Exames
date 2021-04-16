import React from 'react';
import Link from 'next/link'
import styles from './cardServico.module.css'

export const CardDemo = (props) => (
    <Link href={`${props.url}`}>
        <a>
            <div className={styles.cardServico}>
                {props.children}
            </div>
        </a>
    </Link>
)