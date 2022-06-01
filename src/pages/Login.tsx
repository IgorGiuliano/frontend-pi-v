/* eslint-disable quote-props */
/* eslint-disable no-alert */
import React, { FormEvent, useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import '../styles/LoginStyle.scss';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const { signed, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (signed) {
            navigate('/dashboard');
        }
    }, [signed]);

    async function signUp(event: FormEvent) {
        event.preventDefault();
        email.toLocaleLowerCase();

        const passwordREGEX: RegExp = /^(?=.*[A-Z])(?=.*[!#@$%&-_])(?=.*[0-9])(?=.*[a-z]).{6,20}$/;

        if (!password.match(passwordREGEX)) {
            // eslint-disable-next-line max-len
            window.alert('Senha inválida, favor inserir uma senha com o seguinte padrão: 6 a 20 caracteres, pelo menos 1 número, pelo menos 1 maiúscula, pelo menos 1 minúcula, e pelo menos 1 caractere especial ( !#@$%&-_ )');
        }

        if (password.length < 6) {
            window.alert('Senha com menos de 6 caracteres, favor revisar');
        } else {
            await login({
                'email': email,
                'password': password
            });
        }
    }

    const routeChange = (path: string) => {
        navigate(path);
    };

    return (
        <div className="wrapper">
            <header>
                <a href="/">
                    Projeto Integrador V
                </a>
                <ul>
                    <li>
                        <a href="/">
                            <FaHome
                                size="28px"
                            />
                        </a>
                    </li>
                </ul>
            </header>
            <main>
                <div className="container-log-reg">
                    <div className="container-login">
                        <form onSubmit={signUp} id="form">
                            <h1>
                                LOGIN
                            </h1>
                            <input
                                type="email"
                                placeholder="Digite seu email"
                                value={email}
                                onChange={
                                    (event) => setEmail(event.target.value)
                                }
                                required
                            />
                            <input
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={
                                    (event) => setPass(event.target.value)
                                }
                                required
                            />
                            <button type="submit">
                                Entrar
                            </button>
                        </form>
                    </div>
                    <div className="container-register">
                        <h1>
                            REGISTRE-SE
                        </h1>
                        <p>
                            Não possui uma conta? Crie uma!
                        </p>
                        <button
                            onClick={
                                () => routeChange('/register')
                            }
                        >
                            Registre-se
                        </button>
                    </div>
                </div>
            </main>
            <footer>
                @IgorGiuliano - 2022
            </footer>
        </div>
    );
}
