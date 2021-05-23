import { InputText } from "primereact/inputtext"
import {Password} from 'primereact/password';
import { Field, Form } from "react-final-form"
import Botoes from "../../components/Botoes"
import styles from './styles.module.scss'
import Link from 'next/link'
import { useDispatch } from 'react-redux';
import { autenticarUsuario } from "../../store/Usuario/action";

export default function Login() {
    const dispatch = useDispatch();

    return (

        <div className={styles.containerLogin}>
            <h1>Login</h1>
            <Form
                onSubmit={dadosLogin => dispatch(autenticarUsuario(dadosLogin))}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="p-d-flex p-flex-column">

                            <div className={styles.inputContainerLogin}>
                                <Field
                                    name="cpf"
                                    render={({ input }) => (
                                        <span className="p-d-flex p-flex-column">
                                            <label>Email/CPF</label>
                                            <InputText {...input} />
                                        </span>
                                    )}
                                />
                            </div>

                            <div className={styles.inputContainerLogin}>
                                <Field
                                    name="senha"
                                    render={({ input }) => (
                                        <span className="p-d-flex p-flex-column">
                                            <label>Senha</label>
                                            <Password feedback={false} {...input}/>
                                        </span>
                                    )}
                                />
                            </div>
                        </div>

                        <div>
                            <Botoes botoes={[
                                { nome: 'Realizar Login', tipo: 'success', submit: 'submit' }
                            ]} />
                        </div>

                    </form>
                )}
            />
            <Link href="/Cadastro/Usuario">
            <a>
                Não tem uma conta? Cadastre-se
            </a>
            </Link>
        </div>
    )
}
